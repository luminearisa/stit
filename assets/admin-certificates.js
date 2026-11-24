'use strict';

(function initAdminCertificates() {
  const panel = document.getElementById('certificate-panel');
  if (!panel) return;

  const select = document.getElementById('cert-event-slug');
  const uploadForm = document.getElementById('cert-upload-form');
  const fileInput = document.getElementById('cert-file');
  const filenameEl = document.getElementById('cert-filename');
  const dropzone = document.getElementById('cert-dropzone');
  const uploadBtn = document.getElementById('cert-upload-btn');
  const editor = document.getElementById('cert-editor');
  const previewCanvas = document.getElementById('cert-preview-canvas');
  const sampleLabel = document.getElementById('cert-sample-label');
  const errorEl = document.getElementById('cert-admin-error');
  const statusEl = document.getElementById('cert-admin-status');
  const listEl = document.getElementById('cert-list');
  const batchBtn = document.getElementById('cert-batch-btn');
  const batchZipBtn = document.getElementById('cert-batch-zip');
  const batchStatus = document.getElementById('cert-batch-status');
  const batchGallery = document.getElementById('cert-batch-gallery');
  const batchCount = document.getElementById('cert-batch-count');
  const fields = {
    x: document.getElementById('cert-box-x'),
    y: document.getElementById('cert-box-y'),
    size: document.getElementById('cert-box-size'),
    color: document.getElementById('cert-box-color'),
    align: document.getElementById('cert-box-align'),
    maxWidth: document.getElementById('cert-box-width'),
  };

  let configs = {};
  let templateImage = null;
  let sampleName = 'Nama Peserta';
  let batchItems = [];

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    statusEl.hidden = true;
  }

  function showStatus(message) {
    statusEl.textContent = message;
    statusEl.hidden = false;
    errorEl.hidden = true;
  }

  async function api(payload) {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { response, data: await response.json() };
  }

  function currentSlug() {
    return select ? select.value : '';
  }

  function fillFields(box) {
    fields.x.value = box.x ?? 50;
    fields.y.value = box.y ?? 45;
    fields.size.value = box.size ?? 42;
    fields.color.value = /^#[0-9a-f]{6}$/i.test(box.color) ? box.color : '#0b2545';
    fields.align.value = box.align || 'center';
    fields.maxWidth.value = box.maxWidth ?? 70;
  }

  function collectBox() {
    return {
      x: Number(fields.x.value),
      y: Number(fields.y.value),
      size: Number(fields.size.value),
      color: fields.color.value,
      align: fields.align.value,
      maxWidth: Number(fields.maxWidth.value),
    };
  }

  function renderList() {
    const options = [...select.options];
    listEl.innerHTML = options.map((option) => {
      const has = Boolean(configs[option.value]);
      return `<div class="generated-item">
        <div class="generated-item__main">
          <div><strong>${option.text}</strong><small>${option.value}</small></div>
        </div>
        <span class="cert-status ${has ? 'cert-status--yes' : 'cert-status--no'}">${has ? 'Template sudah di-upload' : 'Belum ada template'}</span>
      </div>`;
    }).join('');
  }

  function wrapText(ctx, text, maxWidth) {
    const words = String(text || '').split(/\s+/);
    const lines = [];
    let line = '';
    words.forEach((word) => {
      const test = line ? line + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function drawCertificate(image, name, box, canvas) {
    const target = canvas || document.createElement('canvas');
    target.width = image.naturalWidth;
    target.height = image.naturalHeight;
    const ctx = target.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const scale = target.width / 1200;
    const fontSize = Math.max(12, Number(box.size || 42) * scale);
    const color = /^#[0-9a-f]{6}$/i.test(box.color || '') ? box.color : '#0b2545';
    const align = ['left', 'center', 'right'].includes(box.align) ? box.align : 'center';
    ctx.font = '700 ' + fontSize + 'px Georgia, serif';
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';

    const x = target.width * (Number(box.x ?? 50) / 100);
    const y = target.height * (Number(box.y ?? 45) / 100);
    const maxWidth = target.width * (Number(box.maxWidth ?? 70) / 100);
    const lines = wrapText(ctx, name, maxWidth);
    const lineHeight = fontSize * 1.2;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((text, index) => ctx.fillText(text, x, startY + index * lineHeight));
    return target;
  }

  function drawPreview() {
    if (!previewCanvas || !templateImage) return;
    drawCertificate(templateImage, sampleName, collectBox(), previewCanvas);
    if (sampleLabel) {
      sampleLabel.textContent = 'Contoh nama: ' + sampleName + ' — klik pada gambar untuk menggeser posisi.';
    }
  }

  function loadTemplateImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => { templateImage = image; drawPreview(); resolve(image); };
      image.onerror = () => reject(new Error('Gagal memuat gambar template.'));
      image.src = src;
    });
  }

  async function loadSampleName(slug) {
    sampleName = 'Nama Peserta';
    try {
      const { data } = await api({ action: 'list' });
      const confirmed = (data.records || []).find(
        (row) => row.source === slug && row.status === 'terkonfirmasi' && row.name
      );
      if (confirmed) sampleName = confirmed.name;
    } catch (err) { /* biarkan nama default */ }
    drawPreview();
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }

  function fileSlug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function batchMessage(message) {
    batchStatus.textContent = message;
    batchStatus.hidden = false;
  }

  function renderBatch() {
    if (batchCount) batchCount.textContent = batchItems.length ? '(' + batchItems.length + ')' : '';
    if (batchZipBtn) batchZipBtn.hidden = batchItems.length === 0;
    if (!batchGallery) return;

    batchGallery.innerHTML = batchItems.map((item, index) => `
      <div class="batch-item">
        <img src="${item.url}" alt="Sertifikat ${esc(item.name)}">
        <strong>${esc(item.name)}</strong>
        <button class="btn btn--outline" type="button" data-batch-download="${index}">Unduh PNG</button>
      </div>`).join('');

    batchGallery.querySelectorAll('[data-batch-download]').forEach((button) => {
      button.addEventListener('click', () => {
        const item = batchItems[Number(button.dataset.batchDownload)];
        if (!item) return;
        const link = document.createElement('a');
        link.href = item.url;
        link.download = 'sertifikat-' + fileSlug(item.name) + '.png';
        link.click();
      });
    });
  }

  async function generateBatch() {
    const slug = currentSlug();
    const config = configs[slug];
    if (!config) {
      showError('Upload template sertifikat untuk event ini terlebih dahulu.');
      return;
    }

    batchBtn.disabled = true;
    batchBtn.textContent = 'Membuat sertifikat...';
    batchStatus.hidden = true;
    batchGallery.innerHTML = '';
    batchItems = [];

    try {
      const image = templateImage && templateImage.src === config.image
        ? templateImage
        : await loadTemplateImage(config.image);

      const { response, data } = await api({ action: 'list' });
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat pendaftar.');
      const confirmed = (data.records || []).filter(
        (row) => row.source === slug && row.status === 'terkonfirmasi' && row.name
      );
      if (!confirmed.length) {
        batchMessage('Belum ada pendaftar Terkonfirmasi pada event ini.');
        return;
      }

      for (const row of confirmed) {
        const canvas = drawCertificate(
          image, row.name, config.name_box || {}, document.createElement('canvas')
        );
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        batchItems.push({ name: row.name, blob, url: URL.createObjectURL(blob) });
      }

      renderBatch();
      batchMessage('Berhasil membuat ' + batchItems.length + ' sertifikat.');
    } catch (err) {
      showError(err.message);
    } finally {
      batchBtn.disabled = false;
      batchBtn.textContent = 'Buat Sertifikat Semua';
    }
  }

  batchBtn?.addEventListener('click', generateBatch);

  batchZipBtn?.addEventListener('click', async () => {
    if (!batchItems.length) return;
    if (typeof window.JSZip === 'undefined') {
      showError('Library ZIP tidak tersedia. Silakan unduh satu per satu.');
      return;
    }
    batchZipBtn.disabled = true;
    batchZipBtn.textContent = 'Membuat ZIP...';
    try {
      const zip = new window.JSZip();
      batchItems.forEach((item) => {
        zip.file('sertifikat-' + fileSlug(item.name) + '.png', item.blob);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'sertifikat-' + currentSlug() + '.zip';
      link.click();
    } catch (err) {
      showError(err.message);
    } finally {
      batchZipBtn.disabled = false;
      batchZipBtn.textContent = 'Unduh Semua (.zip)';
    }
  });

  async function loadConfig() {
    const slug = currentSlug();
    errorEl.hidden = true;
    if (!slug) return;
    try {
      const { response, data } = await api({ action: 'certificate_get', slug });
      if (response.status === 401) { panel.hidden = true; return; }
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat template.');
      const config = data.config;
      if (!config) {
        editor.hidden = true;
        return;
      }
      fillFields(config.name_box || {});
      editor.hidden = false;
      await loadTemplateImage(config.image);
      await loadSampleName(slug);
    } catch (err) {
      showError(err.message);
    }
  }

  async function loadAll() {
    try {
      const { response, data } = await api({ action: 'certificate_list' });
      if (response.status === 401) { panel.hidden = true; return; }
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat daftar template.');
      configs = data.configs || {};
      panel.hidden = false;
      renderList();
      await loadConfig();
    } catch (err) {
      showError(err.message);
    }
  }

  fileInput.addEventListener('change', () => {
    filenameEl.textContent = fileInput.files[0] ? fileInput.files[0].name : 'Belum ada file dipilih';
  });

  ['dragenter', 'dragover'].forEach((name) => dropzone.addEventListener(name, (e) => {
    e.preventDefault();
    dropzone.classList.add('gen-dropzone--active');
  }));
  ['dragleave', 'drop'].forEach((name) => dropzone.addEventListener(name, (e) => {
    e.preventDefault();
    dropzone.classList.remove('gen-dropzone--active');
  }));
  dropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer && e.dataTransfer.files[0];
    if (!file) return;
    const transfer = new DataTransfer();
    transfer.items.add(file);
    fileInput.files = transfer.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
  });

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;
    const file = fileInput.files[0];
    if (!file) { showError('Pilih file template terlebih dahulu.'); return; }

    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Mengupload...';
    try {
      const formData = new FormData();
      formData.append('action', 'certificate_upload');
      formData.append('slug', currentSlug());
      formData.append('certificate', file);
      const response = await fetch('/api/admin', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Gagal mengupload template.');
      showStatus('Template sertifikat berhasil di-upload.');
      fileInput.value = '';
      filenameEl.textContent = 'Belum ada file dipilih';
      configs[currentSlug()] = result.config;
      renderList();
      await loadConfig();
    } catch (err) {
      showError(err.message);
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.textContent = 'Upload Template';
    }
  });

  previewCanvas?.addEventListener('click', (event) => {
    const rect = previewCanvas.getBoundingClientRect();
    fields.x.value = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    fields.y.value = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    drawPreview();
    showStatus('Posisi nama diperbarui. Klik Simpan Posisi.');
  });

  Object.values(fields).forEach((input) => {
    input?.addEventListener('input', drawPreview);
    input?.addEventListener('change', drawPreview);
  });

  document.getElementById('cert-save-btn')?.addEventListener('click', async () => {
    try {
      const { response, data } = await api({
        action: 'certificate_save',
        slug: currentSlug(),
        name_box: collectBox(),
      });
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal menyimpan posisi.');
      showStatus('Posisi nama berhasil disimpan.');
      configs[currentSlug()] = data.config;
      renderList();
    } catch (err) {
      showError(err.message);
    }
  });

  document.getElementById('cert-delete-btn')?.addEventListener('click', async () => {
    if (!window.confirm('Hapus template sertifikat event ini?')) return;
    try {
      const { response, data } = await api({ action: 'certificate_delete', slug: currentSlug() });
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal menghapus template.');
      delete configs[currentSlug()];
      editor.hidden = true;
      renderList();
      showStatus('Template sertifikat dihapus.');
    } catch (err) {
      showError(err.message);
    }
  });

  select?.addEventListener('change', () => { loadConfig(); });

  window.addEventListener('admin:ready', loadAll);
  window.addEventListener('admin:logout', () => { panel.hidden = true; });
})();

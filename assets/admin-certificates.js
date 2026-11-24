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
  const previewImg = document.getElementById('cert-preview-img');
  const errorEl = document.getElementById('cert-admin-error');
  const statusEl = document.getElementById('cert-admin-status');
  const listEl = document.getElementById('cert-list');
  const fields = {
    x: document.getElementById('cert-box-x'),
    y: document.getElementById('cert-box-y'),
    size: document.getElementById('cert-box-size'),
    color: document.getElementById('cert-box-color'),
    align: document.getElementById('cert-box-align'),
    maxWidth: document.getElementById('cert-box-width'),
  };

  let configs = {};

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
      previewImg.src = config.image;
      fillFields(config.name_box || {});
      editor.hidden = false;
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

  previewImg.addEventListener('click', (event) => {
    const rect = previewImg.getBoundingClientRect();
    fields.x.value = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    fields.y.value = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    showStatus('Posisi nama diperbarui. Klik Simpan Posisi.');
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

'use strict';

/* =========================================================
   Header navigasi & menu mobile
   ========================================================= */
(function initHeader() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      toggle.setAttribute('aria-label', open ? 'Buka menu navigasi' : 'Tutup menu navigasi');
      toggle.querySelector('svg').innerHTML = open
        ? '<path d="m6 9 6 6 6-6"/>'
        : '<path d="M18 6 6 18M6 6l12 12"/>';
    });
  }

  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('site-header--scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

/* =========================================================
   Countdown
   ========================================================= */
(function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el || !el.dataset.target) return;
  const target = new Date(el.dataset.target).getTime();

  const render = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.className = 'countdown countdown--ended';
      el.textContent = 'Acara sedang berlangsung / telah selesai';
      return;
    }
    const units = [
      { value: Math.floor(diff / 86400000), label: 'Hari' },
      { value: Math.floor((diff / 3600000) % 24), label: 'Jam' },
      { value: Math.floor((diff / 60000) % 60), label: 'Menit' },
      { value: Math.floor((diff / 1000) % 60), label: 'Detik' },
    ];
    el.className = 'countdown';
    el.innerHTML = units.map((u) =>
      `<div class="countdown__unit"><strong>${String(u.value).padStart(2, '0')}</strong><span>${u.label}</span></div>`
    ).join('');
  };

  render();
  setInterval(render, 1000);
})();

/* =========================================================
   Form pendaftaran
   ========================================================= */
(function initRegistration() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  const errorEl = document.getElementById('form-error');
  const submitBtn = document.getElementById('form-submit');
  const successEl = document.getElementById('form-success');
  const successId = document.getElementById('form-success-id');
  const confirm = document.getElementById('reg-confirm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    if (!confirm.checked) {
      errorEl.textContent = 'Harap konfirmasi bahwa nama dan alamat email sudah benar.';
      errorEl.hidden = false;
      return;
    }

    const payload = {};
    new FormData(form).forEach((value, key) => { payload[key] = value; });

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim pendaftaran...';

    try {
      const response = await fetch('api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Pendaftaran gagal.');

      successId.innerHTML = result.id
        ? `ID Pendaftaran: <strong>${escapeHtml(result.id)}</strong>`
        : '';
      form.hidden = true;
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim Pendaftaran';
    }
  });
})();

/* =========================================================
   E-Sertifikat (template gambar per event)
   ========================================================= */
(function initCertificate() {
  const form = document.getElementById('certificate-form');
  if (!form) return;

  const input = document.getElementById('cert-whatsapp');
  const errorEl = document.getElementById('cert-error');
  const noticeEl = document.getElementById('cert-notice');
  const resultEl = document.getElementById('cert-result');
  const previewEl = document.getElementById('cert-preview');
  const button = document.getElementById('cert-submit');
  let currentRecord = null;
  let currentCanvas = null;

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Gagal memuat template sertifikat.'));
      image.src = src;
    });
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

  async function buildCertificate(record, template) {
    const image = await loadImage(template.image);
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const box = template.name_box || {};
    const scale = canvas.width / 1200;
    const fontSize = Math.max(12, Number(box.size || 42) * scale);
    const color = /^#[0-9a-f]{6}$/i.test(box.color || '') ? box.color : '#0b2545';
    const align = ['left', 'center', 'right'].includes(box.align) ? box.align : 'center';

    ctx.font = '700 ' + fontSize + 'px Georgia, serif';
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';

    const x = canvas.width * (Number(box.x ?? 50) / 100);
    const y = canvas.height * (Number(box.y ?? 45) / 100);
    const maxWidth = canvas.width * (Number(box.maxWidth ?? 70) / 100);
    const lines = wrapText(ctx, record.name, maxWidth);
    const lineHeight = fontSize * 1.2;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((text, index) => ctx.fillText(text, x, startY + index * lineHeight));
    return canvas;
  }

  function renderDetails(record) {
    const name = document.getElementById('cert-name');
    const badge = document.getElementById('cert-badge');
    const grid = document.getElementById('cert-grid');
    if (name) name.textContent = record.name;
    if (badge) badge.textContent = 'Terkonfirmasi';
    if (grid) {
      const rows = [
        ['ID Pendaftaran', record.id],
        ['Email', record.email],
        ['Instansi', record.institution],
        ['Asal Kota/Kabupaten', record.city],
        ['Jabatan', record.position],
        ['Waktu Daftar', new Date(record.created_at.replace(' ', 'T')).toLocaleString('id-ID')],
      ];
      grid.innerHTML = rows.map(([label, value]) =>
        `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`
      ).join('');
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;
    noticeEl.hidden = true;
    resultEl.hidden = true;
    currentRecord = null;
    currentCanvas = null;

    button.disabled = true;
    button.textContent = 'Mencari data...';

    try {
      const response = await fetch('api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp: input.value,
          event_slug: document.getElementById('cert-event')?.value || '',
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (response.status === 403) {
          noticeEl.textContent = result.error;
          noticeEl.hidden = false;
          return;
        }
        throw new Error(result.error || 'Data pendaftar tidak ditemukan.');
      }

      if (!result.template) {
        noticeEl.textContent = 'Sertifikat bisa diunduh setelah event selesai';
        noticeEl.hidden = false;
        return;
      }

      currentRecord = result.record;
      currentCanvas = await buildCertificate(currentRecord, result.template);
      renderDetails(currentRecord);
      previewEl.innerHTML = '';
      currentCanvas.style.width = '100%';
      currentCanvas.style.height = 'auto';
      previewEl.appendChild(currentCanvas);
      resultEl.hidden = false;
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Cek E-Sertifikat';
    }
  });

  document.getElementById('download-png')?.addEventListener('click', () => {
    if (!currentCanvas || !currentRecord) return;
    currentCanvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, 'e-sertifikat-' + slug(currentRecord.name) + '.png');
    }, 'image/png');
  });
})();


function slug(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/* =========================================================
   Form saran & masukan
   ========================================================= */
(function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  const errorEl = document.getElementById('feedback-error');
  const successEl = document.getElementById('feedback-success');
  const button = document.getElementById('feedback-submit');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;
    successEl.hidden = true;

    const payload = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    button.textContent = 'Mengirim saran...';

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Gagal mengirim saran.');
      form.reset();
      successEl.textContent = result.message || 'Terima kasih! Saran Anda sudah kami terima.';
      successEl.hidden = false;
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Kirim Saran';
    }
  });
})();

/* =========================================================
   Filter daftar event
   ========================================================= */
(function initEventFilters() {
  const tabs = document.getElementById('filter-tabs');
  if (!tabs) return;

  const buttons = [...tabs.querySelectorAll('[data-filter]')];
  const sections = [...document.querySelectorAll('.event-section[data-group]')];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((b) => b.classList.toggle('filter-tab--active', b === button));
      sections.forEach((section) => {
        section.hidden = filter !== 'all' && section.dataset.group !== filter;
      });
    });
  });
})();

/* =========================================================
   Panel admin â€” Saran & Masukan
   ========================================================= */
(function initFeedbackAdmin() {
  const panel = document.getElementById('feedback-panel');
  if (!panel) return;

  const tbody = document.getElementById('feedback-tbody');
  const countEl = document.getElementById('feedback-count');
  const eventFilter = document.getElementById('feedback-event-filter');
  const errorEl = document.getElementById('feedback-admin-error');

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  async function api(payload) {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { response, data: await response.json() };
  }

  async function load() {
    errorEl.hidden = true;
    try {
      const { response, data } = await api({ action: 'feedback_list' });
      if (response.status === 401) { panel.hidden = true; return; }
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat saran.');
      panel.hidden = false;
      const allItems = data.items || [];
      const slug = eventFilter ? eventFilter.value : '';
      const items = slug ? allItems.filter((item) => item.event_slug === slug) : allItems;
      if (countEl) {
        countEl.textContent = items.length + ' saran'
          + (slug ? ' · dari ' + allItems.length + ' total' : '');
      }

      if (!items.length) {
        tbody.innerHTML = '<tr><td colspan="6" class="admin-empty">Belum ada saran yang masuk.</td></tr>';
        return;
      }

      tbody.innerHTML = items.map((item) => `
        <tr>
          <td><strong>${escapeHtml(item.name || '-')}</strong></td>
          <td><small>${escapeHtml(item.email || '-')}</small></td>
          <td><span>${escapeHtml(item.message || '-')}</span></td>
          <td><small>${escapeHtml(item.event_slug || '-')}</small></td>
          <td><small>${escapeHtml(item.created_at)}</small></td>
          <td><button class="admin-delete" type="button" data-feedback-id="${escapeHtml(item.id)}">Hapus</button></td>
        </tr>`).join('');

      tbody.querySelectorAll('[data-feedback-id]').forEach((button) => {
        button.addEventListener('click', async () => {
          if (!window.confirm('Hapus saran ini?')) return;
          try {
            const res = await api({ action: 'feedback_delete', id: button.dataset.feedbackId });
            if (!res.data.ok) throw new Error(res.data.error || 'Gagal menghapus saran.');
            await load();
          } catch (err) { showError(err.message); }
        });
      });
    } catch (err) {
      showError(err.message);
    }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }

  document.getElementById('feedback-refresh')?.addEventListener('click', load);
  eventFilter?.addEventListener('change', load);

  document.getElementById('feedback-clear')?.addEventListener('click', async () => {
    if (!window.confirm('Hapus SEMUA saran? Tindakan ini tidak bisa dibatalkan.')) return;
    try {
      const { data } = await api({ action: 'feedback_clear' });
      if (!data.ok) throw new Error(data.error || 'Gagal menghapus saran.');
      await load();
    } catch (err) { showError(err.message); }
  });

  document.getElementById('feedback-export')?.addEventListener('click', async () => {
    try {
      const { response, data } = await api({ action: 'feedback_list' });
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat saran.');
      const header = ['ID', 'Nama', 'Email', 'Saran', 'Event', 'Waktu'];
      const slug = eventFilter ? eventFilter.value : '';
      const items = slug
        ? (data.items || []).filter((i) => i.event_slug === slug)
        : (data.items || []);
      const rows = items.map((i) => [i.id, i.name || '', i.email || '', i.message || '', i.event_slug || '', i.created_at]);
      const quote = (v) => '"' + String(v).replace(/"/g, '""') + '"';
      const csv = [header, ...rows].map((r) => r.map(quote).join(',')).join('\r\n');
      const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'saran-masukan-' + new Date().toISOString().slice(0, 10) + '.csv';
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) { showError(err.message); }
  });

  window.addEventListener('admin:ready', load);
  window.addEventListener('admin:logout', () => { panel.hidden = true; });
})();

/* =========================================================
   Panel admin
   ========================================================= */
(function initAdmin() {
  const loginForm = document.getElementById('admin-login-form');
  if (!loginForm) return;

  const userInput = document.getElementById('admin-user');
  const passInput = document.getElementById('admin-pass');
  const loginError = document.getElementById('admin-login-error');
  const loginView = document.getElementById('admin-login-view');
  const panel = document.getElementById('admin-panel');
  const tbody = document.getElementById('admin-tbody');
  const countEl = document.getElementById('admin-count');
  const searchInput = document.getElementById('admin-search');
  const eventFilter = document.getElementById('reg-event-filter');
  const errorEl = document.getElementById('admin-error');
  const statusLabels = window.ADMIN_STATUS_LABELS || {};
  let records = [];

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginError.hidden = true;
    const username = userInput.value.trim();
    const password = passInput.value;
    if (!username || !password) return;

    try {
      const response = await fetch('api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });
      const data = await response.json();
      if (!data.ok) throw new Error(data.error || 'Login gagal.');
      passInput.value = '';
      loginError.hidden = true;
      await load();
    } catch (err) {
      loginError.textContent = err.message;
      loginError.hidden = false;
    }
  });

  document.getElementById('admin-logout')?.addEventListener('click', async () => {
    try { await api({ action: 'logout' }); } catch (_) { /* abaikan */ }
    records = [];
    panel.hidden = true;
    loginView.hidden = false;
    const generator = document.getElementById('event-generator');
    if (generator) generator.hidden = true;
    window.dispatchEvent(new Event('admin:logout'));
  });

  searchInput?.addEventListener('input', render);
  eventFilter?.addEventListener('change', render);
  document.getElementById('admin-refresh')?.addEventListener('click', load);
  document.getElementById('admin-export')?.addEventListener('click', exportCsv);

  document.getElementById('admin-clear')?.addEventListener('click', async () => {
    if (!window.confirm('Hapus SEMUA data pendaftar? Tindakan ini tidak bisa dibatalkan.')) return;
    try {
      const { data } = await api({ action: 'clear' });
      if (!data.ok) throw new Error(data.error || 'Gagal menghapus data.');
      await load();
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    }
  });

  async function api(payload) {
    const response = await fetch('api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { response, data: await response.json() };
  }

  async function load() {
    errorEl.hidden = true;
    try {
      const { response, data } = await api({ action: 'list' });
      if (response.status === 401) {
        panel.hidden = true;
        loginView.hidden = false;
        const generator = document.getElementById('event-generator');
        if (generator) generator.hidden = true;
        loginError.hidden = true;
        return;
      }
      if (!data.ok) throw new Error(data.error || 'Gagal memuat data.');
      records = data.records;
      loginView.hidden = true;
      panel.hidden = false;
      const generator = document.getElementById('event-generator');
      if (generator) generator.hidden = false;
      window.dispatchEvent(new Event('admin:ready'));
      render();
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    }
  }

  function filtered() {
    const slug = eventFilter ? eventFilter.value : '';
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    return records.filter((row) => {
      if (slug && row.source !== slug) return false;
      if (!q) return true;
      return Object.values(row)
        .some((value) => String(value ?? '').toLowerCase().includes(q));
    });
  }

  function render() {
    const rows = filtered();
    if (countEl) {
      const activeFilter = (eventFilter && eventFilter.value) || (searchInput && searchInput.value.trim());
      countEl.innerHTML = `<strong>${rows.length} pendaftar</strong>`
        + (activeFilter ? ` <span>· dari ${records.length} total</span>` : '');
    }
    if (!tbody) return;

    tbody.innerHTML = rows.map((row) => `
      <tr>
        <td><strong>${escapeHtml(row.name)}</strong>
          <small>${escapeHtml(row.institution)} Â· ${escapeHtml(row.position)}</small>
          <small class="admin-id">ID: ${escapeHtml(row.id)}</small></td>
        <td><span>${escapeHtml(row.whatsapp)}</span><small>${escapeHtml(row.email)}</small></td>
        <td><span>${escapeHtml(row.city)}</span><small>${escapeHtml(row.info_source)}</small></td>
        <td><small>${escapeHtml(row.created_at)}</small></td>
        <td><select class="status-select status-select--${escapeHtml(row.status)}" data-id="${escapeHtml(row.id)}">
          ${['pending', 'lunas', 'terkonfirmasi'].map((s) =>
            `<option value="${s}"${s === row.status ? ' selected' : ''}>${escapeHtml(statusLabels[s] || s)}</option>`
          ).join('')}
        </select></td>
        <td><button class="admin-delete" type="button" data-delete="${escapeHtml(row.id)}" aria-label="Hapus pendaftar">Hapus</button></td>
      </tr>`).join('') || `<tr><td colspan="6" class="admin-empty">Belum ada pendaftar yang cocok.</td></tr>`;

    tbody.querySelectorAll('[data-delete]').forEach((button) => {
      button.addEventListener('click', async () => {
        const id = button.dataset.delete;
        if (!window.confirm('Hapus data pendaftar ini?')) return;
        try {
          const { data } = await api({ action: 'delete', id });
          if (!data.ok) throw new Error(data.error || 'Gagal menghapus data.');
          await load();
        } catch (err) {
          errorEl.textContent = err.message;
          errorEl.hidden = false;
        }
      });
    });

    tbody.querySelectorAll('select').forEach((select) => {
      select.addEventListener('change', async () => {
        const id = select.dataset.id;
        const status = select.value;
        records = records.map((r) => r.id === id ? { ...r, status } : r);
        try {
          const { data } = await api({ action: 'status', id, status });
          if (!data.ok) throw new Error(data.error || 'Gagal mengubah status.');
        } catch (err) {
          errorEl.textContent = err.message;
          errorEl.hidden = false;
          load();
        }
      });
    });
  }

  function exportCsv() {
    const columns = window.ADMIN_CSV_COLUMNS || [];
    const header = columns.map((c) => c.label);
    const rows = filtered().map((row) => columns.map((c) =>
      c.key === 'status' ? (statusLabels[row.status] || row.status) : String(row[c.key] ?? '')
    ));
    const quote = (v) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [header, ...rows].map((r) => r.map(quote).join(',')).join('\r\n');
    downloadBlob(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' }),
      `pendaftar-spmi-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  load();
})();
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
   E-Sertifikat
   ========================================================= */
(function initCertificate() {
  const form = document.getElementById('certificate-form');
  if (!form) return;

  const input = document.getElementById('cert-whatsapp');
  const errorEl = document.getElementById('cert-error');
  const noticeEl = document.getElementById('cert-notice');
  const resultEl = document.getElementById('cert-result');
  const button = document.getElementById('cert-submit');
  let currentRecord = null;
  let currentSvg = '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;
    noticeEl.hidden = true;
    resultEl.hidden = true;
    currentRecord = null;

    button.disabled = true;
    button.textContent = 'Mencari data...';

    try {
      const response = await fetch('api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp: input.value }),
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

      currentRecord = result.record;
      if (result.event) window.EVENT_DATA = result.event;
      if (result.certificate) window.EVENT_CERTIFICATE = result.certificate;
      currentSvg = buildCertificateSvg(currentRecord);
      renderCertificate(currentRecord, currentSvg);
      resultEl.hidden = false;
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    } finally {
      button.disabled = false;
      button.textContent = 'Cek E-Sertifikat';
    }
  });

  document.getElementById('download-svg')?.addEventListener('click', () => {
    if (!currentSvg || !currentRecord) return;
    downloadBlob(new Blob([currentSvg], { type: 'image/svg+xml;charset=utf-8' }),
      `e-sertifikat-${slug(currentRecord.name)}.svg`);
  });

  document.getElementById('download-png')?.addEventListener('click', () => {
    if (!currentSvg || !currentRecord) return;
    const url = URL.createObjectURL(new Blob([currentSvg], { type: 'image/svg+xml;charset=utf-8' }));
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 850;
      canvas.getContext('2d').drawImage(image, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `e-sertifikat-${slug(currentRecord.name)}.png`);
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    image.onerror = () => { URL.revokeObjectURL(url); };
    image.src = url;
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

function escapeXml(value) {
  return String(value ?? '').replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[c]);
}

function buildCertificateSvg(record) {
  const config = window.EVENT_CERTIFICATE;
  const event = window.EVENT_DATA;
  const name = escapeXml(record.name);
  const institution = escapeXml(record.institution);
  const titles = event.title_lines.map((line) => escapeXml(line.text));
  const number = escapeXml(`${config.prefix || 'SPMI-PI'}/${new Date().getFullYear()}/${String(record.id).slice(0, 8).toUpperCase()}`);
  const date = escapeXml(event.date);
  const venue = escapeXml(event.venue || 'Zoom Meeting');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fffdf9"/><stop offset="100%" stop-color="#f4ecdd"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#a67c1e"/><stop offset="50%" stop-color="#d9b46c"/><stop offset="100%" stop-color="#a67c1e"/></linearGradient>
  </defs>
  <rect width="1200" height="850" fill="url(#bg)"/>
  <rect x="26" y="26" width="1148" height="798" fill="none" stroke="#c5a059" stroke-width="3"/>
  <rect x="40" y="40" width="1120" height="770" fill="none" stroke="#c5a059" stroke-width="1" opacity="0.55"/>
  <rect x="520" y="70" width="160" height="5" fill="url(#gold)"/>
  <text x="600" y="145" text-anchor="middle" font-family="Georgia, serif" font-size="54" letter-spacing="12" fill="#0b2545">SERTIFIKAT</text>
  <text x="600" y="185" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" letter-spacing="3" fill="#a67c1e">CERTIFICATE OF PARTICIPATION</text>
  <text x="600" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" fill="#64748b">Diberikan dengan hormat kepada</text>
  <text x="600" y="315" text-anchor="middle" font-family="Georgia, serif" font-size="46" font-weight="bold" fill="#0b2545">${name}</text>
  <line x1="300" y1="335" x2="900" y2="335" stroke="#c5a059" stroke-width="1.5"/>
  <text x="600" y="385" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#475569">Atas partisipasinya dalam pelatihan</text>
  <text x="600" y="435" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#123257">${titles[0] || ''}</text>
  <text x="600" y="475" text-anchor="middle" font-family="Georgia, serif" font-size="23" fill="#123257">${titles[1] || ''}</text>
  <text x="600" y="525" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" fill="#64748b">${institution}</text>
  <rect x="230" y="556" width="740" height="68" rx="8" fill="#ffffff" stroke="#c5a059" stroke-width="1"/>
  <text x="600" y="586" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#64748b">Diselenggarakan pada</text>
  <text x="600" y="611" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0b2545">${date} · ${venue}</text>
  <line x1="730" y1="700" x2="1070" y2="700" stroke="#0b2545" stroke-width="1.5"/>
  <text x="900" y="730" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0b2545">${escapeXml(config.signatory_name)}</text>
  <text x="900" y="755" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#64748b">${escapeXml(config.signatory_role)}</text>
  <text x="130" y="750" text-anchor="start" font-family="Arial, sans-serif" font-size="13" fill="#64748b">No. ${number}</text>
  <text x="130" y="775" text-anchor="start" font-family="Arial, sans-serif" font-size="13" fill="#64748b">${escapeXml(event.organizer)}</text>
</svg>`;
}

function renderCertificate(record, svg) {
  const name = document.getElementById('cert-name');
  const badge = document.getElementById('cert-badge');
  const grid = document.getElementById('cert-grid');
  const preview = document.getElementById('cert-preview');
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
  if (preview) preview.innerHTML = svg;
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
  });

  searchInput?.addEventListener('input', render);
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
        loginError.hidden = true;
        return;
      }
      if (!data.ok) throw new Error(data.error || 'Gagal memuat data.');
      records = data.records;
      loginView.hidden = true;
      panel.hidden = false;
      render();
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.hidden = false;
    }
  }

  function filtered() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (!q) return records;
    return records.filter((row) => Object.values(row)
      .some((value) => String(value ?? '').toLowerCase().includes(q)));
  }

  function render() {
    const rows = filtered();
    if (countEl) {
      countEl.innerHTML = `<strong>${records.length} pendaftar</strong>`
        + (searchInput && searchInput.value.trim()
          ? ` <span>· ${rows.length} hasil pencarian</span>` : '');
    }
    if (!tbody) return;

    tbody.innerHTML = rows.map((row) => `
      <tr>
        <td><strong>${escapeHtml(row.name)}</strong>
          <small>${escapeHtml(row.institution)} · ${escapeHtml(row.position)}</small>
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

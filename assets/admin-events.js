'use strict';

(function initEventGenerator() {
  const section = document.getElementById('event-generator');
  if (!section) return;

  const readForm = document.getElementById('event-gen-form');
  const createForm = document.getElementById('event-create-form');
  const flyerInput = document.getElementById('gen-flyer');
  const preview = document.getElementById('gen-preview');
  const previewImg = document.getElementById('gen-preview-img');
  const errorEl = document.getElementById('gen-error');
  const statusEl = document.getElementById('gen-status');
  const readBtn = document.getElementById('gen-read-btn');
  const cancelBtn = document.getElementById('event-cancel-btn');
  const generatedList = document.getElementById('generated-list');
  const generatedCount = document.getElementById('generated-count');
  const dropzone = document.getElementById('gen-dropzone');
  const filenameEl = document.getElementById('gen-filename');
  const progress = document.getElementById('gen-progress');
  const progressText = document.getElementById('gen-progress-text');
  const progressBar = document.getElementById('gen-progress-bar');
  const steps = [...document.querySelectorAll('.gen-step')];
  const generateBtn = document.getElementById('event-generate-btn');
  let editingSlug = '';

  const MONTHS = {
    januari: 1, februari: 2, maret: 3, april: 4, mei: 5, juni: 6,
    juli: 7, agustus: 8, september: 9, oktober: 10, november: 11, desember: 12,
  };
  const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  function setBusy(button, busy, busyText, normalText) {
    button.disabled = busy;
    button.textContent = busy ? busyText : normalText;
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    statusEl.hidden = true;
  }

  function showStatus(message, type = 'ok') {
    statusEl.textContent = message;
    statusEl.className = 'admin-notice admin-notice--' + type;
    statusEl.hidden = false;
    errorEl.hidden = true;
  }

  function setStep(active) {
    steps.forEach((step) => {
      const number = Number(step.dataset.step);
      step.classList.toggle('gen-step--active', number === active);
      step.classList.toggle('gen-step--done', number < active);
    });
  }

  function setProgress(text, percent) {
    progress.hidden = false;
    progressText.textContent = text;
    progressBar.style.width = Math.max(0, Math.min(100, percent)) + '%';
  }

  function hideProgress() {
    progress.hidden = true;
    progressBar.style.width = '0%';
  }

  async function api(payload) {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { response, data: await response.json() };
  }

  async function recognizeTitle(file) {
    if (typeof window.Tesseract === 'undefined') return '';
    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      const cropHeight = Math.floor(bitmap.height * 0.42);
      canvas.width = bitmap.width * 2;
      canvas.height = cropHeight * 2;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(bitmap, 0, 0, bitmap.width, cropHeight, 0, 0, canvas.width, canvas.height);
      const result = await window.Tesseract.recognize(canvas, 'ind+eng');
      return result.data.text || '';
    } catch (err) {
      return '';
    }
  }

  function parseFlyerText(raw, titleRaw = '') {
    const text = (raw || '').replace(/[ \t]+/g, ' ');
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const upper = lines.map((l) => l.toUpperCase());

    // Judul memakai hasil OCR khusus bagian atas flyer (lebih akurat untuk font besar).
    const titleSource = (titleRaw || '').replace(/[ \t]+/g, ' ');
    const titleLines = titleSource.split('\n').map((l) => l.trim()).filter(Boolean);
    const titleUpper = titleLines.map((l) => l.toUpperCase());

    const keywords = ['WORKSHOP', 'PELATIHAN', 'SEMINAR', 'TRAINING', 'WEBINAR', 'KURSUS', 'AUDIT', 'SPMI'];
    let title = '';
    for (let i = 0; i < titleUpper.length; i++) {
      if (keywords.some((k) => titleUpper[i].includes(k)) && titleUpper[i].length > 6) {
        title = titleLines[i];
        const next = titleLines[i + 1] || '';
        if (next && next.length < 60 && !/\d{4}/.test(next) && !/Rp/i.test(next) && title.length < 45) {
          title += ' ' + next;
        }
        break;
      }
    }
    if (!title) {
      const candidate = [...titleLines, ...lines].find((l) =>
        l.length > 12 && /[A-Za-z]/.test(l) && !/\d{4}|Rp|@|http/i.test(l)
        && (l.match(/[A-Z]/g) || []).length > l.length * 0.5
      );
      title = candidate || '';
    }
    title = title.replace(/^[^A-Za-z0-9]+/, '').trim();

    // Tanggal: "07 Desember 2026" atau "7 Des 2026", dengan/without nama hari.
    let date = '';
    let dayNum = 0;
    let monthNum = 0;
    let year = new Date().getFullYear();
    const dateMatch = text.match(/(\d{1,2})\s+(Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)\b[\s,]*(\d{4})/i);
    if (dateMatch) {
      dayNum = parseInt(dateMatch[1], 10);
      const monthKey = dateMatch[2].toLowerCase().slice(0, 3);
      const found = Object.keys(MONTHS).find((m) => m.startsWith(monthKey));
      monthNum = found ? MONTHS[found] : 1;
      year = parseInt(dateMatch[3], 10);
      const dayPrefix = text.match(/(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu)\s*,?\s*\d{1,2}/i);
      const dayName = dayPrefix ? dayPrefix[1].charAt(0).toUpperCase() + dayPrefix[1].slice(1).toLowerCase() : DAY_NAMES[new Date(year, monthNum - 1, dayNum).getDay()];
      const monthName = found ? found.charAt(0).toUpperCase() + found.slice(1) : dateMatch[2];
      date = dayName + ', ' + String(dayNum).padStart(2, '0') + ' ' + monthName + ' ' + year;
    }

    // Waktu: 08.00 - 16.30
    let time = '';
    const timeMatch = text.match(/(\d{1,2})[.:](\d{2})\s*(?:-|–|—|s\.?d\.?|to)\s*(\d{1,2})[.:](\d{2})/i);
    if (timeMatch) {
      time = timeMatch[1].padStart(2, '0') + '.' + timeMatch[2] + ' – '
        + timeMatch[3].padStart(2, '0') + '.' + timeMatch[4] + ' WIB';
    }

    // Harga: ambil semua angka Rp, pakai yang terkecil sebagai Early Bird.
    const prices = [...text.matchAll(/Rp\.?\s*([\d.,]+)/gi)]
      .map((m) => parseInt(m[1].replace(/[^\d]/g, ''), 10))
      .filter((n) => n > 1000);
    let price = prices.length ? Math.min(...prices) : 0;
    let priceLabel = prices.length > 1 ? 'Early Bird' : 'Pendaftaran';

    if (!price) {
      const earlyIndex = text.toLowerCase().indexOf('early bird');
      if (earlyIndex >= 0) {
        const chunk = text.slice(earlyIndex, earlyIndex + 120);
        const candidates = [...chunk.matchAll(/\d+(?:[ .]\d+){1,4}/g)]
          .map((m) => parseInt(m[0].replace(/\D/g, ''), 10))
          .filter((n) => n >= 50000 && n <= 10000000);
        if (candidates.length) {
          price = candidates[0];
          priceLabel = 'Early Bird';
        }
      }
    }

    // Narasumber: baris setelah penanda PEMATERI/NARASUMBER.
    let speaker = '';
    const speakerIndex = upper.findIndex((l) => /PEMATERI|NARASUMBER|PEMBICARA/.test(l));
    if (speakerIndex >= 0) {
      for (let i = speakerIndex + 1; i < lines.length; i++) {
        const candidate = lines[i].replace(/^[^A-Za-z0-9]+/, '');
        if (candidate.length > 8 && !/^\d/.test(candidate)) { speaker = candidate; break; }
      }
    }
    if (!speaker) {
      speaker = lines.find((l) => /^(Dr\.|Prof\.|Ir\.|H\.)/i.test(l) && l.length > 15)
        || lines.find((l) => /M\.Pd|M\.T\.|CIIQA|CIT|AMLE/i.test(l) && l.length > 20)
        || '';
    }

    // Lokasi: baris yang menyebut kampus/aula/jalan/zoom.
    let location = '';
    const locationIndex = upper.findIndex((l) => /KAMPUS|AULA|GEDUNG|JALAN|ZOOM|ONLINE|OFFLINE|DEPOK|BOGOR|IBS/.test(l));
    if (locationIndex >= 0) {
      const line = lines[locationIndex];
      const match = line.match(/(Kampus|Aula|Gedung|Jalan|Zoom|Online|Offline)[\s\S]*/i);
      location = match ? match[0].trim() : line;
      location = location
        .replace(/\s+(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu|WIB|THLE|rh\b|\d{1,2}\s+[A-Za-z])[\s\S]*$/i, '')
        .replace(/\s+/g, ' ')
        .replace(/[~|\[\]]/g, '')
        .trim();
    }

    // WhatsApp.
    let whatsapp = '';
    const waMatch = text.match(/(0\d{2,4})[\s.\-]?(\d{3,4})[\s.\-]?(\d{3,5})/);
    if (waMatch) {
      whatsapp = waMatch[0].trim();
    } else {
      const longDigits = (text.match(/\d[\d\s\-]{8,15}\d/g) || [])
        .map((s) => s.replace(/\D/g, ''))
        .find((s) => /^(0|62)\d{8,12}$/.test(s));
      if (longDigits) whatsapp = longDigits;
    }

    // Ringkasan: baris deskriptif pertama di bawah judul.
    const titleIndex = upper.indexOf(title.toUpperCase());
    let summary = '';
    if (titleIndex >= 0) {
      summary = lines.slice(titleIndex + 1, titleIndex + 4)
        .filter((l) => l.length > 25 && !/Rp|\d{4}/.test(l))
        .join(' ');
    }
    if (!summary) summary = title + ' — informasi lengkap tersedia pada halaman event.';

    // ISO datetime untuk countdown.
    let startAt = '';
    let endAt = '';
    if (dayNum && monthNum) {
      const hm = timeMatch;
      const sh = hm ? hm[1].padStart(2, '0') : '08';
      const sm = hm ? hm[2] : '00';
      const eh = hm ? hm[3].padStart(2, '0') : '16';
      const em = hm ? hm[4] : '00';
      const ymd = year + '-' + String(monthNum).padStart(2, '0') + '-' + String(dayNum).padStart(2, '0');
      startAt = ymd + 'T' + sh + ':' + sm + ':00+07:00';
      endAt = ymd + 'T' + eh + ':' + em + ':00+07:00';
    }

    return { title, date, time, location, price, priceLabel, speaker, whatsapp, summary, startAt, endAt, raw: text };
  }

  function fillFields(data) {
    document.getElementById('ev-title').value = data.title || '';
    document.getElementById('ev-date').value = data.date || '';
    document.getElementById('ev-time').value = data.time || '';
    document.getElementById('ev-location').value = data.location || '';
    document.getElementById('ev-price').value = data.price || '';
    document.getElementById('ev-price-label').value = data.priceLabel || '';
    const firstSpeaker = document.querySelector('[name="speaker_1"]');
    if (firstSpeaker) firstSpeaker.value = data.speaker || '';
    document.getElementById('ev-whatsapp').value = data.whatsapp || '';
    document.getElementById('ev-summary').value = data.summary || '';
  }

  function setFieldValues(flyerUrl) {
    document.getElementById('ev-flyer').value = flyerUrl;
  }

  async function loadGenerated() {
    try {
      const { response, data } = await api({ action: 'event_list' });
      if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat event.');
      if (generatedCount) generatedCount.textContent = '(' + data.events.length + ')';
      if (!data.events.length) {
        generatedList.innerHTML = '<p class="admin-empty">Belum ada event yang dibuat dari panel admin.</p>';
        return;
      }
      generatedList.innerHTML = data.events.map((ev) => `
        <div class="generated-item">
          <div class="generated-item__main">
            <img class="generated-item__thumb" src="${escapeHtml(ev.flyer || 'assets/flyer.jpeg')}" alt="Flyer ${escapeHtml(ev.title)}">
            <div>
              <strong>${escapeHtml(ev.title)}</strong>
              <small>${escapeHtml(ev.date || '-')} · /event?slug=${encodeURIComponent(ev.slug)}</small>
            </div>
          </div>
          <div class="generated-item__actions">
            <a class="btn btn--outline" href="/event?slug=${encodeURIComponent(ev.slug)}" target="_blank" rel="noopener noreferrer">Lihat</a>
            <button class="btn btn--outline" type="button" data-event-edit="${escapeHtml(ev.slug)}">Edit</button>
            <button class="admin-delete" type="button" data-event-slug="${escapeHtml(ev.slug)}">Hapus</button>
          </div>
        </div>`).join('');

      generatedList.querySelectorAll('[data-event-slug]').forEach((button) => {
        button.addEventListener('click', async () => {
          if (!window.confirm('Hapus event ini? Event akan hilang dari halaman utama.')) return;
          try {
            const res = await api({ action: 'event_delete', slug: button.dataset.eventSlug });
            if (!res.data.ok) throw new Error(res.data.error || 'Gagal menghapus event.');
            await loadGenerated();
          } catch (err) { showError(err.message); }
        });
      });

      generatedList.querySelectorAll('[data-event-edit]').forEach((button) => {
        button.addEventListener('click', async () => {
          try {
            const { response, data } = await api({ action: 'event_get', slug: button.dataset.eventEdit });
            if (!response.ok || !data.ok) throw new Error(data.error || 'Gagal memuat event.');
            const ev = data.event;
            editingSlug = ev.slug;
            document.getElementById('ev-title').value = ev.title || '';
            document.getElementById('ev-date').value = ev.date || '';
            document.getElementById('ev-time').value = ev.time || '';
            document.getElementById('ev-location').value = ev.location || '';
            document.getElementById('ev-price').value = ev.price_tiers?.[0]?.price || '';
            document.getElementById('ev-price-label').value = ev.price_tiers?.[0]?.flyer_label || ev.price_tiers?.[0]?.label || '';
            ['speaker_1', 'speaker_2', 'speaker_3'].forEach((name, index) => {
              const input = document.querySelector('[name="' + name + '"]');
              if (input) input.value = ev.speakers?.[index]?.name || '';
            });
            document.getElementById('ev-whatsapp').value = ev.contact?.whatsapp || '';
            document.getElementById('ev-summary').value = ev.summary || '';
            document.getElementById('ev-flyer').value = ev.flyer || '';
            const sections = ev.sections || {};
            ['speakers', 'pricing', 'benefits', 'agenda', 'feedback'].forEach((key) => {
              const box = document.querySelector('[name="sec_' + key + '"]');
              if (box) box.checked = sections[key] !== false;
            });
            generateBtn.textContent = 'Simpan Perubahan';
            createForm.hidden = false;
            setStep(2);
            showStatus('Sedang mengedit event: ' + ev.title, 'warn');
            createForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  readForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.hidden = true;
    statusEl.hidden = true;
    const file = flyerInput.files && flyerInput.files[0];
    if (!file) { showError('Pilih file flyer terlebih dahulu.'); return; }

    previewImg.src = URL.createObjectURL(file);
    preview.hidden = false;
    setStep(1);
    setProgress('Mengupload flyer...', 10);
    setBusy(readBtn, true, 'Memproses...', 'Baca Flyer & Isi Otomatis');

    let flyerUrl = '';
    try {
      const formData = new FormData();
      formData.append('action', 'flyer_upload');
      formData.append('flyer', file);
      const uploadResponse = await fetch('/api/admin', { method: 'POST', body: formData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok || !uploadResult.ok) throw new Error(uploadResult.error || 'Gagal mengupload flyer.');
      flyerUrl = uploadResult.url;
      setFieldValues(flyerUrl);

      let parsed;
      if (typeof window.Tesseract === 'undefined') {
        hideProgress();
        parsed = { title: '', summary: '' };
        showStatus('OCR tidak tersedia. Silakan isi field secara manual lalu klik Generate.', 'warn');
      } else {
        setProgress('Membaca teks flyer...', 35);
        const result = await window.Tesseract.recognize(file, 'ind+eng', {
          logger: (message) => {
            if (message.status === 'recognizing text') {
              setProgress('Membaca teks flyer... ' + Math.round(message.progress * 100) + '%',
                35 + message.progress * 45);
            }
          },
        });
        setProgress('Membaca judul dari bagian atas flyer...', 85);
        const titleText = await recognizeTitle(file);
        parsed = parseFlyerText(result.data.text, titleText);
        setProgress('Selesai', 100);
        hideProgress();
        showStatus(parsed.title
          ? 'Judul dan informasi terbaca dari flyer. Silakan koreksi sebelum generate.'
          : 'Judul tidak terbaca otomatis. Silakan isi manual sebelum generate.',
          parsed.title ? 'ok' : 'warn');
      }

      fillFields(parsed);
      setStep(2);
      createForm.hidden = false;
      createForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      hideProgress();
      setStep(1);
      showError(err.message);
    } finally {
      setBusy(readBtn, false, '', 'Baca Flyer & Isi Otomatis');
    }
  });

  function resetForm(clearStatus = false) {
    createForm.reset();
    editingSlug = '';
    generateBtn.textContent = 'Generate Event';
    createForm.hidden = true;
    preview.hidden = true;
    flyerInput.value = '';
    filenameEl.textContent = 'Belum ada file dipilih';
    errorEl.hidden = true;
    hideProgress();
    setStep(1);
    if (clearStatus) statusEl.hidden = true;
  }

  cancelBtn.addEventListener('click', () => resetForm(true));

  flyerInput.addEventListener('change', () => {
    const file = flyerInput.files && flyerInput.files[0];
    filenameEl.textContent = file ? file.name : 'Belum ada file dipilih';
  });

  ['dragenter', 'dragover'].forEach((name) => {
    dropzone.addEventListener(name, (event) => {
      event.preventDefault();
      dropzone.classList.add('gen-dropzone--active');
    });
  });
  ['dragleave', 'drop'].forEach((name) => {
    dropzone.addEventListener(name, (event) => {
      event.preventDefault();
      dropzone.classList.remove('gen-dropzone--active');
    });
  });
  dropzone.addEventListener('drop', (event) => {
    const file = event.dataTransfer && event.dataTransfer.files[0];
    if (!file) return;
    const transfer = new DataTransfer();
    transfer.items.add(file);
    flyerInput.files = transfer.files;
    flyerInput.dispatchEvent(new Event('change', { bubbles: true }));
  });

  createForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(createForm);
    const payload = {
      action: editingSlug ? 'event_update' : 'event_create',
      slug: editingSlug,
      title: data.get('title'),
      date: data.get('date'),
      time: data.get('time'),
      location: data.get('location'),
      price: Number(data.get('price') || 0),
      price_label: data.get('price_label'),
      speakers: ['speaker_1', 'speaker_2', 'speaker_3']
        .map((key) => String(data.get(key) || '').trim())
        .filter(Boolean),
      whatsapp: data.get('whatsapp'),
      summary: data.get('summary'),
      flyer: data.get('flyer'),
      sections: {
        speakers: data.has('sec_speakers'),
        pricing: data.has('sec_pricing'),
        benefits: data.has('sec_benefits'),
        agenda: data.has('sec_agenda'),
        feedback: data.has('sec_feedback'),
      },
    };

    const busyText = editingSlug ? 'Menyimpan perubahan...' : 'Membuat event...';
    const normalText = editingSlug ? 'Simpan Perubahan' : 'Generate Event';
    setBusy(generateBtn, true, busyText, normalText);
    try {
      const { response, data: result } = await api(payload);
      if (!response.ok || !result.ok) throw new Error(result.error || 'Gagal menyimpan event.');
      const message = (editingSlug ? 'Event berhasil diperbarui: ' : 'Event berhasil dibuat: ')
        + '/event?slug=' + result.event.slug;
      resetForm();
      setStep(3);
      showStatus(message);
      await loadGenerated();
    } catch (err) {
      showError(err.message);
    } finally {
      setBusy(generateBtn, false, '', 'Generate Event');
    }
  });

  window.addEventListener('admin:ready', loadGenerated);
  loadGenerated();
})();

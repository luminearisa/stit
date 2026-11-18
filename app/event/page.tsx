import './event.css';
import type { Metadata } from 'next';
import HideGlobalChrome from '@/components/HideGlobalChrome';
import EventNav from '@/components/event/EventNav';
import Countdown from '@/components/event/Countdown';
import EventFAQ from '@/components/event/EventFAQ';
import RegistrationForm from '@/components/event/RegistrationForm';
import {
  event,
  speakers,
  priceTiers,
  payment,
  facilities,
  benefits,
  agenda,
  contact,
  formatRupiah,
} from '@/data/event';

export const metadata: Metadata = {
  title: `${event.fullTitle} | ${event.organizerShort}`,
  description: event.description,
  openGraph: {
    title: event.fullTitle,
    description: event.description,
    type: 'website',
  },
};

const iconPaths: Record<string, React.ReactNode> = {
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  video: <><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m16 11 6-4v10l-6-4" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  check: <path d="m5 13 4 4L19 7" />,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  whatsapp: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /><path d="M16.5 11.5c-.2-.5-1-.2-1.4-.1l-.7.4a6 6 0 0 1-2.7-2.7l.4-.7c.2-.4.4-.9-.1-1.1L11 6c-.4-.2-1-.1-1.4.6a11 11 0 0 0 1.8 6.6 11 11 0 0 0 6.6 1.8c.7-.4.8-1 .6-1.4Z" /></>,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M18 6h.01" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>,
  sparkles: <><path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /><path d="M19 16v4M17 18h4" /></>,
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name] ?? iconPaths.check}
    </svg>
  );
}

export default function EventPage() {
  const themeStyle = {
    '--brand-primary': event.theme.primary,
    '--brand-secondary': event.theme.secondary,
    '--brand-accent': event.theme.accent,
    '--brand-gold': event.theme.gold,
  } as React.CSSProperties;

  return (
    <div className="event-page" id="top" style={themeStyle}>
      <HideGlobalChrome />
      <EventNav />

      <main>
        {/* ============ HERO / FLYER ============ */}
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero__glow hero__glow--one" aria-hidden="true" />
          <div className="hero__glow hero__glow--two" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__content">
              <p className="hero__eyebrow"><span className="pulse-dot" aria-hidden="true" />{event.eyebrow}</p>
              <h1 className="hero__title" id="hero-title">
                <span className="hero__title-kicker">{event.titleKicker}</span>
                {event.titleLines.map((line) => (
                  <span
                    key={line.text}
                    className={line.tone === 'accent' ? 'hero__title-accent' : 'hero__title-main'}
                  >
                    {line.text}
                  </span>
                ))}
              </h1>
              <p className="hero__subtitle">{event.subtitle}</p>

              <ul className="hero__meta" role="list">
                <li><Icon name="calendar" /><span><small>Tanggal</small>{event.date}</span></li>
                <li><Icon name="clock" /><span><small>Waktu</small>{event.time}</span></li>
                <li><Icon name="video" /><span><small>Platform</small>{event.platform}</span></li>
              </ul>

              <Countdown />

              <div className="hero__actions">
                <a className="btn btn--gold" href="#daftar">Daftar Sekarang</a>
                <a className="btn btn--outline" href="#biaya">Lihat Biaya</a>
              </div>

              <div className="hero__organizers">
                <span>Diselenggarakan oleh</span>
                <strong>{event.organizer}</strong>
              </div>
            </div>

            {/* Flyer: gambar asli bila tersedia, jika tidak dibuat otomatis dari data */}
            <div className="hero__media">
              {event.flyerImage ? (
                <figure className="flyer flyer--image">
                  <img className="flyer__image" src={event.flyerImage} alt={`Flyer ${event.fullTitle}`} />
                  <figcaption className="hero__flyer-caption">Flyer resmi · {event.organizer}</figcaption>
                </figure>
              ) : (
                <figure className="flyer" role="img" aria-label={`Flyer ${event.fullTitle}`}>
                  <div className="flyer__partners">
                    {event.partners.map((partner, index) => (
                      <span
                        key={partner}
                        className={[
                          'flyer__partner',
                          index === 0 ? 'flyer__partner--zoom' : '',
                          index === event.partners.length - 1 ? 'flyer__partner--pL' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {partner}
                      </span>
                    ))}
                  </div>

                  <div className="flyer__body">
                    <p className="flyer__kicker">{event.titleKicker.toUpperCase()}</p>
                    <h2 className="flyer__title">
                      {event.titleLines.map((line) => (
                        <span key={line.text} className={line.tone === 'accent' ? 'flyer__title-accent' : undefined}>
                          {line.highlight && line.text.includes(line.highlight) ? (
                            <>
                              {line.text.split(line.highlight)[0]}
                              <em>{line.highlight}</em>
                              {line.text.split(line.highlight)[1]}
                            </>
                          ) : (
                            line.text
                          )}
                        </span>
                      ))}
                    </h2>

                    <div className="flyer__speakers">
                      {speakers.map((speaker) => (
                        <div className="flyer__speaker" key={speaker.name}>
                          <div className="flyer__speaker-photo" aria-hidden="true">
                            <span>{speaker.initials}</span>
                            <i />
                          </div>
                          <div className="flyer__speaker-info">
                            <strong>{speaker.name}</strong>
                            <span>{speaker.role}</span>
                            <small>{speaker.bio}</small>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flyer__date">
                      <strong>{event.date.toUpperCase()}</strong>
                      <span>{event.time}</span>
                    </div>

                    <div
                      className="flyer__price"
                      style={{ gridTemplateColumns: `repeat(${priceTiers.length}, minmax(0, 1fr))` }}
                    >
                      {priceTiers.map((tier) => (
                        <div key={tier.id}>
                          <span>{tier.flyerLabel ?? tier.label}</span>
                          <strong>
                            {formatRupiah(tier.price)}
                            {tier.unit === '/orang' && <small>{tier.unit}</small>}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flyer__footer">
                    <span><Icon name="whatsapp" /> {contact.whatsapp}</span>
                    <span><Icon name="instagram" /> {contact.instagram}</span>
                  </div>
                </figure>
              )}
              <p className="hero__flyer-caption">Flyer resmi pelatihan · {event.organizer}</p>
            </div>
          </div>
        </section>

        {/* ============ INFORMASI ============ */}
        <section className="section" id="informasi" aria-labelledby="informasi-title">
          <div className="container">
            <div className="section-heading">
              <p className="section-heading__eyebrow">Tentang Acara</p>
              <h2 className="section-heading__title" id="informasi-title">Informasi Pelatihan</h2>
              <p className="section-heading__desc">{event.description}</p>
            </div>

            <div className="info-grid">
              {[
                { icon: 'calendar', label: 'Tanggal', value: event.date },
                { icon: 'clock', label: 'Waktu', value: event.time },
                { icon: 'video', label: 'Format', value: 'Online · Zoom Meeting' },
                { icon: 'users', label: 'Penyelenggara', value: event.organizer },
              ].map((item) => (
                <article className="info-card" key={item.label}>
                  <span className="info-card__icon"><Icon name={item.icon} /></span>
                  <div>
                    <span className="info-card__label">{item.label}</span>
                    <strong className="info-card__value">{item.value}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="info-note">
              <Icon name="sparkles" />
              <p>
                <strong>Siapa yang sebaiknya mengikuti?</strong> Pimpinan, dosen, tenaga
                kependidikan, unit penjaminan mutu, serta siapa pun yang terlibat dalam
                penyusunan dan pengelolaan SPMI di perguruan tinggi.
              </p>
            </div>
          </div>
        </section>

        {/* ============ BIAYA ============ */}
        <section className="section section--muted" id="biaya" aria-labelledby="biaya-title">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-heading__eyebrow">Investasi Ilmu</p>
              <h2 className="section-heading__title" id="biaya-title">Biaya Pendaftaran</h2>
              <p className="section-heading__desc">Pilih paket yang sesuai. Pendaftaran kelompok lebih hemat per peserta.</p>
            </div>

            <div className="pricing-grid">
              {priceTiers.map((tier) => (
                <article className={`price-card${tier.featured ? ' price-card--featured' : ''}`} key={tier.id}>
                  {tier.featured && <span className="price-card__badge">Paling Hemat</span>}
                  <h3 className="price-card__name">{tier.label}</h3>
                  <p className="price-card__price">{formatRupiah(tier.price)}<small>{tier.unit}</small></p>
                  <p className="price-card__note">{tier.note}</p>
                  <ul className="price-card__list" role="list">
                    {facilities.map((facility) => (
                      <li key={facility}><Icon name="check" />{facility}</li>
                    ))}
                  </ul>
                  <a className={`btn ${tier.featured ? 'btn--gold' : 'btn--outline'} btn--block`} href="#daftar">
                    Daftar Sekarang
                  </a>
                </article>
              ))}
            </div>

            <div className="payment-card">
              <div className="payment-card__icon"><Icon name="sparkles" /></div>
              <div>
                <h3>Cara Pembayaran</h3>
                <p>
                  Transfer ke rekening <strong>{payment.bank}</strong>{' '}
                  <strong className="payment-card__number">{payment.accountNumber}</strong>{' '}
                  a.n. <strong>{payment.accountHolder}</strong>. Konfirmasi pembayaran
                  melalui WhatsApp panitia di <strong>{contact.whatsapp}</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PEMATERI ============ */}
        <section className="section" id="pemateri" aria-labelledby="pemateri-title">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-heading__eyebrow">Narasumber</p>
              <h2 className="section-heading__title" id="pemateri-title">Pengisi Acara</h2>
              <p className="section-heading__desc">Belajar langsung dari praktisi yang mendampingi perguruan tinggi dalam penjaminan mutu.</p>
            </div>

            <div className="speaker-grid">
              {speakers.map((speaker) => (
                <article className="speaker-card" key={speaker.name}>
                  <div className="speaker-card__portrait" aria-hidden="true">
                    <span>{speaker.initials}</span>
                  </div>
                  <div className="speaker-card__body">
                    <p className="speaker-card__role">{speaker.role}</p>
                    <h3>{speaker.name}</h3>
                    <p className="speaker-card__bio">{speaker.bio}</p>
                    <ul className="speaker-card__topics" role="list">
                      {speaker.topics.map((topic) => <li key={topic}>{topic}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ MANFAAT ============ */}
        <section className="section section--muted" id="manfaat" aria-labelledby="manfaat-title">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-heading__eyebrow">Dampak bagi Peserta</p>
              <h2 className="section-heading__title" id="manfaat-title">Kegunaan Mengikuti Pelatihan</h2>
              <p className="section-heading__desc">Bukan sekadar teori — peserta pulang dengan kerangka kerja yang bisa langsung diterapkan.</p>
            </div>

            <div className="benefit-grid">
              {benefits.map((benefit, index) => (
                <article className="benefit-card" key={benefit.title}>
                  <span className="benefit-card__index">0{index + 1}</span>
                  <span className="benefit-card__icon"><Icon name={benefit.icon} /></span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              ))}
            </div>

            <div className="facility-strip">
              <span className="facility-strip__label">Fasilitas peserta:</span>
              {facilities.map((facility) => (
                <span className="facility-strip__item" key={facility}>
                  <Icon name="check" />{facility}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AGENDA ============ */}
        <section className="section" id="agenda" aria-labelledby="agenda-title">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="section-heading__eyebrow">Rangkaian Acara</p>
              <h2 className="section-heading__title" id="agenda-title">Agenda Pelatihan</h2>
              <p className="section-heading__desc">Gambaran alur sesi selama kurang lebih dua jam.</p>
            </div>

            <ol className="timeline">
              {agenda.map((item, index) => (
                <li className="timeline__item" key={item.time}>
                  <span className="timeline__marker" aria-hidden="true">{index + 1}</span>
                  <span className="timeline__time">{item.time}</span>
                  <div className="timeline__content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ FORM PENDAFTARAN ============ */}
        <section className="section section--register" id="daftar" aria-labelledby="daftar-title">
          <div className="container register-grid">
            <div className="register-aside">
              <p className="section-heading__eyebrow">Kuota Terbatas</p>
              <h2 className="section-heading__title" id="daftar-title">Daftar Sekarang</h2>
              <p className="register-aside__desc">
                Isi formulir berikut dengan data yang benar. Panitia akan menghubungi Anda
                untuk konfirmasi pembayaran dan pengiriman link Zoom.
              </p>

              <div className="register-aside__steps">
                {[
                  'Isi formulir pendaftaran',
                  'Transfer ke rekening BCA',
                  'Konfirmasi via WhatsApp',
                  'Terima link Zoom & materi',
                ].map((step, index) => (
                  <div className="register-step" key={step}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <div className="register-aside__contact">
                <span className="register-aside__contact-label">Hubungi panitia</span>
                <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" /> {contact.whatsapp}
                </a>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="instagram" /> {contact.instagram}
                </a>
              </div>
            </div>

            <div className="register-form-card">
              <div className="register-form-card__head">
                <h3>Formulir Pendaftaran</h3>
                <p>Semua field bertanda * wajib diisi.</p>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div className="faq-intro">
              <p className="section-heading__eyebrow">Pertanyaan Umum</p>
              <h2 className="section-heading__title" id="faq-title">Hal yang Sering Ditanyakan</h2>
              <p className="section-heading__desc">
                Masih ragu? Hubungi panitia melalui WhatsApp dan kami akan dengan senang hati membantu.
              </p>
              <a className="btn btn--outline" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> Hubungi Panitia
              </a>
            </div>
            <EventFAQ />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <span className="brand__mark" aria-hidden="true">PI</span>
            <div>
              <strong>{event.organizerShort}</strong>
              <p>Elevating People</p>
            </div>
          </div>
          <p className="site-footer__copy">© 2026 {event.organizer}. Seluruh hak cipta dilindungi.</p>
          <div className="site-footer__links">
            <a href="/event/sertifikat"><Icon name="check" /> E-Sertifikat</a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer"><Icon name="instagram" /> {contact.instagram}</a>
            <a href={`mailto:${contact.email}`}><Icon name="mail" /> Email panitia</a>
          </div>
        </div>
      </footer>

      <a className="floating-wa" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Hubungi panitia via WhatsApp">
        <Icon name="whatsapp" />
      </a>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { event, navLinks } from '@/data/event';

export default function EventNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label={`${event.organizerShort} — ke atas`}>
          <span className="brand__mark" aria-hidden="true">PI</span>
          <span className="brand__text">
            <strong className="brand__name">{event.organizerShort}</strong>
            <span className="brand__event">Elevating People</span>
          </span>
        </a>

        <nav className="site-header__desktop" aria-label="Navigasi utama">
          <ul className="nav" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="nav__link" href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--gold nav__cta" href="/event/sertifikat">E-Sertifikat</a>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="event-mobile-menu"
          aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
          </svg>
        </button>
      </div>

      <div id="event-mobile-menu" className={`mobile-menu${open ? ' mobile-menu--open' : ''}`} hidden={!open}>
        <div className="container">
          <ul className="nav nav--mobile" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="nav__link" href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

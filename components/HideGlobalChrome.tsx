'use client';

import { useEffect } from 'react';

export default function HideGlobalChrome() {
  useEffect(() => {
    const selectors = ['header.fixed', 'footer#footer', 'aside[aria-label="Kontak WhatsApp PMB"]'];
    const els = selectors.flatMap((s) => Array.from(document.querySelectorAll(s)));
    els.forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
    return () => {
      els.forEach((el) => {
        (el as HTMLElement).style.display = '';
      });
    };
  }, []);
  return null;
}
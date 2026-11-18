'use client';

import { useEffect, useState } from 'react';
import { event } from '@/data/event';

type Remaining = { days: number; hours: number; minutes: number; seconds: number; ended: boolean };

function compute(target: number): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const target = new Date(event.countdownTo).getTime();
    setRemaining(compute(target));
    const timer = window.setInterval(() => setRemaining(compute(target)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!remaining) return <div className="countdown countdown--placeholder">Memuat hitung mundur...</div>;

  if (remaining.ended) {
    return <div className="countdown countdown--ended">Acara sedang berlangsung / telah selesai</div>;
  }

  const units = [
    { value: remaining.days, label: 'Hari' },
    { value: remaining.hours, label: 'Jam' },
    { value: remaining.minutes, label: 'Menit' },
    { value: remaining.seconds, label: 'Detik' },
  ];

  return (
    <div className="countdown" aria-label="Hitung mundur menuju acara">
      {units.map((unit) => (
        <div key={unit.label} className="countdown__unit">
          <strong>{String(unit.value).padStart(2, '0')}</strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

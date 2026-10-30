'use client';

export default function VisitorCounter() {
  const src =
    'https://visitor-badge.laobi.icu/badge?page_id=stit-al-wafi-bogor-visits&left_text=Total%20Pengunjung&left_color=3A2B14&right_color=C5A059';

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-gold/30 text-amber-100/90 text-xs font-medium shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Total pengunjung website"
        width={124}
        height={20}
        className="h-4 w-auto"
        loading="lazy"
      />
    </span>
  );
}
import Link from 'next/link';

interface NewsItem {
  title: string;
  href: string;
  image: string;
  date: string;
}

async function fetchLatestNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch('https://alwafi.ac.id/news/', { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const html = await res.text();
    const articles = html.match(/<article[\s\S]*?<\/article>/g) || [];
    const items: NewsItem[] = [];
    for (const art of articles) {
      const imgMatch = art.match(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/);
      const linkMatch = art.match(/href="(\/news\/[^"]+)"/);
      const dateMatch = art.match(/(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})/);
      if (imgMatch && linkMatch) {
        items.push({
          title: imgMatch[2],
          href: `https://alwafi.ac.id${linkMatch[1]}`,
          image: imgMatch[1],
          date: dateMatch ? dateMatch[1] : '',
        });
        if (items.length >= 3) break;
      }
    }
    return items;
  } catch {
    return [];
  }
}

export default async function NewsSection() {
  const news = await fetchLatestNews();

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[#9E7A27] font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
            Berita Terbaru
          </h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-stone-900">
            News STIT
          </h3>
          <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {news.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:border-gold/50 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                {item.date && (
                  <p className="text-xs text-stone-500 mb-2">{item.date}</p>
                )}
                <h4 className="font-bold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-[#9E7A27] transition-colors flex-grow">
                  {item.title}
                </h4>
                <span className="mt-4 text-sm font-semibold text-gold inline-flex items-center gap-1">
                  Baca Selengkapnya →
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="https://alwafi.ac.id/news/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-full hover:shadow-lg transition-all text-sm uppercase tracking-wider"
          >
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
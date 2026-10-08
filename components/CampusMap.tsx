const mapsUrl = "https://maps.app.goo.gl/Yx6uh4HS4v4z7vsS6";
const embedUrl =
    "https://maps.google.com/maps?output=embed&q=Al+Wafi+International+Islamic+Boarding+School+Campus+B,+Jalan+Raya+Pengasinan,+Pengasinan,+Sawangan,+Kota+Depok,+Jawa+Barat+16518";

export default function CampusMap() {
    return (
        <section aria-labelledby="campus-map-title" className="bg-[#FAF8F5] border-y border-stone-200/60 py-24">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                    <div className="space-y-5">
                        <span className="text-[#9E7A27] text-xs md:text-sm font-bold uppercase tracking-widest">
                            Lokasi Kampus B
                        </span>
                        <h2 id="campus-map-title" className="font-heading text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                            Temukan Al Wafi Campus B
                        </h2>
                        <p className="text-stone-600 leading-relaxed">
                            Jalan Raya Pengasinan, Kelurahan Pengasinan, Kecamatan Sawangan, Kota Depok, Jawa Barat 16518.
                        </p>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gold to-gold-hover text-white font-semibold rounded-full shadow-md shadow-gold/20 hover:shadow-lg transition-all"
                        >
                            Buka Petunjuk Arah
                        </a>
                    </div>
                    <div className="lg:col-span-2 relative h-[320px] md:h-[420px] overflow-hidden rounded-3xl border border-stone-200 shadow-xl bg-stone-100">
                        <iframe
                            title="Peta lokasi Al Wafi Campus B di Sawangan, Depok"
                            src={embedUrl}
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

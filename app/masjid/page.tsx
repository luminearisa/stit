// @ts-nocheck
import React from 'react';

export default function MasjidPage() {
    const facilities = [
        {
            title: "Shalat 5 Waktu Berjamaah",
            desc: "Fasilitas utama untuk melaksanakan shalat 5 waktu secara berjamaah bagi seluruh civitas akademika",
            icon: "people"
        },
        {
            title: "Kajian Rutin",
            desc: "Kajian ilmu keislaman rutin yang diisi oleh para asatidz yang berkompeten di bidangnya",
            icon: "book"
        },
        {
            title: "Sound System Modern",
            desc: "Dilengkapi dengan sistem audio berkualitas tinggi untuk kenyamanan dalam ibadah",
            icon: "volume-high"
        },
        {
            title: "Sistem Pendingin",
            desc: "AC dan ventilasi yang memadai untuk kenyamanan jamaah dalam beribadah",
            icon: "snow"
        },
        {
            title: "Tempat Wudhu",
            desc: "Fasilitas tempat wudhu yang bersih dan terpisah untuk ikhwan dan akhwat",
            icon: "water"
        },
        {
            title: "Lemari Penyimpanan",
            desc: "Tersedia lemari untuk penyimpanan Al-Qur'an, buku-buku, dan perlengkapan ibadah",
            icon: "library"
        }
    ];

    return (
        <main className="min-h-screen bg-[#FAF8F5] text-stone-700">
            {/* Header */}
            <div className="relative pt-36 md:pt-44 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5] border-b border-stone-200">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block text-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Fasilitas Kampus</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-4">Masjid STIT Al Wafi</h1>
                    <p className="text-[#9E7A27] text-lg md:text-xl italic font-serif">"Pusat Ibadah dan Pembinaan Rohani Civitas Akademika"</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* Intro Section */}
                <section className="mb-20 text-center max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
                        <h2 className="text-3xl font-heading font-bold text-stone-900 mb-4">Fasilitas Masjid</h2>
                        <p className="text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                            Masjid STIT Al Wafi dilengkapi dengan berbagai fasilitas modern untuk mendukung kegiatan ibadah dan pembelajaran agama Islam. Kami berkomitmen untuk menyediakan lingkungan yang nyaman dan khusyuk bagi seluruh jamaah.
                        </p>
                    </div>
                </section>

                {/* Facilities Grid */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm group hover:shadow-lg transition-all hover:border-gold/50">
                                <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex items-center justify-center text-gold text-2xl mb-6 group-hover:scale-105 transition-transform shadow-inner">
                                    <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                                <p className="text-stone-600 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Worship Decoration */}
                <section className="mt-24 py-16 border-t border-stone-200 text-center relative">
                    <p className="font-serif text-2xl md:text-4xl text-[#9E7A27] italic max-w-4xl mx-auto leading-relaxed">
                        "Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan Hari kemudian"
                    </p>
                    <p className="mt-4 text-stone-500 font-semibold tracking-widest uppercase text-xs md:text-sm">QS. At-Taubah: 18</p>
                </section>

            </div>
        </main>
    );
}

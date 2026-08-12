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
        <main className="min-h-screen bg-black text-gray-200">
            {/* Header */}
            <div className="relative pt-32 pb-20 bg-gradient-to-b from-[#111] to-black border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Masjid STIT Al Wafi</h1>
                    <p className="text-gold text-xl italic">"Pusat Ibadah dan Pembinaan Rohani Civitas Akademika"</p>
                </div>
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-4 py-16">

                {/* Intro Section */}
                <section className="mb-20 text-center max-w-4xl mx-auto">
                    <div className="bg-[#111] p-8 md:p-12 rounded-3xl border border-gold/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl"></div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">Fasilitas Masjid</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Masjid STIT Al Wafi dilengkapi dengan berbagai fasilitas modern untuk mendukung kegiatan ibadah dan pembelajaran agama Islam. Kami berkomitmen untuk menyediakan lingkungan yang nyaman dan khusyuk bagi seluruh jamaah.
                        </p>
                    </div>
                </section>

                {/* Facilities Grid */}
                <section>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((item, idx) => (
                            <div key={idx} className="bg-[#111] p-8 rounded-2xl border border-white/5 group hover:bg-[#151515] transition-colors hover:border-gold/30">
                                <div className="w-14 h-14 bg-black rounded-xl border border-white/10 flex items-center justify-center text-gold text-2xl mb-6 group-hover:scale-110 transition-transform">
                                    <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Worship Decoration */}
                <section className="mt-24 py-16 border-t border-white/10 text-center relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <ion-icon name="moon" class="text-9xl text-white"></ion-icon>
                    </div>
                    <p className="font-serif text-3xl md:text-4xl text-gold italic">
                        "Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah dan Hari kemudian"
                    </p>
                    <p className="mt-4 text-gray-500 font-medium tracking-widest uppercase text-sm">QS. At-Taubah: 18</p>
                </section>

            </div>
        </main>
    );
}

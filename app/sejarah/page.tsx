// @ts-nocheck
import React from 'react';

export default function SejarahPage() {
    const milestones = [
        {
            year: "2016",
            title: "Pendirian Yayasan",
            desc: "Yayasan Al Sudais Indonesia resmi tercatat pada Kementrian Hukum dan Hak Asasi Manusia dengan nomor AHU-0051122.AH.01.12. Tahun 2016 tertanggal 28 Desember 2016.",
            icon: "document-text"
        },
        {
            year: "Lokasi",
            title: "Pengembangan Infrastruktur",
            desc: "Pembangunan Pesantren Al Wafi di atas lahan seluas ± 4Ha di lokasi strategis yang relatif dekat dengan Jakarta, BSD – Tangerang, dan Depok.",
            icon: "map"
        },
        {
            year: "7 Tahun",
            title: "Perjalanan Al Wafi",
            desc: "Selama 7 tahun, Al Wafi International Islamic Boarding School berhasil meluluskan santri ke berbagai Perguruan Tinggi Negeri bergengsi serta kampus-kampus di Timur Tengah dan luar negeri.",
            icon: "school"
        },
        {
            year: "Kini",
            title: "Pendirian STIT Al Wafi",
            desc: "Berkomitmen mengembangkan lembaga pendidikan tinggi untuk mencetak pengajar profesional pesantren yang akan melanjutkan misi dakwah dan pendidikan Islam.",
            icon: "business"
        }
    ];

    return (
        <main className="min-h-screen bg-black text-gray-200">
            {/* Header */}
            <div className="relative pt-32 pb-20 bg-gradient-to-b from-[#111] to-black border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Sejarah Yayasan</h1>
                    <p className="text-gold text-xl italic">"Membangun Peradaban Melalui Pendidikan Islam"</p>
                </div>
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Yayasan Al Sudais Indonesia */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">Yayasan Al Sudais Indonesia</h2>
                        <div className="prose prose-invert prose-lg text-gray-400">
                            <p>
                                Yayasan Al Sudais Indonesia adalah badan hukum yang menaungi berbagai lembaga pendidikan Islam berkualitas. Legalitas yayasan ini telah tercatat resmi pada Kementrian Hukum dan Hak Asasi Manusia dan dikuatkan dengan surat no. AHU- 0046994.AH.01.04. Tahun 2016.
                            </p>
                            <p>
                                Keputusan final penetapan yayasan ini terdaftar dengan nomor AHU-0051122.AH.01.12. Tahun 2016 tertanggal 28 Desember 2016, menandai awal mula kontribusi resmi kami dalam dunia pendidikan di Indonesia.
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#111] p-8 rounded-3xl border border-white/5 relative group hover:border-gold/30 transition-colors">
                        <div className="absolute top-4 right-4 text-gold/20">
                            <ion-icon name="ribbon" class="text-9xl"></ion-icon>
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-gold font-bold uppercase tracking-widest mb-2">Legalitas Resmi</h4>
                            <p className="text-4xl font-mono text-white mb-4">AHU-0051122</p>
                            <p className="text-gray-500 text-sm">Nomor legalitas yayasan tertanggal 28 Desember 2016</p>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-white/10"></div>

                {/* Timeline / Perjalanan Section */}
                <section>
                    <h2 className="text-3xl font-heading font-bold text-center text-white mb-16">Perjalanan & Perkembangan</h2>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/30 to-transparent"></div>

                        <div className="space-y-12">
                            {milestones.map((item, idx) => (
                                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Content */}
                                    <div className="flex-1 md:text-right pl-12 md:pl-0">
                                        <div className={`bg-[#111] p-6 rounded-xl border border-white/5 hover:border-gold/30 transition-all ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <div className={`mb-4 inline-flex items-center justify-center p-3 rounded-full bg-gold/10 text-gold text-2xl ${idx % 2 === 0 ? 'md:hidden' : 'md:hidden'}`}>
                                                <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                            </div>
                                            <span className="text-gold font-bold text-lg mb-2 block">{item.year}</span>
                                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Icon Marker */}
                                    <div className="hidden md:flex absolute left-1/2 -ml-6 w-12 h-12 bg-black border-2 border-gold rounded-full items-center justify-center text-gold z-10">
                                        <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                    </div>

                                    {/* Empty Space for alignment */}
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Visi Pendidikan */}
                <section className="bg-gradient-to-br from-[#111] to-black p-8 md:p-16 rounded-3xl border border-white/5 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block p-4 rounded-full bg-gold/10 text-gold text-3xl mb-6">
                            <ion-icon name="school"></ion-icon>
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6">Visi Pendidikan</h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            "STIT Al Wafi bertujuan untuk mencetak lulusan yang memiliki kompetensi unggul dalam bidang tarbiyah, khususnya pendidikan Islam. Para lulusan diharapkan memiliki standar akademis yang sesuai dengan kebutuhan masyarakat modern, sehingga dapat mengintegrasikan nilai-nilai Islam dengan perkembangan zaman."
                        </p>
                    </div>
                </section>

            </div>
        </main>
    );
}

// @ts-nocheck
import React from 'react';

export default function VisiMisiPage() {
    const misiInstitusi = [
        "Menyelenggarakan pendidikan tinggi yang unggul untuk menghasilkan tenaga pendidik profesional dan kompeten dalam pengelolaan pendidikan berlandaskan nilai-nilai Islam.",
        "Mengembangkan ilmu manajemen pendidikan yang mengintegrasikan nilai-nilai keislaman, perkembangan teknologi, dan keilmuan modern.",
        "Menghasilkan lulusan yang terpercaya, berkarakter Islami, inovatif, adaptif, dan mampu memberikan solusi terhadap berbagai permasalahan pendidikan pada tingkat nasional dan global.",
        "Mengembangkan budaya akademik yang mendukung pelaksanaan penelitian dan inovasi dalam bidang pendidikan Islam berbasis teknologi.",
        "Menyelenggarakan pengabdian kepada masyarakat yang berorientasi pada pemberdayaan masyarakat dan peningkatan mutu pendidikan Islam."
    ];

    const tujuanProdi = [
        "Menghasilkan lulusan yang profesional, berkarakter Islami, dan menguasai teori serta praktik MPI untuk mengelola dan mengembangkan lembaga pendidikan secara inovatif, berbasis teknologi, dan berlandaskan Al-Qur’an dan hadist.",
        "Menghasilkan lulusan yang mampu melaksanakan penelitian dan mengimplementasikan inovasi MPI melalui pendekatan integratif serta pengambilan keputusan berbasis data untuk memberikan solusi terhadap permasalahan pengelolaan pendidikan pada tingkat lokal, nasional, dan global.",
        "Menghasilkan lulusan yang memiliki kemampuan kepemimpinan, kewirausahaan, kolaborasi, dan tanggung jawab etis serta sosial untuk memberdayakan masyarakat dan meningkatkan mutu lembaga pendidikan Islam secara berkelanjutan."
    ];

    const profilLulusan = [
        {
            role: "Pengelola Pendidikan",
            desc: "Sarjana pendidikan yang memiliki kecakapan manajerial, kepemimpinan, dan tata kelola kelembagaan pendidikan Islam secara inovatif dan adaptif terhadap perkembangan teknologi.",
            icon: "briefcase"
        },
        {
            role: "Peneliti Pemula",
            desc: "Mampu melakukan riset kependidikan Islam, pengkajian integratif, dan pengambilan keputusan berbasis data untuk mengatasi tantangan dunia pendidikan.",
            icon: "document-text"
        },
        {
            role: "Konsultan Pendidikan Pemula",
            desc: "Mampu memberikan pendampingan, perbaikan sistem mutu, dan konsultasi strategis pengembangan institusi pendidikan berlandaskan nilai-nilai Al-Qur'an dan Sunnah.",
            icon: "bulb"
        }
    ];

    return (
        <main className="min-h-screen bg-[#FAF8F5] text-stone-700">
            {/* Header */}
            <div className="relative pt-36 md:pt-44 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5] border-b border-stone-200">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block text-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Tentang Kami</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-4">Visi, Misi & Tujuan</h1>
                    <p className="text-[#9E7A27] text-lg md:text-xl italic font-serif">"Menuju Perguruan Tinggi Terpercaya, Unggul, dan Berdaya Saing Global 2045"</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Visi & Misi Institusi STIT Al Wafi */}
                <section>
                    <div className="text-center mb-12">
                        <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-1">Tingkat Institusi</span>
                        <h2 className="text-3xl font-heading font-bold text-stone-900 mb-2">
                            Visi & Misi STIT Al Wafi Bogor
                        </h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Visi Card */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border-t-4 border-gold border border-stone-200 shadow-md relative overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-2">Arah Jangka Panjang 2045</span>
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">VISI</h3>
                                <p className="text-lg md:text-xl text-stone-800 leading-relaxed italic font-serif">
                                    &ldquo;Menjadi Perguruan Tinggi Terpercaya, Unggul, Berdaya Saing Global dalam mencetak Tenaga Profesional dan Tenaga Pendidik yang Berkarakter Islami guna mendukung penyelenggaraan pendidikan yang berkualitas pada tahun 2045&rdquo;
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500 font-medium">
                                <ion-icon name="ribbon-outline" class="text-gold text-lg"></ion-icon>
                                <span>Target Kelembagaan Berkelanjutan Hingga Tahun 2045</span>
                            </div>
                        </div>

                        {/* Misi Card */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border-t-4 border-[#3A2B14] border border-stone-200 shadow-md relative overflow-hidden group hover:shadow-xl transition-all">
                            <div className="relative z-10">
                                <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-2">Langkah Strategis</span>
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">MISI</h3>
                                <ul className="space-y-4">
                                    {misiInstitusi.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-stone-700">
                                            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-[#9E7A27] flex-shrink-0 mt-0.5 text-xs font-bold">
                                                {i + 1}
                                            </div>
                                            <span className="leading-relaxed text-sm md:text-base font-normal">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-stone-200"></div>

                {/* Visi Keilmuan & Tujuan Prodi MPI */}
                <section className="space-y-12">
                    <div className="text-center mb-8">
                        <span className="text-[#9E7A27] text-xs md:text-sm font-bold tracking-widest uppercase mb-2 block">Program Studi S1</span>
                        <h2 className="text-3xl font-heading font-bold text-stone-900 mb-2">
                            Program Studi Manajemen Pendidikan Islam
                        </h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    {/* Visi Keilmuan Prodi */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-md max-w-4xl mx-auto relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-bl-full pointer-events-none"></div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-[#9E7A27] text-xs font-bold uppercase tracking-wider mb-4 border border-gold/30">
                            <ion-icon name="telescope-outline" class="text-base"></ion-icon>
                            Visi Keilmuan Prodi MPI
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-6 font-heading">
                            Visi Keilmuan Manajemen Pendidikan Islam
                        </h3>
                        <p className="text-lg md:text-2xl text-stone-800 leading-relaxed italic font-serif">
                            &ldquo;Menjadi Program Studi Manajemen Pendidikan Islam yang unggul dan tepercaya dalam menghasilkan pengelola pendidikan profesional, berwawasan global, inovatif, berkarakter Islami, dan adaptif terhadap perkembangan teknologi untuk mendukung penyelenggaraan pendidikan berkualitas pada tahun 2045.&rdquo;
                        </p>
                    </div>

                    {/* Tujuan Program Studi */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-md max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#3A2B14] text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm shrink-0">
                                <ion-icon name="navigate-outline"></ion-icon>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-stone-900 font-heading">
                                    Tujuan Program Studi MPI
                                </h3>
                                <p className="text-stone-500 text-sm">Target capaian lulusan Manajemen Pendidikan Islam STIT Al Wafi Bogor</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-stone-100">
                            {tujuanProdi.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80">
                                    <div className="w-8 h-8 rounded-xl bg-gold text-white font-bold flex items-center justify-center shrink-0 text-sm shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <p className="text-stone-700 text-base leading-relaxed">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-stone-200"></div>

                {/* Profil Lulusan Prodi MPI */}
                <section>
                    <div className="text-center mb-12">
                        <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest mb-2 block">Capaian Pembelajaran</span>
                        <h2 className="text-3xl font-heading font-bold text-stone-900 mb-4">
                            Profil Lulusan Program Studi MPI
                        </h2>
                        <p className="text-stone-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed font-normal">
                            Profil lulusan Prodi MPI STIT Al Wafi Bogor adalah sarjana pendidikan yang dipersiapkan menjadi pengelola pendidikan, peneliti pemula, dan konsultan pendidikan pemula yang profesional, inovatif, adaptif terhadap perkembangan teknologi, serta berkarakter Islami. Lulusan memiliki kemampuan manajerial, penelitian, pemecahan masalah, kepemimpinan, dan kewirausahaan pendidikan serta mampu melaksanakan tanggung jawab profesional berdasarkan Al-Qur’an dan hadist.
                        </p>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full mt-6"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {profilLulusan.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:border-gold/50 hover:shadow-lg transition-all group flex flex-col justify-between">
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                        <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 mb-3 font-heading">
                                        {item.role}
                                    </h3>
                                    <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-gold font-bold uppercase tracking-wider">
                                    <span>Standar Kompetensi</span>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}

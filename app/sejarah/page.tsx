// @ts-nocheck
import React from 'react';

export default function SejarahPage() {
    const milestones = [
        {
            year: "2016",
            title: "Pendirian Yayasan Al Sudais Indonesia",
            desc: "Yayasan Al Sudais Indonesia secara resmi didirikan pada 28 Desember 2016 berdasarkan Surat Keputusan Pendirian AHU-0046992.01.14 Tahun 2016 dengan komitmen pengembangan pendidikan berbasis nilai-nilai Islam.",
            icon: "document-text"
        },
        {
            year: "Tahap Awal",
            title: "Pendidikan Dasar & Menengah Berbasis Pesantren",
            desc: "Mendirikan dan menyelenggarakan Al Wafi Islamic Boarding School untuk jenjang SD, SMP, dan SMA, memadukan pencapaian akademik dengan pembinaan karakter dan akhlak Islami.",
            icon: "school"
        },
        {
            year: "2019",
            title: "Pengajuan Pendirian STAI Al Wafi",
            desc: "Mengajukan pendirian Sekolah Tinggi Agama Islam (STAI) Al Wafi Bogor kepada Kopertais Wilayah II Jawa Barat dan Banten dengan rencana program studi bidang Tarbiyah dan Syariah (MPI, PIAUD, dan Ekonomi Syariah).",
            icon: "business"
        },
        {
            year: "Oktober 2024",
            title: "Izin Operasional Resmi STIT Al Wafi Bogor",
            desc: "STAI Al Wafi Bogor bertransformasi menjadi Sekolah Tinggi Ilmu Tarbiyah (STIT) Al Wafi Bogor berdasarkan izin operasional Kemenag RI Nomor 1044 Tahun 2024 dengan Program Studi Unggulan Manajemen Pendidikan Islam (MPI).",
            icon: "ribbon"
        }
    ];

    return (
        <main className="min-h-screen bg-[#FAF8F5] text-stone-700">
            {/* Header */}
            <div className="relative pt-36 md:pt-44 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5] border-b border-stone-200">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block text-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Tentang Kami</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-4">Profil Yayasan Al Sudais Indonesia</h1>
                    <p className="text-[#9E7A27] text-lg md:text-xl italic font-serif">"Badan Penyelenggara Pendidikan Tinggi STIT Al Wafi Bogor"</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Profil Yayasan Al Sudais Indonesia */}
                <section className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="border-l-4 border-gold pl-6 py-1">
                            <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-1">Badan Penyelenggara</span>
                            <h2 className="text-3xl font-heading font-bold text-stone-900">Profil Yayasan Al Sudais Indonesia</h2>
                        </div>
                        
                        <div className="space-y-5 text-stone-700 text-base md:text-lg leading-relaxed font-normal">
                            <p>
                                Yayasan Al Sudais Indonesia merupakan badan penyelenggara pendidikan yang memiliki komitmen dalam pengembangan pendidikan berbasis nilai-nilai Islam. Yayasan ini didirikan sebagai bagian dari ikhtiar untuk membangun lembaga pendidikan yang memadukan penguasaan ilmu pengetahuan dengan pembentukan karakter, akhlak, dan nilai-nilai keislaman.
                            </p>
                            <p>
                                Yayasan Al Sudais Indonesia secara resmi didirikan pada 28 Desember 2016 berdasarkan Surat Keputusan Pendirian <strong>AHU-0046992.01.14 Tahun 2016</strong>. Sejak awal berdirinya, yayasan diarahkan untuk berkontribusi dalam penyelenggaraan pendidikan Islam yang berkualitas serta membangun lingkungan pendidikan yang mendukung pengembangan ilmu, akhlak, dan kecintaan terhadap Al-Qur'an dan Sunnah.
                            </p>
                            <p>
                                Dalam tahap awal pengembangannya, Yayasan Al Sudais Indonesia menyelenggarakan pendidikan dasar dan menengah berbasis pesantren melalui Al Wafi Islamic Boarding School, yang meliputi jenjang SD, SMP, dan SMA. Penyelenggaraan pendidikan tersebut menjadi bagian dari upaya yayasan dalam membangun sistem pendidikan yang tidak hanya memperhatikan pencapaian akademik, tetapi juga pembinaan karakter dan kehidupan keislaman peserta didik.
                            </p>
                            <p>
                                Seiring dengan perkembangan lembaga dan kebutuhan masyarakat terhadap pendidikan Islam pada jenjang yang lebih tinggi, maka pada tahun 2019, yayasan mengajukan pendirian perguruan tinggi dengan nama Sekolah Tinggi Agama Islam (STAI) Al Wafi Bogor kepada Kopertais Wilayah II Jawa Barat dan Banten. Pada tahap pengajuan tersebut direncanakan pengembangan bidang Tarbiyah dan Syariah dengan beberapa program studi, antara lain Manajemen Pendidikan Islam (MPI), Pendidikan Islam Anak Usia Dini (PIAUD), dan Ekonomi Syariah.
                            </p>
                            <p>
                                Dalam perkembangan berikutnya, penyelenggaraan pendidikan tinggi Al Wafi mengalami perubahan kelembagaan. Pada Oktober 2024, STAI Al Wafi Bogor berubah menjadi Sekolah Tinggi Ilmu Tarbiyah (STIT) Al Wafi Bogor berdasarkan izin operasional Kementerian Agama Republik Indonesia Nomor 1044 Tahun 2024. Pada tahap ini, STIT Al Wafi Bogor menyelenggarakan Program Studi Manajemen Pendidikan Islam sebagai program studi unggulan.
                            </p>
                            <p>
                                Perjalanan Yayasan Al Sudais Indonesia menunjukkan adanya proses pengembangan kelembagaan yang bertahap, mulai dari penyelenggaraan pendidikan dasar dan menengah berbasis pesantren, hingga penyelenggaraan pendidikan tinggi melalui STIT Al Wafi Bogor. Perkembangan tersebut menjadi bagian dari ikhtiar yayasan dalam membangun ekosistem pendidikan Islam yang berkesinambungan dari jenjang dasar hingga pendidikan tinggi.
                            </p>
                            <p>
                                Dalam penyelenggaraan pendidikan tinggi, Yayasan Al Sudais Indonesia menempatkan STIT Al Wafi Bogor sebagai salah satu instrumen strategis untuk mengembangkan pendidikan Islam yang memadukan kompetensi akademik, profesionalitas, karakter Islami, dan pengabdian kepada masyarakat.
                            </p>
                        </div>
                    </div>

                    {/* Legal Card & Badges */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-md relative group hover:border-gold/50 transition-colors">
                            <div className="absolute top-4 right-4 text-gold/15 pointer-events-none">
                                <ion-icon name="ribbon" class="text-8xl"></ion-icon>
                            </div>
                            <div className="relative z-10">
                                <div className="inline-block p-3 rounded-2xl bg-gold/15 text-gold text-2xl mb-4">
                                    <ion-icon name="shield-checkmark"></ion-icon>
                                </div>
                                <h4 className="text-[#9E7A27] font-bold uppercase tracking-widest text-xs mb-2">Legalitas Resmi Badan Hukum</h4>
                                <p className="text-2xl font-mono text-stone-900 font-bold mb-3">AHU-0046992.01.14</p>
                                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                                    Surat Keputusan Menteri Hukum dan Hak Asasi Manusia RI Tahun 2016 tertanggal <strong>28 Desember 2016</strong>.
                                </p>
                                <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 font-medium">
                                    <ion-icon name="checkmark-done" class="text-emerald-600 text-base"></ion-icon>
                                    <span>Badan Hukum Sah Penyelenggara Pendidikan</span>
                                </div>
                            </div>
                        </div>

                        {/* Izin Kemenag Badge */}
                        <div className="bg-[#FAF6F0] p-6 rounded-3xl border border-gold/30 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <ion-icon name="school" class="text-gold text-2xl"></ion-icon>
                                <h5 className="font-bold text-stone-900 text-sm">Izin Operasional Kampus</h5>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">
                                Keputusan Menteri Agama RI <strong>No. 1044 Tahun 2024</strong> untuk STIT Al Wafi Bogor.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-stone-200"></div>

                {/* Timeline / Perjalanan Section */}
                <section>
                    <div className="text-center mb-16">
                        <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest mb-2 block">Tahapan Kelembagaan</span>
                        <h2 className="text-3xl font-heading font-bold text-stone-900 mb-2">Perjalanan & Perkembangan Yayasan</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/40 to-transparent"></div>

                        <div className="space-y-12">
                            {milestones.map((item, idx) => (
                                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Content */}
                                    <div className="flex-1 md:text-right pl-12 md:pl-0">
                                        <div className={`bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-gold/50 hover:shadow-md transition-all ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <div className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-gold/15 text-gold text-2xl md:hidden">
                                                <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                            </div>
                                            <span className="text-[#9E7A27] font-bold text-base mb-1 block font-mono">{item.year}</span>
                                            <h3 className="text-xl font-bold text-stone-900 mb-3 font-heading">{item.title}</h3>
                                            <p className="text-stone-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Icon Marker */}
                                    <div className="hidden md:flex absolute left-1/2 -ml-6 w-12 h-12 bg-white border-2 border-gold rounded-full items-center justify-center text-gold z-10 shadow-md">
                                        <ion-icon name={`${item.icon}-outline`}></ion-icon>
                                    </div>

                                    {/* Empty Space for alignment */}
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Komitmen Strategis */}
                <section className="bg-gradient-to-br from-white via-[#FAF6F0] to-white p-8 md:p-14 rounded-3xl border border-gold/30 shadow-md text-center max-w-4xl mx-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block p-4 rounded-full bg-gold/15 text-gold text-3xl mb-6 shadow-sm">
                            <ion-icon name="ribbon-outline"></ion-icon>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-900 mb-4">Komitmen Pendidikan Terpadu</h2>
                        <p className="text-lg md:text-xl text-stone-700 leading-relaxed italic font-serif">
                            &ldquo;Yayasan Al Sudais Indonesia menempatkan STIT Al Wafi Bogor sebagai salah satu instrumen strategis untuk mengembangkan pendidikan Islam yang memadukan kompetensi akademik, profesionalitas, karakter Islami, dan pengabdian kepada masyarakat.&rdquo;
                        </p>
                    </div>
                </section>

            </div>
        </main>
    );
}

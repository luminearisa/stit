// @ts-nocheck
import React from 'react';
import Image from 'next/image';

export default function ProfilPage() {
    const masyaikh = [
        { name: "Mogahid Idris, M.I.B.A", role: "Syeikh" },
        { name: "Dr. Talal Ahmed, E.E., M.A.", role: "Syeikh" },
        { name: "Dr. Aboelgasim Muhammad, S.M.A.", role: "Syeikh" },
        { name: "Magdi Yahya Ahmed, B.A", role: "Syeikh" },
        { name: "Zakarya Mohammed Raweh", role: "Syeikh" },
    ];

    const lecturers = [
        { name: "Dr. Ali Saman Hasan, Lc., LL.M., M.A.", expertise: "Manajemen Pondok Pesantren" },
        { name: "Dr. Marullah Marzuq, M.Ag., LL.M.", expertise: "Metodologi Pembelajaran PAUD" },
        { name: "Kartiko Adi Pramono, Dipl.Ing.HTL.ACMC", expertise: "Teknologi Pendidikan" },
        { name: "Eri Kusmar, S.H., M.Env. Mgmt", expertise: "Manajemen Lingkungan dan Sumber Daya" },
        { name: "Muhammad Bakri Rahimin, Lc., M.E", expertise: "Ekonomi Syariah" },
        { name: "Suworo, M.M", expertise: "Manajemen" },
        { name: "Muhammad Asadullah, B.A., M.H.", expertise: "Syariah" },
        { name: "Dr.(c) Fortin Sri Haryani, M.Pd.", expertise: "Manajemen Pendidikan" },
        { name: "Sri Kartini, S.Pd., M.Pd.", expertise: "Pengembangan Kurikulum" },
    ];

    const profilLulusanCards = [
        {
            title: "Pengelola Pendidikan",
            desc: "Memiliki kapasitas kepemimpinan dan manajerial mumpuni dalam merencanakan, mengorganisasikan, memimpin, serta mengevaluasi lembaga pendidikan Islam modern berbasis data dan teknologi.",
            icon: "briefcase"
        },
        {
            title: "Peneliti Pemula",
            desc: "Mampu merancang dan melaksanakan riset integratif di bidang manajemen pendidikan Islam untuk memecahkan problematika pendidikan di tingkat lokal, nasional, dan global.",
            icon: "search"
        },
        {
            title: "Konsultan Pendidikan Pemula",
            desc: "Mampu memberikan pertimbangan, analisis strategis, dan solusi inovatif berlandaskan Al-Qur'an dan Sunnah bagi peningkatan mutu kelembagaan pendidikan.",
            icon: "people"
        }
    ];

    return (
        <main className="min-h-screen bg-[#FAF8F5] text-stone-700">
            {/* Header */}
            <div className="relative pt-36 md:pt-44 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5] border-b border-stone-200">
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block text-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Tentang Kami</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-4">Profil STIT Al Wafi Bogor</h1>
                    <p className="text-[#9E7A27] text-lg md:text-xl italic font-serif">"Mencetak Tenaga Profesional dan Pendidik yang Berkarakter Islami"</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Sambutan Ketua STIT - 2 Column Layout */}
                <section className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4 sticky top-28">
                        <div className="border-l-4 border-gold pl-6 py-2">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-900 mb-1">Sambutan Ketua STIT</h2>
                            <p className="text-stone-500 font-medium">STIT Al Wafi Bogor</p>
                        </div>
                        {/* Photo */}
                        <div className="mt-8 relative aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-xl group">
                            <Image
                                src="https://alwafi.ac.id/img/webp/pp-data0=ust_ali.webp"
                                alt="Dr. Ali Saman Hasan"
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-xl font-bold text-stone-900">Dr. Ali Saman Hasan</h4>
                            <p className="text-sm text-gold font-semibold">Lc., LL.M., M.A.</p>
                        </div>
                    </div>

                    <div className="md:col-span-8 bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-md shadow-stone-200/60 leading-relaxed relative">
                        <div className="absolute -top-6 -left-4 text-7xl text-gold/20 font-serif select-none">“</div>

                        <h3 className="font-serif text-2xl text-[#9E7A27] mb-6 italic text-center md:text-left">Bismillahirrahmanirrahim</h3>

                        <div className="space-y-6 text-base md:text-lg text-stone-700 font-normal">
                            <p>
                                Segala puji dan syukur kami panjatkan kepada Allah Subhanahu wa Ta'ala atas rahmat dan karunia-Nya sehingga Sekolah Tinggi Ilmu Tarbiyah (STIT) Al Wafi Bogor dapat terus berperan aktif dalam mewujudkan pendidikan Islam yang berkualitas. Kehadiran STIT Al Wafi Bogor merupakan wujud dari cita-cita luhur untuk mencetak tenaga pendidik yang tidak hanya unggul dalam keilmuan, tetapi juga berkarakter Islami yang kuat, siap menghadapi tantangan global, dan mampu menjadi teladan di tengah masyarakat.
                            </p>
                            <p>
                                STIT Al Wafi Bogor berkomitmen untuk menjadi institusi pendidikan yang berintegritas dan berkualitas melalui kurikulum yang terintegrasi antara ilmu pengetahuan modern dan nilai-nilai keislaman. Program unggulan kami, Program Studi Manajemen Pendidikan Islam (MPI), dirancang untuk menghasilkan tenaga pendidik dan pengelola pendidikan yang kompeten dan profesional. Didukung oleh kegiatan pembelajaran praktis, penelitian, serta pengabdian masyarakat, kami berharap dapat membentuk lulusan yang tidak hanya ahli dalam bidangnya tetapi juga memiliki kepedulian sosial dan spiritualitas yang tinggi.
                            </p>
                        </div>

                        <div className="bg-[#F5EFE6] p-8 rounded-2xl border border-gold/30 my-10 shadow-sm">
                            <h4 className="text-[#9E7A27] font-bold mb-3 uppercase tracking-widest text-xs md:text-sm text-center">Visi STIT Al Wafi Bogor 2045</h4>
                            <p className="text-lg md:text-xl text-stone-900 font-medium text-center italic leading-relaxed">
                                &ldquo;Menjadi Perguruan Tinggi Terpercaya, Unggul, Berdaya Saing Global dalam mencetak Tenaga Profesional dan Tenaga Pendidik yang Berkarakter Islami guna mendukung penyelenggaraan pendidikan yang berkualitas pada tahun 2045.&rdquo;
                            </p>
                        </div>

                        <p className="mb-8 text-stone-700">
                            Kami mengucapkan terima kasih kepada seluruh jajaran pengurus Yayasan Al Sudais Indonesia, para dosen, tenaga kependidikan, serta pihak-pihak terkait lainnya yang telah mendukung dan berkontribusi pada perkembangan STIT Al Wafi Bogor. Semoga dengan kerja sama ini, STIT Al Wafi dapat terus berkembang menjadi lembaga pendidikan Islam yang terpercaya dan berkontribusi bagi kemajuan pendidikan di Indonesia.
                        </p>

                        <p className="font-serif text-xl text-[#9E7A27] italic text-right">Wassalamualaikum warahmatullahi wabarakatuh</p>
                    </div>
                </section>

                <div className="w-full h-px bg-stone-200"></div>

                {/* Profil Institusi Resmi STIT Al Wafi Bogor */}
                <section className="space-y-10">
                    <div className="border-l-4 border-gold pl-6 py-1">
                        <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-1">Identitas & Kelembagaan</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-900">
                            Profil Sekolah Tinggi Ilmu Tarbiyah Al Wafi Bogor
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-8 space-y-5 text-stone-700 text-base md:text-lg leading-relaxed font-normal">
                            <p>
                                Sekolah Tinggi Ilmu Tarbiyah (STIT) Al Wafi Bogor merupakan perguruan tinggi keagamaan Islam yang diselenggarakan oleh <strong>Yayasan Al Sudais Indonesia</strong>. Kehadiran STIT Al Wafi merupakan bagian dari ikhtiar kelembagaan dalam mengembangkan pendidikan tinggi Islam yang memadukan penguatan ilmu pengetahuan, kompetensi profesional, dan pembentukan karakter berdasarkan nilai-nilai Islam.
                            </p>
                            <p>
                                Yayasan Al Sudais Indonesia sebagai badan penyelenggara STIT Al Wafi didirikan pada 28 Desember 2016 berdasarkan Keputusan Menteri Hukum dan Hak Asasi Manusia Republik Indonesia Nomor <strong>AHU-0046992.01.14 Tahun 2016</strong>. Pendirian yayasan tersebut menjadi salah satu landasan kelembagaan bagi pengembangan pendidikan dan kegiatan sosial-keagamaan, termasuk pengembangan pendidikan tinggi melalui STIT Al Wafi Bogor.
                            </p>
                            <p>
                                Dalam proses pengembangannya, STIT Al Wafi mempersiapkan berbagai persyaratan kelembagaan dan akademik sebagai bagian dari proses pendirian dan penyelenggaraan perguruan tinggi. Proses tersebut mencakup penyiapan tata kelola, sumber daya manusia, kurikulum, sarana dan prasarana, sistem administrasi akademik, serta perangkat penjaminan mutu yang diperlukan dalam penyelenggaraan pendidikan tinggi.
                            </p>
                            <p>
                                Setelah melalui proses pengajuan dan evaluasi kelembagaan, STIT Al Wafi memperoleh izin operasional berdasarkan <strong>Keputusan Menteri Agama Republik Indonesia Nomor 1044 Tahun 2024</strong>. Perolehan izin operasional tersebut menjadi tonggak penting dalam perjalanan STIT Al Wafi sebagai perguruan tinggi yang menyelenggarakan pendidikan tinggi keagamaan Islam secara formal.
                            </p>
                            <p>
                                Pada tahap awal penyelenggaraannya, STIT Al Wafi membuka <strong>Program Studi Manajemen Pendidikan Islam (MPI)</strong> sebagai program studi pertama. Program studi ini dikembangkan untuk menjawab kebutuhan akan sumber daya manusia yang memiliki kompetensi dalam bidang manajemen dan pengelolaan pendidikan Islam, sekaligus memiliki karakter keislaman dan kemampuan profesional.
                            </p>
                            <p>
                                Penyelenggaraan Program Studi Manajemen Pendidikan Islam diarahkan pada pengembangan kompetensi mahasiswa dalam bidang perencanaan, pengorganisasian, pelaksanaan, pengawasan, evaluasi, dan pengembangan lembaga pendidikan. Pengembangan tersebut dilaksanakan dengan memadukan perspektif manajemen pendidikan, ilmu pendidikan Islam, kepemimpinan, teknologi, penelitian, dan pengabdian kepada masyarakat.
                            </p>
                        </div>

                        {/* Side Legal & Status Badges */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                                <h4 className="text-stone-900 font-bold text-lg border-b border-stone-100 pb-3 flex items-center gap-2">
                                    <ion-icon name="ribbon-outline" class="text-gold text-2xl"></ion-icon>
                                    Legalitas & Akreditasi
                                </h4>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                                        <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Izin Operasional Resmi</p>
                                        <p className="text-stone-900 font-bold mt-1 text-sm">Kemenag RI No. 1044 Tahun 2024</p>
                                    </div>

                                    <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                                        <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Akreditasi Program Studi</p>
                                        <p className="text-stone-900 font-bold mt-1 text-sm">Terakreditasi LAMDIK</p>
                                        <p className="text-xs text-stone-500 mt-0.5">No. 1127/SK/LAMDIK/Ak-PSB/S/VI/2026</p>
                                    </div>

                                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl">
                                        <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Badan Penyelenggara</p>
                                        <p className="text-stone-900 font-bold mt-1 text-sm">Yayasan Al Sudais Indonesia</p>
                                        <p className="text-xs text-stone-500 mt-0.5">SK Kemenkumham AHU-0046992.01.14 (28 Des 2016)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Keunggulan Ringkas */}
                            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
                                <h4 className="text-stone-900 font-bold text-lg mb-4 flex items-center gap-2">
                                    <ion-icon name="star-outline" class="text-gold text-2xl"></ion-icon>
                                    Keunggulan STIT Al Wafi
                                </h4>
                                <ul className="space-y-3 text-sm text-stone-700">
                                    {[
                                        "Tenaga pengajar profesional dan para masyaikh",
                                        "Terbuka untuk ikhwan dan akhwat",
                                        "Dosen S2, S3 alumni dalam dan luar negeri",
                                        "Perpaduan Islamic Studies & kurikulum nasional",
                                        "Kemitraan dan kolaborasi bertaraf global"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <ion-icon name="checkmark-circle" class="text-gold text-lg shrink-0 mt-0.5"></ion-icon>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-stone-200"></div>

                {/* Program Studi & Profil Lulusan */}
                <section className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-[#9E7A27] text-xs md:text-sm font-bold tracking-widest uppercase mb-2 block">Program Studi Unggulan</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-900 mb-4">
                            Manajemen Pendidikan Islam (S1)
                        </h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-6"></div>
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white rounded-full border border-gold/40 text-[#9E7A27] shadow-sm text-sm font-bold">
                            <ion-icon name="ribbon" class="text-lg text-gold"></ion-icon>
                            <span>Gelar Lulusan: Sarjana Pendidikan (S.Pd.)</span>
                        </div>
                    </div>

                    {/* Visi Keilmuan MPI */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-md max-w-4xl mx-auto text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none"></div>
                        <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-2">Visi Keilmuan Prodi MPI</span>
                        <p className="text-lg md:text-xl text-stone-800 font-serif italic leading-relaxed">
                            &ldquo;Menjadi Program Studi Manajemen Pendidikan Islam yang unggul dan tepercaya dalam menghasilkan pengelola pendidikan profesional, berwawasan global, inovatif, berkarakter Islami, dan adaptif terhadap perkembangan teknologi untuk mendukung penyelenggaraan pendidikan berkualitas pada tahun 2045.&rdquo;
                        </p>
                    </div>

                    {/* Profil Lulusan Cards */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold text-stone-900 text-center mb-8">
                            Profil Lulusan Prodi MPI
                        </h3>
                        <p className="text-center text-stone-600 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
                            Profil lulusan Prodi MPI STIT Al Wafi Bogor adalah sarjana pendidikan yang dipersiapkan menjadi pengelola pendidikan, peneliti pemula, dan konsultan pendidikan pemula yang profesional, inovatif, adaptif terhadap perkembangan teknologi, serta berkarakter Islami.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {profilLulusanCards.map((card, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:border-gold/50 hover:shadow-lg transition-all group">
                                    <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                                        <ion-icon name={`${card.icon}-outline`}></ion-icon>
                                    </div>
                                    <h4 className="text-xl font-bold text-stone-900 mb-3 font-heading">{card.title}</h4>
                                    <p className="text-stone-600 text-sm leading-relaxed">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-stone-200"></div>

                {/* Para Masyaikh */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-stone-900 mb-2">Para Masyaikh</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {masyaikh.map((syeikh, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center group hover:border-gold/50 hover:shadow-md transition-all">
                                <div className="w-20 h-20 mx-auto bg-stone-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-stone-200">
                                    <ion-icon name="person" class="text-3xl text-stone-400"></ion-icon>
                                </div>
                                <h4 className="text-stone-900 font-bold text-sm mb-1">{syeikh.name}</h4>
                                <p className="text-gold text-xs uppercase tracking-wider font-semibold">{syeikh.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tenaga Pengajar - Table Layout */}
                <section className="pb-10">
                    <h2 className="text-3xl font-heading font-bold text-stone-900 mb-8">Tenaga Pengajar</h2>
                    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F5EFE6] border-b border-stone-200 text-[#9E7A27] uppercase text-xs tracking-wider">
                                    <th className="p-5 font-bold">Nama Dosen</th>
                                    <th className="p-5 font-bold">Bidang Keahlian</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {lecturers.map((dosen, i) => (
                                    <tr key={i} className="hover:bg-amber-50/40 transition-colors">
                                        <td className="p-5 text-stone-900 font-medium">{dosen.name}</td>
                                        <td className="p-5 text-stone-600">{dosen.expertise}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}

// @ts-nocheck
import Link from 'next/link';

export default function ProgramStudi() {
    const characters = [
        { code: 'C', name: 'Credible', desc: 'Dapat dipercaya dan memiliki integritas' },
        { code: 'C', name: 'Capable', desc: 'Memiliki kemampuan dan kompetensi mumpuni' },
        { code: 'C', name: 'Confidence', desc: 'Percaya diri dalam menyampaikan kebenaran' },
        { code: 'C', name: 'Communicative', desc: 'Mampu berkomunikasi dengan efektif' },
        { code: 'C', name: 'Creative', desc: 'Inovatif dalam metode pengajaran' },
        { code: 'U', name: 'Uswah', desc: 'Menjadi teladan yang baik (Uswatun Hasanah)' },
    ];

    const profilLulusan = [
        {
            title: "Pengelola Pendidikan",
            badge: "Manajerial & Kepemimpinan",
            desc: "Pakar pengelola dan manajer satuan pendidikan Islam yang inovatif, berlandaskan prinsip syariah dan adaptif teknologi modern."
        },
        {
            title: "Peneliti Pemula",
            badge: "Riset & Analisis",
            desc: "Akademisi periset yang mampu meneliti problem manajemen pendidikan secara integratif dengan data-driven decision making."
        },
        {
            title: "Konsultan Pendidikan",
            badge: "Konsultasi & Solusi",
            desc: "Konsultan strategis pemula dalam penjaminan mutu, kurikulum, dan tata kelola kelembagaan pendidikan Islam berkemajuan."
        }
    ];

    return (
        <section id="prodi" className="py-24 bg-[#FAF8F5]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-[#9E7A27] font-bold text-xs md:text-sm tracking-widest uppercase mb-2">Program Studi Unggulan</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-stone-900">Manajemen Pendidikan Islam (S1)</h3>
                    <div className="w-20 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Visi Keilmuan Callout */}
                <div className="max-w-4xl mx-auto mb-16 bg-white p-8 md:p-10 rounded-3xl border border-gold/30 shadow-md text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none"></div>
                    <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-2">Visi Keilmuan Program Studi</span>
                    <p className="text-stone-800 text-lg md:text-xl font-serif italic leading-relaxed">
                        &ldquo;Menjadi Program Studi Manajemen Pendidikan Islam yang unggul dan tepercaya dalam menghasilkan pengelola pendidikan profesional, berwawasan global, inovatif, berkarakter Islami, dan adaptif terhadap perkembangan teknologi untuk mendukung penyelenggaraan pendidikan berkualitas pada tahun 2045.&rdquo;
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <div className="p-8 bg-white rounded-3xl border-l-[6px] border-l-gold border border-stone-200 shadow-md shadow-stone-200/50 hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-stone-900">Sarjana Pendidikan (S.Pd)</h4>
                                    <p className="text-xs text-stone-500 mt-1">Izin Kemenag RI No. 1044 Tahun 2024</p>
                                </div>
                                <span className="bg-gold/15 text-[#9E7A27] text-xs px-3 py-1 rounded-full font-bold border border-gold/30">Terakreditasi LAMDIK</span>
                            </div>
                            <p className="text-stone-600 mb-6 leading-relaxed">
                                Program studi Manajemen Pendidikan Islam diarahkan pada pengembangan kompetensi mahasiswa dalam bidang perencanaan, pengorganisasian, pelaksanaan, pengawasan, evaluasi, dan pengembangan lembaga pendidikan dengan perpaduan nilai-nilai keislaman dan teknologi modern.
                            </p>
                            <ul className="space-y-3">
                                {['Kurikulum Berbasis KKNI & Merdeka Belajar', 'Dosen Praktisi, Doktor & Masyaikh', 'Magang di Lembaga Pendidikan Terkemuka', 'Penguatan Karakter & Tahfidz Al-Qur\'an'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-700 font-medium">
                                        <ion-icon name="checkmark-circle" class="text-gold text-lg"></ion-icon>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Visual Abstract representation */}
                        <div className="absolute inset-0 bg-gold/15 blur-[90px] rounded-full"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            {/* 4 Cards creating a visual block */}
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md transform translate-y-6 hover:-translate-y-1 transition-transform">
                                <ion-icon name="library-outline" class="text-4xl text-gold mb-3"></ion-icon>
                                <h5 className="font-bold text-stone-900">Akademik</h5>
                                <p className="text-xs text-stone-500 mt-1">Standar mutu tinggi</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:-translate-y-1 transition-transform">
                                <ion-icon name="globe-outline" class="text-4xl text-gold mb-3"></ion-icon>
                                <h5 className="font-bold text-stone-900">Global</h5>
                                <p className="text-xs text-stone-500 mt-1">Wawasan internasional</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md transform translate-y-6 hover:-translate-y-1 transition-transform">
                                <ion-icon name="ribbon-outline" class="text-4xl text-gold mb-3"></ion-icon>
                                <h5 className="font-bold text-stone-900">Akhlak</h5>
                                <p className="text-xs text-stone-500 mt-1">Karakter mulia</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-md hover:-translate-y-1 transition-transform">
                                <ion-icon name="desktop-outline" class="text-4xl text-gold mb-3"></ion-icon>
                                <h5 className="font-bold text-stone-900">Teknologi</h5>
                                <p className="text-xs text-stone-500 mt-1">Adaptif digital</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profil Lulusan MPI */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <span className="text-[#9E7A27] text-xs font-bold uppercase tracking-widest block mb-1">Capaian Lulusan</span>
                        <h3 className="text-3xl font-heading font-bold text-stone-900">
                            Profil Lulusan MPI
                        </h3>
                        <p className="text-stone-600 text-sm max-w-xl mx-auto mt-2">
                            Mencetak sarjana pendidikan yang profesional, inovatif, adaptif terhadap perkembangan teknologi, serta berkarakter Islami.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {profilLulusan.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:border-gold/50 hover:shadow-md transition-all">
                                <span className="inline-block px-3 py-1 bg-gold/15 text-[#9E7A27] rounded-full text-xs font-bold mb-3 border border-gold/30">
                                    {item.badge}
                                </span>
                                <h4 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h4>
                                <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Karakter C5U */}
                <div>
                    <h3 className="text-center text-3xl font-heading font-bold text-stone-900 mb-12">
                        Membangun Karakter <span className="text-gold">C5U</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {characters.map((char, idx) => (
                            <div key={idx} className="group bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:border-gold/50 hover:shadow-lg transition-all hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold to-gold-hover flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                                        {char.code}
                                    </div>
                                    <h4 className="text-xl font-bold text-stone-900">{char.name}</h4>
                                </div>
                                <p className="text-stone-600 text-sm pl-16 leading-relaxed">
                                    {char.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

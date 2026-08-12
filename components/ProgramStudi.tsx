// @ts-nocheck
export default function ProgramStudi() {
    const characters = [
        { code: 'C', name: 'Credible', desc: 'Dapat dipercaya dan memiliki integritas' },
        { code: 'C', name: 'Capable', desc: 'Memiliki kemampuan dan kompetensi mumpuni' },
        { code: 'C', name: 'Confidence', desc: 'Percaya diri dalam menyampaikan kebenaran' },
        { code: 'C', name: 'Communicative', desc: 'Mampu berkomunikasi dengan efektif' },
        { code: 'C', name: 'Creative', desc: 'Inovatif dalam metode pengajaran' },
        { code: 'U', name: 'Uswah', desc: 'Menjadi teladan yang baik (Uswatun Hasanah)' },
    ];

    return (
        <section id="prodi" className="py-24 bg-gradient-to-b from-black to-zinc-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-gold font-bold text-sm tracking-widest uppercase mb-2">Program Studi Unggulan</h2>
                    <h3 className="text-4xl font-heading font-bold text-white">Manajemen Pendidikan Islam (S1)</h3>
                    <div className="w-20 h-1 bg-gold mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <div className="p-8 bg-[#111] rounded-2xl border-l-[6px] border-gold shadow-xl hover:bg-[#151515] transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-2xl font-bold text-white">Sarjana Pendidikan (S.Pd)</h4>
                                <span className="bg-gold/20 text-gold text-xs px-3 py-1 rounded-full font-bold">Terakreditasi</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Program studi Manajemen Pendidikan Islam dirancang untuk mencetak manajer lembaga pendidikan yang profesional, berwawasan luas, dan berbasis pada nilai-nilai Islam. Kurikulum terintegrasi dengan kebutuhan industri pendidikan modern.
                            </p>
                            <ul className="space-y-3">
                                {['Kurikulum Berbasis KKNI', 'Dosen Praktisi & Akademisi', 'Magang di Lembaga Bonafit', 'Tahfidz Al-Qur\'an'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <ion-icon name="checkmark-circle" class="text-gold"></ion-icon>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Visual Abstract representation or Image */}
                        <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            {/* 4 Cards creating a visual block */}
                            <div className="bg-[#222] p-6 rounded-xl border border-white/5 transform translate-y-8">
                                <ion-icon name="library-outline" class="text-4xl text-gold mb-4"></ion-icon>
                                <h5 className="font-bold text-white">Akademik</h5>
                                <p className="text-xs text-gray-500 mt-2">Standar mutu tinggi</p>
                            </div>
                            <div className="bg-[#222] p-6 rounded-xl border border-white/5">
                                <ion-icon name="globe-outline" class="text-4xl text-gold mb-4"></ion-icon>
                                <h5 className="font-bold text-white">Global</h5>
                                <p className="text-xs text-gray-500 mt-2">Wawasan internasional</p>
                            </div>
                            <div className="bg-[#222] p-6 rounded-xl border border-white/5 transform translate-y-8">
                                <ion-icon name="ribbon-outline" class="text-4xl text-gold mb-4"></ion-icon>
                                <h5 className="font-bold text-white">Akhlak</h5>
                                <p className="text-xs text-gray-500 mt-2">Karakter mulia</p>
                            </div>
                            <div className="bg-[#222] p-6 rounded-xl border border-white/5">
                                <ion-icon name="desktop-outline" class="text-4xl text-gold mb-4"></ion-icon>
                                <h5 className="font-bold text-white">Teknologi</h5>
                                <p className="text-xs text-gray-500 mt-2">Adaptif digital</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Karakter C5U */}
                <div className="mt-24">
                    <h3 className="text-center text-3xl font-heading font-bold text-white mb-12">
                        Membangun Karakter <span className="text-gold">C5U</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {characters.map((char, idx) => (
                            <div key={idx} className="group bg-[#111] p-6 rounded-xl border border-white/5 hover:border-gold/50 transition-all hover:-translate-y-2">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-black font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                        {char.code}
                                    </div>
                                    <h4 className="text-xl font-bold text-white">{char.name}</h4>
                                </div>
                                <p className="text-gray-400 text-sm pl-16">
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

// @ts-nocheck
import Image from 'next/image';

export default function Lecturers() {
    const lecturers = [
        { name: "Dr. Ali Saman Hasan, Lc., LL.M., M.A.", role: "Ketua STIT", expert: "Manajemen Pondok Pesantren", image: "https://alwafi.ac.id/img/webp/pp-data0=ust_ali.webp" },
        { name: "Dr. Marullah Marzuq, M.Ag., LL.M.", role: "Dosen Senior", expert: "Metodologi Pembelajaran PAUD", image: "/photos/mm.jpeg" },
        { name: "Kartiko Adi Pramono, Dipl.Ing.HTL.ACMC", role: "Dosen", expert: "Teknologi Pendidikan", image: "https://pbs.twimg.com/profile_images/727411023859216385/FWF_F1dW_400x400.jpg" },
        { name: "Eri Kusmar, S.H., M.Env. Mgmt", role: "Dosen", expert: "Manajemen Lingkungan & Sumber Daya" },
        { name: "Muhammad Bakri Rahimin, Lc., M.E", role: "Dosen", expert: "Ekonomi Syariah", image: "/photos/USTADZ BAKRIE.jpg" },
        { name: "Suworo, M.M", role: "Dosen", expert: "Manajemen", image: "/photos/UST. SUWORO.png" },
        { name: "Muhammad Asadullah, B.A., M.H.", role: "Dosen", expert: "Syariah", image: "/photos/ua.jpeg" },
        { name: "Dr.(c) Fortin Sri Haryani, M.Pd.", role: "Dosen", expert: "Manajemen Pendidikan" },
        { name: "Sri Kartini, S.Pd., M.Pd.", role: "Dosen", expert: "Pengembangan Kurikulum" },
    ];

    return (
        <section id="dosen" className="py-24 bg-[#F7F4EE] border-t border-stone-200/60">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-[#9E7A27] font-bold text-xs md:text-sm tracking-widest uppercase mb-2">Tenaga Pengajar</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-stone-900">Pengajar Profesional & Inspiratif</h3>
                    <p className="max-w-2xl mx-auto text-stone-600 mt-4 leading-relaxed font-normal">
                        Dosen-dosen STIT Al Wafi adalah para ahli di bidangnya, berpengalaman nasional & internasional, siap membimbing Anda menjadi pendidik unggul.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lecturers.map((dosen, idx) => (
                        <div 
                            key={idx} 
                            className="group bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:border-gold/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                        >
                            {/* Framed Photo with ample height & top alignment */}
                            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-stone-100 mb-5 border-2 border-stone-200 group-hover:border-gold/50 shadow-md transition-all duration-300 shrink-0">
                                {dosen.image ? (
                                    <Image
                                        src={dosen.image}
                                        alt={dosen.name}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                                        <ion-icon name="person" class="text-6xl"></ion-icon>
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-between w-full">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-gold/15 text-[#8C6718] text-xs font-bold uppercase tracking-wider rounded-full mb-2.5 border border-gold/30">
                                        {dosen.role}
                                    </span>
                                    <h4 className="text-stone-900 font-bold text-lg leading-snug mb-1">
                                        {dosen.name}
                                    </h4>
                                </div>
                                <div className="mt-4 pt-3 border-t border-stone-100 w-full">
                                    <p className="text-stone-500 text-xs md:text-sm font-medium italic">
                                        {dosen.expert}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

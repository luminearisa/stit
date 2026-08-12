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
        <section id="dosen" className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-gold font-bold text-sm tracking-widest uppercase mb-2">Tenaga Pengajar</h2>
                    <h3 className="text-4xl font-heading font-bold text-white">Pengajar Profesional & Inspiratif</h3>
                    <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                        Dosen-dosen STIT Al Wafi adalah para ahli di bidangnya, berpengalaman nasional & internasional, siap membimbing Anda menjadi pendidik unggul.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {lecturers.map((dosen, idx) => (
                        <div key={idx} className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all">
                            <div className="h-64 bg-gray-800 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60"></div>
                                {dosen.image ? (
                                    <Image
                                        src={dosen.image}
                                        alt={dosen.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-700 group-hover:scale-105 transition-transform duration-500">
                                        <ion-icon name="person" class="text-6xl text-gray-500"></ion-icon>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 relative z-20 -mt-10">
                                <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg border-t-2 border-gold mx-2 text-center h-full">
                                    <h4 className="text-white font-bold text-lg mb-1 line-clamp-2">{dosen.name}</h4>
                                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{dosen.role}</p>
                                    <div className="w-full h-px bg-white/10 my-3"></div>
                                    <p className="text-gray-400 text-sm italic">{dosen.expert}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

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

    return (
        <main className="min-h-screen bg-black text-gray-200">
            {/* Header */}
            <div className="relative pt-32 pb-20 bg-gradient-to-b from-[#111] to-black border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Profil STIT Al Wafi</h1>
                    <p className="text-gold text-xl italic">"Mewujudkan Pendidikan Islam yang Berkualitas dan Berkarakter"</p>
                </div>
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Sambutan Ketua STIT - 2 Column Layout */}
                <section className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4 sticky top-24">
                        <div className="border-l-4 border-gold pl-6 py-2">
                            <h2 className="text-3xl font-heading font-bold text-white mb-2">Sambutan Ketua STIT</h2>
                            <p className="text-gray-400">STIT Al Wafi Bogor</p>
                        </div>
                        {/* Photo */}
                        <div className="mt-8 relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
                            <Image
                                src="https://alwafi.ac.id/img/webp/pp-data0=ust_ali.webp"
                                alt="Dr. Ali Saman Hasan"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="mt-4">
                            <h4 className="text-xl font-bold text-white">Dr. Ali Saman Hasan</h4>
                            <p className="text-sm text-gold">Lc., LL.M., M.A.</p>
                        </div>
                    </div>

                    <div className="md:col-span-8 bg-[#111] p-8 md:p-12 rounded-2xl border border-white/5 leading-relaxed relative">
                        <div className="absolute -top-6 -left-6 text-6xl text-gold/20 font-serif">"</div>

                        <h3 className="font-serif text-2xl text-gold mb-6 italic text-center md:text-left">Bismillahirrahmanirrahim</h3>

                        <div className="space-y-6 text-lg">
                            <p>
                                Segala puji dan syukur kami panjatkan kepada Allah Subhanahu wa Ta'ala atas rahmat dan karunia-Nya sehingga Sekolah Tinggi Ilmu Tarbiyah (STIT) Al Wafi Bogor dapat terus berperan aktif dalam mewujudkan pendidikan Islam yang berkualitas. Kehadiran STIT Al Wafi Bogor merupakan wujud dari cita-cita luhur untuk mencetak tenaga pendidik yang tidak hanya unggul dalam keilmuan, tetapi juga berkarakter Islami yang kuat, siap menghadapi tantangan global, dan mampu menjadi teladan di tengah masyarakat.
                            </p>
                            <p>
                                STIT Al Wafi Bogor berkomitmen untuk menjadi institusi pendidikan yang berintegritas dan berkualitas melalui kurikulum yang terintegrasi antara ilmu pengetahuan modern dan nilai-nilai keislaman. Program unggulan kami, Program Studi Manajemen Pendidikan Islam (MPI), dirancang untuk menghasilkan tenaga pendidik yang kompeten dan profesional. Didukung oleh kegiatan pembelajaran praktis, penelitian, serta pengabdian masyarakat, kami berharap dapat membentuk lulusan yang tidak hanya ahli dalam bidangnya tetapi juga memiliki kepedulian sosial dan spiritualitas yang tinggi.
                            </p>
                        </div>

                        <div className="bg-black/30 p-8 rounded-xl border border-gold/20 my-10">
                            <h4 className="text-gold font-bold mb-4 uppercase tracking-widest text-sm text-center">Visi STIT Al Wafi</h4>
                            <p className="text-2xl text-white font-medium text-center italic">
                                "Terwujudnya Sekolah Tinggi Ilmu Tarbiyah Al Wafi Bogor yang unggul dan profesional serta kompetitif secara global di tahun 2034."
                            </p>
                        </div>

                        <p className="mb-8">
                            Kami mengucapkan terima kasih kepada seluruh jajaran pengurus Yayasan Al Sudais Indonesia, para dosen, tenaga kependidikan, serta pihak-pihak terkait lainnya yang telah mendukung dan berkontribusi pada perkembangan STIT Al Wafi Bogor. Semoga dengan kerja sama ini, STIT Al Wafi dapat terus berkembang menjadi lembaga pendidikan Islam yang terpercaya dan berkontribusi bagi kemajuan pendidikan di Indonesia.
                        </p>

                        <p className="font-serif text-xl text-gold italic text-right">Wassalamualaikum warahmatullahi wabarakatuh</p>
                    </div>
                </section>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

                {/* Profil Institusi & Keunggulan */}
                <section className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                            <ion-icon name="business" class="text-gold"></ion-icon>
                            Profil Institusi
                        </h2>
                        <div className="prose prose-invert prose-lg text-gray-400">
                            <p>
                                Sekolah Tinggi Ilmu Tarbiyah (STIT) Al Wafi adalah lembaga pendidikan tinggi yang berfokus pada pengembangan ilmu pendidikan Islam. Dengan izin operasional yang dikeluarkan oleh Kementerian Agama Republik Indonesia No. 1044 Tahun 2024, STIT Al Wafi bertujuan untuk mencetak lulusan yang memiliki kompetensi dalam bidang tarbiyah, khususnya pendidikan Islam, dengan standar akademis yang sesuai dengan kebutuhan masyarakat modern.
                            </p>
                        </div>

                        <div className="mt-8 p-6 bg-[#111] rounded-xl border border-white/5">
                            <h4 className="text-white font-bold mb-2">Legalitas</h4>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-2xl">
                                    <ion-icon name="checkmark-circle"></ion-icon>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase">Izin Operasional</p>
                                    <p className="text-white font-medium">Kementerian Agama Republik Indonesia No. 1044 Tahun 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                            <ion-icon name="star" class="text-gold"></ion-icon>
                            Keunggulan
                        </h2>
                        <ul className="space-y-4">
                            {[
                                "Tenaga pengajar profesional dan para masyaikh",
                                "Terbuka untuk ikhwan dan akhwat",
                                "Dosen S2, S3 alumni luar negeri dan dalam negeri",
                                "Perpaduan Islamic Studies dan kurikulum pemerintah",
                                "Kerjasama internasional"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 p-4 bg-[#111] rounded-lg border border-white/5 hover:border-gold/30 transition-colors">
                                    <ion-icon name="checkmark-done-circle" class="text-gold text-2xl"></ion-icon>
                                    <span className="text-gray-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Program Studi */}
                <section className="bg-[#111] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-white mb-4">Program Studi</h2>
                        <h3 className="text-4xl text-gold font-bold mb-6">Manajemen Pendidikan Islam (MPI)</h3>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Program studi yang mempersiapkan tenaga pendidik profesional dengan penguasaan manajemen pendidikan berbasis nilai-nilai Islam.
                        </p>
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-black rounded-full border border-gold/30 text-gold">
                            <ion-icon name="ribbon"></ion-icon>
                            <span className="font-bold">Gelar: Sarjana Pendidikan (S.Pd.)</span>
                        </div>
                    </div>
                </section>

                {/* Para Masyaikh */}
                <section>
                    <h2 className="text-3xl font-heading font-bold text-center text-white mb-12 relative inline-block left-1/2 -translate-x-1/2">
                        Para Masyaikh
                        <div className="absolute -bottom-4 left-0 w-full h-1 bg-gold"></div>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {masyaikh.map((syeikh, idx) => (
                            <div key={idx} className="bg-[#111] p-6 rounded-xl border border-white/5 text-center group hover:bg-[#1a1a1a] transition-colors">
                                <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <ion-icon name="person" class="text-3xl text-gray-500"></ion-icon>
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1">{syeikh.name}</h4>
                                <p className="text-gold text-xs uppercase tracking-wider">{syeikh.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tenaga Pengajar - Table Layout */}
                <section className="pb-20">
                    <h2 className="text-3xl font-heading font-bold text-white mb-8">Tenaga Pengajar</h2>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#111] border-b border-white/10 text-gold uppercase text-sm tracking-wider">
                                    <th className="p-6">Nama Dosen</th>
                                    <th className="p-6">Bidang Keahlian</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10 bg-black">
                                {lecturers.map((dosen, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 text-white font-medium">{dosen.name}</td>
                                        <td className="p-6 text-gray-400">{dosen.expertise}</td>
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

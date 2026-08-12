// @ts-nocheck
import React from 'react';

export default function VisiMisiPage() {
    return (
        <main className="min-h-screen bg-black text-gray-200">
            {/* Header */}
            <div className="relative pt-32 pb-20 bg-gradient-to-b from-[#111] to-black border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Visi & Misi</h1>
                    <p className="text-gold text-xl italic">"Mewujudkan Pendidikan Islam yang Berkualitas"</p>
                </div>
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Visi Misi Institusi */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-white mb-2">Visi & Misi STIT Al Wafi</h2>
                        <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Visi Card */}
                        <div className="bg-[#111] p-8 rounded-3xl border-t-4 border-gold relative overflow-hidden group hover:bg-[#151515] transition-colors">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <h3 className="text-4xl font-serif font-bold text-white mb-6">VISI</h3>
                                <p className="text-xl text-gray-300 leading-relaxed italic">
                                    "Menjadi Sekolah Tinggi terkemuka dan tepercaya dalam mencetak tenaga pendidik yang profesional dan berkarakter Islami guna mendukung penyelenggaraan pendidikan yang berkualitas pada tahun 2045."
                                </p>
                            </div>
                        </div>

                        {/* Misi Card */}
                        <div className="bg-[#111] p-8 rounded-3xl border-t-4 border-gray-700 relative overflow-hidden group hover:bg-[#151515] transition-colors">
                            <div className="relative z-10">
                                <h3 className="text-4xl font-serif font-bold text-white mb-6">MISI</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Menjadi sekolah tinggi unggulan yang menghasilkan tenaga pendidik profesional dan kompeten di bidang manajemen pendidikan berbasis nilai-nilai Islam.",
                                        "Membangun reputasi sebagai pusat pendidikan yang tepercaya dalam pengembangan ilmu manajemen pendidikan yang integratif antara nilai-nilai agama, teknologi, dan keilmuan modern.",
                                        "Membentuk lulusan yang berkarakter Islami, inovatif, dan mampu memberikan solusi atas berbagai tantangan pendidikan di tingkat nasional maupun global.",
                                        "Mengembangkan lingkungan akademik yang mendukung penelitian dan inovasi dalam pendidikan Islam berbasis teknologi.",
                                        "Mendorong pengabdian kepada masyarakat yang berorientasi pada pemberdayaan dan peningkatan kualitas pendidikan Islam di berbagai lapisan masyarakat."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 text-gray-400">
                                            <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-1 text-xs font-bold">
                                                {i + 1}
                                            </div>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-white/10"></div>

                {/* Visi Misi Prodi */}
                <section>
                    <div className="text-center mb-12">
                        <span className="text-gold text-sm font-bold tracking-widest uppercase mb-2 block">Program Studi</span>
                        <h2 className="text-3xl font-heading font-bold text-white mb-2">Manajemen Pendidikan Islam</h2>
                        <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Visi Prodi */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gold text-black rounded-lg flex items-center justify-center text-2xl font-bold">
                                    <ion-icon name="eye"></ion-icon>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Visi Program Studi</h3>
                            </div>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                                <p className="text-lg text-gray-300 leading-relaxed italic">
                                    "Menjadi pusat pengembangan manajemen pendidikan Islam yang berlandaskan kesadaran agama yang tinggi serta bersikap positif terhadap arus globalisasi, dengan menjadikan Nabi Muhammad Shallallahu ‘alaihi wasallam, para sahabat, dan ulama Ahlusunnah sebagai teladan, guna mendukung penyelenggaraan pendidikan yang berkualitas pada tahun 2045."
                                </p>
                            </div>
                        </div>

                        {/* Misi Prodi */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                                    <ion-icon name="rocket"></ion-icon>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Misi Program Studi</h3>
                            </div>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                                <ul className="space-y-6">
                                    {[
                                        "Melaksanakan pendidikan yang profesional dan berstandar internasional (world-class), berdasarkan Al-Qur’an dan Sunnah sesuai dengan pemahaman ulama Ahlusunnah.",
                                        "Mengembangkan riset di bidang manajemen pendidikan Islam yang integratif, berbasis akhlakul karimah, bermuamalah dengan lingkungan, dan berprinsip leaderpreneurship.",
                                        "Menyelenggarakan pengabdian kepada masyarakat (Community Engagement Program) yang berorientasi pada pemberdayaan dan peningkatan kualitas pendidikan Islam yang unggul dalam menyikapi perubahan global, berdasarkan Al-Qur’an dan Sunnah sesuai dengan pemahaman ulama Ahlusunnah.",
                                        "Meningkatkan kolaborasi yang berkelanjutan dengan berbagai pihak di tingkat nasional maupun internasional dalam bidang manajemen pendidikan Islam, sesuai dengan Al-Qur’an dan Sunnah."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <ion-icon name="checkmark-circle" class="text-gold text-xl flex-shrink-0 mt-1"></ion-icon>
                                            <span className="text-gray-400 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

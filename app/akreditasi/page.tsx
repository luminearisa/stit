// @ts-nocheck
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Akreditasi STIT Al Wafi Bogor - LAMDIK',
  description: 'Informasi resmi status akreditasi Program Studi Manajemen Pendidikan Islam STIT Al Wafi Bogor oleh LAMDIK.',
};

export default function AkreditasiPage() {
    return (
        <main className="min-h-screen bg-black text-gray-200">
            {/* Header */}
            <div className="relative pt-32 pb-20 bg-gradient-to-b from-[#111] to-black border-b border-white/5 text-center overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors mb-6 text-sm uppercase tracking-widest font-bold">
                        <ion-icon name="arrow-back"></ion-icon>
                        Kembali ke Beranda
                    </Link>
                    <div className="bg-gold/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-gold/20">
                        <ion-icon name="ribbon" class="text-5xl text-gold"></ion-icon>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Informasi Akreditasi</h1>
                    <p className="text-gold text-xl italic font-serif">Lembaga Akreditasi Mandiri Kependidikan (LAMDIK)</p>
                </div>
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-bold mb-3 text-white tracking-widest uppercase">Keputusan LAMDIK</h2>
                    <p className="text-xl text-gray-400 font-mono">NOMOR: 1127/SK/LAMDIK/Ak-PSB/S/VI/2026</p>
                </div>

                <div className="space-y-8">
                    {/* Status */}
                    <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors flex flex-col md:flex-row items-center justify-between gap-6 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors"></div>
                        <div className="md:w-1/3 relative z-10 text-center md:text-left">
                            <h3 className="font-bold text-gray-500 uppercase tracking-widest mb-2">Status Akreditasi</h3>
                        </div>
                        <div className="md:w-2/3 text-center md:text-right relative z-10">
                            <span className="inline-block px-6 py-3 bg-gold/10 text-gold text-xl md:text-2xl font-bold rounded-xl border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)] tracking-wide">
                                TERAKREDITASI PERTAMA
                            </span>
                        </div>
                    </div>

                    {/* Prodi */}
                    <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors"></div>
                        <div className="md:w-1/3 relative z-10 text-center md:text-left">
                            <h3 className="font-bold text-gray-500 uppercase tracking-widest mb-2">Program Studi</h3>
                        </div>
                        <div className="md:w-2/3 relative z-10 text-center md:text-left">
                            <p className="text-2xl text-white font-bold mb-3">Manajemen Pendidikan Islam</p>
                            <p className="text-gray-400 leading-relaxed">Pada Program Sarjana Sekolah Tinggi Ilmu Tarbiyah Al Wafi Bogor, Kabupaten Bogor</p>
                        </div>
                    </div>

                    {/* Masa Berlaku */}
                    <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none group-hover:bg-gold/10 transition-colors"></div>
                        <div className="md:w-1/3 relative z-10 text-center md:text-left">
                            <h3 className="font-bold text-gray-500 uppercase tracking-widest mb-2">Masa Berlaku</h3>
                        </div>
                        <div className="md:w-2/3 relative z-10 text-center md:text-left">
                            <p className="text-xl text-gray-300 mb-4">Sejak <span className="font-bold text-gold">18 Oktober 2024</span> sampai dengan <span className="font-bold text-gold">16 September 2027</span></p>
                        </div>
                    </div>

                    {/* Ditetapkan */}
                    <div className="bg-gradient-to-br from-[#111] to-black p-8 md:p-10 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 mt-12">
                        <div className="text-center md:text-left">
                            <h3 className="font-bold text-gray-500 mb-2 uppercase tracking-widest text-sm">Ditetapkan Di</h3>
                            <p className="text-white font-medium text-xl">Jakarta, 25 Juni 2026</p>
                        </div>
                        <div className="text-center md:text-right">
                            <h3 className="font-bold text-gray-500 mb-2 uppercase tracking-widest text-sm">Ketua Umum LAMDIK</h3>
                            <p className="text-gold font-bold text-2xl font-serif">Muchlas Samani</p>
                        </div>
                    </div>
                </div>

                {/* Tombol Download */}
                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a 
                        href="/akre/2026-06-25_213791-862310-18_AKR-SERT_STIT Al Wafi Bogor-S1 MPI - Sekolah Tinngi Ilmu Tarbiyah Al Wafi Bogor.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-gold text-black font-bold rounded-xl hover:bg-white hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.2)] w-full sm:w-auto"
                    >
                        <ion-icon name="download-outline" class="text-2xl"></ion-icon>
                        Unduh Sertifikat Akreditasi
                    </a>
                    <a 
                        href="/akre/2026-06-25_213791-862310-18_AKR-SK_STIT Al Wafi Bogor-S1 MPI - Sekolah Tinngi Ilmu Tarbiyah Al Wafi Bogor.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-[#111] text-white border border-gold/30 font-bold rounded-xl hover:border-gold hover:text-gold transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 w-full sm:w-auto"
                    >
                        <ion-icon name="document-text-outline" class="text-2xl"></ion-icon>
                        Unduh SK Akreditasi
                    </a>
                </div>

                <div className="mt-16 text-center pt-10 border-t border-white/5">
                    <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
                        Keputusan ini menandakan bahwa STIT Al Wafi Bogor telah memenuhi syarat minimum penyelenggaraan program studi sesuai dengan standar pendidikan tinggi nasional Republik Indonesia.
                    </p>
                </div>
            </div>
        </main>
    );
}

// @ts-nocheck
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Akreditasi STIT Al Wafi Bogor - LAMDIK',
  description: 'Informasi resmi status akreditasi Program Studi Manajemen Pendidikan Islam STIT Al Wafi Bogor oleh LAMDIK.',
};

export default function AkreditasiPage() {
    return (
        <main className="min-h-screen bg-[#FAF8F5] text-stone-700">
            {/* Header */}
            <div className="relative pt-36 md:pt-44 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5] border-b border-stone-200 text-center overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-gold transition-colors mb-6 text-xs uppercase tracking-widest font-bold">
                        <ion-icon name="arrow-back"></ion-icon>
                        Kembali ke Beranda
                    </Link>
                    <div className="bg-gold/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gold/30">
                        <ion-icon name="ribbon" class="text-4xl text-gold"></ion-icon>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-3">Informasi Akreditasi</h1>
                    <p className="text-[#9E7A27] text-lg md:text-xl italic font-serif">Lembaga Akreditasi Mandiri Kependidikan (LAMDIK)</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-stone-900 tracking-widest uppercase">Keputusan LAMDIK</h2>
                    <p className="text-lg md:text-xl text-[#9E7A27] font-mono font-medium">NOMOR: 1127/SK/LAMDIK/Ak-PSB/S/VI/2026</p>
                </div>

                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none transition-colors"></div>
                        <div className="md:w-1/3 relative z-10 text-center md:text-left">
                            <h3 className="font-bold text-stone-400 uppercase tracking-widest text-xs md:text-sm mb-1">Status Akreditasi</h3>
                        </div>
                        <div className="md:w-2/3 text-center md:text-right relative z-10">
                            <span className="inline-block px-6 py-3 bg-gold/15 text-[#9E7A27] text-lg md:text-xl font-bold rounded-2xl border border-gold/30 shadow-sm tracking-wide">
                                TERAKREDITASI PERTAMA
                            </span>
                        </div>
                    </div>

                    {/* Prodi */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none transition-colors"></div>
                        <div className="md:w-1/3 relative z-10 text-center md:text-left">
                            <h3 className="font-bold text-stone-400 uppercase tracking-widest text-xs md:text-sm mb-1">Program Studi</h3>
                        </div>
                        <div className="md:w-2/3 relative z-10 text-center md:text-left">
                            <p className="text-xl md:text-2xl text-stone-900 font-bold mb-2">Manajemen Pendidikan Islam</p>
                            <p className="text-stone-600 leading-relaxed">Pada Program Sarjana Sekolah Tinggi Ilmu Tarbiyah Al Wafi Bogor, Kabupaten Bogor</p>
                        </div>
                    </div>

                    {/* Masa Berlaku */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none transition-colors"></div>
                        <div className="md:w-1/3 relative z-10 text-center md:text-left">
                            <h3 className="font-bold text-stone-400 uppercase tracking-widest text-xs md:text-sm mb-1">Masa Berlaku</h3>
                        </div>
                        <div className="md:w-2/3 relative z-10 text-center md:text-left">
                            <p className="text-lg md:text-xl text-stone-700">Sejak <span className="font-bold text-[#9E7A27]">18 Oktober 2024</span> sampai dengan <span className="font-bold text-[#9E7A27]">16 September 2027</span></p>
                        </div>
                    </div>

                    {/* Ditetapkan */}
                    <div className="bg-[#F5EFE6] p-8 md:p-10 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 mt-10">
                        <div className="text-center md:text-left">
                            <h3 className="font-bold text-stone-500 mb-1 uppercase tracking-widest text-xs">Ditetapkan Di</h3>
                            <p className="text-stone-900 font-bold text-lg md:text-xl">Jakarta, 25 Juni 2026</p>
                        </div>
                        <div className="text-center md:text-right">
                            <h3 className="font-bold text-stone-500 mb-1 uppercase tracking-widest text-xs">Ketua Umum LAMDIK</h3>
                            <p className="text-[#9E7A27] font-bold text-2xl font-serif">Muchlas Samani</p>
                        </div>
                    </div>
                </div>

                {/* Tombol Download */}
                <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <a 
                        href="/akre/2026-06-25_213791-862310-18_AKR-SERT_STIT Al Wafi Bogor-S1 MPI - Sekolah Tinngi Ilmu Tarbiyah Al Wafi Bogor.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-md w-full sm:w-auto"
                    >
                        <ion-icon name="download-outline" class="text-2xl"></ion-icon>
                        Unduh Sertifikat Akreditasi
                    </a>
                    <a 
                        href="/akre/2026-06-25_213791-862310-18_AKR-SK_STIT Al Wafi Bogor-S1 MPI - Sekolah Tinngi Ilmu Tarbiyah Al Wafi Bogor.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-stone-800 border border-stone-300 font-bold rounded-2xl hover:border-gold hover:text-gold transition-all text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-sm w-full sm:w-auto"
                    >
                        <ion-icon name="document-text-outline" class="text-2xl"></ion-icon>
                        Unduh SK Akreditasi
                    </a>
                </div>

                <div className="mt-16 text-center pt-10 border-t border-stone-200">
                    <p className="text-stone-500 text-sm max-w-2xl mx-auto leading-relaxed">
                        Keputusan ini menandakan bahwa STIT Al Wafi Bogor telah memenuhi syarat minimum penyelenggaraan program studi sesuai dengan standar pendidikan tinggi nasional Republik Indonesia.
                    </p>
                </div>
            </div>
        </main>
    );
}

// @ts-nocheck
import Link from 'next/link';

export default function AccreditationCTA() {
    return (
        <section className="bg-black py-8 border-b border-white/5 relative z-20">
            <div className="container mx-auto px-4">
                <div className="bg-[#111] border border-gold/30 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(212,175,55,0.05)] flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto relative overflow-hidden group hover:border-gold/60 transition-colors">
                    
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
                    
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 relative z-10">
                        <div className="bg-gold/10 p-4 rounded-full shrink-0 border border-gold/20 shadow-inner">
                            <ion-icon name="ribbon" class="text-4xl text-gold"></ion-icon>
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white font-heading tracking-wide">
                                Terakreditasi LAMDIK
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-lg leading-relaxed">
                                Prodi Manajemen Pendidikan Islam (MPI) STIT Al Wafi Bogor resmi mendapatkan status <span className="text-gold font-semibold tracking-wider">TERAKREDITASI PERTAMA</span>.
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        href="/akreditasi" 
                        className="shrink-0 px-8 py-3 bg-gold text-black font-bold rounded-full hover:bg-white hover:scale-105 transition-all text-sm uppercase tracking-wider relative z-10 text-center w-full sm:w-auto shadow-lg"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </section>
    );
}

// @ts-nocheck
import Link from 'next/link';

export default function AccreditationCTA() {
    return (
        <section className="bg-[#FAF8F5] py-8 border-b border-stone-200/60 relative z-20">
            <div className="container mx-auto px-4">
                <div className="bg-white border border-amber-900/15 rounded-3xl p-6 md:p-8 shadow-md shadow-stone-200/60 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto relative overflow-hidden group hover:border-gold/50 transition-all">
                    
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>
                    
                    <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 relative z-10">
                        <div className="bg-gold/15 p-4 rounded-2xl shrink-0 border border-gold/30 shadow-sm text-gold">
                            <ion-icon name="ribbon" class="text-4xl text-gold"></ion-icon>
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-stone-900 font-heading tracking-wide">
                                Terakreditasi LAMDIK
                            </h3>
                            <p className="text-stone-600 text-sm md:text-base mt-1.5 max-w-lg leading-relaxed">
                                Prodi Manajemen Pendidikan Islam (MPI) STIT Al Wafi Bogor resmi mendapatkan status <span className="text-[#A67C1E] font-bold tracking-wide">TERAKREDITASI PERTAMA</span>.
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        href="/akreditasi" 
                        className="shrink-0 px-8 py-3.5 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-full hover:shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all text-sm uppercase tracking-wider relative z-10 text-center w-full sm:w-auto shadow-md shadow-gold/20"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </section>
    );
}

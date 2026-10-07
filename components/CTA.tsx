// @ts-nocheck
export default function CTA() {
    return (
        <section id="cta" className="py-24 bg-gradient-to-b from-[#3E3017] via-[#2D2310] to-[#1A1408] relative overflow-hidden text-center">
            {/* Subtle atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/15 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <span className="inline-block text-gold text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
                    Masa Depan Pendidik Islami
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                    Bergabunglah Bersama <br /> STIT Al Wafi Bogor
                </h2>
                <p className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
                    Siapkan masa depan gemilang dengan pendidikan berbasis Adab dan Ilmu. Daftarkan diri Anda sekarang juga.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="https://siakad.alwafi.ac.id/register"
                        className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-stone-950 font-bold rounded-full shadow-lg shadow-gold/20 hover:brightness-110 hover:scale-105 transition-all text-base flex items-center gap-2"
                    >
                        <span>+ Daftar Sekarang</span>
                    </a>
                    <a
                        href="https://wa.me/6289527217662"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-stone-900 hover:scale-105 transition-all flex items-center gap-2 text-base"
                    >
                        <ion-icon name="logo-whatsapp" class="text-xl text-emerald-400"></ion-icon>
                        <span>WhatsApp PMB (0895 2721 7662)</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

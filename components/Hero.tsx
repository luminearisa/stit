// @ts-nocheck
export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-[#0f0f0f] z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 z-0 mix-blend-overlay" />
                {/* Gold Glow */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 z-10 text-center relative">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium tracking-wide animate-fade-in-up">
                    ahlan wa sahlan di STIT Al Wafi Bogor
                </div>

                <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto shadow-black drop-shadow-lg">
                    Mencetak Pendidik <span className="text-gold italic">Islami Profesional</span> & Berakhlak Mulia
                </h1>

                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Membangun generasi Rabbani dengan integrasi ilmu pengetahuan modern dan pemahaman Salafus Shalih.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="https://siakad.alwafi.ac.id/register"
                        className="group px-8 py-4 bg-gold text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-gold-hover hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-1"
                    >
                        <span className="flex items-center gap-2">
                            Daftar Sekarang
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </span>
                    </a>

                    <a
                        href="#footer"
                        className="group px-8 py-4 bg-transparent border border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/5 hover:border-gold transition-all"
                    >
                        Hubungi Kami
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <ion-icon name="chevron-down-outline" size="large"></ion-icon>
                </div>
            </div>
        </section>
    );
}

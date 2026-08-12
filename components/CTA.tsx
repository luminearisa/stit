// @ts-nocheck
export default function CTA() {
    return (
        <section id="cta" className="py-20 bg-gold relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-black mb-6">
                    Bergabunglah Bersama <br /> STIT Al Wafi Bogor
                </h2>
                <p className="text-black/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                    Siapkan masa depan gemilang dengan pendidikan berbasis Adab dan Ilmu. Daftarkan diri Anda sekarang juga.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="https://siakad.alwafi.ac.id/register"
                        className="px-8 py-4 bg-black text-white font-bold rounded-full shadow-lg hover:bg-gray-900 hover:scale-105 transition-all text-lg"
                    >
                        Daftar Sekarang
                    </a>
                    <a
                        href="https://wa.me/628111351044"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-green-700 font-bold rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-2 text-lg"
                    >
                        <ion-icon name="logo-whatsapp" class="text-2xl"></ion-icon>
                        WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}

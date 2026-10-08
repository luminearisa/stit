// @ts-nocheck
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden pt-16 md:pt-20 pb-20 bg-[#FAF8F5]">
            {/* Background Architecture & Atmospheric Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Background Campus Photo with Soft Blend */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-[0.07] mix-blend-multiply"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')`
                    }}
                />
                
                {/* Gradient Masks */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F5EFE6]/90 via-[#FAF8F5]/95 to-[#FAF8F5]" />
                
                {/* Ambient Golden Light Orbs */}
                <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 -right-24 w-[450px] h-[450px] bg-amber-200/25 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-gold/10 rounded-full blur-[90px]" />
                
                {/* Delicate Grid Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3A2B14_1px,transparent_1px)] [background-size:24px_24px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 z-10 relative">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column: Headlines & Call-to-Actions */}
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold/40 bg-white/80 backdrop-blur-md text-[#8C6718] text-xs md:text-sm font-semibold tracking-wide shadow-sm shadow-gold/10">
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
                            </span>
                            <span>Penerimaan Mahasiswa Baru 2026/2027</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-[1.15] tracking-tight">
                            Mencetak Pendidik <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9E7A27] via-gold to-[#B8860B] italic font-serif">
                                Islami Profesional
                            </span>{" "}
                            & Berintegritas
                        </h1>

                        {/* Subtitle */}
                        <p className="text-stone-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                            Sekolah Tinggi Ilmu Tarbiyah Al Wafi Bogor mengintegrasikan keilmuan modern berstandar nasional dengan manhaj Ahlusunnah wal Jama'ah untuk melahirkan pemimpin pendidikan masa depan.
                        </p>

                        {/* CTA Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                            <Link
                                href="https://siakad.alwafi.ac.id/register"
                                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-gold via-[#C5A059] to-gold-hover text-white font-bold text-base rounded-full shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/50 transition-all transform hover:-translate-y-0.5"
                            >
                                <span>Daftar Sekarang</span>
                                <ion-icon name="arrow-forward-outline" class="text-lg group-hover:translate-x-1.5 transition-transform"></ion-icon>
                            </Link>

                            <Link
                                href="/profil"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-md border border-stone-300 text-stone-800 font-semibold text-base rounded-full hover:border-gold hover:text-[#9E7A27] hover:bg-white transition-all shadow-sm"
                            >
                                <ion-icon name="information-circle-outline" class="text-xl text-gold"></ion-icon>
                                <span>Profil Kampus</span>
                            </Link>
                        </div>

                        {/* Key Statistics / Highlights */}
                        <div className="pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
                            <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-stone-200/60 shadow-sm">
                                <p className="text-2xl lg:text-3xl font-bold font-heading text-stone-900">LAMDIK</p>
                                <p className="text-xs text-stone-500 font-medium mt-0.5">Terakreditasi Resmi</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-stone-200/60 shadow-sm">
                                <p className="text-2xl lg:text-3xl font-bold font-heading text-stone-900">S1 MPI</p>
                                <p className="text-xs text-stone-500 font-medium mt-0.5">Gelar S.Pd</p>
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-stone-200/60 shadow-sm">
                                <p className="text-2xl lg:text-3xl font-bold font-heading text-stone-900">2 Kampus</p>
                                <p className="text-xs text-stone-500 font-medium mt-0.5">Bogor & Depok</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Showcase Card */}
                    <div className="lg:col-span-5 relative pt-6 pb-8 px-2 sm:px-4">
                        {/* Glow Behind Card */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 to-amber-200/40 rounded-3xl blur-2xl transform rotate-1 scale-95 pointer-events-none"></div>

                        {/* Main Image Card Wrapper (No overflow-hidden to let badges pop out cleanly) */}
                        <div className="relative bg-white p-3 sm:p-4 rounded-3xl border border-stone-200/80 shadow-2xl">
                            
                            {/* Inner Image Container (Has overflow-hidden for rounded image corners) */}
                            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                                <Image
                                    src="/photos/carousel1.jpg"
                                    alt="Kampus STIT Al Wafi Bogor"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                {/* Soft Gradient Overlay on Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>

                                {/* Caption on Image */}
                                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                                    <span className="inline-block px-3 py-1 bg-gold text-stone-950 text-xs font-bold rounded-lg uppercase tracking-wider mb-1.5 shadow-sm">
                                        Kampus Unggulan
                                    </span>
                                    <p className="font-heading font-bold text-lg sm:text-xl text-white leading-snug drop-shadow-md">
                                        Sekolah Tinggi Ilmu Tarbiyah Al Wafi
                                    </p>
                                    <p className="text-xs text-stone-300 flex items-center gap-1 mt-1 font-medium">
                                        <ion-icon name="location" class="text-gold text-sm"></ion-icon>
                                        <span>Tajur Halang, Bogor - Jawa Barat</span>
                                    </p>
                                </div>
                            </div>

                            {/* Floating Badge 1: Akreditasi LAMDIK (Top Left) */}
                            <div className="absolute -top-5 -left-2 sm:-top-6 sm:-left-6 bg-white py-3 px-4 sm:px-5 rounded-2xl border-2 border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center gap-3 sm:gap-3.5 z-20 animate-float">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gold/15 flex items-center justify-center text-gold text-2xl sm:text-3xl border border-gold/30 shrink-0 shadow-inner">
                                    <ion-icon name="ribbon"></ion-icon>
                                </div>
                                <div>
                                    <span className="text-[10px] sm:text-[11px] font-bold text-[#8C6718] uppercase tracking-wider block">Status Akreditasi</span>
                                    <span className="text-xs sm:text-sm md:text-base font-extrabold text-stone-900 block leading-tight">Terakreditasi LAMDIK</span>
                                </div>
                            </div>

                            {/* Floating Badge 2: Izin Operasional (Bottom Right) */}
                            <div className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-6 bg-white py-3 px-4 sm:px-5 rounded-2xl border-2 border-emerald-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center gap-3 sm:gap-3.5 z-20 animate-float-delayed">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl sm:text-3xl border border-emerald-300 shrink-0 shadow-inner">
                                    <ion-icon name="school"></ion-icon>
                                </div>
                                <div>
                                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Izin Operasional Resmi</span>
                                    <span className="text-xs sm:text-sm md:text-base font-extrabold text-stone-900 block leading-tight">Kemenag RI No. 1044</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

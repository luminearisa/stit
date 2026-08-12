// @ts-nocheck
import Image from 'next/image';

export default function ChairmanMessage() {
    return (
        <section id="sambutan" className="py-20 bg-black relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-[#111] border border-gold/20 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full"></div>

                    <div className="text-center mb-8">
                        <h2 className="text-gold font-serif text-2xl md:text-3xl mb-6 dir-rtl" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                        </h2>
                    </div>

                    <div className="space-y-6 text-gray-300 leading-relaxed text-center md:text-left">
                        <p className="text-lg">
                            <span className="text-gold text-xl font-serif mr-1">"</span>
                            Dengan izin Allah Subhanahu wa Ta&apos;ala, STIT Al Wafi Bogor hadir untuk membentuk pendidik Islami yang menguasai ilmu pengetahuan modern sekaligus berpegang teguh pada nilai-nilai Al-Qur&apos;an dan Sunnah.
                            <span className="text-gold text-xl font-serif ml-1">"</span>
                        </p>

                        <div className="bg-black/50 p-6 rounded-lg border-l-4 border-gold my-8">
                            <h3 className="text-gold font-bold text-xl mb-2 flex items-center gap-2">
                                <ion-icon name="eye-outline"></ion-icon>
                                الرؤية (Visi)
                            </h3>
                            <p className="italic text-white font-medium text-lg">
                                &ldquo;Menjadi lembaga pendidikan tinggi Islam unggulan yang menghasilkan pendidik profesional dan berakhlak mulia pada tahun 2034.&rdquo;
                            </p>
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-gold font-serif text-xl mb-6" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                                وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
                            </p>

                            <div className="flex flex-col items-center justify-center">
                                {/* Avatar */}
                                <div className="relative w-24 h-24 rounded-full border-2 border-gold overflow-hidden mb-3">
                                    <Image
                                        src="https://alwafi.ac.id/img/webp/pp-data0=ust_ali.webp"
                                        alt="Dr. Ali Saman Hasan"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h4 className="text-white font-bold text-xl">Dr. Ali Saman Hasan, Lc., LL.M., M.A.</h4>
                                <p className="text-gold text-sm uppercase tracking-widest mt-1">Ketua STIT Al Wafi Bogor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

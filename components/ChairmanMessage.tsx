// @ts-nocheck
import Image from 'next/image';

export default function ChairmanMessage() {
    return (
        <section id="sambutan" className="py-20 bg-[#FAF8F5] relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white border border-amber-900/10 rounded-3xl p-8 md:p-12 shadow-lg shadow-stone-200/70 relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/15 to-transparent rounded-bl-full pointer-events-none"></div>

                    <div className="text-center mb-8">
                        <h2 className="text-[#9E7A27] font-serif text-2xl md:text-3xl mb-4 dir-rtl" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                        </h2>
                    </div>

                    <div className="space-y-6 text-stone-700 leading-relaxed text-center md:text-left font-normal">
                        <p className="text-lg md:text-xl text-stone-800">
                            <span className="text-gold text-2xl font-serif mr-1">"</span>
                            Dengan izin Allah Subhanahu wa Ta&apos;ala, STIT Al Wafi Bogor hadir untuk membentuk pendidik Islami yang menguasai ilmu pengetahuan modern sekaligus berpegang teguh pada nilai-nilai Al-Qur&apos;an dan Sunnah.
                            <span className="text-gold text-2xl font-serif ml-1">"</span>
                        </p>

                        <div className="bg-[#F5EFE6] p-6 rounded-2xl border-l-4 border-gold my-8 shadow-sm">
                            <h3 className="text-[#9E7A27] font-bold text-lg mb-2 flex items-center gap-2">
                                <ion-icon name="eye-outline"></ion-icon>
                                الرؤية (Visi STIT Al Wafi)
                            </h3>
                            <p className="italic text-stone-800 font-medium text-base md:text-lg leading-relaxed">
                                &ldquo;Menjadi Perguruan Tinggi Terpercaya, Unggul, Berdaya Saing Global dalam mencetak Tenaga Profesional dan Tenaga Pendidik yang Berkarakter Islami guna mendukung penyelenggaraan pendidikan yang berkualitas pada tahun 2045.&rdquo;
                            </p>
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-[#9E7A27] font-serif text-xl mb-6" style={{ fontFamily: 'Traditional Arabic, serif' }}>
                                وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
                            </p>

                            <div className="flex flex-col items-center justify-center">
                                {/* Avatar */}
                                <div className="relative w-24 h-24 rounded-full border-2 border-gold overflow-hidden mb-3 shadow-md">
                                    <Image
                                        src="https://alwafi.ac.id/img/webp/pp-data0=ust_ali.webp"
                                        alt="Dr. Ali Saman Hasan"
                                        fill
                                        className="object-cover"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <h4 className="text-stone-900 font-bold text-xl">Dr. Ali Saman Hasan, Lc., LL.M., M.A.</h4>
                                <p className="text-gold font-semibold text-xs md:text-sm uppercase tracking-widest mt-1">Ketua STIT Al Wafi Bogor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

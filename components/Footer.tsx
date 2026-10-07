// @ts-nocheck
import Image from 'next/image';

export default function Footer() {
    return (
        <footer id="footer" className="bg-[#1A1408] pt-20 pb-10 border-t border-amber-900/30 text-stone-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14">
                                <Image
                                    src="https://alwafi.ac.id/assets/img/stit.png"
                                    alt="Logo STIT Al Wafi"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl text-white">STIT AL WAFI</span>
                                <span className="text-xs text-gold font-semibold tracking-wider">BOGOR</span>
                            </div>
                        </div>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            Mencetak pendidik profesional dan berakhlak mulia dengan integrasi ilmu pengetahuan dan nilai-nilai Islam.
                        </p>
                        <div className="flex gap-4">
                            {['logo-facebook', 'logo-instagram', 'logo-youtube'].map((icon) => (
                                <a key={icon} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-stone-950 transition-all shadow-sm">
                                    <ion-icon name={icon}></ion-icon>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-gold">
                            Kontak
                        </h4>
                        <ul className="space-y-4 text-stone-300">
                            <li className="flex items-start gap-3">
                                <ion-icon name="logo-whatsapp" class="text-emerald-400 text-xl mt-1"></ion-icon>
                                <div>
                                    <p className="text-xs text-amber-200/80 font-medium">CP PMB (WhatsApp)</p>
                                    <a 
                                        href="https://wa.me/6289527217662" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:text-gold transition-colors font-medium text-white block"
                                    >
                                        0895 2721 7662
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <ion-icon name="call" class="text-gold text-xl mt-1"></ion-icon>
                                <div>
                                    <p className="text-xs text-stone-400">Informasi Kampus</p>
                                    <p className="hover:text-gold transition-colors font-medium">0811-135-1044</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <ion-icon name="mail" class="text-gold text-xl mt-1"></ion-icon>
                                <div>
                                    <p className="text-xs text-stone-400">Email Resmi</p>
                                    <a href="mailto:info@alwafi.ac.id" className="hover:text-gold transition-colors">
                                        info@alwafi.ac.id
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-gold">
                            Alamat Kampus
                        </h4>
                        <div className="flex flex-col gap-4 text-stone-300">
                            <div className="flex items-start gap-3">
                                <ion-icon name="business" class="text-gold text-xl mt-1 flex-shrink-0"></ion-icon>
                                <div>
                                    <p className="font-bold text-white mb-1">Kampus A</p>
                                    <p className="text-sm leading-relaxed text-stone-300">
                                        Jl. Raya Arco No.1 RT.02/RW.01,<br />
                                        Ragamukti, Citayam, Tajur Halang,<br />
                                        Bogor, Jawa Barat
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <ion-icon name="business" class="text-gold text-xl mt-1 flex-shrink-0"></ion-icon>
                                <div>
                                    <p className="font-bold text-white mb-1">Kampus B</p>
                                    <p className="text-sm leading-relaxed text-stone-300">
                                        Jalan Raya Pengasinan,<br />
                                        Kelurahan Pengasinan, Kec. Sawangan,<br />
                                        Kota Depok, Jawa Barat 16518
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 bg-white/5 p-3 rounded-xl border border-white/10">
                                <ion-icon name="map" class="text-gold text-lg"></ion-icon>
                                <p className="text-xs text-amber-200/80 italic">
                                    *Jarak Kampus A ke Kampus B ± 2 km
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-1 after:bg-gold">
                            Jam Operasional
                        </h4>
                        <ul className="space-y-3 text-stone-300">
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Senin – Jumat</span>
                                <span className="text-gold font-mono font-medium">08.00 – 16.00</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Sabtu</span>
                                <span className="text-gold font-mono font-medium">08.00 – 14.00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Ahad</span>
                                <span className="text-red-400 text-xs uppercase pt-1 font-semibold">Tutup</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-stone-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} STIT Al Wafi Bogor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

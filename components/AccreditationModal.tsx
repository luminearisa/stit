// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AccreditationModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Tampilkan modal setelah 1.5 detik
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white border border-amber-900/15 p-8 md:p-10 rounded-3xl max-w-lg w-full relative shadow-2xl transform transition-transform scale-100 overflow-hidden text-stone-800">
                
                {/* Texture/Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors z-10"
                    aria-label="Close"
                >
                    <ion-icon name="close-circle" class="text-3xl"></ion-icon>
                </button>
                
                <div className="text-center relative z-10">
                    <div className="bg-gold/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-gold border border-gold/30 shadow-inner">
                        <ion-icon name="ribbon" class="text-4xl text-gold"></ion-icon>
                    </div>
                    <span className="inline-block px-4 py-1 bg-gold/15 text-[#9E7A27] text-xs font-bold rounded-full mb-3 uppercase tracking-widest border border-gold/30">
                        Kabar Gembira
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-stone-900">
                        Alhamdulillah!
                    </h2>
                    <h3 className="text-base md:text-lg font-bold mb-4 text-[#9E7A27]">
                        STIT Al Wafi Bogor Resmi Terakreditasi
                    </h3>
                    <p className="mb-8 text-stone-600 leading-relaxed text-sm md:text-base">
                        Program Studi <strong className="text-stone-900 font-bold">Manajemen Pendidikan Islam</strong> telah resmi mendapatkan status <strong className="text-gold font-bold">TERAKREDITASI PERTAMA</strong> dari Lembaga Akreditasi Mandiri Kependidikan (LAMDIK).
                    </p>
                    
                    <Link 
                        href="/akreditasi" 
                        onClick={() => setIsOpen(false)}
                        className="inline-block w-full px-8 py-3.5 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-full hover:shadow-lg hover:shadow-gold/30 hover:scale-102 transition-all uppercase tracking-wider text-sm shadow-md shadow-gold/20"
                    >
                        Lihat Selengkapnya
                    </Link>
                </div>
            </div>
        </div>
    );
}

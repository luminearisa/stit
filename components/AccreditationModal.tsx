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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity">
            <div className="bg-[#111] border border-gold/30 p-8 md:p-10 rounded-3xl max-w-lg w-full relative shadow-[0_0_50px_rgba(212,175,55,0.15)] transform transition-transform scale-100 overflow-hidden">
                
                {/* Texture/Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
                    aria-label="Close"
                >
                    <ion-icon name="close-circle" class="text-3xl"></ion-icon>
                </button>
                
                <div className="text-center relative z-10">
                    <div className="bg-gold/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gold shadow-inner border border-gold/20">
                        <ion-icon name="ribbon" class="text-5xl"></ion-icon>
                    </div>
                    <span className="inline-block px-4 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full mb-4 uppercase tracking-widest border border-gold/20">
                        Kabar Gembira
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-white">
                        Alhamdulillah!
                    </h2>
                    <h3 className="text-lg font-bold mb-4 text-gray-300">
                        STIT Al Wafi Bogor Resmi Terakreditasi
                    </h3>
                    <p className="mb-8 text-gray-400 leading-relaxed text-sm md:text-base">
                        Program Studi <strong className="text-white">Manajemen Pendidikan Islam</strong> telah resmi mendapatkan status <strong className="text-gold">TERAKREDITASI PERTAMA</strong> dari Lembaga Akreditasi Mandiri Kependidikan (LAMDIK).
                    </p>
                    
                    <Link 
                        href="/akreditasi" 
                        onClick={() => setIsOpen(false)}
                        className="inline-block w-full px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm shadow-lg"
                    >
                        Lihat Selengkapnya
                    </Link>
                </div>
            </div>
        </div>
    );
}

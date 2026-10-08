// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                setOpenDropdown(null);
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        {
            name: 'Tentang Kami',
            href: '#',
            dropdown: [
                { name: 'Sejarah Yayasan', href: '/sejarah' },
                { name: 'Profil Kampus', href: '/profil' },
                { name: 'Visi & Misi', href: '/visi-misi' },
                { name: 'Fasilitas Masjid', href: '/masjid' },
            ]
        },
        { name: 'Program Studi', href: '/#prodi' },
        { name: 'Dosen', href: '/#dosen' },
        { name: 'Jurnal', href: 'https://alwafi.ac.id/journal/index.php/stit' },
        { name: 'Berita', href: 'https://alwafi.ac.id/news/' },
    ];

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <header className="fixed w-full z-50 transition-all duration-300">
            {/* Top Contact Bar like in image */}
            <div className="bg-[#3A2B14] text-amber-100/90 text-xs py-1.5 px-4 hidden md:block border-b border-amber-900/30">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a 
                            href="https://wa.me/6289527217662" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 hover:text-gold transition-colors font-medium"
                        >
                            <ion-icon name="logo-whatsapp" class="text-emerald-400 text-sm"></ion-icon>
                            <span>CP PMB: 0895 2721 7662</span>
                        </a>
                        <span className="flex items-center gap-1.5">
                            <ion-icon name="call" class="text-gold"></ion-icon>
                            <span>0811-135-1044</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ion-icon name="mail" class="text-gold"></ion-icon>
                            <span>info@alwafi.ac.id</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-200/70">
                            <ion-icon name="location" class="text-gold"></ion-icon>
                            <span>Bogor, Jawa Barat</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <span className="text-gold font-semibold">Mencetak Pendidik Islami Profesional</span>
                        <div className="flex items-center gap-2 border-l border-amber-800/60 pl-4">
                            <a href="#" className="hover:text-gold transition-colors"><ion-icon name="logo-facebook"></ion-icon></a>
                            <a href="#" className="hover:text-gold transition-colors"><ion-icon name="logo-instagram"></ion-icon></a>
                            <a href="#" className="hover:text-gold transition-colors"><ion-icon name="logo-youtube"></ion-icon></a>
                        </div>
                    </div>
                </div>
            </div>

            <nav
                className={`relative z-40 w-full transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200/80' 
                        : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-stone-200/60'
                }`}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg group-hover:scale-105 transition-all duration-300">
                                <Image
                                    src="https://alwafi.ac.id/assets/img/stit.png"
                                    alt="Logo STIT Al Wafi"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-base md:text-lg leading-tight text-stone-900 tracking-wide">
                                    STIT AL WAFI
                                </span>
                                <span className="text-[10px] md:text-xs text-gold font-semibold tracking-widest uppercase">
                                    Bogor
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                link.dropdown ? (
                                    <div key={link.name} className="relative group">
                                        <button
                                            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-stone-700 hover:text-gold transition-all duration-200 rounded-lg hover:bg-stone-100/80 relative overflow-hidden"
                                        >
                                            <span className="relative z-10">{link.name}</span>
                                            <ion-icon name="chevron-down" class="text-xs transition-transform duration-300 group-hover:rotate-180 text-stone-500 group-hover:text-gold"></ion-icon>
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                            <div className="p-2">
                                                {link.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 hover:text-gold rounded-xl hover:bg-amber-50/50 transition-all duration-200 group/item font-medium"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover/item:bg-gold group-hover/item:scale-150 transition-all duration-200" />
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="relative px-4 py-2 text-sm font-medium text-stone-700 hover:text-gold transition-all duration-200 rounded-lg hover:bg-stone-100/80 group"
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden lg:block">
                            <Link
                                href="https://siakad.alwafi.ac.id/register"
                                className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-hover text-white font-semibold rounded-full overflow-hidden shadow-md shadow-gold/25 hover:shadow-lg hover:shadow-gold/40 transition-all duration-300 hover:scale-105"
                            >
                                <span className="relative z-10 text-sm font-bold">Daftar Sekarang</span>
                                <ion-icon name="arrow-forward" class="text-sm relative z-10 group-hover:translate-x-1 transition-transform"></ion-icon>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            aria-label="Buka atau tutup menu navigasi"
                            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-stone-800 hover:text-gold transition-colors"
                        >
                            <div className="relative w-6 h-5">
                                <span className={`absolute left-0 top-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2.5 rotate-45' : ''}`} />
                                <span className={`absolute left-0 top-2.5 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                                <span className={`absolute left-0 top-5 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2.5 -rotate-45' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu: berada di luar <nav> karena backdrop-filter pada nav
                membuat elemen fixed terikat pada nav, bukan viewport. */}
            <div
                className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-30 bg-white/98 backdrop-blur-2xl transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
                aria-hidden={!isMenuOpen}
            >
                <div className="h-full overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                link.dropdown ? (
                                    <div key={link.name} className="border-b border-stone-100">
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            aria-expanded={openDropdown === link.name}
                                            className="w-full flex items-center justify-between px-4 py-4 text-stone-800 hover:text-gold font-semibold transition-colors group"
                                        >
                                            <span>{link.name}</span>
                                            <ion-icon 
                                                name="chevron-down" 
                                                class={`text-sm transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180 text-gold' : ''}`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${openDropdown === link.name ? 'max-h-96 mb-4' : 'max-h-0'}`}>
                                            <div className="pl-6 space-y-1">
                                                {link.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        onClick={() => {
                                                            setIsMenuOpen(false);
                                                            setOpenDropdown(null);
                                                        }}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-stone-600 hover:text-gold rounded-xl hover:bg-stone-50 transition-all duration-200 font-medium"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setOpenDropdown(null);
                                        }}
                                        className="block px-4 py-4 text-stone-800 hover:text-gold font-semibold border-b border-stone-100 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Mobile CTA & Contact */}
                        <div className="mt-8 pt-6 border-t border-stone-200 space-y-3">
                            <Link
                                href="https://siakad.alwafi.ac.id/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-2xl overflow-hidden shadow-xl shadow-gold/20"
                            >
                                <span className="relative z-10">Daftar Sekarang</span>
                                <ion-icon name="arrow-forward" class="text-lg relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <a
                                href="https://wa.me/6289527217662"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-md transition-colors text-sm"
                            >
                                <ion-icon name="logo-whatsapp" class="text-lg"></ion-icon>
                                <span>Chat CP PMB: 0895 2721 7662</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

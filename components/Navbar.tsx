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
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ease-out ${
                isScrolled 
                    ? 'bg-black/90 backdrop-blur-2xl shadow-2xl shadow-black/50' 
                    : 'bg-gradient-to-b from-black/80 to-transparent'
            }`}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg group-hover:scale-110 transition-all duration-300">
                            <Image
                                src="https://alwafi.ac.id/assets/img/stit.png"
                                alt="Logo STIT Al Wafi"
                                fill
                                className="object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-base md:text-lg leading-tight text-white tracking-wide">
                                STIT AL WAFI
                            </span>
                            <span className="text-[10px] md:text-xs text-gold/80 font-medium tracking-wider uppercase">
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
                                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-gold transition-all duration-300 rounded-lg hover:bg-white/5 relative overflow-hidden"
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <ion-icon name="chevron-down" class="text-xs transition-transform duration-300 group-hover:rotate-180"></ion-icon>
                                        <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 overflow-hidden">
                                        <div className="p-2">
                                            {link.dropdown.map((subItem, idx) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-gold rounded-xl hover:bg-white/5 transition-all duration-200 group/item"
                                                >
                                                    <div className="w-1 h-1 rounded-full bg-gold/30 group-hover/item:bg-gold group-hover/item:scale-150 transition-all duration-200" />
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
                                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-gold transition-all duration-300 rounded-lg hover:bg-white/5 group overflow-hidden"
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </Link>
                            )
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link
                            href="https://siakad.alwafi.ac.id/register"
                            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold to-gold-hover text-black font-semibold rounded-full overflow-hidden shadow-lg shadow-gold/20 hover:shadow-2xl hover:shadow-gold/40 transition-all duration-300 hover:scale-105"
                        >
                            <span className="relative z-10 text-sm">Daftar Sekarang</span>
                            <ion-icon name="arrow-forward" class="text-sm relative z-10 group-hover:translate-x-1 transition-transform"></ion-icon>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
                    >
                        <div className="relative w-6 h-5">
                            <span className={`absolute left-0 top-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2.5 rotate-45' : ''}`} />
                            <span className={`absolute left-0 top-2.5 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`absolute left-0 top-5 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2.5 -rotate-45' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black/98 backdrop-blur-2xl transition-all duration-500 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div className="h-full overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                        <div className="space-y-1">
                            {navLinks.map((link, idx) => (
                                link.dropdown ? (
                                    <div key={link.name} className="border-b border-white/5">
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className="w-full flex items-center justify-between px-4 py-4 text-white hover:text-gold font-medium transition-colors group"
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            <span>{link.name}</span>
                                            <ion-icon 
                                                name="chevron-down" 
                                                class={`text-sm transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180 text-gold' : ''}`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-500 ${openDropdown === link.name ? 'max-h-96 mb-4' : 'max-h-0'}`}>
                                            <div className="pl-6 space-y-1">
                                                {link.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-gold rounded-xl hover:bg-white/5 transition-all duration-200"
                                                    >
                                                        <div className="w-1 h-1 rounded-full bg-gold/40" />
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
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-4 py-4 text-white hover:text-gold font-medium border-b border-white/5 transition-colors"
                                        style={{ animationDelay: `${idx * 50}ms` }}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Mobile CTA */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <Link
                                href="https://siakad.alwafi.ac.id/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="group relative w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-gold-hover text-black font-bold rounded-2xl overflow-hidden shadow-2xl shadow-gold/30"
                            >
                                <span className="relative z-10">Daftar Sekarang</span>
                                <ion-icon name="arrow-forward" class="text-lg relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
// @ts-nocheck
'use client';

export default function FloatingWhatsApp() {
    return (
        <aside aria-label="Kontak WhatsApp PMB" className="fixed bottom-6 right-6 z-40 flex items-center group">
            {/* Tooltip on hover */}
            <span className="hidden sm:inline-flex items-center gap-1.5 mr-3 px-3.5 py-2 bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Tanya PMB: 0895 2721 7662
            </span>

            {/* Floating Action Button */}
            <a
                href="https://wa.me/6289527217662"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat WhatsApp Penerimaan Mahasiswa Baru"
                className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-emerald-900/25 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30"
            >
                <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
        </aside>
    );
}

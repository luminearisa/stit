// @ts-nocheck
import Link from 'next/link';
import { Metadata } from 'next';
import RepositoryDocuments from '@/components/RepositoryDocuments';

export const metadata: Metadata = {
  title: 'Repository Dokumen | STIT Al Wafi Bogor',
  description: 'Pusat dokumen dan publikasi STIT Al Wafi yang dapat diakses dan diunduh.',
};

export default function RepositoryPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-stone-700">
      {/* Header */}
      <div className="relative pt-36 md:pt-44 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF8F5] border-b border-stone-200 text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-gold transition-colors mb-6 text-xs uppercase tracking-widest font-bold"
          >
            <ion-icon name="arrow-back"></ion-icon>
            Kembali ke Beranda
          </Link>
          <div className="bg-gold/15 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gold/30">
            <ion-icon name="folder-open-outline" class="text-4xl text-gold"></ion-icon>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-3">
            Repository Dokumen
          </h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Pusat dokumen dan publikasi STIT Al Wafi yang dapat diakses dan diunduh.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <RepositoryDocuments />
      </div>
    </main>
  );
}

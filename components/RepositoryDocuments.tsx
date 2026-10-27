// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import { repositoryDocuments } from '@/data/documents';

const PAGE_SIZE = 10;

export default function RepositoryDocuments() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return repositoryDocuments;
    return repositoryDocuments.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.fileName.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const applySearch = (value: string) => {
    setQuery(value);
    setSearchTerm(value);
    setPage(1);
  };

  const handleSearch = () => {
    applySearch(query);
  };

  const handleClear = () => {
    applySearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <ion-icon
            name="search-outline"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => applySearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari dokumen berdasarkan judul atau nama file..."
            aria-label="Cari dokumen"
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-stone-200 bg-white text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSearch}
            className="px-6 py-3 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-gold/30 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
          >
            <ion-icon name="search-outline" class="text-lg"></ion-icon>
            Cari
          </button>
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Hapus pencarian"
              className="px-4 py-3 bg-white text-stone-600 border border-stone-200 font-semibold rounded-2xl hover:border-gold hover:text-gold transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <ion-icon name="close-outline" class="text-lg"></ion-icon>
              Hapus
            </button>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 text-sm text-stone-500">
        {filtered.length > 0 ? (
          <>
            Menampilkan <span className="font-semibold text-stone-700">{startIndex + 1}</span>
            –
            <span className="font-semibold text-stone-700">
              {Math.min(startIndex + PAGE_SIZE, filtered.length)}
            </span>{' '}
            dari <span className="font-semibold text-stone-700">{filtered.length}</span> dokumen
            {searchTerm.trim() && (
              <>
                {' '}untuk pencarian &quot;{searchTerm.trim()}&quot;
              </>
            )}
          </>
        ) : null}
      </div>

      {/* Table / Empty state */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-3xl p-10 md:p-16 text-center shadow-sm">
          <div className="bg-gold/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border border-gold/30">
            <ion-icon name="document-text-outline" class="text-3xl text-gold"></ion-icon>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2">Dokumen tidak ditemukan.</h3>
          <p className="text-stone-500 max-w-md mx-auto">
            Tidak ada dokumen yang sesuai dengan kata kunci &quot;{searchTerm.trim()}&quot;. Coba gunakan kata kunci lain.
          </p>
          {searchTerm.trim() && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-2xl hover:shadow-lg transition-all text-sm uppercase tracking-wider"
            >
              Tampilkan Semua Dokumen
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5EFE6] border-b border-stone-200">
                  <th className="px-4 md:px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-600 w-16">
                    No.
                  </th>
                  <th className="px-4 md:px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-600">
                    Judul Dokumen
                  </th>
                  <th className="px-4 md:px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-600 text-right w-32">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((doc, i) => (
                  <tr
                    key={doc.fileName}
                    className="border-b border-stone-100 hover:bg-[#FBF6EE] transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4 text-sm text-stone-500 font-mono">
                      {startIndex + i + 1}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gold/15 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-gold/30">
                          <ion-icon name="document-text-outline" class="text-lg text-gold"></ion-icon>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm md:text-base font-semibold text-stone-800 leading-snug">
                            {doc.title}
                          </p>
                          <p className="text-xs text-stone-400 truncate mt-0.5">{doc.fileName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      <a
                        href={doc.url}
                        download={doc.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-hover text-white font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all text-xs uppercase tracking-wider shadow-sm"
                      >
                        <ion-icon name="download-outline" class="text-base"></ion-icon>
                        Unduh
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-6 py-4 border-t border-stone-200 bg-[#FAF8F5]">
              <p className="text-xs text-stone-500">
                Halaman {safePage} dari {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:border-gold hover:text-gold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-stone-200 disabled:hover:text-stone-600"
                  aria-label="Halaman sebelumnya"
                >
                  <ion-icon name="chevron-back-outline" class="text-lg"></ion-icon>
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      aria-current={p === safePage ? 'page' : undefined}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                        p === safePage
                          ? 'bg-gradient-to-r from-gold to-gold-hover text-white shadow-md'
                          : 'bg-white border border-stone-200 text-stone-600 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:border-gold hover:text-gold transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-stone-200 disabled:hover:text-stone-600"
                  aria-label="Halaman berikutnya"
                >
                  <ion-icon name="chevron-forward-outline" class="text-lg"></ion-icon>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

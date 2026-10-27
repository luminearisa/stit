export interface RepositoryDocument {
  title: string;
  fileName: string;
  url: string;
}

const source: { title: string; fileName: string }[] = [
  { title: "Monev Pedoman Akademik", fileName: "monev pedoman Akademik.pdf" },
  { title: "MOU dengan UIN", fileName: "MOU Dengan UIN.pdf" },
  { title: "SK Kalender Akademik STIT Wafi Bogor", fileName: "SK Kalender Akademik STIT Wafi Bogor.pdf" },
  { title: "SK Mengajar dan Jadwal Semester Ganjil 2026-2027", fileName: "SK Mengajar dan Jadwal Semester Ganjil 2026-2027.pdf" },
];

export const repositoryDocuments: RepositoryDocument[] = source.map((item) => ({
  ...item,
  url: `/documents/${encodeURIComponent(item.fileName)}`,
}));

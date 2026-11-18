export type RegistrationStatus = 'pending' | 'lunas' | 'terkonfirmasi';

export const statusLabels: Record<RegistrationStatus, string> = {
  pending: 'Menunggu pembayaran',
  lunas: 'Pembayaran diterima',
  terkonfirmasi: 'Terkonfirmasi',
};

export const statusOptions: RegistrationStatus[] = ['pending', 'lunas', 'terkonfirmasi'];

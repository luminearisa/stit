export function getAdminToken(): string {
  return process.env.ADMIN_TOKEN || 'pelita-admin-2026';
}

export function isAdmin(request: Request): boolean {
  return request.headers.get('x-admin-token') === getAdminToken();
}

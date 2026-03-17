const ADMIN_PASSWORD =
  (import.meta as any).env?.VITE_ADMIN_PASSWORD ?? 'portfolio2026';

const SESSION_KEY = 'admin_authenticated';

export function checkAdminPassword(input: string): boolean {
  return input === ADMIN_PASSWORD;
}

export function setAdminSession(): void {
  sessionStorage.setItem(SESSION_KEY, 'true');
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function clearAdminSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

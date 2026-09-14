import { apiUrl } from "./apiUrl";

interface Session {
  success: boolean;
  accessToken: string;
  admin: { id: string; name: string; email: string; role: string };
}

let refreshPromise: Promise<Session> | null = null;
let signedOut = false;
const key = "serendib-signed-out";
export function isSignedOut() {
  try { return signedOut || localStorage.getItem(key) === "true"; } catch { return signedOut; }
}
export function markSignedOut() {
  signedOut = true;
  try { localStorage.setItem(key, "true"); } catch { /* Storage may be unavailable. */ }
}
export function allowSessionRestore() {
  signedOut = false;
  try { localStorage.removeItem(key); } catch { /* Tokens remain in memory only. */ }
}

export function refreshSession(): Promise<Session> {
  if (isSignedOut()) return Promise.reject(new Error("Signed out"));
  if (!refreshPromise) {
    refreshPromise = fetch(apiUrl("/api/auth/refresh"), { method: "POST", credentials: "include" })
      .then(async response => {
        if (!response.ok) throw new Error("Session has expired");
        const session: Session = await response.json();
        if (isSignedOut()) throw new Error("Signed out");
        return session;
      }).finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}

import { store } from "../store/store";
import { clearSession, restoreAdminSession } from "../store/features/authSlice";
import { apiUrl } from "./apiUrl";
import { isSignedOut, markSignedOut } from "./session";

let refreshPromise: Promise<string> | null = null;
export async function authenticatedFetch(path: string, options: RequestInit = {}) {
  const token = store.getState().auth.accessToken;
  const send = (accessToken: string) => {
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    return fetch(apiUrl(path), { ...options, headers, credentials: "include" });
  };
  if (!token || isSignedOut()) throw new Error("Authentication is required");
  let response = await send(token);
  if (response.status === 401) {
    try {
      // A concurrent request may already have replaced the expired access token.
      let currentToken = store.getState().auth.accessToken;
      if (currentToken === token) {
        if (!refreshPromise) {
          refreshPromise = store.dispatch(restoreAdminSession()).unwrap()
            .then(session => session.accessToken)
            .finally(() => { refreshPromise = null; });
        }
        currentToken = await refreshPromise;
      }
      if (!currentToken || isSignedOut()) throw new Error("Session has expired");
      response = await send(currentToken);
      if (response.status !== 401) return response;
    } catch { /* The shared auth gate handles navigation. */ }
    markSignedOut();
    store.dispatch(clearSession());
    throw new Error("Session has expired. Please sign in again.");
  }
  return response;
}

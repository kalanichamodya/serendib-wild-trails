"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { logoutAdmin } from "../store/features/authSlice";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { sessionChecked, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (sessionChecked && !isAuthenticated && pathname !== "/login") router.replace("/login");
  }, [sessionChecked, isAuthenticated, pathname, router]);
  if (!sessionChecked) return <p className="session-status">Checking administrator access...</p>;
  if (pathname === "/login") return children;
  if (!isAuthenticated) return <p className="session-status">Redirecting to sign in...</p>;
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <h2>Serendib</h2><p>Wild Trails Administration</p>
      <nav aria-label="Administration">
        <Link href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined}>Dashboard</Link>
        <Link href="/bookings" aria-current={pathname === "/bookings" ? "page" : undefined}>Bookings</Link>
      </nav>
      <button disabled={loading} onClick={() => { void dispatch(logoutAdmin()); }}>Sign out</button>
    </aside>
    <div className="admin-content">{children}</div>
  </div>;
}

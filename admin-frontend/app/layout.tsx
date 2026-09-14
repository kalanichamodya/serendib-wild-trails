import type { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import AuthGate from "./AuthGate";
import "./globals.css";

export const metadata: Metadata = { title: "Serendib | Administration", robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><StoreProvider><AuthGate>{children}</AuthGate></StoreProvider></body></html>;
}

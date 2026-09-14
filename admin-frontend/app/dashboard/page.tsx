"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { authenticatedFetch } from "../../lib/api";
import styles from "./dashboard.module.css";

type Stats = { total: number; pending: number; confirmed: number; completed: number; cancelled: number };
type Booking = { _id: string; customerName: string; destination: string; travelDate: string; status: string };
export default function Dashboard() {
  const admin = useSelector((state: RootState) => state.auth.admin);
  const [data, setData] = useState<{ stats: Stats; bookings: Booking[] } | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    Promise.all([authenticatedFetch("/api/bookings/stats"), authenticatedFetch("/api/bookings?limit=5")])
      .then(async responses => {
        if (responses.some(response => !response.ok)) throw new Error("Unable to load dashboard");
        const [stats, bookings] = await Promise.all(responses.map(response => response.json()));
        if (active) setData({ stats: stats.stats, bookings: bookings.bookings });
      }).catch(error => { if (active) setError(error instanceof Error ? error.message : "Unable to load dashboard"); });
    return () => { active = false; };
  }, [attempt]);
  return <main className={styles.content}>
    <header className={styles.header}><div><p>SERENDIB ADMINISTRATION</p><h1>Dashboard overview</h1></div></header>
    <section className={styles.welcomeCard}><div><p>WELCOME BACK</p><h2>{admin?.name}</h2><span>Review the latest safari booking requests.</span></div></section>
    {error ? <p role="alert">{error} <button onClick={() => { setError(""); setAttempt(value => value + 1); }}>Try again</button></p> : !data ? <p role="status">Loading dashboard...</p> : <>
      <section className={styles.statistics}>{Object.entries(data.stats).map(([label, count]) => <article key={label} className={styles.statCard}><div><p>{label.charAt(0).toUpperCase() + label.slice(1)} bookings</p><h3>{count}</h3></div></article>)}</section>
      <section className={styles.panel}><div className={styles.panelHeader}><h2>Latest bookings</h2><Link href="/bookings">View all</Link></div>
        {data.bookings.length === 0 ? <p>No bookings yet.</p> : <ul>{data.bookings.map(booking => <li key={booking._id} style={{ padding: "16px 0" }}><strong>{booking.customerName}</strong> — {booking.destination}<br /><span>{new Date(booking.travelDate).toLocaleDateString()} · {booking.status}</span></li>)}</ul>}
      </section>
    </>}
  </main>;
}

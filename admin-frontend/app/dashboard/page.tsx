"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  getBookings,
  getBookingStats,
  type Booking,
  type BookingStats,
} from "../../lib/bookings";
import styles from "./dashboard.module.css";

interface DashboardData {
  stats: BookingStats;
  bookings: Booking[];
}

export default function Dashboard() {
  const admin = useSelector((state: RootState) => state.auth.admin);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([getBookingStats(), getBookings(5)])
      .then(([stats, bookings]) => {
        if (active) setData({ stats, bookings });
      })
      .catch(error => {
        if (active) {
          setError(error instanceof Error ? error.message : "Unable to load dashboard");
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  function retryLoading() {
    setError("");
    setAttempt(value => value + 1);
  }

  return (
    <main className={styles.content}>
      <header className={styles.header}>
        <div>
          <p>SERENDIB ADMINISTRATION</p>
          <h1>Dashboard overview</h1>
        </div>
      </header>

      <section className={styles.welcomeCard}>
        <div>
          <p>WELCOME BACK</p>
          <h2>{admin?.name}</h2>
          <span>Review the latest safari booking requests.</span>
        </div>
      </section>

      {error ? (
        <p role="alert">
          {error} <button onClick={retryLoading}>Try again</button>
        </p>
      ) : !data ? (
        <p role="status">Loading dashboard...</p>
      ) : (
        <>
          <section className={styles.statistics}>
            {Object.entries(data.stats).map(([label, count]) => (
              <article key={label} className={styles.statCard}>
                <div>
                  <p>{label.charAt(0).toUpperCase() + label.slice(1)} bookings</p>
                  <h3>{count}</h3>
                </div>
              </article>
            ))}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2>Latest bookings</h2>
              <Link href="/bookings">View all</Link>
            </div>
            {data.bookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              <ul>
                {data.bookings.map(booking => (
                  <li key={booking._id} style={{ padding: "16px 0" }}>
                    <strong>{booking.customerName}</strong> &mdash; {booking.destination}
                    <br />
                    <span>
                      {new Date(booking.travelDate).toLocaleDateString()} &middot; {booking.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}

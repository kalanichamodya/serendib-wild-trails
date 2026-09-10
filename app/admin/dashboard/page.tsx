"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";

import {
  logoutAdmin,
  restoreAdminSession,
} from "../../../store/features/authSlice";

import styles from "./dashboard.module.css";

const menuItems = [
  {
    icon: "▦",
    label: "Dashboard",
    href: "/admin/dashboard",
    active: true,
  },
  {
    icon: "▣",
    label: "Bookings",
    href: "/admin/bookings",
  },
  {
    icon: "♙",
    label: "Safari Packages",
    href: "#",
  },
  {
    icon: "⌖",
    label: "Destinations",
    href: "#",
  },
  {
    icon: "✉",
    label: "Enquiries",
    href: "#",
  },
  {
    icon: "▤",
    label: "Website Content",
    href: "#",
  },
  {
    icon: "⚙",
    label: "Settings",
    href: "#",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
  admin,
  accessToken,
  isAuthenticated,
  loading,
  sessionChecked,
} = useSelector((state: RootState) => state.auth);

const [bookingStats, setBookingStats] = useState({
  total: 0,
  pending: 0,
  confirmed: 0,
  completed: 0,
  cancelled: 0,
});

  useEffect(() => {
  if (sessionChecked && !isAuthenticated) {
    router.replace("/admin/login");
  }
}, [sessionChecked, isAuthenticated, router]);

useEffect(() => {
  if (!sessionChecked || !isAuthenticated || !accessToken) {
    return;
  }

  const loadBookingStats = async () => {
    try {
      let currentToken = accessToken;

      let response = await fetch(
        "http://localhost:5000/api/bookings/stats",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 401) {
        const refreshResult = await dispatch(restoreAdminSession());

        if (restoreAdminSession.fulfilled.match(refreshResult)) {
          currentToken = refreshResult.payload.accessToken;

          response = await fetch(
            "http://localhost:5000/api/bookings/stats",
            {
              headers: {
                Authorization: `Bearer ${currentToken}`,
              },
              credentials: "include",
            }
          );
        }
      }

      if (!response.ok) {
        throw new Error("Unable to load booking statistics");
      }

      const data = await response.json();
      setBookingStats(data.stats);
    } catch (error) {
      console.error("Dashboard statistics error:", error);
    }
  };

  loadBookingStats();
}, [
  sessionChecked,
  isAuthenticated,
  accessToken,
  dispatch,
]);

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    router.replace("/admin/login");
  };
 
    if (!sessionChecked || !isAuthenticated) {
  return (
    <main className={styles.loadingPage}>
      <p>Checking administrator access...</p>
    </main>
  );
}
   
  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Image
            src="/images/safari-logo-transparent.png"
            alt="Safari Travel elephant logo"
            width={664}
            height={683}
            sizes="64px"
            className={styles.logo}
          />


          <div>
            <h2>Serendib</h2>
            <p>Wild Trails</p>
          </div>
        </div>

        <nav className={styles.navigation}>
          <p className={styles.menuTitle}>ADMIN MENU</p>

          {menuItems.map((item) => (
  <Link
    key={item.label}
    href={item.href}
    className={`${styles.menuItem} ${
      item.active ? styles.activeMenu : ""
    }`}
  >
    <span>{item.icon}</span>
    {item.label}
  </Link>
))}
        </nav>

        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          disabled={loading}
        >
          ↪ {loading ? "Signing out..." : "Sign out"}
        </button>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <p className={styles.date}>SERENDIB ADMINISTRATION</p>
            <h1>Dashboard overview</h1>
          </div>

          <div className={styles.profile}>
            <div className={styles.avatar}>
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div>
              <strong>{admin?.name || "Administrator"}</strong>
              <span>{admin?.email}</span>
            </div>
          </div>
        </header>

        <section className={styles.welcomeCard}>
          <div>
            <p>WELCOME BACK</p>
            <h2>{admin?.name || "Administrator"}</h2>
            <span>
              Here is what is happening with Serendib Wild Trails today.
            </span>
          </div>

          <Image
            src="/images/safari-logo-transparent.png"
            alt="Safari Travel elephant logo"
            width={664}
            height={683}
            sizes="90px"
            className={styles.elephant}
          />
        </section>

        <section className={styles.statistics}>
          <article className={styles.statCard}>
            <div className={styles.statIcon}>▣</div>
            <div>
              <p>Total Bookings</p>
                  <h3>{bookingStats.total}</h3>
                  <span>All safari bookings</span>
            </div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statIcon}>⌛</div>
            <div>
              <p>Pending Requests</p>
                  <h3>{bookingStats.pending}</h3>
                  <span>Waiting for confirmation</span>
            </div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statIcon}>✉</div>
            <div>
              <p>New Enquiries</p>
              <h3>0</h3>
              <span>Customer enquiries</span>
            </div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statIcon}>♙</div>
            <div>
              <p>Safari Packages</p>
              <h3>0</h3>
              <span>Active packages</span>
            </div>
          </article>
        </section>

        <section className={styles.bottomGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p>RECENT ACTIVITY</p>
                <h3>Latest bookings</h3>
              </div>

              <button>View all</button>
            </div>

            <div className={styles.emptyState}>
              <span>▣</span>
              <h4>No bookings yet</h4>
              <p>New safari bookings will appear here.</p>
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p>QUICK ACCESS</p>
                <h3>Management</h3>
              </div>
            </div>

            <div className={styles.quickActions}>
              <button>＋ Add safari package</button>
              <button>⌖ Manage destinations</button>
              <button>✉ View enquiries</button>
              <button>▤ Update website content</button>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}

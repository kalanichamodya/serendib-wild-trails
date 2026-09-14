"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import { authenticatedFetch } from "../../lib/api";
import styles from "./bookings.module.css";

interface Booking {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  experience: string;
  destination: string;
  travelDate: string;
  guestCount: number;
  message?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

const statusOptions: Booking["status"][] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export default function AdminBookingsPage() {
  const router = useRouter();


  const {
    accessToken,
    isAuthenticated,
    sessionChecked,
  } = useSelector((state: RootState) => state.auth);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionChecked && !isAuthenticated) {
      router.replace("/login");
    }
  }, [sessionChecked, isAuthenticated, router]);

  useEffect(() => {
    if (!sessionChecked || !isAuthenticated || !accessToken) {
      return;
    }

    const loadBookings = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await authenticatedFetch(
          "/api/bookings"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load bookings"
          );
        }

        setBookings(data.bookings);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [
    sessionChecked,
    isAuthenticated,
    accessToken,
  ]);

  const filteredBookings = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;

      const matchesSearch =
        !searchValue ||
        booking.customerName.toLowerCase().includes(searchValue) ||
        booking.email.toLowerCase().includes(searchValue) ||
        booking.phone.toLowerCase().includes(searchValue) ||
        booking.destination.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const updateStatus = async (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    setActionId(bookingId);
    setError("");

    try {
      const response = await authenticatedFetch(
        `/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking status update failed"
        );
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === bookingId ? data.booking : booking
        )
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Booking status update failed"
      );
    } finally {
      setActionId(null);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!shouldDelete) {
      return;
    }

    setActionId(bookingId);
    setError("");

    try {
      const response = await authenticatedFetch(
        `/api/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking deletion failed"
        );
      }

      setBookings((currentBookings) =>
        currentBookings.filter(
          (booking) => booking._id !== bookingId
        )
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Booking deletion failed"
      );
    } finally {
      setActionId(null);
    }
  };

  if (!sessionChecked || !isAuthenticated) {
    return (
      <main className={styles.loadingPage}>
        Checking administrator access...
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p>SERENDIB ADMINISTRATION</p>
          <h1>Booking Management</h1>
          <span>
            Review and manage customer safari bookings.
          </span>
        </div>

        <Link
          href="/dashboard"
          className={styles.backButton}
        >
          ← Dashboard
        </Link>
      </header>

      <section className={styles.toolbar}>
        <input
          aria-label="Search bookings"
          type="search"
          placeholder="Search name, email, phone or destination"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className={styles.resultCount}>
          {filteredBookings.length} booking(s)
        </div>
      </section>

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <section className={styles.tableCard}>
        {loading ? (
          <div className={styles.emptyState}>
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className={styles.emptyState}>
            No bookings were found.
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Experience</th>
                  <th>Travel date</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <strong>{booking.customerName}</strong>
                      <span>{booking.email}</span>
                      <span>{booking.phone}</span>
                    </td>

                    <td>
                      <strong>{booking.experience}</strong>
                      <span>{booking.destination}</span>
                    </td>

                    <td>
                      {new Date(
                        booking.travelDate
                      ).toLocaleDateString()}
                    </td>

                    <td>{booking.guestCount}</td>

                    <td>
                      <select
                        className={`${styles.statusSelect} ${
                          styles[booking.status]
                        }`}
                        aria-label={`Status for ${booking.customerName}`}
                        value={booking.status}
                        disabled={actionId === booking._id}
                        onChange={(event) =>
                          updateStatus(
                            booking._id,
                            event.target
                              .value as Booking["status"]
                          )
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() +
                              status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        disabled={actionId === booking._id}
                        onClick={() =>
                          deleteBooking(booking._id)
                        }
                      >
                        {actionId === booking._id
                          ? "Processing..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
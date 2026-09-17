"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import {
  bookingStatuses,
  getBookings,
  updateBookingStatus,
  deleteBooking as removeBooking,
  type Booking,
} from "../../lib/bookings";
import styles from "./bookings.module.css";

export default function AdminBookingsPage() {
  const {
    accessToken,
    isAuthenticated,
    sessionChecked,
  } = useSelector((state: RootState) => state.auth);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearch] = useState("");
  const [selectedStatus, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [processingBookingId, setActionId] = useState<string | null>(null);
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    if (!sessionChecked || !isAuthenticated || !accessToken) {
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      setError("");

      try {
        setBookings(await getBookings());
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [
    sessionChecked,
    isAuthenticated,
    accessToken,
  ]);

  const filteredBookings = useMemo(() => {
    const searchValue = selectedStatus.toLowerCase().trim();

    return bookings.filter((booking) => {
      const matchesStatus =
        selectedStatus === "all" ||
        booking.status === selectedStatus;

      const matchesSearch =
        !searchValue ||
        booking.customerName.toLowerCase().includes(searchValue) ||
        booking.email.toLowerCase().includes(searchValue) ||
        booking.phone.toLowerCase().includes(searchValue) ||
        booking.destination.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, searchQuery, selectedStatus]);

  const handleStatusChange = async (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    setActionId(bookingId);
    setError("");

    try {
      const updatedBooking = await updateBookingStatus(bookingId, newStatus);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === bookingId ? updatedBooking : booking
        )
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Booking status update failed"
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    const isDeleteConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!isDeleteConfirmed) {
      return;
    }

    setActionId(bookingId);
    setError("");

    try {
      await removeBooking(bookingId);

      setBookings((currentBookings) =>
        currentBookings.filter(
          (booking) => booking._id !== bookingId
        )
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
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
          value={searchQuery}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          aria-label="Filter by status"
          value={selectedStatus}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="all">All statuses</option>
          {bookingStatuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <div className={styles.resultCount}>
          {filteredBookings.length} booking(s)
        </div>
      </section>

      {errorMessage && (
        <div className={styles.error} role="alert">
          {errorMessage}
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
                        disabled={processingBookingId === booking._id}
                        onChange={(event) =>
                          handleStatusChange(
                            booking._id,
                            event.target
                              .value as Booking["status"]
                          )
                        }
                      >
                        {bookingStatuses.map((status) => (
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
                        disabled={processingBookingId === booking._id}
                        onClick={() =>
                          handleDeleteBooking(booking._id)
                        }
                      >
                        {processingBookingId === booking._id
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

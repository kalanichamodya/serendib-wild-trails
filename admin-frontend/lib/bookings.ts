import { authenticatedFetch } from "./api";

export const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export interface Booking {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  experience: string;
  destination: string;
  travelDate: string;
  guestCount: number;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export type BookingStats = Record<BookingStatus | "total", number>;

async function bookingRequest<T>(path: string, fallbackMessage: string, options?: RequestInit): Promise<T> {
  const response = await authenticatedFetch(`/api/bookings${path}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }
  return data;
}

export async function getBookings(limit?: number): Promise<Booking[]> {
  const query = limit === undefined ? "" : `?limit=${limit}`;
  const data = await bookingRequest<{ bookings: Booking[] }>(query, "Unable to load bookings");
  return data.bookings;
}

export async function getBookingStats(): Promise<BookingStats> {
  const data = await bookingRequest<{ stats: BookingStats }>("/stats", "Unable to load dashboard");
  return data.stats;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const data = await bookingRequest<{ booking: Booking }>(`/${id}/status`, "Booking status update failed", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return data.booking;
}

export async function deleteBooking(id: string): Promise<void> {
  await bookingRequest(`/${id}`, "Booking deletion failed", { method: "DELETE" });
}

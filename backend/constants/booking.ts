export const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export const experiences = ["Jeep Safari", "Village Tour", "Cultural Tour"];
export const destinations = [
  "Minneriya National Park",
  "Kaudulla National Park",
  "Hurulu Eco Park",
  "Gal Oya National Park",
  "Habarana",
  "Sigiriya",
  "Dambulla",
  "Polonnaruwa",
  "Ritigala",
];

export function isBookingStatus(value: unknown): value is BookingStatus {
  return bookingStatuses.some(status => status === value);
}

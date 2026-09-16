import messages = require("../utils/messages");
import type { RequestHandler } from "express";
import { destinations, experiences } from "../constants/booking";

export interface BookingInput {
  customerName: string;
  email: string;
  phone: string;
  experience: string;
  destination: string;
  travelDate: string;
  guestCount: number;
  message: string;
}

type BookingValidation =
  | { value: BookingInput; error?: never }
  | { error: string; value?: never };

const todayInSriLanka = () => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Colombo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

function validateBooking(body: unknown): BookingValidation {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: messages.validation.bookingRequired };
  }

  const input = body as Record<string, unknown>;
  const result: BookingInput = {
    customerName: "",
    email: "",
    phone: "",
    experience: "",
    destination: "",
    travelDate: "",
    guestCount: 0,
    message: "",
  };
  for (const field of ["customerName", "email", "phone", "experience", "destination", "travelDate"] as const) {
    const value = input[field];
    if (typeof value !== "string" || !value.trim()) {
      return { error: messages.validation.textRequired(field) };
    }
    result[field] = value.trim();
  }
  if (result.customerName.length > 120) {
    return { error: messages.validation.nameTooLong };
  }
  if (result.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) {
    return { error: messages.validation.invalidEmail };
  }
  result.email = result.email.toLowerCase();
  const digits = result.phone.replace(/\D/g, "");
  const validPhone = result.phone.length <= 40 &&
    /^\+?[\d\s()-]+$/.test(result.phone) && digits.length >= 9 && digits.length <= 15;
  if (!validPhone) {
    return { error: messages.validation.invalidPhone };
  }
  if (!experiences.includes(result.experience)) {
    return { error: messages.validation.invalidExperience };
  }
  if (!destinations.includes(result.destination)) {
    return { error: messages.validation.invalidDestination };
  }
  if (
    typeof input.guestCount !== "number" ||
    !Number.isInteger(input.guestCount) ||
    input.guestCount < 1 || input.guestCount > 30
  ) {
    return { error: messages.validation.invalidGuestCount };
  }
  result.guestCount = input.guestCount;
  const date = new Date(result.travelDate);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(result.travelDate) ||
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== result.travelDate ||
    result.travelDate < todayInSriLanka()
  ) {
    return { error: messages.validation.futureTravelDate };
  }
  if (input.message !== undefined && (typeof input.message !== "string" || input.message.length > 1000)) {
    return { error: messages.validation.invalidMessage };
  }
  result.message = (input.message ?? "").trim();
  return { value: result };
}

const bookingValidator: RequestHandler = (req, res, next) => {
  const { value, error } = validateBooking(req.body);
  if (error) return res.status(400).json({ success: false, message: error });
  req.body = value;
  next();
};
export { bookingValidator, validateBooking, destinations, experiences };

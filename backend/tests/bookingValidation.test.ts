import assert from "node:assert/strict";
import { test } from "node:test";
import Booking = require("../models/Booking");
import { bookingStatuses, isBookingStatus } from "../constants/booking";
import { validateBooking } from "../validators/bookingValidator";

const validBooking = {
  customerName: " Test Customer ",
  email: "CUSTOMER@example.com",
  phone: "+94771234567",
  experience: "Jeep Safari",
  destination: "Minneriya National Park",
  travelDate: "2099-01-01",
  guestCount: 2,
};

test("booking validation normalizes input and discards untrusted extra fields", () => {
  const result = validateBooking({ ...validBooking, status: "confirmed" });
  assert.ok(result.value);
  assert.equal(result.value.customerName, "Test Customer");
  assert.equal(result.value.email, "customer@example.com");
  assert.equal(result.value.message, "");
  assert.equal("status" in result.value, false);
});

test("invalid booking data is rejected before the controller runs", () => {
  for (const body of [
    null,
    [],
    {},
    { ...validBooking, guestCount: "2" },
    { ...validBooking, guestCount: 31 },
    { ...validBooking, travelDate: "2099-02-30" },
    { ...validBooking, destination: "unknown" },
    { ...validBooking, message: 123 },
  ]) {
    assert.equal(typeof validateBooking(body).error, "string");
  }
});

test("all supported statuses pass model validation and unknown statuses fail", async () => {
  for (const status of bookingStatuses) {
    assert.equal(isBookingStatus(status), true);
    await new Booking({ ...validBooking, status }).validate();
  }
  assert.equal(isBookingStatus("unknown"), false);
  assert.equal(isBookingStatus(["pending"]), false);
  await assert.rejects(new Booking({ ...validBooking, status: "unknown" }).validate());
});

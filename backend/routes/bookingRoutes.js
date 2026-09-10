const express = require("express");

const {
  createBooking,
  getAllBookings,
  getBookingStats,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

// Public route – customer can submit a booking
router.post("/", createBooking);

// Protected admin routes
router.get("/", protectAdmin, getAllBookings);
router.get("/stats", protectAdmin, getBookingStats);
router.get("/:id", protectAdmin, getBookingById);
router.patch("/:id/status", protectAdmin, updateBookingStatus);
router.delete("/:id", protectAdmin, deleteBooking);

module.exports = router;
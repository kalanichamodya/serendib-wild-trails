import express from "express";

import {
  createBooking,
  getAllBookings,
  getBookingStats,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController";

import protectAdmin = require("../middleware/authMiddleware");
import { bookingLimiter } from "../middleware/rateLimits";
import { bookingValidator } from "../validators/bookingValidator";

const router = express.Router();

// Public route – customer can submit a booking
router.post("/", bookingLimiter, bookingValidator, createBooking);

// Protected admin routes
router.get("/", protectAdmin, getAllBookings);
router.get("/stats", protectAdmin, getBookingStats);
router.get("/:id", protectAdmin, getBookingById);
router.patch("/:id/status", protectAdmin, updateBookingStatus);
router.delete("/:id", protectAdmin, deleteBooking);

export = router;

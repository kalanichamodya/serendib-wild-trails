import messages = require("../utils/messages");
import mongoose from "mongoose";
import type { RequestHandler } from "express";
import Booking = require("../models/Booking");
import { isBookingStatus } from "../constants/booking";
import type { BookingInput } from "../validators/bookingValidator";
const escapeRegex = (value: string) => value.slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// POST /api/bookings
// Public customer booking creation
const createBooking: RequestHandler<Record<string, never>, unknown, BookingInput> = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      experience,
      destination,
      travelDate,
      guestCount,
      message,
    } = req.body || {};

    const booking = await Booking.create({
      customerName,
      email,
      phone,
      experience,
      destination,
      travelDate: new Date(travelDate),
      guestCount,
      message,
    });

    return res.status(201).json({
      success: true,
      message: messages.booking.created,
      booking,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationMessage = Object.values(error.errors)
        .map((item) => item.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message: validationMessage,
      });
    }

    console.error("Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: messages.booking.createError,
    });
  }
};

// GET /api/bookings
// Protected admin booking list
const getAllBookings: RequestHandler = async (req, res) => {
  try {
    const { status, search, limit } = req.query;

    const invalidStatus = status !== undefined && status !== "all" && !isBookingStatus(status);
    const invalidSearch = search !== undefined && typeof search !== "string";
    const invalidLimit = limit !== undefined && (
      typeof limit !== "string" || !/^\d+$/.test(limit) || Number(limit) < 1 || Number(limit) > 100
    );

    if (invalidStatus || invalidSearch || invalidLimit) {
      return res.status(400).json({ success: false, message: messages.booking.invalidFilters });
    }

    const filter: mongoose.QueryFilter<mongoose.InferSchemaType<typeof Booking.schema>> = {};

    if (isBookingStatus(status)) {
      filter.status = status;
    }

    if (search) {
      const safeSearch = escapeRegex(search);
      filter.$or = [
        { customerName: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } },
        { phone: { $regex: safeSearch, $options: "i" } },
        { destination: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const query = Booking.find(filter).sort({ createdAt: -1 });
    if (limit) query.limit(Number(limit));
    const bookings = await query;

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    return res.status(500).json({
      success: false,
      message: messages.booking.listError,
    });
  }
};

// GET /api/bookings/stats
// Protected dashboard statistics
const getBookingStats: RequestHandler = async (req, res) => {
  try {
    const [total, pending, confirmed, completed, cancelled] =
      await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: "pending" }),
        Booking.countDocuments({ status: "confirmed" }),
        Booking.countDocuments({ status: "completed" }),
        Booking.countDocuments({ status: "cancelled" }),
      ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        confirmed,
        completed,
        cancelled,
      },
    });
  } catch (error) {
    console.error("Booking stats error:", error);

    return res.status(500).json({
      success: false,
      message: messages.booking.statsError,
    });
  }
};

// GET /api/bookings/:id
// Protected admin single booking
const getBookingById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: messages.booking.invalidId,
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: messages.booking.notFound,
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: messages.booking.getError,
    });
  }
};

// PATCH /api/bookings/:id/status
// Protected admin status update
const updateBookingStatus: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { status } = req.body || {};

    if (!isBookingStatus(status)) {
      return res.status(400).json({
        success: false,
        message: messages.booking.invalidStatus,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: messages.booking.invalidId,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: messages.booking.notFound,
      });
    }

    return res.status(200).json({
      success: true,
      message: messages.booking.updated,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: messages.booking.updateError,
    });
  }
};

// DELETE /api/bookings/:id
// Protected admin booking deletion
const deleteBooking: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: messages.booking.invalidId,
      });
    }

    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: messages.booking.notFound,
      });
    }

    return res.status(200).json({
      success: true,
      message: messages.booking.deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: messages.booking.deleteError,
    });
  }
};

export {
  createBooking,
  getAllBookings,
  getBookingStats,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};

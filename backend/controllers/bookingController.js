const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const escapeRegex = value => value.slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// POST /api/bookings
// Public customer booking creation
const createBooking = async (req, res) => {
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

    if (
      !customerName ||
      !email ||
      !phone ||
      !experience ||
      !destination ||
      !travelDate ||
      !guestCount
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details",
      });
    }

    const selectedDate = new Date(travelDate);

    if (Number.isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid travel date",
      });
    }

    const booking = await Booking.create({
      customerName,
      email,
      phone,
      experience,
      destination,
      travelDate: selectedDate,
      guestCount,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Booking request submitted successfully",
      booking,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
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
      message: "Server error while creating booking",
    });
  }
};

// GET /api/bookings
// Protected admin booking list
const getAllBookings = async (req, res) => {
  try {
    const { status, search, limit } = req.query;

    if ((status !== undefined && (typeof status !== "string" || !["all", "pending", "confirmed", "completed", "cancelled"].includes(status))) || (search !== undefined && typeof search !== "string") || (limit !== undefined && (typeof limit !== "string" || !/^\d+$/.test(limit) || Number(limit) < 1 || Number(limit) > 100))) {
      return res.status(400).json({ success: false, message: "Invalid booking filters" });
    }

    const filter = {};

    if (status && status !== "all") {
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
      message: "Server error while retrieving bookings",
    });
  }
};

// GET /api/bookings/stats
// Protected dashboard statistics
const getBookingStats = async (req, res) => {
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
      message: "Server error while retrieving booking statistics",
    });
  }
};

// GET /api/bookings/:id
// Protected admin single booking
const getBookingById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking was not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while retrieving booking",
    });
  }
};

// PATCH /api/bookings/:id/status
// Protected admin status update
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body || {};

    const validStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
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
        message: "Booking was not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating booking status",
    });
  }
};

// DELETE /api/bookings/:id
// Protected admin booking deletion
const deleteBooking = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking was not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting booking",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingStats,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};

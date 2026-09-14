const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    experience: {
      type: String,
      required: [true, "Experience is required"],
      enum: ["Jeep Safari", "Village Tour", "Cultural Tour"],
    },

    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },

    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },

    guestCount: {
      type: Number,
      required: [true, "Guest count is required"],
      min: [1, "At least one guest is required"],
      max: [30, "No more than 30 guests are allowed"],
      validate: { validator: Number.isInteger, message: "Guest count must be an integer" },
    },

    message: {
      type: String,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ email: 1 });
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

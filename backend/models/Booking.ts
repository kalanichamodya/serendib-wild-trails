import messages = require("../utils/messages");
import mongoose from "mongoose";
import { bookingStatuses, experiences } from "../constants/booking";

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, messages.validation.customerNameRequired],
      trim: true,
    },

    email: {
      type: String,
      required: [true, messages.validation.emailRequired],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, messages.validation.phoneRequired],
      trim: true,
    },

    experience: {
      type: String,
      required: [true, messages.validation.experienceRequired],
      enum: experiences,
    },

    destination: {
      type: String,
      required: [true, messages.validation.destinationRequired],
      trim: true,
    },

    travelDate: {
      type: Date,
      required: [true, messages.validation.travelDateRequired],
    },

    guestCount: {
      type: Number,
      required: [true, messages.validation.guestCountRequired],
      min: [1, messages.validation.guestsMinimum],
      max: [30, messages.validation.guestsMaximum],
      validate: { validator: Number.isInteger, message: messages.validation.guestsInteger },
    },

    message: {
      type: String,
      trim: true,
      maxlength: [1000, messages.validation.messageTooLong],
    },

    status: {
      type: String,
      enum: bookingStatuses,
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

export = Booking;

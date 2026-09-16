import { Router } from "express";
import authRoutes = require("./authRoutes");
import bookingRoutes = require("./bookingRoutes");
import messages = require("../utils/messages");

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: messages.server.healthy,
  });
});

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);

export = router;

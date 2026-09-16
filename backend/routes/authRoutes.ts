import messages = require("../utils/messages");
import express from "express";
import {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/authController";

import protectAdmin = require("../middleware/authMiddleware");
import { loginLimiter } from "../middleware/rateLimits";

const router = express.Router();

router.post("/login", loginLimiter, loginAdmin);

router.all("/login", (req, res) => {
  res.set("Allow", "POST").status(405).json({
    success: false,
    message:
      messages.auth.loginMethod,
  });
});

router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutAdmin);

// Protected admin route
router.get("/me", protectAdmin, getCurrentAdmin);

export = router;

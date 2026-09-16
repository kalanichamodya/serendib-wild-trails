import messages = require("../utils/messages");
import express from "express";
import {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/authController";

import requireAdminAuth = require("../middleware/authMiddleware");
import { limitLoginAttempts } from "../middleware/rateLimits";

const authRouter = express.Router();

authRouter.post("/login", limitLoginAttempts, loginAdmin);

authRouter.all("/login", (_req, res) => {
  res.set("Allow", "POST").status(405).json({
    success: false,
    message:
      messages.auth.loginMethod,
  });
});

authRouter.post("/refresh", refreshAccessToken);
authRouter.post("/logout", logoutAdmin);

// Protected admin route
authRouter.get("/me", requireAdminAuth, getCurrentAdmin);

export = authRouter;

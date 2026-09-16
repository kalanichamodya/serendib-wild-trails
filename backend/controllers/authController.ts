import messages = require("../utils/messages");
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import type { RequestHandler, CookieOptions } from "express";
import Admin = require("../models/Admin");

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";

const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};

// POST /api/auth/login
const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password || email.length > 254 || password.length > 1024) {
      return res.status(400).json({
        success: false,
        message: messages.auth.credentialsRequired,
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password +refreshTokenHash");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: messages.auth.invalidCredentials,
      });
    }

    const passwordMatches = await admin.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: messages.auth.invalidCredentials,
      });
    }

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    admin.refreshTokenHash = hashToken(refreshToken);
    await admin.save();

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      success: true,
      message: messages.auth.loginSuccess,
      accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: messages.auth.loginError,
    });
  }
};

// POST /api/auth/refresh
const refreshAccessToken: RequestHandler = async (req, res) => {
  try {
    const currentRefreshToken = req.cookies.refreshToken;

    if (!currentRefreshToken) {
      return res.status(401).json({
        success: false,
        message: messages.auth.refreshMissing,
      });
    }

    const decoded = jwt.verify(
      currentRefreshToken,
      process.env.JWT_REFRESH_SECRET!
    );

    if (typeof decoded === "string" || typeof decoded.adminId !== "string") {
      throw new Error(messages.auth.refreshPayloadInvalid);
    }

    const admin = await Admin.findById(decoded.adminId).select(
      "+refreshTokenHash"
    );

    if (
      !admin ||
      !admin.refreshTokenHash ||
      admin.refreshTokenHash !== hashToken(currentRefreshToken)
    ) {
      res.clearCookie("refreshToken", {
        ...refreshCookieOptions,
        maxAge: undefined,
      });

      return res.status(401).json({
        success: false,
        message: messages.auth.refreshInvalid,
      });
    }

    // Refresh token rotation
    const newAccessToken = generateAccessToken(admin);
    const newRefreshToken = generateRefreshToken(admin);

    admin.refreshTokenHash = hashToken(newRefreshToken);
    await admin.save();

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    return res.status(200).json({
  success: true,
  accessToken: newAccessToken,
  admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  },
});

  } catch (error) {
    res.clearCookie("refreshToken", {
      ...refreshCookieOptions,
      maxAge: undefined,
    });

    return res.status(401).json({
      success: false,
      message: messages.auth.refreshExpired,
    });
  }
};

// POST /api/auth/logout
const logoutAdmin: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET!
        );

        if (typeof decoded === "string" || typeof decoded.adminId !== "string") {
          throw new Error(messages.auth.refreshPayloadInvalid);
        }

        const admin = await Admin.findById(decoded.adminId).select(
          "+refreshTokenHash"
        );

        if (
          admin &&
          admin.refreshTokenHash === hashToken(refreshToken)
        ) {
          admin.refreshTokenHash = null;
          await admin.save();
        }
      } catch {
        // Invalid token එකක් වුණත් cookie එක clear කරනවා
      }
    }

    res.clearCookie("refreshToken", {
      ...refreshCookieOptions,
      maxAge: undefined,
    });

    return res.status(200).json({
      success: true,
      message: messages.auth.logoutSuccess,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: messages.auth.logoutError,
    });
  }
};



// GET /api/auth/me
const getCurrentAdmin: RequestHandler = async (req, res) => {
  const admin = req.admin!;
  return res.status(200).json({
    success: true,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

export {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
};

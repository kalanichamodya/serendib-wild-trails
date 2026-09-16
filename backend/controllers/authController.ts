import type { RequestHandler } from "express";
import Admin = require("../models/Admin");
import messages = require("../utils/messages");
import {
  clearRefreshCookie,
  createAdminSession,
  findRefreshTokenAdmin,
  hashToken,
  publicAdmin,
} from "../utils/adminSession";

export const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const validCredentials =
      typeof email === "string" &&
      typeof password === "string" &&
      email.trim().length > 0 &&
      password.length > 0 &&
      email.length <= 254 &&
      password.length <= 1024;

    if (!validCredentials) {
      return res.status(400).json({
        success: false,
        message: messages.auth.credentialsRequired,
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password +refreshTokenHash");

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: messages.auth.invalidCredentials,
      });
    }

    const session = await createAdminSession(admin, res);
    return res.status(200).json({
      success: true,
      message: messages.auth.loginSuccess,
      ...session,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: messages.auth.loginError,
    });
  }
};

export const refreshAccessToken: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: messages.auth.refreshMissing,
      });
    }

    const admin = await findRefreshTokenAdmin(refreshToken);
    if (!admin || !admin.refreshTokenHash || admin.refreshTokenHash !== hashToken(refreshToken)) {
      clearRefreshCookie(res);
      return res.status(401).json({
        success: false,
        message: messages.auth.refreshInvalid,
      });
    }

    const session = await createAdminSession(admin, res);
    return res.status(200).json({ success: true, ...session });
  } catch {
    clearRefreshCookie(res);
    return res.status(401).json({
      success: false,
      message: messages.auth.refreshExpired,
    });
  }
};

export const logoutAdmin: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      try {
        const admin = await findRefreshTokenAdmin(refreshToken);
        if (admin && admin.refreshTokenHash === hashToken(refreshToken)) {
          admin.refreshTokenHash = null;
          await admin.save();
        }
      } catch {
        // Clear the browser cookie even when its token is invalid or expired.
      }
    }

    clearRefreshCookie(res);
    return res.status(200).json({
      success: true,
      message: messages.auth.logoutSuccess,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: messages.auth.logoutError,
    });
  }
};

export const getCurrentAdmin: RequestHandler = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: publicAdmin(req.admin!),
  });
};

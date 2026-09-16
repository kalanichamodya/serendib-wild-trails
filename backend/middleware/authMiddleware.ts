import messages = require("../utils/messages");
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import Admin = require("../models/Admin");

const requireAdminAuth: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
               message: messages.auth.accessMissing,
      });
    }

    const token = authHeader.split(" ")[1];

    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    );

    if (typeof tokenPayload === "string" || tokenPayload.role !== "admin") {
      return res.status(403).json({
        success: false,
               message: messages.auth.adminRequired,
      });
    }

    if (typeof tokenPayload.adminId !== "string")
       throw new Error(messages.auth.accessPayloadInvalid);
    const admin = await Admin.findById(tokenPayload.adminId);

    if (!admin) {
      return res.status(401).json({
        success: false,
               message: messages.auth.adminNotFound,
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: messages.auth.accessExpired,
      });
    }

    return res.status(401).json({
      success: false,
      message: messages.auth.accessInvalid,
    });
  }
};

export = requireAdminAuth;

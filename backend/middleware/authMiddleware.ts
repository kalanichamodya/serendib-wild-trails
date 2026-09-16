import messages = require("../utils/messages");
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import Admin = require("../models/Admin");

const protectAdmin: RequestHandler = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (
      !authorizationHeader ||
      !authorizationHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
               message: messages.auth.accessMissing,
      });
    }

    const accessToken = authorizationHeader.split(" ")[1];

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!
    );

    if (typeof decoded === "string" || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
               message: messages.auth.adminRequired,
      });
    }

    if (typeof decoded.adminId !== "string") throw new Error(messages.auth.accessPayloadInvalid);
    const admin = await Admin.findById(decoded.adminId);

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

export = protectAdmin;

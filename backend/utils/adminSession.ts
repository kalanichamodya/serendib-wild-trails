import { createHash } from "node:crypto";
import jwt from "jsonwebtoken";
import type { CookieOptions, Request, Response } from "express";
import Admin = require("../models/Admin");
import messages = require("./messages");
import { generateAccessToken, generateRefreshToken } from "./generateTokens";

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function publicAdmin(admin: NonNullable<Request["admin"]>) {
  return { id: admin._id, name: admin.name, email: admin.email, role: admin.role };
}

export function clearRefreshCookie(response: Response): void {
  response.clearCookie("refreshToken", { ...refreshCookieOptions, maxAge: undefined });
}

export async function findRefreshTokenAdmin(token: string) {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
  if (typeof payload === "string" || typeof payload.adminId !== "string") {
    throw new Error(messages.auth.refreshPayloadInvalid);
  }
  return Admin.findById(payload.adminId).select("+refreshTokenHash");
}

export async function createAdminSession(admin: InstanceType<typeof Admin>, response: Response) {
  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  admin.refreshTokenHash = hashToken(refreshToken);
  await admin.save();
  response.cookie("refreshToken", refreshToken, refreshCookieOptions);

  return { accessToken, admin: publicAdmin(admin) };
}

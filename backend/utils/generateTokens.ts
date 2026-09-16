import jwt, { type SignOptions } from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import type { Types } from "mongoose";

interface TokenAdmin {
  _id: Types.ObjectId;
  role: string;
}

const generateAccessToken = (admin: TokenAdmin): string => {
  return jwt.sign(
    {
      adminId: admin._id.toString(),
      role: admin.role,
    },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || "15m") as SignOptions["expiresIn"],
    }
  );
};

const generateRefreshToken = (admin: TokenAdmin): string => {
  return jwt.sign(
    {
      adminId: admin._id.toString(),
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
      jwtid: randomUUID(),
    }
  );
};

export {
  generateAccessToken,
  generateRefreshToken,
};

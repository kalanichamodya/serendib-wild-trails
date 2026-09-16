import type { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      admin?: {
        _id: Types.ObjectId;
        name: string;
        email: string;
        role: string;
      };
    }
  }
}

export {};

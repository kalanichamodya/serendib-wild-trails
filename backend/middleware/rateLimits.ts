import messages = require("../utils/messages");
import { rateLimit, type Options } from "express-rate-limit";
const options: Partial<Options> = { windowMs: 15 * 60 * 1000, standardHeaders: "draft-8", legacyHeaders: false, message: { success: false, message: messages.server.rateLimited } };
export const limitLoginAttempts = rateLimit({ ...options, limit: 5 });
export const bookingLimiter = rateLimit({ ...options, limit: 8 });

const { rateLimit } = require("express-rate-limit");
const options = { windowMs: 15 * 60 * 1000, standardHeaders: "draft-8", legacyHeaders: false, message: { success: false, message: "Too many requests. Please try again in 15 minutes." } };
module.exports = {
  loginLimiter: rateLimit({ ...options, limit: 5 }),
  bookingLimiter: rateLimit({ ...options, limit: 8 }),
};

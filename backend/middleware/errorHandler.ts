import messages = require("../utils/messages");
import type { Request, Response, NextFunction } from "express";

// Express identifies error handlers by their four arguments.
function errorHandler(error: Error & { status?: number }, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(error);
  const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
  if (status === 500) console.error("API error:", error.message);
  res.status(status).json({ success: false, message: status === 413 ? messages.server.bodyTooLarge : status === 400 ? messages.server.invalidBody : messages.server.internalError });
}
export = errorHandler;

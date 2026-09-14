// Express identifies error handlers by their four arguments.
function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = error.status === 413 ? 413 : error.status === 400 ? 400 : 500;
  if (status === 500) console.error("API error:", error.message);
  res.status(status).json({ success: false, message: status === 413 ? "Request body is too large" : status === 400 ? "Invalid request body" : "Internal server error" });
}
module.exports = errorHandler;

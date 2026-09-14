const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const validateEnv = require("./config/env");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Allow requests from the Next.js frontend
app.use(
  cors({
    origin: (process.env.FRONTEND_URLS || "http://localhost:3000,http://localhost:3001").split(",").map(origin => origin.trim()).filter(Boolean),
    credentials: true,
  })
);


// Read JSON request bodies
app.use(helmet());
app.use(express.json({ limit: "16kb" }));


// Read cookies such as the refresh token
app.use(cookieParser());


// Test route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Serendib Admin API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const startServer = async () => {
  validateEnv();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
};

app.use(errorHandler);

if (require.main === module) {
  startServer().catch(error => {
    console.error(`Startup failed: ${error.message}`);
    process.exit(1);
  });
}
module.exports = app;

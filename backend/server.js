const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Allow requests from the Next.js frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);


// Read JSON request bodies
app.use(express.json());


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

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
};

startServer();

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import messages = require("./utils/messages");
import validateEnv = require("./config/env");
import errorHandler = require("./middleware/errorHandler");
import connectDB = require("./config/db");
import apiRoutes = require("./routes");

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


app.use("/api", apiRoutes);

// Handle unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: messages.server.notFound,
  });
});

const startServer = async (): Promise<void> => {
  validateEnv();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
};

app.use(errorHandler);

if (require.main === module) {
  startServer().catch((error: unknown) => {
    console.error(`Startup failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
}
export = app;

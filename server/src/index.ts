import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "@/routes/auth.routes";
import salonRoutes from "@/routes/salon.routes";
import { errorHandler } from "@/middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/salons", salonRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import sampleRoutes from "./routes/sampleRoutes.js";

// Initialize app
const app = express();

// Use Shared Variables / Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Please add it in Railway Shared Variables.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // for JSON including images
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/samples", sampleRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Health check route
app.get("/", (req, res) => res.send("🚀 MEROBase backend is running"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

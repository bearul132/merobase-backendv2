import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import sampleRoutes from "./routes/sampleRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set. Please add it in Railway Shared Variables.");
  process.exit(1);
}

// ✅ CORS setup for your deployed frontend on Vercel
app.use(
  cors({
    origin: [
      "https://merobase-frontendv2.vercel.app", // your live frontend
      "http://localhost:5173", // for local dev testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use("/api/samples", sampleRoutes);

// ✅ Simple health check
app.get("/", (req, res) => res.send("🚀 MEROBase backend is running"));

// ✅ MongoDB connection
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

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

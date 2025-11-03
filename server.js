import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import sampleRoutes from "./routes/sampleRoutes.js";

const app = express();

const allowedOrigins = [
  "https://merobase-frontendv2.vercel.app",
  "http://localhost:5173"
];

// ✅ Use dynamic origin handling
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ❌ REMOVE this line — it interferes with Railway preflight handling
// app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/samples", sampleRoutes);

app.get("/", (req, res) => res.send("🚀 MEROBase backend is running"));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

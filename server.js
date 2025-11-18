import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import sampleRoutes from "./routes/sampleRoutes.js";

const app = express();

// ✅ CORS setup – allow your deployed frontend + localhost
const allowedOrigins = [
  "https://merobase-frontendv2.vercel.app", // your Vercel app
  "http://localhost:5173" // local development
];

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

// ✅ Body parser (with size limit for image uploads)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ API routes
app.use("/api/samples", sampleRoutes);

// ✅ Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 MEROBase backend is running on Railway!");
});

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;

// Use environment variable first (Railway), fallback to direct URI (local dev)
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://merouser:Mero2020@merobase.yholk94.mongodb.net/merobase?retryWrites=true&w=majority&appName=merobase";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // wait longer to find Mongo server
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Start the server
app.listen(PORT, () =>
  console.log(`🚀 MEROBase backend running on port ${PORT}`)
);

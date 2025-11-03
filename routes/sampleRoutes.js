import express from "express";
import Sample from "../models/Sample.js";

const router = express.Router();

// Get all samples
router.get("/", async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    console.error("❌ Error fetching samples:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add new sample
router.post("/", async (req, res) => {
  try {
    const newSample = new Sample(req.body);
    await newSample.save();
    console.log("✅ New sample added:", newSample.sampleID);
    res.status(201).json(newSample);
  } catch (err) {
    console.error("❌ Error adding sample:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update sample by sampleID
router.put("/:sampleID", async (req, res) => {
  try {
    const updated = await Sample.findOneAndUpdate(
      { sampleID: req.params.sampleID },
      req.body,
      { new: true }
    );
    if (!updated) {
      console.warn(`⚠️ Sample with ID ${req.params.sampleID} not found`);
      return res.status(404).json({ message: "Sample not found" });
    }
    console.log("✅ Sample updated:", updated.sampleID);
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating sample:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Delete sample by sampleID
router.delete("/:sampleID", async (req, res) => {
  try {
    const deleted = await Sample.findOneAndDelete({ sampleID: req.params.sampleID });
    if (!deleted) {
      console.warn(`⚠️ Sample with ID ${req.params.sampleID} not found`);
      return res.status(404).json({ message: "Sample not found" });
    }
    console.log("🗑 Sample deleted:", deleted.sampleID);
    res.json({ message: "Sample deleted" });
  } catch (err) {
    console.error("❌ Error deleting sample:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// 🧹 Delete ALL samples
router.delete("/", async (req, res) => {
  try {
    await Sample.deleteMany({});
    console.log("🧹 All samples deleted successfully");
    res.status(200).json({ message: "All samples deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting all samples:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;

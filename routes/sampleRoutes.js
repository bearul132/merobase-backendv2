import express from "express";
import Sample from "../models/Sample.js";

const router = express.Router();

// Get all samples
router.get("/", async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new sample
router.post("/", async (req, res) => {
  try {
    const newSample = new Sample(req.body);
    await newSample.save();
    res.status(201).json(newSample);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update sample by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete sample by ID
router.delete("/:id", async (req, res) => {
  try {
    await Sample.findByIdAndDelete(req.params.id);
    res.json({ message: "Sample deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

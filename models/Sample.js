import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  sampleID: String,
  sampleName: String,
  collectionDate: String,
  species: String,
  genus: String,
  family: String,
  kingdom: String,
  projectType: String,
  projectNumber: Number,
  sampleNumber: Number,
  latitude: Number,
  longitude: Number,
  samplePhoto: String,
  semPhoto: String,
  isolatedPhoto: String,
  lastUpdated: String,
});

export default mongoose.model("Sample", sampleSchema);

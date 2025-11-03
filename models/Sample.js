import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  sampleID: String,
  sampleName: String,
  species: String,
  genus: String,
  family: String,
  kingdom: String,
  projectType: String,
  collectorName: String,
  collectionDate: Date,
  latitude: String,
  longitude: String,
  samplePhoto: String,
  semPhoto: String,
  isolatedPhoto: String,
  lastEdited: Date,
});

const Sample = mongoose.model("Sample", sampleSchema);
export default Sample; // ✅ default export

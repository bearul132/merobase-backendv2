import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  sampleID: { type: String, unique: true, required: true }, // unique ID for each sample
  sampleType: {
    type: String,
    enum: ["Biological", "Non-Biological"],
    default: "Biological",
  },
  sampleName: { type: String },
  species: { type: String, required: true },
  genus: { type: String },
  family: { type: String },
  kingdom: { type: String, required: true },
  projectType: { type: String, required: true },
  collectorName: { type: String, required: true },
  collectionDate: { type: Date, required: true },
  latitude: { type: Number, required: true }, // changed from String to Number
  longitude: { type: Number, required: true }, // changed from String to Number
  samplePhoto: { type: String },
  semPhoto: { type: String },
  isolatedPhoto: { type: String },
  lastEdited: { type: Date, default: Date.now }, // automatically set when document is created
  // Optional GeoJSON field for future geospatial queries
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
});

// Middleware to automatically set GeoJSON location whenever latitude/longitude are provided
sampleSchema.pre("save", function (next) {
  if (this.latitude && this.longitude) {
    this.location = {
      type: "Point",
      coordinates: [this.longitude, this.latitude],
    };
  }
  next();
});

const Sample = mongoose.model("Sample", sampleSchema);
export default Sample;

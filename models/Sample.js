import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  sampleID: { type: String, unique: true, required: true },

  // Existing BASIC sample data
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

  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },

  // MAIN sample photo
  samplePhoto: { type: String },

  // NEW FIELD — where the sample is stored
  storageLocation: {
    type: String,
    enum: [
      "Cool Room",
      "Freezer -20°C",
      "Deep Freezer -80°C",
      "SEM Room",
      "Gram Staining Boxes",
    ],
    default: "Cool Room",
  },

  // NEW SECTION — Morphology Documentation
  morphology: {
    semPhotos: [{ type: String }],            // array of URLs
    microscopePhotos: [{ type: String }],     // array of URLs
  },

  // NEW SECTION — Microbiology Documentation
  microbiology: {
    petriDishPhotos: [{ type: String }],
    isolatedDescription: { type: String },
    isolatedProfile: { type: String },
    gramStainingPhoto: { type: String },
  },

  // NEW SECTION — Molecular Documentation
  molecular: {
    phyloTreePhoto: { type: String },
    phyloTreeDescription: { type: String },
  },

  // System fields
  lastEdited: { type: Date, default: Date.now },

  // GEOJSON location (kept from your version)
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
});

// Auto-update GeoJSON when lat/lng provided
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

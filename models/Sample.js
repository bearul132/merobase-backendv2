import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  sampleID: { type: String, unique: true, required: true },

  // BASIC sample metadata
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

  // STORAGE LOCATION
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

  // ------------------------
  //   🔬 Morphology Section
  // ------------------------
  morphology: {
    semPhotos: [{ type: String }],          // array of URLs
    microscopePhotos: [{ type: String }],   // array of URLs
  },

  // ------------------------
  //   🦠 Microbiology Section
  // ------------------------
  microbiology: {
    petriDishPhotos: [{ type: String }],
    gramStainingPhoto: { type: String },

    isolatedDescription: {
      colonyShape: String,
      margin: String,
      elevation: String,
      color: String,
      texture: String,
      microscopicShape: String,
      arrangement: String,
    },

    isolatedProfile: {
      gramReaction: String,
      motility: String,
      oxygenRequirement: String,
      halotolerance: String,
      temperaturePreference: String,
      growthMedia: String,
      biochemicalTests: {
        catalase: Boolean,
        oxidase: Boolean,
        urease: Boolean,
        indole: Boolean,
        citrate: Boolean,
        methylRed: Boolean,
        vogesProskauer: Boolean,
        coagulase: Boolean,
        gelatinase: Boolean,
      },
    },
  },

  // ------------------------
  //   🧬 Molecular Section
  // ------------------------
  molecular: {
    geneMarker: String,
    primerSet: String,
    pcrConditions: String,
    sequencingPlatform: String,
    gelElectrophoresisPhoto: String,
    phyloTreePhoto: String,
    phyloTreeDescription: String,
    sequenceFiles: [{ type: String }], // fasta/genbank URLs
  },

  // SYSTEM FIELDS
  lastEdited: { type: Date, default: Date.now },

  // GEOJSON LOCATION
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
});

// Auto-set GeoJSON from lat/lng
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

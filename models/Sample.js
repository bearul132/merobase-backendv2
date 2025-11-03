const sampleSchema = new mongoose.Schema({
  sampleID: String,
  sampleName: String,
  collectionDate: Date,
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
  lastEdited: { type: Date, default: Date.now }, // ✅ Add this
});

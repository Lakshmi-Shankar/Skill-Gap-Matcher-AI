const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_id: { type: Number, required: true, unique: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  company_name: { type: String },
  company_logo: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  job_type: { type: String },
  publication_date: { type: Date },
  candidate_required_location: { type: String },
  salary: { type: String },
  description: { type: String },           // HTML description
  plain_description: { type: String },     // extracted text
  created_at: { type: Date, default: Date.now }
});

jobSchema.index({ title: "text", plain_description: "text", tags: "text" });

module.exports = mongoose.model("Job", jobSchema);

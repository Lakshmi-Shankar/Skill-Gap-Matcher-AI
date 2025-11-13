const express = require("express");
const axios = require("axios");
const { htmlToText } = require("html-to-text");
const Job = require("../models/jobs");

const API_URL = "https://remotive.com/api/remote-jobs?category=software-dev";
const router = express.Router();
const API_JOBS = process.env.API_JOBS;
router.get("/tech", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.apijobs.dev/v1/job/search",
      { q: "developer" }, // request body
      {
        headers: {
          "apikey": API_JOBS,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ data: response.data , size: response.data.length });
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/fetch-and-store", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const jobs = response.data.jobs;

const formattedJobs = jobs
  .filter(job => job.id != null) // skip any job without an ID
  .map(job => ({
    job_id: job.id,
    url: job.url,
    title: job.title,
    company_name: job.company_name,
    company_logo: job.company_logo,
    category: job.category,
    tags: job.tags || [],
    job_type: job.job_type,
    publication_date: new Date(job.publication_date),
    candidate_required_location: job.candidate_required_location,
    salary: job.salary,
    description: job.description,
    plain_description: htmlToText(job.description || "", { wordwrap: false }),
  }));


    const bulkOps = formattedJobs.map(job => ({
      updateOne: {
        filter: { job_id: job.job_id },
        update: { $set: job },
        upsert: true
      }
    }));

    const result = await Job.bulkWrite(bulkOps);
    res.json({ message: "Jobs stored successfully", inserted: result.nUpserted, modified: result.nModified });
  } catch (error) {
    console.error("Error storing jobs:", error.message);
    res.status(500).json({ error: error.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    const jobs = req.body; // array of job objects
    const result = await Job.insertMany(jobs, { ordered: false });
    res.status(200).json({ message: "Jobs stored", count: result.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

module.exports = router;

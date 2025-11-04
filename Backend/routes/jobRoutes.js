const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_JOBS = process.env.API_JOBS || "ea185626816e202722f0f3bd819991610a2d086b39d8afc2d630b9a21b5be300";

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

module.exports = router;

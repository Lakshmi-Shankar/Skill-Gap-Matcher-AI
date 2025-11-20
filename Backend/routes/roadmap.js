const express = require("express");
const axios = require("axios");
const router = express.Router();

const ROADMAP_KEY = process.env.ROADMAP_KEY;

// Define your roadmap routes here
router.post("/generate", async (req, res) => {
    const { role, skills } = req.body;

    // Placeholder logic for generating a roadmap
    try{
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ROADMAP_KEY}`,
            "HTTP-Referer": "skillgapmatcherai.netlify.app", // Optional. Site URL for rankings on openrouter.ai.
            "X-Title": "Skill Gap Matcher AI", // Optional. Site title for rankings on openrouter.ai.
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "tngtech/deepseek-r1t2-chimera:free",
            "messages": [
                {
                    "role": "system",
                    "content": 
                    "Generate a precise, structured learning roadmap to become a top-tier " + role + ". Use the user's current skills: " + skills + ". Return a JSON object with exactly two fields: \"Steps\" (an ordered list of clear, actionable learning stages) and \"Links\" (an array of recommended resources, each containing an object with the structure { topic: string, url: string })."
                }
            ]

        })
    });

    const data = await response.json();
    res.json({content: data.choices[0].message.content});
    } catch(err) {
        res.json({
            "error": err.message
        })
    }

});


module.exports = router;
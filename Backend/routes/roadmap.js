const express = require("express");
const router = express.Router();

const ROADMAP_KEY = process.env.ROADMAP_KEY;

// POST /api/roadmap/generate
router.post("/generate", async (req, res) => {
  const { role, skills } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ROADMAP_KEY}`,
        "HTTP-Referer": "skillgapmatcherai.netlify.app",
        "X-Title": "Skill Gap Matcher AI",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tngtech/deepseek-r1t2-chimera:free",
        messages: [
          {
            role: "system",
            content: `Generate a list of learning resources to become a top-tier ${role}.
Use the user's current skills: ${skills}.
Respond **only with valid JSON**, an array of objects like:
[
  { "topic": "string", "url": "string" }
]
Do not include any other text, explanation, or markdown.`
          }
        ],
      }),
    });

    const data = await response.json();
    const raw = data.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("AI returned invalid JSON:", raw);
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    // Send clean JSON array to frontend
    res.json({ links: parsed });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

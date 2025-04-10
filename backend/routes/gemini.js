const express = require("express");
const router = express.Router();
const { generateFromGemini } = require("../config/geminiService");

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const text = await generateFromGemini(prompt);
    res.json({ response: text });
  } catch (err) {
    res.status(500).json({ error: "Gemini generation failed" });
  }
});

module.exports = router;

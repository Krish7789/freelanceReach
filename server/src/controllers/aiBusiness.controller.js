const axios = require("axios");

const findBusinessesWithEmailAI = async (req, res) => {
  try {
    const { category, location } = req.body;

    if (!category || !location) {
      return res
        .status(400)
        .json({ message: "Category and location required" });
    }

    const prompt = `
You are a business intelligence system.

TASK:
Find real businesses based on:
Category: ${category}
Location: ${location}

STRICT RULES:
- ONLY include businesses that have a PUBLIC EMAIL
- DO NOT guess or fabricate emails
- Skip businesses if email is uncertain
- Do NOT include explanations or markdown

OUTPUT FORMAT (JSON ARRAY ONLY):
[
  {
    "businessName": "",
    "category": "",
    "website": "",
    "email": ""
  }
]
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({
        message: "Empty AI response",
      });
    }

    // 🔥 CLEAN MARKDOWN FROM GEMINI RESPONSE
    const cleanedText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let businesses;

    try {
      businesses = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("❌ JSON Parse Failed");
      console.error(cleanedText);

      return res.status(500).json({
        message: "AI response was not valid JSON",
      });
    }

    // ✅ FINAL SAFETY CHECK
    if (!Array.isArray(businesses)) {
      return res.status(500).json({
        message: "AI response is not an array",
      });
    }

    res.json({
      source: "ai",
      count: businesses.length,
      businesses,
    });
  } catch (err) {
    console.error("❌ AI Business Search Error:", err);
    res.status(500).json({
      message: "AI business search failed",
    });
  }
};

module.exports = {
  findBusinessesWithEmailAI,
};

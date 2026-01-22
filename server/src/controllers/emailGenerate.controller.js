const axios = require("axios");

const generateEmail = async (req, res) => {
  try {
    const { business, profile, intent } = req.body;

    if (!business || !profile) {
      return res.status(400).json({ message: "Missing data" });
    }

    const prompt = `
You are a professional business outreach assistant.

Write a personalized cold email for the following purpose:
${intent}

SENDER PROFILE:
Name: ${profile.name}
Role: ${profile.role}
Skills: ${profile.skills}

BUSINESS DETAILS:
Business Name: ${business.name}
Category: ${business.category}
Website: ${business.website}

IMPORTANT RULES:
- Professional, friendly tone
- Not salesy
- No buzzwords
- Soft call-to-action
- Concise

OUTPUT FORMAT (JSON ONLY):
{
  "subject": "",
  "body": ""
}
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

    let text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Clean markdown
    text = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(text);

    res.json({
      subject: parsed.subject,
      body: parsed.body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email generation failed" });
  }
};

module.exports = { generateEmail };

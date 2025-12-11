const axios = require("axios");

async function generateContent(prompt) {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;

  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err.message);
    throw new Error("Failed to generate AI content");
  }
}

module.exports = generateContent;

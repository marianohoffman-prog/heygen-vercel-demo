// api/token.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const key = process.env.HEYGEN_API_KEY;
    if (!key) {
      return res.status(500).json({ error: "HEYGEN_API_KEY is missing" });
    }

    const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text(); // read raw body for debugging
    console.log("🔍 Raw HeyGen response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    res.status(response.status).json(data);
  } catch (e) {
    console.error("❌ Fetch error:", e);
    res.status(500).json({ error: e.message });
  }
}

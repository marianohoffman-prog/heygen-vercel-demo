// api/token.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "x-api-key": process.env.HEYGEN_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("✅ HeyGen API raw response:", data);

    if (!data?.data?.token) {
      console.warn("⚠️ No token returned from HeyGen!");
      return res.status(400).json(data);
    }

    res.status(200).json(data);
  } catch (e) {
    console.error("❌ Fetch error:", e);
    res.status(500).json({ error: e.message });
  }
}

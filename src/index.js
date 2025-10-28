import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// POST route for /api/token
app.post("/api/token", async (req, res) => {
  try {
    const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "x-api-key": process.env.HEYGEN_API_KEY,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("✅ HeyGen API Response:", data);

    if (!data || !data.data || !data.data.token) {
      return res.status(400).json({ error: "Token fetch failed", details: data });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Important: Export app (don’t call app.listen)
export default app;

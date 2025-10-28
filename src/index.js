import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

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
    console.log("✅ HeyGen response:", data);
    res.json(data);
  } catch (error) {
    console.error("❌ Token fetch failed:", error);
    res.status(500).json({ error: "Token fetch failed" });
  }
});

// ✅ Export for Vercel (no app.listen)
export default app;

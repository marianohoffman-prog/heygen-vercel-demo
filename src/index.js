import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Load environment variables (like your HEYGEN_API_KEY)
dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Helper to get the directory name (required in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🎯 API endpoint: get token from HeyGen
app.post("/api/token", async (req, res) => {
  try {
    const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
      method: "POST",
      headers: {
        "x-api-key": process.env.HEYGEN_API_KEY,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("❌ Token fetch failed:", error);
    res.status(500).json({ error: "Token fetch failed" });
  }
});

// Serve your avatar test page (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start the server (only locally — Vercel uses serverless by default)
app.listen(3000, () => console.log("✅ Server running on port 3000"));

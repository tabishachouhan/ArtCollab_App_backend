import express from "express";
import cors from "cors";
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./config/supabaseClient.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5678;

app.use(cors({
  origin: "https://art-collab-app-rv3h-gmgs5u3ah-tabishachouhan001-1903s-projects.vercel.app/", // deployed frontend
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ArtCollab Backend Running 🚀" });
});

app.get("/supabase-test", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    res.json({ data, error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/list-models", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to list models" });
  }
});

app.post("/api/ai-chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ answer: "Prompt is required" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Gemini API Error:", data);
      return res.status(500).json({ answer: "Gemini API Error", error: data });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not respond.";

    res.json({ answer: text });

  } catch (error) {
    console.error("GEMINI ERROR:", error);
    res.status(500).json({ answer: "AI failed to respond." });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
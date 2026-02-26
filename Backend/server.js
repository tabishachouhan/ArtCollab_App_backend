import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { supabase } from "./config/supabaseClient.js";


import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "ArtCollab Backend Running 🚀" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5678;

app.get("/supabase-test", async (req, res) => {
  const { data, error } = await supabase.auth.admin.listUsers();
  res.json({ data, error });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
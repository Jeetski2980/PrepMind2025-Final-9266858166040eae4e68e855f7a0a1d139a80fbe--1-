// server/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleGenerateQuestions } from "./routes/questions.js";
import { handleChat } from "./routes/chat.js";

export function createServer() {
  const app = express();

  // Parse JSON bodies
  app.use(express.json());

  // CORS: lock to domains in CORS_ORIGIN (comma-separated)
  const allowed = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin) return cb(null, true); // allow curl/mobile apps
        const ok = allowed.length === 0 ? true : allowed.includes(origin);
        cb(ok ? null : new Error("Not allowed by CORS"), ok);
      },
      credentials: true,
    })
  );

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "PrepMind API is running" });
  });

  // API routes
  app.post("/api/generate-questions", handleGenerateQuestions);
  app.post("/api/chat", handleChat);

  return app;
}

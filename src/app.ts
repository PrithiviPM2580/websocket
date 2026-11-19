import express, { type Application } from "express";

const app: Application = express();

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

export default app;

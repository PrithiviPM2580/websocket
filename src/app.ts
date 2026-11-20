import express, { type Application } from "express";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

export default app;

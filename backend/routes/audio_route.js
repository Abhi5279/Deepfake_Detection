import express from "express";
import multer from "multer";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/audio/" });

const predict_audio = path.resolve("python_files/predict_audio.py");

router.post("/predict-audio", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }

  const audioPath = path.resolve(req.file.path);

  exec(`python "${predict_audio}" "${audioPath}"`, (err, stdout, stderr) => {
    fs.unlinkSync(audioPath); // delete uploaded file after prediction

    if (err) {
      console.error("❌ Prediction error:", stderr);
      console.log("📥 File received:", req.file);
      console.log("Resolved path:", audioPath);
      console.error("❌ Exec error:", err);
      console.error("❌ Stderr:", stderr);
      console.log("✅ Python stdout:", stdout);
      return res.status(500).json({
        error: "Prediction failed",
        error1: err
      });
    }

    const [labelRaw, confidenceRaw] = stdout.trim().split("|");
    const label = parseInt(labelRaw.trim(), 10);
    const confidence = parseFloat(confidenceRaw.trim());

    let predictionText;
    if (label === 1) predictionText = "Fake Audio Detected";
    else if (label === 0) predictionText = "Real Audio Detected";
    else predictionText = "Unknown result";

    res.json({ prediction: predictionText, confidence });
  });
});

export default router;

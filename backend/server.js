import express from "express";
import cors from "cors";
import imageRoutes from "./routes/image_route.js";
import videoRoutes from "./routes/video_route.js";
import audioRoutes from "./routes/audio_route.js";
import multer from "multer";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();

const upload = multer({ dest: "uploads/" });
const app = express();
app.use(cors());

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY );


app.post("/api/analyze", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read file buffer
    const fileData = fs.readFileSync(filePath);

    // Create base64 image string
    const base64Image = fileData.toString("base64");

    // Gemini API endpoint (image model)
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent";

    const prompt = `
You are an AI authenticity checker. Analyze the uploaded image and determine if it looks AI-generated or real. 
Return your response strictly in JSON format like:
{
  "prediction": "real" or "fake",
  "confidence": "0-100%",
  "explanation": "short reasoning"
}
`;

    const body = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: req.file.mimetype,
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    const resp = await fetch(`${url}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    // Parse and return Gemini output
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ raw: data, parsed: text });
    fs.unlinkSync(filePath); // cleanup
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});




app.use("/", imageRoutes);
app.use("/", videoRoutes);
app.use("/", audioRoutes);

app.listen(4000, () => {
  console.log("🚀 Node backend running on port 4000");
});

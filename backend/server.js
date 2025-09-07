import express from "express";
import cors from "cors";
import imageRoutes from "./routes/image_route.js";
import videoRoutes from "./routes/video_route.js";
import audioRoutes from "./routes/audio_route.js";

const app = express();
app.use(cors());

app.use("/", imageRoutes);
app.use("/", videoRoutes);
app.use("/", audioRoutes);

app.listen(4000, () => {
  console.log("🚀 Node backend running on port 4000");
});

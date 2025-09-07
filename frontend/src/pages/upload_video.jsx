import { useState } from "react";
import axios from "axios";

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setVideoPreview(URL.createObjectURL(selectedFile));
    } else {
      setVideoPreview(null);
    }
    setPrediction("");
    setConfidence("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video first.");
      return;
    }
    setLoading(true);

    let formData = new FormData();
    formData.append("video", file); // Make sure your multer field name is "video"

    try {
      const res = await axios.post(
        "http://localhost:4000/predict-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPrediction(res.data.prediction);
      setConfidence((res.data.confidence * 100).toFixed(2) + "%");
    } catch (err) {
      console.error(err);
      alert("Error uploading video.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-900 via-indigo-900 to-pink-900 p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-white font-sans">
        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide drop-shadow-lg">
          Deepfake Video Detector
        </h1>

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300
                     file:mr-4 file:py-3 file:px-5
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-600 file:text-white
                     hover:file:bg-indigo-700
                     cursor-pointer mb-6"
        />

        {videoPreview && (
          <div className="mb-6 flex justify-center">
            <video
              src={videoPreview}
              controls
              className="max-h-64 rounded-xl shadow-lg border-4 border-indigo-600"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-bold text-lg
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700
            transition duration-300
            ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {prediction && (
          <div
            className={`mt-10 text-center text-2xl font-semibold tracking-wide`}>
            <p>
              Prediction:{" "}
              <span className="underline decoration-2 decoration-indigo-400">
                {prediction}
              </span>
            </p>
            <p className="mt-2 text-xl text-gray-300">
              Confidence: {confidence}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadVideo;

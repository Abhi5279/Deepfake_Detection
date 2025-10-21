import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UploadAudio() {
  const [file, setFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) setAudioPreview(URL.createObjectURL(selectedFile));
    else setAudioPreview(null);

    setPrediction("");
    setConfidence(0);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file first.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const res = await axios.post("http://localhost:4000/predict-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(res.data.prediction);
      setConfidence(res.data.confidence * 100);
    } catch (err) {
      console.error(err);
      alert("Error uploading audio.");
    }

    setLoading(false);
  };

  // Chart data
  const chartData = {
    labels: ["Fake", "Real"],
    datasets: [
      {
        label: "Confidence %",
        data:
          prediction === "Fake"
            ? [confidence, 100 - confidence]
            : [100 - confidence, confidence],
        backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)"],
        borderColor: ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.8)"],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white", font: { size: 14 } } },
      title: {
        display: true,
        text: "Prediction Confidence",
        color: "white",
        font: { size: 18, weight: "bold" },
      },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "white", font: { size: 12 } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "white", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="font-roboto min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-xl text-white font-sans">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center tracking-wide">
          Deepfake Audio Detector
        </h1>

        {/* File Input */}
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300
                     file:mr-4 file:py-3 file:px-5
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-white file:bg-opacity-10 file:text-white
                     hover:file:bg-opacity-20 cursor-pointer mb-6 transition-all"
        />

        {/* Audio Preview */}
        {audioPreview && (
          <div className="mb-6 flex justify-center">
            <audio
              src={audioPreview}
              controls
              className="w-full rounded-xl shadow-lg border border-white border-opacity-20"
            />
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-bold text-lg
            bg-white bg-opacity-10 border border-white border-opacity-20
            backdrop-blur-md hover:bg-opacity-20 transition-all duration-300
            ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {/* Prediction Output */}
        {prediction && (
          <div className="mt-10 text-center">
            <p className="text-2xl font-semibold tracking-wide mb-4">
              Prediction:{" "}
              <span className="underline decoration-white decoration-2">
                {prediction}
              </span>
            </p>
            <p className="text-xl text-gray-300 mb-6">
              Confidence: {confidence.toFixed(2)}%
            </p>

            {/* Confidence Chart */}
            <div className="bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-10 p-4 rounded-xl">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadAudio;

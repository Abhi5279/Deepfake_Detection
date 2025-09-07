import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-900 via-indigo-900 to-pink-900 p-10 text-white font-sans">
      <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg mb-12 text-center">
        🎭 Deepfake Detection Portal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Image Prediction */}
        <Link
          to="/upload-image"
          className="bg-gradient-to-br from-pink-500 to-purple-700 rounded-2xl p-10 text-center text-2xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
        >
          🖼️ Predict Image
        </Link>

        {/* Video Prediction */}
        <Link
          to="/upload-video"
          className="bg-gradient-to-br from-indigo-500 to-purple-800 rounded-2xl p-10 text-center text-2xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
        >
          🎥 Predict Video
        </Link>

        {/* Audio Prediction */}
        <Link
          to="/upload-audio"
          className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl p-10 text-center text-2xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
        >
          🎤 Predict Audio
        </Link>
      </div>
    </div>
  );
};

export default Home;

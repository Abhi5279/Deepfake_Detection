import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="bg-black min-h-screen text-white font-roboto">
     
      {/* Hero Section */}
      <Hero />

      {/* Upload Section */}
      <section
        id="services"
        className="py-24 px-6 flex flex-col items-center justify-center"
      >
        {/* <h2 className="text-4xl font-bold mb-12 text-center text-gray-100">
          Choose a Detection Type
        </h2> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full"> */}
          {/* Image Detection */}
          {/* <Link
            to="/upload-image"
            className="bg-neutral-900 border border-gray-700 rounded-xl p-10 text-center text-2xl font-medium hover:bg-white hover:text-black transition-all duration-300 shadow-md"
          >
            🖼️ Predict Image
          </Link> */}

          {/* Video Detection */}
          {/* <Link
            to="/upload-video"
            className="bg-neutral-900 border border-gray-700 rounded-xl p-10 text-center text-2xl font-medium hover:bg-white hover:text-black transition-all duration-300 shadow-md"
          >
            🎥 Predict Video
          </Link> */}

          {/* Audio Detection */}
          {/* <Link
            to="/upload-audio"
            className="bg-neutral-900 border border-gray-700 rounded-xl p-10 text-center text-2xl font-medium hover:bg-white hover:text-black transition-all duration-300 shadow-md"
          >
            🎤 Predict Audio
          </Link>
        </div> */}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © {new Date().getFullYear()} Deepfake Detection Portal | Built with ❤️ using MERN + Python
      </footer>
    </div>
  );
};

export default Home;

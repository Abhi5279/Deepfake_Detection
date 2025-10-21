import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="font-roboto fixed top-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-md border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wider"
        >
          Deepfake Detector
        </Link>

        <div className="space-x-8 hidden md:flex">
          <Link to="/" className="hover:text-gray-400 transition">Home</Link>
          {/* <Link to="/upload" className="hover:text-gray-400 transition">Image</Link> */}
          {/* <Link to="/upload-image" className="hover:text-gray-400 transition">Image</Link> */}
          {/* <Link to="/upload" className="hover:text-gray-400 transition">Video</Link> */}
          {/* <Link to="/upload-video" className="hover:text-gray-400 transition">Video</Link> */}
          <Link to="/upload" className="hover:text-gray-400 transition">Predict</Link>
          {/* <Link to="/upload-audio" className="hover:text-gray-400 transition">Audio</Link> */}
        </div>

        <Link
          to="/"
          className="md:hidden text-2xl hover:text-gray-400 transition"
        >
          ☰
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

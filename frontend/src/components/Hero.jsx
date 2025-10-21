import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="font-roboto min-h-screen flex flex-col justify-center items-center text-center bg-black text-white  relative px-6">
      
      {/* Glass panel wrapper */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10 rounded-2xl p-10 md:p-16 max-w-3xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Multi-Modal Deepfake Detection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-300 text-lg md:text-xl mb-8"
        >
          Upload an image, video, or audio file to verify its authenticity in real time using AI-powered CNN models.
        </motion.p>

        <div
          className="inline-block px-8 py-4 rounded-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white font-semibold text-lg backdrop-blur-md hover:bg-opacity-20 transition-all duration-300"
        >
          <Link to="/upload" >Get Started</Link>
          
        </div>
      </motion.div>

      {/* Subtle abstract shape for style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 0.6 }}
        className="absolute w-[400px] h-[400px] bg-white rounded-full blur-3xl top-20 right-10"
      />
    </section>
  );
};

export default Hero;

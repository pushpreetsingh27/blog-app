import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-white overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:flex lg:items-center">
        {/* Text Section */}
        <motion.div
          className="max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-orange-700 leading-tight">
            Create, Share, and React to Amazing Posts
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Unleash your creativity, share your thoughts, and engage with a
            vibrant community. Your story deserves to be heard.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start space-x-4">
            <Link to={auth?.currentUser ? "/dashboard" : "/login"}>
              <button className="bg-orange-700 text-white px-6 py-3 text-lg rounded-2xl shadow-lg hover:bg-orange-600">
                Create a Post
              </button>
            </Link>
            <Link to="/allblogs">
              <button className="bg-gray-200 text-orange-700 px-6 py-3 text-lg rounded-2xl shadow hover:bg-gray-300">
                Explore Posts
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
    </section>
  );
};

export default HeroSection;

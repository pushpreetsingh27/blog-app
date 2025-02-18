import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { ThemeContext } from "../context/ThemeContext";

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`relative overflow-hidden py-16 lg:py-24 text-center lg:text-left ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-orange-50 via-orange-100 to-white"
      }`}
    >
      <div className="flex flex-col items-center mx-auto px-6 lg:flex lg:items-center lg:px-16">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Headline with AI Highlight */}
          <h1
            className={`text-4xl sm:text-4xl font-extrabold leading-tight ${
              theme === "dark" ? "text-gray-100" : "text-orange-500"
            }`}
          >
            Unleash Your Inner Blogger with
            <br />
            <span className=" block  text-orange-700 ">
                AI-Powered  Blog Creation
            </span>{" "}
          Create,Discover and Explore
          </h1>

          {/* Subtext */}
          <p
            className={`mt-6 text-lg opacity-90 leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Create stunning blogs effortlessly with cutting-edge AI assistance.
            Share your thoughts, engage with a vibrant community, and discover
            trending content—all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center lg:justify-start space-x-6">
            <Link to={auth?.currentUser ? "/dashboard" : "/login"}>
              <button
                className={`px-6 py-3 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-blue-700 text-white hover:bg-blue-600"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                }`}
              >
                Create a Post
              </button>
            </Link>
            <Link to="/allblogs">
              <button
                className={`px-6 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-white text-orange-700 hover:bg-orange-100"
                }`}
              >
                Explore Posts
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div
        className={`absolute top-0 left-0 w-48 h-48 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse ${
          theme === "dark" ? "bg-orange-900" : "bg-orange-300"
        }`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-48 h-48 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse ${
          theme === "dark" ? "bg-orange-800" : "bg-orange-400"
        }`}
      ></div>
    </section>
  );
};

export default HeroSection;

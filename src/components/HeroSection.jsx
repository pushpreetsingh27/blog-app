import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { ThemeContext } from "../context/ThemeContext";

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`relative overflow-hidden py-16 lg:py-24 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-100 via-orange-200 to-white'
    }`}>
      <div className="flex items-center justify-center mx-auto px-4 lg:flex lg:items-center">
        <motion.div
          className="max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-4xl sm:text-6xl font-extrabold leading-tight ${
            theme === 'dark' ? 'text-gray-100' : 'text-orange-700'
          }`}>
            Create, Share, and React to Amazing Posts
          </h1>
          <p className={`mt-6 text-lg opacity-90 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Unleash your creativity, share your thoughts, and engage with a
            vibrant community. Your story deserves to be heard.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start space-x-6">
            <Link to={auth?.currentUser ? "/dashboard" : "/login"}>
              <button className={`px-6 py-3 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-blue-700 text-white hover:bg-blue-600' 
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
              }`}>
                Create a Post
              </button>
            </Link>
            <Link to="/allblogs">
              <button className={`px-6 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' 
                  : 'bg-white text-orange-700 hover:bg-gray-100'
              }`}>
                Explore Posts
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-0 left-0 w-48 h-48 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse ${
        theme === 'dark' ? 'bg-blue-900' : 'bg-orange-50'
      }`}></div>
      <div className={`absolute bottom-0 right-0 w-48 h-48 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse ${
        theme === 'dark' ? 'bg-blue-900' : 'bg-orange-100'
      }`}></div>
    </section>
  );
};

export default HeroSection;
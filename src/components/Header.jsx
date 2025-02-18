import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserLogout = async () => {
    await auth.signOut();
    navigate("/login");
    toast.success("User Logged out");
  };

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all 
        ${theme === "light" 
          ? "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 shadow-lg" 
          : "bg-gray-900 shadow-md border-b border-gray-700"}
      `}
    >
      <nav className="px-8 py-3 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className={`
              text-4xl font-extrabold tracking-tight 
              ${theme === "light" ? "text-white" : "text-gray-100"}
            `}
          >
            Post<span className={`
              ${theme === "light" ? "text-white" : "text-orange-600"}
            `}>Sphere</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Links */}
          <div className={`
            lg:flex lg:items-center lg:space-x-6 
            ${menuOpen ? "absolute top-full left-0 w-full bg-gray-900 p-6 flex flex-col space-y-4" : "hidden lg:flex"}
          `}>
            <NavLink
              to="/"
              className={({ isActive }) => `
                text-lg font-medium
                ${theme === "light" ? "text-white hover:text-orange-100" : "text-gray-300 hover:text-gray-100"}
                py-1 px-3 border-b-2 
                ${isActive ? "border-orange-300" : "border-transparent"}
                transition-all duration-300
              `}
            >
              Home
            </NavLink>

            <NavLink
              to="/allblogs"
              className={({ isActive }) => `
                text-lg font-medium
                ${theme === "light" ? "text-white hover:text-orange-100" : "text-gray-300 hover:text-gray-100"}
                py-1 px-3 border-b-2 
                ${isActive ? "border-orange-300" : "border-transparent"}
                transition-all duration-300
              `}
            >
              Blogs
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) => `
                text-lg font-medium
                ${theme === "light" ? "text-white hover:text-orange-100" : "text-gray-300 hover:text-gray-100"}
                py-1 px-3 border-b-2 
                ${isActive ? "border-orange-300" : "border-transparent"}
                transition-all duration-300
              `}
            >
              Dashboard
            </NavLink>

            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-full transition-all 
                ${theme === "light" ? "text-white" : "text-gray-300"}
              `}
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </button>

            {auth?.currentUser ? (
              <button
                className={`
                  px-5 py-2 font-semibold rounded-full transition-all
                  ${theme === "light"
                    ? "bg-orange-700 hover:bg-orange-800 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-100"}
                `}
                onClick={handleUserLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={`
                  px-5 py-2 font-semibold rounded-full transition-all
                  ${theme === "light"
                    ? "bg-orange-700 hover:bg-orange-800 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-100"}
                `}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
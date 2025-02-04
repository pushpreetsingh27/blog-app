import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleUserLogout = async () => {
    await auth.signOut();
    navigate("/login");
    toast.success("User Logged out");
  };

  return (
    <header className={`
      sticky top-0 z-50 shadow-lg 
      ${theme === 'light' 
        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700' 
        : 'bg-gradient-to-r from-dark-bg to-dark-bg-secondary dark:text-dark-text'}
    `}>
      <nav className="px-6 py-4">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <Link 
            to="/" 
            className={`
              text-3xl font-extrabold tracking-wide 
              ${theme === 'light' ? 'text-white' : 'text-dark-text'}
            `}
          >
            BlogTime
          </Link>
          
          <div className="flex items-center space-x-8">
            {['/', '/allblogs', '/dashboard'].map((path, index) => {
              const linkTexts = ['Home', 'Blogs', 'Dashboard'];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `
                    text-lg font-medium 
                    ${theme === 'light' 
                      ? 'text-white hover:text-orange-100' 
                      : 'text-dark-text-muted hover:text-dark-text'}
                    py-2 px-3 transition-all duration-300 
                    ${isActive ? `border-b-2 ${theme === 'light' ? 'border-orange-200' : 'border-dark-text'}` : ''}
                  `}
                >
                  {linkTexts[index]}
                </NavLink>
              );
            })}

            <button
              onClick={toggleTheme}
              className={`
                p-2 transition-all duration-300 
                ${theme === 'light' 
                  ? 'text-white hover:text-orange-200' 
                  : 'text-dark-text hover:text-dark-text-muted'}
              `}
            >
              {theme === "light" ? (
                <Moon size={24} />
              ) : (
                <Sun size={24} />
              )}
            </button>

            {auth?.currentUser ? (
              <button
                className={`
                  px-6 py-2 font-semibold rounded-full transition-all duration-300
                  ${theme === 'light'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-orange-dark hover:bg-orange-700 text-dark-bg'}
                `}
                onClick={handleUserLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={`
                  px-6 py-2 font-semibold rounded-full transition-all duration-300
                  ${theme === 'light'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-orange-dark hover:bg-orange-700 text-dark-bg'}
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
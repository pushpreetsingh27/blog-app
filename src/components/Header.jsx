import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";


const Header = () => {

  const navigate = useNavigate()  

    const handleUserLogout = async () => {
        await auth.signOut();
        navigate("/login");
        toast.success("User Logged out");
      };
    


  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo on the Left */}
          <Link to="/" className="text-2xl font-bold text-orange-700">
            BlogTime
          </Link>

          {/* Navigation Links on the Right */}
          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2 px-3 font-medium ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } hover:text-orange-700`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `py-2 px-3 font-medium ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } hover:text-orange-700`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/allblogs"
              className={({ isActive }) =>
                `py-2 px-3 font-medium ${
                  isActive ? "text-orange-700" : "text-gray-700"
                } hover:text-orange-700`
              }
            >
              Blogs
            </NavLink>

       {
        auth?.currentUser ?
         <button
         className="px-4 py-2  text-orange-600 font-semibold rounded-lg border-2 border-orange-700 hover:bg-orange-600 hover:text-white transition-colors"
         onClick={handleUserLogout}
         >Logout</button>
         :
          <Link
        to="/login"
        className="px-4 py-2  text-orange-600 font-semibold rounded-lg border-2 border-orange-700 hover:bg-orange-600 hover:text-white transition-colors"
      >
        Login
      </Link>
       }
           
           
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

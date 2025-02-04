import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">My Blog App</h2>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} My Blog App. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/allblogs" className="hover:text-white transition-colors">
              Blogs
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-center text-sm">
          <p>Designed with care &amp; passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

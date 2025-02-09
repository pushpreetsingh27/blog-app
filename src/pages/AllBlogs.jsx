import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import { ThemeContext } from "../context/ThemeContext";

const AllBlogs = () => {
  const { allBlogs } = useContext(MyContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-orange-100 text-orange-700"
      }`}
    >
      <h1
        className={`text-4xl font-extrabold text-center mb-12 ${
          theme === "dark" ? "text-gray-100" : "text-orange-700"
        }`}
      >
        All Blogs
      </h1>

      {allBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map((blog) => (
            <div
              key={blog.id}
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-200"
              } shadow-xl rounded-2xl p-5 hover:shadow-2xl transition-all border hover:scale-105 transform`}
            >
              <img
                src={blog.imageUrl}
                alt="Blog Thumbnail"
                className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
                onClick={() => navigate(`/blog/${blog.id}`)}
              />
              <h2
                className={`text-2xl font-semibold mb-2 hover:text-opacity-80 transition-colors ${
                  theme === "dark" ? "text-gray-100" : "text-orange-700"
                }`}
              >
                {blog.title}
              </h2>
              <p
                className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-gray-200" : "text-orange-700"
                  }`}
                >
                  Category:{" "}
                </span>
                {blog.category}
              </p>

              <div
                className={`flex justify-between text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span>{blog.date}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className={`text-center mt-6 ${
            theme === "dark" ? "text-gray-100" : "text-orange-700"
          }`}
        >
          No blogs available
        </p>
      )}
    </div>
  );
};

export default AllBlogs;

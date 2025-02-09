import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PostBlogModal from "../components/PostBlogModal";
import MyContext from "../context/MyContext";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const navigate = useNavigate();
  const { allBlogs, deleteBlogs } = useContext(MyContext);
  const { theme } = useContext(ThemeContext);

  const fetchUserDetail = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetail({ ...docSnap.data(), uid: user.uid });
        } else {
          console.log("No User Logged In");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const handleAddBlog = () => {
    setBlogToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog) => {
    setBlogToEdit(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBlogToEdit(null);
  };

  const userBlogs = userDetail
    ? allBlogs.filter((blog) => blog.userId === userDetail.uid)
    : [];

  return (
    <div className={`min-h-screen p-6 md:p-12 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-orange-50 to-white text-orange-700'
    }`}>
      <h1 className={`text-4xl md:text-5xl font-bold text-center mb-8 ${
        theme === 'dark' ? 'text-gray-100' : 'text-orange-700'
      }`}>
        Welcome to Your Dashboard
      </h1>
      
      <div className={`${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 text-gray-200' 
          : 'bg-white border-orange-200'
      } rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border`}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-orange-600 shadow-lg"
        />
        {userDetail && (
          <div className="text-center md:text-left">
            <p className={`text-xl md:text-2xl font-semibold ${
              theme === 'dark' ? 'text-gray-200' : 'text-orange-600'
            }`}>
              {userDetail.name}
            </p>
            <p className={`text-lg md:text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-orange-500'
            }`}>
              Total Blogs - <span className="font-medium">{userBlogs.length}</span>
            </p>
            <button
              className={`mt-4 py-2 px-6 text-white rounded-full transition-all transform hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-blue-700 hover:bg-blue-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={handleAddBlog}
            >
              Post Blog
            </button>
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${
          theme === 'dark' ? 'text-gray-100' : 'text-orange-700'
        }`}>
          Your Blog Posts
        </h2>

        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-gray-200' 
            : 'bg-white border-orange-200'
        } rounded-3xl shadow-xl p-6 overflow-x-auto border`}>
          <table className="w-full table-auto text-left">
            <thead>
              <tr className={`${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-orange-100 text-orange-800'
              } uppercase text-xs md:text-sm`}>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Posted On</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            {userDetail && (
              <tbody>
                {userBlogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className={`${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 border-b border-gray-700' 
                        : 'hover:bg-orange-50 border-b border-orange-100'
                    } transition-colors`}
                  >
                    <td className={`px-6 py-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-orange-700'
                    }`}>{index + 1}</td>
                    <td className="px-6 py-3">
                      <img
                        src={blog.imageUrl}
                        alt={`Blog ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className={`px-6 py-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-orange-700'
                    }`}>{blog.date}</td>
                    <td className={`px-6 py-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-orange-700'
                    }`}>{blog.title}</td>
                    <td className={`px-6 py-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-orange-700'
                    }`}>{blog.category}</td>
                    <td className="px-6 py-3 space-x-4">
                      <button
                        className={`px-5 py-2 rounded-lg transform transition-all ${
                          theme === 'dark'
                            ? 'bg-blue-700 text-white hover:bg-blue-600'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                        onClick={() => handleEditBlog(blog)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlogs(blog.id)}
                        className={`px-5 py-2 rounded-lg transform transition-all ${
                          theme === 'dark'
                            ? 'bg-red-700 text-white hover:bg-red-600'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <PostBlogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        blogData={blogToEdit}
      />
    </div>
  );
};

export default Dashboard;
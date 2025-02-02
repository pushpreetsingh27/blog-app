import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PostBlogModal from "../components/PostBlogModal";
import MyContext from "../context/MyContext";

const Dashboard = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { allBlogs, deleteBlogs } = useContext(MyContext);

  const fetchUserDetail = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetail(docSnap.data());
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
    setIsModalOpen(true); // Open the modal when the "POST BLOG" button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-orange-700">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Profile Section */}
      <div className="bg-white text-orange-700 rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-orange-300">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-orange-500"
        />
        {userDetail && (
          <div>
            <p className="mt-2 text-lg md:text-xl">
              Name - <span className="text-orange-500 font-medium">{userDetail.name}</span>
            </p>
            <p className="mt-2 text-lg md:text-xl">
              Role - <span className="text-orange-500 font-medium">Software Engineer</span>
            </p>
            <p className="mt-2 text-lg md:text-xl">
              Total Blogs - <span className="text-orange-500 font-medium">{allBlogs.length}</span>
            </p>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-400 py-1 px-5 text-white border border-black"
                onClick={handleAddBlog}
              >
                POST BLOG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Blog List</h2>
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 overflow-x-auto border border-orange-300">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-orange-200 text-orange-900 uppercase text-xs md:text-sm">
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Posted On</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allBlogs.map((blog, index) => (
                <tr key={blog.id} className="hover:bg-orange-100 transition-colors">
                  <td className="px-4 py-3 text-orange-700">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-oj_Vi4vpcTjA9FHrEHfCu55viohgsgL4fw&s"
                      alt={`Blog ${index + 1}`}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 text-orange-700">{blog.date}</td>
                  <td className="px-4 py-3 text-orange-700">{blog.title}</td>
                  <td className="px-4 py-3 text-orange-700">{blog.category}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                      Edit
                    </button>
                    <button
                        onClick={() => deleteBlogs(blog.id)}
                    className="bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <PostBlogModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;

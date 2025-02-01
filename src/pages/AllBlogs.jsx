import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
  const [getAllBlog, setGetAllBlog] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getAllBlogs = () => {
      try {
        const q = query(collection(db, "blogPost"), orderBy('time'));
        onSnapshot(q, (QuerySnapshot) => {
          const blogArray = QuerySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setGetAllBlog(blogArray);
        });
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      }
    };

    getAllBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-700">
        All Blogs
      </h1>

      {getAllBlog.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllBlog.map((blog) => (
            <div key={blog.id} className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-shadow border-b-2 border-orange-700">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-oj_Vi4vpcTjA9FHrEHfCu55viohgsgL4fw&s" 
                alt="Blog Thumbnail" 
                className="w-full h-40 object-cover rounded-md mb-4"
                onClick={()=> navigate(`/blog/${blog.id}`)}
              />
              <h2 className="text-xl font-semibold text-orange-700 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4">
                <span className="font-medium text-orange-700">Category: </span>
                {blog.category}
              </p>
              <p className="text-gray-600 mb-4">
                {blog.content}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{blog.date}</span>
                <span>{new Date(blog.time.seconds * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-orange-700 mt-6">No blogs available</p>
      )}
    </div>
  );
};

export default AllBlogs;

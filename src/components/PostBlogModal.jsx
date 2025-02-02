import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PostBlogModal = ({ isOpen, onClose, blogData }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Set initial values when editing
  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title || "");
      setContent(blogData.content || "");
      setCategory(blogData.category || "");
    } else {
      setTitle("");
      setContent("");
      setCategory("");
    }
  }, [blogData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogData) {
        // Edit mode: update the existing blog
        const docRef = doc(db, "blogPost", blogData.id);
        await updateDoc(docRef, {
          title,
          category,
          content,
          // Optionally update the time/date or leave unchanged
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        });
        toast.success("Blog Updated Successfully");
      } else {
        // Post mode: add a new blog document
        const productRef = collection(db, "blogPost");
        await addDoc(productRef, {
          title,
          category,
          content,
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        });
        toast.success("Post Added Successfully");
      }
      onClose();
      // Optionally, navigate or refresh your list here.
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        <button
          className="text-2xl px-3 py-1 bg-red-500 text-white"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-orange-700 text-center">
          {blogData ? "Edit Your Blog" : "Write Your Blog"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Blog Title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Add Blog Category"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Add Blog Description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {blogData ? "Update Blog" : "Post Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBlogModal;

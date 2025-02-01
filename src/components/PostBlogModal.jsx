import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PostBlogModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;  // Only show the modal if `isOpen` is true

 const [title , setTitle] = useState("")
 const [content , setContent] = useState("")
 const [category , setCategory] = useState("")



const handleAddBlogPost = async (e) =>{
e.preventDefault();
try {
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
onClose()
  toast.success("Post Added Successfully"); 
} catch (error) {
    
}


}

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        {/* Close Button */}
        <button
          className=" text-2xl top-0  px-3 py-1 bg-red-500 text-white"
          onClick={onClose}>
        X</button> 
        <h2 className="text-2xl font-bold text-orange-700 text-center">Write Your Blog</h2>
        
        {/* Form */}
        <form className="space-y-4"
         onSubmit={handleAddBlogPost}
        >
    
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
          
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBlogModal;

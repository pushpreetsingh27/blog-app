import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { db, auth } from '../firebase/config'; // Added auth import
import { collection, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const PostBlogModal = ({ isOpen, onClose, blogData }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Set initial values when editing
  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title || "");
      setContent(blogData.content || "");
      setCategory(blogData.category || "");
      setImageUrl(blogData.imageUrl || "");
    } else {
      setTitle("");
      setContent("");
      setCategory("");
      setImageUrl("");
    }
  }, [blogData]);

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setIsUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "cloudinary_blog_app");
      data.append("cloud_name", "du2rexiz5");

      toast.loading('Uploading image...');

      const res = await fetch("https://api.cloudinary.com/v1_1/du2rexiz5/image/upload", {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const uploadData = await res.json();
      
      if (uploadData.secure_url) {
        setImageUrl(uploadData.secure_url);
        toast.dismiss();
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('No secure URL received');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss();
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !content.trim() || !category.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Prepare blog post data
      const blogPost = {
        title,
        category,
        content,
        imageUrl,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      if (blogData) {
        // Edit mode: update the existing blog
        const docRef = doc(db, "blogPost", blogData.id);
        await updateDoc(docRef, blogPost);
        toast.success("Blog Updated Successfully");
      } else {
        // Post mode: add a new blog document including the userId field
        const productRef = collection(db, "blogPost");
        await addDoc(productRef, {
          ...blogPost,
          userId: auth.currentUser.uid // Add the logged-in user's UID
        });
        toast.success("Post Added Successfully");
      }
      
      // Reset form
      setTitle("");
      setContent("");
      setCategory("");
      setImageUrl("");
      
      onClose();
      navigate('/'); // Or wherever you want to redirect after posting
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-4 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-orange-700">
            {blogData ? "Edit Your Blog" : "Write Your Blog"}
          </h2>
          <button
            className="text-2xl px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add Blog Title"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Add Blog Category"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

         <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
            <ReactQuill value={content} onChange={setContent} className="h-60" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUploading}
            />
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Preview
              </label>
              <img 
                src={imageUrl} 
                alt="Blog preview" 
                className="max-w-full h-auto rounded-lg border border-gray-300"
              />
            </div>
          )}

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className={`px-6 py-2 rounded-lg text-white ${
                isUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isUploading 
                ? 'Uploading...' 
                : blogData 
                  ? "Update Blog" 
                  : "Post Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBlogModal;
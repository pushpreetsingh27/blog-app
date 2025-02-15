import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { db, auth } from "../firebase/config";
import { collection, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

const PostBlogModal = ({ isOpen, onClose, blogData }) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

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

  const handleGenerateBlog = async () => {
    if (!title.trim() || !category.trim()) {
      return toast.error("Please enter both Title and Category.");
    }

    setIsGenerating(true);
    toast.loading("Generating blog content...");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyAr7nu2MjeE-dba_945AhpgQd-AkZzC6Xw`,
        {
          contents: [{ parts: [{ text: `Write a detailed blog on ${title} under the category ${category}.` }] }],
        }
      );

      const generatedContent = response.data.candidates[0]?.content?.parts[0]?.text || "AI failed to generate content.";
      setContent(generatedContent);
      toast.dismiss();
      toast.success("Blog content generated!");
    } catch (error) {
      console.error("Error generating blog:", error);
      toast.dismiss();
      toast.error("Failed to generate blog.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
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
      
      if (!res.ok) throw new Error('Upload failed');
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
    if (!title.trim() || !content.trim() || !category.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const blogPost = {
        title,
        category,
        content,
        imageUrl,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      };

      if (blogData) {
        await updateDoc(doc(db, "blogPost", blogData.id), blogPost);
        toast.success("Blog Updated Successfully");
      } else {
        await addDoc(collection(db, "blogPost"), { ...blogPost, userId: auth.currentUser.uid });
        toast.success("Post Added Successfully");
      }
      setTitle("");
      setContent("");
      setCategory("");
      setImageUrl("");
      onClose();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-orange-700">{blogData ? "Edit Your Blog" : "Write Your Blog"}</h2>
          <button className="text-2xl px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={onClose}>X</button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" className="w-full p-3 border rounded" required />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full p-3 border rounded" required />
          <button type="button" onClick={handleGenerateBlog} className="p-2 bg-gray-900 text-white rounded" disabled={isGenerating}>{isGenerating ? "Generating..." : "Generate Blog"}</button>
          <ReactQuill value={content} onChange={setContent} className="h-60" />
          <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full p-2 border rounded" disabled={isUploading} />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded" disabled={isUploading}>{isUploading ? "Uploading..." : "Post Blog"}</button>
        </form>
      </div>
    </div>
  );
};

export default PostBlogModal;

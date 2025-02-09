import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const featuredBlog = {
  title: "Explore the Future of Technology",
  category: "Tech Trends",
  content:
    "Dive deep into the innovations shaping tomorrow's world. From AI breakthroughs to quantum computing, discover how technology is evolving and what it means for our society. Get inspired by the transformative potential of modern tech and see how these trends can shape a better future.",
  image: "https://img.freepik.com/premium-photo/plexus-style-background-high-tech-digital-technology-background-creative-technology-background-with-plexus-optical-flares-data-visualization-cyberspace-big-data-technology-3d-rendering_105386-2221.jpg",
  id: "K9GELatrzmL2azBeGEL6"
};

const smallBlogs = [
  {
    title: "Health & Wellness in the Digital Age",
    category: "Health",
    content:
      "Learn how digital tools and wearables are transforming personal wellness and healthcare delivery.",
    image: "https://i.pinimg.com/736x/c5/2f/a5/c52fa54e72a9cc0c13710406a49ebbdc.jpg",
     id : "gHs0IlD1jhuiZqa4yU4h"
  },
  {
    title: "Sports Analytics: Changing the Game",
    category: "Sports",
    content:
      "Discover how data-driven insights are revolutionizing team strategies and athletic performance on and off the field.",
    image: "https://i.pinimg.com/736x/78/4e/75/784e75aa1c454c56b5f695ddcfbf895e.jpg",
    id : "UmcNpzpckjRxJZTlywXr"
  
  },
  {
    title: "Digital Diplomacy and Modern Politics",
    category: "Politics",
    content:
      "Explore how social media and digital campaigns are reshaping political narratives and voter engagement.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1ReRkiZopdl_rVhfXsUPjjqnlwGLhdwdLg&s",
     id : "U3qbmB1GkuIQHLoerLQ1"
  },
];

const BlogSection = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

 

  return (
    <section className={`py-12 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Featured Blog (Big Blog) */}
        <div className={`rounded-lg shadow-lg overflow-hidden mb-12 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-full object-cover"
                onClick={()=> navigate(`/blog/${featuredBlog.id}`)}
              />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <span className={`text-sm font-bold uppercase tracking-wide ${
                theme === 'dark' ? 'text-blue-400' : 'text-orange-700'
              }`}>
                {featuredBlog.category}
              </span>
              <h2 className={`mt-2 text-3xl font-extrabold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {featuredBlog.title}
              </h2>
              <p className={`mt-4 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {featuredBlog.content}
              </p>
            </div>
          </div>
        </div>

        {/* Grid of Smaller Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {smallBlogs.map((blog, index) => (
            <div
              key={index}
              className={`rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
                onClick={() => navigate(`/blog/${blog.id}`)}
              />
              <div className="p-6">
                <span className={`text-xs font-medium uppercase ${
                  theme === 'dark' ? 'text-blue-400' : 'text-orange-700'
                }`}>
                  {blog.category}
                </span>
                <h3 className={`mt-2 text-xl font-semibold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {blog.title}
                </h3>
                <p className={`mt-3 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {blog.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
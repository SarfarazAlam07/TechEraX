import React from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { useData } from "../context/DataContext"; // ✅ Backend Data

const BlogGrid = () => {
  const { blogs } = useData();

  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Clock className="w-3 h-3" /> {blog.time}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-blue-600 hover:bg-gray-200 transition-colors px-3 py-2 rounded-md cursor-pointer"
                >
                  Read More <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;

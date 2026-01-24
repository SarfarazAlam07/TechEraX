import React from "react";
import { Clock, ArrowUpRight } from "lucide-react";

const BlogGrid = () => {
  const blogs = [
    {
      id: 1,
      title: "React vs Vue: Which one to choose in 2026?",
      category: "Development",
      time: "4 min read",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.w4IjiUPTFa78oLVGxNYEzgHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      title: "Top 10 UI Design Trends for Mobile Apps",
      category: "Design",
      time: "6 min read",
      image:
        "https://cdn.dribbble.com/users/257709/screenshots/6924629/uixninja_adminpanel_dashboard_ui_4x.png",
    },
    {
      id: 3,
      title: "SEO Strategies that actually work today",
      category: "Marketing",
      time: "3 min read",
      image:
        "https://storage.googleapis.com/stateless-ceoblognation-com/2022/02/6f2f3323-seo-ranking-scaled.jpeg",
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
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

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Clock className="w-3 h-3" /> {blog.time}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <button className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-blue-600 hover:bg-gray-200 transition-colors">
                  Read More <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;

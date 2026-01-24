import React from 'react';
import { Send } from 'lucide-react';

const BlogNewsletter = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
        
        {/* Background Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay ahead of the curve</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest tech news, design trends, and development tips delivered straight to your inbox. No spam, ever.
          </p>

          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-lg"
            />
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
              Subscribe <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default BlogNewsletter;
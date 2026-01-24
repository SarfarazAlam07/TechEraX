import React from 'react';

// Components
import BlogHero from '../components/BlogHero';
import FeaturedBlog from '../components/FeaturedBlog';
import BlogGrid from '../components/BlogGrid';
import BlogFAQ from '../components/BlogFAQ';
import BlogNewsletter from '../components/BlogNewsletter';

const Blog = () => {
  return (
    <div className="bg-white">
      
      <BlogHero />
      <FeaturedBlog />
      <BlogGrid />
      <BlogFAQ />
      <BlogNewsletter />

    </div>
  );
};

export default Blog;
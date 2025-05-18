'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBlogPosts } from '../lib/blogService';
import type { BlogPost } from '../lib/blogService';

const Blog: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getBlogPosts();
        // Only show the 3 most recent posts on the homepage
        setPosts(fetchedPosts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const handleViewAllClick = () => {
    router.push('/blog');
  };

  if (loading) {
    return (
      <section id="blog" className="pt-0 pb-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="pt-0 pb-16 sm:pb-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Latest Blog Posts</h2>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="p-4 sm:p-6">
                  <time className="text-xs sm:text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  <h3 className="text-lg sm:text-xl font-semibold mt-2 mb-2 sm:mb-3">{post.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="text-sm sm:text-base text-primary hover:underline inline-flex items-center">
                    Read More
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 sm:mt-10 text-center">
            <button
              onClick={handleViewAllClick}
              className="inline-flex items-center justify-center gap-2 text-primary hover:underline text-sm sm:text-base"
            >
              View All Posts
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog; 
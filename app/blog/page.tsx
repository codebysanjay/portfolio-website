import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { generateBlogListMetadata } from '../lib/metadata';
import Script from 'next/script';
import Image from 'next/image';

export const metadata = generateBlogListMetadata();

// Define types locally to avoid conflicts
interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  slug: string;
}

// Local function to fetch blog posts
async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Fetching blog posts...');
    const blogsCollection = collection(db, 'blogs');
    console.log('Collection reference created');
    
    const q = query(blogsCollection, orderBy('date', 'desc'));
    console.log('Query created');
    
    const querySnapshot = await getDocs(q);
    console.log('Query executed, got snapshot');
    console.log('Number of documents:', querySnapshot.size);
    
    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Document data:', { id: doc.id, title: data.title });
      return {
        id: doc.id,
        title: data.title,
        date: data.date,
        content: data.content,
        slug: data.slug
      } as BlogPost;
    });
    
    console.log('Successfully processed', posts.length, 'blog posts');
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;
  
  try {
    console.log('Starting to fetch blog posts in page component...');
    posts = await fetchBlogPosts();
    console.log('Successfully fetched blog posts in page component');
  } catch (e) {
    console.error('Error in BlogPage component:', e);
    error = e instanceof Error ? e.message : 'Failed to load blog posts';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Blog</h1>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Please try refreshing the page or contact support if the problem persists.</p>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600">No blog posts found.</p>
          </div>
        </div>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Sanjay Mohan\'s Blog',
    description: 'Articles about Android development, software architecture, and technology.',
    url: 'https://sanjaymohan.dev/blog',
    author: {
      '@type': 'Person',
      name: 'Sanjay Mohan',
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.content.substring(0, 200),
      author: {
        '@type': 'Person',
        name: 'Sanjay Mohan',
      },
      datePublished: post.date,
      keywords: '',
      url: `https://sanjaymohan.dev/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <Script
        id="blog-list-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pb-12">
        <div className="container mx-auto px-4 py-2">
          <h1 className="text-4xl font-bold mb-6">Blog</h1>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white shadow rounded-lg p-6">
                <Link href={`/blog/${post.slug}`} className="block hover:bg-gray-50">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{new Date(post.date).toLocaleDateString()}</p>
                  <p className="text-gray-700">{post.content.substring(0, 200)}...</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 
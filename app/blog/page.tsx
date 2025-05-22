import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { generateBlogListMetadata } from '../lib/metadata';
import Script from 'next/script';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';

export const metadata = generateBlogListMetadata();

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  slug: string;
  excerpt?: string;
  author?: {
    name: string;
    photoURL?: string;
  };
  tags?: string[];
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogsCollection = collection(db, 'blogs');
    const q = query(blogsCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Skip if the document is marked as deleted
      if (data.deleted) {
        return null;
      }

      // Handle date conversion safely
      let dateString: string;
      if (data.date instanceof Timestamp) {
        dateString = data.date.toDate().toISOString();
      } else if (typeof data.date === 'string') {
        dateString = new Date(data.date).toISOString();
      } else {
        console.warn(`Invalid date format for post ${doc.id}:`, data.date);
        dateString = new Date().toISOString(); // Fallback to current date
      }

      return {
        id: doc.id,
        title: data.title,
        date: dateString,
        content: data.content,
        slug: data.slug,
        excerpt: data.excerpt || data.content.substring(0, 200) + '...',
        author: {
          name: data.author?.name || 'Sanjay Mohan',
          photoURL: data.author?.photoURL
        },
        tags: data.tags || []
      } as BlogPost;
    }).filter((post): post is BlogPost => post !== null);
    
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
    posts = await fetchBlogPosts();
  } catch (e) {
    console.error('Error in BlogPage component:', e);
    error = e instanceof Error ? e.message : 'Failed to load blog posts';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Error Loading Blog</h1>
            <p className="text-destructive mb-4">{error}</p>
            <p className="text-muted-foreground">Please try refreshing the page or contact support if the problem persists.</p>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-muted-foreground">No blog posts found.</p>
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
      description: post.excerpt || post.content.substring(0, 200),
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Sanjay Mohan',
      },
      datePublished: post.date,
      keywords: post.tags?.join(', ') || '',
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
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Blog</h1>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border"
              >
                <div className="p-6">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <div className="flex items-center gap-2">
                      {post.author?.photoURL && (
                        <Image
                          src={post.author.photoURL}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span>{post.author?.name}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{post.excerpt || post.content.substring(0, 200)}...</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 
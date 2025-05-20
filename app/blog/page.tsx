import Link from 'next/link';
import Script from 'next/script';
import { getBlogPosts, BlogPost } from '../lib/blogService';
import { generateBlogListMetadata } from '../lib/metadata';
import Image from 'next/image';

export const metadata = generateBlogListMetadata();

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: Error | null = null;

  try {
    console.log('Fetching blog posts...');
    posts = await getBlogPosts();
    console.log('Blog posts fetched:', posts.length);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = err instanceof Error ? err : new Error('Unknown error occurred');
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
      description: post.excerpt,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
      datePublished: post.date,
      keywords: post.tags.join(', '),
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
          {error ? (
            <div className="text-red-500">
              Error loading blog posts. Please try again later.
              <pre className="mt-2 text-sm">{error.message}</pre>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-gray-500">No blog posts found.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
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
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                      <span className="mx-2">•</span>
                      <div className="flex items-center gap-2">
                        {post.author.photoURL && (
                          <Image
                            src={post.author.photoURL}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span>{post.author.name}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
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
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 
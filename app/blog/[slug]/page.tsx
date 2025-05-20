import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '../../lib/blogService';
import { generateBlogMetadata } from '../../lib/metadata';
import Script from 'next/script';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return generateBlogMetadata(post);
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        backgroundColor: 'var(--muted)',
        borderRadius: '0.5rem',
        padding: '1rem',
        margin: '1.5rem 0',
        border: '1px solid var(--border)',
      }}
      className="!bg-muted !border !border-border"
    >
      {code}
    </SyntaxHighlighter>
  );
}

function processContent(content: string) {
  // Split content into paragraphs and code blocks
  const parts = content.split(/(```[\s\S]*?```)/);
  
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      // Extract language and code from code block
      const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
      if (match) {
        const [_, language = 'text', code] = match;
        return <CodeBlock key={index} code={code.trim()} language={language} />;
      }
    }
    // Regular paragraph
    return (
      <p key={index} className="text-muted-foreground mb-4">
        {part}
      </p>
    );
  });
}

export default async function BlogPost({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    url: `https://sanjaymohan.dev/blog/${post.slug}`,
  };

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString()}
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
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-pre:border-border">
            {processContent(post.content)}
          </div>
        </div>
      </article>
    </>
  );
} 
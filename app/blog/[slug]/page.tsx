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
  // First, handle code blocks
  const parts = content.split(/(<pre><code class="language-[\w-]+">[\s\S]*?<\/code><\/pre>)/);
  
  return parts.map((part, index) => {
    // Check if this is a code block
    const codeMatch = part.match(/<pre><code class="language-([\w-]+)">([\s\S]*?)<\/code><\/pre>/);
    if (codeMatch) {
      const [_, language, code] = codeMatch;
      return <CodeBlock key={index} code={code.trim()} language={language} />;
    }

    // For non-code content, we need to handle HTML tags
    // First, split by horizontal rules
    const sections = part.split(/<hr\s*\/?>/);
    
    return sections.map((section, sectionIndex) => {
      // Process each section
      const processedSection = section
        // Handle headings
        .replace(/<h([1-6])>(.*?)<\/h\1>/g, (_, level, text) => {
          const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
          return `<${HeadingTag} class="text-foreground font-bold mt-8 mb-4">${text}</${HeadingTag}>`;
        })
        // Handle paragraphs
        .replace(/<p>(.*?)<\/p>/g, (_, text) => {
          return `<p class="text-muted-foreground mb-4">${text}</p>`;
        })
        // Handle strong tags
        .replace(/<strong>(.*?)<\/strong>/g, (_, text) => {
          return `<strong class="text-foreground font-semibold">${text}</strong>`;
        })
        // Handle lists
        .replace(/<ul>([\s\S]*?)<\/ul>/g, (_, content) => {
          return `<ul class="list-disc list-inside text-muted-foreground mb-4">${content}</ul>`;
        })
        .replace(/<li>(.*?)<\/li>/g, (_, content) => {
          return `<li class="mb-2">${content}</li>`;
        })
        // Handle line breaks
        .replace(/<br\s*\/?>/g, '<br />');

      return (
        <div 
          key={`${index}-${sectionIndex}`}
          className="mb-8"
          dangerouslySetInnerHTML={{ __html: processedSection }}
        />
      );
    });
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

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {processContent(post.content)}
          </div>
        </div>
      </article>
    </>
  );
} 
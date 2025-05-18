import { Metadata } from 'next';
import { BlogPost } from './blogService';

export function generateBlogMetadata(post: BlogPost): Metadata {
  const url = `https://sanjaymohan.dev/blog/${post.slug}`;
  const title = `${post.title} | Sanjay Mohan's Blog`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateBlogListMetadata(): Metadata {
  const title = 'Blog | Sanjay Mohan';
  const description = 'Read my thoughts on Android development, software architecture, and technology.';
  const url = 'https://sanjaymohan.dev/blog';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
} 
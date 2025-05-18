import { Metadata } from 'next';
import { BlogPost } from './blogService';

const baseMetadata: Metadata = {
  metadataBase: new URL('https://sanjaymohan.dev'),
  title: {
    default: 'Sanjay Mohan | Software Engineer',
    template: '%s | Sanjay Mohan',
  },
  description: 'Software engineer specializing in Android development, web development, and cloud technologies.',
  keywords: ['software engineer', 'android developer', 'web developer', 'cloud engineer', 'Sanjay Mohan'],
  authors: [{ name: 'Sanjay Mohan' }],
  creator: 'Sanjay Mohan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanjaymohan.dev',
    siteName: 'Sanjay Mohan',
    title: 'Sanjay Mohan | Software Engineer',
    description: 'Software engineer specializing in Android development, web development, and cloud technologies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanjay Mohan - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjay Mohan | Software Engineer',
    description: 'Software engineer specializing in Android development, web development, and cloud technologies.',
    creator: '@sanjaymohan',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
      authors: [post.author.name],
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
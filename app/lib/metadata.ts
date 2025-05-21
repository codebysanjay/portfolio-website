import { Metadata } from 'next';
import { BlogPost } from './blogService';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sanjaymohan.in';

const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Sanjay Mohan | Android & Web Developer',
    template: '%s | Sanjay Mohan - Android & Web Developer',
  },
  description: 'Sanjay Mohan is a Software Engineer specializing in Android development with Kotlin, Jetpack Compose, and Firebase. Expert in building modern, scalable mobile and web applications.',
  keywords: [
    'Sanjay Mohan',
    'Android Developer',
    'Kotlin Developer',
    'Jetpack Compose',
    'Firebase Developer',
    'Web Developer',
    'Software Engineer',
    'Mobile App Developer',
    'sanjaymohan.dev',
    'sanjaymohan.in',
    'Android App Development',
    'Clean Architecture',
    'Software Development',
    'Portfolio',
    'Tech Blog'
  ],
  authors: [{ 
    name: 'Sanjay Mohan',
    url: 'https://sanjaymohan.dev'
  }],
  creator: 'Sanjay Mohan',
  publisher: 'Sanjay Mohan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanjaymohan.dev',
    siteName: 'Sanjay Mohan - Android & Web Developer',
    title: 'Sanjay Mohan | Android & Web Developer',
    description: 'Software Engineer specializing in Android development with Kotlin, Jetpack Compose, and Firebase. Expert in building modern, scalable mobile and web applications.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanjay Mohan - Android & Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjay Mohan | Android & Web Developer',
    description: 'Software Engineer specializing in Android development with Kotlin, Jetpack Compose, and Firebase. Expert in building modern, scalable mobile and web applications.',
    creator: '@sanjaymohan',
    site: '@sanjaymohan',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
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
  alternates: {
    canonical: 'https://sanjaymohan.dev',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'your-verification-code-here', // Replace with your actual verification code
  },
};

export function generateBlogMetadata(post: BlogPost): Metadata {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  return {
    ...baseMetadata,
    title: post.title,
    description: post.excerpt,
    openGraph: {
      ...baseMetadata.openGraph,
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export function generateBlogListMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: 'Blog | Android & Web Development Articles',
    description: 'Read articles about Android development, Kotlin, Jetpack Compose, Firebase, and web development. Learn from practical tutorials and insights.',
    openGraph: {
      ...baseMetadata.openGraph,
      title: 'Blog | Android & Web Development Articles',
      description: 'Read articles about Android development, Kotlin, Jetpack Compose, Firebase, and web development. Learn from practical tutorials and insights.',
      url: `${baseUrl}/blog`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: 'Blog | Android & Web Development Articles',
      description: 'Read articles about Android development, Kotlin, Jetpack Compose, Firebase, and web development. Learn from practical tutorials and insights.',
    },
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  };
}

export { baseMetadata }; 
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: {
    name: string;
    email: string;
    photoURL: string;
  };
  tags: string[];
  excerpt: string;
  content: string;
};

const blogCollection = collection(db, 'blogs');

// Cache the blog posts query for better performance
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    console.log('Starting getBlogPosts...');
    console.log('Firebase config:', {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      // Don't log sensitive keys
    });

    const q = query(blogCollection, orderBy('date', 'desc'));
    console.log('Created query:', q);
    
    console.log('Fetching documents...');
    const querySnapshot = await getDocs(q);
    console.log('Query snapshot size:', querySnapshot.size);
    
    if (querySnapshot.empty) {
      console.log('No blog posts found in Firestore');
      return [];
    }

    console.log('Processing blog posts...');
    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        console.log('Processing document:', doc.id);
        const data = doc.data();
        console.log('Document data:', {
          title: data.title,
          date: data.date,
          author: data.author,
          tags: data.tags,
          // Don't log full content
        });

        const processedContent = await remark()
          .use(html)
          .process(data.content);
        const contentHtml = processedContent.toString();

        return {
          slug: doc.id,
          title: data.title,
          date: (data.date as Timestamp).toDate().toISOString(),
          author: data.author || { name: 'Unknown Author', email: '', photoURL: '' },
          tags: data.tags,
          excerpt: data.excerpt,
          content: contentHtml,
        };
      })
    );

    console.log('Successfully processed', posts.length, 'blog posts');
    return posts;
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
});

// Cache individual blog post queries
export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(blogCollection, slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    const processedContent = await remark()
      .use(html)
      .process(data.content);
    const contentHtml = processedContent.toString();

    return {
      slug: docSnap.id,
      title: data.title,
      date: (data.date as Timestamp).toDate().toISOString(),
      author: data.author || { name: 'Unknown Author', email: '', photoURL: '' },
      tags: data.tags,
      excerpt: data.excerpt,
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}); 
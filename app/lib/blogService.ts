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
    const q = query(blogCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('No blog posts found in Firestore');
      return [];
    }

    const posts = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        
        // Skip if the document is marked as deleted or doesn't exist
        if (!data || data.deleted) {
          return null;
        }

        try {
          const processedContent = await remark()
            .use(html)
            .process(data.content);
          const contentHtml = processedContent.toString();

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
            slug: doc.id,
            title: data.title,
            date: dateString,
            author: data.author || { name: 'Unknown Author', email: '', photoURL: '' },
            tags: data.tags || [],
            excerpt: data.excerpt || '',
            content: contentHtml,
          };
        } catch (error) {
          console.error(`Error processing blog post ${doc.id}:`, error);
          return null;
        }
      })
    );

    // Filter out null posts (deleted or invalid)
    const validPosts = posts.filter((post): post is BlogPost => post !== null);
    console.log('Successfully processed', validPosts.length, 'blog posts');
    return validPosts;
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw error;
  }
});

// Cache individual blog post queries
export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(blogCollection, slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists() || docSnap.data()?.deleted) {
      return null;
    }

    const data = docSnap.data();
    const processedContent = await remark()
      .use(html)
      .process(data.content);
    const contentHtml = processedContent.toString();

    // Handle date conversion safely
    let dateString: string;
    if (data.date instanceof Timestamp) {
      dateString = data.date.toDate().toISOString();
    } else if (typeof data.date === 'string') {
      dateString = new Date(data.date).toISOString();
    } else {
      console.warn(`Invalid date format for post ${slug}:`, data.date);
      dateString = new Date().toISOString(); // Fallback to current date
    }

    return {
      slug: docSnap.id,
      title: data.title,
      date: dateString,
      author: data.author || { name: 'Unknown Author', email: '', photoURL: '' },
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}); 
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
  const q = query(blogCollection, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);
  
  const posts = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
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

  return posts;
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
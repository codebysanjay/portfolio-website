import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Sanjay Mohan',
  description: 'Articles about Android development, Kotlin, Jetpack Compose, and software architecture.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-0">
      {children}
    </div>
  );
} 
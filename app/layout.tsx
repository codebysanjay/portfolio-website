import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import './globals.css';

const raleway = Raleway({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Sanjay Mohan - Android Developer',
  description: 'Portfolio website of Sanjay Mohan, an Android Developer specializing in Kotlin, Jetpack Compose, and Clean Architecture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${raleway.variable} font-sans`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 
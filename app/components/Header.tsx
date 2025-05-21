'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiX, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { FaFileDownload } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import { Github, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/codebysanjay',
    icon: FiGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sanjay--mohan/',
    icon: FiLinkedin,
  },
  {
    name: 'X',
    url: 'https://x.com/sanjaymohan17',
    icon: FiX,
  },
];

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          SM
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-foreground ${
              isActive('/') 
                ? 'text-foreground font-semibold' 
                : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`transition-colors hover:text-foreground ${
              isActive('/about') 
                ? 'text-foreground font-semibold' 
                : 'text-muted-foreground'
            }`}
          >
            About
          </Link>
          <Link
            href="/projects"
            className={`transition-colors hover:text-foreground ${
              isActive('/projects') 
                ? 'text-foreground font-semibold' 
                : 'text-muted-foreground'
            }`}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={`transition-colors hover:text-foreground ${
              isActive('/blog') 
                ? 'text-foreground font-semibold' 
                : 'text-muted-foreground'
            }`}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={`transition-colors hover:text-foreground ${
              isActive('/contact') 
                ? 'text-foreground font-semibold' 
                : 'text-muted-foreground'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Theme Toggle - Desktop */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className={`text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-base font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={`text-base font-medium transition-colors ${
                isActive('/projects') 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={`text-base font-medium transition-colors ${
                isActive('/blog') 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-base font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-foreground font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-border">
              <ThemeToggle />
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 
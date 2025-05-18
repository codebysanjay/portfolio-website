"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b border-border bg-background/80 backdrop-blur-md fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2 font-bold text-lg">
        <span className="text-primary">Sanjay Mohan</span>
      </div>
      <nav className="hidden md:flex gap-8 font-medium text-muted-foreground hover:text-foreground transition-colors">
        <Link href="#about">About</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#blog">Blog</Link>
        <Link href="#contact">Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <a href="https://github.com/yourgithub" target="_blank" rel="noopener" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors"><FaGithub size={22} /></a>
        <a href="https://www.linkedin.com/in/sanjay--mohan/" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors"><FaLinkedin size={22} /></a>
        <a href="mailto:youremail@example.com" aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors"><FaEnvelope size={22} /></a>
        <ThemeToggle />
      </div>
    </header>
  );
} 
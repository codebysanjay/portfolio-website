"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-8 pt-32">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex flex-col gap-6 max-w-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Hi, I'm <span className="text-primary">Sanjay Mohan</span>,<br /> Android Developer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Crafting modern Android apps with Jetpack Compose, Kotlin, and Firebase.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="#projects" className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:scale-105 transition-transform">View Projects</a>
          <a 
            href="/Sanjay_Mohan_Resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-1 flex items-center justify-center"
      >
        {/* Replace with your dynamic/animated image or SVG */}
        <div className="w-64 h-64 bg-gradient-to-tr from-primary to-blue-400 rounded-3xl shadow-2xl flex items-center justify-center animate-pulse">
          <span className="text-6xl">📱</span>
        </div>
      </motion.div>
    </section>
  );
} 
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFileDownload } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Sanjay Mohan
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-foreground/80">
            Android Developer & Mobile App Enthusiast
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/60 mb-8 sm:mb-12 px-4 sm:px-0">
            Crafting beautiful and performant mobile experiences with Kotlin and Jetpack Compose.
            Passionate about clean architecture, modern Android development, and creating apps that make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/Sanjay_Mohan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileDownload className="text-lg" />
              Download Resume
            </motion.a>
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm sm:text-base"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 
"use client";
import { motion } from 'framer-motion';

export default function BlogList() {
  return (
    <section id="blog" className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-3xl w-full text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          Blog posts will appear here. (Firebase integration coming up!)
        </p>
      </motion.div>
    </section>
  );
} 
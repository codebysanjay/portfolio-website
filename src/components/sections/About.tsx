"use client";
import { motion } from 'framer-motion';
import { FaAndroid, FaPython, FaDatabase } from 'react-icons/fa';
import { SiKotlin, SiJetpackcompose, SiFirebase } from 'react-icons/si';

const skills = [
  { name: 'Kotlin', icon: <SiKotlin className="text-[#7F52FF]" size={28} /> },
  { name: 'Jetpack Compose', icon: <SiJetpackcompose className="text-[#4285F4]" size={28} /> },
  { name: 'Firebase', icon: <SiFirebase className="text-[#FFCA28]" size={28} /> },
  { name: 'Python', icon: <FaPython className="text-[#3776AB]" size={28} /> },
  { name: 'Clean Architecture', icon: <FaDatabase className="text-[#2563eb]" size={28} /> },
];

export default function About() {
  return (
    <section id="about" className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-2xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          I'm an Android Developer with 3+ years of experience building modern, scalable apps. I specialize in Jetpack Compose, Kotlin, and Firebase, and love crafting seamless mobile experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center gap-2">
              {skill.icon}
              <span className="text-sm font-medium mt-1">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 
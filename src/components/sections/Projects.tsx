"use client";
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Compose News',
    image: '/projects/compose-news.png',
    description: 'A modern news app built with Jetpack Compose and Kotlin, featuring real-time updates and offline support.',
    tech: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    github: 'https://github.com/yourgithub/compose-news',
  },
  {
    title: 'Taskify',
    image: '/projects/taskify.png',
    description: 'A productivity app for task management, using Material You design and Firebase Auth.',
    tech: ['Kotlin', 'Firebase', 'Material You'],
    github: 'https://github.com/yourgithub/taskify',
  },
  {
    title: 'Weatherly',
    image: '/projects/weatherly.png',
    description: 'A beautiful weather app with Compose, OpenWeatherMap API, and custom animations.',
    tech: ['Kotlin', 'Jetpack Compose', 'API'],
    github: 'https://github.com/yourgithub/weatherly',
  },
  {
    title: 'Habit Tracker',
    image: '/projects/habit-tracker.png',
    description: 'Track your habits and routines with charts and reminders. Built with Compose and Room.',
    tech: ['Kotlin', 'Jetpack Compose', 'Room'],
    github: 'https://github.com/yourgithub/habit-tracker',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.03 }}
              className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-border"
            >
              <div className="w-full h-48 bg-muted rounded-xl mb-2 flex items-center justify-center overflow-hidden">
                {/* Replace with next/image for real images */}
                <span className="text-5xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <a href={project.github} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline">
                <FaGithub /> GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 
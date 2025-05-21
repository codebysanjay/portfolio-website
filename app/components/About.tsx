'use client';

import { motion, Variants } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const About: React.FC = () => {
  const skills = [
    { name: 'Android Development', level: 'Expert' },
    { name: 'Kotlin', level: 'Expert' },
    { name: 'Jetpack Compose', level: 'Advanced' },
    { name: 'Clean Architecture', level: 'Advanced' },
    { name: 'MVVM', level: 'Expert' },
    { name: 'Room Database', level: 'Advanced' },
    { name: 'Retrofit', level: 'Advanced' },
    { name: 'Coroutines', level: 'Expert' },
    { name: 'Dagger Hilt', level: 'Advanced' },
    { name: 'Unit Testing', level: 'Advanced' },
    { name: 'Git', level: 'Expert' },
    { name: 'CI/CD', level: 'Advanced' },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-6"
            variants={fadeInUp}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
          >
            <motion.div variants={itemAnimation}>
              <motion.p 
                className="text-muted-foreground mb-4"
                variants={fadeInUp}
              >
                I'm a passionate Android Developer with a strong focus on creating modern, user-friendly mobile applications.
                With expertise in Kotlin and Android development, I specialize in building robust, scalable applications
                using Clean Architecture and MVVM patterns.
              </motion.p>
              
              <motion.p 
                className="text-muted-foreground mb-6"
                variants={fadeInUp}
              >
                My experience includes working with Jetpack Compose, Room Database, Retrofit, and Dagger Hilt for
                dependency injection. I'm committed to writing clean, maintainable code and implementing best practices
                in software development. When I'm not coding, I contribute to open-source projects and stay updated
                with the latest Android development trends.
              </motion.p>

              <motion.div 
                className="flex gap-4 items-center"
                variants={itemAnimation}
              >
                <motion.a
                  href="https://github.com/codebysanjay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-2xl" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sanjay--mohan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="text-2xl" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
            >
              <motion.div 
                className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
                variants={itemAnimation}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
                variants={itemAnimation}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-3">Professional Experience</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Senior Android Developer</h4>
                    <p className="text-muted-foreground">Current Role</p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Leading Android development using Kotlin and Jetpack Compose</li>
                      <li>Implementing Clean Architecture and MVVM patterns</li>
                      <li>Managing CI/CD pipelines and code quality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Android Developer</h4>
                    <p className="text-muted-foreground">Previous Experience</p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Developed and maintained multiple Android applications</li>
                      <li>Worked with Room Database and Retrofit for data management</li>
                      <li>Implemented unit tests and UI tests</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 
'use client';

import Contact from '../components/Contact';
import { motion, Variants } from 'framer-motion';

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

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-8">Contact</h1>
        </motion.div>
        
        <motion.div
          className="prose dark:prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.p 
            className="text-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I'm always interested in hearing about new opportunities and connecting with fellow
            developers. Feel free to reach out through any of the following channels:
          </motion.p>

          <motion.div 
            className="grid gap-6 md:grid-cols-2 mt-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
              variants={itemAnimation}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4">Email</h2>
              <p className="text-muted-foreground mb-2">
                For professional inquiries, please email me at:
              </p>
              <motion.a
                href="mailto:sanjaymohan3798@gmail.com"
                className="text-primary hover:underline inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                sanjaymohan3798@gmail.com
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            </motion.div>

            <motion.div 
              className="bg-card text-card-foreground p-6 rounded-lg shadow-lg"
              variants={itemAnimation}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <motion.ul 
                className="space-y-2"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  { name: 'GitHub', url: 'https://github.com/sanjaymohan' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sanjay--mohan/' },
                  { name: 'X', url: 'https://x.com/sanjaymohan17' }
                ].map((social, index) => (
                  <motion.li
                    key={social.name}
                    variants={itemAnimation}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.name}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
            <motion.p 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              You can also use the contact form below to send me a message directly:
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Contact />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 
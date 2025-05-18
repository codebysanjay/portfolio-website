import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Sanjay Mohan',
  description: 'Learn more about Sanjay Mohan, a software developer specializing in Android development and software architecture.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Hi, I'm Sanjay Mohan, a passionate software developer with expertise in Android development
            and software architecture. I love building robust, scalable applications that make a
            positive impact on people's lives.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Experience</h2>
          <p className="mb-6">
            With several years of experience in software development, I've worked on various projects
            ranging from mobile applications to enterprise software solutions. My focus has been on
            creating clean, maintainable code and implementing best practices in software development.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Skills</h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Android Development (Kotlin, Java)</li>
            <li>Software Architecture</li>
            <li>Clean Architecture & SOLID Principles</li>
            <li>Test-Driven Development</li>
            <li>Agile Methodologies</li>
            <li>UI/UX Design</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Education</h2>
          <p className="mb-6">
            I hold a degree in Computer Science and continue to stay updated with the latest
            technologies and best practices in software development through continuous learning
            and professional development.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Interests</h2>
          <p className="mb-6">
            When I'm not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing my knowledge through technical writing and
            community engagement.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6">
              I'm always interested in connecting with fellow developers and discussing
              interesting projects. Feel free to reach out through any of the social links
              in the header or the contact form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
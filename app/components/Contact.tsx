'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'error' | 'success';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      // Construct email URL with mailto: protocol
      const subject = encodeURIComponent('Portfolio Contact from ' + formData.name);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Your email address
      const emailAddress = 'sanjaymohan3798@gmail.com';
      const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

      // Open default email client
      window.location.href = mailtoUrl;

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus({ type: 'success', message: 'Email sent successfully!' });
      }, 1000);

    } catch (error) {
      console.error('Error opening email client:', error);
      setStatus({
        type: 'error',
        message: 'Failed to open email client. Please try again.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('bg-card text-card-foreground rounded-lg shadow-lg p-4 sm:p-6', className)}
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5 sm:mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5 sm:mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1.5 sm:mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
            placeholder="Your message here..."
          />
        </div>
        {status.type === 'error' && (
          <div className="p-3 sm:p-4 rounded-lg bg-destructive/10 text-destructive text-sm sm:text-base">
            <p className="font-medium">{status.message}</p>
          </div>
        )}
        {status.type === 'success' && (
          <div className="p-3 sm:p-4 rounded-lg bg-green-500/10 text-green-500 text-sm sm:text-base">
            <p className="font-medium">{status.message}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.type === 'loading' ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact; 
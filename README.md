# Android Developer Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 📝 Blog section (placeholder for Firebase integration)
- 📧 Contact form with email integration
- 🎨 Modern UI with Tailwind CSS
- 🔍 SEO optimized

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/sanjaymohan/portfoliowebsite.git
cd portfoliowebsite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your email configuration:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

Note: For Gmail, you need to use an App Password. Generate one at: https://myaccount.google.com/apppasswords

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

1. Update personal information:
   - Edit `app/components/Hero.tsx` for the main hero section
   - Edit `app/components/About.tsx` for the about section
   - Edit `app/components/Projects.tsx` for project details
   - Edit `app/components/Header.tsx` for social links

2. Add your resume:
   - Replace `public/resume.pdf` with your actual resume

3. Add project images:
   - Add your project screenshots to the `public/projects` directory
   - Update image paths in `app/components/Projects.tsx`

4. Customize theme:
   - Edit `app/globals.css` for color scheme
   - Edit `tailwind.config.ts` for additional theme customization

## Deployment

The site can be deployed to Vercel with zero configuration:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy!

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Nodemailer
- Vercel (deployment)

## License

MIT License - feel free to use this template for your own portfolio!

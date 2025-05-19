# Sanjay Mohan's Portfolio Website

[![CI/CD](https://github.com/codebysanjay/portfolio-website/actions/workflows/ci.yml/badge.svg)](https://github.com/codebysanjay/portfolio-website/actions/workflows/ci.yml)

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Firebase. Features include a blog system, contact form, and project showcase.

## Features

- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Fully responsive design
- 📝 Blog system with Firebase integration
- 📧 Contact form with email notifications
- 🔒 Admin authentication for blog management
- 🚀 Optimized for performance and SEO
- 🌙 Dark mode support

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Deployment:** Vercel
- **Email:** Nodemailer (Gmail)

## Prerequisites

Before you begin, ensure you have the following:
- Node.js 18.17 or later
- npm or yarn
- A Firebase project
- A Gmail account (for the contact form)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Email Configuration (for Contact Form)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-specific-password

# Admin Access
NEXT_PUBLIC_AUTHORIZED_EMAILS=admin1@example.com,admin2@example.com
```

### Setting up Firebase

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (with Google provider)
3. Create a Firestore database
4. Get your Firebase configuration from Project Settings > General > Your Apps > Web App
5. Add your Firebase config values to `.env.local`

### Setting up Gmail for Contact Form

1. Enable 2-Step Verification in your Google Account
2. Generate an App Password:
   - Go to Google Account > Security > App Passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use this password as `EMAIL_PASS` in `.env.local`

### Setting up Admin Access

1. Add authorized email addresses to `NEXT_PUBLIC_AUTHORIZED_EMAILS` in `.env.local`
2. These emails will have access to the admin dashboard for blog management
3. Separate multiple emails with commas

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The site is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables from `.env.local` to Vercel's project settings
4. Deploy!

## Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── components/        # React components
│   └── lib/               # Utility functions and services
├── content/               # Blog content (markdown files)
├── public/                # Static assets
└── scripts/              # Utility scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Sanjay Mohan - [@sanjaymohan](https://twitter.com/sanjaymohan)

Project Link: [https://github.com/yourusername/portfolio-website](https://github.com/yourusername/portfolio-website)

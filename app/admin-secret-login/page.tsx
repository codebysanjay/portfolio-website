"use client";
import { useState, useEffect, useRef } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth, googleProvider } from "../lib/firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import Image from "next/image";

// Session timeout duration in milliseconds (1 hour)
const SESSION_TIMEOUT = 60 * 60 * 1000;
const SESSION_START_KEY = 'admin_session_start';
const SESSION_TIMEOUT_KEY = 'admin_session_timeout';

interface Blog {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  author?: {
    name: string;
    photoURL?: string;
  };
}

export default function AdminSecretLoginPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    tags: "",
    excerpt: "",
    content: "",
  });
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Function to handle automatic logout
  const handleSessionTimeout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem(SESSION_START_KEY);
      localStorage.removeItem(SESSION_TIMEOUT_KEY);
      setError("Your session has expired. Please log in again.");
      setSessionTimeLeft(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Function to initialize session timer
  const initializeSessionTimer = () => {
    const sessionEnd = localStorage.getItem(SESSION_TIMEOUT_KEY);
    if (!sessionEnd) return;

    const endTime = parseInt(sessionEnd);
    const now = Date.now();
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      handleSessionTimeout();
      return;
    }

    // Clear any existing timeouts/intervals
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set timeout for automatic logout
    timeoutRef.current = setTimeout(handleSessionTimeout, timeLeft);

    // Update countdown every second
    intervalRef.current = setInterval(() => {
      const currentTimeLeft = endTime - Date.now();
      if (currentTimeLeft <= 0) {
        handleSessionTimeout();
        return;
      }
      setSessionTimeLeft(currentTimeLeft);
    }, 1000);

    setSessionTimeLeft(timeLeft);
  };

  // Function to start a new session
  const startNewSession = () => {
    const now = Date.now();
    const sessionEnd = now + SESSION_TIMEOUT;
    
    localStorage.setItem(SESSION_START_KEY, now.toString());
    localStorage.setItem(SESSION_TIMEOUT_KEY, sessionEnd.toString());
    
    initializeSessionTimer();
  };

  // Function to check session validity
  const checkSessionValidity = () => {
    const sessionEnd = localStorage.getItem(SESSION_TIMEOUT_KEY);
    if (!sessionEnd) return false;

    const timeLeft = parseInt(sessionEnd) - Date.now();
    return timeLeft > 0;
  };

  // Function to format time left
  const formatTimeLeft = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Initialize session timer on mount
  useEffect(() => {
    if (user && checkSessionValidity()) {
      initializeSessionTimer();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user]); // Only re-run if user changes

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Only start a new session if there isn't a valid one
        if (!checkSessionValidity()) {
          startNewSession();
        }
      } else {
        // Clear timeouts and intervals when user logs out
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setSessionTimeLeft(null);
        localStorage.removeItem(SESSION_START_KEY);
        localStorage.removeItem(SESSION_TIMEOUT_KEY);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");
    try {
      console.log('Starting Google sign-in...');
      console.log('Firebase config:', {
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        // Don't log sensitive keys
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Sign-in successful:', {
        email: result.user.email,
        displayName: result.user.displayName,
        // Don't log sensitive user data
      });

      // Check if the user's email is authorized
      const authorizedEmails = process.env.NEXT_PUBLIC_AUTHORIZED_EMAILS?.split(',') || [];
      console.log('Authorized emails:', authorizedEmails);
      
      if (!authorizedEmails.includes(result.user.email || '')) {
        console.log('Unauthorized email attempt:', result.user.email);
        await signOut(auth);
        setError("Unauthorized email address. Please use an authorized account.");
      } else {
        console.log('User authorized successfully');
      }
    } catch (err: any) {
      console.error('Google sign-in error:', {
        code: err.code,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
      
      // Provide more user-friendly error messages
      if (err.code === 'auth/popup-blocked') {
        setError('Please allow popups for this website to sign in with Google.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An error occurred during sign-in. Please try again.');
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setSessionTimeLeft(null);
      localStorage.removeItem(SESSION_START_KEY);
      localStorage.removeItem(SESSION_TIMEOUT_KEY);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle blog post submit
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const blogRef = doc(collection(db, "blogs"), slug);
      await setDoc(blogRef, {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()),
        date: Timestamp.fromDate(new Date(form.date)),
        slug,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        author: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      setSuccess("Blog post created successfully!");
      setForm({ title: "", date: "", tags: "", excerpt: "", content: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle blog post deletion
  const handleDeleteBlog = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setError("");
    setSuccess("");
    try {
      const blogRef = doc(collection(db, "blogs"), slug);
      // Instead of deleting, mark as deleted
      await setDoc(blogRef, { deleted: true, updatedAt: Timestamp.now() }, { merge: true });
      setSuccess("Blog post deleted successfully!");
      // Refresh the blog list
      setBlogs(blogs.filter(blog => blog.slug !== slug));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Login & Blog Creator</h1>
        {!user ? (
          <div className="space-y-4 bg-white dark:bg-gray-800/95 p-6 rounded-lg shadow-lg">
            <button 
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-700/90 dark:hover:bg-gray-600/90 dark:text-gray-200 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/80 text-red-700 dark:text-red-100 rounded">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-gray-800/95 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                {user.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                  {sessionTimeLeft !== null && (
                    <p className="text-xs text-amber-600 dark:text-amber-400/90 mt-1">
                      Session expires in: {formatTimeLeft(sessionTimeLeft)}
                    </p>
                  )}
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700/90 dark:hover:bg-gray-600/90 px-4 py-2 rounded transition-colors text-gray-700 dark:text-gray-200"
              >
                Logout
              </button>
            </div>
            <form onSubmit={handleBlogSubmit} className="space-y-4 bg-white dark:bg-gray-800/95 p-6 rounded-lg shadow-lg">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                <input
                  type="text"
                  placeholder="Enter tags (comma separated)"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
                <input
                  type="text"
                  placeholder="Enter a brief excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <textarea
                  placeholder="Write your blog post content (Markdown supported)"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-2 border rounded dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400 min-h-[300px]"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition-colors"
              >
                Create Blog Post
              </button>
              {success && (
                <div className="p-3 bg-green-100 dark:bg-green-900/80 text-green-700 dark:text-green-100 rounded">
                  {success}
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/80 text-red-700 dark:text-red-100 rounded">
                  {error}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 
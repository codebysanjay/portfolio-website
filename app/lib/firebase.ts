import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';

// Log the current working directory and environment
console.log('Current working directory:', process.cwd());
console.log('NODE_ENV:', process.env.NODE_ENV);

// Validate environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_AUTHORIZED_EMAILS: process.env.NEXT_PUBLIC_AUTHORIZED_EMAILS,
};

// Log environment variable status
console.log('Environment Variables Status:');
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  console.log(`${key}: ${value ? '✅ Set' : '❌ Missing'}`);
  if (!value) {
    console.log(`  Expected format for ${key}:`);
    switch (key) {
      case 'NEXT_PUBLIC_FIREBASE_API_KEY':
        console.log('  NEXT_PUBLIC_FIREBASE_API_KEY=AIza...');
        break;
      case 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN':
        console.log('  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com');
        break;
      case 'NEXT_PUBLIC_FIREBASE_PROJECT_ID':
        console.log('  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id');
        break;
      case 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET':
        console.log('  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com');
        break;
      case 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID':
        console.log('  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789');
        break;
      case 'NEXT_PUBLIC_FIREBASE_APP_ID':
        console.log('  NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123');
        break;
      case 'NEXT_PUBLIC_AUTHORIZED_EMAILS':
        console.log('  NEXT_PUBLIC_AUTHORIZED_EMAILS=email1@example.com,email2@example.com');
        break;
    }
  }
});

// Check for missing required variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
  console.error(errorMessage);
  throw new Error(errorMessage);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
console.log('Initializing Firebase with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  // Don't log sensitive keys
});

let app;
try {
  if (getApps().length === 0) {
    console.log('No Firebase apps found, initializing new app...');
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized successfully');
  } else {
    console.log('Using existing Firebase app');
    app = getApp();
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Initialize Firestore
console.log('Initializing Firestore...');
const db = getFirestore(app);
console.log('Firestore initialized successfully');

// Initialize Auth
console.log('Initializing Auth...');
const auth = getAuth(app);
console.log('Auth initialized successfully');

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Test function to verify connection
export async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');
    console.log('Current Firebase config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
    });
    
    const blogsCollection = collection(db, 'blogs');
    console.log('Attempting to fetch blogs collection...');
    const querySnapshot = await getDocs(blogsCollection);
    console.log('Firebase connection successful!');
    console.log('Number of blog posts:', querySnapshot.size);
    
    // Log the first document if it exists
    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      console.log('First document data:', {
        id: firstDoc.id,
        title: firstDoc.data().title,
        date: firstDoc.data().date,
        // Don't log full content
      });
    } else {
      console.log('No documents found in blogs collection');
    }
    
    return true;
  } catch (error) {
    console.error('Firebase connection error details:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
}

export { db, auth, googleProvider }; 
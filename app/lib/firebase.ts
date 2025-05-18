import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Log the current working directory and environment
console.log('Current working directory:', process.cwd());
console.log('NODE_ENV:', process.env.NODE_ENV);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug logging with more details
console.log('Environment Variables Status:');
Object.entries(firebaseConfig).forEach(([key, value]) => {
  console.log(`${key}: ${value ? '✅ Set' : '❌ Missing'}`);
  if (!value) {
    console.log(`  Expected format for ${key}:`);
    switch (key) {
      case 'apiKey':
        console.log('  NEXT_PUBLIC_FIREBASE_API_KEY=AIza...');
        break;
      case 'authDomain':
        console.log('  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com');
        break;
      case 'projectId':
        console.log('  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id');
        break;
      case 'storageBucket':
        console.log('  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com');
        break;
      case 'messagingSenderId':
        console.log('  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789');
        break;
      case 'appId':
        console.log('  NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123');
        break;
    }
  }
});

// Validate required fields
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  const errorMessage = `Missing required Firebase configuration fields: ${missingFields.join(', ')}`;
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Test function to verify connection
export async function testFirebaseConnection() {
  try {
    console.log('Attempting to connect to Firestore...');
    const blogsCollection = collection(db, 'blogs');
    const querySnapshot = await getDocs(blogsCollection);
    console.log('Firebase connection successful!');
    console.log('Number of blog posts:', querySnapshot.size);
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
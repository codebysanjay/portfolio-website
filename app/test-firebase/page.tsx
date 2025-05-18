import { testFirebaseConnection } from '../lib/firebase';

export default async function TestFirebasePage() {
  let connectionStatus = 'Checking connection...';
  let errorDetails = '';
  let isConnected = false;

  try {
    isConnected = await testFirebaseConnection();
    connectionStatus = isConnected ? '✅ Firebase connection successful!' : '❌ Firebase connection failed';
  } catch (error) {
    connectionStatus = '❌ Firebase connection error';
    errorDetails = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Firebase Connection Test</h1>
      <div className={`p-4 rounded-lg ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <p className="font-semibold">{connectionStatus}</p>
        {errorDetails && (
          <div className="mt-2 p-2 bg-red-50 rounded">
            <p className="text-sm font-mono">{errorDetails}</p>
          </div>
        )}
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Troubleshooting Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Verify that your .env.local file exists in the project root</li>
            <li>Check that all Firebase configuration values are set correctly</li>
            <li>Ensure your Firebase project is active and Firestore is enabled</li>
            <li>Verify that your Firebase project's security rules allow read access</li>
            <li>Check if your Firebase project's billing status is active (if required)</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 
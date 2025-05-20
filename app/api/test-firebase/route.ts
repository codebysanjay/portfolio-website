import { NextResponse } from 'next/server';
import { testFirebaseConnection } from '../../lib/firebase';

export async function GET() {
  try {
    console.log('Testing Firebase connection from API route...');
    const isConnected = await testFirebaseConnection();
    
    if (isConnected) {
      return NextResponse.json({ 
        status: 'success', 
        message: 'Firebase connection successful',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Firebase connection failed',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test-firebase API route:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
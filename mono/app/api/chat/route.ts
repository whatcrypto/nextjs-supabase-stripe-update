import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder that forwards requests to your Python backend
// Update PYTHON_BACKEND_URL with your actual Python backend URL
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward the request to Python backend
    const response = await fetch(`${PYTHON_BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Python backend returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response for development
    // Remove this in production
    if (!PYTHON_BACKEND_URL || PYTHON_BACKEND_URL.includes('localhost')) {
      return NextResponse.json({
        response: "I'm currently in development mode. Please connect me to a Python backend for real conversations! 💕"
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

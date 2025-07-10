import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ 
    success: true, 
    message: 'POST request received',
    data: body,
    timestamp: new Date().toISOString()
  });
} 
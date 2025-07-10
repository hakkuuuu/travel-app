import { NextRequest, NextResponse } from 'next/server';
import type { LoginSchema } from '@/constants';
import clientPromise from '../mongodb';

export async function POST(req: NextRequest) {
  const body = await req.json() as LoginSchema;
  const { username, password } = body;

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');
    const user = await users.findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') },
      password 
    });
    if (user) {
      // Create response with success
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful',
        user: { username: user.username, name: user.name, email: user.email, role: user.role || 'user' }
      });
      
      // Set authentication cookie
      response.cookies.set('loggedIn', 'true', {
        httpOnly: false, // Allow client-side access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });
      
      response.cookies.set('username', user.username, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });
      
      response.cookies.set('role', user.role || 'user', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });
      
      return response;
    }
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 
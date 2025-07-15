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
      // Update last login time
      const now = new Date().toISOString();
      await users.updateOne(
        { _id: user._id },
        { $set: { lastLogin: now, updatedAt: now } }
      );

      // Create login activity
      await db.collection('activity').insertOne({
        userId: user._id.toString(),
        username: user.username,
        type: 'login',
        title: 'User Login',
        description: 'Successfully logged into the platform',
        date: now,
        icon: '🔐',
        createdAt: now
      });

      // Create response with success
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar || '/user.svg'
        }
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 
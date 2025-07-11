import { NextRequest, NextResponse } from 'next/server';
import type { RegisterSchema } from '@/constants';
import clientPromise from '../mongodb';

const DEFAULT_ADMIN = {
  name: 'Admin',
  email: 'admin@example.com',
  username: 'admin12345',
  password: 'admin12345', // updated password
  role: 'admin',
};

async function ensureDefaultAdmin(db: any) {
  const users = db.collection('users');
  const admin = await users.findOne({ username: DEFAULT_ADMIN.username });
  const now = new Date().toISOString();
  if (!admin) {
    await users.insertOne({
      ...DEFAULT_ADMIN,
      createdAt: now,
      updatedAt: now,
      bio: 'Default admin user',
      avatar: '/user.svg',
      preferences: {
        theme: 'auto',
        notifications: { email: true, push: true, sms: false },
        privacy: { profileVisibility: 'public', showEmail: false, showActivity: true },
      },
    });
  } else {
    await users.updateOne(
      { username: DEFAULT_ADMIN.username },
      { $set: { password: DEFAULT_ADMIN.password, role: 'admin', updatedAt: now } }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json() as RegisterSchema & { role?: string };
  const { name, email, username, password, role } = body;

  if (!name || !email || !username || !password) {
    return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    await ensureDefaultAdmin(db);
    const users = db.collection('users');
    const existing = await users.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return NextResponse.json({ success: false, message: 'User with this email or username already exists.' }, { status: 409 });
    }
    const now = new Date().toISOString();
    const newUser = { 
      name, 
      email, 
      username, 
      password,
      role: role || 'user',
      createdAt: now,
      updatedAt: now,
      bio: 'Adventure Seeker',
      avatar: '/user.svg',
      preferences: {
        theme: 'auto',
        notifications: { email: true, push: true, sms: false },
        privacy: { profileVisibility: 'public', showEmail: false, showActivity: true }
      }
    };
    await users.insertOne(newUser);
    
    // Return user data without password
    const { password: _, ...userData } = newUser;
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful.',
      user: userData
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
} 
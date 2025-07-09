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
    const user = await users.findOne({ username, password });
    if (user) {
      return NextResponse.json({ success: true, message: 'Login successful' });
    }
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 
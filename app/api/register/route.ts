import { NextRequest, NextResponse } from 'next/server';
import type { RegisterSchema } from '@/constants';
import clientPromise from '../mongodb';

export async function POST(req: NextRequest) {
  const body = await req.json() as RegisterSchema;
  const { name, email, username, password } = body;

  if (!name || !email || !username || !password) {
    return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');
    const existing = await users.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return NextResponse.json({ success: false, message: 'User with this email or username already exists.' }, { status: 409 });
    }
    await users.insertOne({ name, email, username, password });
    return NextResponse.json({ success: true, message: 'Registration successful.' });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
} 
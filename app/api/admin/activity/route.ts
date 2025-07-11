import { NextResponse } from 'next/server';
import clientPromise from '../../mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    // For demo: get last 5 users and last 5 destinations (created/updated)
    const users = await db.collection('users').find({}).sort({ updatedAt: -1 }).limit(5).toArray();
    const destinations = await db.collection('destinations').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    const activity = [
      ...users.map(u => ({
        type: 'user',
        action: 'updated',
        message: `User ${u.username} (${u.email}) updated`,
        time: u.updatedAt || u.createdAt || new Date().toISOString(),
      })),
      ...destinations.map(d => ({
        type: 'destination',
        action: 'created',
        message: `Destination ${d.name} added`,
        time: d.createdAt || new Date().toISOString(),
      })),
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);
    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
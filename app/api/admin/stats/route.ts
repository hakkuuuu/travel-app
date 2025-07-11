import { NextResponse } from 'next/server';
import clientPromise from '../../mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    // User stats
    const users = await db.collection('users').find({}).toArray();
    const userCount = users.length;
    const userRoles = users.reduce((acc, u) => {
      const role = u.role || 'user';
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    // Destination stats
    const destinations = await db.collection('destinations').find({}).toArray();
    const destinationCount = destinations.length;
    const destinationsByRegion = destinations.reduce((acc, d) => {
      const region = d.region || 'Other';
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return NextResponse.json({ userCount, userRoles, destinationCount, destinationsByRegion });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
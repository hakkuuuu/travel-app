import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';

const COLLECTION = 'destinations';

// GET /api/destinations or /api/destinations?id=123
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const id = request.nextUrl.searchParams.get('id');
    if (id) {
      const destination = await db.collection(COLLECTION).findOne({ id: Number(id) });
      if (!destination) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }
      return NextResponse.json(destination);
    }
    const destinations = await db.collection(COLLECTION).find({}).toArray();
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/destinations
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();
    // Auto-increment id (find max id in collection)
    const last = await db.collection(COLLECTION).find().sort({ id: -1 }).limit(1).toArray();
    const newId = last.length > 0 ? last[0].id + 1 : 1;
    const newDestination = { ...body, id: newId, createdAt: new Date().toISOString() };
    await db.collection(COLLECTION).insertOne(newDestination);
    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';

const COLLECTION = 'destinations';

// Helper to extract id from the URL
function extractIdFromUrl(url: string): string | null {
  const match = url.match(/\/api\/destinations\/(\d+)/);
  return match ? match[1] : null;
}

// PUT /api/destinations/[id]
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();
    const id = extractIdFromUrl(request.url);
    if (!id) {
      return NextResponse.json({ error: 'Invalid destination id' }, { status: 400 });
    }

    // Check if destination exists
    const existingDestination = await db.collection(COLLECTION).findOne({ id: Number(id) });
    if (!existingDestination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    // Update destination
    const updatedDestination = {
      ...existingDestination,
      ...body,
      id: Number(id), // Ensure ID remains a number
      updatedAt: new Date().toISOString(),
    };

    await db.collection(COLLECTION).updateOne(
      { id: Number(id) },
      { $set: updatedDestination }
    );

    return NextResponse.json(updatedDestination);
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/destinations/[id]
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const id = extractIdFromUrl(request.url);
    if (!id) {
      return NextResponse.json({ error: 'Invalid destination id' }, { status: 400 });
    }

    // Check if destination exists
    const destination = await db.collection(COLLECTION).findOne({ id: Number(id) });
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    // Delete destination
    await db.collection(COLLECTION).deleteOne({ id: Number(id) });

    return NextResponse.json({ 
      success: true,
      message: 'Destination deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import type { UserBooking } from '@/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { success: false, message: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Get user
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's bookings
    const bookings = await db.collection('bookings')
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      data: bookings 
    });
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, campsiteId, campsiteName, checkIn, checkOut, guests, totalPrice } = body;

  if (!username || !campsiteId || !campsiteName || !checkIn || !checkOut || !guests || !totalPrice) {
    return NextResponse.json(
      { success: false, message: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Get user
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    const booking = {
      userId: user._id.toString(),
      campsiteId,
      campsiteName,
      checkIn,
      checkOut,
      guests,
      status: 'confirmed' as const,
      totalPrice,
      createdAt: now,
      updatedAt: now
    };

    const result = await db.collection('bookings').insertOne(booking);

    // Create activity record
    await db.collection('activity').insertOne({
      userId: user._id,
      type: 'booking',
      title: 'New Booking Confirmed',
      description: `Booked ${campsiteName} for ${new Date(checkIn).toLocaleDateString()}`,
      date: now,
      icon: '🏕️',
      metadata: {
        campsiteId,
        campsiteName,
        bookingId: result.insertedId.toString()
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking created successfully',
      data: { ...booking, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 
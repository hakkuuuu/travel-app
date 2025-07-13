import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../mongodb';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Find the booking
    const booking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
    
    if (!booking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return NextResponse.json(
        { success: false, message: 'Booking is already cancelled' },
        { status: 400 }
      );
    }

    if (booking.status === 'completed') {
      return NextResponse.json(
        { success: false, message: 'Cannot cancel a completed booking' },
        { status: 400 }
      );
    }

    // Check if booking is in the past
    const checkInDate = new Date(booking.checkIn);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate <= today) {
      return NextResponse.json(
        { success: false, message: 'Cannot cancel a booking that has already started' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    // Update booking status
    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: 'cancelled',
          updatedAt: now
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Create activity record
    await db.collection('activity').insertOne({
      userId: booking.userId,
      type: 'booking',
      title: 'Booking Cancelled',
      description: `Cancelled booking for ${booking.campsiteName}`,
      date: now,
      icon: '❌',
      metadata: {
        campsiteId: booking.campsiteId,
        campsiteName: booking.campsiteName,
        bookingId: id
      }
    });

    // Update user stats (decrease total bookings)
    await db.collection('users').updateOne(
      { _id: booking.userId },
      { 
        $inc: { 'stats.totalBookings': -1 },
        $set: { updatedAt: now }
      }
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error occurred while cancelling booking' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const bookings = await db.collection('bookings').aggregate([
      {
        $addFields: {
          userIdObj: { $toObjectId: '$userId' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userIdObj',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'destinations',
          localField: 'destinationId',
          foreignField: 'id',
          as: 'destination'
        }
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$destination', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          bookingId: 1,
          destinationName: 1,
          destinationImage: 1,
          startDate: 1,
          endDate: 1,
          guests: 1,
          status: 1,
          totalPrice: 1,
          createdAt: 1,
          updatedAt: 1,
          'user.username': 1,
          'user.name': 1,
          'user.email': 1,
          'destination.name': 1,
          'destination.location': 1,
          'destination.image': 1
        }
      },
      { $sort: { createdAt: -1 } }
    ]).toArray();

    // Transform the data to match the expected format
    const transformedBookings = bookings.map(booking => ({
      id: booking._id.toString(),
      bookingId: booking.bookingId || `BK${booking._id.toString().slice(-8)}`,
      destinationName: booking.destinationName || booking.destination?.name || 'Unknown Destination',
      destinationLocation: booking.destination?.location || 'Unknown Location',
      destinationImage: booking.destinationImage || booking.destination?.image || '/logo.png',
      userName: booking.user?.name || booking.user?.username || 'Unknown User',
      userEmail: booking.user?.email || 'No email',
      checkIn: booking.startDate,
      checkOut: booking.endDate,
      guests: booking.guests || 1,
      status: booking.status || 'confirmed',
      totalPrice: booking.totalPrice || 0,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }));

    return NextResponse.json({ 
      success: true, 
      data: transformedBookings 
    });
  } catch (error) {
    console.error('Admin bookings fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 
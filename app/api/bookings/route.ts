import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import type { UserBooking } from '@/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const destinationId = searchParams.get('destinationId');

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

    // Build query
    const query: any = { userId: user._id.toString() };
    if (destinationId) {
      query.destinationId = destinationId.toString();
    }

    // Get user's bookings (optionally filtered by destination)
    const bookings = await db.collection('bookings')
      .find(query)
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
  try {
    const body = await req.json();
    const { 
      username, 
      destinationId, 
      destinationName, 
      destinationImage,
      startDate, 
      endDate, 
      numberOfPeople, 
      totalPrice,
      specialRequests,
      paymentMethod = 'credit_card'
    } = body;

    // Validate required fields
    if (!username || !destinationId || !destinationName || !startDate || !endDate || !numberOfPeople || !totalPrice) {
      return NextResponse.json(
        { success: false, message: 'All required fields are missing' },
        { status: 400 }
      );
    }

    // Validate dates
    const checkInDate = new Date(startDate);
    const checkOutDate = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return NextResponse.json(
        { success: false, message: 'Check-in date cannot be in the past' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { success: false, message: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Validate number of people
    if (numberOfPeople < 1 || numberOfPeople > 10) {
      return NextResponse.json(
        { success: false, message: 'Number of people must be between 1 and 10' },
        { status: 400 }
      );
    }

    // Validate price
    if (totalPrice <= 0) {
      return NextResponse.json(
        { success: false, message: 'Total price must be greater than 0' },
        { status: 400 }
      );
    }

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

    // Prevent admins from making bookings
    if (user.role === 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admins cannot make bookings' },
        { status: 403 }
      );
    }

    // Check if destination exists
    const destination = await db.collection('destinations').findOne({ id: parseInt(destinationId) });
    if (!destination) {
      return NextResponse.json(
        { success: false, message: 'Destination not found' },
        { status: 404 }
      );
    }

    // Check for conflicting bookings (optional - for availability)
    const conflictingBooking = await db.collection('bookings').findOne({
      destinationId: destinationId.toString(),
      status: { $in: ['confirmed', 'pending'] },
      $or: [
        {
          startDate: { $lt: endDate },
          endDate: { $gt: startDate }
        }
      ]
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, message: 'This destination is not available for the selected dates' },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();
    const bookingReference = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Calculate number of nights
    const nights = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

    const booking = {
      userId: user._id.toString(),
      username: user.username,
      destinationId: destinationId.toString(),
      destinationName: destinationName,
      destinationImage: destinationImage || destination.image || '',
      startDate: startDate,
      endDate: endDate,
      nights: nights,
      guests: numberOfPeople,
      status: 'confirmed' as const,
      totalPrice: totalPrice,
      specialRequests: specialRequests || '',
      paymentMethod: paymentMethod,
      paymentStatus: 'pending',
      bookingReference: bookingReference,
      createdAt: now,
      updatedAt: now
    };

    const result = await db.collection('bookings').insertOne(booking);

    // Create activity record for the booking
    const activity = {
      userId: user._id.toString(),
      username: user.username,
      type: 'booking',
      title: 'New Booking Confirmed',
      description: `Booked ${destinationName} for ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()} (${nights} nights)`,
      date: now,
      icon: '🏕️',
      metadata: {
        destinationId: destinationId.toString(),
        destinationName: destinationName,
        bookingId: result.insertedId.toString(),
        nights: nights,
        guests: numberOfPeople,
        totalPrice: totalPrice
      }
    };

    await db.collection('activity').insertOne(activity);

    // Update user stats - calculate from actual data
    const userBookings = await db.collection('bookings')
      .find({ userId: user._id.toString(), status: { $in: ['confirmed', 'completed'] } })
      .toArray();

    const totalBookings = userBookings.length;
    const totalNights = userBookings.reduce((sum, booking) => sum + (booking.nights || 0), 0);
    const totalSpent = userBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
    
    // Get unique destinations visited
    const uniqueDestinations = [...new Set(userBookings.map(booking => booking.destinationId))];
    const totalDestinationsVisited = uniqueDestinations.length;

    // Get favorite destination (most booked)
    const destinationCounts = userBookings.reduce((acc, booking) => {
      acc[booking.destinationName] = (acc[booking.destinationName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const favoriteDestination = Object.keys(destinationCounts).length > 0 
      ? Object.entries(destinationCounts).sort(([,a], [,b]) => b - a)[0][0]
      : 'No destinations visited yet';

    // Update user with calculated stats
    await db.collection('users').updateOne(
      { _id: user._id },
      { 
        $set: { 
          'stats.totalBookings': totalBookings,
          'stats.totalNights': totalNights,
          'stats.totalDestinationsVisited': totalDestinationsVisited,
          'stats.favoriteDestination': favoriteDestination,
          'stats.lastBooking': now,
          'stats.totalSpent': totalSpent,
          updatedAt: now
        }
      }
    );

    const createdBooking = {
      ...booking,
      _id: result.insertedId
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Booking created successfully',
      data: createdBooking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error occurred while creating booking' },
      { status: 500 }
    );
  }
} 
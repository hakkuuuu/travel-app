import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get counts from different collections
    const [users, destinations, bookings] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('destinations').countDocuments(),
      db.collection('bookings').countDocuments(),
    ]);

    // Get recent activity (last 10 items from each collection)
    const recentUsers = await db.collection('users')
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const recentDestinations = await db.collection('destinations')
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const recentBookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    // Combine and format recent activity
    const recentActivity = [
      ...recentUsers.map(user => ({
        id: user.id?.toString() || user._id?.toString(),
        type: 'user' as const,
        action: 'created' as const,
        description: `User ${user.username} was created`,
        timestamp: user.createdAt || new Date().toISOString(),
      })),
      ...recentDestinations.map(dest => ({
        id: dest.id?.toString() || dest._id?.toString(),
        type: 'destination' as const,
        action: 'created' as const,
        description: `Destination ${dest.name} was created`,
        timestamp: dest.createdAt || new Date().toISOString(),
      })),
      ...recentBookings.map(booking => ({
        id: booking.id?.toString() || booking._id?.toString(),
        type: 'booking' as const,
        action: 'created' as const,
        description: `Booking for ${booking.destinationName || 'destination'} was created`,
        timestamp: booking.createdAt || new Date().toISOString(),
      })),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

    const stats = {
      totalUsers: users,
      totalDestinations: destinations,
      totalBookings: bookings,
      recentActivity,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
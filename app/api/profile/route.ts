import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import type { UserProfile, UserStats, RecentActivity } from '@/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  console.log('Profile API called for username:', username);

  if (!username) {
    return NextResponse.json(
      { success: false, message: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Get user profile
    let user = await db.collection('users').findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') } 
    });
    
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      // Create a default profile for the user if they don't exist
      console.log('Creating default profile for user:', username);
      const now = new Date().toISOString();
      const defaultUser = {
        username: username,
        name: username,
        email: `${username}@example.com`,
        bio: 'Adventure Seeker',
        avatar: '/user.svg',
        createdAt: now,
        updatedAt: now,
        preferences: {
          theme: 'auto',
          notifications: { email: true, push: true, sms: false },
          privacy: { profileVisibility: 'public', showEmail: false, showActivity: true }
        }
      };
      
      const result = await db.collection('users').insertOne(defaultUser);
      console.log('Default user created successfully');
      
      // Get the created user with proper MongoDB document structure
      user = await db.collection('users').findOne({ _id: result.insertedId });
    }

    // At this point, user is guaranteed to exist
    const userData = user!;
    
    // Calculate user stats from actual data
    const userBookings = await db.collection('bookings')
      .find({ userId: userData._id.toString(), status: { $in: ['confirmed', 'completed'] } })
      .toArray();

    const userReviews = await db.collection('reviews')
      .find({ userId: userData._id.toString() })
      .toArray();

    // Calculate booking stats
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

    // Calculate average rating from reviews
    const totalReviews = userReviews.length;
    const averageRating = totalReviews > 0 
      ? userReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews
      : 0;

    // Get last booking date
    const lastBooking = userBookings.length > 0 
      ? userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
      : undefined;

    const stats: UserStats = {
      totalBookings,
      totalReviews,
      totalDestinationsVisited,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      favoriteDestination,
      totalNights,
      totalSpent,
      memberSince: userData.createdAt || new Date().toISOString(),
      lastBooking
    };

    // Get recent activity from database
    const recentActivity = await db.collection('activity')
      .find({ userId: userData._id.toString() })
      .sort({ date: -1 })
      .limit(10)
      .toArray();

    // Map database results to RecentActivity type
    let finalRecentActivity: RecentActivity[] = recentActivity.map((activity: any) => ({
      _id: activity._id?.toString(),
      userId: activity.userId,
      username: activity.username,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      date: activity.date,
      icon: activity.icon,
      metadata: activity.metadata
    }));

    // If no activity exists, create a default welcome activity
    if (finalRecentActivity.length === 0) {
      const welcomeActivity: RecentActivity = {
        userId: userData._id.toString(),
        type: 'login',
        title: 'Joined the platform',
        description: 'Welcome to the travel community!',
        date: userData.createdAt || new Date().toISOString(),
        icon: '🎉'
      };
      finalRecentActivity = [welcomeActivity];
    }

    const profile: UserProfile = {
      username: userData.username,
      name: userData.name,
      email: userData.email,
      bio: userData.bio || '',
      avatar: userData.avatar || '',
      memberSince: userData.createdAt || new Date().toISOString(),
      preferences: userData.preferences || {
        theme: 'auto',
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showActivity: true
        }
      }
    };

    return NextResponse.json({
      success: true,
      profile,
      stats,
      recentActivity: finalRecentActivity
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { username, ...updateData } = body;

  if (!username) {
    return NextResponse.json(
      { success: false, message: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const now = new Date().toISOString();
    const result = await db.collection('users').updateOne(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      { 
        $set: { 
          ...updateData,
          updatedAt: now
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Create profile update activity
    const updatedFields = Object.keys(updateData);
    if (updatedFields.length > 0) {
      await db.collection('activity').insertOne({
        userId: (await db.collection('users').findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }))?._id.toString(),
        username: username,
        type: 'profile_update',
        title: 'Profile Updated',
        description: `Updated profile fields: ${updatedFields.join(', ')}`,
        date: now,
        icon: '👤',
        metadata: {
          updatedFields
        },
        createdAt: now
      });
    }

    // Get updated user data
    const updatedUser = await db.collection('users').findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') } 
    });

    const profile: UserProfile = {
      username: updatedUser!.username,
      name: updatedUser!.name,
      email: updatedUser!.email,
      bio: updatedUser!.bio || '',
      avatar: updatedUser!.avatar || '',
      memberSince: updatedUser!.createdAt || new Date().toISOString(),
      preferences: updatedUser!.preferences || {
        theme: 'auto',
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showActivity: true
        }
      }
    };

    return NextResponse.json({
      success: true,
      profile
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 
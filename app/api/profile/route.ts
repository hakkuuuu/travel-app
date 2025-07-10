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
    
    // Get user stats
    const stats: UserStats = {
      totalBookings: 0,
      totalReviews: 0,
      totalDestinationsVisited: 0,
      averageRating: 0,
      favoriteDestination: 'No destinations visited yet',
      totalNights: 0,
      memberSince: userData.createdAt || new Date().toISOString().split('T')[0]
    };

    // Get recent activity
    const recentActivity: RecentActivity[] = [
      {
        userId: userData._id.toString(),
        type: 'login',
        title: 'Joined the platform',
        description: 'Welcome to the travel community!',
        date: userData.createdAt || new Date().toISOString(),
        icon: '🎉'
      }
    ];

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
      recentActivity
    });
  } catch (error) {
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

    const result = await db.collection('users').updateOne(
      { username: { $regex: new RegExp(`^${username}$`, 'i') } },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date().toISOString()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
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
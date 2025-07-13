import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import type { RecentActivity } from '@/constants';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const limit = parseInt(searchParams.get('limit') || '10');

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

    // Get user's activities
    const activities = await db.collection('activity')
      .find({ userId: user._id.toString() })
      .sort({ date: -1 })
      .limit(limit)
      .toArray();

    // Map to RecentActivity type
    const mappedActivities: RecentActivity[] = activities.map((activity: any) => ({
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

    return NextResponse.json({ 
      success: true, 
      data: mappedActivities 
    });
  } catch (error) {
    console.error('Activity fetch error:', error);
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
      type, 
      title, 
      description, 
      icon, 
      metadata = {} 
    } = body;

    // Validate required fields
    if (!username || !type || !title || !description || !icon) {
      return NextResponse.json(
        { success: false, message: 'All required fields are missing' },
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

    const now = new Date().toISOString();

    const activity = {
      userId: user._id.toString(),
      username: user.username,
      type,
      title,
      description,
      date: now,
      icon,
      metadata,
      createdAt: now
    };

    const result = await db.collection('activity').insertOne(activity);

    const createdActivity = {
      ...activity,
      _id: result.insertedId
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Activity created successfully',
      data: createdActivity
    });
  } catch (error) {
    console.error('Activity creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error occurred while creating activity' },
      { status: 500 }
    );
  }
} 
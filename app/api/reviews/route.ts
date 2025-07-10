import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import type { UserReview } from '@/constants';

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

    // Get user's reviews
    const reviews = await db.collection('reviews')
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      data: reviews 
    });
  } catch (error) {
    console.error('Reviews fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, campsiteId, campsiteName, rating, title, content } = body;

  if (!username || !campsiteId || !campsiteName || !rating || !title || !content) {
    return NextResponse.json(
      { success: false, message: 'All fields are required' },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { success: false, message: 'Rating must be between 1 and 5' },
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
    const review = {
      userId: user._id.toString(),
      campsiteId,
      campsiteName,
      rating,
      title,
      content,
      createdAt: now,
      updatedAt: now,
      helpful: 0
    };

    const result = await db.collection('reviews').insertOne(review);

    // Create activity record
    await db.collection('activity').insertOne({
      userId: user._id,
      type: 'review',
      title: 'Review Posted',
      description: `Left a ${rating}-star review for ${campsiteName}`,
      date: now,
      icon: '⭐',
      metadata: {
        campsiteId,
        campsiteName,
        rating
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Review created successfully',
      data: { ...review, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 
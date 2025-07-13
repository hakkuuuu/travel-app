import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../mongodb';
import { ObjectId } from 'mongodb';

const COLLECTION = 'users';

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      let user = await db.collection(COLLECTION).findOne({ id: Number(id) });
      if (!user && ObjectId.isValid(id)) {
        user = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
      }
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }
    const users = await db.collection(COLLECTION).find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();
    if (!body.username || !body.email) {
      return NextResponse.json({ error: 'Username and email are required' }, { status: 400 });
    }
    // Check if user already exists
    const existingUser = await db.collection(COLLECTION).findOne({ $or: [ { username: body.username }, { email: body.email } ] });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    // Auto-increment id (find max id in collection)
    const last = await db.collection(COLLECTION).find().sort({ id: -1 }).limit(1).toArray();
    const newId = last.length > 0 ? last[0].id + 1 : 1;
    const newUser = {
      ...body,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.collection(COLLECTION).insertOne(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    let user = await db.collection(COLLECTION).findOne({ id: Number(id) });
    let filter: any = { id: Number(id) };
    if (!user && ObjectId.isValid(id)) {
      user = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
      filter = { _id: new ObjectId(id) };
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const updatedUser = {
      ...user,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    await db.collection(COLLECTION).updateOne(filter, { $set: updatedUser });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    let user = await db.collection(COLLECTION).findOne({ id: Number(id) });
    let filter: any = { id: Number(id) };
    if (!user && ObjectId.isValid(id)) {
      user = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
      filter = { _id: new ObjectId(id) };
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    await db.collection(COLLECTION).deleteOne(filter);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
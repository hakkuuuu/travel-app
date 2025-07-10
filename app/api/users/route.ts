import { NextRequest, NextResponse } from 'next/server';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    createdAt: "2024-01-02T00:00:00.000Z"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const user = mockUsers.find(u => u.id === parseInt(id));
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user);
    }
    
    return NextResponse.json(mockUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.username || !body.email) {
      return NextResponse.json({ error: 'Username and email are required' }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.username === body.username || u.email === body.email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    
    // Here you would typically save to a database
    // For now, we'll just return the data as if it was saved
    const newUser = {
      id: mockUsers.length + 1,
      username: body.username,
      email: body.email,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Update user
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Here you would typically delete from database
    // For now, we'll just return success
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
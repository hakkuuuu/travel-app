import { NextRequest, NextResponse } from 'next/server';

// Mock data for destinations
import { mockDestinations } from '../../(features)/mock/destinations';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const destination = mockDestinations.find(d => d.id === parseInt(id));
      if (!destination) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
      }
      return NextResponse.json(destination);
    }
    
    return NextResponse.json(mockDestinations);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Here you would typically save to a database
    // For now, we'll just return the data as if it was saved
    const newDestination = {
      id: mockDestinations.length + 1,
      ...body,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
import path from 'path';

import { mockDestinations } from '../app/(features)/mock/destinations';
import clientPromise from '../app/api/mongodb';

async function seedDestinations() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('destinations');
    
    // Clear existing data - handle both real and mock collections
    try {
      if (typeof collection.deleteMany === 'function') {
        await collection.deleteMany({});
        console.log('Cleared existing destinations');
      } else {
        console.log('Mock environment - skipping clear operation');
      }
    } catch (error) {
      console.log('Could not clear existing data:', error);
    }
    
    // Insert mock destinations
    if (typeof collection.insertMany === 'function') {
      await collection.insertMany(mockDestinations);
      console.log(`Successfully seeded ${mockDestinations.length} destinations!`);
    } else {
      console.log('Mock environment - destinations would be inserted here');
      console.log(`Would insert ${mockDestinations.length} destinations`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding destinations:', error);
    process.exit(1);
  }
}

seedDestinations(); 
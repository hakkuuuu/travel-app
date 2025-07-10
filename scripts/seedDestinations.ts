import { mockDestinations } from '../app/(features)/mock/destinations';
import clientPromise from '../app/api/mongodb';

async function seedDestinations() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('destinations');
    // Clear existing data
    await collection.deleteMany({});
    // Insert mock destinations
    await collection.insertMany(mockDestinations);
    console.log('Successfully seeded destinations collection!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding destinations:', error);
    process.exit(1);
  }
}

seedDestinations(); 
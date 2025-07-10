import { MongoClient } from 'mongodb';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

// Check if we're in a build environment (no MONGODB_URI)
if (!process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Please define the MONGODB_URI environment variable');
  } else {
    // During build time or development without MONGODB_URI, create a mock client
    console.warn('MONGODB_URI not defined, using mock connection for build');
    const mockClientPromise = Promise.resolve({
      db: () => ({
        collection: () => ({
          findOne: () => null,
          insertOne: () => ({ insertedId: 'mock-id' }),
          updateOne: () => ({ modifiedCount: 1 }),
          find: () => ({ toArray: () => [] }),
          deleteOne: () => ({ deletedCount: 1 }),
        }),
      }),
    } as any);
    
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = mockClientPromise;
    }
    clientPromise = global._mongoClientPromise;
  }
} else {
  const uri = process.env.MONGODB_URI;
  let client: MongoClient;

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri!);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise; 
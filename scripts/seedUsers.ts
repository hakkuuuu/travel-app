import clientPromise from '../app/api/mongodb';

const sampleUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    username: 'alicej',
    password: 'password123', // In production, hash this!
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bio: 'Nature lover and avid traveler.',
    avatar: '/user.svg',
    preferences: {
      theme: 'light',
      notifications: { email: true, push: false, sms: false },
      privacy: { profileVisibility: 'public', showEmail: false, showActivity: true },
    },
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    username: 'bobsmith',
    password: 'password123',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bio: 'Photographer and camper.',
    avatar: '/user.svg',
    preferences: {
      theme: 'dark',
      notifications: { email: true, push: true, sms: false },
      privacy: { profileVisibility: 'friends', showEmail: false, showActivity: false },
    },
  },
  {
    name: 'Carol Lee',
    email: 'carol@example.com',
    username: 'carollee',
    password: 'password123',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bio: 'Hiker and foodie.',
    avatar: '/user.svg',
    preferences: {
      theme: 'auto',
      notifications: { email: false, push: true, sms: true },
      privacy: { profileVisibility: 'private', showEmail: false, showActivity: false },
    },
  },
  {
    name: 'David Kim',
    email: 'david@example.com',
    username: 'davidkim',
    password: 'password123',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bio: 'Travel blogger and adventurer.',
    avatar: '/user.svg',
    preferences: {
      theme: 'light',
      notifications: { email: true, push: true, sms: true },
      privacy: { profileVisibility: 'public', showEmail: true, showActivity: true },
    },
  },
  {
    name: 'Eva Green',
    email: 'eva@example.com',
    username: 'evagreen',
    password: 'password123',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bio: 'Backpacker and mountain climber.',
    avatar: '/user.svg',
    preferences: {
      theme: 'dark',
      notifications: { email: false, push: false, sms: true },
      privacy: { profileVisibility: 'public', showEmail: false, showActivity: false },
    },
  },
];

async function seedUsers() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');
    // Remove all users except admin
    await users.deleteMany({ role: { $ne: 'admin' } });
    // Insert sample users
    await users.insertMany(sampleUsers);
    console.log(`Seeded ${sampleUsers.length} users!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers(); 
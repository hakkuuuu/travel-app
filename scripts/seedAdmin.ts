// Use require for CommonJS compatibility
const clientPromise = require('../lib/mongodb');

async function seedAdmin() {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection('users');
  const admin = await users.findOne({ username: 'admin12345' });
  const now = new Date().toISOString();

  if (!admin) {
    await users.insertOne({
      name: 'Admin',
      email: 'admin@example.com',
      username: 'admin12345',
      password: 'admin12345', // In production, hash this!
      role: 'admin',
      createdAt: now,
      updatedAt: now,
      bio: 'Default admin user',
      avatar: '/user.svg',
      preferences: {
        theme: 'auto',
        notifications: { email: true, push: true, sms: false },
        privacy: { profileVisibility: 'public', showEmail: false, showActivity: true },
      },
    });
    console.log('Admin user created.');
  } else {
    await users.updateOne(
      { username: 'admin12345' },
      { $set: { password: 'admin12345', role: 'admin', updatedAt: now } }
    );
    console.log('Admin user updated.');
  }
  process.exit(0);
}

seedAdmin(); 
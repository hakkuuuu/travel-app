const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

async function seedBookings() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const users = db.collection('users');
    const destinations = db.collection('destinations');
    const bookings = db.collection('bookings');
    const activity = db.collection('activity');

    // Get a regular user (not admin)
    const user = await users.findOne({ role: { $ne: 'admin' } });
    if (!user) {
      console.log('No regular user found. Please create a user first.');
      return;
    }

    // Get some destinations with required fields
    const destinationList = (await destinations.find({}).limit(5).toArray()).filter(dest =>
      dest && dest.id && dest.name && dest.image
    );
    if (destinationList.length === 0) {
      console.log('No valid destinations found. Please seed destinations first.');
      return;
    }

    console.log(`Seeding bookings for user: ${user.username}`);

    // Helper to get a valid ISO date string
    const getDate = (year, month, day) =>
      new Date(Date.UTC(year, month - 1, day)).toISOString().split('T')[0];

    // Only use destinations with valid data
    const sampleBookings = destinationList.slice(0, 3).map((dest, i) => {
      // Fallbacks
      const fallbackName = dest.name || 'Unknown Destination';
      const fallbackImage = dest.image || '';
      // Generate dates
      const startDate = getDate(2025, 7 + i, 10 + i * 5);
      const endDate = getDate(2025, 7 + i, 12 + i * 5);
      return {
        userId: user._id.toString(),
        username: user.username,
        destinationId: dest.id.toString(),
        destinationName: fallbackName,
        destinationImage: fallbackImage,
        startDate,
        endDate,
        nights: 2,
        guests: 2 + i,
        status: 'confirmed',
        totalPrice: 185 + i * 100,
        specialRequests: i === 0 ? 'Early check-in preferred' : '',
        paymentMethod: 'credit_card',
        paymentStatus: 'completed',
        bookingReference: `BK202507${10 + i * 5}00${i + 1}`,
        createdAt: new Date(Date.UTC(2025, 6 + i, 1 + i)).toISOString(),
        updatedAt: new Date(Date.UTC(2025, 6 + i, 1 + i)).toISOString()
      };
    });

    // Clear existing bookings for this user
    await bookings.deleteMany({ userId: user._id.toString() });
    console.log('Cleared existing bookings');

    // Insert sample bookings
    const bookingResults = await bookings.insertMany(sampleBookings);
    console.log(`Inserted ${bookingResults.insertedCount} bookings`);

    // Create activity records for each booking
    const activities = sampleBookings.map((booking, index) => ({
      userId: user._id.toString(),
      username: user.username,
      type: 'booking',
      title: 'New Booking Confirmed',
      description: `Booked ${booking.destinationName} for ${booking.startDate} - ${booking.endDate} (${booking.nights} nights)`,
      date: booking.createdAt,
      icon: '🏕️',
      metadata: {
        destinationId: booking.destinationId,
        destinationName: booking.destinationName,
        bookingId: Object.values(bookingResults.insertedIds)[index].toString(),
        nights: booking.nights,
        guests: booking.guests,
        totalPrice: booking.totalPrice
      },
      createdAt: booking.createdAt
    }));

    // Clear existing activities for this user
    await activity.deleteMany({ userId: user._id.toString(), type: 'booking' });
    
    // Insert activities
    const activityResults = await activity.insertMany(activities);
    console.log(`Inserted ${activityResults.insertedCount} activity records`);

    // Update user stats
    const userBookings = await bookings.find({ userId: user._id.toString(), status: { $in: ['confirmed', 'completed'] } }).toArray();
    const totalBookings = userBookings.length;
    const totalNights = userBookings.reduce((sum, booking) => sum + (booking.nights || 0), 0);
    const totalSpent = userBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
    
    const uniqueDestinations = [...new Set(userBookings.map(booking => booking.destinationId))];
    const totalDestinationsVisited = uniqueDestinations.length;

    const destinationCounts = userBookings.reduce((acc, booking) => {
      acc[booking.destinationName] = (acc[booking.destinationName] || 0) + 1;
      return acc;
    }, {});
    
    const favoriteDestination = Object.keys(destinationCounts).length > 0 
      ? Object.entries(destinationCounts).sort(([,a], [,b]) => b - a)[0][0]
      : 'No destinations visited yet';

    const lastBooking = userBookings.length > 0 
      ? userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
      : undefined;

    await users.updateOne(
      { _id: user._id },
      { 
        $set: { 
          'stats.totalBookings': totalBookings,
          'stats.totalNights': totalNights,
          'stats.totalDestinationsVisited': totalDestinationsVisited,
          'stats.favoriteDestination': favoriteDestination,
          'stats.lastBooking': lastBooking,
          'stats.totalSpent': totalSpent,
          updatedAt: new Date().toISOString()
        }
      }
    );

    console.log('Updated user stats');
    console.log('Sample bookings seeded successfully!');

  } catch (error) {
    console.error('Error seeding bookings:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedBookings(); 
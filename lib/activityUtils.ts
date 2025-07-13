import type { RecentActivity } from '@/constants';

export interface ActivityData {
  username: string;
  type: RecentActivity['type'];
  title: string;
  description: string;
  icon: string;
  metadata?: Record<string, any>;
}

/**
 * Create an activity record for a user
 */
export async function createActivity(activityData: ActivityData): Promise<boolean> {
  try {
    const response = await fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData)
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error creating activity:', error);
    return false;
  }
}

/**
 * Create a booking activity
 */
export async function createBookingActivity(
  username: string,
  destinationName: string,
  startDate: string,
  endDate: string,
  nights: number,
  guests: number,
  totalPrice: number,
  destinationId: string,
  bookingId: string
): Promise<boolean> {
  return createActivity({
    username,
    type: 'booking',
    title: 'New Booking Confirmed',
    description: `Booked ${destinationName} for ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()} (${nights} nights)`,
    icon: '🏕️',
    metadata: {
      destinationId,
      destinationName,
      bookingId,
      nights,
      guests,
      totalPrice,
      startDate,
      endDate
    }
  });
}

/**
 * Create a profile update activity
 */
export async function createProfileUpdateActivity(
  username: string,
  updatedFields: string[]
): Promise<boolean> {
  return createActivity({
    username,
    type: 'profile_update',
    title: 'Profile Updated',
    description: `Updated profile fields: ${updatedFields.join(', ')}`,
    icon: '👤',
    metadata: {
      updatedFields
    }
  });
}

/**
 * Create a login activity
 */
export async function createLoginActivity(username: string): Promise<boolean> {
  return createActivity({
    username,
    type: 'login',
    title: 'User Login',
    description: 'Successfully logged into the platform',
    icon: '🔐'
  });
}

/**
 * Create a review activity
 */
export async function createReviewActivity(
  username: string,
  destinationName: string,
  rating: number,
  destinationId: string
): Promise<boolean> {
  return createActivity({
    username,
    type: 'review',
    title: 'New Review Posted',
    description: `Posted a ${rating}-star review for ${destinationName}`,
    icon: '⭐',
    metadata: {
      destinationId,
      destinationName,
      rating
    }
  });
}

/**
 * Create a campsite visit activity
 */
export async function createCampsiteVisitActivity(
  username: string,
  destinationName: string,
  destinationId: string
): Promise<boolean> {
  return createActivity({
    username,
    type: 'campsite_visit',
    title: 'Destination Viewed',
    description: `Viewed details for ${destinationName}`,
    icon: '👁️',
    metadata: {
      destinationId,
      destinationName
    }
  });
} 
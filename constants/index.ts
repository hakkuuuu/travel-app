// Auth schemas
export interface LoginSchema {
  username: string;
  password: string;
}

export interface RegisterSchema {
  name: string;
  email: string;
  username: string;
  password: string;
}

// Profile schemas
export interface UserProfile {
  _id?: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  memberSince: string;
  lastLogin?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showActivity: boolean;
  };
}

export interface UserStats {
  totalBookings: number;
  totalReviews: number;
  totalDestinationsVisited: number;
  averageRating: number;
  favoriteDestination: string;
  totalNights: number;
  memberSince: string;
  lastBooking?: string;
}

export interface RecentActivity {
  _id?: string;
  userId: string;
  type: 'booking' | 'review' | 'login' | 'profile_update' | 'campsite_visit';
  title: string;
  description: string;
  date: string;
  icon: string;
  metadata?: {
    campsiteId?: string;
    campsiteName?: string;
    rating?: number;
    bookingId?: string;
  };
}

export interface UserBooking {
  _id?: string;
  userId: string;
  campsiteId: string;
  campsiteName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserReview {
  _id?: string;
  userId: string;
  campsiteId: string;
  campsiteName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
}

// API Response schemas
export interface ProfileResponse {
  success: boolean;
  data?: {
    profile: UserProfile;
    stats: UserStats;
    recentActivity: RecentActivity[];
  };
  message?: string;
}

export interface UpdateProfileSchema {
  name?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

// NAVIGATION
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/destinations', key: 'destinations', label: 'Destinations' },
  { href: '/about', key: 'about', label: 'About' },
  { href: '/contact', key: 'contact', label: 'Contact' },
];

// CAMP SECTION
export const PEOPLE_URL = [
  '/person-1.png',
  '/person-2.png',
  '/person-3.png',
  '/person-4.png',
];

// FEATURES SECTION
export const FEATURES = [
  {
    title: 'Real maps can be offline',
    icon: '/map.svg',
    variant: 'green',
    description:
      'We provide a solution for you to be able to use our application when climbing, yes offline maps you can use at any time there is no signal at the location',
  },
  {
    title: 'Set an adventure schedule',
    icon: '/calendar.svg',
    variant: 'green',
    description:
      "Schedule an adventure with friends. On holidays, there are many interesting offers from Hilink. That way, there's no more discussion",
  },
  {
    title: 'Technology using augment reality',
    icon: '/tech.svg',
    variant: 'green',
    description:
      'Technology uses augmented reality as a guide to your hiking trail in the forest to the top of the mountain. Already supported by the latest technology without an internet connection',
  },
  {
    title: 'Many new locations every month',
    icon: '/location.svg',
    variant: 'orange',
    description:
      'Lots of new locations every month, because we have a worldwide community of climbers who share their best experiences with climbing',
  },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: 'Learn More',
    links: [
      'About Hilink',
      'Press Releases',
      'Environment',
      'Jobs',
      'Privacy Policy',
      'Contact Us',
    ],
  },
  {
    title: 'Our Community',
    links: ['Climbing xixixi', 'Hiking hilink', 'Hilink kinthill'],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: 'Contact Us',
  links: [
    { label: 'Admin Officer', value: '123-456-7890' },
    { label: 'Email Officer', value: 'hilink@akinthil.com' },
  ],
};

export const SOCIALS = {
  title: 'Social',
  links: [
    '/facebook.svg',
    '/instagram.svg',
    '/twitter.svg',
    '/youtube.svg',
    '/wordpress.svg',
  ],
};

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

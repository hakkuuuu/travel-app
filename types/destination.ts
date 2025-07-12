export interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  reviews: Review[];
} 
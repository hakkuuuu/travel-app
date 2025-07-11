// Types for mock destinations
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

// Mock data for destinations (formerly campsites)

export const mockDestinations = [
  {
    id: 1,
    name: "Mountain View Campground",
    location: "Rocky Mountains, CO",
    rating: 4.8,
    price: "$45/night",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Breathtaking mountain views with hiking trails and fishing spots.",
    amenities: ["Hiking", "Fishing", "RV Hookups", "Showers"],
    features: [
      "Mountain views from every site",
      "Access to 15+ hiking trails",
      "Fishing in nearby streams",
      "RV hookups with 30/50 amp service",
      "Clean shower facilities",
      "Fire pits at each site"
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2024-01-15",
        comment: "Absolutely stunning views! The hiking trails were amazing and the facilities were clean."
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        date: "2024-01-10",
        comment: "Great location and friendly staff. The only downside was the limited cell service, but that's expected in the mountains."
      },
      {
        id: 3,
        user: "Lisa K.",
        rating: 5,
        date: "2024-01-05",
        comment: "Perfect for our family camping trip. Kids loved the hiking and we enjoyed the peaceful evenings by the fire."
      }
    ]
  },
  {
    id: 2,
    name: "Lakeside Paradise",
    location: "Lake Tahoe, CA",
    rating: 4.7,
    price: "$60/night",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Relax by the lake with kayaking, swimming, and beautiful sunsets.",
    amenities: ["Kayaking", "Swimming", "Picnic Area", "Restrooms"],
    features: [
      "Private lake access",
      "Kayak and paddleboard rentals",
      "Family-friendly picnic spots",
      "Modern restrooms",
      "Sunset viewing deck"
    ],
    reviews: []
  },
  {
    id: 3,
    name: "Desert Oasis Camp",
    location: "Joshua Tree, CA",
    rating: 4.9,
    price: "$55/night",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience the magic of the desert with stargazing and unique rock formations.",
    amenities: ["Stargazing", "Rock Climbing", "Fire Rings", "Pet Friendly"],
    features: [
      "Unmatched stargazing opportunities",
      "Climbing routes for all levels",
      "Pet-friendly sites",
      "Fire rings for cozy nights"
    ],
    reviews: []
  },
  {
    id: 4,
    name: "Forest Hideaway",
    location: "Olympic National Park, WA",
    rating: 4.6,
    price: "$40/night",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Secluded forest sites with hiking, wildlife, and waterfalls nearby.",
    amenities: ["Hiking", "Wildlife Viewing", "Waterfalls", "Tent Sites"],
    features: [
      "Secluded tent sites",
      "Waterfall hikes",
      "Wildlife viewing platforms",
      "Firewood available"
    ],
    reviews: []
  },
  {
    id: 5,
    name: "Beachfront Bliss",
    location: "Outer Banks, NC",
    rating: 4.5,
    price: "$70/night",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Wake up to the sound of waves and enjoy direct beach access.",
    amenities: ["Beach Access", "Surfing", "Showers", "WiFi"],
    features: [
      "Direct beach access",
      "Surfboard rentals",
      "WiFi available",
      "Hot showers"
    ],
    reviews: []
  },
  {
    id: 6,
    name: "Northern Lights Retreat",
    location: "Fairbanks, AK",
    rating: 5.0,
    price: "$120/night",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "See the aurora borealis from your tent in this once-in-a-lifetime experience.",
    amenities: ["Aurora Viewing", "Heated Tents", "Guided Tours", "Breakfast Included"],
    features: [
      "Glass-roofed tents for aurora viewing",
      "Heated accommodations",
      "Guided northern lights tours",
      "Breakfast included"
    ],
    reviews: []
  },
  {
    id: 7,
    name: "Rainforest Eco-Lodge",
    location: "Costa Rica",
    rating: 4.9,
    price: "$95/night",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Immerse yourself in the rainforest with eco-friendly lodging and wildlife tours.",
    amenities: ["Eco-Lodging", "Wildlife Tours", "Yoga", "Organic Meals"],
    features: [
      "Eco-friendly accommodations",
      "Daily wildlife tours",
      "Yoga classes",
      "Organic farm-to-table meals"
    ],
    reviews: []
  },
  {
    id: 8,
    name: "Island Glamping Resort",
    location: "Maui, Hawaii",
    rating: 4.8,
    price: "$150/night",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Luxury tents on the beach with all the comforts of a resort.",
    amenities: ["Glamping", "Beach Access", "Spa", "Private Decks"],
    features: [
      "Luxury tents with ocean views",
      "On-site spa",
      "Private beach decks",
      "All-inclusive packages"
    ],
    reviews: []
  },
  {
    id: 9,
    name: "Canyon Edge Camp",
    location: "Grand Canyon, AZ",
    rating: 4.7,
    price: "$80/night",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Camp on the edge of the Grand Canyon with breathtaking sunrise views.",
    amenities: ["Guided Tours", "Fire Pits", "Tent Rentals", "Restrooms"],
    features: [
      "Sunrise canyon views",
      "Guided hiking tours",
      "Fire pits for evening gatherings",
      "Tent rentals available"
    ],
    reviews: []
  },
  {
    id: 10,
    name: "Savannah Safari Lodge",
    location: "Serengeti, Tanzania",
    rating: 4.9,
    price: "$200/night",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Luxury safari tents with wildlife viewing decks.",
    amenities: ["Safari Tours", "Wildlife Decks", "All Meals Included", "WiFi"],
    features: [
      "Daily safari tours",
      "Private wildlife viewing decks",
      "All meals included",
      "WiFi in common areas"
    ],
    reviews: []
  },
  {
    id: 11,
    name: "Cliffside Cabins",
    location: "Amalfi Coast, Italy",
    rating: 4.8,
    price: "$180/night",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Charming cabins perched on cliffs with sea views.",
    amenities: ["Sea Views", "Private Balconies", "Breakfast Included", "Air Conditioning"],
    features: [
      "Panoramic sea views",
      "Private balconies",
      "Complimentary breakfast",
      "Air-conditioned cabins"
    ],
    reviews: []
  },
  {
    id: 12,
    name: "Urban Rooftop Retreat",
    location: "Bangkok, Thailand",
    rating: 4.6,
    price: "$110/night",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Modern rooftop tents in the heart of the city with skyline views.",
    amenities: ["Rooftop Bar", "Infinity Pool", "WiFi", "Breakfast"],
    features: [
      "Skyline views",
      "Rooftop bar and pool",
      "High-speed WiFi",
      "Complimentary breakfast"
    ],
    reviews: []
  },
  {
    id: 13,
    name: "Alpine Meadows Lodge",
    location: "Swiss Alps, Switzerland",
    rating: 4.9,
    price: "$160/night",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Cozy mountain lodge with panoramic alpine views and skiing access.",
    amenities: ["Skiing", "Mountain Views", "Spa", "Restaurant"],
    features: [
      "Direct ski lift access",
      "Panoramic mountain views",
      "On-site spa and wellness center",
      "Gourmet restaurant with local cuisine"
    ],
    reviews: []
  },
  {
    id: 14,
    name: "Tropical Paradise Resort",
    location: "Bali, Indonesia",
    rating: 4.7,
    price: "$130/night",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Luxury beachfront resort with traditional Balinese architecture.",
    amenities: ["Beach Access", "Infinity Pool", "Spa", "Cultural Tours"],
    features: [
      "Private beach access",
      "Infinity pool overlooking the ocean",
      "Traditional Balinese spa treatments",
      "Cultural village tours included"
    ],
    reviews: []
  },
  {
    id: 15,
    name: "Desert Luxury Camp",
    location: "Sahara Desert, Morocco",
    rating: 4.8,
    price: "$140/night",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Luxury desert camp with camel treks and traditional Berber hospitality.",
    amenities: ["Camel Treks", "Desert Tours", "Traditional Meals", "Stargazing"],
    features: [
      "Guided camel treks through the dunes",
      "Traditional Berber tent accommodations",
      "Authentic Moroccan cuisine",
      "Unlimited stargazing opportunities"
    ],
    reviews: []
  },
  {
    id: 16,
    name: "Fjord Adventure Lodge",
    location: "Geiranger, Norway",
    rating: 4.9,
    price: "$170/night",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Spectacular fjord views with hiking and kayaking adventures.",
    amenities: ["Fjord Views", "Hiking", "Kayaking", "Northern Lights"],
    features: [
      "Unobstructed fjord views from every room",
      "Guided hiking trails",
      "Sea kayaking equipment provided",
      "Northern lights viewing in winter"
    ],
    reviews: []
  },
  {
    id: 17,
    name: "Wine Country Villa",
    location: "Tuscany, Italy",
    rating: 4.8,
    price: "$190/night",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Charming villa surrounded by vineyards with wine tasting experiences.",
    amenities: ["Wine Tasting", "Vineyard Tours", "Swimming Pool", "Cooking Classes"],
    features: [
      "Private wine cellar with tastings",
      "Guided vineyard tours",
      "Infinity pool with valley views",
      "Traditional Italian cooking classes"
    ],
    reviews: []
  },
  {
    id: 18,
    name: "Arctic Wilderness Camp",
    location: "Lapland, Finland",
    rating: 4.7,
    price: "$220/night",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Unique glass igloos for aurora viewing and husky sledding adventures.",
    amenities: ["Aurora Viewing", "Husky Sledding", "Glass Igloos", "Sauna"],
    features: [
      "Glass-roofed igloos for aurora viewing",
      "Husky sledding adventures",
      "Traditional Finnish sauna",
      "Arctic wilderness survival training"
    ],
    reviews: []
  },
  {
    id: 19,
    name: "Island Treehouse Resort",
    location: "Koh Samui, Thailand",
    rating: 4.6,
    price: "$120/night",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Unique treehouse accommodations in a tropical rainforest setting.",
    amenities: ["Treehouse Lodging", "Rainforest Tours", "Beach Access", "Yoga"],
    features: [
      "Elevated treehouse accommodations",
      "Guided rainforest nature walks",
      "Private beach access",
      "Daily yoga classes in the trees"
    ],
    reviews: []
  },
  {
    id: 20,
    name: "Mountain Monastery Retreat",
    location: "Bhutan",
    rating: 4.9,
    price: "$180/night",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Spiritual retreat in a traditional Bhutanese monastery with meditation and cultural immersion.",
    amenities: ["Meditation", "Cultural Tours", "Mountain Views", "Traditional Meals"],
    features: [
      "Daily meditation sessions with monks",
      "Traditional Bhutanese cultural tours",
      "Panoramic Himalayan mountain views",
      "Authentic local cuisine included"
    ],
    reviews: []
  }
];

export function getMockDestinationById(id: string | number) {
  return mockDestinations.find(dest => dest.id === Number(id));
}

// Add a default image export for fallback
export const DEFAULT_DESTINATION_IMAGE = '/default-destination.jpg'; 
export type CategoryId =
  | 'all'
  | 'hidden-places'
  | 'workshops'
  | 'communities'
  | 'weekend-plans'
  | 'food-coffee'
  | 'art-culture'
  | 'popup-markets'
  | 'budget-friendly';

export type CityId =
  | 'Semua Kota'
  | 'Jakarta'
  | 'Bandung'
  | 'Yogyakarta'
  | 'Surabaya'
  | 'Bali'
  | 'Bekasi'
  | 'Semarang';

export type IndoorOutdoor = 'all' | 'indoor' | 'outdoor' | 'semi-outdoor';
export type CrowdType = 'all' | 'solo-friendly' | 'group-friendly';
export type PriceFilter = 'all' | 'free' | 'under-50k' | 'under-150k' | 'above-150k';

export interface DiscoveryItem {
  id: string;
  title: string;
  tagline: string;
  category: CategoryId;
  categoryName: string;
  city: string;
  area: string;
  address: string;
  priceDisplay: string;
  priceNum: number; // in IDR
  isFree: boolean;
  indoorOutdoor: 'indoor' | 'outdoor' | 'semi-outdoor';
  crowdType: 'solo-friendly' | 'group-friendly';
  description: string;
  curatorNote: string;
  highlightPoints: string[];
  rating: number;
  reviewCount: number;
  communityPick: boolean;
  editorialBadge?: string;
  image: string;
  gallery: string[];
  coordinates: [number, number]; // [lat, lng]
  openingHours: string;
  instagram?: string;
  mapsUrl: string;
  suggestedDuration: string;
  idealTime: string;
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  category: string;
  city: string;
  location: string;
  address: string;
  date: string;
  time: string;
  priceDisplay: string;
  priceNum: number;
  isFree: boolean;
  capacity: string;
  slotsLeft: number;
  description: string;
  whatYouGet: string[];
  image: string;
  tags: string[];
  instagramContact?: string;
}

export type CollectionFolder =
  | 'places-to-visit'
  | 'weekend-ideas'
  | 'creative-things'
  | 'hidden-gems';

export interface SavedState {
  'places-to-visit': string[];
  'weekend-ideas': string[];
  'creative-things': string[];
  'hidden-gems': string[];
}

export interface GeneratedItinerary {
  id: string;
  city: string;
  budgetPerPerson: number;
  peopleCount: number;
  vibe: string;
  durationHours: number;
  items: DiscoveryItem[];
  estimatedTotal: number;
  tips: string[];
  createdAt: string;
}

export interface SubmittedDiscovery {
  id: string;
  title: string;
  category: string;
  city: string;
  area: string;
  priceRange: string;
  description: string;
  instagram: string;
  submitterName: string;
  submitterEmail: string;
  status: 'pending' | 'approved';
  submittedAt: string;
}

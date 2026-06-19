import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  is_verified: boolean;
  verification_status: 'pending' | 'under_review' | 'verified' | 'rejected';
  user_type: 'buyer' | 'owner' | 'agent' | 'developer';
  bio?: string;
  company_name?: string;
  company_registration_number?: string;
  address?: string;
  city?: string;
  country: string;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  listing_type: 'sale' | 'rent' | 'lease';
  price: number;
  price_unit: 'UGX' | 'USD';
  currency: string;
  size_sqm?: number;
  size_unit: string;
  bedrooms?: number;
  bathrooms?: number;
  parking_spaces?: number;
  year_built?: number;
  address: string;
  city: string;
  region?: string;
  country: string;
  latitude?: number;
  longitude?: number;
  features: string[];
  amenities: string[];
  status: PropertyStatus;
  verification_status: 'pending' | 'under_review' | 'verified' | 'rejected';
  views_count: number;
  saves_count: number;
  inquiries_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  images?: PropertyImage[];
  owner?: Profile;
};

export type PropertyImage = {
  id: string;
  property_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
};

export type PropertyType =
  | 'residential_land'
  | 'commercial_land'
  | 'agricultural_land'
  | 'house'
  | 'apartment'
  | 'rental_unit'
  | 'commercial_building'
  | 'office_space'
  | 'warehouse'
  | 'hotel_lodge'
  | 'mixed_use'
  | 'investment_property';

export type PropertyStatus =
  | 'draft'
  | 'pending'
  | 'under_review'
  | 'verified'
  | 'published'
  | 'sold'
  | 'rented'
  | 'withdrawn';

export type Appointment = {
  id: string;
  property_id: string;
  user_id: string;
  owner_id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  notes?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
  property?: Property;
  user?: Profile;
  owner?: Profile;
};

export type Conversation = {
  id: string;
  property_id?: string;
  participant1_id: string;
  participant2_id: string;
  last_message_at: string;
  created_at: string;
  other_participant?: Profile;
  last_message?: Message;
  property?: Property;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  sender?: Profile;
};

export type SavedProperty = {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property;
};

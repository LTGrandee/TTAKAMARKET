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
  seller_profile_enabled?: boolean;
  seller_profile_slug?: string;
  seller_brand_name?: string;
  seller_brand_type?: 'personal' | 'business';
  seller_brand_bio?: string;
  seller_chat_enabled?: boolean;
  rental_preferences?: RentalPreferences;
  address?: string;
  city?: string;
  country: string;
  created_at: string;
  updated_at: string;
};

export type RentalAccommodationType =
  | 'residential'
  | 'room'
  | 'commercial'
  | 'holiday_short_stay'
  | 'storage_industrial';

export type RentalDuration = 'short_term' | 'medium_term' | 'long_term' | 'periodic';
export type RentalPurpose = 'living' | 'student' | 'holiday' | 'temporary_work' | 'business' | 'storage';
export type RentalLivingArrangement = 'individual' | 'couple' | 'family' | 'student' | 'group' | 'corporate';
export type TenancyArrangement = 'sole_tenant' | 'joint_tenants' | 'subtenant' | 'leaseholder' | 'lodger';
export type RentalPaymentMethod = 'daily' | 'nightly' | 'monthly' | 'weekly' | 'advance' | 'corporate_paid' | 'subsidised';

export type RentalPreferences = {
  accommodation_type: RentalAccommodationType;
  duration: RentalDuration;
  purpose: RentalPurpose;
  living_arrangement: RentalLivingArrangement;
  tenancy_arrangement: TenancyArrangement;
  payment_method: RentalPaymentMethod;
};

export type SellerPostRequest = {
  id: string;
  seller_id: string;
  property_id?: string;
  title: string;
  status: 'submitted' | 'under_review' | 'approved' | 'changes_requested' | 'published';
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  property_type: PropertyType;
  asset_category?: PropertyCategory;
  listing_type: 'sale' | 'rent' | 'lease';
  rental_details?: RentalPreferences;
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

export type PropertyCategory = 'land' | 'housing' | 'commercial' | 'storage';

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

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

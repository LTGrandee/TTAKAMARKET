import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutGrid, List } from 'lucide-react';
import { PropertyCard, SearchBar } from '../../components/property';
import { Button, Select, EmptyState, CardSkeleton } from '../../components/ui';
import type { Property } from '../../lib/types';
import { cn } from '../../lib/utils';

const sortOptions = [{ value: 'newest', label: 'Newest First' }, { value: 'price_low', label: 'Price: Low to High' }, { value: 'price_high', label: 'Price: High to Low' }, { value: 'popular', label: 'Most Popular' }];

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filters = { search: searchParams.get('search') || '', type: searchParams.get('type') || '', category: searchParams.get('category') || '', listing_type: searchParams.get('listing_type') || '', city: searchParams.get('city') || '', rental_accommodation: searchParams.get('rental_accommodation') || '', rental_duration: searchParams.get('rental_duration') || '', sort: searchParams.get('sort') || 'newest' };

  useEffect(() => { fetchProperties(); }, [searchParams]);

  async function fetchProperties() {
    setLoading(true);
    try {
      const mockProperties: Property[] = [
        { id: '1', owner_id: 'mock', title: 'Prime Residential Land in Kololo', description: 'Beautiful plot in prime location', property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', country: 'Uganda', features: ['Garden', 'Parking'], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '2', owner_id: 'mock', title: 'Modern 4 Bedroom House in Muyenga', description: 'Spacious family home', property_type: 'house', listing_type: 'sale', price: 1200000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 450, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, parking_spaces: 2, address: 'Muyenga Tank Hill', city: 'Kampala', country: 'Uganda', features: ['Pool', 'Garden'], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '3', owner_id: 'mock', title: 'Commercial Plot in Industrial Area', description: 'Ideal for warehouse', property_type: 'commercial_land', listing_type: 'sale', price: 450000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 5000, size_unit: 'sqm', address: 'Industrial Area', city: 'Kampala', country: 'Uganda', features: ['Corner Plot'], amenities: [], status: 'published', verification_status: 'verified', views_count: 156, saves_count: 34, inquiries_count: 8, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '3', property_id: '3', image_url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '4', owner_id: 'mock', title: 'Luxury Apartment in Nakasero', description: 'Modern apartment with views', property_type: 'apartment', listing_type: 'rent', rental_details: { accommodation_type: 'residential', duration: 'long_term', purpose: 'living', living_arrangement: 'family', tenancy_arrangement: 'sole_tenant', payment_method: 'monthly' }, price: 3500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 120, size_unit: 'sqm', bedrooms: 2, bathrooms: 2, parking_spaces: 1, address: 'Nakasero Road', city: 'Kampala', country: 'Uganda', features: ['Balcony', 'Gym'], amenities: [], status: 'published', verification_status: 'verified', views_count: 312, saves_count: 89, inquiries_count: 34, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '4', property_id: '4', image_url: 'https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '5', owner_id: 'mock', title: 'Agricultural Land in Mukono', description: '50 acres of farmland', property_type: 'agricultural_land', listing_type: 'sale', price: 250000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 202343, size_unit: 'sqm', address: 'Mukono District', city: 'Mukono', country: 'Uganda', features: ['Water Source'], amenities: [], status: 'published', verification_status: 'verified', views_count: 98, saves_count: 23, inquiries_count: 5, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '5', property_id: '5', image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '6', owner_id: 'mock', title: 'Office Space in Kampala CBD', description: 'Modern office with parking', property_type: 'office_space', listing_type: 'rent', rental_details: { accommodation_type: 'commercial', duration: 'periodic', purpose: 'business', living_arrangement: 'corporate', tenancy_arrangement: 'leaseholder', payment_method: 'monthly' }, price: 8500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 200, size_unit: 'sqm', address: 'Kampala Road', city: 'Kampala', country: 'Uganda', features: ['AC', 'Elevator'], amenities: [], status: 'published', verification_status: 'verified', views_count: 167, saves_count: 41, inquiries_count: 15, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '6', property_id: '6', image_url: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '7', owner_id: 'mock', title: 'Hotel Room for a Short Stay in Entebbe', description: 'Short-stay accommodation. Confirm availability, inclusions and all terms directly before making a decision.', property_type: 'hotel_lodge', listing_type: 'rent', rental_details: { accommodation_type: 'holiday_short_stay', duration: 'short_term', purpose: 'holiday', living_arrangement: 'individual', tenancy_arrangement: 'lodger', payment_method: 'nightly' }, price: 180000, price_unit: 'UGX', currency: 'UGX', size_unit: 'room', bedrooms: 1, bathrooms: 1, address: 'Entebbe Road', city: 'Entebbe', country: 'Uganda', features: ['Furnished', 'Wi-Fi'], amenities: [], status: 'published', verification_status: 'verified', views_count: 0, saves_count: 0, inquiries_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '7', property_id: '7', image_url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
      ];

      let filtered = mockProperties;
      if (filters.type) filtered = filtered.filter(p => p.property_type === filters.type);
      if (filters.category) filtered = filtered.filter(p => (p.asset_category || getPropertyCategory(p.property_type)) === filters.category);
      if (filters.listing_type) filtered = filtered.filter(p => p.listing_type === filters.listing_type);
      if (filters.rental_accommodation) filtered = filtered.filter(p => p.rental_details?.accommodation_type === filters.rental_accommodation);
      if (filters.rental_duration) filtered = filtered.filter(p => p.rental_details?.duration === filters.rental_duration);
      if (filters.city) filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(search) || p.city.toLowerCase().includes(search) || p.address.toLowerCase().includes(search));
      }
      setProperties(filtered);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  function handleFilterChange(key: string, value: string) {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  }

  function clearFilters() { setSearchParams(new URLSearchParams()); }
  const hasActiveFilters = Object.values(filters).some((v) => v && v !== 'newest');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{filters.type ? `Properties` : 'All Properties'}</h1>
          <p className="mt-1 text-gray-500">Discover land, housing, commercial and storage property for sale, rent or lease.</p>
          <div className="mt-6"><SearchBar /></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">{loading ? 'Loading...' : `${properties.length} properties found`}</p>
            {hasActiveFilters && <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">Clear filters</button>}
          </div>
          <div className="flex items-center gap-4">
            <Select options={sortOptions} value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)} className="w-auto min-w-[180px]" />
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button onClick={() => setView('grid')} className={cn('p-2 rounded-md transition-colors', view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500')}><LayoutGrid className="h-4 w-4" /></button>
              <button onClick={() => setView('list')} className={cn('p-2 rounded-md transition-colors', view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500')}><List className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {loading ? (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => (<CardSkeleton key={i} />))}</div>) : properties.length === 0 ? (<EmptyState title="No properties found" description="Try adjusting your filters" action={<Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>} />) : (<div className={cn('grid gap-6', view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>{properties.map((property) => (<PropertyCard key={property.id} property={property} variant={view === 'list' ? 'horizontal' : 'default'} />))}</div>)}
      </div>
    </div>
  );
}

import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, Flag, Shield, CheckCircle, MessageSquare, ChevronLeft, ChevronRight, Building2, Clock, User } from 'lucide-react';
import { Badge, Card, Avatar, Modal, Input, Textarea, Loading } from '../../components/ui';
import type { Profile } from '../../lib/types';
import { formatPrice, getListingTypeLabel, getPropertyCategory, getPropertyCategoryLabel, getPropertyTypeLabel, getRentalLabel, getRentalPricePeriod, formatDate } from '../../lib/utils';
import { useAuth } from '../../context';

export function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { if (id) fetchProperty(); }, [id]);

  async function fetchProperty() {
    try {
      const mockProperty: Property = {
        id: id || '1', owner_id: 'mock', title: 'Prime Residential Land in Kololo',
        description: `Explore this property and review its stated details.\n\nBefore making a decision, independently confirm the property's tenure, boundaries, access, services and supporting documents with the relevant professionals.`,
        property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX',
        size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', region: 'Central', country: 'Uganda',
        latitude: 0.3284, longitude: 32.5894, features: ['Main Road Access', 'Electricity', 'Water', 'Surveyed', 'Garden'],
        amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString(),
        images: [
          { id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200', is_primary: true, display_order: 0, created_at: new Date().toISOString() },
          { id: '2', property_id: '1', image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200', is_primary: false, display_order: 1, created_at: new Date().toISOString() },
          { id: '3', property_id: '1', image_url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200', is_primary: false, display_order: 2, created_at: new Date().toISOString() },
        ],
        ...(id === '7' ? {
          title: 'Hotel Room for a Short Stay in Entebbe',
          description: 'Short-stay accommodation. Confirm availability, inclusions and all terms directly before making a decision.',
          property_type: 'hotel_lodge',
          listing_type: 'rent',
          rental_details: { accommodation_type: 'holiday_short_stay', duration: 'short_term', purpose: 'holiday', living_arrangement: 'individual', tenancy_arrangement: 'lodger', payment_method: 'nightly' },
          price: 180000,
          size_unit: 'room',
          bedrooms: 1,
          bathrooms: 1,
          address: 'Entebbe Road',
          city: 'Entebbe',
          region: 'Central',
          features: ['Furnished', 'Wi-Fi'],
          images: [{ id: '7', property_id: '7', image_url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }],
        } : {}),
      };
      const mockOwner: Profile = {
        id: 'mock-owner', email: 'owner@example.com', full_name: 'Mutesi Grace', phone: '+256 700 123 456',
        is_verified: true, verification_status: 'verified', user_type: 'owner', city: 'Kampala', country: 'Uganda',
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      };
      setProperty(mockProperty);
      setOwner(mockOwner);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  const handleSaveToggle = async () => {
    if (!user) { navigate('/login'); return; }
    setIsSaved(!isSaved);
  };

  const nextImage = () => {
    const images = property?.images;
    if (images && images.length > 0) setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    const images = property?.images;
    if (images && images.length > 0) setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) return <Loading fullScreen />;
  if (!property) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><EmptyState title="Property not found" description="The property doesn't exist or has been removed" action={<Link to="/properties"><Button variant="primary">Browse Properties</Button></Link>} /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">Home</Link><span>/</span>
            <Link to="/properties" className="hover:text-gray-900">Properties</Link><span>/</span>
            <Link to={`/properties?type=${property.property_type}`} className="hover:text-gray-900">{getPropertyTypeLabel(property.property_type)}</Link><span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative aspect-[16/10]">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img src={property.images[currentImageIndex].image_url} alt={property.title} className="w-full h-full object-cover" />
                    {property.images.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white"><ChevronLeft className="h-6 w-6" /></button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white"><ChevronRight className="h-6 w-6" /></button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {property.images.map((_, index) => (<button key={index} onClick={() => setCurrentImageIndex(index)} className={cn('w-2 h-2 rounded-full transition-colors', index === currentImageIndex ? 'bg-white' : 'bg-white/50')} />))}
                        </div>
                      </>
                    )}
                  </>
                ) : (<div className="w-full h-full bg-gray-100 flex items-center justify-center"><Building2 className="h-16 w-16 text-gray-300" /></div>)}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg"><Shield className="h-4 w-4 text-primary-600" /><span className="text-sm font-medium text-primary-700">Property listing</span></div>
              </div>
              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (<button key={image.id} onClick={() => setCurrentImageIndex(index)} className={cn('flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors', index === currentImageIndex ? 'border-primary-500' : 'border-transparent')}><img src={image.image_url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" /></button>))}
                </div>
              )}
            </div>

            <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2"><Badge variant="neutral">{getPropertyTypeLabel(property.property_type)}</Badge><Badge variant={property.listing_type === 'sale' ? 'accent' : 'primary'}>{getListingTypeLabel(property.listing_type, property.rental_details?.accommodation_type)}</Badge></div>
                  <h1 className="break-words text-2xl font-bold text-gray-900 md:text-3xl">{property.title}</h1>
                  <div className="mt-2 flex items-start gap-1 text-gray-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /><span className="break-words">{property.address}, {property.city}, {property.country}</span></div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={handleSaveToggle} className={cn('p-2 rounded-lg border transition-colors', isSaved ? 'bg-error-50 border-error-200 text-error-600' : 'border-gray-200 text-gray-500 hover:border-gray-300')}><Heart className={cn('h-5 w-5', isSaved && 'fill-current')} /></button>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300"><Share2 className="h-5 w-5" /></button>
                  <button onClick={() => setShowReportModal(true)} className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300"><Flag className="h-5 w-5" /></button>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-gray-900">{formatPrice(property.price, property.price_unit)}</span>{property.listing_type === 'rent' && <span className="text-gray-500">/{getRentalPricePeriod(property.rental_details?.payment_method)}</span>}</div>
                {property.rental_details?.accommodation_type === 'holiday_short_stay' && (
                  <p className="mt-2 text-xs leading-5 text-gray-500">For short stays, confirm availability, inclusions, price and payment terms with the property contact.</p>
                )}
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.size_sqm && <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Square className="h-5 w-5 text-primary-600" /><div><p className="text-xs text-gray-500">Size</p><p className="font-semibold text-gray-900">{property.size_sqm.toLocaleString()} {property.size_unit}</p></div></div>}
                {property.bedrooms && <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Bed className="h-5 w-5 text-primary-600" /><div><p className="text-xs text-gray-500">Bedrooms</p><p className="font-semibold text-gray-900">{property.bedrooms}</p></div></div>}
                {property.bathrooms && <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Bath className="h-5 w-5 text-primary-600" /><div><p className="text-xs text-gray-500">Bathrooms</p><p className="font-semibold text-gray-900">{property.bathrooms}</p></div></div>}
                {property.parking_spaces && <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><Building2 className="h-5 w-5 text-primary-600" /><div><p className="text-xs text-gray-500">Parking</p><p className="font-semibold text-gray-900">{property.parking_spaces}</p></div></div>}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">{property.description}</div>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">{property.features.map((feature) => (<Badge key={feature} variant="secondary"><CheckCircle className="h-3 w-3 mr-1" />{feature}</Badge>))}</div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
              <div className="relative aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400"><div className="text-center"><MapPin className="h-12 w-12 mx-auto mb-2" /><p>Property location</p><p className="text-sm text-gray-500 mt-1">{property.address}, {property.city}</p></div></div>
              </div>
              {property.listing_type === 'rent' && property.rental_details && (
                <div className="bg-primary-50 rounded-xl border border-primary-100 p-6">
                  <h2 className="text-lg font-semibold text-primary-900 mb-4">Rental suitability</h2>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-primary-800">
                    <p><strong>Accommodation:</strong> {getRentalLabel(property.rental_details.accommodation_type)}</p>
                    <p><strong>Duration:</strong> {getRentalLabel(property.rental_details.duration)}</p>
                    <p><strong>Purpose:</strong> {getRentalLabel(property.rental_details.purpose)}</p>
                    <p><strong>Arrangement:</strong> {getRentalLabel(property.rental_details.living_arrangement)}</p>
                    <p><strong>Tenancy:</strong> {getRentalLabel(property.rental_details.tenancy_arrangement)}</p>
                    <p><strong>Payment:</strong> {getRentalLabel(property.rental_details.payment_method)}</p>
                  </div>
                </div>
              )}
              <p className="mt-3 text-sm text-gray-500">{property.address}, {property.city}, {property.region && `${property.region}, `}{property.country}</p>
            </div>
          </div>

          <div className="min-w-0 space-y-6">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-4"><Avatar name={owner?.full_name} size="lg" /><div><div className="flex items-center gap-2"><h3 className="font-semibold text-gray-900">{owner?.full_name}</h3></div><p className="text-sm text-gray-500">Property owner or representative</p></div></div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4"><Clock className="h-4 w-4" /><span>Listed {formatDate(property.created_at)}</span></div>
              <div className="space-y-3">
                <Button variant="primary" className="w-full" leftIcon={<MessageSquare className="h-4 w-4" />} onClick={() => setShowContactModal(true)}>Enquire about property</Button>
                <Button variant="outline" className="w-full" leftIcon={<Calendar className="h-4 w-4" />} onClick={() => setShowAppointmentModal(true)}>{property.rental_details?.accommodation_type === 'holiday_short_stay' ? 'Ask about stay availability' : 'Request a viewing'}</Button>
              </div>
            </Card>

            <Card className="p-6 bg-primary-50 border-primary-200">
              <div className="flex items-center gap-3 mb-3"><Shield className="h-6 w-6 text-primary-600" /><h4 className="font-semibold text-primary-900">Review before you proceed</h4></div>
              <p className="text-sm text-primary-700">Independently confirm ownership, representative authority, property details and transaction terms before making a commitment.</p>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Property enquiry" size="md">
        {!user ? (<div className="text-center py-4"><User className="h-12 w-12 text-gray-300 mx-auto mb-4" /><h3 className="font-semibold text-gray-900 mb-2">Sign in to enquire</h3><p className="text-sm text-gray-500 mb-4">Sign in to continue your enquiry with the property owner or representative.</p><Link to="/login"><Button variant="primary">Sign in</Button></Link></div>) : (<div className="space-y-4"><Textarea label="Your message" placeholder="Write your property enquiry..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4} /><div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button variant="secondary" onClick={() => setShowContactModal(false)}>Close</Button><Button variant="primary" disabled>Send enquiry</Button></div></div>)}
      </Modal>

      <Modal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} title={property.rental_details?.accommodation_type === 'holiday_short_stay' ? 'Ask about stay availability' : 'Request a viewing'} size="md">
        <div className="space-y-4"><p className="text-sm text-gray-600">Share your preferred date and time for a viewing. Confirm the property contact&apos;s identity and authority before proceeding.</p><Input label="Preferred date" type="date" disabled /><Input label="Preferred time" type="time" disabled /><Textarea label="Your message" placeholder="Add details about your viewing request." rows={3} disabled /><div className="flex justify-end"><Button variant="secondary" onClick={() => setShowAppointmentModal(false)}>Close</Button></div></div>
      </Modal>

      <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)} title="Report This Property" size="md">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Flag inaccurate property information, suspected fraud or concerns about an intermediary.</p>
          <Select label="Reason" options={[{ value: 'fake_listing', label: 'Fake listing' }, { value: 'fraudulent_sale', label: 'Fraudulent or manipulative conduct' }, { value: 'impersonation', label: 'Owner or representative impersonation' }, { value: 'ownership_dispute', label: 'Ownership dispute' }, { value: 'misrepresentation', label: 'Misleading price, terms or property details' }, { value: 'other', label: 'Other' }]} placeholder="Select a reason" />
          <Textarea label="Details" placeholder="Please provide any additional details..." rows={4} />
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button variant="secondary" onClick={() => setShowReportModal(false)}>Close</Button><Button variant="danger" disabled>Submit report</Button></div>
        </div>
      </Modal>
    </div>
  );
}

export function NewPropertyPage({ submissionType = 'property' }: { submissionType?: 'property' | 'accommodation' }) {
  const isAccommodationSubmission = submissionType === 'accommodation';
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(() => ({
    title: '', description: '', asset_category: 'housing', property_type: isAccommodationSubmission ? 'hotel_lodge' : '', listing_type: isAccommodationSubmission ? 'rent' : '', listing_intent: isAccommodationSubmission ? 'book' : '', price: '', price_unit: 'UGX',
    size_sqm: '', size_unit: 'sqm', bedrooms: '', bathrooms: '', parking_spaces: '', year_built: '',
    address: '', city: '', region: '', country: 'Uganda', features: [] as string[], custom_feature: '',
    submitter_name: '', submitter_phone: '', submitter_email: '', submitter_role: '',
    contact_preference: 'owner',
    rental_accommodation: isAccommodationSubmission ? 'holiday_short_stay' : 'residential',
    rental_duration: isAccommodationSubmission ? 'short_term' : 'long_term',
    rental_purpose: isAccommodationSubmission ? 'holiday' : 'living',
    rental_living: 'individual', rental_tenancy: 'sole_tenant',
    rental_payment: isAccommodationSubmission ? 'nightly' : 'monthly',
  }));
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  const updateForm = (field: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({ ...prev, features: prev.features.includes(feature) ? prev.features.filter((f) => f !== feature) : [...prev.features, feature] }));
  };

  const handleSubmit = () => setSubmitted(true);

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.title && formData.description && formData.property_type && formData.listing_type && formData.price;
      case 2: return formData.address && formData.city && formData.submitter_name && formData.submitter_phone && formData.submitter_role;
      case 3: return true;
      case 4: return documents.length > 0 && images.length > 0;
      default: return true;
    }
  };

  const propertyTypes = [{ value: 'residential_land', label: 'Residential Land' }, { value: 'commercial_land', label: 'Commercial Land' }, { value: 'agricultural_land', label: 'Agricultural Land' }, { value: 'house', label: 'House' }, { value: 'apartment', label: 'Apartment' }, { value: 'rental_unit', label: 'Rental Unit' }, { value: 'commercial_building', label: 'Commercial Building' }, { value: 'office_space', label: 'Office Space' }, { value: 'warehouse', label: 'Warehouse' }, { value: 'hotel_lodge', label: 'Hotel / Lodge / Guest Room' }, { value: 'mixed_use', label: 'Mixed Use Development' }, { value: 'investment_property', label: 'Investment Property' }];
  const listingTypes = [{ value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }, { value: 'lease', label: 'For Lease' }, { value: 'book', label: 'Short Stay / Room Booking' }];
  const handleListingIntentChange = (value: string) => {
    if (value === 'book') {
      setFormData((prev) => ({
        ...prev,
        listing_type: 'rent',
        listing_intent: value,
        property_type: prev.property_type || 'hotel_lodge',
        rental_accommodation: 'holiday_short_stay',
        rental_duration: 'short_term',
        rental_purpose: 'holiday',
        rental_payment: 'nightly',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      listing_type: value,
      listing_intent: value,
      ...(value === 'rent' && prev.rental_accommodation === 'holiday_short_stay'
        ? { rental_accommodation: 'residential', rental_duration: 'long_term', rental_purpose: 'living', rental_payment: 'monthly' }
        : {}),
    }));
  };
  const cities = [{ value: 'Kampala', label: 'Kampala' }, { value: 'Entebbe', label: 'Entebbe' }, { value: 'Jinja', label: 'Jinja' }, { value: 'Mbarara', label: 'Mbarara' }, { value: 'Gulu', label: 'Gulu' }, { value: 'Arua', label: 'Arua' }, { value: 'Mbale', label: 'Mbale' }];
  const commonFeatures = ['Garden', 'Swimming Pool', 'Parking', 'Security', 'Air Conditioning', 'Balcony', 'Gym', 'Electricity', 'Water', 'Main Road Access', 'Corner Plot', 'Boundary Wall', 'Internet', 'Furnished'];
  const steps = [{ id: 1, title: 'Property Details' }, { id: 2, title: 'Location & Contact' }, { id: 3, title: 'Features' }, { id: 4, title: 'Photos & Documents' }, { id: 5, title: 'Review' }];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-xl p-8 text-center">
          <CheckCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">{isAccommodationSubmission ? 'Accommodation details ready' : 'Property details ready'}</h1>
          <p className="mt-3 text-gray-600">Your {isAccommodationSubmission ? 'accommodation' : 'property'} details are ready for administrator review.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/properties"><Button variant="outline">Browse Properties</Button></Link>
            <Link to="/register"><Button variant="primary">Create an optional dashboard account</Button></Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{isAccommodationSubmission ? 'Submit Accommodation' : 'Submit a Property'}</h1>
          <p className="mt-1 text-gray-500">{isAccommodationSubmission ? 'List a room, hotel, lodge or short-stay accommodation with clear availability and rates.' : 'Submit property details, photos and supporting documents for review. No account is needed for a one-time submission.'}</p>
          <div className="mt-8 flex w-full items-center">
            {steps.map((step, index) => (
              <div key={step.id} className={cn('flex min-w-0 items-center', index < steps.length - 1 && 'flex-1')}>
                <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2', currentStep >= step.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500')}>
                    {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : <span>{step.id}</span>}
                    <span className="hidden sm:inline">{isAccommodationSubmission && step.id === 1 ? 'Accommodation Details' : step.title}</span>
                </div>
                {index < steps.length - 1 && <div className={cn('mx-1 h-0.5 min-w-1 flex-1 sm:w-8 sm:flex-none', currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200')} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-4 sm:p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">{isAccommodationSubmission ? 'Accommodation Details' : 'Property Details'}</h2><Input label={isAccommodationSubmission ? 'Accommodation Name' : 'Property Title'} placeholder={isAccommodationSubmission ? 'e.g., Furnished Guest Room in Entebbe' : 'e.g., Modern 4 Bedroom House in Muyenga'} value={formData.title} onChange={(e) => updateForm('title', e.target.value)} /></div>
              <Textarea label="Description" placeholder="Describe your property in detail" value={formData.description} onChange={(e) => updateForm('description', e.target.value)} rows={5} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="Asset category" options={[{ value: 'land', label: 'Land' }, { value: 'housing', label: 'Housing' }, { value: 'commercial', label: 'Commercial' }, { value: 'storage', label: 'Storage / Industrial' }]} value={formData.asset_category} onChange={(e) => updateForm('asset_category', e.target.value)} />
                <Select label={isAccommodationSubmission ? 'Accommodation property type' : 'Property Type'} options={isAccommodationSubmission ? propertyTypes.filter(({ value }) => ['house', 'apartment', 'rental_unit', 'hotel_lodge'].includes(value)) : propertyTypes} value={formData.property_type} onChange={(e) => updateForm('property_type', e.target.value)} placeholder={isAccommodationSubmission ? 'Select accommodation type' : 'Select property type'} />
                {!isAccommodationSubmission && <Select label="Offer Type" options={listingTypes} value={formData.listing_intent} onChange={(e) => handleListingIntentChange(e.target.value)} placeholder="Choose how the property is offered" />}
              </div>
              {formData.listing_type === 'rent' && (
                <div className="rounded-xl border border-primary-100 bg-primary-50 p-4 space-y-4">
                  <div><h3 className="font-semibold text-primary-900">Rental and accommodation details</h3><p className="text-xs text-primary-700 mt-1">Specify the accommodation type, stay duration and rate basis.</p></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Select label="Accommodation type" options={[{ value: 'residential', label: 'Residential home' }, { value: 'room', label: 'Room / shared home' }, { value: 'commercial', label: 'Commercial premises' }, { value: 'holiday_short_stay', label: 'Short stay / hotel, lodge or room booking' }, { value: 'storage_industrial', label: 'Storage / industrial' }]} value={formData.rental_accommodation} onChange={(e) => updateForm('rental_accommodation', e.target.value)} />
                    <Select label="Available duration" options={[{ value: 'short_term', label: 'Days / weeks' }, { value: 'medium_term', label: 'Weeks / months' }, { value: 'long_term', label: 'Year or longer' }, { value: 'periodic', label: 'Weekly / monthly periodic' }]} value={formData.rental_duration} onChange={(e) => updateForm('rental_duration', e.target.value)} />
                    <Select label="Suitable purpose" options={[{ value: 'living', label: 'Living' }, { value: 'student', label: 'Student' }, { value: 'holiday', label: 'Holiday' }, { value: 'temporary_work', label: 'Temporary work' }, { value: 'business', label: 'Business' }, { value: 'storage', label: 'Storage' }]} value={formData.rental_purpose} onChange={(e) => updateForm('rental_purpose', e.target.value)} />
                    <Select label="Preferred renter arrangement" options={[{ value: 'individual', label: 'Individual' }, { value: 'couple', label: 'Couple' }, { value: 'family', label: 'Family' }, { value: 'student', label: 'Student' }, { value: 'group', label: 'Group' }, { value: 'corporate', label: 'Corporate' }]} value={formData.rental_living} onChange={(e) => updateForm('rental_living', e.target.value)} />
                    <Select label="Tenancy arrangement" options={[{ value: 'sole_tenant', label: 'Sole tenant' }, { value: 'joint_tenants', label: 'Joint tenants' }, { value: 'subtenant', label: 'Subtenant' }, { value: 'leaseholder', label: 'Leaseholder' }, { value: 'lodger', label: 'Lodger' }]} value={formData.rental_tenancy} onChange={(e) => updateForm('rental_tenancy', e.target.value)} />
                    <Select label="Rate / payment basis" options={[{ value: 'daily', label: 'Per day' }, { value: 'nightly', label: 'Per night' }, { value: 'weekly', label: 'Per week' }, { value: 'monthly', label: 'Per month' }, { value: 'advance', label: 'Several months in advance' }, { value: 'corporate_paid', label: 'Company-paid' }, { value: 'subsidised', label: 'Subsidised' }]} value={formData.rental_payment} onChange={(e) => updateForm('rental_payment', e.target.value)} />
                  </div>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Price" type="number" placeholder="e.g., 500000000" value={formData.price} onChange={(e) => updateForm('price', e.target.value)} />
                <Select label="Currency" options={[{ value: 'UGX', label: 'Ugandan Shilling (UGX)' }, { value: 'USD', label: 'US Dollar (USD)' }]} value={formData.price_unit} onChange={(e) => updateForm('price_unit', e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="Size (sqm)" type="number" placeholder="e.g., 500" value={formData.size_sqm} onChange={(e) => updateForm('size_sqm', e.target.value)} />
                {['house', 'apartment', 'rental_unit', 'hotel_lodge'].includes(formData.property_type) && (<><Input label="Bedrooms / rooms" type="number" placeholder={formData.property_type === 'hotel_lodge' ? 'e.g., 1' : 'e.g., 4'} value={formData.bedrooms} onChange={(e) => updateForm('bedrooms', e.target.value)} /><Input label="Bathrooms" type="number" placeholder="e.g., 3" value={formData.bathrooms} onChange={(e) => updateForm('bathrooms', e.target.value)} /></>)}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">{isAccommodationSubmission ? 'Accommodation location' : 'Property location'}</h2><Input label="Address or nearby landmark" placeholder={isAccommodationSubmission ? 'e.g., Near Entebbe Airport' : 'e.g., Plot 45, Kololo Hill Drive'} value={formData.address} onChange={(e) => updateForm('address', e.target.value)} leftIcon={<MapPin className="h-5 w-5" />} required /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="City" options={cities} value={formData.city} onChange={(e) => updateForm('city', e.target.value)} placeholder="Select city" required />
                <Input label="Region/District" placeholder="e.g., Central Region" value={formData.region} onChange={(e) => updateForm('region', e.target.value)} />
              </div>
              <div className="border-t border-gray-100 pt-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Your contact details</h2>
                <p className="text-sm text-gray-500 mb-4">No login details are needed. Provide contact details so TtakaMarket can follow up about your submission.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your name" placeholder="Full name" value={formData.submitter_name} onChange={(e) => updateForm('submitter_name', e.target.value)} required />
                  <Input label="Phone number" type="tel" placeholder="+256 700 123 456" value={formData.submitter_phone} onChange={(e) => updateForm('submitter_phone', e.target.value)} required />
                  <Input label="Email (optional)" type="email" placeholder="you@example.com" value={formData.submitter_email} onChange={(e) => updateForm('submitter_email', e.target.value)} />
                  <Select label="Your relationship to the property" options={[{ value: 'owner', label: 'I am the owner' }, { value: 'representative', label: 'I am authorised to represent the owner' }, { value: 'other', label: 'I am helping the owner submit' }]} value={formData.submitter_role} onChange={(e) => updateForm('submitter_role', e.target.value)} placeholder="Select your relationship" required />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">Features & Amenities</h2><p className="text-sm text-gray-500 mb-4">Select all features that apply</p><div className="flex flex-wrap gap-2 mb-4">{commonFeatures.map((feature) => (<button key={feature} type="button" onClick={() => toggleFeature(feature)} className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-colors', formData.features.includes(feature) ? 'bg-primary-100 text-primary-700 border border-primary-300' : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300')}>{feature}</button>))}</div></div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">{isAccommodationSubmission ? 'Accommodation photos and supporting documents' : 'Photos and supporting documents'}</h2><p className="text-sm text-gray-500 mb-4">Include {isAccommodationSubmission ? 'accommodation photos and relevant supporting records, permits or evidence of authority to represent the owner.' : 'property photos and supporting title or tenure records, survey plans, agreements, identification, or evidence of authority to represent the owner.'}</p>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="property-photos" className="mb-2 block text-sm font-medium text-gray-700">{isAccommodationSubmission ? 'Accommodation photos (at least one)' : 'Property photos (at least one)'}</label>
                    <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && setImages((current) => [...current, ...Array.from(e.target.files ?? [])])} className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:font-semibold file:text-primary-700 hover:file:bg-primary-100" id="property-photos" />
                    {images.length > 0 && <ul className="mt-2 space-y-1 text-sm text-gray-600">{images.map((image, index) => <li key={`${image.name}-${index}`} className="flex justify-between gap-3"><span className="truncate">{image.name}</span><button type="button" onClick={() => setImages((current) => current.filter((_, i) => i !== index))} className="text-error-600 hover:text-error-700">Remove</button></li>)}</ul>}
                  </div>
                  <div>
                    <label htmlFor="documents" className="mb-2 block text-sm font-medium text-gray-700">{isAccommodationSubmission ? 'Accommodation documents (at least one)' : 'Property documents (at least one)'}</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={(e) => e.target.files && setDocuments((current) => [...current, ...Array.from(e.target.files ?? [])])} className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:font-semibold file:text-primary-700 hover:file:bg-primary-100" id="documents" />
                    {documents.length > 0 && <ul className="mt-2 space-y-1 text-sm text-gray-600">{documents.map((doc, index) => <li key={`${doc.name}-${index}`} className="flex justify-between gap-3"><span className="truncate">{doc.name}</span><button type="button" onClick={() => setDocuments((current) => current.filter((_, i) => i !== index))} className="text-error-600 hover:text-error-700">Remove</button></li>)}</ul>}
                  </div>
                </div>
                {documents.length > 0 && (<div className="mt-4 space-y-2">{documents.map((doc, index) => (<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><span className="text-sm text-gray-700">{doc.name}</span></div><button onClick={() => setDocuments(documents.filter((_, i) => i !== index))} className="text-error-600 hover:text-error-700">Remove</button></div>))}</div>)}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">Review your {isAccommodationSubmission ? 'accommodation' : 'property'} details</h2><p className="text-sm text-gray-500 mb-4">Confirm the details below before completing your submission.</p><div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">{isAccommodationSubmission ? 'Accommodation Name' : 'Property Title'}</p><p className="font-medium text-gray-900">{formData.title}</p></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Asset category</p><p className="font-medium text-gray-900">{getPropertyCategoryLabel(formData.asset_category)}</p></div>
                  <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">{isAccommodationSubmission ? 'Accommodation property type' : 'Property Type'}</p><p className="font-medium text-gray-900">{propertyTypes.find(t => t.value === formData.property_type)?.label}</p></div>
                  {!isAccommodationSubmission && <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Offer Type</p><p className="font-medium text-gray-900">{listingTypes.find(t => t.value === formData.listing_intent)?.label}</p></div>}
                </div>
                {formData.listing_type === 'rent' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Rental and accommodation details</p>
                    <div className="grid gap-2 text-sm text-gray-800 sm:grid-cols-2">
                      <p><strong>Accommodation:</strong> {getRentalLabel(formData.rental_accommodation)}</p>
                      <p><strong>Duration:</strong> {getRentalLabel(formData.rental_duration)}</p>
                      <p><strong>Purpose:</strong> {getRentalLabel(formData.rental_purpose)}</p>
                      <p><strong>Rate basis:</strong> {getRentalLabel(formData.rental_payment)}</p>
                    </div>
                  </div>
                )}
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Price</p><p className="font-medium text-gray-900">{Number(formData.price).toLocaleString()} {formData.price_unit}</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Location</p><p className="font-medium text-gray-900">{formData.address}, {formData.city}, {formData.country}</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Submitted by</p><p className="font-medium text-gray-900">{formData.submitter_name} · {formData.submitter_phone}</p><p className="text-sm text-gray-600">{formData.submitter_role === 'owner' ? 'Owner' : formData.submitter_role === 'representative' ? 'Authorised representative' : 'Other submitter'}</p></div>
                <p className="text-sm text-gray-500">{images.length} photo(s) and {documents.length} document(s) selected.</p>
                <Select label="Buyer chat contact" options={[{ value: 'owner', label: 'Chat directly with me (the owner)' }, { value: 'representative', label: 'Chat with my lawful representative' }, { value: 'ttakamarket', label: 'Let TtakaMarket coordinate all chats' }]} value={formData.contact_preference} onChange={(e) => updateForm('contact_preference', e.target.value)} />
                {formData.features.length > 0 && (<div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-2">Features</p><div className="flex flex-wrap gap-2">{formData.features.map(feature => (<Badge key={feature} variant="secondary">{feature}</Badge>))}</div></div>)}
              </div></div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
            {currentStep > 1 && <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>}
            <div className="flex-1" />
            {currentStep < 5 ? (<Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)} disabled={!isStepValid()}>Next</Button>) : (<Button variant="primary" onClick={handleSubmit}>Finish {isAccommodationSubmission ? 'accommodation' : 'property'} details</Button>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

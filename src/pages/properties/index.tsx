import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LayoutGrid, List } from 'lucide-react';
import { PropertyCard, SearchBar } from '../../components/property';
import { Button, Select, EmptyState, CardSkeleton } from '../../components/ui';
import type { Property } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

const sortOptions = [{ value: 'newest', label: 'Newest First' }, { value: 'price_low', label: 'Price: Low to High' }, { value: 'price_high', label: 'Price: High to Low' }, { value: 'popular', label: 'Most Popular' }];

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filters = { search: searchParams.get('search') || '', type: searchParams.get('type') || '', listing_type: searchParams.get('listing_type') || '', city: searchParams.get('city') || '', sort: searchParams.get('sort') || 'newest' };

  useEffect(() => { fetchProperties(); }, [searchParams]);

  async function fetchProperties() {
    setLoading(true);
    try {
      const mockProperties: Property[] = [
        { id: '1', owner_id: 'mock', title: 'Prime Residential Land in Kololo', description: 'Beautiful plot in prime location', property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', country: 'Uganda', features: ['Garden', 'Parking'], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '2', owner_id: 'mock', title: 'Modern 4 Bedroom House in Muyenga', description: 'Spacious family home', property_type: 'house', listing_type: 'sale', price: 1200000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 450, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, parking_spaces: 2, address: 'Muyenga Tank Hill', city: 'Kampala', country: 'Uganda', features: ['Pool', 'Garden'], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/259588?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '3', owner_id: 'mock', title: 'Commercial Plot in Industrial Area', description: 'Ideal for warehouse', property_type: 'commercial_land', listing_type: 'sale', price: 450000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 5000, size_unit: 'sqm', address: 'Industrial Area', city: 'Kampala', country: 'Uganda', features: ['Corner Plot'], amenities: [], status: 'published', verification_status: 'verified', views_count: 156, saves_count: 34, inquiries_count: 8, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '3', property_id: '3', image_url: 'https://images.pexels.com/photos/323780?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '4', owner_id: 'mock', title: 'Luxury Apartment in Nakasero', description: 'Modern apartment with views', property_type: 'apartment', listing_type: 'rent', price: 3500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 120, size_unit: 'sqm', bedrooms: 2, bathrooms: 2, parking_spaces: 1, address: 'Nakasero Road', city: 'Kampala', country: 'Uganda', features: ['Balcony', 'Gym'], amenities: [], status: 'published', verification_status: 'verified', views_count: 312, saves_count: 89, inquiries_count: 34, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '4', property_id: '4', image_url: 'https://images.pexels.com/photos/1918290?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '5', owner_id: 'mock', title: 'Agricultural Land in Mukono', description: '50 acres of farmland', property_type: 'agricultural_land', listing_type: 'sale', price: 250000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 202343, size_unit: 'sqm', address: 'Mukono District', city: 'Mukono', country: 'Uganda', features: ['Water Source'], amenities: [], status: 'published', verification_status: 'verified', views_count: 98, saves_count: 23, inquiries_count: 5, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '5', property_id: '5', image_url: 'https://images.pexels.com/photos/1595104?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '6', owner_id: 'mock', title: 'Office Space in Kampala CBD', description: 'Modern office with parking', property_type: 'office_space', listing_type: 'rent', price: 8500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 200, size_unit: 'sqm', address: 'Kampala Road', city: 'Kampala', country: 'Uganda', features: ['AC', 'Elevator'], amenities: [], status: 'published', verification_status: 'verified', views_count: 167, saves_count: 41, inquiries_count: 15, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '6', property_id: '6', image_url: 'https://images.pexels.com/photos/1595104?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
      ];

      let filtered = mockProperties;
      if (filters.type) filtered = filtered.filter(p => p.property_type === filters.type);
      if (filters.listing_type) filtered = filtered.filter(p => p.listing_type === filters.listing_type);
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
          <p className="mt-1 text-gray-500">Browse verified properties from trusted owners</p>
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
import type { Profile } from '../../lib/supabase';
import { formatPrice, getPropertyTypeLabel, formatDate } from '../../lib/utils';
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
        description: `This is a rare opportunity to own a prime piece of residential land in one of Kampala's most prestigious neighborhoods. Kololo is known for its diplomatic residences, upscale homes, and excellent infrastructure.\n\nKey Features:\n• 2,500 square meters of flat, developable land\n• Already surveyed with clear boundaries\n• Main road access with electricity and water available\n• Peaceful and secure neighborhood\n• Perfect for building your dream home or investment property\n\nLocation:\nLocated on Kololo Hill Drive, just 5 minutes from the city center.\n\nDocumentation:\n• Clean land title (Mailo Land)\n• Survey plan available\n• All transfer documents ready`,
        property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX',
        size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', region: 'Central', country: 'Uganda',
        latitude: 0.3284, longitude: 32.5894, features: ['Main Road Access', 'Electricity', 'Water', 'Surveyed', 'Garden'],
        amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString(),
        images: [
          { id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399?w=1200', is_primary: true, display_order: 0, created_at: new Date().toISOString() },
          { id: '2', property_id: '1', image_url: 'https://images.pexels.com/photos/1396122?w=1200', is_primary: false, display_order: 1, created_at: new Date().toISOString() },
          { id: '3', property_id: '1', image_url: 'https://images.pexels.com/photos/1732414?w=1200', is_primary: false, display_order: 2, created_at: new Date().toISOString() },
        ],
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                {property.verification_status === 'verified' && <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg"><Shield className="h-4 w-4 text-primary-600" /><span className="text-sm font-medium text-primary-700">Verified Property</span></div>}
              </div>
              {property.images && property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((image, index) => (<button key={image.id} onClick={() => setCurrentImageIndex(index)} className={cn('flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors', index === currentImageIndex ? 'border-primary-500' : 'border-transparent')}><img src={image.image_url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" /></button>))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2"><Badge variant="neutral">{getPropertyTypeLabel(property.property_type)}</Badge><Badge variant={property.listing_type === 'sale' ? 'accent' : 'primary'}>{property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}</Badge></div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center gap-1 mt-2 text-gray-500"><MapPin className="h-4 w-4" /><span>{property.address}, {property.city}, {property.country}</span></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSaveToggle} className={cn('p-2 rounded-lg border transition-colors', isSaved ? 'bg-error-50 border-error-200 text-error-600' : 'border-gray-200 text-gray-500 hover:border-gray-300')}><Heart className={cn('h-5 w-5', isSaved && 'fill-current')} /></button>
                  <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300"><Share2 className="h-5 w-5" /></button>
                  <button onClick={() => setShowReportModal(true)} className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300"><Flag className="h-5 w-5" /></button>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-baseline gap-2"><span className="text-3xl font-bold text-gray-900">{formatPrice(property.price, property.price_unit)}</span>{property.listing_type === 'rent' && <span className="text-gray-500">/month</span>}</div>
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
                <div className="absolute inset-0 flex items-center justify-center text-gray-400"><div className="text-center"><MapPin className="h-12 w-12 mx-auto mb-2" /><p>Interactive map coming soon</p><p className="text-sm text-gray-500 mt-1">{property.address}, {property.city}</p></div></div>
              </div>
              <p className="mt-3 text-sm text-gray-500">{property.address}, {property.city}, {property.region && `${property.region}, `}{property.country}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-4"><Avatar name={owner?.full_name} size="lg" /><div><div className="flex items-center gap-2"><h3 className="font-semibold text-gray-900">{owner?.full_name}</h3>{owner?.is_verified && <Shield className="h-4 w-4 text-primary-600" />}</div><p className="text-sm text-gray-500">Verified Property Owner</p></div></div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4"><Clock className="h-4 w-4" /><span>Listed {formatDate(property.created_at)}</span></div>
              <div className="space-y-3">
                <Button variant="primary" className="w-full" leftIcon={<MessageSquare className="h-4 w-4" />} onClick={() => setShowContactModal(true)}>Contact Owner</Button>
                <Button variant="outline" className="w-full" leftIcon={<Calendar className="h-4 w-4" />} onClick={() => setShowAppointmentModal(true)}>Schedule Viewing</Button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Property Statistics</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-2xl font-bold text-gray-900">{property.views_count}</p><p className="text-xs text-gray-500">Views</p></div>
                  <div><p className="text-2xl font-bold text-gray-900">{property.saves_count}</p><p className="text-xs text-gray-500">Saved</p></div>
                  <div><p className="text-2xl font-bold text-gray-900">{property.inquiries_count}</p><p className="text-xs text-gray-500">Inquiries</p></div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary-50 border-primary-200">
              <div className="flex items-center gap-3 mb-3"><Shield className="h-6 w-6 text-primary-600" /><h4 className="font-semibold text-primary-900">Verified Property</h4></div>
              <p className="text-sm text-primary-700 mb-3">This property has been verified by our team. The owner's identity and ownership documents have been confirmed.</p>
              <div className="flex flex-wrap gap-2"><Badge variant="primary" size="sm"><CheckCircle className="h-3 w-3 mr-1" />Owner Verified</Badge><Badge variant="primary" size="sm"><CheckCircle className="h-3 w-3 mr-1" />Documents Verified</Badge></div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Contact Property Owner" size="md">
        {!user ? (<div className="text-center py-6"><User className="h-12 w-12 text-gray-300 mx-auto mb-4" /><h3 className="font-semibold text-gray-900 mb-2">Sign in to send a message</h3><p className="text-sm text-gray-500 mb-4">You need an account to contact property owners</p><Link to="/login"><Button variant="primary">Sign In</Button></Link></div>) : (<div className="space-y-4"><Textarea label="Your Message" placeholder="Hi, I'm interested in this property..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4} /><div className="flex gap-3"><Button variant="secondary" onClick={() => setShowContactModal(false)}>Cancel</Button><Button variant="primary" disabled={!message.trim()}>Send Message</Button></div></div>)}
      </Modal>

      <Modal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} title="Schedule a Viewing" size="md">
        {!user ? (<div className="text-center py-6"><Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" /><h3 className="font-semibold text-gray-900 mb-2">Sign in to schedule a viewing</h3><p className="text-sm text-gray-500 mb-4">You need an account to book viewings</p><Link to="/login"><Button variant="primary">Sign In</Button></Link></div>) : (<div className="space-y-4"><Input label="Preferred Date" type="date" /><Input label="Preferred Time" type="time" /><Textarea label="Message (optional)" placeholder="Any specific questions?" rows={3} /><div className="flex gap-3"><Button variant="secondary" onClick={() => setShowAppointmentModal(false)}>Cancel</Button><Button variant="primary">Request Viewing</Button></div></div>)}
      </Modal>

      <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)} title="Report This Property" size="md">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">If you believe this listing is fraudulent or violates our terms, please report it. Our team will investigate within 24 hours.</p>
          <Select label="Reason" options={[{ value: 'fake_listing', label: 'Fake Listing' }, { value: 'fraudulent_sale', label: 'Fraudulent Sale' }, { value: 'impersonation', label: 'Owner Impersonation' }, { value: 'ownership_dispute', label: 'Ownership Dispute' }, { value: 'misrepresentation', label: 'Misrepresentation' }, { value: 'other', label: 'Other' }]} placeholder="Select a reason" />
          <Textarea label="Details" placeholder="Please provide any additional details..." rows={4} />
          <div className="flex gap-3"><Button variant="secondary" onClick={() => setShowReportModal(false)}>Cancel</Button><Button variant="danger">Submit Report</Button></div>
        </div>
      </Modal>
    </div>
  );
}

export function NewPropertyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', property_type: '', listing_type: '', price: '', price_unit: 'UGX',
    size_sqm: '', size_unit: 'sqm', bedrooms: '', bathrooms: '', parking_spaces: '', year_built: '',
    address: '', city: '', region: '', country: 'Uganda', features: [] as string[], custom_feature: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  const updateForm = (field: string, value: string | string[]) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({ ...prev, features: prev.features.includes(feature) ? prev.features.filter((f) => f !== feature) : [...prev.features, feature] }));
  };

  const handleSubmit = async () => {
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    try {
      const propertyData = { owner_id: user.id, title: formData.title, description: formData.description, property_type: formData.property_type, listing_type: formData.listing_type, price: parseFloat(formData.price), price_unit: formData.price_unit, size_sqm: formData.size_sqm ? parseFloat(formData.size_sqm) : null, size_unit: formData.size_unit, bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null, bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null, parking_spaces: formData.parking_spaces ? parseInt(formData.parking_spaces) : null, year_built: formData.year_built ? parseInt(formData.year_built) : null, address: formData.address, city: formData.city, region: formData.region, country: formData.country, features: formData.features, amenities: [], status: 'pending', verification_status: 'pending' };
      await supabase.from('properties').insert(propertyData);
      navigate('/dashboard?success=true');
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.title && formData.description && formData.property_type && formData.listing_type && formData.price;
      case 2: return formData.address && formData.city;
      case 3: return true;
      case 4: return documents.length > 0;
      default: return true;
    }
  };

  const propertyTypes = [{ value: 'residential_land', label: 'Residential Land' }, { value: 'commercial_land', label: 'Commercial Land' }, { value: 'agricultural_land', label: 'Agricultural Land' }, { value: 'house', label: 'House' }, { value: 'apartment', label: 'Apartment' }, { value: 'rental_unit', label: 'Rental Unit' }, { value: 'commercial_building', label: 'Commercial Building' }, { value: 'office_space', label: 'Office Space' }, { value: 'warehouse', label: 'Warehouse' }, { value: 'hotel_lodge', label: 'Hotel / Lodge' }, { value: 'mixed_use', label: 'Mixed Use Development' }, { value: 'investment_property', label: 'Investment Property' }];
  const listingTypes = [{ value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }, { value: 'lease', label: 'For Lease' }];
  const cities = [{ value: 'Kampala', label: 'Kampala' }, { value: 'Entebbe', label: 'Entebbe' }, { value: 'Jinja', label: 'Jinja' }, { value: 'Mbarara', label: 'Mbarara' }, { value: 'Gulu', label: 'Gulu' }, { value: 'Arua', label: 'Arua' }, { value: 'Mbale', label: 'Mbale' }];
  const commonFeatures = ['Garden', 'Swimming Pool', 'Parking', 'Security', 'Air Conditioning', 'Balcony', 'Gym', 'Electricity', 'Water', 'Main Road Access', 'Corner Plot', 'Boundary Wall', 'Internet', 'Furnished'];
  const steps = [{ id: 1, title: 'Property Details' }, { id: 2, title: 'Location' }, { id: 3, title: 'Features' }, { id: 4, title: 'Documents' }, { id: 5, title: 'Review' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">List a Property</h1>
          <p className="mt-1 text-gray-500">Submit your property for verification</p>
          <div className="mt-8 flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={cn('flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium', currentStep >= step.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500')}>
                  {currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : <span>{step.id}</span>}
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && <div className={cn('w-8 h-0.5 mx-1', currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200')} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h2><Input label="Property Title" placeholder="e.g., Modern 4 Bedroom House in Muyenga" value={formData.title} onChange={(e) => updateForm('title', e.target.value)} /></div>
              <Textarea label="Description" placeholder="Describe your property in detail" value={formData.description} onChange={(e) => updateForm('description', e.target.value)} rows={5} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="Property Type" options={propertyTypes} value={formData.property_type} onChange={(e) => updateForm('property_type', e.target.value)} placeholder="Select property type" />
                <Select label="Listing Type" options={listingTypes} value={formData.listing_type} onChange={(e) => updateForm('listing_type', e.target.value)} placeholder="Select listing type" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Price" type="number" placeholder="e.g., 500000000" value={formData.price} onChange={(e) => updateForm('price', e.target.value)} />
                <Select label="Currency" options={[{ value: 'UGX', label: 'Ugandan Shilling (UGX)' }, { value: 'USD', label: 'US Dollar (USD)' }]} value={formData.price_unit} onChange={(e) => updateForm('price_unit', e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="Size (sqm)" type="number" placeholder="e.g., 500" value={formData.size_sqm} onChange={(e) => updateForm('size_sqm', e.target.value)} />
                {['house', 'apartment', 'rental_unit'].includes(formData.property_type) && (<><Input label="Bedrooms" type="number" placeholder="e.g., 4" value={formData.bedrooms} onChange={(e) => updateForm('bedrooms', e.target.value)} /><Input label="Bathrooms" type="number" placeholder="e.g., 3" value={formData.bathrooms} onChange={(e) => updateForm('bathrooms', e.target.value)} /></>)}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2><Input label="Address" placeholder="e.g., Plot 45, Kololo Hill Drive" value={formData.address} onChange={(e) => updateForm('address', e.target.value)} leftIcon={<MapPin className="h-5 w-5" />} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="City" options={cities} value={formData.city} onChange={(e) => updateForm('city', e.target.value)} placeholder="Select city" />
                <Input label="Region/District" placeholder="e.g., Central Region" value={formData.region} onChange={(e) => updateForm('region', e.target.value)} />
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
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Documents</h2><p className="text-sm text-gray-500 mb-4">Upload documents to verify ownership. Required: Land Title, Survey Plan, etc.</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={(e) => e.target.files && setDocuments([...documents, ...Array.from(e.target.files)])} className="hidden" id="documents" />
                  <label htmlFor="documents" className="cursor-pointer"><div className="h-10 w-10 text-gray-400 mx-auto mb-2">Upload</div><p className="text-sm text-gray-600 text-center">Click to upload documents</p><p className="text-xs text-gray-400 text-center mt-1">PDF, JPG, PNG up to 10MB each</p></label>
                </div>
                {documents.length > 0 && (<div className="mt-4 space-y-2">{documents.map((doc, index) => (<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><span className="text-sm text-gray-700">{doc.name}</span></div><button onClick={() => setDocuments(documents.filter((_, i) => i !== index))} className="text-error-600 hover:text-error-700">Remove</button></div>))}</div>)}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div><h2 className="text-lg font-semibold text-gray-900 mb-4">Review Your Listing</h2><div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Property Title</p><p className="font-medium text-gray-900">{formData.title}</p></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Property Type</p><p className="font-medium text-gray-900">{propertyTypes.find(t => t.value === formData.property_type)?.label}</p></div>
                  <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Listing Type</p><p className="font-medium text-gray-900">{listingTypes.find(t => t.value === formData.listing_type)?.label}</p></div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Price</p><p className="font-medium text-gray-900">{Number(formData.price).toLocaleString()} {formData.price_unit}</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-1">Location</p><p className="font-medium text-gray-900">{formData.address}, {formData.city}, {formData.country}</p></div>
                {formData.features.length > 0 && (<div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500 mb-2">Features</p><div className="flex flex-wrap gap-2">{formData.features.map(feature => (<Badge key={feature} variant="secondary">{feature}</Badge>))}</div></div>)}
              </div></div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
            {currentStep > 1 && <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>}
            <div className="flex-1" />
            {currentStep < 5 ? (<Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)} disabled={!isStepValid()}>Next</Button>) : (<Button variant="primary" loading={loading} onClick={handleSubmit}>Submit for Verification</Button>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

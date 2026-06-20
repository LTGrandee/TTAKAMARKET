import { Link, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, MessageSquare, ArrowRight, Star, Search, SlidersHorizontal, Home, Key, Tag, Building2, BedDouble, Bath, Square, MapPin, Heart, Handshake, Headphones, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Property } from '../lib/supabase';
import { formatPrice } from '../lib/utils';
import { cn } from '../lib/utils';
const heroImg = 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600';

const categories = [
  { label: 'Houses', href: '/properties?type=house', icon: <Home className="h-7 w-7" /> },
  { label: 'Apartments', href: '/properties?type=apartment', icon: <Building2 className="h-7 w-7" /> },
  { label: 'Townhouses', href: '/properties?type=rental_unit', icon: <Building2 className="h-7 w-7" /> },
  { label: 'Land', href: '/properties?type=residential_land', icon: <MapPin className="h-7 w-7" /> },
  { label: 'Commercial', href: '/properties?type=commercial_building', icon: <Building2 className="h-7 w-7" /> },
  { label: 'Short Lets', href: '/properties?listing_type=rent', icon: <Key className="h-7 w-7" /> },
];

const trustPoints = [
  { icon: <Shield className="h-6 w-6" />, title: '100% Verified', desc: 'Every property is verified' },
  { icon: <Users className="h-6 w-6" />, title: 'Trusted Owners', desc: 'Direct contact with owners' },
  { icon: <Handshake className="h-6 w-6" />, title: 'Secure Deals', desc: 'Safe & transparent transactions' },
  { icon: <Headphones className="h-6 w-6" />, title: '24/7 Support', desc: "We're here to help you" },
];

const mockFeatured: Property[] = [
  { id: '1', owner_id: 'mock', title: 'Modern Villa in Kira', description: '', property_type: 'house', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 250, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, address: 'Kira', city: 'Wakiso', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
  { id: '2', owner_id: 'mock', title: 'Luxury Apartment in Ntinda', description: '', property_type: 'apartment', listing_type: 'rent', price: 2800000, price_unit: 'UGX', currency: 'UGX', size_sqm: 120, size_unit: 'sqm', bedrooms: 2, bathrooms: 2, address: 'Ntinda', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
  { id: '3', owner_id: 'mock', title: 'Elegant Home in Entebbe', description: '', property_type: 'house', listing_type: 'sale', price: 120000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 180, size_unit: 'sqm', bedrooms: 3, bathrooms: 2, address: 'Entebbe', city: 'Wakiso', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 312, saves_count: 89, inquiries_count: 34, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '3', property_id: '3', image_url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
];

function FeaturedCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const primaryImage = property.images?.find(i => i.is_primary) || property.images?.[0];

  return (
    <Link to={`/properties/${property.id}`} className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={primaryImage?.image_url} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">Verified</span>
        </div>
        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved); }} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
          <Heart className={cn('h-4 w-4 transition-colors', saved ? 'fill-error-500 text-error-500' : 'text-gray-400')} />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            {property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-primary-600">
          {formatPrice(property.price, property.price_unit)}
          {property.listing_type === 'rent' && <span className="text-sm font-normal text-gray-500"> / month</span>}
        </p>
        <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        <div className="flex items-center gap-3 mt-3 text-gray-500 text-sm">
          {property.bedrooms && <div className="flex items-center gap-1"><BedDouble className="h-4 w-4" /><span>{property.bedrooms}</span></div>}
          {property.bathrooms && <div className="flex items-center gap-1"><Bath className="h-4 w-4" /><span>{property.bathrooms}</span></div>}
          {property.size_sqm && <div className="flex items-center gap-1"><Square className="h-4 w-4" /><span>{property.size_sqm} m²</span></div>}
        </div>
      </div>
    </Link>
  );
}

const priceRanges = [
  { value: '', label: 'Price Range' },
  { value: '0-50000000', label: 'Under UGX 50M' },
  { value: '50000000-200000000', label: 'UGX 50M – 200M' },
  { value: '200000000-500000000', label: 'UGX 200M – 500M' },
  { value: '500000000-1000000000', label: 'UGX 500M – 1B' },
  { value: '1000000000-', label: 'Above UGX 1B' },
];

const propertyTypeOpts = [
  { value: '', label: 'Property Type' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'residential_land', label: 'Residential Land' },
  { value: 'commercial_land', label: 'Commercial Land' },
  { value: 'commercial_building', label: 'Commercial Building' },
  { value: 'office_space', label: 'Office Space' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>(mockFeatured);
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('properties').select('*, images:property_images(*)').eq('status', 'published').eq('verification_status', 'verified').order('created_at', { ascending: false }).limit(6);
        if (data && data.length > 0) setFeaturedProperties(data);
      } catch { /* use mock */ }
    })();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (propertyType) params.set('type', propertyType);
    if (activeTab === 'buy') params.set('listing_type', 'sale');
    else if (activeTab === 'rent') params.set('listing_type', 'rent');
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[560px] flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="Luxury Property" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-900/75" />
        </div>

        <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/40 rounded-full px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-accent-400" />
              <span className="text-sm font-medium text-accent-300">Verified Owners. Direct Deals. No Middlemen.</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Africa's Trusted Property<br />
              <span className="text-accent-500">Marketplace</span>
            </h1>
            <p className="text-lg text-white/80 mb-8">Buy, sell, or rent properties with confidence.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/properties">
                <button className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg">
                  Browse Properties <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link to="/register?type=owner">
                <button className="inline-flex items-center gap-2 border-2 border-white/70 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  <Home className="h-5 w-5" /> List Property
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 mb-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-5 gap-6">
            {(['buy', 'rent', 'sell'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex items-center gap-2 pb-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px',
                  activeTab === tab
                    ? 'border-accent-500 text-accent-500'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                )}
              >
                {tab === 'buy' && <Home className="h-4 w-4" />}
                {tab === 'rent' && <Key className="h-4 w-4" />}
                {tab === 'sell' && <Tag className="h-4 w-4" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by city, area or property..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full appearance-none pl-9 pr-8 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 bg-white"
              >
                {propertyTypeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">UGX</span>
              <select
                className="w-full appearance-none pl-12 pr-8 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 bg-white"
              >
                {priceRanges.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
          >
            Search Properties <Search className="h-5 w-5" />
          </button>

          <div className="mt-3 text-center">
            <button onClick={() => navigate('/properties')} className="inline-flex items-center gap-1.5 text-sm text-accent-500 hover:text-accent-600 font-medium">
              More filters <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-primary-600">Explore by Category</h2>
          <Link to="/properties" className="flex items-center gap-1 text-sm text-accent-500 hover:text-accent-600 font-medium">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.href}
              className="group flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-accent-300 transition-all duration-200"
            >
              <div className="text-primary-600 group-hover:text-accent-500 transition-colors">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-accent-500 text-center transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-primary-600">Featured Properties</h2>
          <Link to="/properties" className="flex items-center gap-1 text-sm text-accent-500 hover:text-accent-600 font-medium">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {featuredProperties.map(p => <FeaturedCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-primary-600 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustPoints.map((tp) => (
              <div key={tp.title} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 text-white">
                  {tp.icon}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{tp.title}</p>
                  <p className="text-primary-200 text-xs mt-0.5">{tp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + How it works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-600 mb-3">How TtakaMarket Works</h2>
            <p className="text-gray-500">A simple, transparent process for safe property transactions</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Owner Registration', desc: 'Property owners create an account and submit verification documents.', icon: <Users className="h-6 w-6 text-white" /> },
              { num: '02', title: 'Verification', desc: 'We verify ownership documents, national ID, and property details.', icon: <Shield className="h-6 w-6 text-white" /> },
              { num: '03', title: 'Publication', desc: 'Verified properties are listed with the trusted verification badge.', icon: <CheckCircle className="h-6 w-6 text-white" /> },
              { num: '04', title: 'Direct Connection', desc: 'Buyers connect directly with verified property owners.', icon: <MessageSquare className="h-6 w-6 text-white" /> },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-gray-100">{step.num}</span>
                <h3 className="font-bold text-primary-600 mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-600 mb-3">Trusted by Thousands</h2>
            <p className="text-gray-500">See what our users say about TtakaMarket</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'John K.', city: 'Kampala', initials: 'JK', review: 'I had been looking for land for years but was afraid of fraud. TtakaMarket gave me the confidence to finally make a purchase.' },
              { name: 'Sarah M.', city: 'Entebbe', initials: 'SM', review: 'As a property owner, I was tired of dealing with fake brokers. Now I connect directly with genuine buyers.' },
              { name: 'Peter O.', city: 'Jinja', initials: 'PO', review: 'I found my office space in just 2 weeks. The owner was verified, the paperwork was legit. Highly recommended!' },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 text-accent-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-primary-200 mb-8">Join thousands of verified property owners, buyers, and tenants who trust TtakaMarket.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg">
                Get Started Free
              </button>
            </Link>
            <Link to="/properties">
              <button className="border-2 border-white/70 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Browse Properties
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

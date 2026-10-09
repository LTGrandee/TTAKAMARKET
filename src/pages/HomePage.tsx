import { Link, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, MessageSquare, ArrowRight, Star, Search, SlidersHorizontal, Home, Key, Tag, Building2, BedDouble, Bath, Square, MapPin, Heart, Handshake, Headphones, Users, TreePine, AlertTriangle, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Property } from '../lib/types';
import { formatPrice, getListingTypeLabel } from '../lib/utils';
import { cn } from '../lib/utils';

const HERO_IMG = 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600';

const categories = [
  { label: 'Houses', href: '/properties?type=house', Icon: Home },
  { label: 'Apartments', href: '/properties?type=apartment', Icon: Building2 },
  { label: 'Townhouses', href: '/properties?type=rental_unit', Icon: Building2 },
  { label: 'Land', href: '/properties?category=land', Icon: MapPin },
  { label: 'Housing', href: '/properties?category=housing', Icon: Home },
  { label: 'Commercial', href: '/properties?category=commercial', Icon: Building2 },
  { label: 'Short Lets', href: '/properties?listing_type=rent', Icon: TreePine },
];

const trustPoints = [
  { Icon: Shield, title: '100% Verified', desc: 'Every property is verified' },
  { Icon: Users, title: 'Trusted Contacts', desc: 'Chat with owners or lawful representatives' },
  { Icon: Handshake, title: 'Secure Deals', desc: 'Safe & transparent transactions' },
  { Icon: Headphones, title: '24/7 Support', desc: "We're here to help you" },
];

const MOCK_FEATURED: Property[] = [
  { id: '1', owner_id: 'mock', title: 'Modern Villa in Kira', description: '', property_type: 'house', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 250, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, address: 'Kira', city: 'Wakiso', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=600', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
  { id: '2', owner_id: 'mock', title: 'Luxury Apartment in Ntinda', description: '', property_type: 'apartment', listing_type: 'rent', price: 2800000, price_unit: 'UGX', currency: 'UGX', size_sqm: 120, size_unit: 'sqm', bedrooms: 2, bathrooms: 2, address: 'Ntinda', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?w=600', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
  { id: '3', owner_id: 'mock', title: 'Elegant Home in Entebbe', description: '', property_type: 'house', listing_type: 'sale', price: 120000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 180, size_unit: 'sqm', bedrooms: 3, bathrooms: 2, address: 'Entebbe', city: 'Wakiso', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 312, saves_count: 89, inquiries_count: 34, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '3', property_id: '3', image_url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?w=600', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
  { id: '4', owner_id: 'mock', title: 'Prime Land in Mbarara', description: '', property_type: 'residential_land', listing_type: 'sale', price: 45000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 800, size_unit: 'sqm', address: 'Mbarara', city: 'Mbarara', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 98, saves_count: 21, inquiries_count: 7, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '4', property_id: '4', image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=600', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
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

const priceRanges = [
  { value: '', label: 'Price Range' },
  { value: '0-50000000', label: 'Under UGX 50M' },
  { value: '50000000-200000000', label: 'UGX 50M – 200M' },
  { value: '200000000-500000000', label: 'UGX 200M – 500M' },
  { value: '500000000-', label: 'Above UGX 500M' },
];

function FeaturedCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const img = property.images?.find(i => i.is_primary) || property.images?.[0];
  return (
    <Link to={`/properties/${property.id}`} className="flex-shrink-0 w-56 sm:w-64 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-40 overflow-hidden">
        <img src={img?.image_url} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2">
          <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-0.5 rounded">Verified</span>
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow"
        >
          <Heart className={cn('h-3.5 w-3.5 transition-colors', saved ? 'fill-error-500 text-error-500' : 'text-gray-400')} />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className="bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            {getListingTypeLabel(property.listing_type)}
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-base font-bold text-primary-600 leading-tight">
          {formatPrice(property.price, property.price_unit)}
          {property.listing_type === 'rent' && <span className="text-xs font-normal text-gray-500"> / month</span>}
          {property.listing_type === 'lease' && <span className="text-xs font-normal text-gray-500"> / term</span>}
        </p>
        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-gray-400 text-xs pt-2 border-t border-gray-50">
          {property.bedrooms && <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms}</span>}
          {property.bathrooms && <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms}</span>}
          {property.size_sqm && <span className="flex items-center gap-1"><Square className="h-3.5 w-3.5" />{property.size_sqm} m²</span>}
        </div>
      </div>
    </Link>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<Property[]>(MOCK_FEATURED);
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    // Using mock data for demonstration
  }, []);

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (search) p.set('search', search);
    if (propertyType) p.set('type', propertyType);
    if (activeTab === 'buy') p.set('listing_type', 'sale');
    else if (activeTab === 'rent') p.set('listing_type', 'rent');
    navigate(`/properties?${p.toString()}`);
  };

  return (
    <div className="bg-gray-50">

      {/* ── HERO ── */}
      <section className="relative h-64 sm:h-72 md:h-96">
        <img src={HERO_IMG} alt="Luxury property" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary-900/72" />
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-5 md:px-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent-500/25 border border-accent-400/50 rounded-full px-3 py-1 mb-3 w-fit">
            <Shield className="h-3.5 w-3.5 text-accent-400" />
            <span className="text-xs font-semibold text-accent-300">Verified Owners. Direct Deals.</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
            Africa's Trusted<br className="sm:hidden" /> Property <span className="text-accent-500">Marketplace</span>
          </h1>
          <p className="text-sm md:text-base text-white/75 mb-4">Buy, sell, or rent properties with confidence.</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link to="/properties">
              <button className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors shadow-lg">
                Browse Properties <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link to="/register?type=owner">
              <button className="inline-flex items-center gap-2 border border-white/60 hover:border-white text-white font-semibold text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-colors">
                <Home className="h-4 w-4" /> Submit a Property
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEARCH CARD ── */}
      <div className="px-4 -mt-4 sm:-mt-6 relative z-10 mb-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-100 mb-4">
            {(['buy', 'rent', 'sell'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex items-center gap-1.5 pb-2.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px',
                  activeTab === tab ? 'border-accent-500 text-accent-500' : 'border-transparent text-gray-400 hover:text-gray-600'
                )}
              >
                {tab === 'buy' && <Home className="h-4 w-4" />}
                {tab === 'rent' && <Key className="h-4 w-4" />}
                {tab === 'sell' && <Tag className="h-4 w-4" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search by city, area or property..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative">
              <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                className="w-full appearance-none pl-8 pr-6 py-2.5 border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400 bg-white"
              >
                {propertyTypeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold pointer-events-none">UGX</span>
              <select
                className="w-full appearance-none pl-9 pr-6 py-2.5 border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400 bg-white"
              >
                {priceRanges.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Search Properties <Search className="h-4 w-4" />
          </button>
          <div className="mt-2.5 text-center">
            <button
              onClick={() => navigate('/properties')}
              className="inline-flex items-center gap-1 text-xs text-accent-500 hover:text-accent-600 font-semibold"
            >
              More filters <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── EXPLORE BY CATEGORY ── */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Explore by Category</h2>
          <Link to="/properties" className="flex items-center gap-0.5 text-xs font-semibold text-accent-500">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {categories.map(({ label, href, Icon }) => (
            <Link
              key={label}
              to={href}
              className="group flex flex-col items-center gap-1.5 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-accent-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-accent-50 transition-colors">
                <Icon className="h-5 w-5 text-primary-600 group-hover:text-accent-500 transition-colors" />
              </div>
              <span className="text-xs font-semibold text-gray-700 group-hover:text-accent-500 text-center transition-colors leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3 px-4">
          <h2 className="text-base font-bold text-gray-900">Featured Properties</h2>
          <Link to="/properties" className="flex items-center gap-0.5 text-xs font-semibold text-accent-500">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {featured.map(p => <FeaturedCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-primary-600 px-4 py-8">
        <div className="grid grid-cols-2 gap-5 max-w-4xl mx-auto">
          {trustPoints.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-primary-200 mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-error-100 text-error-700 text-xs font-bold px-3 py-1 rounded-full mb-3">The Problem</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Fraud is a Major Issue in Africa</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Every day, thousands of people lose money through fake listings, fraudulent brokers, and ownership disputes.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { Icon: AlertTriangle, title: 'Fake Listings', desc: "Fraudulent properties that don't exist" },
              { Icon: Users, title: 'Fake Brokers', desc: 'Impersonators claiming to represent owners' },
              { Icon: TrendingUp, title: 'Hidden Costs', desc: 'Inflated commissions and surprise fees' },
              { Icon: Shield, title: 'Ownership Disputes', desc: 'Properties with unclear ownership' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-4 border border-error-100 shadow-sm">
                <div className="w-10 h-10 bg-error-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-error-500" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">How TtakaMarket Works</h2>
            <p className="text-sm text-gray-500">A simple, transparent process for safe property transactions</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '01', title: 'Owner Registration', desc: 'Property owners create an account and submit verification documents.', Icon: Users },
              { num: '02', title: 'Verification', desc: 'We verify ownership documents, national ID, and property details.', Icon: Shield },
              { num: '03', title: 'Publication', desc: 'Verified properties are listed with the trusted verification badge.', Icon: CheckCircle },
              { num: '04', title: 'Managed Connection', desc: 'Buyers chat with the owner or lawful representative through TtakaMarket.', Icon: MessageSquare },
            ].map(({ num, title, desc, Icon }) => (
              <div key={num} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-black text-gray-100 leading-none">{num}</span>
                <h3 className="font-bold text-primary-600 text-sm mt-1 mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SOLUTION ── */}
      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-success-100 text-success-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Our Solution</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification First. Trust Always.</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Before any property is listed, we verify both the owner and the ownership documents.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {[
              { color: 'bg-primary-50 border-primary-100', iconBg: 'bg-primary-600', Icon: CheckCircle, title: 'Verified Owners', desc: 'Every property owner is verified using government ID and ownership documents before they can list on our platform.' },
              { color: 'bg-success-50 border-success-100', iconBg: 'bg-success-600', Icon: Shield, title: 'Verified Properties', desc: 'Land titles, survey plans, and ownership certificates are verified by our team before publication.' },
              { color: 'bg-accent-50 border-accent-100', iconBg: 'bg-accent-500', Icon: MessageSquare, title: 'Managed Communication', desc: 'Chat with the owner or lawful representative through TtakaMarket, with no hidden fees.' },
            ].map(({ color, iconBg, Icon, title, desc }) => (
              <div key={title} className={`flex gap-4 p-4 rounded-xl border ${color}`}>
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-primary-600 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Our Promise</h3>
            <p className="text-sm text-primary-200 mb-4">Verify the Owner. Verify the Property. Build Trust.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-primary-200">
              {['No fake listings', 'No fraudulent brokers', 'No hidden costs'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs"><CheckCircle className="h-4 w-4 text-primary-300" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">Trusted by Thousands</h2>
            <p className="text-sm text-gray-500">See what our users say about TtakaMarket</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible">
            {[
              { name: 'John K.', city: 'Kampala', initials: 'JK', review: '"I had been looking for land for years but was afraid of fraud. TtakaMarket gave me the confidence to finally make a purchase."' },
              { name: 'Sarah M.', city: 'Entebbe', initials: 'SM', review: '"As a property owner, I was tired of dealing with fake brokers. Now I connect directly with genuine buyers."' },
              { name: 'Peter O.', city: 'Jinja', initials: 'PO', review: '"I found my office space in just 2 weeks. The owner was verified, the paperwork was legit. Highly recommended!"' },
            ].map((t) => (
              <div key={t.name} className="flex-shrink-0 w-72 sm:w-auto bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-0.5 text-accent-500 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{t.review}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xs">{t.initials}</div>
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

      {/* ── CTA ── */}
      <section className="bg-primary-600 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Find Your Perfect Property?</h2>
          <p className="text-sm text-primary-200 mb-6">Find verified property opportunities, or submit your land or housing property for TtakaMarket to verify and advertise on your behalf.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register">
              <button className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg text-sm">
                Get Started Free
              </button>
            </Link>
            <Link to="/properties">
              <button className="w-full sm:w-auto border border-white/60 hover:border-white text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm">
                Browse Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

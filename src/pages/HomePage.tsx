import { Link, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, MessageSquare, ArrowRight, Search, SlidersHorizontal, Home, Key, Tag, Building2, BedDouble, Bath, Square, MapPin, Heart, Handshake, Headphones, Users, TreePine, AlertTriangle, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import type { Property } from '../lib/types';
import { formatPrice, getListingTypeLabel, getRentalPricePeriod } from '../lib/utils';
import { cn } from '../lib/utils';

const HERO_IMG = 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1600';

const categories = [
  { label: 'Houses', href: '/properties?type=house', Icon: Home },
  { label: 'Apartments', href: '/properties?type=apartment', Icon: Building2 },
  { label: 'Short stays', href: '/properties?listing_type=rent&rental_accommodation=holiday_short_stay', Icon: BedDouble },
  { label: 'Land', href: '/properties?category=land', Icon: MapPin },
  { label: 'Commercial', href: '/properties?category=commercial', Icon: Building2 },
  { label: 'Storage', href: '/properties?category=storage', Icon: Building2 },
  { label: 'Rentals', href: '/properties?listing_type=rent', Icon: TreePine },
];

const trustPoints = [
  { Icon: Shield, title: 'Administrator review', desc: 'Review workflows for ownership and representative authority' },
  { Icon: Users, title: 'Clear representation', desc: 'Designed to identify owners and authorised representatives' },
  { Icon: Handshake, title: 'Accountable enquiries', desc: 'A clearer route to the owner or authorised contact' },
  { Icon: Headphones, title: 'One marketplace', desc: 'Land, homes, short stays, business and storage' },
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
  { value: 'hotel_lodge', label: 'Hotel / Lodge' },
  { value: 'residential_land', label: 'Residential Land' },
  { value: 'commercial_land', label: 'Commercial Land' },
  { value: 'commercial_building', label: 'Commercial Building' },
  { value: 'office_space', label: 'Office Space' },
];

function FeaturedCard({ property }: { property: Property }) {
  const [saved, setSaved] = useState(false);
  const img = property.images?.find(i => i.is_primary) || property.images?.[0];
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/properties/${property.id}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={img?.image_url} alt={property.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-2 left-2">
          <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-0.5 rounded">Featured property</span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            {getListingTypeLabel(property.listing_type, property.rental_details?.accommodation_type)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold leading-tight text-primary-700">
          {formatPrice(property.price, property.price_unit)}
          {property.listing_type === 'rent' && <span className="text-xs font-normal text-gray-500"> / {getRentalPricePeriod(property.rental_details?.payment_method)}</span>}
          {property.listing_type === 'lease' && <span className="text-xs font-normal text-gray-500"> / term</span>}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-3 text-sm text-gray-600">
          {property.bedrooms && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{property.bedrooms}</span>}
          {property.bathrooms && <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms}</span>}
          {property.size_sqm && <span className="flex items-center gap-1"><Square className="h-4 w-4" />{property.size_sqm} m²</span>}
        </div>
      </div>
      </Link>
      <button type="button" onClick={() => setSaved(value => !value)} aria-label={saved ? 'Remove from saved properties' : 'Save property'} aria-pressed={saved} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-colors hover:bg-white hover:text-error-600">
        <Heart className={cn('h-5 w-5', saved && 'fill-error-500 text-error-500')} />
      </button>
    </article>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const featured = MOCK_FEATURED;
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'lease' | 'book'>('buy');
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (search) p.set('search', search);
    if (propertyType) p.set('type', propertyType);
    if (city) p.set('city', city);
    if (activeTab === 'buy') p.set('listing_type', 'sale');
    else if (activeTab === 'rent') p.set('listing_type', 'rent');
    else if (activeTab === 'lease') p.set('listing_type', 'lease');
    else if (activeTab === 'book') {
      p.set('listing_type', 'rent');
      p.set('rental_accommodation', 'holiday_short_stay');
      p.set('rental_duration', 'short_term');
    }
    navigate(`/properties?${p.toString()}`);
  };

  return (
    <div className="bg-gray-50">

      {/* ── HERO ── */}
      <section className="relative min-h-[24rem] overflow-hidden sm:min-h-[28rem] lg:min-h-[34rem]">
        <img src={HERO_IMG} alt="Luxury property" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/25" />
        <div className="relative mx-auto flex min-h-[24rem] w-full max-w-7xl flex-col justify-center px-5 py-12 sm:min-h-[28rem] sm:px-8 lg:min-h-[34rem] lg:px-10">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur">
            <Shield className="h-3.5 w-3.5 text-accent-400" />
            <span className="text-xs font-semibold text-white sm:text-sm">Land, homes and more · Across Uganda</span>
          </div>
          <h1 className="mb-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Uganda&apos;s Trusted <span className="text-accent-400">Property (Real-Estate &amp; Accommodation) Marketplace</span>
          </h1>
          <p className="mb-7 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">Find property across Uganda with clearer ownership, representation, pricing and contact information—helping you navigate the complex web of fraudulent and manipulative intermediaries.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/properties" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-600 px-5 text-sm font-bold text-white shadow-lg transition hover:bg-accent-700 sm:px-6">
                Browse properties <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/properties/new" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/45 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:px-6">
                <Home className="h-4 w-4" /> Submit a property
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEARCH CARD ── */}
      <div className="relative z-10 mx-auto -mt-8 mb-8 max-w-6xl px-4 sm:-mt-10 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl shadow-primary-900/10 sm:p-6">
          {/* Tabs */}
          <div className="mb-4 flex gap-2 border-b border-gray-100 sm:gap-5">
            {(['buy', 'rent', 'lease', 'book'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={cn(
                  'mb-[-1px] flex min-h-11 items-center gap-2 border-b-2 px-3 text-sm font-semibold capitalize transition-colors sm:px-4',
                  activeTab === tab ? 'border-accent-600 text-accent-700' : 'border-transparent text-gray-500 hover:text-gray-900'
                )}
              >
                {tab === 'buy' && <Home className="h-4 w-4" />}
                {tab === 'rent' && <Key className="h-4 w-4" />}
                {tab === 'lease' && <Tag className="h-4 w-4" />}
                {tab === 'book' && <BedDouble className="h-4 w-4" />}
                {tab === 'book' ? 'Book' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {activeTab === 'book' && (
            <p className="mb-3 text-xs leading-5 text-gray-500">
              Find short stays, including hotel rooms, with daily or nightly rates. Booking and payment features are in development.
            </p>
          )}

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search by city, area or property..."
              className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          {/* Dropdowns */}
          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                {propertyTypeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <select value={city} onChange={e => setCity(e.target.value)} className="h-12 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
              <option value="">Any location</option>
              {['Kampala', 'Wakiso', 'Entebbe', 'Jinja', 'Mbarara', 'Mukono', 'Gulu', 'Arua', 'Mbale'].map(name => <option key={name} value={name}>{name}</option>)}
            </select>
            <button onClick={handleSearch} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-700 px-6 text-sm font-bold text-white transition hover:bg-primary-800">
              Search <Search className="h-4 w-4" />
            </button>
          </div>

          <button onClick={() => navigate('/properties')} className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-accent-700">
            More filters <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── EXPLORE BY CATEGORY ── */}
      <section id="categories" className="mx-auto mb-12 max-w-7xl scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div><p className="text-xs font-bold uppercase tracking-wider text-accent-700">Find your fit</p><h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">Explore by category</h2></div>
          <Link to="/properties" className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-accent-700">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categories.map(({ label, href, Icon }) => (
            <Link
              key={label}
              to={href}
              className="group flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-accent-50">
                <Icon className="h-5 w-5 text-primary-700 transition-colors group-hover:text-accent-700" />
              </div>
              <span className="text-sm font-semibold leading-tight text-gray-700 transition-colors group-hover:text-accent-700">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <div><p className="text-xs font-bold uppercase tracking-wider text-accent-700">A place to start</p><h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">Featured properties</h2></div>
          <Link to="/properties" className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-accent-700">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(p => <FeaturedCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-primary-800 px-4 py-8 sm:py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
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
      <section id="property-guidance" className="scroll-mt-20 bg-gray-50 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="mb-3 inline-block rounded-full bg-error-100 px-3 py-1 text-xs font-bold text-error-700">The problem</span>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">The Complex Web of Untrustworthy (Fraudulent and Manipulative) Intermediaries in the Real Estate Market.</h2>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              In a chain of property hand-offs, buyers and renters can struggle to identify the real owner or confirm whether an intermediary has authority to act. When deceptive, manipulative or unauthorised intermediaries present property without the owner&apos;s knowledge, change prices and details along the way, or exploit trust for personal gain, the result can be fraud, manipulation and wasted time for both property seekers and owners.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { Icon: AlertTriangle, title: 'Unclear ownership', desc: 'It can be hard to establish who owns a property and who has the right to offer it.' },
              { Icon: Users, title: 'Unlawful or unauthorised intermediaries', desc: 'A person may claim to represent an owner without their knowledge or permission.' },
              { Icon: TrendingUp, title: 'Manipulated prices and details', desc: 'Prices, ownership claims or property terms may change as information passes from person to person.' },
              { Icon: Shield, title: 'No accountable contact path', desc: 'When the real owner and authorised representative are unclear, misleading claims are harder to challenge.' },
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
          <p className="mx-auto mt-5 max-w-2xl text-center text-xs leading-5 text-gray-500">
            TtakaMarket is being developed to address this complex web by bringing ownership, representative authority and contact information into clearer view. Always verify property documents and a representative&apos;s authority independently before making a commitment.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="scroll-mt-20 bg-white px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">How TtakaMarket Works</h2>
            <p className="text-sm text-gray-500">Property submission, review and enquiry workflows</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { num: '01', title: 'Submit details', desc: 'Owners or lawful representatives share property information and supporting documents.', Icon: Users },
              { num: '02', title: 'Administrator review', desc: 'Review workflows cover documents, representative authority and property details.', Icon: Shield },
              { num: '03', title: 'Publication decision', desc: 'Administrator approval determines whether a property is ready to publish.', Icon: CheckCircle },
              { num: '04', title: 'Accountable enquiries', desc: 'Enquiry routes connect property seekers with owners and authorised representatives.', Icon: MessageSquare },
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
          <p className="mt-5 rounded-xl border border-warning-200 bg-warning-50 p-4 text-center text-xs leading-5 text-warning-800">
            Submission review, document checks, site surveys and enquiry handling are being developed as part of the service.
          </p>
        </div>
      </section>

      {/* ── OUR SOLUTION ── */}
      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block bg-success-100 text-success-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Our Solution</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Countering untrustworthy intermediation with transparency</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">TtakaMarket is developing safeguards against fraud and manipulation by clarifying who submits a property, their authority to represent the owner, the offer details and the enquiry route.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {[
              { color: 'bg-primary-50 border-primary-100', iconBg: 'bg-primary-600', Icon: CheckCircle, title: 'Submission review', desc: 'Administrator review covers identity, ownership or tenure documents, and authority to represent the owner.' },
              { color: 'bg-success-50 border-success-100', iconBg: 'bg-success-600', Icon: Shield, title: 'Site survey coordination', desc: "The process is designed to check the property's location, size, access and condition before publication." },
              { color: 'bg-accent-50 border-accent-100', iconBg: 'bg-accent-500', Icon: MessageSquare, title: 'Managed enquiries', desc: 'Approved contact arrangements can connect people with the owner, representative or TtakaMarket.' },
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
            <h3 className="text-lg font-bold text-white mb-2">Designed to make property offers more accountable</h3>
            <p className="text-sm text-primary-200 mb-4">Check the details. Confirm authority. Ask questions before making a commitment.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-primary-200">
              {['Land, homes and short stays', 'Buy, rent, lease or book', 'Administrator review'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs"><CheckCircle className="h-4 w-4 text-primary-300" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT SERVES ── */}
      <section className="px-4 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-600 mb-2">Property options for different needs</h2>
            <p className="text-sm text-gray-500">Explore, rent, buy, lease or submit property through one managed marketplace.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Buyers', city: 'Find a property', initials: 'BY', review: 'Browse land, housing, commercial premises and storage or industrial spaces offered for sale, rent or lease.' },
              { name: 'Renters & short-stay guests', city: 'Find a place to stay', initials: 'RT', review: 'Explore long- or short-term stays, including hotel rooms, with daily or nightly rates where provided.' },
              { name: 'Owners & representatives', city: 'Submit for review', initials: 'OR', review: 'Share property details for administrator review. One-time submission does not require an account.' },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-center gap-0.5 text-accent-500 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide">TtakaMarket</span>
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
          <h2 className="text-2xl font-bold text-white mb-3">Start your property search</h2>
          <p className="text-sm text-primary-200 mb-6">Explore land, homes, short stays and business spaces—or submit a property for review without an account.</p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/properties" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent-600 px-8 text-sm font-bold text-white shadow-lg transition-colors hover:bg-accent-700">
              Browse properties
            </Link>
            <Link to="/properties/new" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/60 px-8 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
              Submit property without an account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

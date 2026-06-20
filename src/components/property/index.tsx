import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Shield } from 'lucide-react';
import type { Property } from '../../lib/supabase';
import { formatPrice, getPropertyTypeLabel, cn } from '../../lib/utils';
import { Badge } from '../ui';
import { useState } from 'react';

interface PropertyCardProps { property: Property; variant?: 'default' | 'compact' | 'horizontal'; className?: string; }
export function PropertyCard({ property, variant = 'default', className }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const primaryImage = property.images?.find((img) => img.is_primary) || property.images?.[0];
  const imageUrl = primaryImage?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
  const handleSaveToggle = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setIsSaved(!isSaved); };

  if (variant === 'horizontal') {
    return (
      <Link to={`/properties/${property.id}`} className={cn('bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex overflow-hidden group', className)}>
        <div className="relative w-48 sm:w-64 flex-shrink-0">
          {!imageError
            ? <img src={imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={() => setImageError(true)} />
            : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Square className="h-12 w-12 text-gray-300" /></div>}
          {property.verification_status === 'verified' && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary-600 rounded px-2 py-0.5 text-xs font-semibold text-white">
              <Shield className="h-3 w-3" /> Verified
            </div>
          )}
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="neutral" size="sm">{getPropertyTypeLabel(property.property_type)}</Badge>
              <h3 className="mt-2 font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{property.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500"><MapPin className="h-4 w-4" /><span>{property.city}, {property.country}</span></div>
            </div>
            <button onClick={handleSaveToggle} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart className={cn('h-5 w-5 transition-colors', isSaved ? 'fill-error-500 text-error-500' : 'text-gray-400')} />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            {property.bedrooms && <div className="flex items-center gap-1"><Bed className="h-4 w-4" /><span>{property.bedrooms}</span></div>}
            {property.bathrooms && <div className="flex items-center gap-1"><Bath className="h-4 w-4" /><span>{property.bathrooms}</span></div>}
            {property.size_sqm && <div className="flex items-center gap-1"><Square className="h-4 w-4" /><span>{property.size_sqm.toLocaleString()} m²</span></div>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-primary-600">{formatPrice(property.price, property.price_unit)}</span>
              {property.listing_type === 'rent' && <span className="text-sm text-gray-500">/mo</span>}
            </div>
            <span className="text-xs font-bold bg-accent-500 text-white px-2 py-1 rounded">
              {property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/properties/${property.id}`} className={cn('group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden', className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError
          ? <img src={imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={() => setImageError(true)} />
          : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Square className="h-12 w-12 text-gray-300" /></div>}
        {/* Top-left: Verified badge */}
        {property.verification_status === 'verified' && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary-600 rounded px-2 py-1 text-xs font-semibold text-white shadow">
            Verified
          </div>
        )}
        {/* Top-right: Save button */}
        <button onClick={handleSaveToggle} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
          <Heart className={cn('h-4 w-4 transition-colors', isSaved ? 'fill-error-500 text-error-500' : 'text-gray-500')} />
        </button>
        {/* Bottom-left: listing type */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
            {property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-primary-600">
          {formatPrice(property.price, property.price_unit)}
          {property.listing_type === 'rent' && <span className="text-sm font-normal text-gray-500"> /mo</span>}
        </p>
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        {(property.bedrooms || property.bathrooms || property.size_sqm) && (
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 border-t border-gray-50 pt-3">
            {property.bedrooms && <div className="flex items-center gap-1"><Bed className="h-4 w-4" /><span>{property.bedrooms}</span></div>}
            {property.bathrooms && <div className="flex items-center gap-1"><Bath className="h-4 w-4" /><span>{property.bathrooms}</span></div>}
            {property.size_sqm && <div className="flex items-center gap-1"><Square className="h-4 w-4" /><span>{property.size_sqm.toLocaleString()} m²</span></div>}
          </div>
        )}
        {!property.bedrooms && !property.bathrooms && property.size_sqm && (
          <div className="flex items-center gap-1 mt-3 text-sm text-gray-500 border-t border-gray-50 pt-3">
            <Square className="h-4 w-4" /><span>{property.size_sqm.toLocaleString()} m²</span>
          </div>
        )}
      </div>
    </Link>
  );
}

import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '../ui';

const propertyTypes = [{ value: '', label: 'All Property Types' }, { value: 'residential_land', label: 'Residential Land' }, { value: 'commercial_land', label: 'Commercial Land' }, { value: 'agricultural_land', label: 'Agricultural Land' }, { value: 'house', label: 'House' }, { value: 'apartment', label: 'Apartment' }, { value: 'rental_unit', label: 'Rental Unit' }, { value: 'commercial_building', label: 'Commercial Building' }, { value: 'office_space', label: 'Office Space' }, { value: 'warehouse', label: 'Warehouse' }, { value: 'hotel_lodge', label: 'Hotel / Lodge' }, { value: 'mixed_use', label: 'Mixed Use' }, { value: 'investment_property', label: 'Investment Property' }];
const listingTypes = [{ value: '', label: 'Sale or Rent' }, { value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }];
const cities = [{ value: '', label: 'All Locations' }, { value: 'Kampala', label: 'Kampala' }, { value: 'Entebbe', label: 'Entebbe' }, { value: 'Jinja', label: 'Jinja' }, { value: 'Mbarara', label: 'Mbarara' }, { value: 'Gulu', label: 'Gulu' }, { value: 'Arua', label: 'Arua' }, { value: 'Mbale', label: 'Mbale' }];

interface SearchBarProps { variant?: 'default' | 'hero'; className?: string; onSearch?: (filters: Record<string, string>) => void; }
export function SearchBar({ variant = 'default', className, onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');
  const [city, setCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (propertyType) params.append('type', propertyType);
    if (listingType) params.append('listing_type', listingType);
    if (city) params.append('city', city);
    const queryString = params.toString();
    if (onSearch) onSearch(Object.fromEntries(params));
    else navigate(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  if (variant === 'hero') {
    return (
      <div className={cn('w-full max-w-4xl mx-auto', className)}>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input placeholder="Search by location, property name..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="h-5 w-5" />} className="h-12" />
            </div>
            <Select options={propertyTypes} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="h-12" />
            <Button variant="accent" size="lg" onClick={handleSearch} className="h-12">Search Properties</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Select options={listingTypes} value={listingType} onChange={(e) => setListingType(e.target.value)} placeholder="Listing Type" className="w-auto min-w-[150px]" />
            <Select options={cities} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Location" className="w-auto min-w-[150px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input placeholder="Search properties..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="h-5 w-5" />} className="flex-1" />
        <Select options={propertyTypes} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} placeholder="Property Type" className="w-full sm:w-48" />
        <Button variant="accent" onClick={handleSearch}>Search</Button>
      </div>
      <button onClick={() => setShowFilters(!showFilters)} className="mt-3 flex items-center gap-2 text-sm text-gray-600 hover:text-accent-500 transition-colors">
        <ChevronDown className={cn('h-4 w-4 transition-transform', showFilters && 'rotate-180')} />
        {showFilters ? 'Hide Filters' : 'Show More Filters'}
      </button>
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          <Select label="Listing Type" options={listingTypes} value={listingType} onChange={(e) => setListingType(e.target.value)} />
          <Select label="Location" options={cities} value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      )}
    </div>
  );
}

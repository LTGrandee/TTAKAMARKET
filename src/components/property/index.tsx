import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Building2 } from 'lucide-react';
import type { Property } from '../../lib/types';
import { formatPrice, getListingTypeLabel, getPropertyCategory, getPropertyCategoryLabel, getPropertyTypeLabel, getRentalLabel, cn } from '../../lib/utils';
import { Badge } from '../ui';
import { useState } from 'react';

interface PropertyCardProps { property: Property; variant?: 'default' | 'compact' | 'horizontal'; className?: string; }
export function PropertyCard({ property, variant = 'default', className }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const primaryImage = property.images?.find((img) => img.is_primary) || property.images?.[0];
  const imageUrl = primaryImage?.image_url || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
  const handleSaveToggle = () => setIsSaved((saved) => !saved);

  if (variant === 'horizontal') {
    return (
      <article className={cn('group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg sm:flex', className)}>
        <Link to={`/properties/${property.id}`} className="min-w-0 flex-1 sm:flex sm:items-stretch">
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 sm:aspect-auto sm:w-64 sm:shrink-0">
            {!imageError ? <img src={imageUrl} alt={property.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" onError={() => setImageError(true)} /> : <div className="flex h-full min-h-40 items-center justify-center"><Building2 className="h-12 w-12 text-gray-300" /></div>}
            <span className="absolute left-3 top-3 rounded-lg bg-primary-800/90 px-2.5 py-1 text-xs font-semibold text-white">Sample</span>
          </div>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="neutral" size="sm">{getPropertyCategoryLabel(property.asset_category || getPropertyCategory(property.property_type))}</Badge>
              <Badge variant="secondary" size="sm">{getPropertyTypeLabel(property.property_type)}</Badge>
            </div>
            <h3 className="mt-2 line-clamp-2 pr-10 text-base font-semibold text-gray-900 transition-colors group-hover:text-primary-700 sm:text-lg">{property.title}</h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4 shrink-0" /><span className="truncate">{property.address}, {property.city}</span></div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              {property.bedrooms && <span className="inline-flex items-center gap-1.5"><Bed className="h-4 w-4" />{property.bedrooms} beds</span>}
              {property.bathrooms && <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" />{property.bathrooms} baths</span>}
              {property.size_sqm && <span className="inline-flex items-center gap-1.5"><Square className="h-4 w-4" />{property.size_sqm.toLocaleString()} m²</span>}
            </div>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-gray-100 pt-3">
              <span className="text-lg font-bold text-primary-700 sm:text-xl">{formatPrice(property.price, property.price_unit)}{property.listing_type === 'rent' && <span className="ml-1 text-xs font-normal text-gray-500">/ month</span>}</span>
              <span className="rounded-lg bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-700">{getListingTypeLabel(property.listing_type)}</span>
            </div>
          </div>
        </Link>
        <button type="button" onClick={handleSaveToggle} aria-label={isSaved ? 'Remove from saved properties' : 'Save property'} aria-pressed={isSaved} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-colors hover:bg-white hover:text-error-600">
          <Heart className={cn('h-5 w-5', isSaved && 'fill-error-500 text-error-500')} />
        </button>
      </article>
    );
  }

  return (
    <article className={cn('group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg', className)}>
      <Link to={`/properties/${property.id}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imageError
          ? <img src={imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={() => setImageError(true)} />
          : <div className="flex h-full w-full items-center justify-center"><Building2 className="h-12 w-12 text-gray-300" /></div>}
        <div className="absolute left-3 top-3">
          <span className="rounded-lg bg-primary-800/90 px-2.5 py-1 text-xs font-semibold text-white">Sample</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="rounded-lg bg-accent-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            {getListingTypeLabel(property.listing_type)}
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-lg font-bold leading-tight text-primary-700 sm:text-xl">
          {formatPrice(property.price, property.price_unit)}
          {property.listing_type === 'rent' && <span className="ml-1 text-xs font-normal text-gray-500">/ month</span>}
        </p>
        {property.listing_type === 'rent' && property.rental_details && <p className="mt-1 text-xs font-medium text-primary-700">{getRentalLabel(property.rental_details.accommodation_type)} · {getRentalLabel(property.rental_details.duration)}</p>}
        <h3 className="mt-2 line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-gray-900 transition-colors group-hover:text-primary-700 sm:text-base">{property.title}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        {(property.bedrooms || property.bathrooms || property.size_sqm) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-3 text-xs text-gray-600 sm:text-sm">
            {property.bedrooms && <div className="flex items-center gap-1.5"><Bed className="h-4 w-4" /><span>{property.bedrooms} beds</span></div>}
            {property.bathrooms && <div className="flex items-center gap-1.5"><Bath className="h-4 w-4" /><span>{property.bathrooms} baths</span></div>}
            {property.size_sqm && <div className="flex items-center gap-1.5"><Square className="h-4 w-4" /><span>{property.size_sqm.toLocaleString()} m²</span></div>}
          </div>
        )}
      </div>
      </Link>
      <button type="button" onClick={handleSaveToggle} aria-label={isSaved ? 'Remove from saved properties' : 'Save property'} aria-pressed={isSaved} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition-colors hover:bg-white hover:text-error-600">
        <Heart className={cn('h-5 w-5', isSaved && 'fill-error-500 text-error-500')} />
      </button>
    </article>
  );
}

import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '../ui';

const propertyCategories = [{ value: '', label: 'All property categories' }, { value: 'land', label: 'Land' }, { value: 'housing', label: 'Housing' }, { value: 'commercial', label: 'Commercial' }, { value: 'storage', label: 'Storage / Industrial' }];
const propertyTypes = [{ value: '', label: 'All Property Types' }, { value: 'residential_land', label: 'Residential Land' }, { value: 'commercial_land', label: 'Commercial Land' }, { value: 'agricultural_land', label: 'Agricultural Land' }, { value: 'house', label: 'House' }, { value: 'apartment', label: 'Apartment' }, { value: 'rental_unit', label: 'Rental Unit' }, { value: 'commercial_building', label: 'Commercial Building' }, { value: 'office_space', label: 'Office Space' }, { value: 'warehouse', label: 'Warehouse' }, { value: 'hotel_lodge', label: 'Hotel / Lodge' }, { value: 'mixed_use', label: 'Mixed Use' }, { value: 'investment_property', label: 'Investment Property' }];
const listingTypes = [{ value: '', label: 'Sale, Rent, or Lease' }, { value: 'sale', label: 'For Sale' }, { value: 'rent', label: 'For Rent' }, { value: 'lease', label: 'For Lease' }];
const cities = [{ value: '', label: 'All Locations' }, { value: 'Kampala', label: 'Kampala' }, { value: 'Entebbe', label: 'Entebbe' }, { value: 'Jinja', label: 'Jinja' }, { value: 'Mbarara', label: 'Mbarara' }, { value: 'Gulu', label: 'Gulu' }, { value: 'Arua', label: 'Arua' }, { value: 'Mbale', label: 'Mbale' }];
const rentalAccommodationTypes = [{ value: '', label: 'Any rental type' }, { value: 'residential', label: 'Residential' }, { value: 'room', label: 'Room / shared home' }, { value: 'commercial', label: 'Commercial' }, { value: 'holiday_short_stay', label: 'Holiday / short stay' }, { value: 'storage_industrial', label: 'Storage / industrial' }];
const rentalDurations = [{ value: '', label: 'Any rental duration' }, { value: 'short_term', label: 'Short-term' }, { value: 'medium_term', label: 'Medium-term' }, { value: 'long_term', label: 'Long-term' }, { value: 'periodic', label: 'Periodic' }];

interface SearchBarProps { variant?: 'default' | 'hero'; className?: string; onSearch?: (filters: Record<string, string>) => void; }
export function SearchBar({ variant = 'default', className, onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [category, setCategory] = useState('');
  const [listingType, setListingType] = useState('');
  const [city, setCity] = useState('');
  const [rentalAccommodation, setRentalAccommodation] = useState('');
  const [rentalDuration, setRentalDuration] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (propertyType) params.append('type', propertyType);
    if (category) params.append('category', category);
    if (listingType) params.append('listing_type', listingType);
    if (city) params.append('city', city);
    if (rentalAccommodation) params.append('rental_accommodation', rentalAccommodation);
    if (rentalDuration) params.append('rental_duration', rentalDuration);
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
              <Input placeholder="Search by town, area or property..." value={search} onChange={(e) => setSearch(e.target.value)} leftIcon={<Search className="h-5 w-5" />} className="h-12" />
            </div>
            <Select options={propertyCategories} value={category} onChange={(e) => setCategory(e.target.value)} className="h-12" />
            <Button variant="accent" size="lg" onClick={handleSearch} className="h-12">Search Properties</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Select options={listingTypes} value={listingType} onChange={(e) => setListingType(e.target.value)} placeholder="Listing Type" className="w-auto min-w-[150px]" />
              <Select options={propertyTypes} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-auto min-w-[180px]" />
            <Select options={cities} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Location" className="w-auto min-w-[150px]" />
            <Select options={rentalAccommodationTypes} value={rentalAccommodation} onChange={(e) => setRentalAccommodation(e.target.value)} className="w-auto min-w-[170px]" />
            <Select options={rentalDurations} value={rentalDuration} onChange={(e) => setRentalDuration(e.target.value)} className="w-auto min-w-[160px]" />
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
          <Select label="Asset category" options={propertyCategories} value={category} onChange={(e) => setCategory(e.target.value)} />
          <Select label="Location" options={cities} value={city} onChange={(e) => setCity(e.target.value)} />
          <Select label="Rental accommodation" options={rentalAccommodationTypes} value={rentalAccommodation} onChange={(e) => setRentalAccommodation(e.target.value)} />
          <Select label="Rental duration" options={rentalDurations} value={rentalDuration} onChange={(e) => setRentalDuration(e.target.value)} />
        </div>
      )}
    </div>
  );
}

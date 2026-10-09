import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PropertyCategory } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'UGX'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }

  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(date);
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    residential_land: 'Residential Land',
    commercial_land: 'Commercial Land',
    agricultural_land: 'Agricultural Land',
    house: 'House',
    apartment: 'Apartment',
    rental_unit: 'Rental Unit',
    commercial_building: 'Commercial Building',
    office_space: 'Office Space',
    warehouse: 'Warehouse',
    hotel_lodge: 'Hotel / Lodge',
    mixed_use: 'Mixed Use',
    investment_property: 'Investment Property',
  };
  return labels[type] || type;
}

export function getPropertyCategory(type: string): PropertyCategory {
  if (type.includes('land')) return 'land';
  if (['warehouse', 'office_space', 'commercial_building', 'hotel_lodge'].includes(type)) return type === 'warehouse' ? 'storage' : 'commercial';
  return 'housing';
}

export function getPropertyCategoryLabel(category: string): string {
  return ({ land: 'Land', housing: 'Housing', commercial: 'Commercial', storage: 'Storage / Industrial' } as Record<string, string>)[category] || category;
}

export function getListingTypeLabel(listingType: string): string {
  return ({ sale: 'For Sale', rent: 'For Rent', lease: 'For Lease' } as Record<string, string>)[listingType] || listingType;
}

export function getRentalLabel(value: string): string {
  const labels: Record<string, string> = {
    residential: 'Residential',
    room: 'Room',
    commercial: 'Commercial',
    holiday_short_stay: 'Holiday / Short Stay',
    storage_industrial: 'Storage / Industrial',
    short_term: 'Short-term',
    medium_term: 'Medium-term',
    long_term: 'Long-term',
    periodic: 'Periodic',
    living: 'Living',
    student: 'Student',
    holiday: 'Holiday',
    temporary_work: 'Temporary work',
    business: 'Business',
    storage: 'Storage',
    individual: 'Individual',
    couple: 'Couple',
    family: 'Family',
    group: 'Group',
    corporate: 'Corporate',
    sole_tenant: 'Sole tenant',
    joint_tenants: 'Joint tenants',
    subtenant: 'Subtenant',
    leaseholder: 'Leaseholder',
    lodger: 'Lodger',
    monthly: 'Monthly',
    weekly: 'Weekly',
    advance: 'Paid in advance',
    corporate_paid: 'Company-paid',
    subsidised: 'Subsidised',
  };
  return labels[value] || value;
}

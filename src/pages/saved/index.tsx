import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { PropertyCard } from '../../components/property';
import { Card, Button, Loading, EmptyState } from '../../components/ui';
import type { SavedProperty, Property } from '../../lib/types';
import { useAuth } from '../../context';

export function SavedPropertiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<(SavedProperty & { property: Property })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (!user) { navigate('/login'); return; } fetchSavedProperties(); }, [user, navigate]);

  async function fetchSavedProperties() {
    setLoading(true);
    try {
      const mockSaved: (SavedProperty & { property: Property })[] = [
        { id: '1', user_id: user?.id || 'mock', property_id: '1', created_at: new Date().toISOString(), property: { id: '1', owner_id: 'owner-1', title: 'Prime Residential Land in Kololo', description: '', property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] } },
        { id: '2', user_id: user?.id || 'mock', property_id: '2', created_at: new Date().toISOString(), property: { id: '2', owner_id: 'owner-2', title: 'Modern 4 Bedroom House in Muyenga', description: '', property_type: 'house', listing_type: 'sale', price: 1200000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 450, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, parking_spaces: 2, address: 'Muyenga Tank Hill', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/259588?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] } },
      ];
      setSavedProperties(mockSaved);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  const handleRemove = async (propertyId: string) => {
    setSavedProperties((prev) => prev.filter((sp) => sp.property_id !== propertyId));
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8"><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Saved Properties</h1><p className="mt-1 text-gray-500">{savedProperties.length} properties saved</p><p className="mt-1 text-xs text-gray-400">Saved properties shown here are sample prototype data.</p></div>
        {savedProperties.length === 0 ? (<Card className="p-8"><EmptyState icon={<Heart className="h-12 w-12" />} title="No saved properties" description="Start browsing properties and save your favorites here" action={<Button variant="primary" onClick={() => navigate('/properties')}>Browse Properties</Button>} /></Card>) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((sp) => (
              <div key={sp.id} className="relative">
                <PropertyCard property={sp.property} />
                <button onClick={() => handleRemove(sp.property_id)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-error-50 text-gray-500 hover:text-error-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

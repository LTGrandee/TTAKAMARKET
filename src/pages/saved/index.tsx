import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Leaf, MapPin, Trash2 } from 'lucide-react';
import { PropertyCard } from '../../components/property';
import { Card, Button, Loading, EmptyState } from '../../components/ui';
import type { SavedProperty, Property, RestorationProject } from '../../lib/types';
import { useAuth } from '../../context';
import { restorationProjects, RESTORATION_SAVED_KEY } from '../RestorationPage';

export function SavedPropertiesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<(SavedProperty & { property: Property })[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedRestorationProjects, setSavedRestorationProjects] = useState<RestorationProject[]>([]);

  useEffect(() => { if (!user) { navigate('/login'); return; } fetchSavedProperties(); }, [user, navigate]);

  async function fetchSavedProperties() {
    setLoading(true);
    try {
      const mockSaved: (SavedProperty & { property: Property })[] = [
        { id: '1', user_id: user?.id || 'mock', property_id: '1', created_at: new Date().toISOString(), property: { id: '1', owner_id: 'owner-1', title: 'Prime Residential Land in Kololo', description: '', property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] } },
        { id: '2', user_id: user?.id || 'mock', property_id: '2', created_at: new Date().toISOString(), property: { id: '2', owner_id: 'owner-2', title: 'Modern 4 Bedroom House in Muyenga', description: '', property_type: 'house', listing_type: 'sale', price: 1200000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 450, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, parking_spaces: 2, address: 'Muyenga Tank Hill', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] } },
      ];
      setSavedProperties(mockSaved);
      const savedProjectIds = JSON.parse(localStorage.getItem(RESTORATION_SAVED_KEY) || '[]') as string[];
      setSavedRestorationProjects(restorationProjects.filter((project) => savedProjectIds.includes(project.id)));
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  const handleRemove = async (propertyId: string) => {
    setSavedProperties((prev) => prev.filter((sp) => sp.property_id !== propertyId));
  };

  const handleRemoveRestorationProject = (projectId: string) => {
    const savedProjectIds = JSON.parse(localStorage.getItem(RESTORATION_SAVED_KEY) || '[]') as string[];
    const nextIds = savedProjectIds.filter((id) => id !== projectId);
    localStorage.setItem(RESTORATION_SAVED_KEY, JSON.stringify(nextIds));
    setSavedRestorationProjects((current) => current.filter((project) => project.id !== projectId));
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8"><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Saved Items</h1><p className="mt-1 text-gray-500">{savedProperties.length} propert{savedProperties.length === 1 ? 'y' : 'ies'} and {savedRestorationProjects.length} restoration project{savedRestorationProjects.length === 1 ? '' : 's'} saved</p></div>
        {savedRestorationProjects.length > 0 && <section className="mb-8"><h2 className="mb-4 text-xl font-bold text-gray-900">Saved restoration projects</h2><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{savedRestorationProjects.map((project) => <article key={project.id} className="relative rounded-2xl border border-success-100 bg-white p-5 shadow-sm"><button type="button" onClick={() => handleRemoveRestorationProject(project.id)} aria-label={`Remove ${project.title} from saved items`} className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-error-50 hover:text-error-600"><Trash2 className="h-4 w-4" /></button><div className="flex items-start gap-3 pr-8"><Leaf className="mt-1 h-6 w-6 flex-shrink-0 text-success-600" /><div><span className="rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-700">Restoration project</span><h3 className="mt-2 font-bold text-gray-900">{project.title}</h3></div></div><p className="mt-3 flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="h-4 w-4" />{project.location}, {project.district}</p><p className="mt-3 text-sm leading-6 text-gray-600">{project.description}</p><div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm"><span className="font-semibold text-gray-900">{project.area_hectares} ha</span><span className="text-success-700">{project.status.replace('_', ' ')}</span></div></article>)}</div></section>}
        {savedProperties.length === 0 && savedRestorationProjects.length === 0 ? (<Card className="p-8"><EmptyState icon={<Heart className="h-12 w-12" />} title="No saved items" description="Save properties or restoration projects to find them here" action={<Button variant="primary" onClick={() => navigate('/properties')}>Browse Properties</Button>} /></Card>) : savedProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((sp) => (
              <div key={sp.id} className="relative">
                <PropertyCard property={sp.property} />
                <button onClick={() => handleRemove(sp.property_id)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-error-50 text-gray-500 hover:text-error-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Plus, MessageSquare, Calendar, Eye, Heart, Users, Shield, CheckCircle, Clock } from 'lucide-react';
import { Button, Card, Badge, Avatar, EmptyState, Loading } from '../../components/ui';
import type { Property, Appointment, Conversation } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context';
import { formatPrice, getPropertyTypeLabel, formatDate } from '../../lib/utils';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProperties: 0, activeListings: 0, totalViews: 0, totalInquiries: 0 });

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
    else if (user) fetchDashboardData();
  }, [user, authLoading, navigate]);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const mockProperties: Property[] = [
        { id: '1', owner_id: user?.id || 'mock', title: 'Prime Residential Land in Kololo', description: '', property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399?w=400', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        { id: '2', owner_id: user?.id || 'mock', title: '3 Bedroom House in Najjera', description: '', property_type: 'house', listing_type: 'rent', price: 2500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 280, size_unit: 'sqm', bedrooms: 3, bathrooms: 2, address: 'Najjera Road', city: 'Kampala', country: 'Uganda', features: [], amenities: [], status: 'pending', verification_status: 'pending', views_count: 0, saves_count: 0, inquiries_count: 0, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/259588?w=400', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
      ];
      const mockAppointments: Appointment[] = [{ id: '1', property_id: '1', user_id: 'buyer-1', owner_id: user?.id || 'mock', scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), duration_minutes: 60, status: 'pending', notes: 'Interested in viewing', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }];
      const mockConversations: Conversation[] = [{ id: '1', participant1_id: user?.id || 'mock', participant2_id: 'buyer-1', last_message_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), created_at: new Date().toISOString() }];
      setProperties(mockProperties);
      setAppointments(mockAppointments);
      setConversations(mockConversations);
      setStats({ totalProperties: mockProperties.length, activeListings: mockProperties.filter(p => p.status === 'published').length, totalViews: mockProperties.reduce((sum, p) => sum + p.views_count, 0), totalInquiries: mockProperties.reduce((sum, p) => sum + p.inquiries_count, 0) });
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  if (authLoading || loading) return <Loading fullScreen />;
  const isOwner = profile?.user_type === 'owner' || profile?.user_type === 'agent' || profile?.user_type === 'developer';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div><h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}</h1><p className="mt-1 text-gray-500">{isOwner ? 'Manage your listings and connect with buyers' : 'Track your property search and saved items'}</p></div>
            {isOwner && <Link to="/properties/new"><Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>Add Property</Button></Link>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"><Building2 className="h-6 w-6 text-primary-600" /></div><div><p className="text-sm text-gray-500">Total Properties</p><p className="text-2xl font-bold text-gray-900">{isOwner ? stats.totalProperties : 15}</p></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center"><CheckCircle className="h-6 w-6 text-success-600" /></div><div><p className="text-sm text-gray-500">Active Listings</p><p className="text-2xl font-bold text-gray-900">{isOwner ? stats.activeListings : 8}</p></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center"><Eye className="h-6 w-6 text-accent-600" /></div><div><p className="text-sm text-gray-500">Total Views</p><p className="text-2xl font-bold text-gray-900">{isOwner ? stats.totalViews : 234}</p></div></div></Card>
          <Card className="p-6"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center"><MessageSquare className="h-6 w-6 text-error-600" /></div><div><p className="text-sm text-gray-500">Inquiries</p><p className="text-2xl font-bold text-gray-900">{isOwner ? stats.totalInquiries : 12}</p></div></div></Card>
        </div>

        {!isOwner && (
          <Card className="mb-8 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/properties" className="p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors text-center"><Building2 className="h-8 w-8 text-primary-600 mx-auto mb-2" /><p className="text-sm font-medium text-primary-900">Browse Properties</p></Link>
              <Link to="/saved" className="p-4 bg-error-50 rounded-xl hover:bg-error-100 transition-colors text-center"><Heart className="h-8 w-8 text-error-600 mx-auto mb-2" /><p className="text-sm font-medium text-error-900">Saved Properties</p></Link>
              <Link to="/messages" className="p-4 bg-success-50 rounded-xl hover:bg-success-100 transition-colors text-center"><MessageSquare className="h-8 w-8 text-success-600 mx-auto mb-2" /><p className="text-sm font-medium text-success-900">Messages</p></Link>
              <Link to="/profile" className="p-4 bg-accent-50 rounded-xl hover:bg-accent-100 transition-colors text-center"><Users className="h-8 w-8 text-accent-600 mx-auto mb-2" /><p className="text-sm font-medium text-accent-900">Profile</p></Link>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {isOwner && (
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-gray-900">My Properties</h2><Link to="/dashboard/properties" className="text-sm text-primary-600 hover:text-primary-700">View all</Link></div>
                {properties.length === 0 ? <EmptyState icon={<Building2 className="h-12 w-12" />} title="No properties yet" description="List your first property to start connecting with buyers" action={<Link to="/properties/new"><Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>Add Property</Button></Link>} /> : (
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <Link key={property.id} to={`/properties/${property.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">{property.images && property.images[0] ? <img src={property.images[0].image_url} alt={property.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Building2 className="h-6 w-6 text-gray-400" /></div>}</div>
                        <div className="flex-1 min-w-0"><p className="font-medium text-gray-900 truncate">{property.title}</p><div className="flex items-center gap-2 mt-1"><Badge variant="neutral" size="sm">{getPropertyTypeLabel(property.property_type)}</Badge><Badge variant={property.status === 'published' ? 'success' : 'warning'} size="sm">{property.status}</Badge>{property.verification_status === 'verified' && <Shield className="h-4 w-4 text-primary-600" />}</div></div>
                        <div className="text-right flex-shrink-0"><p className="font-semibold text-gray-900">{formatPrice(property.price, property.price_unit)}</p><p className="text-sm text-gray-500">{property.views_count} views</p></div>
                      </Link>
                    ))}
                  </div>
                )}
              </Card>
              {profile && profile.verification_status !== 'verified' && (
                <Card className="p-6 bg-primary-50 border-primary-200">
                  <div className="flex items-start gap-4"><div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0"><Shield className="h-5 w-5 text-primary-600" /></div><div><h3 className="font-semibold text-primary-900">Complete Your Verification</h3><p className="text-sm text-primary-700 mt-1">Upload your ID and ownership documents to verify your account and publish properties.</p><Link to="/profile/verification"><Button variant="primary" size="sm" className="mt-3">Start Verification</Button></Link></div></div>
                </Card>
              )}
            </div>
          )}
          <div className="space-y-6">
            <Card className="p-6"><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-gray-900">Appointments</h2><Calendar className="h-5 w-5 text-gray-400" /></div>{appointments.length === 0 ? <p className="text-sm text-gray-500">No upcoming appointments</p> : <div className="space-y-3">{appointments.map((apt) => (<div key={apt.id} className="p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2 text-sm text-gray-900"><Clock className="h-4 w-4 text-gray-400" />{formatDate(apt.scheduled_at)}</div><div className="flex items-center gap-2 mt-1"><Badge variant="warning" size="sm">{apt.status}</Badge></div></div>))}</div>}</Card>
            <Card className="p-6"><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-gray-900">Messages</h2><Link to="/messages" className="text-sm text-primary-600 hover:text-primary-700">View all</Link></div>{conversations.length === 0 ? <p className="text-sm text-gray-500">No messages yet</p> : <div className="space-y-3">{conversations.map((conv) => (<Link key={conv.id} to={`/messages/${conv.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"><Avatar size="sm" /><div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 truncate">Property Inquiry</p></div></Link>))}</div>}</Card>
          </div>
          {!isOwner && (<div className="lg:col-span-2"><Card className="p-6"><div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold text-gray-900">Saved Properties</h2><Link to="/saved" className="text-sm text-primary-600 hover:text-primary-700">View all</Link></div><EmptyState icon={<Heart className="h-12 w-12" />} title="No saved properties" description="Browse properties and save your favorites for later" action={<Link to="/properties"><Button variant="primary">Browse Properties</Button></Link>} /></Card></div>)}
        </div>
      </div>
    </div>
  );
}

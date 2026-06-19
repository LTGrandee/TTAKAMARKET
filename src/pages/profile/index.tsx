import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Shield, CheckCircle, Clock, Upload, Mail, Phone, MapPin, Edit2, Award } from 'lucide-react';
import { Button, Input, Card, Badge, Avatar, Loading } from '../../components/ui';
import { useAuth } from '../../context';
import type { Profile } from '../../lib/supabase';
import { formatDate, formatRelativeTime } from '../../lib/utils';
import { cn } from '../../lib/utils';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', phone: '', address: '', city: '', bio: '', company_name: '' });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
    else if (profile) setFormData({ full_name: profile.full_name || '', phone: profile.phone || '', address: profile.address || '', city: profile.city || '', bio: profile.bio || '', company_name: profile.company_name || '' });
  }, [user, profile, authLoading, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try { await updateProfile(formData); setEditMode(false); }
    catch (error) { console.error('Error:', error); }
    finally { setSaving(false); }
  };

  if (authLoading || !profile) return <Loading fullScreen />;

  const tabs = [{ id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> }, { id: 'verification', label: 'Verification', icon: <Shield className="h-4 w-4" /> }, { id: 'alerts', label: 'Alerts', icon: <Mail className="h-4 w-4" /> }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" className="w-24 h-24 border-4 border-white shadow-lg" />
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2"><h1 className="text-2xl md:text-3xl font-bold">{profile.full_name}</h1>{profile.is_verified && <Shield className="h-6 w-6 text-primary-300" />}</div>
              <p className="text-primary-200 mt-1">{profile.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <Badge variant="primary" className="bg-white/20 text-white">{profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}</Badge>
                <Badge variant={profile.verification_status === 'verified' ? 'success' : 'warning'} className="bg-white/20 text-white">{profile.verification_status === 'verified' ? 'Verified' : 'Pending'}</Badge>
              </div>
            </div>
            <div className="flex-1" />
            <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => setEditMode(!editMode)}><Edit2 className="h-4 w-4 mr-2" />Edit Profile</Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6">
          <div className="border-b border-gray-200 mb-6"><div className="flex gap-4">{tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors', activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700')}>{tab.icon}{tab.label}</button>))}</div></div>

          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div><h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3><div className="space-y-4"><Input label="Full Name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} disabled={!editMode} leftIcon={<User className="h-5 w-5" />} /><Input label="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!editMode} leftIcon={<Phone className="h-5 w-5" />} /><Input label="Email" value={profile.email} disabled leftIcon={<Mail className="h-5 w-5" />} /></div></div>
                {editMode && <Button variant="primary" loading={saving} onClick={handleSave}>Save Changes</Button>}
              </div>
              <div className="space-y-6">
                <div><h3 className="font-semibold text-gray-900 mb-4">Location</h3><div className="space-y-4"><Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} disabled={!editMode} leftIcon={<MapPin className="h-5 w-5" />} /><Input label="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} disabled={!editMode} /></div></div>
                {profile.user_type !== 'buyer' && (<div><h3 className="font-semibold text-gray-900 mb-4">Company Information</h3><Input label="Company Name" value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} disabled={!editMode} leftIcon={<Building2 className="h-5 w-5" />} /></div>)}
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <Card className="p-6 bg-gray-50"><div className="flex items-center gap-4">{profile.verification_status === 'verified' ? (<div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center"><CheckCircle className="h-8 w-8 text-success-600" /></div>) : (<div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center"><Clock className="h-8 w-8 text-warning-600" /></div>)}<div><h3 className="font-semibold text-gray-900">{profile.verification_status === 'verified' ? 'Account Verified' : 'Verification Pending'}</h3><p className="text-sm text-gray-500 mt-1">{profile.verification_status === 'verified' ? 'Your account has been verified. You can publish properties.' : 'Complete verification to publish properties on TtakaMarket'}</p></div></div></Card>
              {profile.verification_status !== 'verified' && (
                <Card className="p-6 border-primary-200 bg-primary-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Upload Verification Documents</h3>
                  <p className="text-sm text-gray-600 mb-4">To become verified, please upload: National ID or Passport, Land Title or Property Documents</p>
                  <Button variant="primary" leftIcon={<Upload className="h-4 w-4" />}>Upload Documents</Button>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div>
              <div className="flex items-center justify-between mb-6"><h3 className="font-semibold text-gray-900">Property Alerts</h3><Button variant="outline" size="sm">Create Alert</Button></div>
              <div className="space-y-4">
                <Card className="p-4 flex items-center justify-between"><div><p className="font-medium text-gray-900">Land in Kampala</p><p className="text-sm text-gray-500">Residential Land, For Sale, 50M - 200M UGX</p><p className="text-xs text-gray-400 mt-1">Created {formatRelativeTime(new Date().toISOString())}</p></div><div className="flex items-center gap-3"><Badge variant="success">Active</Badge><Button variant="ghost" size="sm">Edit</Button></div></Card>
                <Card className="p-4 flex items-center justify-between"><div><p className="font-medium text-gray-900">3+ Bedroom Houses in Entebbe</p><p className="text-sm text-gray-500">House, For Sale</p><p className="text-xs text-gray-400 mt-1">Created {formatRelativeTime(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())}</p></div><div className="flex items-center gap-3"><Badge variant="success">Active</Badge><Button variant="ghost" size="sm">Edit</Button></div></Card>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

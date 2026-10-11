import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Building2, Shield, CheckCircle, Clock, Upload, Mail, Phone,
  MapPin, Edit2, Camera, ChevronRight, Eye, Bell as BellIcon,
  CreditCard, Receipt, Lock, Smartphone, Monitor, Moon, LogOut,
  Trash2, FileText, Award, AlertTriangle, X, Save, KeyRound, Search
} from 'lucide-react';
import { Avatar, Button, Input, Loading, Select } from '../../components/ui';
import { useAuth } from '../../context';
import type { MarketplaceListingIntent, MarketplacePreferences, Profile, PropertyCategory, RentalPreferences } from '../../lib/types';
import { cn, getPropertyCategoryLabel, getRentalLabel } from '../../lib/utils';

/* ─── Section row component ─── */
function SettingsRow({
  Icon,
  label,
  desc,
  onClick,
  danger = false,
  right,
  href,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc?: string;
  onClick?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', danger ? 'bg-error-50' : 'bg-primary-50')}>
        <Icon className={cn('h-4.5 w-4.5', danger ? 'text-error-500' : 'text-primary-600')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium', danger ? 'text-error-600' : 'text-gray-900')}>{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      {right ?? <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />}
    </div>
  );
  if (href) return <Link to={href}>{inner}</Link>;
  return <div onClick={onClick}>{inner}</div>;
}

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      <div className="divide-y divide-gray-50 rounded-2xl overflow-hidden mx-4 shadow-sm">
        {children}
      </div>
    </div>
  );
}

/* ─── Edit Profile Modal ─── */
function EditProfileModal({ profile, onClose, onSave }: {
  profile: any;
  onClose: () => void;
  onSave: (data: any) => Promise<any>;
}) {
  const [form, setForm] = useState({
    full_name: profile.full_name || '',
    phone: profile.phone || '',
    address: profile.address || '',
    city: profile.city || '',
    bio: profile.bio || '',
    company_name: profile.company_name || '',
  });
  const [saving, setSaving] = useState(false);

  const handle = async () => {
    setSaving(true);
    try { await onSave(form); onClose(); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-white sticky top-0">
        <h2 className="text-base font-bold text-gray-900">Edit Profile</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><X className="h-5 w-5" /></button>
          <button onClick={handle} disabled={saving} className="inline-flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <Save className="h-4 w-4" />{saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <Input label="Full Name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} leftIcon={<User className="h-4 w-4" />} />
        <Input label="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} leftIcon={<Phone className="h-4 w-4" />} type="tel" />
        <Input label="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} leftIcon={<MapPin className="h-4 w-4" />} />
        <Input label="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        {profile.user_type !== 'buyer' && (
          <Input label="Company Name" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} leftIcon={<Building2 className="h-4 w-4" />} />
        )}
      </div>
    </div>
  );
}

function RentalPreferencesModal({ profile, onClose, onSave }: {
  profile: Profile;
  onClose: () => void;
  onSave: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
}) {
  const [preferences, setPreferences] = useState<RentalPreferences>(profile.rental_preferences ?? {
    accommodation_type: 'residential',
    duration: 'long_term',
    purpose: 'living',
    living_arrangement: 'individual',
    tenancy_arrangement: 'sole_tenant',
    payment_method: 'monthly',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const updatePreference = <K extends keyof RentalPreferences>(key: K, value: RentalPreferences[K]) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const result = await onSave({ rental_preferences: preferences });
      if (result.error) throw result.error;
      onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const accommodationOptions = [
    { value: 'residential', label: 'House / apartment' },
    { value: 'room', label: 'Room / shared home' },
    { value: 'commercial', label: 'Shop / office' },
    { value: 'holiday_short_stay', label: 'Holiday / short stay' },
    { value: 'storage_industrial', label: 'Storage / industrial' },
  ];
  const durationOptions = [
    { value: 'short_term', label: 'Days / weeks' },
    { value: 'medium_term', label: 'Weeks / months' },
    { value: 'long_term', label: 'Year or longer' },
    { value: 'periodic', label: 'Weekly / monthly periodic' },
  ];
  const purposeOptions = [
    { value: 'living', label: 'Living' },
    { value: 'student', label: 'Student' },
    { value: 'holiday', label: 'Holiday' },
    { value: 'temporary_work', label: 'Temporary work' },
    { value: 'business', label: 'Business' },
    { value: 'storage', label: 'Storage' },
  ];
  const livingOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'couple', label: 'Couple' },
    { value: 'family', label: 'Family' },
    { value: 'student', label: 'Student' },
    { value: 'group', label: 'Group' },
    { value: 'corporate', label: 'Corporate' },
  ];
  const tenancyOptions = [
    { value: 'sole_tenant', label: 'Sole tenant' },
    { value: 'joint_tenants', label: 'Joint tenants' },
    { value: 'subtenant', label: 'Subtenant' },
    { value: 'leaseholder', label: 'Leaseholder' },
    { value: 'lodger', label: 'Lodger' },
  ];
  const paymentOptions = [
    { value: 'daily', label: 'Per day' },
    { value: 'nightly', label: 'Per night' },
    { value: 'weekly', label: 'Per week' },
    { value: 'monthly', label: 'Per month' },
    { value: 'advance', label: 'Several months in advance' },
    { value: 'corporate_paid', label: 'Paid by company' },
    { value: 'subsidised', label: 'Subsidised support' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Rental matching preferences</h2>
          <p className="mt-1 text-xs text-gray-500">Optional preferences to help tailor property discovery.</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close rental preferences" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        <Select name="accommodation-type" label="Accommodation type" options={accommodationOptions} value={preferences.accommodation_type} onChange={(event) => updatePreference('accommodation_type', event.target.value as RentalPreferences['accommodation_type'])} />
        <Select name="rental-duration" label="Rental duration" options={durationOptions} value={preferences.duration} onChange={(event) => updatePreference('duration', event.target.value as RentalPreferences['duration'])} />
        <Select name="rental-purpose" label="Purpose" options={purposeOptions} value={preferences.purpose} onChange={(event) => updatePreference('purpose', event.target.value as RentalPreferences['purpose'])} />
        <Select name="living-arrangement" label="Occupancy" options={livingOptions} value={preferences.living_arrangement} onChange={(event) => updatePreference('living_arrangement', event.target.value as RentalPreferences['living_arrangement'])} />
        <Select name="tenancy-arrangement" label="Tenancy arrangement" options={tenancyOptions} value={preferences.tenancy_arrangement} onChange={(event) => updatePreference('tenancy_arrangement', event.target.value as RentalPreferences['tenancy_arrangement'])} />
        <Select name="payment-frequency" label="Payment frequency" options={paymentOptions} value={preferences.payment_method} onChange={(event) => updatePreference('payment_method', event.target.value as RentalPreferences['payment_method'])} />
        {error && <p role="alert" className="rounded-lg bg-error-50 p-3 text-sm text-error-700">{error}</p>}
      </div>
      <div className="flex justify-end gap-3 border-t border-gray-100 bg-white px-4 py-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="button" variant="primary" loading={saving} onClick={handleSave}>Save preferences</Button>
      </div>
    </div>
  );
}

function MarketplacePreferencesModal({ profile, onClose, onSave }: {
  profile: Profile;
  onClose: () => void;
  onSave: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
}) {
  const [preferences, setPreferences] = useState<MarketplacePreferences>(profile.marketplace_preferences ?? {
    property_categories: [],
    listing_intents: [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const togglePreference = <K extends keyof MarketplacePreferences>(key: K, value: MarketplacePreferences[K][number]) => {
    setPreferences((current) => {
      const selected = current[key] as Array<typeof value>;
      const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
      return { ...current, [key]: next };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const result = await onSave({ marketplace_preferences: preferences });
      if (result.error) throw result.error;
      onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const categories: Array<[PropertyCategory, string]> = [
    ['land', 'Land'],
    ['housing', 'Homes & rooms'],
    ['commercial', 'Shops & commercial'],
    ['storage', 'Storage & industrial'],
  ];
  const intents: Array<[MarketplaceListingIntent, string]> = [
    ['sale', 'Buy'],
    ['rent', 'Rent'],
    ['lease', 'Lease'],
    ['book', 'Book a stay'],
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Marketplace discovery preferences</h2>
          <p className="mt-1 text-xs text-gray-500">Choose what you want to find. You can update these any time.</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close marketplace preferences" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-700">Property categories</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map(([value, label]) => {
              const selected = preferences.property_categories.includes(value);
              return (
                <button key={value} type="button" aria-pressed={selected} onClick={() => togglePreference('property_categories', value)} className={cn('min-h-10 rounded-full border px-3 py-2 text-sm font-medium transition-colors', selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300')}>
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-gray-700">What are you looking to do?</legend>
          <div className="flex flex-wrap gap-2">
            {intents.map(([value, label]) => {
              const selected = preferences.listing_intents.includes(value);
              return (
                <button key={value} type="button" aria-pressed={selected} onClick={() => togglePreference('listing_intents', value)} className={cn('min-h-10 rounded-full border px-3 py-2 text-sm font-medium transition-colors', selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300')}>
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <p className="text-xs leading-5 text-gray-500">These choices help you quickly find matching listings. They do not limit access to other properties.</p>
        {error && <p role="alert" className="rounded-lg bg-error-50 p-3 text-sm text-error-700">{error}</p>}
      </div>
      <div className="flex justify-end gap-3 border-t border-gray-100 bg-white px-4 py-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="button" variant="primary" loading={saving} onClick={handleSave}>Save preferences</Button>
      </div>
    </div>
  );
}

/* ─── Change Password Modal ─── */
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 sticky top-0 bg-white">
        <h2 className="text-base font-bold text-gray-900">Change Password</h2>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><X className="h-5 w-5" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <Input label="Current Password" type="password" value={form.current} onChange={e => setForm({ ...form, current: e.target.value })} leftIcon={<Lock className="h-4 w-4" />} />
        <Input label="New Password" type="password" value={form.next} onChange={e => setForm({ ...form, next: e.target.value })} leftIcon={<KeyRound className="h-4 w-4" />} />
        <Input label="Confirm New Password" type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} leftIcon={<KeyRound className="h-4 w-4" />} />
        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors">Update Password</button>
      </div>
    </div>
  );
}

/* ─── Notification Settings Modal ─── */
function NotificationSettingsModal({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState({ new_listings: true, price_drops: true, messages: true, promos: false });
  const Toggle = ({ id, label }: { id: keyof typeof prefs; label: string }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => setPrefs(p => ({ ...p, [id]: !p[id] }))}
        className={cn('w-11 h-6 rounded-full transition-colors relative', prefs[id] ? 'bg-accent-500' : 'bg-gray-200')}
      >
        <span className={cn('absolute top-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform', prefs[id] ? 'translate-x-5' : 'translate-x-0.5')} />
      </button>
    </div>
  );
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 sticky top-0 bg-white">
        <h2 className="text-base font-bold text-gray-900">Notification Settings</h2>
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><X className="h-5 w-5" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-gray-100">
        <Toggle id="new_listings" label="New matching listings" />
        <Toggle id="price_drops" label="Price drops on saved properties" />
        <Toggle id="messages" label="New messages from owners" />
        <Toggle id="promos" label="Promotions & updates" />
      </div>
    </div>
  );
}

/* ─── Delete Confirm ─── */
function DeleteConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-scale-in">
        <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-6 w-6 text-error-500" />
        </div>
        <h3 className="text-base font-bold text-gray-900 text-center mb-2">Sign out of TtakaMarket?</h3>
        <p className="text-sm text-gray-500 text-center mb-6">You can sign in again at any time to continue managing your account.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm">Cancel</button>
          <button onClick={onConfirm} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">Sign Out</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Profile Page ─── */
export function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, signOut, loading: authLoading } = useAuth();
  const [modal, setModal] = useState<'edit' | 'marketplace-preferences' | 'rental-preferences' | 'password' | 'notifications' | 'delete' | null>(null);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const nextDarkMode = !darkMode;
    document.documentElement.classList.toggle('dark', nextDarkMode);
    localStorage.setItem('ttakamarket-theme', nextDarkMode ? 'dark' : 'light');
    setDarkMode(nextDarkMode);
  };

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  if (authLoading || !profile) return <Loading fullScreen />;

  const handleLogout = async () => { await signOut(); navigate('/'); };

  const verificationColor =
    profile.verification_status === 'verified' ? 'bg-success-100 text-success-700' :
    profile.verification_status === 'pending' ? 'bg-warning-100 text-warning-700' :
    'bg-gray-100 text-gray-600';

  return (
    <div className="bg-gray-50 pb-4">

      {/* Modals */}
      {modal === 'edit' && <EditProfileModal profile={profile} onClose={() => setModal(null)} onSave={updateProfile} />}
      {modal === 'marketplace-preferences' && <MarketplacePreferencesModal profile={profile} onClose={() => setModal(null)} onSave={updateProfile} />}
      {modal === 'rental-preferences' && <RentalPreferencesModal profile={profile} onClose={() => setModal(null)} onSave={updateProfile} />}
      {modal === 'password' && <ChangePasswordModal onClose={() => setModal(null)} />}
      {modal === 'notifications' && <NotificationSettingsModal onClose={() => setModal(null)} />}
      {modal === 'delete' && <DeleteConfirmModal onClose={() => setModal(null)} onConfirm={handleLogout} />}

      {/* Profile Header */}
      <div className="bg-primary-600 px-4 pt-6 pb-10">
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" className="w-20 h-20 border-4 border-white/30 shadow-lg" />
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-accent-500 rounded-full flex items-center justify-center border-2 border-white shadow">
              <Camera className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-white mt-3">{profile.full_name}</h1>
          <p className="text-primary-200 text-sm mt-0.5">{profile.email}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={cn('text-xs font-bold px-3 py-1 rounded-full', verificationColor)}>
              {profile.verification_status === 'verified' ? 'Verification · verified' : profile.verification_status === 'pending' ? 'Verification · pending' : 'Verification · not complete'}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white capitalize">
              {profile.user_type}
            </span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mx-4 -mt-6 bg-white rounded-2xl shadow-md grid grid-cols-3 divide-x divide-gray-100 mb-4 overflow-hidden">
        <div className="flex flex-col items-center py-4">
          <span className="text-lg font-bold text-primary-600">0</span>
          <span className="text-[10px] text-gray-400 mt-0.5">Listings</span>
        </div>
        <div className="flex flex-col items-center py-4">
          <span className="text-lg font-bold text-primary-600">0</span>
          <span className="text-[10px] text-gray-400 mt-0.5">Saved</span>
        </div>
        <div className="flex flex-col items-center py-4">
          <span className="text-lg font-bold text-primary-600">0</span>
          <span className="text-[10px] text-gray-400 mt-0.5">Messages</span>
        </div>
      </div>

      {/* ── Personal Information ── */}
      <SectionGroup title="Personal Information">
        <SettingsRow Icon={User} label="Profile Information" desc={profile.city || 'No city set'} onClick={() => setModal('edit')} />
        <SettingsRow Icon={Edit2} label="Edit Profile" onClick={() => setModal('edit')} />
        <SettingsRow Icon={Camera} label="Change Profile Photo" onClick={() => {}} />
      </SectionGroup>

      {/* ── Verification ── */}
      <SectionGroup title="Verification">
        <SettingsRow
          Icon={profile.verification_status === 'verified' ? CheckCircle : Clock}
          label="Identity Verification"
          desc={profile.verification_status === 'verified' ? 'Verified' : 'Not completed'}
          onClick={() => {}}
          right={
            <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', verificationColor)}>
              {profile.verification_status === 'verified' ? 'Done' : 'Pending'}
            </span>
          }
        />
        <SettingsRow Icon={Building2} label="Owner Verification" desc="Verify your property ownership" onClick={() => {}} />
        <SettingsRow Icon={FileText} label="Verification Documents" desc="Upload supporting documents" onClick={() => {}} right={
          <button className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
            <Upload className="h-3 w-3" /> Upload
          </button>
        } />
      </SectionGroup>

      {/* ── My Activity ── */}
      <SectionGroup title="My Activity">
        <SettingsRow Icon={Eye} label="Viewing History" desc="Properties you've recently viewed" href="/properties" />
        <SettingsRow Icon={BellIcon} label="Notification Settings" onClick={() => setModal('notifications')} />
      </SectionGroup>

      {/* ── Property Search ── */}
      <SectionGroup title="Property Search">
        <SettingsRow
          Icon={Search}
          label="Marketplace discovery preferences"
          desc={profile.marketplace_preferences
            ? [
                ...profile.marketplace_preferences.property_categories.map(getPropertyCategoryLabel),
                ...profile.marketplace_preferences.listing_intents.map((intent) => intent === 'sale' ? 'Buy' : intent === 'book' ? 'Book a stay' : intent === 'rent' ? 'Rent' : 'Lease'),
              ].join(' · ') || 'Choose categories and offer types to find matches faster'
            : 'Choose categories and offer types to find matches faster'}
          onClick={() => setModal('marketplace-preferences')}
        />
        <SettingsRow
          Icon={Search}
          label="Rental matching preferences"
          desc={profile.rental_preferences
            ? [profile.rental_preferences.accommodation_type, profile.rental_preferences.duration, profile.rental_preferences.purpose].map(getRentalLabel).join(' · ')
            : 'Optional preferences for rental property discovery'}
          onClick={() => setModal('rental-preferences')}
        />
      </SectionGroup>

      {/* ── Payments ── */}
      <SectionGroup title="Payments">
        <SettingsRow Icon={CreditCard} label="Payment Methods" desc="Manage your payment options" onClick={() => {}} />
        <SettingsRow Icon={Receipt} label="Transaction History" desc="View past transactions" onClick={() => {}} />
      </SectionGroup>

      {/* ── Security ── */}
      <SectionGroup title="Security">
        <SettingsRow Icon={Lock} label="Change Password" onClick={() => setModal('password')} />
        <SettingsRow Icon={Smartphone} label="Two-Factor Authentication" desc="Add extra security" onClick={() => {}} right={
          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">Off</span>
        } />
        <SettingsRow Icon={Monitor} label="Logged-in Devices" desc="Manage active sessions" onClick={() => {}} />
      </SectionGroup>

      {/* ── Appearance ── */}
      <SectionGroup title="Appearance">
        <SettingsRow
          Icon={Moon}
          label="Dark Mode"
          desc={darkMode ? 'Dark theme is on' : 'Switch to dark theme'}
          onClick={toggleDarkMode}
          right={
            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              aria-label="Dark mode"
              onClick={e => { e.stopPropagation(); toggleDarkMode(); }}
              className={cn('w-11 h-6 rounded-full transition-colors relative flex-shrink-0', darkMode ? 'bg-accent-500' : 'bg-gray-200')}
            >
              <span className={cn('absolute top-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform', darkMode ? 'translate-x-5' : 'translate-x-0.5')} />
            </button>
          }
        />
      </SectionGroup>

      {/* ── Account ── */}
      <SectionGroup title="Account">
        <SettingsRow Icon={LogOut} label="Log Out" onClick={handleLogout} danger right={<span />} />
        <SettingsRow Icon={Trash2} label="Delete Account" desc="Permanently remove your account" onClick={() => setModal('delete')} danger />
      </SectionGroup>

      <p className="text-center text-xs text-gray-300 px-4 mt-2">TtakaMarket v1.0 · Kampala, Uganda</p>
    </div>
  );
}

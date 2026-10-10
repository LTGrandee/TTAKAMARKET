import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Building2, Shield, CheckCircle, Clock, Upload, Mail, Phone,
  MapPin, Edit2, Camera, ChevronRight, Eye, Bell as BellIcon,
  CreditCard, Receipt, Lock, Smartphone, Monitor, Moon, LogOut,
  Trash2, FileText, Award, AlertTriangle, X, Save, KeyRound
} from 'lucide-react';
import { Input, Loading, Avatar } from '../../components/ui';
import { useAuth } from '../../context';
import { cn } from '../../lib/utils';

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
        <h3 className="text-base font-bold text-gray-900 text-center mb-2">Account deletion unavailable</h3>
        <p className="text-sm text-gray-500 text-center mb-6">Account deletion is being developed. You can sign out to end your current session.</p>
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
  const [modal, setModal] = useState<'edit' | 'password' | 'notifications' | 'delete' | null>(null);
  const [darkMode, setDarkMode] = useState(false);

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
      <p className="mx-auto max-w-3xl px-4 pt-3 text-center text-xs leading-5 text-gray-500">Verification, payments, secure document uploads and notification tools are being developed.</p>

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
          desc="Switch to dark theme"
          onClick={() => setDarkMode(!darkMode)}
          right={
            <button
              onClick={e => { e.stopPropagation(); setDarkMode(!darkMode); }}
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

import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context';
import { Home, Building2, MessageSquare, Heart, User, Menu, X, LogOut, Plus, Shield, Bell } from 'lucide-react';
import { Button, Avatar } from '../ui';
import { cn } from '../../lib/utils';

/* ─── Header ─── */
export function Header() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-primary-600">Ttaka<span className="text-accent-500">Market</span></span>
          </Link>

          {/* Desktop Nav (hidden on mobile — bottom nav is used instead) */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { name: 'Home', href: '/', Icon: Home },
              { name: 'Properties', href: '/properties', Icon: Building2 },
              { name: 'Saved', href: '/saved', Icon: Heart },
              { name: 'Messages', href: '/messages', Icon: MessageSquare },
            ].map(({ name, href, Icon }) => (
              <Link
                key={name}
                to={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'bg-primary-50 text-accent-500'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                )}
              >
                <Icon className="h-4 w-4" />
                {name}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/properties/new">
                  <button className="inline-flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" /> List Property
                  </button>
                </Link>
                <button className="relative p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-50 rounded-lg">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-accent-500 rounded-full" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar src={profile?.avatar_url} name={profile?.full_name} size="sm" />
                    <span className="text-sm font-medium text-gray-700">{profile?.full_name?.split(' ')[0]}</span>
                    {profile?.is_verified && <Shield className="h-3.5 w-3.5 text-accent-500" />}
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-gray-100 shadow-xl py-1 animate-fade-in z-50">
                      <Link to="/dashboard" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"><Building2 className="h-4 w-4" />Dashboard</Link>
                      <Link to="/profile" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"><User className="h-4 w-4" />Profile</Link>
                      <Link to="/properties/new" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"><Plus className="h-4 w-4" />Add Property</Link>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={() => { signOut(); setProfileMenuOpen(false); }} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-error-600 hover:bg-error-50"><LogOut className="h-4 w-4" />Sign Out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"><button className="text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">Sign In</button></Link>
                <Link to="/register"><button className="text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">Get Started</button></Link>
              </div>
            )}
          </div>

          {/* Mobile: hamburger (only for auth menu, nav is handled by bottom bar) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-2 py-3 mb-2 border-b border-gray-100">
                  <Avatar src={profile?.avatar_url} name={profile?.full_name} size="md" />
                  <div>
                    <p className="font-semibold text-gray-900">{profile?.full_name}</p>
                    <p className="text-xs text-gray-400">{profile?.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50"><Building2 className="h-5 w-5" />Dashboard</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50"><User className="h-5 w-5" />Profile</Link>
                <Link to="/properties/new" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-50"><Plus className="h-5 w-5" />List Property</Link>
                <hr className="my-1 border-gray-100" />
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-error-600 hover:bg-error-50"><LogOut className="h-5 w-5" />Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                  <Button variant="secondary" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                  <Button variant="primary" className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Bottom Navigation Bar ─── */
const bottomNavItems = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'Properties', href: '/properties', Icon: Building2 },
  { label: 'Saved', href: '/saved', Icon: Heart },
  { label: 'Messages', href: '/messages', Icon: MessageSquare },
  { label: 'Profile', href: '/profile', Icon: User },
];

export function BottomNav() {
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex items-stretch h-16 max-w-lg mx-auto">
        {bottomNavItems.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              to={href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-colors',
                  active ? 'text-accent-500' : 'text-gray-400'
                )}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className={cn(
                  'text-[10px] font-semibold transition-colors',
                  active ? 'text-accent-500' : 'text-gray-400'
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/* ─── Layout ─── */
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

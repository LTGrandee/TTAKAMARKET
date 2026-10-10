import { useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context';
import {
  Home, Building2, MessageSquare, Heart, User, Menu, X, Plus, Shield, ChevronRight, CircleHelp, ClipboardCheck, Globe2, Coins, Info, Mail, Scale, LockKeyhole,
} from 'lucide-react';
import { Avatar } from '../ui';
import { BrandLogo } from '../BrandLogo';
import { cn } from '../../lib/utils';

/* ─── Sidebar Drawer ─── */
function SidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, profile } = useAuth();
  const navigationLinks = [
    { label: 'Home', href: '/', Icon: Home },
    { label: 'Properties', href: '/properties', Icon: Building2 },
    { label: 'Saved properties', href: '/saved', Icon: Heart },
    { label: 'Messages', href: '/messages', Icon: MessageSquare },
    { label: 'Profile and settings', href: '/profile', Icon: User },
  ];
  const accountLinks = user
    ? [{ label: 'Dashboard', href: '/dashboard', Icon: Building2 }]
    : [
      { label: 'Sign in', href: '/login', Icon: User },
      { label: 'Create an account', href: '/register', Icon: Plus },
    ];
  const usefulLinks = [
    { label: 'FAQs', href: '/help#faqs', Icon: CircleHelp },
    { label: 'Help & support', href: '/help#support', Icon: MessageSquare },
    { label: 'Contact us', href: '/help#contact', Icon: Mail },
    { label: 'How it works', href: '/#how-it-works', Icon: CircleHelp },
    { label: 'Property guidance', href: '/#property-guidance', Icon: ClipboardCheck },
    { label: 'About TtakaMarket', href: '/about', Icon: Info },
    { label: 'Privacy policy', href: '/privacy', Icon: LockKeyhole },
    { label: 'Terms & conditions', href: '/terms', Icon: Scale },
  ];
  const renderLink = ({ label, href, Icon }: { label: string; href: string; Icon: typeof Home }) => (
    <Link key={href} to={href} onClick={onClose} className="group flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700">
      <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary-600" />
      <span className="flex-1">{label}</span>
      <ChevronRight className="h-4 w-4 text-gray-300" />
    </Link>
  );

  return (
    <>
      {open && (
        <button aria-label="Close menu" className="fixed inset-0 z-40 cursor-default bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account and navigation menu"
        aria-hidden={!open}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[min(88vw,22rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-primary-700 px-5 py-5">
          <div className="rounded-lg bg-white">
            <BrandLogo className="h-12 w-32 rounded-lg sm:w-36" />
          </div>
          <button onClick={onClose} aria-label="Close menu" className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {user && profile && (
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{profile.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{profile.email}</p>
            </div>
            {profile.is_verified && <Shield className="h-4 w-4 flex-shrink-0 text-accent-500" />}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="hidden md:block lg:hidden">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Navigation</p>
            <div className="space-y-1">{navigationLinks.map(renderLink)}</div>
          </div>
          <div className="mb-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Discover</p>
            <div className="space-y-1">{usefulLinks.map(renderLink)}</div>
          </div>
          <div className="mb-4 border-t border-gray-100 pt-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Preferences</p>
            <div className="space-y-1 px-3">
              <div className="flex min-h-11 items-center gap-3 text-sm text-gray-700" title="Interface language">
                <Globe2 className="h-5 w-5 text-gray-400" />
                <span className="flex-1">Language</span>
                <span className="text-xs font-medium text-gray-500">English</span>
              </div>
              <div className="flex min-h-11 items-center gap-3 text-sm text-gray-700" title="Prices are shown in each listing's stated currency; no currency conversion is applied">
                <Coins className="h-5 w-5 text-gray-400" />
                <span className="flex-1">Currency</span>
                <span className="text-right text-xs font-medium text-gray-500">As listed</span>
              </div>
            </div>
            <p className="px-3 pt-1 text-xs leading-5 text-gray-500">Interface language: English. Prices are displayed in the listed currency.</p>
          </div>
          <div className="mt-1 border-t border-gray-100 pt-4 md:mt-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Account</p>
            <div className="space-y-1">{accountLinks.map(renderLink)}</div>
          </div>
        </nav>
        <div className="border-t border-gray-100 px-5 py-4 md:hidden"><p className="text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} TtakaMarket · Uganda</p></div>
      </div>
    </>
  );
}

/* ─── Header ─── */
export function Header() {
  const { user, profile } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const targetId = location.hash.slice(1);
    if (!targetId) return;
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location.hash, location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" aria-label="TtakaMarket home" className="flex min-w-0 shrink-0 items-center">
              <BrandLogo className="h-12 w-32 sm:w-36" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
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
                    'flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive(href)
                      ? 'bg-primary-50 text-accent-500'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                  )}
                >
                  <Icon className="h-4 w-4" />{name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <Link to="/properties/new" className="inline-flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-accent-600 px-2.5 text-xs font-semibold text-white transition-colors hover:bg-accent-700 sm:px-3 sm:text-sm">
                <Plus className="h-4 w-4" /> <span className="hidden min-[380px]:inline sm:inline">Submit</span><span className="hidden sm:inline"> Property</span>
              </Link>
              {user ? (
                <Link to="/dashboard" className="hidden items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray-50 lg:flex">
                  <Avatar src={profile?.avatar_url} name={profile?.full_name} size="sm" />
                  <span className="text-sm font-medium text-gray-700">{profile?.full_name?.split(' ')[0]}</span>
                  {profile?.is_verified && <Shield className="h-3.5 w-3.5 text-accent-500" />}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hidden rounded-xl px-2 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-gray-50 hover:text-primary-600 lg:inline-flex">
                    Sign In
                  </Link>
                  <Link to="/register" className="hidden rounded-xl bg-primary-700 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 lg:inline-flex">
                    Get Started
                  </Link>
                </>
              )}

              <button
                onClick={() => setDrawerOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100"
                aria-label="Open account and navigation menu"
                aria-expanded={drawerOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

/* ─── Bottom Navigation ─── */
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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-stretch">
        {bottomNavItems.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              to={href}
              aria-current={active ? 'page' : undefined}
              className="flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors"
            >
              <Icon
                className={cn('h-5 w-5 transition-colors', active ? 'text-accent-600' : 'text-gray-400')}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={cn('truncate text-[10px] font-semibold', active ? 'text-accent-700' : 'text-gray-500')}>
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
      <main className="app-main flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <footer className="hidden border-t border-gray-200 bg-white md:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <BrandLogo className="h-12 w-36" />
            <p className="mt-1 text-sm text-gray-500">Property discovery and submissions across Uganda.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-gray-600">
            <Link className="hover:text-primary-700" to="/properties">Browse properties</Link>
            <Link className="hover:text-primary-700" to="/properties/new">Submit property</Link>
            <Link className="hover:text-primary-700" to="/register">Create account</Link>
            <Link className="hover:text-primary-700" to="/about">About</Link>
            <Link className="hover:text-primary-700" to="/help">Help & FAQs</Link>
            <Link className="hover:text-primary-700" to="/privacy">Privacy</Link>
            <Link className="hover:text-primary-700" to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

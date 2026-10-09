import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context';
import {
  Home, Building2, MessageSquare, Heart, User, Menu, X,
  Plus, Shield, Bell, ChevronRight,
  Calculator, Tag, BookOpen, Globe, HelpCircle, Phone,
  Target, Info, Lock, FileText, Bell as BellIcon,
  Handshake, CheckCircle, AlertCircle,
  Key, DollarSign
} from 'lucide-react';
import { Avatar } from '../ui';
import { cn } from '../../lib/utils';

/* ─── Sidebar sections ─── */
const sidebarSections = [
  {
    title: 'Property Management',
    items: [
      { label: 'Submit Property', href: '/properties/new', Icon: Plus },
      { label: 'Submission Status', href: '/dashboard', Icon: Building2 },
    ],
  },
  {
    title: 'Direct Deals',
    items: [
      { label: 'Why Buy Direct?', href: '#why-direct', Icon: Handshake },
      { label: 'Verification Process', href: '#verification', Icon: CheckCircle },
      { label: 'Safe Transaction Tips', href: '#safe-tips', Icon: AlertCircle },
    ],
  },
  {
    title: 'Property Tools',
    items: [
      { label: 'Mortgage Calculator', href: '#mortgage', Icon: Calculator },
      { label: 'Property Valuation', href: '#valuation', Icon: Tag },
      { label: 'Property Alerts', href: '/profile', Icon: BellIcon },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: "Buyer's Guide", href: '#buyers-guide', Icon: BookOpen },
      { label: "Seller's Guide", href: '#sellers-guide', Icon: BookOpen },
      { label: 'Rental Guide', href: '#rental-guide', Icon: Key },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Language', href: '#language', Icon: Globe },
      { label: 'Currency', href: '#currency', Icon: DollarSign },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', href: '#help', Icon: HelpCircle },
      { label: 'Contact Us', href: '#contact', Icon: Phone },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Our Mission', href: '#mission', Icon: Target },
      { label: 'About TtakaMarket', href: '#about', Icon: Info },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '#privacy', Icon: Lock },
      { label: 'Terms & Conditions', href: '#terms', Icon: FileText },
    ],
  },
];

/* ─── Sidebar Drawer ─── */
function SidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, profile } = useAuth();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-primary-600">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-white" />
            <span className="text-base font-bold text-white">Ttaka<span className="text-accent-400">Market</span></span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info strip (if logged in) */}
        {user && profile && (
          <div className="flex items-center gap-3 px-5 py-4 bg-primary-50 border-b border-primary-100">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{profile.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{profile.email}</p>
            </div>
            {profile.is_verified && <Shield className="h-4 w-4 text-accent-500 flex-shrink-0" />}
          </div>
        )}

        {/* Sections */}
        <div className="flex-1 overflow-y-auto py-2">
          {sidebarSections.map(({ title, items }) => (
            <div key={title} className="mb-1">
              <p className="px-5 pt-4 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {title}
              </p>
              {items.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  to={href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-accent-50 transition-colors">
                    <Icon className="h-4 w-4 text-primary-600 group-hover:text-accent-500 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">{label}</span>
                  <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400" />
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400 text-center">&copy; {new Date().getFullYear()} TtakaMarket. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

/* ─── Header ─── */
export function Header() {
  const { user, profile } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-primary-600">Ttaka<span className="text-accent-500">Market</span></span>
            </Link>

            {/* Desktop Nav */}
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
                  <Icon className="h-4 w-4" />{name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {/* Property submission button - visible on mobile too */}
                  <Link to="/properties/new" className="flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Submit Property</span>
                  </Link>
                  <button className="hidden md:flex relative p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-50 rounded-lg">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-accent-500 rounded-full" />
                  </button>
                  <Link to="/profile" className="hidden md:flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                    <Avatar src={profile?.avatar_url} name={profile?.full_name} size="sm" />
                    <span className="text-sm font-medium text-gray-700">{profile?.full_name?.split(' ')[0]}</span>
                    {profile?.is_verified && <Shield className="h-3.5 w-3.5 text-accent-500" />}
                  </Link>
                </>
              ) : (
                <>
                  {/* Sign In - visible on mobile */}
                  <Link to="/login" className="text-sm font-medium text-charcoal hover:text-primary-600 px-2 py-1.5 md:px-3 md:py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Sign In
                  </Link>
                  {/* Get Started - visible on mobile */}
                  <Link to="/register" className="text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors">
                    Get Started
                  </Link>
                </>
              )}

              {/* Hamburger — always visible */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Open menu"
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
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
                className={cn('h-5 w-5 transition-colors', active ? 'text-accent-500' : 'text-gray-400')}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={cn('text-[10px] font-semibold', active ? 'text-accent-500' : 'text-gray-400')}>
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

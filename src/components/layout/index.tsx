import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { Home, Building2, MessageSquare, Heart, User, Menu, X, LogOut, Plus, Shield, Bell } from 'lucide-react';
import { Button, Avatar } from '../ui';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Saved', href: '/saved', icon: Heart, auth: true },
  { name: 'Messages', href: '/messages', icon: MessageSquare, auth: true },
];

export function Header() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary-600">Ttaka<span className="text-accent-500">Market</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              if (item.auth && !user) return null;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/properties/new">
                  <button className="inline-flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" /> List Property
                  </button>
                </Link>
                <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-accent-500 rounded-full" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar src={profile?.avatar_url} name={profile?.full_name} size="sm" />
                    <span className="text-sm font-medium text-gray-700">{profile?.full_name?.split(' ')[0]}</span>
                    {profile?.is_verified && <Shield className="h-4 w-4 text-accent-500" />}
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl py-1 animate-fade-in">
                      <Link to="/dashboard" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                        <Building2 className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link to="/profile" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                        <User className="h-4 w-4" /> Profile
                      </Link>
                      <Link to="/properties/new" onClick={() => setProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                        <Plus className="h-4 w-4" /> Add Property
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={() => { signOut(); setProfileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error-600 hover:bg-error-50">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="text-sm font-medium text-gray-700 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => {
              if (item.auth && !user) return null;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium',
                    isActive(item.href) ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <item.icon className="h-5 w-5" />{item.name}
                </Link>
              );
            })}
            {user ? (
              <>
                <hr className="my-2 border-gray-100" />
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50">
                  <Building2 className="h-5 w-5" /> Dashboard
                </Link>
                <Link to="/properties/new" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50">
                  <Plus className="h-5 w-5" /> List Property
                </Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-error-600 hover:bg-error-50">
                  <LogOut className="h-5 w-5" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <hr className="my-2 border-gray-100" />
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

import { Building2 as BuildingIcon, Mail, Phone, MapPin, Shield as ShieldIcon, CheckCircle } from 'lucide-react';

const footerLinks = {
  company: [{ name: 'About Us', href: '/about' }, { name: 'How It Works', href: '/how-it-works' }, { name: 'Trust & Safety', href: '/trust' }, { name: 'Careers', href: '/careers' }],
  propertyTypes: [{ name: 'Residential Land', href: '/properties?type=residential_land' }, { name: 'Commercial Land', href: '/properties?type=commercial_land' }, { name: 'Houses', href: '/properties?type=house' }, { name: 'Apartments', href: '/properties?type=apartment' }, { name: 'Commercial Buildings', href: '/properties?type=commercial_building' }, { name: 'Agricultural Land', href: '/properties?type=agricultural_land' }],
  locations: [{ name: 'Kampala', href: '/properties?city=Kampala' }, { name: 'Entebbe', href: '/properties?city=Entebbe' }, { name: 'Jinja', href: '/properties?city=Jinja' }, { name: 'Mbarara', href: '/properties?city=Mbarara' }, { name: 'Gulu', href: '/properties?city=Gulu' }],
  support: [{ name: 'Help Center', href: '/help' }, { name: 'Contact Us', href: '/contact' }, { name: 'Report Fraud', href: '/report' }, { name: 'Privacy Policy', href: '/privacy' }, { name: 'Terms of Service', href: '/terms' }],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Verified Properties Only</h3>
                <p className="text-primary-200 text-sm">Every property on TtakaMarket is verified by our team</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-primary-200"><CheckCircle className="h-5 w-5" /><span className="text-sm">Owner Verified</span></div>
              <div className="flex items-center gap-2 text-primary-200"><CheckCircle className="h-5 w-5" /><span className="text-sm">Property Verified</span></div>
              <div className="flex items-center gap-2 text-primary-200"><CheckCircle className="h-5 w-5" /><span className="text-sm">Direct Deals</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <BuildingIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Ttaka<span className="text-accent-500">Market</span></span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">Africa's trusted property marketplace connecting verified property owners directly with buyers and tenants.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">{footerLinks.company.map((link) => <li key={link.name}><Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>)}</ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Property Types</h4>
            <ul className="space-y-3">{footerLinks.propertyTypes.map((link) => <li key={link.name}><Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>)}</ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Locations</h4>
            <ul className="space-y-3">{footerLinks.locations.map((link) => <li key={link.name}><Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>)}</ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">{footerLinks.support.map((link) => <li key={link.name}><Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">{link.name}</Link></li>)}</ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>support@ttakamarket.com</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+256 700 123 456</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Kampala, Uganda</span></div>
            </div>
            <div className="text-sm text-gray-500">&copy; {new Date().getFullYear()} TtakaMarket. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Outlet } from 'react-router-dom';
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

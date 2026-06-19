import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Users, Building2, MapPin, Search, MessageSquare, Calendar, AlertTriangle, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { Button, Badge, Card } from '../components/ui';
import { PropertyCard, SearchBar } from '../components/property';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Property } from '../lib/supabase';

const propertyTypes = [{ type: 'residential_land', label: 'Residential Land', icon: '🏠', count: 234 }, { type: 'commercial_land', label: 'Commercial Land', icon: '🏢', count: 156 }, { type: 'agricultural_land', label: 'Agricultural Land', icon: '🌾', count: 89 }, { type: 'house', label: 'Houses', icon: '🏡', count: 312 }, { type: 'apartment', label: 'Apartments', icon: '🏬', count: 198 }, { type: 'commercial_building', label: 'Commercial Buildings', icon: '🏗️', count: 67 }];
const howItWorks = [{ step: 1, title: 'Owner Registration', description: 'Property owners create an account and submit verification documents.', icon: Users }, { step: 2, title: 'Verification Process', description: 'We verify ownership documents, national ID, and property details.', icon: Shield }, { step: 3, title: 'Property Publication', description: 'Verified properties are published with the trusted verification badge.', icon: CheckCircle }, { step: 4, title: 'Direct Connection', description: 'Buyers and tenants connect directly with verified property owners.', icon: MessageSquare }];
const stats = [{ value: '5,000+', label: 'Verified Properties' }, { value: '12,000+', label: 'Happy Clients' }, { value: '2,500+', label: 'Verified Owners' }, { value: '98%', label: 'Satisfaction Rate' }];
const problems = [{ icon: AlertTriangle, title: 'Fake Listings', description: 'Fraudulent properties that don\'t exist' }, { icon: Users, title: 'Fake Brokers', description: 'Impersonators claiming to represent owners' }, { icon: TrendingUp, title: 'Hidden Costs', description: 'Inflated commissions and surprise fees' }, { icon: Shield, title: 'Ownership Disputes', description: 'Properties with unclear ownership' }];

export function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  useEffect(() => { fetchFeaturedProperties(); }, []);
  async function fetchFeaturedProperties() {
    try {
      const { data } = await supabase.from('properties').select(`*, images:property_images(*)`).eq('status', 'published').eq('verification_status', 'verified').order('created_at', { ascending: false }).limit(6);
      if (data && data.length > 0) setFeaturedProperties(data);
      else {
        const mockProperties: Property[] = [
          { id: '1', owner_id: 'mock', title: 'Prime Residential Land in Kololo', description: '', property_type: 'residential_land', listing_type: 'sale', price: 850000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 2500, size_unit: 'sqm', address: 'Kololo Hill Drive', city: 'Kampala', country: 'Uganda', features: ['Garden', 'Parking'], amenities: [], status: 'published', verification_status: 'verified', views_count: 234, saves_count: 45, inquiries_count: 12, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '1', property_id: '1', image_url: 'https://images.pexels.com/photos/106399?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
          { id: '2', owner_id: 'mock', title: 'Modern 4 Bedroom House in Muyenga', description: '', property_type: 'house', listing_type: 'sale', price: 1200000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 450, size_unit: 'sqm', bedrooms: 4, bathrooms: 3, parking_spaces: 2, address: 'Muyenga Tank Hill', city: 'Kampala', country: 'Uganda', features: ['Pool', 'Garden'], amenities: [], status: 'published', verification_status: 'verified', views_count: 189, saves_count: 67, inquiries_count: 23, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '2', property_id: '2', image_url: 'https://images.pexels.com/photos/259588?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
          { id: '3', owner_id: 'mock', title: 'Commercial Plot in Industrial Area', description: '', property_type: 'commercial_land', listing_type: 'sale', price: 450000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 5000, size_unit: 'sqm', address: 'Industrial Area', city: 'Kampala', country: 'Uganda', features: ['Corner Plot'], amenities: [], status: 'published', verification_status: 'verified', views_count: 156, saves_count: 34, inquiries_count: 8, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '3', property_id: '3', image_url: 'https://images.pexels.com/photos/323780?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
          { id: '4', owner_id: 'mock', title: 'Luxury Apartment in Nakasero', description: '', property_type: 'apartment', listing_type: 'rent', price: 3500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 120, size_unit: 'sqm', bedrooms: 2, bathrooms: 2, parking_spaces: 1, address: 'Nakasero Road', city: 'Kampala', country: 'Uganda', features: ['Balcony', 'Gym'], amenities: [], status: 'published', verification_status: 'verified', views_count: 312, saves_count: 89, inquiries_count: 34, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '4', property_id: '4', image_url: 'https://images.pexels.com/photos/1918290?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
          { id: '5', owner_id: 'mock', title: 'Agricultural Land in Mukono', description: '', property_type: 'agricultural_land', listing_type: 'sale', price: 250000000, price_unit: 'UGX', currency: 'UGX', size_sqm: 202343, size_unit: 'sqm', address: 'Mukono District', city: 'Mukono', country: 'Uganda', features: ['Water Source'], amenities: [], status: 'published', verification_status: 'verified', views_count: 98, saves_count: 23, inquiries_count: 5, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '5', property_id: '5', image_url: 'https://images.pexels.com/photos/1595104?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
          { id: '6', owner_id: 'mock', title: 'Office Space in Kampala CBD', description: '', property_type: 'office_space', listing_type: 'rent', price: 8500000, price_unit: 'UGX', currency: 'UGX', size_sqm: 200, size_unit: 'sqm', address: 'Kampala Road', city: 'Kampala', country: 'Uganda', features: ['AC', 'Elevator'], amenities: [], status: 'published', verification_status: 'verified', views_count: 167, saves_count: 41, inquiries_count: 15, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), images: [{ id: '6', property_id: '6', image_url: 'https://images.pexels.com/photos/1595104?w=800', is_primary: true, display_order: 0, created_at: new Date().toISOString() }] },
        ];
        setFeaturedProperties(mockProperties);
      }
    } catch (error) { console.error('Error:', error); }
  }

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/5 to-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8"><Shield className="h-5 w-5 text-primary-300" /><span className="text-sm font-medium text-white">Verified Owners. Direct Deals. No Middlemen.</span></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Africa's Trusted Property<span className="block text-primary-300">Marketplace</span></h1>
            <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10">Buy, sell, or rent properties with confidence. Every property is verified, every owner is vetted. No fraud. No fake brokers. Just trusted transactions.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/properties"><Button variant="accent" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>Browse Properties</Button></Link>
              <Link to="/register?type=owner"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">List Your Property</Button></Link>
            </div>
            <SearchBar variant="hero" />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (<div key={stat.label} className="text-center"><div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div><div className="text-sm text-primary-200">{stat.label}</div></div>))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><Badge variant="error" size="sm">The Problem</Badge><h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Property Fraud is a Major Issue in Africa</h2><p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Every day, thousands of people lose money through fake listings, fraudulent brokers, and property ownership disputes.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem) => (<Card key={problem.title} className="text-center p-6 bg-white border-error-100"><div className="w-14 h-14 bg-error-50 rounded-xl flex items-center justify-center mx-auto mb-4"><problem.icon className="h-7 w-7 text-error-600" /></div><h3 className="font-semibold text-gray-900 mb-2">{problem.title}</h3><p className="text-sm text-gray-500">{problem.description}</p></Card>))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><Badge variant="success" size="sm">Our Solution</Badge><h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Verification First. Trust Always.</h2><p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Before any property is listed, we verify both the owner and the ownership documents. Only verified properties make it to our marketplace.</p></div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200"><div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><CheckCircle className="h-8 w-8 text-white" /></div><h3 className="font-semibold text-gray-900 mb-2">Verified Owners</h3><p className="text-gray-600 text-sm">Every property owner is verified using government ID and ownership documents before they can list on our platform.</p></div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-success-50 to-success-100 border border-success-200"><div className="w-16 h-16 bg-success-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><Shield className="h-8 w-8 text-white" /></div><h3 className="font-semibold text-gray-900 mb-2">Verified Properties</h3><p className="text-gray-600 text-sm">Land titles, survey plans, and ownership certificates are verified by our team before publication.</p></div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent-50 to-accent-100 border border-accent-200"><div className="w-16 h-16 bg-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><MessageSquare className="h-8 w-8 text-white" /></div><h3 className="font-semibold text-gray-900 mb-2">Direct Communication</h3><p className="text-gray-600 text-sm">Connect directly with verified property owners. No middlemen. No hidden fees. Transparent transactions.</p></div>
          </div>
          <div className="bg-primary-900 rounded-2xl p-8 md:p-12 text-center"><h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Promise</h3><p className="text-lg text-primary-100 max-w-2xl mx-auto mb-6">Verify the Owner. Verify the Property. Build Trust.</p><div className="flex flex-wrap items-center justify-center gap-6 text-primary-200"><div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /><span>No fake listings</span></div><div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /><span>No fraudulent brokers</span></div><div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary-400" /><span>No hidden costs</span></div></div></div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900">How TtakaMarket Works</h2><p className="mt-4 text-lg text-gray-600">A simple, transparent process for safe property transactions</p></div>
          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (<div key={step.step} className="relative">{index < howItWorks.length - 1 && <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary-200 -translate-x-6" />}<div className="bg-white rounded-xl p-6 border border-gray-200 relative"><div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">{step.step}</div><div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4"><step.icon className="h-5 w-5 text-primary-600" /></div><h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3><p className="text-sm text-gray-500">{step.description}</p></div></div>))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Property Types</h2><p className="mt-4 text-lg text-gray-600">Find the perfect property for your needs</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {propertyTypes.map((type) => (<Link key={type.type} to={`/properties?type=${type.type}`} className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-300 hover:shadow-lg transition-all duration-300"><div className="text-4xl mb-3">{type.icon}</div><h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{type.label}</h3><p className="text-xs text-gray-500 mt-1">{type.count} listings</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8"><div><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Verified Properties</h2><p className="mt-2 text-lg text-gray-600">Recently listed properties from verified owners</p></div><Link to="/properties" className="hidden md:block"><Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>View All Properties</Button></Link></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{featuredProperties.map((property) => (<PropertyCard key={property.id} property={property} />))}</div>
          <div className="mt-8 text-center md:hidden"><Link to="/properties"><Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>View All Properties</Button></Link></div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything You Need</h2><p className="mt-4 text-lg text-gray-600">Powerful features for buyers, tenants, and property owners</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4"><div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><Search className="h-6 w-6 text-primary-600" /></div><div><h3 className="font-semibold text-gray-900 mb-1">Advanced Search</h3><p className="text-sm text-gray-500">Search by location, type, budget, and size. Find exactly what you're looking for.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="h-6 w-6 text-success-600" /></div><div><h3 className="font-semibold text-gray-900 mb-1">Interactive Maps</h3><p className="text-sm text-gray-500">View properties on the map and find the perfect location for your needs.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0"><Calendar className="h-6 w-6 text-accent-600" /></div><div><h3 className="font-semibold text-gray-900 mb-1">Schedule Viewings</h3><p className="text-sm text-gray-500">Book property inspections directly with verified owners.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center flex-shrink-0"><Shield className="h-6 w-6 text-error-600" /></div><div><h3 className="font-semibold text-gray-900 mb-1">Secure Messaging</h3><p className="text-sm text-gray-500">Private, secure communication between buyers and property owners.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0"><CheckCircle className="h-6 w-6 text-primary-600" /></div><div><h3 className="font-semibold text-gray-900 mb-1">Property Alerts</h3><p className="text-sm text-gray-500">Get notified when new properties match your criteria.</p></div></div>
            <div className="flex gap-4"><div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center flex-shrink-0"><AlertTriangle className="h-6 w-6 text-warning-600" /></div><div><h3 className="font-semibold text-gray-900 mb-1">Report Fraud</h3><p className="text-sm text-gray-500">Flag suspicious listings. We investigate all reports within 24 hours.</p></div></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Thousands</h2><p className="mt-4 text-lg text-gray-600">See what our users have to say about TtakaMarket</p></div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6"><div className="flex items-center gap-1 text-accent-500 mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-current" />))}</div><p className="text-gray-600 mb-4">"I had been looking for land for years but was always afraid of fraud. TtakaMarket gave me the confidence to finally make a purchase."</p><div className="flex items-center gap-3"><div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">JK</div><div><p className="font-semibold text-gray-900">John K.</p><p className="text-sm text-gray-500">Kampala</p></div></div></Card>
            <Card className="p-6"><div className="flex items-center gap-1 text-accent-500 mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-current" />))}</div><p className="text-gray-600 mb-4">"As a property owner, I was tired of dealing with fake brokers. Now I can list my properties and connect directly with genuine buyers."</p><div className="flex items-center gap-3"><div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center text-success-700 font-semibold">SM</div><div><p className="font-semibold text-gray-900">Sarah M.</p><p className="text-sm text-gray-500">Entebbe</p></div></div></Card>
            <Card className="p-6"><div className="flex items-center gap-1 text-accent-500 mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-current" />))}</div><p className="text-gray-600 mb-4">"I found my office space through TtakaMarket in just 2 weeks. The owner was verified, the paperwork was legit. Highly recommended!"</p><div className="flex items-center gap-3"><div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center text-accent-700 font-semibold">PO</div><div><p className="font-semibold text-gray-900">Peter O.</p><p className="text-sm text-gray-500">Jinja</p></div></div></Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">Join thousands of verified property owners, buyers, and tenants who trust TtakaMarket for safe property transactions.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register"><Button variant="accent" size="lg">Get Started Free</Button></Link>
            <Link to="/properties"><Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">Browse Properties</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

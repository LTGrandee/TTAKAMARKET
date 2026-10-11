import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, Building, Shield, CheckCircle, KeyRound } from 'lucide-react';
import { Button, Card, Input, Select, Textarea } from '../../components/ui';
import { BrandLogo } from '../../components/BrandLogo';
import { useAuth } from '../../context';
import type { MarketplaceListingIntent, PropertyCategory } from '../../lib/types';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  const [userType, setUserType] = useState<'buyer' | 'owner'>((searchParams.get('type') as 'buyer' | 'owner') || 'buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await signIn(email, password, userType);
      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
      console.error('Sign in error:', err);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white md:grid md:grid-cols-2 md:items-stretch md:gap-4 md:p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 md:min-w-0 md:p-0">
        <div className="w-full max-w-lg md:h-full">
          <Card className="flex flex-col justify-center p-5 sm:p-6 md:h-full md:p-8">
            <Link to="/" className="mb-3 inline-flex items-center gap-2 text-gray-500 hover:text-gray-700"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
            <div className="mb-3">
              <Link to="/" aria-label="TtakaMarket home" className="mb-3 hidden rounded-2xl bg-white lg:inline-flex"><BrandLogo className="h-12 w-36 rounded-2xl" /></Link>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Welcome back</h1>
              <p className="mt-1 text-sm text-gray-600 md:text-base">Sign in to continue your property search</p>
            </div>
            <div className="mb-3 flex gap-3">
              <button onClick={() => setUserType('buyer')} className={`min-h-12 flex-1 rounded-lg px-2 py-2 text-sm font-medium leading-tight transition-all md:min-h-16 md:px-3 md:text-base ${userType === 'buyer' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'}`}>Buyer or renter</button>
              <button onClick={() => setUserType('owner')} className={`min-h-12 flex-1 rounded-lg px-2 py-2 text-sm font-medium leading-tight transition-all md:min-h-16 md:px-3 md:text-base ${userType === 'owner' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'}`}>Owner or legal representative</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
              {error && <div className="p-3 bg-error-50 border border-error-200 rounded-lg text-sm text-error-700">{error}</div>}
              <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="h-5 w-5" />} className="md:py-3 md:text-base" required />
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock className="h-5 w-5" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>} className="md:py-3 md:text-base" required />
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700 md:text-base">
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center justify-between"><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /><span className="text-sm text-gray-600 md:text-base">Remember me</span></label></div>
              <Button type="submit" variant="primary" className="min-h-12 w-full md:min-h-14 md:text-base" loading={loading}>Sign In</Button>
            </form>
            <div className="mt-3 text-center text-sm text-gray-500 md:mt-5 md:text-base">Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Create one now</Link></div>
          </Card>
        </div>
      </div>
      <div className="relative flex w-full items-center justify-center bg-white px-4 pb-8 md:min-w-0 md:p-0">
        <div className="flex w-full items-center justify-center py-2 text-white md:h-full md:py-0">
          <div className="flex w-full max-w-lg flex-col justify-center rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-5 shadow-2xl sm:p-6 md:h-full md:p-8">
            <BrandLogo className="mx-auto mb-3 h-12 w-36 rounded-2xl bg-white" />
            <h2 className="text-center text-2xl font-bold leading-tight md:text-3xl">
              Uganda&apos;s Trusted Property Marketplace
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-5 text-primary-100 md:text-base md:leading-6">
              Real estate and accommodation, with administrator document review and property verification for a more transparent experience.
            </p>
            <div className="mt-5 space-y-3 rounded-2xl border border-white/15 bg-primary-950/20 p-4 md:space-y-4 md:p-5">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-200">Explore</h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium md:text-base">
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Residential, commercial and agricultural land</li>
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Homes, apartments, rooms and shared living</li>
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Offices, shops, arcades and malls</li>
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Warehouses, storage and industrial spaces</li>
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Hotels, lodges and short stays</li>
                </ul>
              </section>
              <section className="border-t border-white/15 pt-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-200">Managed review</h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium md:text-base">
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Administrator document review</li>
                  <li className="flex items-start gap-2"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />Property and representative checks before publication</li>
                </ul>
              </section>
              <section className="border-t border-white/15 pt-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-200">Find your next opportunity</h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium md:text-base">
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Buy</li>
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Rent</li>
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Lease</li>
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Book a stay</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/login" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
        <div className="mb-6">
          <Link to="/" aria-label="TtakaMarket home" className="mb-6 inline-flex rounded-lg bg-white">
            <BrandLogo className="h-14 w-40 rounded-lg" />
          </Link>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Forgot your password?</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Enter the email address for your account to see password recovery options.
          </p>
        </div>
        <Card className="p-6">
          {submitted ? (
            <div role="status" className="space-y-4">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Password recovery is not connected yet, so no reset email has been sent. Please contact our team through the Help Centre for assistance.
              </div>
              <Link to="/help#contact" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white hover:bg-primary-800">
                Contact TtakaMarket support
              </Link>
              <button type="button" onClick={() => setSubmitted(false)} className="min-h-11 w-full text-sm font-medium text-primary-700 hover:text-primary-800">
                Try another email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                id="recovery-email"
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                leftIcon={<Mail className="h-5 w-5" />}
                required
              />
              <Button type="submit" variant="primary" className="w-full">
                Continue
              </Button>
            </form>
          )}
        </Card>
        <p className="mt-6 text-center text-sm text-gray-500">
          Remembered your password? <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'buyer' | 'owner'>('buyer');
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', companyName: '', address: '', city: '', brandName: '', brandType: 'personal' as 'personal' | 'business', brandBio: '', allowChat: false, requestSellerPage: false, propertyCategories: [] as PropertyCategory[], listingIntents: [] as MarketplaceListingIntent[] });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string | boolean) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleMarketplacePreference = (field: 'propertyCategories' | 'listingIntents', value: PropertyCategory | MarketplaceListingIntent) => {
    setFormData((prev) => {
      const selected = prev[field] as (PropertyCategory | MarketplaceListingIntent)[];
      const next = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
      return { ...prev, [field]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName, userType, {
        ...(userType === 'owner' ? {
        seller_profile_enabled: formData.requestSellerPage,
        seller_profile_slug: formData.brandName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || formData.fullName.toLowerCase().replace(/\s+/g, '-'),
        seller_brand_name: formData.brandName || formData.fullName,
        seller_brand_type: formData.brandType,
        seller_brand_bio: formData.brandBio,
        seller_chat_enabled: formData.allowChat,
        } : (formData.propertyCategories.length > 0 || formData.listingIntents.length > 0) ? {
          marketplace_preferences: {
            property_categories: formData.propertyCategories,
            listing_intents: formData.listingIntents,
          },
        } : {}),
      });
      if (error) throw error;
      navigate('/dashboard?welcome=true');
    } catch (err) { setError('Registration failed. Please try again.'); console.error('Registration error:', err); }
    finally { setLoading(false); }
  };

  const userTypes = [{ type: 'buyer', label: 'Buyer or renter', description: 'I want to find property to buy, rent or lease', icon: User }, { type: 'owner', label: 'Owner or representative account', description: 'I want a dashboard to track submissions or use seller tools', icon: Building }];
  const steps = [{ id: 1, title: 'Account Type' }, { id: 2, title: 'Personal Info' }, { id: 3, title: 'Location & Consent' }];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
          <div className="mb-8">
            <Link to="/" aria-label="TtakaMarket home" className="mb-6 inline-flex rounded-2xl bg-white"><BrandLogo className="h-12 w-36 rounded-2xl" /></Link>
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="mt-2 text-gray-600">Create an account to save properties, use messages or track submissions in a dashboard. A one-time property submission does not require an account.</p>
          </div>
          <div className="flex items-center gap-4 mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{currentStep > step.id ? <CheckCircle className="h-4 w-4" /> : step.id}</div>
                  {index < steps.length - 1 && <div className={`flex-1 h-0.5 ${currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'}`} />}
                </div>
                <div className="mt-2"><p className="text-xs font-medium text-gray-900">{step.title}</p></div>
              </div>
            ))}
          </div>
          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              {error && <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg text-sm text-error-700">{error}</div>}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What best describes you?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {userTypes.map((type) => (
                      <button key={type.type} type="button" onClick={() => setUserType(type.type as 'buyer' | 'owner')} className={`p-4 rounded-lg border-2 text-left transition-all ${userType === type.type ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <type.icon className={`h-6 w-6 mb-2 ${userType === type.type ? 'text-primary-600' : 'text-gray-400'}`} />
                        <p className="font-medium text-gray-900">{type.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-600">
                    Only submitting property details and documents? <Link to="/properties/new" className="font-semibold text-primary-600 hover:text-primary-700">Submit without creating an account</Link>.
                  </div>
                  {userType === 'owner' && (
                    <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                      <div className="flex items-start gap-2"><Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-primary-900">TtakaMarket manages publication</p><p className="text-xs text-primary-700 mt-1">Share property details and supporting documents for administrator review, site survey and publication decision.</p></div></div>
                    </div>
                  )}
                  {userType === 'buyer' && (
                    <div className="mt-5 space-y-4 border-t border-gray-100 pt-5">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">What are you interested in? <span className="font-normal text-gray-500">(optional)</span></h3>
                        <p className="mt-1 text-xs leading-5 text-gray-500">Choose any categories and offer types. Your account can be used to explore everything on TtakaMarket; these choices only personalize discovery.</p>
                      </div>
                      <fieldset>
                        <legend className="mb-2 text-sm font-medium text-gray-700">Property categories</legend>
                        <div className="flex flex-wrap gap-2">
                          {([
                            ['land', 'Land'],
                            ['housing', 'Homes & rooms'],
                            ['commercial', 'Shops & commercial'],
                            ['storage', 'Storage & industrial'],
                          ] as const).map(([value, label]) => {
                            const selected = formData.propertyCategories.includes(value);
                            return (
                              <button key={value} type="button" aria-pressed={selected} onClick={() => toggleMarketplacePreference('propertyCategories', value)} className={`min-h-10 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'}`}>
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="mb-2 text-sm font-medium text-gray-700">Offer types</legend>
                        <div className="flex flex-wrap gap-2">
                          {([
                            ['sale', 'Buy'],
                            ['rent', 'Rent'],
                            ['lease', 'Lease'],
                            ['book', 'Book a stay'],
                          ] as const).map(([value, label]) => {
                            const selected = formData.listingIntents.includes(value);
                            return (
                              <button key={value} type="button" aria-pressed={selected} onClick={() => toggleMarketplacePreference('listingIntents', value)} className={`min-h-10 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'}`}>
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    </div>
                  )}
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Input label="Full Name" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => updateForm('fullName', e.target.value)} leftIcon={<User className="h-5 w-5" />} required />
                  <Input label="Email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} leftIcon={<Mail className="h-5 w-5" />} required />
                  <Input label="Phone Number" placeholder="+256 700 123 456" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} leftIcon={<Phone className="h-5 w-5" />} required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={formData.password} onChange={(e) => updateForm('password', e.target.value)} leftIcon={<Lock className="h-5 w-5" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>} required />
                    <Input label="Confirm Password" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => updateForm('confirmPassword', e.target.value)} required />
                  </div>
                  {userType === 'owner' && (
                    <>
                      <label className="flex items-start gap-3 text-sm text-gray-600"><input type="checkbox" checked={formData.requestSellerPage} onChange={(e) => updateForm('requestSellerPage', e.target.checked)} className="mt-1 rounded border-gray-300" /><span><strong className="text-gray-900">Create a managed seller page</strong><br />Present your properties under a consistent personal or business profile.</span></label>
                      {formData.requestSellerPage && <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
                        <p className="text-sm font-medium text-primary-900">Optional managed seller page</p>
                        <p className="text-xs text-primary-700 mt-1">TtakaMarket can create a personal or business-branded public page for you. Our administrators approve posts, uploads, and verification.</p>
                      </div>}
                      {formData.requestSellerPage && <>
                      <Input label="Public brand name" placeholder="e.g., Grace Mutesi Properties" value={formData.brandName} onChange={(e) => updateForm('brandName', e.target.value)} leftIcon={<Building className="h-5 w-5" />} />
                      <Select label="Brand type" options={[{ value: 'personal', label: 'Personal brand' }, { value: 'business', label: 'Business brand' }]} value={formData.brandType} onChange={(e) => updateForm('brandType', e.target.value as 'personal' | 'business')} />
                      <Textarea label="Short brand description (optional)" value={formData.brandBio} onChange={(e) => updateForm('brandBio', e.target.value)} rows={3} placeholder="Tell buyers what you offer..." />
                      <label className="flex items-start gap-3 text-sm text-gray-600"><input type="checkbox" checked={formData.allowChat} onChange={(e) => updateForm('allowChat', e.target.checked)} className="mt-1 rounded border-gray-300" /><span>Allow buyers to request chat with me when TtakaMarket enables it for an approved post.</span></label>
                      </>}
                    </>
                  )}
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Input label="Address" placeholder="Your physical address" value={formData.address} onChange={(e) => updateForm('address', e.target.value)} required />
                  <Input label="City" placeholder="Your city" value={formData.city} onChange={(e) => updateForm('city', e.target.value)} required />
                  <div className="mt-6"><label className="flex items-start gap-3"><input type="checkbox" required className="mt-1 rounded border-gray-300" /><span className="text-sm text-gray-600">I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-700">Terms of Service</Link> and <Link to="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link></span></label></div>
                </div>
              )}
              <div className="mt-6 flex gap-3">
                {currentStep > 1 && <Button type="button" variant="secondary" onClick={() => setCurrentStep(currentStep - 1)} className="flex-1">Back</Button>}
                {currentStep < 3 ? <Button type="button" variant="primary" onClick={() => setCurrentStep(currentStep + 1)} className="flex-1">Continue</Button> : <Button type="submit" variant="primary" loading={loading} className="flex-1">Create Account</Button>}
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Sign in</Link></div>
          </Card>
        </div>
      </div>
      <div className="relative w-full bg-white px-4 pb-10 lg:flex-1 lg:px-0 lg:pb-0">
        <div className="flex items-center justify-center py-4 text-white lg:h-full lg:px-8 lg:py-12 xl:px-20">
          <div className="w-full max-w-lg rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-6 shadow-2xl sm:p-8 xl:p-10">
            <BrandLogo className="mb-6 h-12 w-36 rounded-2xl bg-white" />
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">A managed property marketplace</h2>
            <div className="space-y-5">
              <section>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-200">Explore</h3>
                <ul className="space-y-2 text-sm font-medium sm:text-base">
                  <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />Residential, commercial and agricultural land</li>
                  <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />Homes, apartments, rooms and shared living</li>
                  <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />Offices, shops, arcades and malls</li>
                  <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />Warehouses, storage and industrial spaces</li>
                  <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />Hotels, lodges and short stays</li>
                </ul>
              </section>
              <section className="border-t border-white/15 pt-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-200">Find your next opportunity</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium sm:text-base">
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Buy</li>
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Rent</li>
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Lease</li>
                  <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-400" />Book a stay</li>
                </ul>
              </section>
              <section className="border-t border-white/15 pt-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-200">Managed review</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4"><div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10"><Shield className="h-5 w-5" /></div><div><h4 className="mb-1 font-semibold">Administrator review</h4><p className="text-sm text-primary-100">Review property details and representative documents</p></div></div>
                  <div className="flex items-start gap-4"><div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10"><CheckCircle className="h-5 w-5" /></div><div><h4 className="mb-1 font-semibold">Managed publication</h4><p className="text-sm text-primary-100">TtakaMarket controls approval and publication of submitted properties</p></div></div>
                  <div className="flex items-start gap-4"><div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10"><Lock className="h-5 w-5" /></div><div><h4 className="mb-1 font-semibold">Clear contact arrangements</h4><p className="text-sm text-primary-100">Enquiries can be routed to an owner, authorised representative or TtakaMarket</p></div></div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

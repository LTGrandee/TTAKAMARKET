import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, Building, Shield, CheckCircle } from 'lucide-react';
import { Button, Card, Input, Select, Textarea } from '../../components/ui';
import { BrandLogo } from '../../components/BrandLogo';
import { useAuth } from '../../context';
import type { RentalPreferences } from '../../lib/types';

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
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
          <div className="mb-8">
            <Link to="/" aria-label="TtakaMarket home" className="mb-6 inline-flex rounded-lg bg-white"><BrandLogo className="h-14 w-40 rounded-lg" /></Link>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to continue your property search</p>
          </div>
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <button onClick={() => setUserType('buyer')} className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${userType === 'buyer' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'}`}>Buyer or renter</button>
              <button onClick={() => setUserType('owner')} className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${userType === 'owner' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'}`}>Registered Owner/Legal Representative</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-error-50 border border-error-200 rounded-lg text-sm text-error-700">{error}</div>}
              <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="h-5 w-5" />} required />
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock className="h-5 w-5" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>} required />
              <div className="flex items-center justify-between"><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /><span className="text-sm text-gray-600">Remember me</span></label></div>
              <Button type="submit" variant="primary" className="w-full" loading={loading}>Sign In</Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Create one now</Link></div>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div className="relative h-full flex flex-col items-center justify-center px-20 text-white">
          <BrandLogo className="mb-8 h-24 w-72 rounded-2xl" />
          <h2 className="text-3xl font-bold mb-4 text-center">Uganda's property marketplace</h2>
          <p className="text-lg text-primary-100 text-center max-w-md">TtakaMarket is building a more transparent property market by clarifying ownership, representative authority, offer details and contact routes.</p>
          <div className="mt-8 grid grid-cols-2 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-lg font-bold sm:text-xl">Land · Homes</div>
              <div className="text-lg font-bold sm:text-xl">And short stays</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold sm:text-xl">Buy · Rent</div>
              <div className="text-lg font-bold sm:text-xl">Lease · Book</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<'buyer' | 'owner'>('buyer');
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', companyName: '', address: '', city: '', brandName: '', brandType: 'personal' as 'personal' | 'business', brandBio: '', allowChat: false, requestSellerPage: false, rentalAccommodation: 'residential', rentalDuration: 'long_term', rentalPurpose: 'living', rentalLiving: 'individual', rentalTenancy: 'sole_tenant', rentalPayment: 'monthly' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string | boolean) => setFormData((prev) => ({ ...prev, [field]: value }));

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
        } : {
          rental_preferences: {
            accommodation_type: formData.rentalAccommodation,
            duration: formData.rentalDuration,
            purpose: formData.rentalPurpose,
            living_arrangement: formData.rentalLiving,
            tenancy_arrangement: formData.rentalTenancy,
            payment_method: formData.rentalPayment,
          } as RentalPreferences,
        }),
      });
      if (error) throw error;
      navigate('/dashboard?welcome=true');
    } catch (err) { setError('Registration failed. Please try again.'); console.error('Registration error:', err); }
    finally { setLoading(false); }
  };

  const userTypes = [{ type: 'buyer', label: 'Buyer or renter', description: 'I want to find property to buy, rent or lease', icon: User }, { type: 'owner', label: 'Owner or representative account', description: 'I want a dashboard to track submissions or use seller tools', icon: Building }];
  const steps = [{ id: 1, title: 'Account Type' }, { id: 2, title: 'Personal Info' }, { id: 3, title: 'Location & Consent' }];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
          <div className="mb-8">
            <Link to="/" aria-label="TtakaMarket home" className="mb-6 inline-flex rounded-lg bg-white"><BrandLogo className="h-14 w-40 rounded-lg" /></Link>
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
                      <div><h3 className="text-base font-semibold text-gray-900">Rental preferences (optional)</h3><p className="text-xs text-gray-500 mt-1">These help TtakaMarket match you with suitable rental properties.</p></div>
                      <div className="grid grid-cols-2 gap-3">
                        <Select label="Accommodation" options={[{ value: 'residential', label: 'House / apartment' }, { value: 'room', label: 'Room / shared home' }, { value: 'commercial', label: 'Shop / office' }, { value: 'holiday_short_stay', label: 'Holiday / short stay' }, { value: 'storage_industrial', label: 'Storage / industrial' }]} value={formData.rentalAccommodation} onChange={(e) => updateForm('rentalAccommodation', e.target.value)} />
                        <Select label="Duration" options={[{ value: 'short_term', label: 'Days / weeks' }, { value: 'medium_term', label: 'Weeks / months' }, { value: 'long_term', label: 'Year or longer' }, { value: 'periodic', label: 'Weekly / monthly periodic' }]} value={formData.rentalDuration} onChange={(e) => updateForm('rentalDuration', e.target.value)} />
                        <Select label="Purpose" options={[{ value: 'living', label: 'Living' }, { value: 'student', label: 'Student' }, { value: 'holiday', label: 'Holiday' }, { value: 'temporary_work', label: 'Temporary work' }, { value: 'business', label: 'Business' }, { value: 'storage', label: 'Storage' }]} value={formData.rentalPurpose} onChange={(e) => updateForm('rentalPurpose', e.target.value)} />
                        <Select label="Living arrangement" options={[{ value: 'individual', label: 'Individual' }, { value: 'couple', label: 'Couple' }, { value: 'family', label: 'Family' }, { value: 'student', label: 'Student' }, { value: 'group', label: 'Group' }, { value: 'corporate', label: 'Corporate' }]} value={formData.rentalLiving} onChange={(e) => updateForm('rentalLiving', e.target.value)} />
                        <Select label="Tenancy" options={[{ value: 'sole_tenant', label: 'Sole tenant' }, { value: 'joint_tenants', label: 'Joint tenants' }, { value: 'subtenant', label: 'Subtenant' }, { value: 'leaseholder', label: 'Leaseholder' }, { value: 'lodger', label: 'Lodger' }]} value={formData.rentalTenancy} onChange={(e) => updateForm('rentalTenancy', e.target.value)} />
                        <Select label="Payment" options={[{ value: 'daily', label: 'Per day' }, { value: 'nightly', label: 'Per night' }, { value: 'weekly', label: 'Per week' }, { value: 'monthly', label: 'Per month' }, { value: 'advance', label: 'Several months in advance' }, { value: 'corporate_paid', label: 'Paid by company' }, { value: 'subsidised', label: 'Subsidised support' }]} value={formData.rentalPayment} onChange={(e) => updateForm('rentalPayment', e.target.value)} />
                      </div>
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
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div className="relative h-full flex flex-col justify-center px-20 text-white">
          <h2 className="text-3xl font-bold mb-6">A managed property marketplace</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><Shield className="h-5 w-5" /></div><div><h3 className="font-semibold mb-1">Administrator review</h3><p className="text-sm text-primary-100">Review property details and representative documents</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><CheckCircle className="h-5 w-5" /></div><div><h3 className="font-semibold mb-1">Managed publication</h3><p className="text-sm text-primary-100">TtakaMarket controls approval and publication of submitted properties</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><Lock className="h-5 w-5" /></div><div><h3 className="font-semibold mb-1">Clear contact arrangements</h3><p className="text-sm text-primary-100">Enquiries can be routed to an owner, lawful representative or TtakaMarket</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

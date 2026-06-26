import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, Building, Shield, CheckCircle } from 'lucide-react';
import { Button, Input, Card } from '../../components/ui';
import { useAuth } from '../../context';

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
      const { error } = await signIn(email, password);
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
            <Link to="/" className="flex items-center mb-6">
              <img src="/ttakamarket-logo.jpeg" alt="TtakaMarket" className="h-14 w-auto object-contain" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to continue your property search</p>
          </div>
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <button onClick={() => setUserType('buyer')} className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${userType === 'buyer' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'}`}>Property Seeker</button>
              <button onClick={() => setUserType('owner')} className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${userType === 'owner' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'}`}>Property Owner</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-error-50 border border-error-200 rounded-lg text-sm text-error-700">{error}</div>}
              <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="h-5 w-5" />} required />
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<Lock className="h-5 w-5" />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>} required />
              <div className="flex items-center justify-between"><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300" /><span className="text-sm text-gray-600">Remember me</span></label><Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">Forgot password?</Link></div>
              <Button type="submit" variant="primary" className="w-full" loading={loading}>Sign In</Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">Create one now</Link></div>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div className="relative h-full flex flex-col items-center justify-center px-20 text-white">
          <div className="bg-white rounded-2xl px-4 py-3 mb-8 shadow-xl">
            <img src="/ttakamarket-logo.jpeg" alt="TtakaMarket" className="h-20 w-auto object-contain" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">Africa's Trusted Property Marketplace</h2>
          <p className="text-lg text-primary-100 text-center max-w-md">Connect with verified property owners for safe, transparent transactions.</p>
          <div className="mt-8 grid grid-cols-2 gap-6 text-center"><div><div className="text-3xl font-bold">5,000+</div><div className="text-sm text-primary-200">Verified Properties</div></div><div><div className="text-3xl font-bold">2,500+</div><div className="text-sm text-primary-200">Verified Owners</div></div></div>
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
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', companyName: '', address: '', city: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateForm = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) throw error;
      navigate('/dashboard?welcome=true');
    } catch (err) { setError('Registration failed. Please try again.'); console.error('Registration error:', err); }
    finally { setLoading(false); }
  };

  const userTypes = [{ type: 'buyer', label: 'Property Seeker', description: 'I want to buy or rent property', icon: User }, { type: 'owner', label: 'Property Owner', description: 'I want to list my properties', icon: Building }];
  const steps = [{ id: 1, title: 'Account Type' }, { id: 2, title: 'Personal Info' }, { id: 3, title: 'Verification' }];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
          <div className="mb-8">
            <Link to="/" className="flex items-center mb-6">
              <img src="/ttakamarket-logo.jpeg" alt="TtakaMarket" className="h-14 w-auto object-contain" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="mt-2 text-gray-600">Join Africa's trusted property marketplace</p>
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
                  {userType === 'owner' && (
                    <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                      <div className="flex items-start gap-2"><Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" /><div><p className="text-sm font-medium text-primary-900">Verification Required</p><p className="text-xs text-primary-700 mt-1">As a property owner, you'll need to verify your identity and ownership documents before listing properties.</p></div></div>
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
                  {userType === 'owner' && <Input label="Company Name (Optional)" placeholder="Your company name" value={formData.companyName} onChange={(e) => updateForm('companyName', e.target.value)} leftIcon={<Building className="h-5 w-5" />} />}
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
          <h2 className="text-3xl font-bold mb-6">Why Choose TtakaMarket?</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><Shield className="h-5 w-5" /></div><div><h3 className="font-semibold mb-1">Verified Properties Only</h3><p className="text-sm text-primary-100">Every property is verified by our team before publication</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><CheckCircle className="h-5 w-5" /></div><div><h3 className="font-semibold mb-1">Direct Owner Contact</h3><p className="text-sm text-primary-100">Connect directly with verified owners, no middlemen</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0"><Lock className="h-5 w-5" /></div><div><h3 className="font-semibold mb-1">Secure Transactions</h3><p className="text-sm text-primary-100">Protected messaging and verified ownership documents</p></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

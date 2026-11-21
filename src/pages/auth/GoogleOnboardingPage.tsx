import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import { Button, Card, Input, Select } from '../../components/ui';
import { BrandLogo } from '../../components/BrandLogo';
import { useAuth } from '../../context';

export function GoogleOnboardingPage() {
  const navigate = useNavigate();
  const { completeGoogleProfile } = useAuth();
  const [form, setForm] = useState({ fullName: '', phone: '', userType: 'buyer' as 'buyer' | 'owner' | 'agent' | 'developer' | 'restoration_partner' | 'reporter', city: '' });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const update = (field: string, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const { error } = await completeGoogleProfile(form);
    if (error) {
      setError(error.message);
      return;
    }
    navigate('/dashboard?welcome=true');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-xl">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="h-4 w-4" />Back to sign in</Link>
        <Card className="mt-6 p-6 sm:p-8">
          <Link to="/" aria-label="TtakaMarket home" className="inline-flex rounded-xl bg-white"><BrandLogo className="h-10 w-32 rounded-xl" /></Link>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-700" />
            <div><h1 className="font-bold text-primary-900">Complete your Google account</h1><p className="mt-1 text-sm leading-5 text-primary-800">Google confirms your identity, but we still need a few details to personalise your account and support safe property submissions.</p></div>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input label="Full name" required value={form.fullName} onChange={(event) => update('fullName', event.target.value)} />
            <Input label="Phone number" type="tel" required value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+256 ..." />
            <Select label="Account type" required value={form.userType} onChange={(event) => update('userType', event.target.value)} options={[{ value: 'buyer', label: 'Property seeker' }, { value: 'owner', label: 'Property owner or land representative' }, { value: 'agent', label: 'Property agent' }, { value: 'developer', label: 'Property developer' }, { value: 'restoration_partner', label: 'Restoration partner' }, { value: 'reporter', label: 'Land reporter' }]} />
            <Input label="City or district" required value={form.city} onChange={(event) => update('city', event.target.value)} placeholder="e.g. Kampala" />
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-3"><input id="google-consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4 accent-primary-700" /><label htmlFor="google-consent" className="text-sm leading-5 text-gray-600">I agree to the TtakaMarket <Link to="/terms" className="font-semibold text-primary-700">terms</Link> and <Link to="/privacy" className="font-semibold text-primary-700">privacy policy</Link>.</label></div>
            {error && <p className="rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={!consent}><CheckCircle className="mr-2 h-4 w-4" />Complete account</Button>
          </form>
          <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-gray-500"><Mail className="h-3.5 w-3.5" />Your Google email is used for account communication.</p>
        </Card>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle, FileCheck2, Handshake, MapPin, Send, ShieldCheck } from 'lucide-react';
import { Button, Card, Input, Select, Textarea } from '../components/ui';
import type { RestorationPartnerApplication } from '../lib/types';
import { generateId } from '../lib/types';

const APPLICATIONS_KEY = 'ttakamarket_restoration_partner_applications';
const capabilities = ['Site assessment', 'Native planting', 'Erosion control', 'Community mobilisation', 'Waste or wetland recovery', 'Monitoring and evidence'];

export function RestorationPartnerPage() {
  const [submitted, setSubmitted] = useState<RestorationPartnerApplication | null>(null);
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [form, setForm] = useState({ organisation_name: '', contact_name: '', contact: '', partner_type: '', coverage: '', experience: '' });
  const update = (field: string, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const toggleCapability = (capability: string) => setSelectedCapabilities((current) => current.includes(capability) ? current.filter((item) => item !== capability) : [...current, capability]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const application: RestorationPartnerApplication = {
      id: `RSP-${generateId().slice(0, 8).toUpperCase()}`,
      ...form,
      capabilities: selectedCapabilities,
      status: 'submitted',
      created_at: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]') as RestorationPartnerApplication[];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify([application, ...existing]));
    setSubmitted(application);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <Card className="mx-auto max-w-xl p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-success-600" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Partner application received</h1>
          <p className="mt-3 text-gray-600">Thank you, {submitted.organisation_name}. Our team will review your capabilities and contact you using the details provided.</p>
          <div className="mt-5 rounded-xl bg-success-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-success-700">Application reference</p>
            <p className="mt-1 text-lg font-bold text-success-900">{submitted.id}</p>
            <p className="mt-2 text-sm text-success-800">Application status: Submitted for review. Approval is required before representing work as a TtakaMarket-verified partnership.</p>
          </div>
          <Link to="/restoration" className="mt-6 inline-block"><Button>Return to Restoration Hub</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-success-800 px-4 py-8 text-white sm:py-10">
        <div className="mx-auto max-w-3xl">
          <Link to="/restoration" className="inline-flex items-center gap-2 text-sm text-success-100 hover:text-white"><ArrowLeft className="h-4 w-4" />Back to Restoration Hub</Link>
          <div className="mt-5 flex items-start gap-4">
            <div className="hidden rounded-xl bg-white/10 p-3 sm:block"><Handshake className="h-7 w-7" /></div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-success-100">Restoration partners</p><h1 className="mt-2 text-3xl font-bold">Help restore land responsibly</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-success-100">Register your organisation, community group or technical team for consideration on assessed restoration projects.</p></div>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">{[{ Icon: FileCheck2, title: 'Share credentials', text: 'Tell us what you can deliver.' }, { Icon: MapPin, title: 'Choose coverage', text: 'Show where you operate.' }, { Icon: ShieldCheck, title: 'Review first', text: 'We verify before matching.' }].map(({ Icon, title, text }) => <Card key={title} className="p-4"><Icon className="h-5 w-5 text-success-700" /><p className="mt-2 text-sm font-semibold text-gray-900">{title}</p><p className="mt-1 text-xs leading-5 text-gray-500">{text}</p></Card>)}</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6"><h2 className="text-xl font-semibold text-gray-900">Organisation details</h2><p className="mt-1 text-sm text-gray-500">Applications are open to NGOs, community groups, local teams, consultants and implementation companies.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><Input label="Organisation or team name" required value={form.organisation_name} onChange={(event) => update('organisation_name', event.target.value)} /><Input label="Primary contact name" required value={form.contact_name} onChange={(event) => update('contact_name', event.target.value)} /><Input label="Phone or email" required value={form.contact} onChange={(event) => update('contact', event.target.value)} /><Select label="Partner type" required value={form.partner_type} onChange={(event) => update('partner_type', event.target.value)} placeholder="Select one" options={[{ value: 'ngo', label: 'NGO or nonprofit' }, { value: 'community_group', label: 'Community or landholder group' }, { value: 'social_enterprise', label: 'Social enterprise' }, { value: 'consultant', label: 'Environmental consultant' }, { value: 'company', label: 'Implementation company' }, { value: 'public_body', label: 'Public institution' }]} /><Input label="Districts or regions covered" required value={form.coverage} onChange={(event) => update('coverage', event.target.value)} placeholder="e.g. Kampala, Wakiso and Mukono" /></div></Card>
          <Card className="p-6"><h2 className="text-xl font-semibold text-gray-900">Capabilities and experience</h2><p className="mt-1 text-sm text-gray-500">Select everything your team can support.</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{capabilities.map((capability) => <label key={capability} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${selectedCapabilities.includes(capability) ? 'border-success-500 bg-success-50 text-success-900' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}><input type="checkbox" checked={selectedCapabilities.includes(capability)} onChange={() => toggleCapability(capability)} className="h-4 w-4 accent-success-700" />{capability}</label>)}</div><Textarea label="Relevant experience, references or credentials" required value={form.experience} onChange={(event) => update('experience', event.target.value)} placeholder="Describe similar work, years of experience, licences, certifications or community relationships." rows={5} /></Card>
          <div className="flex items-start gap-3 rounded-xl border border-warning-200 bg-warning-50 p-4 text-sm text-warning-900"><BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-700" /><p>Submitting an application does not grant access to land or permission to represent TtakaMarket. We will review your information before any project matching or public verification.</p></div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Link to="/restoration"><Button type="button" variant="secondary"><ArrowLeft className="mr-1 h-4 w-4" />Cancel</Button></Link><Button type="submit" size="lg" leftIcon={<Send className="h-4 w-4" />} disabled={selectedCapabilities.length === 0}>Submit partner application <ArrowRight className="ml-1 h-4 w-4" /></Button></div>
        </form>
      </main>
    </div>
  );
}

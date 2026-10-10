import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

const policyContent = {
  privacy: {
    title: 'Privacy policy',
    intro: 'TtakaMarket respects your privacy and handles personal information with care.',
    sections: [
      {
        title: 'Property submissions and documents',
        body: 'Property details and supporting documents help TtakaMarket review listings and connect property seekers with owners and authorised representatives.',
      },
      {
        title: 'Accounts, messages and preferences',
        body: 'Account, profile, saved-property and messaging information supports your marketplace experience and communications.',
      },
      {
        title: 'External services',
        body: 'Property images and related content may be provided by external services.',
      },
    ],
  },
  terms: {
    title: 'Terms & conditions',
    intro: 'These terms support a transparent, accountable experience for property seekers, owners and representatives.',
    sections: [
      {
        title: 'Property information',
        body: 'Property information, availability, prices and transaction terms should be independently confirmed with the owner or an authorised representative before making a decision.',
      },
      {
        title: 'Independent advice',
        body: 'TtakaMarket provides property marketplace information. For legal, financial, land or transaction advice, consult an appropriately qualified professional.',
      },
      {
        title: 'Independent checks',
        body: 'Before making a property decision, independently confirm the property, tenure, boundaries, authority to sell or let, documents and transaction terms with appropriate professionals and relevant authorities.',
      },
      {
        title: 'Marketplace conduct',
        body: 'Users should provide accurate property and representation details, communicate respectfully, and use marketplace tools for legitimate property enquiries.',
      },
    ],
  },
} as const;

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <BrandLogo className="h-16 w-48 rounded-xl" />
          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-primary-200">About us</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">About TtakaMarket</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-primary-100">
            TtakaMarket addresses the complex web of untrustworthy (fraudulent and manipulative) intermediaries in the real-estate market by making property offers, stated representation and enquiry routes clearer.
          </p>
        </div>
      </section>
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 sm:py-12 md:grid-cols-2 lg:px-8">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">A managed marketplace</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            TtakaMarket reduces unclear ownership claims, unauthorised representation, changing prices and unaccountable hand-offs. It brings stated ownership, representative authority, offer details and contact routes into clearer view. Legitimate agents are not inherently a problem; the concern is deceptive or unauthorised conduct. Owners or representatives can submit a property without an account.
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Transparent property journeys</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Our marketplace brings listings, owners, authorised representatives and property seekers together through clear property details and accountable contact routes.
          </p>
        </article>
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 md:col-span-2">
          <p className="flex items-center gap-2 font-semibold text-primary-900"><ShieldCheck className="h-5 w-5" /> Make independent checks</p>
          <p className="mt-2 text-sm leading-6 text-primary-800">
            Independently confirm property details and supporting documents with appropriate professionals and relevant authorities.
          </p>
          <Link to="/help" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary-700 hover:text-accent-700">
            Visit Help & FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PolicyPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const content = policyContent[kind];
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><FileText className="h-6 w-6" /></div>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">{content.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-100 sm:text-base">{content.intro}</p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {content.sections.map(({ title, body }) => (
          <section key={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
          </section>
        ))}
        <p className="px-1 text-xs leading-5 text-gray-500">For questions about these policies, contact TtakaMarket through the Help Centre.</p>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

const policyContent = {
  privacy: {
    title: 'Privacy policy',
    intro: 'This page describes the current TtakaMarket frontend prototype, not a production privacy programme.',
    sections: [
      {
        title: 'Information entered in the prototype',
        body: 'Property submission fields, selected photos and documents are used only in the browser demonstration. The prototype does not upload, submit or save these materials to a TtakaMarket service. Do not enter real personal information or upload sensitive documents.',
      },
      {
        title: 'Accounts, messages and preferences',
        body: 'Account, profile, saved-property and messaging screens are demonstration interfaces and are not connected to a production account or messaging service. Do not treat them as private storage or as a way to contact another person.',
      },
      {
        title: 'Third-party assets and future changes',
        body: 'The prototype may load demonstration images from external image hosts. Data practices, retention, security controls and contact details for any future live service will need to be published before that service launches.',
      },
    ],
  },
  terms: {
    title: 'Terms & conditions',
    intro: 'These notes explain the limits of using this demonstration website. They are not a substitute for reviewed terms for a live property service.',
    sections: [
      {
        title: 'Demonstration only',
        body: 'The website is a frontend prototype. Listings, prices, locations, people, metrics, messages and workflows may be illustrative and should not be relied on as current, complete or accurate property information.',
      },
      {
        title: 'No transaction or verification service',
        body: 'The prototype does not publish submissions, verify ownership or documents, arrange viewings, deliver enquiries, negotiate transactions or provide legal, financial or property advice. No property transaction is formed through these screens.',
      },
      {
        title: 'Independent checks',
        body: 'Before making a property decision, independently confirm the property, tenure, boundaries, authority to sell or let, documents and transaction terms with appropriate professionals and relevant authorities.',
      },
      {
        title: 'Operational terms',
        body: 'Terms governing a future live service, including eligibility, acceptable use, fees, dispute handling and liability, must be published and reviewed before that service is made available.',
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
            TtakaMarket is being shaped to address the complex web of untrustworthy (fraudulent and manipulative) intermediaries in the real-estate market by making property offers, stated representation and enquiry routes clearer.
          </p>
        </div>
      </section>
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 sm:py-12 md:grid-cols-2 lg:px-8">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">A managed marketplace concept</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            The proposed marketplace aims to reduce unclear ownership claims, unauthorised representation, changing prices and unaccountable hand-offs. It is intended to make stated ownership, authority to represent, offer details and contact routes easier to understand. Legitimate agents are not inherently a problem; the concern is deceptive or unauthorised conduct. Owners or representatives may preview a property submission without an account.
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Currently a prototype</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            This website demonstrates interface flows only. Submissions, accounts, listing verification, contact and messaging are not connected to live services. Examples are not evidence of verified properties or an operating review service.
          </p>
        </article>
        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 md:col-span-2">
          <p className="flex items-center gap-2 font-semibold text-primary-900"><ShieldCheck className="h-5 w-5" /> Make independent checks</p>
          <p className="mt-2 text-sm leading-6 text-primary-800">
            Do not rely on sample content when making decisions. Independently confirm property details and supporting documents with appropriate professionals and relevant authorities.
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
        <p className="px-1 text-xs leading-5 text-gray-500">Prototype information only. Have final policies reviewed and updated before operating a live service.</p>
      </div>
    </div>
  );
}

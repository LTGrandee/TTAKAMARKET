import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ClipboardCheck, FileText, MapPin, ShieldCheck, Users } from 'lucide-react';
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
        body: 'Listings present property information, availability, prices and contact details to help users explore options and connect with owners or authorised representatives.',
      },
      {
        title: 'Using the marketplace',
        body: 'TtakaMarket provides property listings and enquiry tools. Users and property contacts can discuss availability, viewing arrangements and transaction terms directly.',
      },
      {
        title: 'Listing review',
        body: 'Submitted listings are reviewed by the TtakaMarket team for completeness and supporting information before publication.',
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
          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-primary-200">Our concept</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Property discovery built on transparency</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-primary-100">
            TtakaMarket is building a trusted property discovery platform for Uganda. Listings are guided by a documented review process that helps seekers understand who posted a property, what information was checked and when it was last confirmed.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-700">The challenge</p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">Finding property should not depend on guesswork</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Property seekers in Uganda often rely on social media, brokers, referrals and informal networks. Listings can be outdated, ownership or authority may be unclear, and people can spend time and money travelling to properties that are unavailable or inaccurately described.
            </p>
          </article>
          <aside className="rounded-2xl border border-warning-200 bg-warning-50 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-warning-800">Why trust matters</p>
            <p className="mt-2 text-3xl font-extrabold text-warning-900">33,496</p>
            <p className="mt-1 text-sm leading-6 text-warning-900">
              pending land cases, valued at about UGX 1.7 trillion, were reported in Uganda’s courts as of January 2025, as cited in the concept note.
            </p>
          </aside>
        </section>

        <section className="rounded-2xl border border-primary-100 bg-primary-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary-700" />
            <h2 className="text-xl font-bold text-primary-900">A visible, documented review process</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-primary-800">
            TtakaMarket is designed to make review status, the checks recorded and the last confirmation date clear to property seekers. Review supports better-informed decisions; it is not a guarantee of title, legal ownership or a successful transaction.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['01', 'Submit listing', 'Property and contact details are provided.'],
              ['02', 'Review information', 'Supporting details and documents are checked.'],
              ['03', 'Make a decision', 'The review outcome and status are recorded.'],
              ['04', 'Publish listing', 'Approved information is made discoverable.'],
              ['05', 'Maintain listing', 'Availability and key details are reconfirmed over time.'],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-xl border border-primary-100 bg-white p-4">
                <span className="text-xs font-bold text-accent-700">{number}</span>
                <h3 className="mt-2 text-sm font-bold text-gray-900">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-primary-800">
            <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0" />
            Checks may cover identity, ownership or tenure information, authority to represent the owner and key property details. A review does not replace independent legal advice or due diligence.
          </p>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary-700" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent-700">12-month Kampala pilot</p>
              <h2 className="text-xl font-bold text-gray-900">Validate demand, then grow responsibly</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Validate the need', target: '45 interviews', detail: 'Speak with property seekers and providers; refine a standard review checklist.' },
              { title: 'Build the pilot', target: '100 reviewed listings', detail: 'Onboard at least 3 agency partners and grow an active seeker community.' },
              { title: 'Measure outcomes', target: '500 monthly active users', detail: 'Target UGX 6 million monthly revenue while monitoring trust and marketplace activity.' },
            ].map(({ title, target, detail }) => (
              <article key={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-gray-700">{title}</p>
                <p className="mt-2 text-2xl font-extrabold text-primary-700">{target}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-gray-500">These are pilot targets for validation, not current platform results. Longer term, TtakaMarket aims to expand across Uganda and promote more transparent listing practices.</p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary-700" />
            <h2 className="text-xl font-bold text-gray-900">Who TtakaMarket serves</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            The platform serves buyers, tenants, land seekers and commercial property seekers, while creating a clearer marketplace for individual owners, agents, agencies, developers and legal or verification service providers. Listings cover land, residential, commercial and short-stay property.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">A sustainable model that protects review integrity</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">Proposed fees fund marketplace services and visibility. Payment does not influence a listing’s review status.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { audience: 'Property owners & agents', price: 'UGX 25,000', term: 'per featured listing · 30 days' },
              { audience: 'Agencies', price: 'UGX 150,000', term: 'monthly subscription' },
              { audience: 'Developers', price: 'UGX 750,000', term: 'per project campaign' },
            ].map(({ audience, price, term }) => (
              <article key={audience} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700">{audience}</h3>
                <p className="mt-2 text-2xl font-extrabold text-primary-700">{price}</p>
                <p className="mt-1 text-sm text-gray-500">{term}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-primary-800 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">Funding the Kampala pilot</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-primary-100">
            TtakaMarket is seeking UGX 150 million in seed funding for a 12-month Kampala pilot. Funding will support product development, listing review and verification processes, pilot growth and regulatory compliance. The pilot will test demand and operational scalability before geographic expansion.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-primary-700" />
            <h2 className="text-lg font-bold text-gray-900">Managing trust risks</h2>
          </div>
          <ul className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
            <li><strong className="text-gray-800">Forged documents:</strong> documented checks and recorded review evidence.</li>
            <li><strong className="text-gray-800">Impersonation:</strong> identity and representative-authority checks.</li>
            <li><strong className="text-gray-800">Inaccurate information:</strong> recurring review and listing maintenance.</li>
            <li><strong className="text-gray-800">Trust challenges:</strong> clear review status and an auditable process.</li>
          </ul>
          <Link to="/help" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary-700 hover:text-accent-700">
            Visit Help & FAQs <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
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

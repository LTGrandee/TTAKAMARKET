import { Link } from 'react-router-dom';
import { ArrowRight, CircleHelp, FileText, LifeBuoy, Search } from 'lucide-react';

const frequentlyAskedQuestions = [
  {
    question: 'Do I need an account to submit a property?',
    answer: 'No. You can submit property details, photos, documents and contact information without creating an account. An account is optional for dashboard features.',
  },
  {
    question: 'Are property submissions sent to TtakaMarket?',
    answer: 'Not yet. This is a frontend prototype: the form can show a local preview, but it does not upload files or send or save your submission.',
  },
  {
    question: 'Have the sample listings and documents been verified?',
    answer: 'No. Listings shown in this prototype are examples. Their ownership, documents, location and contact details have not been verified.',
  },
  {
    question: 'Can I contact an owner or renter through the site?',
    answer: 'Messaging and enquiry screens are demonstration flows. They do not deliver messages to property owners or representatives.',
  },
  {
    question: 'How do I find a property by type or location?',
    answer: 'Browse properties and use the search and filters to narrow sample listings by category, property type, listing type and location.',
  },
  {
    question: 'What is the difference between rent and lease?',
    answer: 'Listings use the terms supplied for each example. Confirm the proposed duration, payment terms and legal agreement directly with the relevant parties before making a commitment.',
  },
];

export function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-200">TtakaMarket help centre</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Help, support & FAQs</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-100 sm:text-base">
            Find answers about browsing, property submissions and what this prototype can currently do.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:px-8 lg:py-12">
        <section id="faqs" className="scroll-mt-24">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700"><CircleHelp className="h-5 w-5" /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent-700">Quick answers</p>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Frequently asked questions</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {frequentlyAskedQuestions.map(({ question, answer }) => (
              <details key={question} className="group p-4 open:bg-primary-50/40 sm:p-5">
                <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 marker:hidden">
                  <span>{question}</span>
                  <span aria-hidden="true" className="text-xl text-primary-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-6 text-gray-600">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside id="support" className="scroll-mt-24">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700"><LifeBuoy className="h-5 w-5" /></div>
            <h2 className="mt-4 text-lg font-bold text-gray-900">Help & support</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              TtakaMarket is currently a prototype and does not have a live support desk. Submissions, messages and account changes shown here are not sent to a service team.
            </p>
            <div className="mt-5 rounded-xl bg-amber-50 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-amber-900"><FileText className="h-4 w-4 shrink-0" /> Before making property decisions</p>
              <p className="mt-2 text-sm leading-5 text-amber-800">
                Independently confirm property details and documents with appropriate professionals and relevant authorities.
              </p>
            </div>
            <div className="mt-5 space-y-2">
              <Link to="/properties" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white transition hover:bg-primary-800">
                Browse properties <Search className="h-4 w-4" />
              </Link>
              <Link to="/properties/new" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                Submit a property <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
        <section id="contact" className="scroll-mt-24 lg:col-start-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700"><LifeBuoy className="h-5 w-5" /></div>
            <h2 className="mt-4 text-lg font-bold text-gray-900">Contact us</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              There is no active customer service inbox or phone line for this prototype. Contact forms and property enquiries are not connected to a live team.
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Please do not use this prototype to send real identity, title or other sensitive documents. Contact details for the operational service will be published here when available.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

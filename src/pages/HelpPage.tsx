import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleHelp, FileText, LifeBuoy, MessageCircle, Search, Send, X } from 'lucide-react';
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_NUMBER, WHATSAPP_URL } from '../lib/contact';

const frequentlyAskedQuestions = [
  {
    question: 'Do I need an account to submit a property?',
    answer: 'No. You can submit property details, photos, documents and contact information without creating an account. An account is optional for dashboard features.',
  },
  {
    question: 'How are property submissions reviewed?',
    answer: 'Submissions include property details, supporting documents and the submitter’s relationship to the property.',
  },
  {
    question: 'How does TtakaMarket support transparent listings?',
    answer: 'Our listing review captures ownership or tenure information, the representative’s role and key property details before publication.',
  },
  {
    question: 'Who will respond to my property enquiry?',
    answer: 'Enquiries are directed to the owner, authorised representative or designated TtakaMarket contact shown for the listing.',
  },
  {
    question: 'Can I contact an owner or renter through the site?',
    answer: 'Use the enquiry option on a listing to contact the property owner or authorised representative.',
  },
  {
    question: 'How do I find a property by type or location?',
    answer: 'Browse properties and use the search and filters to narrow listings by category, property type, listing type, accommodation type, stay duration and location. Choose Book for short stays such as hotel rooms.',
  },
  {
    question: 'What is the difference between rent and lease?',
    answer: 'Rent usually refers to occupying a property for an agreed period. A lease sets out the terms for using property or land over a defined term.',
  },
];

export function HelpPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const chatPanelRef = useRef<HTMLElement>(null);
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!chatOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (chatPanelRef.current?.contains(target) || chatButtonRef.current?.contains(target)) return;
      setChatOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setChatOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [chatOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-primary-800 px-4 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-200">TtakaMarket help centre</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Help, support & FAQs</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-100 sm:text-base">
            Find help with browsing listings, submitting properties, contacting listing representatives and using marketplace features.
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
              Find property guidance, submission information and answers to common marketplace questions here.
            </p>
            <div className="mt-5 rounded-xl bg-primary-50 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary-900"><FileText className="h-4 w-4 shrink-0" /> Marketplace services</p>
              <p className="mt-2 text-sm leading-5 text-primary-800">
                Explore property listings, find short-stay accommodation, submit a property for review and send enquiries to the relevant listing contact.
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
              Our team can assist with listings, account access, accommodation enquiries and using TtakaMarket. For a property-specific enquiry, include the listing title and your preferred contact details.
            </p>
            <p className="mt-4 text-sm font-medium text-gray-700">
              WhatsApp/Call: <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-primary-700 underline underline-offset-2">{WHATSAPP_DISPLAY_NUMBER}</a>
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:bg-[#1fb958] focus-visible:outline-[#25D366]">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </section>
      </div>

      {chatOpen && (
        <section ref={chatPanelRef} role="dialog" aria-labelledby="support-chat-title" className="fixed bottom-[calc(9rem+env(safe-area-inset-bottom))] right-4 z-[60] flex max-h-[min(34rem,calc(100dvh-12rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:bottom-24">
          <header className="flex items-center justify-between bg-primary-800 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"><LifeBuoy className="h-5 w-5" /></div>
              <div>
                <h2 id="support-chat-title" className="font-semibold">TtakaMarket Support</h2>
                <p className="flex items-center gap-1.5 text-xs text-primary-100"><span className="h-2 w-2 rounded-full bg-amber-400" /> Live chat coming soon</p>
              </div>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} aria-label="Close support chat" className="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
          </header>
          <div className="space-y-4 overflow-y-auto bg-gray-50 p-4">
            <p className="text-center text-xs text-gray-400">TtakaMarket Support</p>
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-5 text-gray-700 shadow-sm">
              Hi there! Need help finding a place or submitting a listing? Our on-site live chat is being set up. For assistance now, message our team on WhatsApp.
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#25D366] px-3 text-sm font-semibold text-white transition hover:bg-[#1fb958]">
              <MessageCircle className="h-4 w-4" /> Message on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <form className="flex items-center gap-2 border-t border-gray-100 p-3" onSubmit={(event) => event.preventDefault()}>
            <input aria-label="Message support" disabled placeholder="Live chat will be available soon" className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-100 px-3 text-xs text-gray-500 placeholder:text-gray-400 disabled:cursor-not-allowed" />
            <button type="submit" disabled aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white opacity-50 disabled:cursor-not-allowed"><Send className="h-4 w-4" /></button>
          </form>
          <p className="border-t border-gray-100 px-3 py-2 text-center text-[11px] text-gray-400">Messaging will be enabled after live support is connected.</p>
        </section>
      )}

      <button
        type="button"
        ref={chatButtonRef}
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? 'Close support chat' : 'Open support chat'}
        title={chatOpen ? 'Close support chat' : 'Open live support chat'}
        aria-expanded={chatOpen}
        className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-white shadow-[0_4px_14px_rgba(0,0,0,0.22)] ring-1 ring-white/30 transition-[transform,box-shadow] duration-200 hover:scale-105 hover:bg-accent-600 hover:shadow-[0_6px_20px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-accent-500 sm:bottom-6"
      >
        {!chatOpen && <span aria-hidden="true" className="absolute inset-0 rounded-full bg-accent-500 motion-safe:animate-ping" />}
        {chatOpen ? <X className="relative z-10 h-5 w-5" /> : <LifeBuoy className="relative z-10 h-5 w-5" />}
      </button>
    </div>
  );
}

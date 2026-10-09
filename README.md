# TtakaMarket | Concept Note and Product Overview

> **Homepage positioning:** Uganda’s Trusted Property (Real-Estate) & Accommodation Marketplace.
>
> “Trusted” describes the marketplace ambition, not a claim that the current prototype or its sample listings have been verified.

## 1. Executive summary

TtakaMarket is a proposed Uganda-focused property (real-estate) and accommodation marketplace for land, homes, commercial and industrial premises, and temporary accommodation such as hotel rooms and short stays. People will be able to discover property to **buy, rent, lease, or book**. Owners and people with lawful authority to represent them will be able to submit property information without first creating an account.

The product's central purpose is to help **break the chain of manipulation and unlawful middlemen** in property transactions. It aims to make it easier to understand who owns or controls a property, who is authorised to represent the owner, what the stated price and terms are, and how an enquiry is expected to reach an accountable contact. Legitimate agents and representatives are not inherently a problem; the concern is unauthorised, misleading, or unaccountable intermediation.

TtakaMarket is not yet an operating verification, brokerage, booking, payment, or customer-support service. This repository is a responsive frontend prototype illustrating a proposed service. It uses sample data and browser `localStorage`; it does not verify documents or representatives, receive or publish property submissions, arrange bookings, deliver messages, or provide live support. All descriptions of future checks and operations in this note are product intentions, not claims that those services currently exist.

## 2. The problem

Property seekers in Uganda may encounter a chain of brokers, introducers, agents, and other intermediaries between themselves and the person who owns or is lawfully responsible for the property. As information changes hands:

- The actual owner or person with the right to offer the property may be unclear.
- An intermediary's authority to act may be difficult to establish.
- Prices, availability, property details, or transaction terms may change or conflict.
- The owner, seeker, and person making claims may be hard to connect directly.
- A misleading claim can be difficult to trace, challenge, or hold someone accountable for.

These conditions can expose buyers, renters, short-stay guests, and property owners to fraud, manipulation, wasted time, and avoidable disputes. A marketplace can reduce opportunities for these problems by creating clearer information and accountable contact paths, but it cannot eliminate risk or replace independent legal, land, identity, or payment checks.

## 3. Vision, mission, and objectives

**Vision:** A more transparent and accountable way to discover and transact around property in Uganda.

**Mission:** Build a marketplace that brings property information and enquiries closer to owners and properly authorised representatives, while reducing opaque hand-offs that enable manipulation.

Product objectives:

1. Make the owner or responsible party and any representative's stated authority visible and understandable.
2. Keep key details—price, property description, location, availability, and offer type—consistent across a listing and its enquiry path.
3. Design an administrator-led submission and publication process, with review records and clear decisions.
4. Let someone submit a property once without requiring a dashboard account; reserve accounts for people who want ongoing tools.
5. Support discovery across land, residential, commercial, storage/industrial, and temporary-stay needs.
6. Set accurate expectations: distinguish planned safeguards from completed checks, and sample content from live inventory.

## 4. Proposed marketplace model

TtakaMarket is intended to be a **managed marketplace**, not an open classifieds board where any user can instantly publish a public listing. In the proposed operating model:

- Property details are submitted by an owner or a person who states they have authority to represent the owner.
- A submission is not a public listing until the intended review and approval process has been implemented and completed.
- TtakaMarket controls publication and listing changes, and maintains a history of material changes.
- The listing presents the offer, price basis, location, property details, and contact route clearly.
- Enquiries are directed through a defined route to the owner, an authorised representative, or a TtakaMarket-managed contact, depending on the approved arrangement.
- Buyers, renters, and guests are encouraged to make independent checks before paying or committing.

The model is designed to reduce unaccountable hand-offs, not to label every agent or intermediary unlawful. Representatives who have genuine authority should be identifiable and accountable.

## 5. People served and account model

| User | Need | Proposed experience |
| --- | --- | --- |
| Buyer | Find land or built property to purchase and understand who is offering it | Search listings, compare stated details, and use an accountable enquiry route |
| Long-term renter or lessee | Find a home, room, commercial space, land, or other property for an agreed period | Filter by property and accommodation type, duration, purpose, and stated payment basis |
| Short-stay guest | Find a hotel room or other temporary accommodation | Discover short stays with daily or nightly price bases where provided; booking requires a future operational flow |
| Owner | Share an offer and reach genuine property seekers without managing a public seller dashboard | Make a one-time submission without an account and provide a preferred contact arrangement |
| Lawful representative or agent | Represent an owner transparently and show the basis of that representation | Submit the property and authority information for the proposed administrator review |
| Developer or business | Present multiple properties under a consistent, accountable process | Request a managed profile or property posts; public posts remain subject to the proposed approval process |
| TtakaMarket administrator | Review submissions, document decisions, and manage publication and enquiry routing | Use a future role-controlled operations console and auditable workflow |

**Account principle:** A one-time property submission should not require account creation. Accounts are optional for ongoing capabilities such as monitoring submissions, managing an approved profile, saving listings, or using future messaging tools. Account screens in the current prototype do not provide production authentication.

## 6. Property and transaction scope

The intended inventory spans:

| Property group | Examples |
| --- | --- |
| Land | Residential, commercial, agricultural, plain or vacant land |
| Housing | Houses, apartments, rooms, shared homes, and rental units |
| Commercial | Shops, offices, commercial buildings, hotels, lodges, and business premises |
| Storage / industrial | Warehouses, workshops, factories, garages, and storage premises |
| Temporary accommodation | Hotel rooms, lodges, holiday accommodation, and other short stays |

The marketplace distinguishes four seeker intents:

- **Buy:** property offered for sale.
- **Rent:** property or accommodation offered for rent, potentially on daily, nightly, weekly, monthly, or another stated basis.
- **Lease:** land or built property offered under a lease or other stated longer-term arrangement.
- **Book:** a discovery path for short stays, including hotel rooms. In a live product this would need availability, booking confirmation, cancellation, and payment rules. The prototype only filters sample short-stay listings; it does not accept reservations or payments.

Rental and stay details may include accommodation type, duration, purpose, intended occupancy, tenancy arrangement, and payment/rate basis. A displayed rate must make its unit clear (for example, per day, night, week, or month); price units and currencies should not be silently converted.

## 7. Trust, anti-manipulation, and safety principles

Trust is a process, not a badge. The proposed service should implement safeguards before describing a listing or person as verified:

1. **Authority before publication:** collect and review the submitter's identity and documentary basis for ownership, tenure, or representation.
2. **Consistent offer details:** retain the submitted price, offer type, availability, property description, and any approved changes in a traceable record.
3. **Documented review:** record who reviewed a submission, what evidence was considered, what remains uncertain, and the decision and date.
4. **Clear limitations:** explain what was checked, what was not checked, and when a review does not guarantee title, boundaries, condition, availability, or transaction safety.
5. **Accountable contact path:** identify whether a contact is the owner, authorised representative, or managed contact; avoid anonymous chains of introductions.
6. **Controlled publication:** only appropriately authorised staff should approve publication and material listing changes; retain an audit history.
7. **Reporting and escalation:** give users a real, staffed path to report suspected impersonation, misleading details, or fraud before promising that reports will be actioned.
8. **Independent decision-making:** encourage users to confirm documents, land status, identity, payment instructions, and legal terms with relevant authorities and qualified professionals.
9. **Privacy and security:** collect only necessary information, protect sensitive documents, restrict access, and publish retention and deletion rules before launch.
10. **No false assurance:** verification, review, seller status, sample metrics, and an attractive interface must never be presented as guarantees against fraud.

These are design and operational requirements. The current prototype has not implemented them as live controls.

## 8. Proposed user journeys

### 8.1 Find property to buy

1. Choose **Buy**, search by town, area, property type, or category.
2. Compare sample or, in a future live service, reviewed listings and stated prices.
3. Review who is offering the property and the scope and date of any checks.
4. Use the designated enquiry route; independently verify all material claims before a commitment.

### 8.2 Find a rental or lease

1. Choose **Rent** or **Lease**.
2. Filter by property or accommodation type, location, intended duration, and rate/payment basis.
3. Confirm availability, inclusions, deposit, payment schedule, responsibilities, and written terms directly through an accountable contact.
4. Independently check identity, authority, and the proposed agreement.

### 8.3 Find a temporary stay

1. Choose **Book** or the short-stay category.
2. Browse hotel rooms and other temporary accommodation with the displayed daily or nightly basis.
3. In the future service, check dates, availability, occupancy, inclusions, cancellation rules, and total price before confirming.
4. Use a secure, disclosed payment path only after the booking workflow exists.

The current frontend only applies short-stay filters and displays sample data; it does not check dates or availability, confirm reservations, or process payments.

### 8.4 Submit a property without an account

1. Enter the property, offer, price, location, and submitter/contact details.
2. State the submitter's relationship to the property and provide relevant evidence through a future secure upload service.
3. Preview the submission and receive a clear reference and status in the future live workflow.
4. An administrator would review the evidence and request corrections, decline, or approve for controlled publication.

The prototype can display a local preview only. It does not transmit the form, save it to TtakaMarket, or upload selected files. Do not submit real identity, title, or other sensitive documents through the prototype.

## 9. Proposed operating workflow

The future operational process is expected to include:

1. Intake and acknowledgement of a property submission.
2. Identity and contact checks appropriate to the submitter and the service's legal obligations.
3. Review of ownership or tenure evidence and the representative's authority.
4. Site visit or survey coordination where appropriate, with records of scope, date, observations, and unresolved issues.
5. Reconciliation of the submitted location, boundaries, property attributes, availability, price, and intended transaction.
6. A documented decision: request more information, decline, or approve for publication.
7. Controlled listing publication with a clear contact route, offer terms, review scope, and limitations.
8. Change control, enquiry tracking, complaint intake, escalation, and periodic review.

Operational staffing, professional qualifications, partnerships, service areas, fees, service-level targets, liability, and dispute procedures remain to be decided and validated before launch. Document or site review must not be described as a legal guarantee of ownership or a guarantee that fraud cannot occur.

## 10. Business and partnership considerations

The concept may require partnerships with qualified land and property professionals, surveyors, legal practitioners, identity-check providers, accommodation operators, payment providers, and relevant public authorities. Any partnership must have a defined scope, accountability, data-protection terms, and user-facing disclosures.

The revenue model is not specified in this prototype and should be validated with users and operators before implementation. Options such as submission/review fees, advertising, subscriptions, booking commissions, or transaction services would need transparent pricing, conflict-of-interest controls, and legal review. The product should not imply that a fee buys approval or verification.

## 11. Product goals

- Design property discovery that makes ownership, representative authority, offer terms, and independent checks clearer.
- Cover land and built property, long-term rentals and leases, and short stays.
- Support **Buy, Rent, Lease, and Book** with an accurate price basis, including daily and nightly rates where applicable.
- Keep public listing approval, document review, and publication under TtakaMarket control in the proposed live service.
- Provide an account-free one-time submission, with optional accounts for ongoing dashboard features.
- Support managed personal or business seller pages only as an approved service capability.
- Ensure future communication reaches the owner, an authorised representative, or the designated managed contact.
- Make prototype limitations and unverified sample content unmistakable.

## 12. Scope, boundaries, and intended outcomes

### In scope for the proposed service

- A Uganda-focused discovery marketplace covering land, residential, commercial, storage/industrial, and accommodation needs.
- The distinct **Buy**, **Rent**, **Lease**, and **Book** discovery journeys, with a clear price basis and currency.
- One-time owner or authorised-representative submissions without a required dashboard account.
- A proposed central review, approval, publication, and change-control process.
- Optional accounts for ongoing submission monitoring, saved listings, managed seller-page tools, and future communications.
- Clear disclosures about who is offering a listing, the stated representative relationship, what evidence has been reviewed, and what remains unchecked.

### Not implied by the concept or current prototype

- A guarantee of title, ownership, boundaries, property condition, legal authority, accuracy, availability, or transaction safety.
- A claim that every agent or intermediary is unlawful; the concern is unauthorised, misleading, or unaccountable conduct.
- A live estate-agency, legal, surveying, title-search, accommodation-provider, escrow, banking, or payment service.
- Instant public posting by submitters or independent approval and publication by seller accounts.
- A live booking or reservation confirmation, availability calendar, cancellation/refund service, or payment collection.
- A currently staffed customer-support or fraud-reporting operation.

These boundaries must be reflected in the interface, operating policies, partner agreements, and staff procedures before launch—not only in the README.

### Intended outcomes and evaluation

The concept should be evaluated on whether it creates more accountable and understandable property journeys, rather than on listing volume alone. Possible measures for a future live service include:

- The share of published listings with an identified owner or documented representative relationship.
- The share of submissions with a recorded review outcome and reason before publication.
- The frequency of material price, availability, authority, or property-detail discrepancies.
- The number and resolution time of reports involving impersonation or misleading claims.
- User understanding of the contact's role, review scope, price basis, and prototype/live-service limitations.
- Time from complete submission to review decision, and the reasons submissions are returned or declined.
- For short stays, successful date/availability checks, accurate total-price disclosure, cancellations, refunds, and support outcomes after a real booking service exists.

Targets should be set only after operational capacity and a baseline are established. Metrics must not reward rushed reviews, suppress legitimate complaints, or turn a review status into an unsupported guarantee.

## Current prototype: demonstrated screens and flows

### Property discovery

- Homepage with marketplace positioning, proposed trust principles, sample listings, search entry points, and Buy / Rent / Lease / Book options.
- Browse sample property cards with images, stated example prices, location, category, property type, offer type, and rate basis where available. Sample cards are not live inventory or verified offers.
- Search and filter by:
  - Buy, rent, lease, or book a short stay
  - Land, housing, commercial, or storage/industrial category
  - Specific property type
  - Search text
  - City
  - Rental accommodation type
  - Rental duration and short-stay type
  - Sort order
- Property detail pages with sample descriptions, images, pricing, location, physical attributes, rental suitability, and clearly labelled demonstration actions.
- Homepage category shortcuts for houses, apartments, land, commercial properties, storage, and short stays.
- Book search narrows results to sample short-stay accommodation. It does not check availability, accept reservations, or take payment.

### Land coverage

Land is a first-class marketplace category with support for:

- Residential land
- Commercial land
- Agricultural land
- Plain or vacant land
- Land offered for sale
- Land offered for rent
- Land offered under a lease or other approved tenure arrangement

In the proposed live service, land should not be advertised for a proposed use until the relevant ownership or tenure evidence, representative authority, intended use, and site conditions have been reviewed. The prototype does not perform any such review.

### Housing and built-property coverage

The property model also supports:

- Houses
- Apartments
- Rental units
- Mixed-use property
- Commercial buildings
- Offices
- Hotels and lodges
- Warehouses
- Storage and industrial premises
- Investment property

The broad category model separates:

| Category | Examples |
| --- | --- |
| Land | Residential, commercial, agricultural, and vacant land |
| Housing | Houses, apartments, rental units, and residential accommodation |
| Commercial | Shops, offices, commercial buildings, hotels, lodges, and business premises |
| Storage / Industrial | Warehouses, workshops, factories, garages, and storage premises |

### Proposed administrator-managed property submissions

The one-time submission flow is designed not to require an account. The prototype preview captures the submitter's name, phone number, relationship to the property, property information, location, and selected photos and supporting documents in browser memory only. An email address is optional. A dashboard account is intended for ongoing features such as monitoring submissions, seller-page tools, saved properties, and future messaging.

- Property title and description
- Land/housing/commercial/storage category
- Specific property type
- Buy, rent, lease, or short-stay booking intention
- Price and currency
- Size and unit
- Bedrooms, bathrooms, parking, and year built where relevant
- Address, city, region, and country
- Submitter name, phone number, optional email, and relationship to the property
- Property photos and supporting documents
- Features and preferred enquiry contact
- Rental or short-stay suitability details, including duration and daily, nightly, weekly, or monthly rate basis where applicable

The proposed administrator workflow would be:

1. Receive the owner or lawful representative submission.
2. Review identity, ownership, title, tenure, and supporting documents.
3. Confirm the submitting party's authority to act.
4. Conduct or coordinate a physical site survey.
5. Check location, size, access, use, condition, and material discrepancies.
6. Request corrections or additional evidence where required.
7. Approve and publish the property through TtakaMarket.
8. Manage advertising, enquiries, and approved contact routing.

The current frontend provides a no-account submission preview. Because this is a frontend-only prototype, it does not transmit or save submissions or upload selected files. A production backend, secure document storage, administrator queue, survey records, audit trail, and approval permissions still need to be implemented. Any operational review or follow-up described here is a product goal, not a service currently provided.

### Managed seller pages

The proposed service may provide a managed public page for an approved seller, owner, developer, agent, business, or personal brand. Seller pages shown in this prototype are previews only.

Seller registration can include:

- Personal or business branding
- Brand or business name
- Brand description
- Seller identity information
- Optional permission for customer engagement

Managed seller pages could show:

- Seller identity and branding
- About information
- Properties managed and published by TtakaMarket
- Verification and administrator-control messaging
- Optional customer contact actions

The intended seller dashboard would be limited to:

- Sending property post requests
- Monitoring request statuses
- Viewing published-post counts
- Reviewing basic performance indicators such as views
- Optionally engaging with customers where that arrangement is enabled

In the proposed model, sellers would not independently publish, approve, verify, or manage public listings. TtakaMarket would remain responsible for approval and publication. These controls are not implemented in the prototype.

### Rental and lease classification

The application supports renter preferences and rental property suitability information across multiple dimensions.

#### Accommodation

- Residential homes
- Rooms and shared homes
- Commercial premises
- Holiday and short-stay accommodation
- Storage and industrial spaces

#### Duration

- Short-term
- Medium-term
- Long-term
- Periodic tenancy

#### Purpose

- Living
- Student accommodation
- Holiday
- Temporary work
- Business
- Storage

#### Living arrangement

- Individual
- Couple
- Family
- Student
- Group
- Corporate

#### Tenancy arrangement

- Sole tenant
- Joint tenants
- Subtenant
- Leaseholder
- Lodger

#### Payment arrangement

- Daily
- Nightly
- Monthly
- Weekly
- Several periods paid in advance
- Corporate-paid
- Subsidised

Rental listings can include structured rental details, and renter registration can store optional preferences. Short-stay listings may use a daily or nightly basis; longer rentals can use weekly, monthly, or other agreed terms. The broader listing model supports land-only rent and lease arrangements; not every rented or leased property needs to be a house or room. Booking availability and reservation handling are future requirements, not prototype features.

### Communication and customer enquiries

- Property submission preview includes a contact preference.
- The prototype includes demonstration message and enquiry screens; no messages are delivered.
- The intended service should identify whether the contact is the owner, an authorised representative, or a TtakaMarket-managed contact.
- Seller pages may eventually support customer engagement where the arrangement is approved and controlled.
- In a production implementation, administrator-controlled routing should determine the appropriate contact and retain an audit trail. Never label a contact "verified" unless the corresponding checks have actually been completed and their scope is disclosed.

### User account experience

- Login and registration screens for people who want ongoing account features; authentication is simulated.
- One-time property submission preview is available without registering or signing in.
- Buyer accounts demonstrate saved properties, sample messaging, and optional renter preferences.
- Owner, agent, and developer accounts demonstrate dashboard concepts for submissions and managed seller-page requests; these are not connected to live data.
- Optional seller-page configuration during registration.
- Dashboard preview for submission status, managed seller-page status, post requests, sample performance, and rental preferences.
- Profile screen preview for account information and settings.
- Saved-property screen with sample listings.
- Mock sign-out support.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, featured properties, trust signals, and search entry points |
| `/login` | Sign in |
| `/register` | Register as a buyer, owner, agent, or developer |
| `/properties` | Browse and filter sample properties |
| `/properties/new` | Preview a property submission without an account; no data or files are sent |
| `/properties/:id` | View sample property details and demonstration actions |
| `/dashboard` | Preview dashboard, submission, and seller-page concepts |
| `/seller/:slug` | Preview a managed seller-page concept |
| `/messages` | View sample conversations; messages are not delivered |
| `/messages/:conversationId` | View a sample conversation |
| `/saved` | Preview saved-property cards |
| `/profile` | Preview account and profile settings |

## Technical stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| State | React Context and browser `localStorage` |
| Icons | Lucide React |
| Utility styling | `clsx` and `tailwind-merge` |
| Font | Inter via the application stylesheet |

## Project structure

```text
src/
├── components/
│   ├── layout/           # Header, navigation, mobile navigation, and drawer
│   ├── property/         # Property cards, search controls, and property UI
│   └── ui/               # Reusable buttons, inputs, cards, badges, modals, and selects
├── context/
│   └── AuthContext.tsx   # Mock authentication and profile persistence
├── lib/
│   ├── types.ts          # Domain types for profiles, properties, rentals, messages, and requests
│   └── utils.ts          # Formatting, labels, category helpers, and shared utilities
├── pages/
│   ├── auth/             # Login and registration
│   ├── dashboard/        # Submission and seller-page dashboard
│   ├── messages/         # Conversation and chat interface
│   ├── profile/          # Account profile
│   ├── properties/       # Browse, details, and property submission
│   ├── saved/            # Saved properties
│   ├── seller/           # Managed public seller page
│   └── HomePage.tsx      # Homepage
├── index.css             # Theme and global styles
├── main.tsx              # Application entry point
└── App.tsx               # Router and route definitions
```

## Getting started

### Requirements

- Node.js with npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Data and persistence status

This repository is currently a frontend-only demonstration:

- Authentication is simulated through React Context.
- The active user and profile are stored under `ttakamarket_auth` in browser `localStorage`.
- Any email/password combination can create or restore a mock session; passwords are not securely validated.
- Properties are mock data or in-memory/component state.
- Messages and conversations are mock data or UI state.
- Saved properties, appointments, submissions, seller metrics, document verification, and site surveys are not backed by a database.
- Uploaded documents and images are not sent to a real file-storage service.
- Seller pages currently demonstrate the managed-page experience and do not load seller records from a production API.
- There is no administrator portal or real role-based access control yet.

The application should therefore be treated as a product prototype, not as a production property-verification or transaction system.

## Recommended implementation roadmap

The prototype should only become a live marketplace after its operating model, partners, legal responsibilities, and safety controls are agreed. A sensible sequence is:

### Phase 1: Define and validate operations

- Validate user needs with owners, authorised representatives, buyers, renters, short-stay guests, and relevant professionals.
- Decide launch geography, property categories, review capacity, service levels, fees (if any), complaint escalation, liability, and the boundary between marketplace facilitation and regulated services.
- Establish legal, privacy, consumer-protection, land, tenancy, accommodation, and payment requirements with qualified local advisers.
- Define exactly what each future review status means and what evidence supports it; avoid guarantees that the process cannot substantiate.

### Phase 2: Build the secure submission and review foundation

- Implement secure authentication, password handling, contact verification, session management, and role-based access for administrators and users.
- Add persistent property, profile, seller-page, submission, and review records.
- Provide secure document and image uploads with least-privilege access, malware scanning, metadata controls, encryption, and retention/deletion policies.
- Build an administrator queue for identity, ownership/tenure evidence, lawful representation, and discrepancies, with decision reasons and correction requests.
- Add site-visit scheduling and structured field reports where appropriate.
- Keep an immutable audit history of material listing edits, document access, decisions, and publication events.

### Phase 3: Launch controlled discovery and enquiry

- Publish only approved listings with clear contact identity, review scope, price basis, currency, availability, and limitations.
- Add search indexing, pagination, location search, accessible filters, and user-facing reporting with staffed escalation.
- Implement controlled owner/representative/TtakaMarket enquiry routing, notification delivery, consent, abuse controls, and audit history.
- Measure whether the product reduces confusing hand-offs and improves accountability without overstating the impact.

### Phase 4: Add rental and short-stay operations

- Define and implement rental application, tenancy terms, payment schedule, deposits, and legally reviewed documents as appropriate.
- For **Book**, implement date-based availability, occupancy and inclusions, total price calculation, confirmation, cancellations/refunds, support, and secure payment only after provider and legal requirements are established.
- Clearly distinguish advertised daily/nightly rates from taxes, fees, deposits, and total stay cost.

### Phase 5: Operate and improve responsibly

- Deploy with monitoring, backups, rate limiting, incident response, access reviews, and error reporting.
- Audit verification quality, complaints, suspected fraud, listing changes, and operational outcomes.
- Review privacy and retention practices, staff permissions, accessibility, performance, and user comprehension on desktop and mobile.

## Deployment

The project includes SPA routing configuration for Netlify:

```text
/*    /index.html   200
```

The same fallback behavior must be configured on any other hosting provider so direct navigation to client-side routes continues to work.

## License

MIT

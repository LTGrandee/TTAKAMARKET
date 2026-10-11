# TtakaMarket | Uganda's Trusted Property Marketplace (Real-Estate & Accommodation)

> **Product concept:** One Uganda-focused marketplace to discover land, homes, commercial and industrial premises, and accommodation; compare offers to buy, rent, lease, or book; and connect with the owner, authorised representative, or listed contact.

## 1. Executive summary

TtakaMarket is a managed real-estate and accommodation marketplace for Uganda. It brings property discovery, listing submissions, owner and representative profiles, and customer enquiries together in one responsive app. Shoppers can browse land, homes, rooms, shops in arcades or malls, offices, commercial premises, storage and industrial space, hotels, lodges, and short stays.

Listings support four customer intents: **Buy**, **Rent**, **Lease**, and **Book**. Search tools help narrow options by category, property type, location, accommodation, duration, and offer. Listing cards and details present the available description, location, price, rate basis, features, and contact route.

Owners and people authorised to represent them can submit a property without creating an account. Optional accounts support saved listings, profiles, seller-page requests, submission dashboards, and future messaging. TtakaMarket's intended operating model includes managed review and publication rather than instant self-publishing.

The current repository is a frontend-led product build. It includes responsive discovery and submission journeys, account/profile screens, a support centre, contact links, and an on-site live-support UI preview. Listing data and conversation flows are currently mock/local state. Authentication, persistent data, secure document handling, administrator operations, live messaging, booking, and payments require backend and service integrations.

## 2. The problem

Property information is often spread across social posts, agents, operators, and informal contact networks. Customers may have to search multiple places to compare location, price, offer terms, availability, and the right person to contact. Owners and property professionals need a clear way to present offers and respond to relevant enquiries.

TtakaMarket addresses this discovery and coordination gap with a searchable, category-led marketplace, consistent listing details, a defined submission process, and direct contact routes. Its goal is to make finding and enquiring about property more convenient for customers and more organised for listing providers.

## 3. Vision, mission, and objectives

**Vision:** A trusted, convenient way for people in Uganda to discover property and accommodation and connect with the right contact.

**Mission:** Bring property discovery, clear offers, and relevant enquiries together in one Uganda-focused marketplace.

Product objectives:

1. Make it easy to discover property by broad category and specific property type.
2. Support buying, renting, leasing, and short-stay booking discovery with clear price bases.
3. Present useful location, offer, property, and contact details consistently.
4. Provide a straightforward, account-free submission path for owners and authorised representatives.
5. Support managed review and publication, with optional accounts for ongoing seller and customer tools.
6. Clearly distinguish working frontend flows from capabilities that depend on backend integration.

## 4. Proposed marketplace model

TtakaMarket is intended to be a **managed marketplace**, not an open classifieds board where any user can instantly publish a public listing. In the proposed operating model:

- Property details are submitted by an owner or a person who states they have authority to represent the owner.
- A submission is not a public listing until the intended review and approval process has been implemented and completed.
- TtakaMarket controls publication and listing changes, and maintains a history of material changes.
- The listing presents the offer, price basis, location, property details, and contact route clearly.
- Enquiries are directed through a defined route to the owner, an authorised representative, or a TtakaMarket-managed contact, depending on the approved arrangement.
- Buyers, renters, and guests can contact the listed property contact to ask questions and arrange next steps.

The model supports owners, agents, representatives, accommodation operators, and property seekers with clear listing roles and an organised enquiry path.

## 5. People served and account model

| User | Need | Proposed experience |
| --- | --- | --- |
| Buyer | Find land or built property to purchase and understand the offer | Search listings, compare stated details, and contact the listing representative |
| Long-term renter or lessee | Find a home, room, commercial space, arcade/mall shop, land, or other property for an agreed period | Filter by property and accommodation type, duration, location, and stated payment basis |
| Short-stay guest | Find a hotel room or other temporary accommodation | Discover short stays with daily or nightly price bases where provided; booking requires a future operational flow |
| Owner | Share an offer and reach property seekers without managing a public seller dashboard | Make a one-time submission without an account and provide contact details |
| Authorised representative or agent | Present a property offer and receive relevant enquiries | Submit property information and state their relationship to the property |
| Developer or business | Present multiple properties under a consistent, accountable process | Request a managed profile or property posts; public posts remain subject to the proposed approval process |
| TtakaMarket administrator | Review submissions, document decisions, and manage publication and enquiry routing | Use a future role-controlled operations console and auditable workflow |

**Account principle:** A one-time property submission should not require account creation. Accounts are optional for ongoing capabilities such as monitoring submissions, managing an approved profile, saving listings, or using messaging tools. The current frontend uses local account state while secure identity and session services are in development.

## 6. Property and transaction scope

The intended inventory spans:

| Property group | Examples |
| --- | --- |
| Land | Residential, commercial, agricultural, plain or vacant land |
| Housing | Houses, apartments, rooms, shared homes, and rental units |
| Commercial | Shops in arcades and malls, offices, commercial buildings, hotels, lodges, mixed-use buildings, and investment property |
| Storage / industrial | Warehouses, workshops, factories, garages, and storage premises |
| Temporary accommodation | Hotel rooms, lodges, holiday accommodation, and other short stays |

The homepage groups specific property types under compact, responsive category panels. Customers can browse homes and rooms, land, shops and commercial premises, storage and industrial space, or short stays, then jump directly to a specific type such as an arcade/mall shop.

The marketplace distinguishes four seeker intents:

- **Buy:** property offered for sale.
- **Rent:** property or accommodation offered for rent, potentially on daily, nightly, weekly, monthly, or another stated basis.
- **Lease:** land or built property offered under a lease or other stated longer-term arrangement.
- **Book:** a discovery path for short stays, including hotel rooms. Availability, booking confirmation, cancellation, and payment rules are part of the booking workflow under development. The current frontend filters preloaded short-stay listings.

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
10. **No false assurance:** verification, review, seller status, displayed metrics, and an attractive interface must never be presented as guarantees against fraud.

These are design and operational requirements. Safeguards and review controls are in development.

## 8. Proposed user journeys

### 8.1 Find property to buy

1. Choose **Buy**, search by town, area, property type, or category.
2. Compare available listings and stated prices, and review the scope and date of any completed checks.
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

The current frontend filters preloaded short-stay listings. Availability checks, reservation confirmation, and payment processing are in development.

### 8.4 Submit a property without an account

1. Enter the property, offer, price, location, and submitter/contact details.
2. State the submitter's relationship to the property and provide relevant evidence through a future secure upload service.
3. Preview the submission and receive a clear reference and status in the future live workflow.
4. An administrator would review the evidence and request corrections, decline, or approve for controlled publication.

The current submission form holds entered information in the browser. Secure submission, document storage, and administrator review are in development.

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

The revenue model for the service is being evaluated with users and operators. Options such as submission/review fees, advertising, subscriptions, booking commissions, or transaction services require transparent pricing, conflict-of-interest controls, and legal review. The product should not imply that a fee buys approval or verification.

## 11. Product goals

- Design property discovery that makes ownership, representative authority, offer terms, and independent checks clearer.
- Cover land and built property, long-term rentals and leases, and short stays.
- Support **Buy, Rent, Lease, and Book** with an accurate price basis, including daily and nightly rates where applicable.
- Keep public listing approval, document review, and publication under TtakaMarket control in the proposed live service.
- Provide an account-free one-time submission, with optional accounts for ongoing dashboard features.
- Support managed personal or business seller pages only as an approved service capability.
- Ensure future communication reaches the owner, an authorised representative, or the designated managed contact.
- Clearly distinguish safeguards in development from completed reviews and ensure property details are presented accurately.

## 12. Scope, boundaries, and intended outcomes

### In scope for the proposed service

- A Uganda-focused discovery marketplace covering land, residential, commercial, storage/industrial, and accommodation needs.
- The distinct **Buy**, **Rent**, **Lease**, and **Book** discovery journeys, with a clear price basis and currency.
- One-time owner or authorised-representative submissions without a required dashboard account.
- A proposed central review, approval, publication, and change-control process.
- Optional accounts for ongoing submission monitoring, saved listings, managed seller-page tools, and future communications.
- Clear disclosures about who is offering a listing, the stated representative relationship, what evidence has been reviewed, and what remains unchecked.

### Service boundaries

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
- User understanding of the contact's role, review scope, price basis, and which safeguards are in operation.
- Time from complete submission to review decision, and the reasons submissions are returned or declined.
- For short stays, successful date/availability checks, accurate total-price disclosure, cancellations, refunds, and support outcomes after a real booking service exists.

Targets should be set only after operational capacity and a baseline are established. Metrics must not reward rushed reviews, suppress legitimate complaints, or turn a review status into an unsupported guarantee.

## Current application: screens and flows

### Property discovery

- Homepage with marketplace positioning, trust principles, preloaded listings, search entry points, and Buy / Rent / Lease / Book options.
- Browse property cards with images, prices, locations, categories, property types, offer types, and rate basis where available. Listing review controls are in development.
- Homepage category panels group all supported property types into Homes & rooms, Land, Shops & commercial, Storage & industrial, and Short stays. Each panel provides direct links to its individual listing types.
- Search and filter by:
  - Buy, rent, lease, or book a short stay
  - Land, housing, commercial, or storage/industrial category
  - Specific property type
  - Search text
  - City
  - Rental accommodation type
  - Rental duration and short-stay type
  - Sort order
- Property detail pages with descriptions, images, pricing, location, physical attributes, rental suitability, and enquiry actions.
- Property-type shortcuts include houses, apartments, rental units and rooms, residential/commercial/agricultural land, arcade/mall shops, offices, commercial buildings, hotels/lodges, mixed-use and investment properties, warehouses, and short stays.
- Book search narrows results to short-stay accommodation. Availability checks, reservations, and payments are in development.

### Land coverage

Land is a first-class marketplace category with support for:

- Residential land
- Commercial land
- Agricultural land
- Plain or vacant land
- Land offered for sale
- Land offered for rent
- Land offered under a lease or other approved tenure arrangement

Land review workflows are being developed to assess ownership or tenure evidence, representative authority, intended use, and site conditions before publication.

### Housing and built-property coverage

The property model also supports:

- Houses
- Apartments
- Rental units
- Mixed-use property
- Commercial buildings
- Offices
- Hotels and lodges
- Shops in arcades and malls
- Warehouses
- Storage and industrial premises
- Investment property

The broad category model separates:

| Category | Examples |
| --- | --- |
| Land | Residential, commercial, agricultural, and vacant land |
| Housing | Houses, apartments, rental units, and residential accommodation |
| Commercial | Arcade/mall shops, offices, commercial buildings, hotels, lodges, mixed-use buildings, and investment properties |
| Storage / Industrial | Warehouses, workshops, factories, garages, and storage premises |

### Proposed administrator-managed property submissions

The one-time submission flow does not require an account. The current form captures the submitter's name, phone number, relationship to the property, property information, location, and selected photos and supporting documents in browser memory. An email address is optional. A dashboard account supports ongoing features such as monitoring submissions, seller-page tools, saved properties, and messaging.

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

Arcade and mall shops can be submitted for rent or lease. The flow requests the arcade/mall name, shop or room number, plot and street address, town/city, district, and contact name and phone/WhatsApp so prospective renters can identify the unit and contact its representative.

The proposed administrator workflow would be:

1. Receive the owner or lawful representative submission.
2. Review identity, ownership, title, tenure, and supporting documents.
3. Confirm the submitting party's authority to act.
4. Conduct or coordinate a physical site survey.
5. Check location, size, access, use, condition, and material discrepancies.
6. Request corrections or additional evidence where required.
7. Approve and publish the property through TtakaMarket.
8. Manage advertising, enquiries, and approved contact routing.

The current frontend provides a no-account submission flow. Secure submission storage, document upload, administrator queue, survey records, audit trail, and approval permissions are under development.

### Managed seller pages

Managed public pages are being developed for approved sellers, owners, developers, agents, businesses, or personal brands.

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

Seller dashboard tools will support:

- Sending property post requests
- Monitoring request statuses
- Viewing published-post counts
- Reviewing basic performance indicators such as views
- Optionally engaging with customers where that arrangement is enabled

Sellers do not independently publish, approve, verify, or manage public listings. TtakaMarket is responsible for approval and publication; the related controls are in development.

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

Rental listings can include structured rental details, and renter registration can store optional preferences. Short-stay listings may use a daily or nightly basis; longer rentals can use weekly, monthly, or other agreed terms. The broader listing model supports land-only rent and lease arrangements; not every rented or leased property needs to be a house or room. Booking availability and reservation handling are in development.

### Communication and customer enquiries

- Property submissions collect contact details and a preferred enquiry contact.
- The Help Centre presents the TtakaMarket WhatsApp/call contact and a floating support-chat UI. On-site chat is currently a UI preview; live messaging and delivery integrations are in development.
- Property conversation and enquiry screens are available; message delivery integrations are in development.
- The intended service should identify whether the contact is the owner, an authorised representative, or a TtakaMarket-managed contact.
- Seller pages may eventually support customer engagement where the arrangement is approved and controlled.
- In a production implementation, administrator-controlled routing should determine the appropriate contact and retain an audit trail. Never label a contact "verified" unless the corresponding checks have actually been completed and their scope is disclosed.

### User account experience

- Login and registration screens for people who want ongoing account features; secure authentication integrations are in development.
- One-time property submission is available without registering or signing in.
- Buyer accounts include saved properties, messaging, and optional renter preferences.
- Owner, agent, and developer accounts include dashboard tools for submissions and managed seller-page requests.
- Optional seller-page configuration during registration.
- Dashboard for submission status, managed seller-page status, post requests, performance, and rental preferences.
- Profile screen for account information and settings.
- Saved-property screen with listings.
- Sign-out support.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, featured properties, trust signals, and search entry points |
| `/login` | Sign in |
| `/register` | Register as a buyer, owner, agent, or developer |
| `/properties` | Browse and filter properties |
| `/properties/new` | Submit property details without an account |
| `/properties/:id` | View property details and enquiry actions |
| `/dashboard` | Manage submissions and seller-page settings |
| `/seller/:slug` | View a managed seller page |
| `/messages` | View property conversations |
| `/messages/:conversationId` | View a property conversation |
| `/saved` | View saved properties |
| `/profile` | Manage account and profile settings |
| `/help` | Browse FAQs, support information, contact details, and the support-chat preview |
| `/about` | Read about TtakaMarket |
| `/privacy` | Read the privacy policy |
| `/terms` | Read the terms and conditions |

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
│   └── AuthContext.tsx   # Authentication and profile state
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

The current application is a frontend-led development build:

- The frontend account flow uses React Context; secure authentication integrations are in development.
- The active user and profile are stored under `ttakamarket_auth` in browser `localStorage`.
- Property discovery currently uses preloaded listing records and in-memory/component state.
- Conversation screens use local application state; message delivery integrations are in development.
- Saved properties, appointments, submissions, seller metrics, document verification, and site surveys are being connected to persistent services.
- Secure document storage and uploads are in development.
- Seller pages use local profile state; production seller-record services are in development.
- The administrator portal and role-based access controls are in development.

Property verification, secure document storage, payment processing, and transaction workflows are under development.

## Recommended implementation roadmap

The marketplace rollout follows agreement on its operating model, partners, legal responsibilities, and safety controls. A sensible sequence is:

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

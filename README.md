# TtakaMarket

TtakaMarket is an administrator-managed property marketplace for land, housing, commercial premises, and storage/industrial property. It is designed around a trust-first operating model: property owners and lawful representatives submit property information, while TtakaMarket administrators review documents, coordinate site surveys, approve publication, manage advertising, and help coordinate enquiries.

The current repository is a responsive frontend prototype built with React and TypeScript. It demonstrates the intended marketplace experience and workflows using mock data and browser `localStorage`; it is not yet connected to a production backend.

## Product goals

- Make verified property discovery easier for buyers, renters, and lease seekers.
- Cover both land and built property rather than treating housing as the only inventory.
- Support property offered for **sale, rent, or lease**, including plain/vacant land.
- Keep public listing approval, verification, uploads, and publication under TtakaMarket control.
- Give owners and lawful representatives a clear submission and status experience instead of an independent seller-operated listing dashboard.
- Support optional TtakaMarket-managed personal or business seller pages.
- Provide structured rental matching for different renter needs and tenancy arrangements.
- Make communication possible with the owner, lawful representative, or TtakaMarket-managed contact according to the approved contact arrangement.

## What the application does

### Property discovery

- Landing page with marketplace positioning, trust signals, featured properties, and search entry points.
- Browse published property cards with images, pricing, location, verification state, property category, property type, and listing type.
- Search and filter by:
  - Sale, rent, or lease
  - Land, housing, commercial, or storage/industrial category
  - Specific property type
  - Search text
  - City
  - Rental accommodation type
  - Rental duration
  - Sort order
- Property detail pages with descriptions, images, pricing, location, physical attributes, rental suitability, verification status, and contact actions.
- Homepage category shortcuts for houses, apartments, land, housing, commercial properties, and short lets.

### Land coverage

Land is a first-class marketplace category with support for:

- Residential land
- Commercial land
- Agricultural land
- Plain or vacant land
- Land offered for sale
- Land offered for rent
- Land offered under a lease or other approved tenure arrangement

Land may be advertised for a proposed use only after the relevant ownership or tenure documents, lawful representative authority, intended use, and site conditions have been reviewed by TtakaMarket administrators.

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

### Administrator-managed property submissions

Anyone submitting a property can use the one-time submission flow without creating an account. It captures the submitter's name, phone number, relationship to the property, property information, location, photos, and supporting documents. An email address is optional. A dashboard account is only needed for ongoing features such as monitoring submissions, seller-page tools, saved properties, and messaging.

- Property title and description
- Land/housing/commercial/storage category
- Specific property type
- Sale, rent, or lease intention
- Price and currency
- Size and unit
- Bedrooms, bathrooms, parking, and year built where relevant
- Address, city, region, and country
- Submitter name, phone number, optional email, and relationship to the property
- Property photos and supporting documents
- Features and preferred enquiry contact
- Rental suitability details when applicable

The intended administrator workflow is:

1. Receive the owner or lawful representative submission.
2. Review identity, ownership, title, tenure, and supporting documents.
3. Confirm the submitting party's authority to act.
4. Conduct or coordinate a physical site survey.
5. Check location, size, access, use, condition, and material discrepancies.
6. Request corrections or additional evidence where required.
7. Approve and publish the property through TtakaMarket.
8. Manage advertising, enquiries, and approved contact routing.

The current frontend provides a no-account submission preview. Because this is a frontend-only prototype, it does not transmit or save submissions or upload selected files. A production backend, secure document storage, administrator queue, survey records, audit trail, and approval permissions still need to be implemented. In the live service, a submitter should be able to provide contact details and receive follow-up without needing a dashboard account.

### Managed seller pages

TtakaMarket can create a managed public page for an approved seller, owner, developer, agent, business, or personal brand.

Seller registration can include:

- Personal or business branding
- Brand or business name
- Brand description
- Seller identity information
- Optional permission for customer engagement

Managed seller pages can show:

- Seller identity and branding
- About information
- Properties managed and published by TtakaMarket
- Verification and administrator-control messaging
- Optional customer contact actions

The seller dashboard is intentionally limited. It is for:

- Sending property post requests
- Monitoring request statuses
- Viewing published-post counts
- Reviewing basic performance indicators such as views
- Optionally engaging with customers where that arrangement is enabled

Sellers do not independently publish, approve, verify, upload, or manage public listings. TtakaMarket remains responsible for post approvals, uploads, verification, and publication.

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

- Monthly
- Weekly
- Several periods paid in advance
- Corporate-paid
- Subsidised

Rental listings can include structured rental details, and renter registration can store optional matching preferences. The same broader listing model supports land-only rent and lease arrangements; not every rented or leased property needs to be a house or room.

### Communication and customer enquiries

- Property details include a contact preference.
- Messages and conversations can be associated with a property.
- Copy throughout the application describes communication with owners, lawful representatives, or TtakaMarket-managed contacts.
- Seller pages can optionally enable customer engagement.
- In a production implementation, administrator-controlled routing should determine whether an enquiry goes to TtakaMarket, the verified owner, or an authorized lawful representative.

### User account experience

- Login and registration pages for people who want ongoing account features.
- One-time property submission is available without registering or signing in.
- Buyer accounts support saved properties, messaging, and optional renter preferences.
- Owner, agent, and developer accounts can use the dashboard to monitor submissions and request managed seller-page tools.
- Optional seller-page configuration during registration.
- Dashboard for submission status, managed seller-page status, post requests, performance, and rental preferences.
- Profile page for account information.
- Saved-property page for bookmarked listings.
- Sign-out support.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, featured properties, trust signals, and search entry points |
| `/login` | Sign in |
| `/register` | Register as a buyer, owner, agent, or developer |
| `/properties` | Browse and filter published properties |
| `/properties/new` | Submit property details, photos, and documents without an account |
| `/properties/:id` | View property details |
| `/dashboard` | View submissions, managed seller-page information, post requests, and performance |
| `/seller/:slug` | View a TtakaMarket-managed seller page |
| `/messages` | View conversations and communicate about properties |
| `/messages/:conversationId` | Open a specific conversation |
| `/saved` | View saved properties |
| `/profile` | View and update profile information |

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

## Recommended production work

To turn the prototype into a working marketplace, the next backend and operational capabilities should include:

1. Secure authentication, password hashing, email/phone verification, and session management.
2. Role-based access control for administrators, owners, lawful representatives, agents, developers, renters, and buyers.
3. Persistent property, profile, seller-page, message, saved-property, and appointment records.
4. Secure document and image uploads with access control, virus scanning, metadata, and retention policies.
5. Administrator review queues for identity, title, ownership, tenure, lawful representation, and verification decisions.
6. Site-survey scheduling, field reports, coordinates, photos, discrepancies, and audit history.
7. Approval states and immutable audit logs for every property publication and change.
8. Controlled owner/representative/TtakaMarket chat routing and notification delivery.
9. Search indexing, pagination, geospatial search, category filters, and production analytics.
10. Rental and lease agreement workflows, payment terms, application handling, and legally reviewed contract templates.
11. Safeguards for fraud prevention, privacy, consumer protection, and applicable land, tenancy, and property laws.
12. Production deployment configuration, monitoring, backups, rate limiting, and error reporting.

## Deployment

The project includes SPA routing configuration for Netlify:

```text
/*    /index.html   200
```

The same fallback behavior must be configured on any other hosting provider so direct navigation to client-side routes continues to work.

## License

MIT

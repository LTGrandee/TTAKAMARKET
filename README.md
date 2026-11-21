# TtakaMarket

TtakaMarket is Uganda's Trusted Property & Accommodation Marketplace. It combines property discovery, property verification and environmental screening with a planned network for consented, evidence-led land restoration.

The frontend currently provides responsive discovery, submission, account, property, accommodation, restoration and support experiences using local or mock data.

## Platform roles

### Property marketplace

Discover land, homes, commercial premises, storage and industrial property, and accommodation across Uganda. Listings are organised around four intents:

- **Buy** - property offered for sale
- **Rent** - property or accommodation offered for an agreed rental period
- **Lease** - land or built property offered under a lease or longer-term arrangement
- **Book** - hotels, lodges, guest rooms, venues and short-stay accommodation

Customers can search and filter by category, property type, location, offer type, accommodation type, stay duration and sorting preference.

### Property verification

Listing review is designed to make owner or representative authority, property information, supporting documents and publication status clearer. Verification is presented as a process with pending, under-review and verified states rather than an unchecked guarantee.

### Environmental and land screening

TtakaMarket includes preliminary screening for:

- Wetlands
- Road reserves
- Forest areas
- Riverbanks
- Protected areas
- Weather exposure
- Infestations

Infestation options include mosquitoes, termites, rodents, ants, cockroaches, bed bugs and ticks. Accommodation submissions can additionally record common room temperature, weather exposure, pest-control measures and comfort notes.

Environmental screening is preliminary information and does not replace permits, environmental impact assessments, title checks or independent expert advice.

### Land restoration network

The Restoration Hub provides:

- Screening and project discovery
- District and risk filters
- Interactive project selection and list/map views
- Saved restoration projects
- Restoration report submission
- Restoration partner registration and project proposals
- Consent, evidence and verification status messaging

## App features

- Responsive desktop and mobile layout
- Mobile bottom navigation and accessible account drawer
- Guest and authenticated header states
- Login, registration and Google onboarding preview
- Buyer, renter and property-provider account flows
- Property and accommodation submission journeys
- Property details, image galleries, owner or representative profiles and enquiry routes
- Saved properties and saved restoration projects
- Rental and marketplace preferences
- Property and accommodation checkboxes, temperature fields and screening questions
- Weather-exposure and infestation checkboxes
- Protected, consent-aware restoration reporting
- Messages preview and notification interface
- Help centre, privacy, terms and about pages
- WhatsApp support and floating contact action
- Lazy-loaded routes and route-level loading states

## Local development

Requirements:

- Node.js 20 or newer
- npm

```powershell
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173`.

## Validation

```powershell
npm run build
npm run lint
npm run dev -- --host 127.0.0.1
```

The build is split into route-level chunks for faster loading. The production output also includes TtakaMarket's React application assets and Tailwind styles.

## Current data model

The current repository is a frontend-led product implementation:

- Authentication uses local browser storage
- Property and conversation data uses local mock arrays
- Saved items and restoration reports use browser storage
- Evidence files are recorded as filenames until secure media upload is connected
- Messages and notifications are preview flows
- Booking availability is discovery or submission information, not a live reservation system

Backend services will be needed for secure identity, persistent listings, document storage, administrator review, live messaging, availability, booking and payment operations.

## Project structure

- `src/App.tsx` - routes and lazy-loaded page imports
- `src/components/` - layout, UI, property and brand components
- `src/context/` - local authentication provider
- `src/lib/` - shared types and utilities
- `src/pages/` - marketplace, account, dashboard, restoration and information pages
- `public/` - static assets and hosting redirects

## Repository

GitHub: https://github.com/LTGrandee/TTAKAMARKET.git

# Business OS

**Start Your Business in One Minute.**

A [Technonaire](https://technonaire.com/) product.

Business OS is a global multi-tenant SaaS platform for entrepreneurs. Get a beautiful website to take orders, manage your sales pipeline, or do both. Works for any business, anywhere.

## What You Can Do

### 🌐 My Business (Main Module)
**Your complete business platform** - Launch your business online instantly:
- Get a custom booking/ordering page live in 60 seconds
- Accept appointments, bookings, or simple product orders 24/7
- Manage services, schedules, staff, and pricing
- Track customer orders and payments
- **Built-in sales tools included:** pipeline, leads, contacts, tasks, analytics

**Perfect for:** Salons, consultants, photographers, cleaning services, tutors, studios, repair services, wellness providers, and more.

### 💼 Sales Management (Optional Standalone)
Manage your entire sales operation **without a booking site** (optional for those who only need CRM):
- Capture and qualify leads automatically
- Visual pipeline to track deals through stages
- Tasks and follow-ups so nothing slips
- Dashboard with pipeline value and metrics

**Perfect for:** B2B sales teams, agencies, consultancies, freelancers, professional services who don't need a booking site.

### 💳 Pricing & Plans
Three pricing tiers to fit your needs:
- **Free:** Perfect for getting started (1 site, 5 services, 50 bookings/month)
- **Growth ($29/mo):** For growing businesses (unlimited bookings, full Sales CRM, 5 team seats)
- **Business ($99/mo):** For teams & scale (unlimited everything, advanced analytics, dedicated support)

**Payment Flow Mockup:** Complete checkout and billing management UI (demo mode - no real charges). Ready for Stripe integration - just add `STRIPE_SECRET_KEY`.

### ⚡ Use Both Together
Accept orders from your website **and** manage B2B sales pipelines in one platform. Bookings can feed into your sales workflow when both modules are enabled.

## Key Features

- **One-Minute Setup:** No technical knowledge required. Choose your modules and go live.
- **Multi-Tenant:** Strong data isolation. Your business is completely separate from others.
- **Global Ready:** Multi-currency support (USD, EUR, GBP, AED, etc.). Works worldwide.
- **Mobile Friendly:** Manage everything from your phone. Customer pages are mobile-optimized.
- **Team Collaboration:** Invite team members with role-based permissions.
- **Module Choice:** Use My Business (with built-in sales), Sales Management only, or both together.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL 8.0 with Sequelize ORM
- **Auth:** JWT + bcrypt (secure, stateless authentication)
- **Deployment:** Docker Compose for local MySQL

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for MySQL)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Maryam0187/CRM-portal.git
cd CRM-portal

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env and set your JWT_SECRET and database credentials

# 4. Start MySQL
docker-compose up -d

# 5. Run migrations
npx sequelize-cli db:migrate

# 6. Seed demo data
npx sequelize-cli db:seed:all

# 7. Configure Stripe (for real payments - see Stripe Setup below)
cp .env.example .env.local
# Edit .env.local and add your Stripe test keys

# 7. Start development server
npm run dev
```

Visit `http://localhost:3000`

## Demo Accounts

After seeding, log in with these accounts:

**Downtown Studio** (Beauty salon with both modules)
- Email: `sarah@downtownstudio.com`
- Password: `password123`

**Premier Services** (Cleaning company with both modules)
- Email: `john@premierservices.com`
- Password: `password123`

Both accounts have:
- My Business module with services, staff, and sample bookings
- Sales module with leads, deals, pipeline, and tasks

## Usage

### First-Time Setup

1. **Sign up** at `/signup`
2. **Choose your modules:**
   - My Business (recommended - includes sales tools)
   - Sales Management only
   - Both modules
3. **Choose your plan:**
   - Free: Start immediately
   - Growth/Business: Go through checkout mockup (test mode - no real charges)
4. **Set up (if using My Business module):**
   - Complete the 2-minute onboarding wizard
   - Choose your business category
   - Add services and pricing
   - Set working hours
   - Your booking page is live!
5. **Start working:**
   - My Business users: share your public page, accept orders
   - Sales users: start adding leads and deals
   - Both: switch between modules using the top navigation

### Stripe Setup (Real Payments with Test Mode)

Business OS uses **Stripe Checkout** for subscription payments. Follow these steps to enable:

#### 1. Get Stripe Test Keys
1. Sign up at [stripe.com](https://stripe.com) (or log in)
2. Toggle to **Test Mode** (top right)
3. Go to **Developers → API keys**
4. Copy your:
   - Secret key (sk_test_...)
   - Publishable key (pk_test_...)

#### 2. Create Products & Prices in Stripe
**Option A: Via Stripe Dashboard (Recommended)**
1. Go to **Products** → **Add Product**
2. Create two products:
   - **Growth Plan**: $29/month and $290/year
   - **Business Plan**: $99/month and $990/year
3. Set as **Recurring** subscriptions
4. Copy the Price IDs (price_xxx) for each

**Option B: Via Stripe CLI** (advanced)
```bash
stripe products create --name "Growth Plan" --description "For growing businesses"
stripe prices create --product <product_id> --currency usd --recurring-interval month --unit-amount 2900
stripe prices create --product <product_id> --currency usd --recurring-interval year --unit-amount 29000
# Repeat for Business Plan
```

#### 3. Configure Environment Variables
Add to `.env.local` (never commit this file):
```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Price IDs from step 2
STRIPE_PRICE_GROWTH_MONTHLY=price_xxx
STRIPE_PRICE_GROWTH_ANNUAL=price_xxx
STRIPE_PRICE_BUSINESS_MONTHLY=price_xxx
STRIPE_PRICE_BUSINESS_ANNUAL=price_xxx
```

#### 4. Set Up Webhooks (Local Development)
Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Other platforms: https://stripe.com/docs/stripe-cli
```

Forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret (whsec_...) to your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

#### 5. Test the Flow
1. Restart your dev server (`npm run dev`)
2. Visit `/pricing` and select Growth or Business
3. Click "Start [Plan]" → redirects to Stripe Checkout
4. Use test card: **4242 4242 4242 4242**
   - Any future expiry (e.g., 12/34)
   - Any CVC (e.g., 123)
5. Complete checkout → redirected back with success message
6. Visit `/dashboard/billing` to:
   - See active subscription
   - Click "Manage Subscription" → Stripe Customer Portal
   - Update payment method or cancel subscription

#### Webhook Events Handled
- `checkout.session.completed` → Activates plan
- `customer.subscription.updated` → Updates plan status
- `customer.subscription.deleted` → Reverts to Free plan
- `invoice.payment_failed` → Marks account as past_due

#### Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155
- More: [stripe.com/docs/testing](https://stripe.com/docs/testing)

#### Production Deployment
1. Switch to **Live Mode** in Stripe Dashboard
2. Get live API keys (sk_live_... / pk_live_...)
3. Create products/prices in live mode
4. Set up webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
5. Update environment variables with live keys
6. Deploy!

### Navigation

- `/dashboard` - My Business dashboard (if enabled)
- `/sales/dashboard` - Sales CRM dashboard (if enabled)
- `/book/[your-slug]` - Your public booking page (if My Business enabled)

Use the module switcher in the navigation bar to toggle between My Business and Sales.

## Project Structure

```
/workspace
├── app/                   # Next.js App Router
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication (signup, login, logout, me)
│   │   ├── bookings/     # Create bookings
│   │   ├── business/     # Public business data
│   │   ├── dashboard/    # Bookings dashboard data
│   │   ├── onboarding/   # Bookings setup wizard
│   │   └── sales/        # Sales CRM endpoints
│   ├── book/[slug]/      # Public booking page
│   ├── dashboard/        # Bookings owner dashboard
│   ├── sales/            # Sales CRM pages
│   ├── onboarding/       # Bookings setup wizard
│   ├── login/            # Login page
│   ├── signup/           # Signup with module selection
│   └── page.tsx          # Landing page
├── models/               # Sequelize models
│   ├── Business.ts       # Tenant/organization
│   ├── User.ts           # Users (owner/staff)
│   ├── Service.ts        # Bookings: Services
│   ├── Staff.ts          # Bookings: Staff
│   ├── WorkingHours.ts   # Bookings: Hours
│   ├── Booking.ts        # Bookings: Appointments
│   ├── Lead.ts           # CRM: Leads
│   ├── Contact.ts        # CRM: Contacts
│   ├── DealStage.ts      # CRM: Pipeline stages
│   ├── Deal.ts           # CRM: Deals
│   └── Task.ts           # CRM: Tasks
├── migrations/           # Database migrations
├── seeders/              # Demo data
├── lib/                  # Utilities (auth, db, helpers)
├── middleware/           # Auth & tenant isolation
└── components/           # Shared UI components
```

## Database Schema

**Shared Foundation:**
- `businesses` - Multi-tenant organizations with module flags
- `users` - Users with role-based access

**My Business Module:**
- `services` - Services with pricing
- `staff` - Staff members
- `working_hours` - Operating hours
- `bookings` - Customer appointments

**Sales CRM Module:**
- `leads` - Potential customers
- `contacts` - Contact persons/companies
- `deal_stages` - Pipeline stages
- `deals` - Sales opportunities
- `tasks` - Follow-up activities

## Multi-Tenancy

Every query is automatically scoped to the authenticated user's `businessId`. Data isolation is enforced at:

1. **Authentication:** JWT includes `businessId`
2. **Middleware:** `ensureTenantIsolation` validates access
3. **Models:** All queries filter by `businessId`

Each business is completely isolated from others.

## Module System

Businesses can enable:
- **My Business only:** Get a booking page with built-in sales tools
- **Sales only:** Full CRM, no public website
- **Both:** Complete platform

Module flags are stored in the `businesses` table (`enableBookings`, `enableSales`). APIs and navigation respect these flags.

## Currencies

Default currency is USD. Supported currencies: USD, EUR, GBP, AED, CAD, AUD, and more. Set during signup or in business settings.

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

All pages compile successfully with no TypeScript errors.

## Development

```bash
# Run with hot reload
npm run dev

# Run migrations
npx sequelize-cli db:migrate

# Seed demo data
npx sequelize-cli db:seed:all
```

## Success Criteria Met

✅ Modern, conversion-focused landing page  
✅ "Start your business in one minute" positioning  
✅ Main product: My Business (with built-in sales) + optional Sales Management standalone  
✅ Module selection during signup  
✅ Sales-only path (no forced booking wizard)  
✅ Global positioning (not Dubai-centric)  
✅ Generic seed data (Downtown Studio, Premier Services)  
✅ Multi-tenant with strong isolation  
✅ Build passes with all modules working  

## Troubleshooting

### Seeder Error: Cannot find module 'bcrypt'

If you see this error when running `npx sequelize-cli db:seed:all`:
```
ERROR: Cannot find module 'bcrypt'
```

**Solution:** This is already fixed in the latest version. The project uses `bcryptjs` (not `bcrypt`) to avoid native compilation issues. To recover:

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
npm install

# Run migrations and seeders
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

The project uses `bcryptjs` for better cross-platform compatibility.

### Build Issues

If `npm run build` fails, ensure:
- Node.js 18+ is installed
- All dependencies are installed: `npm install`
- Environment variables are set in `.env`
- MySQL is running: `docker-compose up -d`

## About

**Business OS** is a product by [Technonaire](https://technonaire.com/).

- **My Business** is the main module: your business website + booking/ordering system with integrated sales tools
- **Sales Management** can be used standalone for CRM-only needs (optional)
- Multi-tenant architecture with strong data isolation
- Built for entrepreneurs worldwide

## License

MIT

## Contributing

Pull requests welcome! Please maintain multi-tenant architecture and test both modules.

---

© 2026 [Technonaire](https://technonaire.com/) · Business OS

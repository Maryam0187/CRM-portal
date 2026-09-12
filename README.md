# Multi-Module Business Platform

A unified multi-tenant SaaS platform with **two powerful modules in one**: Bookings for service businesses + Sales CRM for pipeline management. Built for Dubai with AED pricing.

## Platform Overview

One signup, one organization, two complete products:

### 📅 Bookings Module
Perfect for local service businesses (salons, cleaners, photographers, tutors):
- **Fast Onboarding**: 5-step wizard to go live in minutes
- **Public Booking Pages**: Custom `/[slug]` page for customer bookings
- **Service Management**: Services, staff, working hours, pricing (AED)
- **Online Appointments**: Customers book time slots based on availability
- **Owner Dashboard**: View bookings, manage services/staff, share link

### 💼 Sales CRM Module
Perfect for B2B sales, agencies, consultants:
- **Leads Management**: Capture, qualify, assign, and convert leads
- **Contacts & Companies**: Manage relationships and accounts
- **Pipeline & Deals**: Track deals through stages with values
- **Tasks & Follow-ups**: Assign tasks, set due dates, track progress
- **Sales Dashboard**: Pipeline value, open deals, lead metrics

## Features

- **Multi-tenant**: Strong tenant isolation per business
- **Unified Navigation**: Switch between Bookings and Sales modules seamlessly
- **AED-ready**: Dubai/UAE pricing support
- **Role-based Access**: Owner, admin, staff roles
- **Seeded Demo Data**: Both modules include sample data

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0 with Sequelize ORM
- **Auth**: JWT + bcrypt
- **Styling**: Tailwind CSS
- **Deployment**: Docker Compose for MySQL

## Setup

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (for MySQL)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Maryam0187/CRM-portal.git
cd CRM-portal
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env
```

Edit `.env` and set:
```
DB_NAME=booking_saas
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your-secret-key-change-this-in-production
```

4. **Start MySQL with Docker**

```bash
docker-compose up -d
```

Wait a few seconds for MySQL to initialize.

5. **Run migrations**

```bash
npx sequelize-cli db:migrate
```

This creates all tables for **both modules**: businesses, users, services, staff, working hours, bookings, leads, contacts, deal_stages, deals, and tasks.

6. **Seed demo data**

```bash
npx sequelize-cli db:seed:all
```

This seeds **two demo businesses** with sample data for **both Bookings and Sales CRM modules**.

7. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:3000`

## Demo Accounts

After seeding, you can log in with:

**Elite Beauty Salon (Owner) - Has both Bookings + Sales data**
- Email: `sarah@elitebeauty.ae`
- Password: `password123`

**SparkleClean Home Services (Owner) - Has both Bookings + Sales data**
- Email: `john@sparkleclean.ae`
- Password: `password123`

Then visit:
- **📅 Bookings Dashboard** (`/dashboard`) - See today's bookings, get public booking link
- **💼 Sales Dashboard** (`/sales/dashboard`) - See pipeline value, open deals, tasks due

Switch between modules using the navigation toggle at the top.

## Usage

### First-time Setup

1. **Sign up** at `/signup`
2. **Complete onboarding wizard** for Bookings module (5 steps):
   - Choose your business category (salon, cleaner, photographer, etc.)
   - Add services with AED pricing
   - Set working hours
   - Add staff members
   - Set location (Dubai/UAE)

### Using Bookings Module

- **Owner Dashboard** (`/dashboard`): View today's bookings, upcoming appointments
- **Public Page** (`/book/[slug]`): Share with customers for online booking
- **Customer Flow**: Browse services → Pick date/time → Enter details → Book

### Using Sales CRM Module

- **Sales Dashboard** (`/sales/dashboard`): Pipeline value, deals, leads, tasks
- **Leads** (`/sales/leads`): Capture and qualify leads (stub for next iteration)
- **Pipeline** (`/sales/pipeline`): Kanban board for deals (stub for next iteration)
- **Contacts** (`/sales/contacts`): Manage contacts & companies (stub for next iteration)
- **Tasks** (`/sales/tasks`): Track follow-ups and activities (stub for next iteration)

CRM demo data is seeded for both businesses - check the sales dashboard to see pipeline metrics.

## Project Structure

```
/workspace
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Auth endpoints (login, signup, logout, me)
│   │   ├── bookings/      # Booking creation
│   │   ├── business/      # Public business data
│   │   ├── dashboard/     # Bookings dashboard data
│   │   ├── onboarding/    # Onboarding wizard
│   │   └── sales/         # Sales CRM endpoints
│   │       └── dashboard/ # Sales dashboard data
│   ├── book/[slug]/       # Public booking page
│   ├── dashboard/         # Bookings owner dashboard
│   ├── sales/             # Sales CRM pages
│   │   ├── dashboard/     # Sales dashboard
│   │   ├── leads/         # Leads page (stub)
│   │   ├── pipeline/      # Pipeline board (stub)
│   │   ├── contacts/      # Contacts page (stub)
│   │   └── tasks/         # Tasks page (stub)
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── onboarding/        # 5-step wizard
│   └── page.tsx           # Landing page
├── models/                # Sequelize models
│   ├── Business.ts        # Tenant/organization
│   ├── User.ts            # Users (owner, staff)
│   ├── Service.ts         # Bookings: Services
│   ├── Staff.ts           # Bookings: Staff members
│   ├── WorkingHours.ts    # Bookings: Business hours
│   ├── Booking.ts         # Bookings: Customer bookings
│   ├── Lead.ts            # CRM: Leads
│   ├── Contact.ts         # CRM: Contacts
│   ├── DealStage.ts       # CRM: Deal stages
│   ├── Deal.ts            # CRM: Deals/opportunities
│   ├── Task.ts            # CRM: Tasks/activities
│   └── index.ts           # Model associations
├── migrations/            # Database migrations (both modules)
├── seeders/               # Demo data (both modules)
├── lib/                   # Utilities
│   ├── auth.ts            # JWT helpers
│   ├── db.ts              # Sequelize instance
│   └── helpers.ts         # Slug generation, time slots
├── middleware/            # Auth & tenant middleware
└── components/            # Shared components
    └── layout/
        └── UnifiedNav.tsx # Module switcher navigation
```

## Database Schema

### Shared (Multi-tenant foundation)
- **businesses**: Tenant organizations
- **users**: Users with role-based access (owner/admin/staff)

### Bookings Module
- **services**: Business services with pricing
- **staff**: Staff members providing services
- **working_hours**: Business operating hours (per day)
- **bookings**: Customer appointments

### Sales CRM Module
- **leads**: Potential customers
- **contacts**: Contact persons and companies
- **deal_stages**: Pipeline stages (New → Qualified → Proposal → Won/Lost)
- **deals**: Sales opportunities with values
- **tasks**: Follow-up activities linked to leads/deals

## Multi-tenancy

Every query is automatically scoped to the authenticated user's `businessId` via JWT and middleware. Data isolation is enforced at:

1. **Authentication**: JWT includes `businessId`
2. **Middleware**: `ensureTenantIsolation` validates business access
3. **Models**: All queries filter by `businessId`

## Out of Scope

- Telephony/Twilio dialer
- Restaurant POS features
- Inventory/stock management
- Billing/Stripe (stub OK for future)
- Complex modifiers or delivery zones

## MVP Success Criteria

✅ **Shared Platform**
- Public landing explaining both products
- Sign up / log in for anyone
- Organizations with strong tenant isolation
- Unified navigation switching between modules

✅ **Bookings Module** (Complete vertical slice)
- Onboarding wizard → public page → customer booking → owner sees booking
- Demo accounts with bookings data

✅ **Sales CRM Module** (MVP depth)
- Sales dashboard with metrics (pipeline value, deals, leads, tasks)
- Models + migrations + seeded data for leads, contacts, deals, tasks
- Page stubs for future iteration (full CRUD coming next)

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

## Development

```bash
# Run in development mode with hot reload
npm run dev
```

## License

MIT

## Contributing

Pull requests welcome! Please maintain the multi-tenant architecture and test both modules.

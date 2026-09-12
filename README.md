# Dubai Booking SaaS

A **public multi-tenant SaaS** where ANY local service business can sign up, create a booking page in 5-10 minutes, and start accepting customer bookings. Target market: Dubai / UAE with AED pricing.

## Product Overview

This is a booking platform for local service businesses - NOT a sales CRM. Businesses like salons, cleaners, photographers, and home service providers can:

1. Sign up in seconds
2. Complete a 5-step onboarding wizard  
3. Get a public booking page instantly
4. Accept customer bookings 24/7
5. Manage bookings from their dashboard

**Perfect for:** Salons, Barbers, Nails, Massage, Spa, Home Cleaning, Car Detailing, AC Cleaning, Pest Control, Handyman, Photographers, Tutors, Yoga Classes, Cooking Classes, Food Tours.

## Key Features

### Killer Onboarding (5-10 minutes)
1. **What do you do?** - Choose category (Salon, Barber, Cleaning, etc.)
2. **Business name?** - Name your business
3. **Services?** - Pre-filled suggestions with AED prices (e.g. Haircut AED 80)
4. **Location?** - Dubai area selection
5. **Done!** - Get public booking URL immediately

### Multi-Tenant Architecture
- Complete tenant isolation - each business is separate
- Strong data isolation at database level
- Each business gets unique booking page `/book/[business-slug]`

### Public Booking Flow
1. Customer visits `/book/[business-slug]`
2. Browse services with prices
3. Select date & time from available slots
4. Enter contact details
5. Confirm booking
6. Get confirmation (payment stub - "Pay at venue")

### Owner Dashboard
- Today's bookings with customer details
- Upcoming bookings count
- Services list with pricing
- Share booking page link
- Real-time booking notifications (stub)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0 with Sequelize ORM
- **Auth**: JWT tokens, bcrypt password hashing
- **Deployment**: Docker Compose ready

## Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0 (or use Docker Compose)

### 1. Clone & Install

```bash
git clone https://github.com/Maryam0187/CRM-portal.git
cd CRM-portal
npm install
```

### 2. Start MySQL

```bash
docker-compose up -d
```

This starts MySQL on port 3306:
- Database: `booking_saas`
- User: `root`
- Password: `password`

### 3. Setup Environment

```bash
cp .env.example .env
```

Update `.env` if needed (defaults work with Docker Compose).

### 4. Run Migrations & Seed

```bash
npm run db:migrate
npm run db:seed
```

This creates:
- 2 demo businesses (Elite Beauty Salon + SparkleClean)
- Services for each business
- Staff members
- Working hours
- Sample bookings

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Demo Accounts

After seeding, try these:

| Business | Email | Password | Booking Page |
|----------|-------|----------|--------------|
| Elite Beauty Salon | owner@elitebeauty.ae | password123 | /book/elite-beauty-salon-1 |
| SparkleClean | owner@sparkleclean.ae | password123 | /book/sparkleclean-home-2 |

## Testing the Platform

### As a Business Owner

1. **Signup Flow**
   - Visit http://localhost:3000
   - Click "Sign up free"
   - Create account
   - Complete 5-step onboarding wizard
   - Get your booking page

2. **Dashboard**
   - View today's bookings
   - See your services
   - Copy your booking page link to share

### As a Customer

1. Visit a booking page: http://localhost:3000/book/elite-beauty-salon-1
2. Choose a service
3. Select date & time
4. Enter your details
5. Confirm booking

## Database Schema

### Core Tables
- **businesses** - Tenant/business data (name, slug, category, location)
- **users** - Business owners and staff (email, password, role)
- **services** - What businesses offer (name, duration, price in AED)
- **staff** - Who provides services
- **working_hours** - When businesses are open (per day of week)
- **bookings** - Customer bookings with date/time/status

### Multi-Tenant Isolation
- All queries automatically scoped to `businessId`
- Middleware enforces tenant isolation
- Zero data leakage between businesses

## API Endpoints

### Public (No Auth)
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/business/[slug]` - Get business details (for booking page)
- `POST /api/bookings` - Create booking

### Protected (Auth Required)
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/onboarding` - Complete business setup
- `GET /api/dashboard` - Get dashboard data

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed demo data
npm run db:reset     # Reset database (undo migrations, re-migrate, seed)
```

## Production Deployment

### 1. Build

```bash
npm run build
```

### 2. Environment Variables

Set these in production:

```env
DB_HOST=<production-mysql-host>
DB_PORT=3306
DB_NAME=booking_saas
DB_USER=<db-user>
DB_PASSWORD=<strong-password>
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
```

### 3. Run Migrations

```bash
npm run db:migrate
```

### 4. Start Server

```bash
npm start
```

## Service Categories

The platform supports these business types out of the box:

**Beauty & Personal Care:**
- Salon, Barber, Nails, Massage, Spa

**Home Services:**
- Cleaning, Car Detailing, AC Cleaning, Pest Control, Handyman

**Appointments & Experiences:**
- Photographer, Tutor, Yoga, Cooking Class, Food Tour

Each category includes pre-filled service suggestions with typical Dubai pricing in AED.

## Success Metrics

A stranger should be able to:
1. Sign up in 30 seconds
2. Complete onboarding in 5 minutes
3. Share booking page immediately
4. Receive a real customer booking
5. See it in their dashboard

This is a **public multi-tenant SaaS** - not an internal tool. Anyone can create an account and start their booking business.

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 30-day expiration
- httpOnly cookies prevent XSS
- All API routes protected with auth middleware
- Tenant isolation enforced at database query level
- No business can access another business's data

## Roadmap (Out of Scope for MVP)

- Stripe payment integration
- Email notifications via Resend
- SMS reminders
- Calendar sync
- Multiple staff calendars
- Membership/packages
- Mobile app

## Support

Built for Dubai service businesses. Simple, fast, multi-tenant SaaS.

---

**Tech:** Next.js 14 + TypeScript + MySQL + Sequelize + Tailwind CSS
**Deployment:** Docker Compose ready
**License:** ISC

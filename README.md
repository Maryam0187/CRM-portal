# CRM Portal

A multi-tenant SaaS sales management platform built with Next.js, TypeScript, Sequelize, and MySQL.

## Features

- **Multi-tenant Architecture**: Complete tenant isolation for organizations
- **Authentication & Authorization**: JWT-based auth with role-based access control (Owner, Admin, Sales Rep)
- **Lead Management**: Capture, track, and manage sales leads
- **Pipeline & Deals**: Visual pipeline with customizable stages, deal tracking, and forecasting
- **Contact Management**: Comprehensive contact and account management
- **Task Management**: Track follow-ups and activities tied to leads and deals
- **Dashboard**: Real-time metrics including pipeline value, open deals, leads, and tasks
- **Settings**: Team member management and pipeline customization

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0 with Sequelize ORM
- **Authentication**: JWT, bcrypt
- **Deployment**: Docker Compose ready

## Prerequisites

- Node.js 18+ and npm
- MySQL 8.0 (or use Docker Compose)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Maryam0187/CRM-portal.git
cd CRM-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

#### Option A: Using Docker Compose (Recommended)

Start MySQL using Docker Compose:

```bash
docker-compose up -d
```

This will start MySQL on port 3306 with the following credentials:
- Host: localhost
- Port: 3306
- Database: crm_portal
- User: root
- Password: password

#### Option B: Using Existing MySQL

Ensure MySQL is running and create a database:

```sql
CREATE DATABASE crm_portal;
```

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=crm_portal
DB_USER=root
DB_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 5. Run Database Migrations

```bash
npm run db:migrate
```

### 6. Seed Demo Data

```bash
npm run db:seed
```

This creates a demo organization "Acme Corporation" with:
- 3 demo users (owner, admin, sales rep)
- Sample leads, deals, contacts, and tasks
- Default pipeline stages

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Demo Accounts

After seeding the database, you can login with these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Owner | owner@acme.com | password123 |
| Admin | admin@acme.com | password123 |
| Sales Rep | sales@acme.com | password123 |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with demo data
- `npm run db:reset` - Reset database (undo migrations, re-migrate, and seed)

## Project Structure

```
CRM-portal/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── contacts/        # Contact CRUD
│   │   ├── deals/           # Deal CRUD
│   │   ├── leads/           # Lead CRUD
│   │   ├── tasks/           # Task CRUD
│   │   ├── dashboard/       # Dashboard metrics
│   │   └── settings/        # Settings endpoints
│   ├── dashboard/           # Dashboard page
│   ├── leads/               # Leads page
│   ├── pipeline/            # Pipeline kanban view
│   ├── contacts/            # Contacts page
│   ├── tasks/               # Tasks page
│   ├── settings/            # Settings page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/             # Layout components (Navbar, AppLayout)
│   └── ui/                 # UI components
├── lib/                     # Utility libraries
│   ├── db.ts               # Database connection
│   └── auth.ts             # Authentication utilities
├── middleware/              # Middleware functions
│   ├── auth.ts             # Auth middleware
│   └── tenant.ts           # Tenant isolation middleware
├── models/                  # Sequelize models
│   ├── Organization.ts
│   ├── User.ts
│   ├── Contact.ts
│   ├── Lead.ts
│   ├── Deal.ts
│   ├── DealStage.ts
│   ├── Task.ts
│   └── index.ts
├── migrations/              # Database migrations
├── seeders/                 # Database seeders
├── config/                  # Configuration files
│   └── database.js         # Database config
├── docker-compose.yml       # Docker Compose configuration
├── .env.example            # Example environment variables
└── README.md               # This file
```

## Multi-Tenant Architecture

This application implements complete tenant isolation:

1. **Organization-Based Tenancy**: Each organization (tenant) has its own isolated data
2. **Automatic Tenant Scoping**: All database queries are automatically scoped to the user's organization
3. **Middleware Protection**: API routes use authentication and tenant middleware to ensure data isolation
4. **JWT Token**: User's organization ID is embedded in the JWT token

### Tenant Isolation Implementation

- All models include an `organizationId` foreign key
- The `ensureTenantIsolation` middleware function automatically adds the organization filter
- API routes use `withAuth` middleware to verify authentication
- `getOrganizationId` helper extracts the organization from the authenticated request

## Database Schema

### Core Tables

- **organizations**: Tenant/organization data
- **users**: User accounts with role-based access
- **contacts**: Contact/account records
- **leads**: Sales leads
- **deal_stages**: Customizable pipeline stages
- **deals**: Sales opportunities
- **tasks**: Follow-up tasks and activities

### Relationships

- Organization has many Users, Contacts, Leads, Deals, Tasks, DealStages
- User belongs to Organization
- Lead belongs to Organization and User (owner)
- Deal belongs to Organization, DealStage, User (owner), Contact, Lead
- Task belongs to Organization, User (assigned to), Lead, Deal

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account and organization
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Leads
- `GET /api/leads` - List leads
- `POST /api/leads` - Create lead
- `GET /api/leads/[id]` - Get lead
- `PUT /api/leads/[id]` - Update lead
- `DELETE /api/leads/[id]` - Delete lead

### Deals
- `GET /api/deals` - List deals
- `POST /api/deals` - Create deal
- `GET /api/deals/[id]` - Get deal
- `PUT /api/deals/[id]` - Update deal
- `DELETE /api/deals/[id]` - Delete deal

### Contacts
- `GET /api/contacts` - List contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts/[id]` - Get contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact

### Tasks
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics

### Settings
- `GET /api/settings/users` - List team members
- `POST /api/settings/users` - Add team member
- `GET /api/settings/stages` - List pipeline stages
- `POST /api/settings/stages` - Create pipeline stage

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Set Production Environment Variables

Update your `.env` file:

```env
NODE_ENV=production
JWT_SECRET=<strong-random-secret>
DB_HOST=<production-db-host>
DB_PORT=3306
DB_NAME=crm_portal
DB_USER=<db-user>
DB_PASSWORD=<db-password>
```

### 3. Run Migrations

```bash
npm run db:migrate
```

### 4. Start Production Server

```bash
npm start
```

## Security Considerations

- All API routes are protected with authentication middleware
- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Tenant isolation is enforced at the database query level
- Environment variables should never be committed to git
- Use strong JWT secrets in production
- Consider enabling HTTPS in production

## Development Notes

- Hot reload is enabled in development mode
- ESLint is configured for code quality
- TypeScript provides type safety
- Tailwind CSS provides utility-first styling

## Troubleshooting

### Database Connection Issues

If you can't connect to MySQL:

1. Verify MySQL is running: `docker-compose ps` or `mysql -u root -p`
2. Check credentials in `.env` match your MySQL setup
3. Ensure the database exists: `mysql -u root -p -e "SHOW DATABASES;"`
4. Check firewall settings if connecting to remote MySQL

### Migration Issues

If migrations fail:

1. Reset the database: `npm run db:reset`
2. Check migration files for syntax errors
3. Verify database user has proper permissions

### Build Issues

If `npm run build` fails:

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run lint`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue on GitHub.

---

Built with Next.js, TypeScript, Sequelize, and MySQL

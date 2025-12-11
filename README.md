# Oostboek Digital CRM Hub

A mobile-first Progressive Web Application (PWA) for Oostboek accounting firm, providing 24/7 client self-service capabilities.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt (MFA-ready)
- **PWA**: Workbox service worker

## Production URLs

- **Frontend**: https://oostboek.be (Vercel)
- **Backend API**: https://3kxjm2mtcj.eu-central-1.awsapprunner.com (AWS App Runner)
- **Database**: AWS RDS PostgreSQL (eu-central-1)

## Quick Start (Development)

```bash
# Install dependencies
npm install
cd client && npm install
cd ../server && npm install

# Setup database
cd server
cp ../.env.example .env
npx prisma migrate dev

# Run development servers
cd ..
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Project Structure

```
oostboek/
├── client/                 # React PWA frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API client services
│   │   ├── stores/         # State management
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets + PWA manifest
├── server/                 # Express API backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, validation, GDPR
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── types/          # TypeScript types
│   └── prisma/             # Database schema + migrations
└── shared/                 # Shared types between client/server
```

## MVP Features (Phase 1-2)

- [ ] User authentication (MFA-ready)
- [ ] Appointment Booking Tool (ABT)
- [ ] AI Chatbot with knowledge base
- [ ] Secure document upload
- [ ] GDPR-compliant data handling

## GDPR Compliance

- Cookie consent management
- Data retention policies (10-year invoice storage)
- Right to erasure implementation
- Audit logging for data access
- EU data residency (AWS eu-central-1)

## Deployment

### Frontend (Vercel)
Automatic deployments from `main` branch via Vercel GitHub integration.

### Backend (AWS App Runner)
Automatic deployments from `main` branch. Environment variables configured in App Runner console:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - production
- `JWT_SECRET` - Authentication secret
- `CLIENT_URL` - Frontend URL for CORS

## License

Proprietary - Oostboek © 2025

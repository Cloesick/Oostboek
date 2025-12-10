# Oostboek Digital CRM Hub

A mobile-first Progressive Web Application (PWA) for Oostboek accounting firm, providing 24/7 client self-service capabilities.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt (MFA-ready)
- **PWA**: Workbox service worker

## Quick Start

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
- EU data residency (Azure West Europe)

## License

Proprietary - Oostboek © 2025

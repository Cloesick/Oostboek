# Oostboek Digital CRM Hub

A mobile-first Progressive Web Application (PWA) for Oostboek accounting firm, providing 24/7 client self-service capabilities.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt (MFA-ready)
- **PWA**: Workbox service worker
- **Analytics**: Google Analytics 4

## Production URLs

- **Frontend**: https://oostboek.vercel.app (Vercel)
- **Custom Domain**: https://oostboek.be (pending DNS configuration)
- **Backend API**: https://3kxjm2mtcj.eu-central-1.awsapprunner.com (AWS App Runner)
- **Database**: AWS RDS PostgreSQL (eu-central-1)

---

## Configuration Summary (Priority Ranked)

### 🔴 Critical Infrastructure (P1)

| # | Configuration | Status | Description |
|---|---------------|--------|-------------|
| 1 | **AWS RDS Database** | ✅ Done | PostgreSQL in eu-central-1 with public access for App Runner |
| 2 | **AWS App Runner Backend** | ✅ Done | Auto-scaling Node.js API with Docker deployment |
| 3 | **Vercel Frontend Hosting** | ✅ Done | SPA with automatic deployments from main branch |
| 4 | **Database Migrations** | ✅ Done | Prisma schema with User, Appointment, Staff tables |
| 5 | **API URL Configuration** | ✅ Done | Client connected to production backend |
| 6 | **CORS Multi-Origin** | ✅ Done | Supports Vercel, custom domain, and localhost |

### 🟠 Core Features (P2)

| # | Configuration | Status | Description |
|---|---------------|--------|-------------|
| 7 | **User Authentication** | ✅ Done | JWT-based login/register with secure password hashing |
| 8 | **Appointment Booking** | ✅ Done | Multi-step wizard with staff selection by specialization |
| 9 | **AI Chatbot** | ✅ Done | Knowledge base with Q&A, external links, lead generation CTAs |
| 10 | **Document Upload** | ✅ Done | Type picker with preset fields, XML metadata generation |
| 11 | **Dashboard** | ✅ Done | Appointments, documents, quick actions overview |
| 12 | **Staff Data Seeding** | ✅ Done | Production database populated with Oostboek team |

### 🟡 User Experience (P3)

| # | Configuration | Status | Description |
|---|---------------|--------|-------------|
| 13 | **Bilingual Support (NL/EN)** | ✅ Done | Full i18n for all pages, chatbot, error messages |
| 14 | **Chatbot Knowledge Base** | ✅ Done | 18 topics with Dutch and English responses |
| 15 | **Clickable Suggestions** | ✅ Done | Quick action buttons in chatbot responses |
| 16 | **404 Page** | ✅ Done | Custom not found page with navigation |
| 17 | **Error Handling** | ✅ Done | Translated API error messages |
| 18 | **Vercel SPA Rewrites** | ✅ Done | Client-side routing support |

### 🟢 Content & Compliance (P4)

| # | Configuration | Status | Description |
|---|---------------|--------|-------------|
| 19 | **GDPR Cookie Consent** | ✅ Done | Banner with preference selectors (necessary, analytics, marketing) |
| 20 | **News Page** | ✅ Done | Company updates and announcements |
| 21 | **Vacancies Page** | ✅ Done | Job listings with application info |
| 22 | **Links Page** | ✅ Done | Useful external resources for clients |
| 23 | **Enhanced FAQ** | ✅ Done | 16 questions about government services and tax tools |
| 24 | **Header/Footer** | ✅ Done | Consistent navigation across all pages |

### 🔵 Analytics & Optimization (P5)

| # | Configuration | Status | Description |
|---|---------------|--------|-------------|
| 25 | **Google Analytics** | ✅ Done | GA4 tracking (G-V03ZDQQYKW) |
| 26 | **Email Notifications** | ✅ Done | Lead alerts for new appointments |
| 27 | **Calendly Integration** | ✅ Done | Updated to Oostboek account URL |
| 28 | **SEO Meta Tags** | ✅ Done | Open Graph, Twitter Cards, structured data |

### ⚪ Pending (P6)

| # | Configuration | Status | Description |
|---|---------------|--------|-------------|
| 29 | **Custom Domain** | 🔄 Pending | Connect oostboek.be to Vercel (manual DNS) |

---

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
│   │   ├── i18n/           # Translations (NL/EN)
│   │   ├── services/       # API client services
│   │   ├── stores/         # State management (Zustand)
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets + PWA manifest
├── server/                 # Express API backend
│   ├── src/
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Auth, validation, GDPR
│   │   └── lib/            # Prisma client, utilities
│   └── prisma/             # Database schema + migrations
└── vercel.json             # Vercel SPA rewrite rules
```

## Environment Variables

### Backend (AWS App Runner)
```
DATABASE_URL=postgresql://...
NODE_ENV=production
JWT_SECRET=your-secret-key
CLIENT_URL=https://oostboek.vercel.app,https://oostboek.be
```

### Frontend (Vercel)
```
VITE_API_URL=https://3kxjm2mtcj.eu-central-1.awsapprunner.com
```

## GDPR Compliance

- ✅ Cookie consent management with granular preferences
- ✅ Data retention policies (10-year invoice storage)
- ✅ EU data residency (AWS eu-central-1)
- ✅ Secure document handling
- 🔄 Right to erasure implementation (planned)
- 🔄 Audit logging for data access (planned)

## License

Proprietary - Oostboek © 2025

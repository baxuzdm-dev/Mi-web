# FanConnect

A premium marketplace connecting content creators (OnlyFans, Fansly, etc.) with management agencies.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS (dark mode, custom design system)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (credentials + Google OAuth)
- **Real-time**: Pusher (chat messages)
- **Deployment**: Vercel-ready

## Features

- **Two roles**: Content Creator & Agency
- **Explore pages**: Browse & filter creators / agencies
- **Application system**: Creators apply to agencies, agencies accept/reject
- **Match → Chat**: When accepted, a real-time chat channel unlocks
- **Verified badges**: Trust indicators on profiles
- **Dark mode**: Premium dark UI (Stripe / Linear inspired)
- **Responsive**: Works on mobile and desktop

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- (Optional) Pusher account for real-time chat
- (Optional) Google OAuth credentials

### 1. Install

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Fill in your `.env`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | (Optional) Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | (Optional) Google OAuth secret |
| `PUSHER_*` | (Optional) Pusher credentials for real-time chat |

### 3. Set Up Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
/app
  /(auth)/login          → Sign in page
  /(auth)/register       → Sign up page (with role selection)
  /(dashboard)/creator   → Creator dashboard
  /(dashboard)/agency    → Agency dashboard
  /explore/creators      → Browse creators with filters
  /explore/agencies      → Browse agencies with filters
  /profile/creator/[id]  → Creator public profile + apply
  /profile/agency/[id]   → Agency public profile + apply
  /chat                  → Conversation list
  /chat/[id]             → Real-time chat room
  /onboarding            → Post-signup profile setup
  /api/...               → All API routes

/components
  Navbar.tsx             → Top navigation
  CreatorCard.tsx        → Creator card for grids
  AgencyCard.tsx         → Agency card for grids
  /ui                    → Button, Input, Card, Badge, Avatar, etc.

/lib
  prisma.ts              → Prisma client singleton
  auth.ts                → NextAuth config
  pusher.ts              → Pusher instances
  utils.ts               → Utility functions

/prisma
  schema.prisma          → Database schema
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update `package.json` build script:

```json
"build": "prisma generate && prisma migrate deploy && next build"
```

---

## Database Schema

```
User → CreatorProfile (1:1)
User → AgencyProfile (1:1)
CreatorProfile + AgencyProfile → Application
Application (ACCEPTED) → Conversation (1:1)
Conversation → Message (1:many)
User ↔ Conversation (many:many)
```

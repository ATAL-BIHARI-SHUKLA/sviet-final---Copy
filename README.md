# SVIET Website (Next.js)

SVIET is the official admissions and marketing web platform for Swami Vivekanand Institute of Engineering & Technology. It includes a public college website, lead capture flows, program discovery, and an admin CRM for counselors.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Prisma 7 + PostgreSQL
- Zod validation
- Tailwind CSS 4
- Vitest

## Prerequisites

- Node.js 20.9+
- npm 10+
- PostgreSQL 14+

## Setup

1. Install dependencies.

```bash
npm install
```

2. Copy environment template.

```bash
cp .env.example .env
```

3. Run database migrations.

```bash
npx prisma migrate dev
```

4. Seed local data.

```bash
npm run prisma:seed
```

5. Start development server.

```bash
npm run dev
```

## Key Routes

### Public Site

- `/` - Home
- `/about` - About SVIET
- `/programs` - Program listing
- `/programs/[slug]` - Program details
- `/admissions` - Admissions info
- `/program-finder` - Program recommendation flow
- `/placements` - Placement highlights
- `/campus-life` - Campus life content
- `/events` - Events listing
- `/contact` - Contact form

### Admin CRM

- `/admin/login` - CRM login
- `/admin` - Dashboard
- `/admin/leads` - Lead list
- `/admin/leads/[id]` - Lead detail, notes, status, assignment

## Environment Variables

| Name | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Primary PostgreSQL connection used by Prisma Client. |
| `DIRECT_URL` | Recommended | Direct DB URL for Prisma migrate/introspection workflows. |
| `JWT_SECRET` | Recommended | Secret for token signing in JWT-based integrations. |
| `ADMIN_ACCESS_TOKEN` | Yes | Token used by admin guard utilities and operational admin checks. |
| `OPENAI_API_KEY` | No | Enables AI admissions chat endpoint; if missing, API returns 503. |
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical public app URL used by metadata and links. |

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import the project in Vercel.
3. Add all variables from `.env.example` in Vercel Project Settings.
4. Set build command to `npm run build` and install command to `npm install`.
5. Deploy and run post-deploy migration command against production DB.
6. Validate public pages, `/api/programs`, lead APIs, sitemap, robots, and admin login.

## Admin Access (First User)

You must create at least one active admin or counselor user in the `User` table before CRM login will work.

Quick option (seeded automatically):

- `npm run prisma:seed` now upserts one active CRM user.
- Defaults (if you do not set overrides):
	- `email`: `crm.admin@sviet.edu`
	- `password`: `ChangeMe123!`
	- `role`: `ADMIN`
- Override values using `CRM_SEED_USER_EMAIL`, `CRM_SEED_USER_PASSWORD`, `CRM_SEED_USER_FIRST_NAME`, `CRM_SEED_USER_LAST_NAME`, `CRM_SEED_USER_ROLE` in your environment.
- Change the default password before shared or production use.

Option 1: Prisma Studio

1. Run `npx prisma studio`.
2. Open `User` table and create a row with:
	- `email`: valid admin email
	- `firstName`, `lastName`
	- `role`: `ADMIN` (or `SUPER_ADMIN`)
	- `status`: `ACTIVE`
	- `passwordHash`: generated hash value (see command below)

Generate a compatible password hash:

```bash
node -e "const { randomBytes, scryptSync } = require('node:crypto'); const p='ChangeMe123!'; const s=randomBytes(16); const h=scryptSync(p,s,64); console.log(`scrypt$${s.toString('hex')}$${h.toString('hex')}`);"
```

Option 2: Direct SQL insert

Insert into `"User"` with `role='ADMIN'`, `status='ACTIVE'`, and a valid `passwordHash` in the same `scrypt$<salt>$<hash>` format.

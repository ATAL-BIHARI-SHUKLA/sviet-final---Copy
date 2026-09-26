# Quick Start: Deployment & Testing Cheat Sheet

## 🚀 Deploy to Vercel Staging in 5 Minutes

### 1. Create Vercel Project
```bash
npm i -g vercel
cd c:\Users\amans\Documents\sviet
vercel  # Creates preview/staging project (not --prod)
```

### 2. Add Environment Variables
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add these:
```
DATABASE_URL=postgresql://user:pass@host:5432/sviet_staging
NEXT_PUBLIC_APP_URL=https://your-staging-url.vercel.app
ADMIN_ACCESS_TOKEN=min-24-character-token
OPENAI_API_KEY=sk-xxxxx  # optional
```
- **Scope**: Preview + Development (check both boxes)

### 3. Deploy
```bash
git push  # OR manually redeploy from Vercel Dashboard
```

### 4. Run Migrations on Staging DB
```bash
# From terminal with DB access
npx prisma migrate deploy --skip-generate
```

### 5. Verify
```bash
curl https://your-staging-url.vercel.app/api/programs
```

---

## 🧪 Quick API Test Cheat Sheet

### Save Your Base URL & Token
```bash
BASE_URL="http://localhost:3000"
TOKEN="your-admin-token-min-24-chars"
```

### Test Programs
```bash
# List all
curl $BASE_URL/api/programs

# Get one
curl $BASE_URL/api/programs/cse
```

### Test Leads (Requires Auth)
```bash
# List leads
curl -X GET "$BASE_URL/api/leads" \
  -H "Authorization: Bearer $TOKEN"

# Create lead
curl -X POST "$BASE_URL/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"+919876543210",
    "program":"cse"
  }'

# Get lead details
curl -X GET "$BASE_URL/api/leads/lead-id-here" \
  -H "Authorization: Bearer $TOKEN"

# Update lead status
curl -X PATCH "$BASE_URL/api/leads/lead-id-here" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"scheduled"}'
```

### Test Applications
```bash
# List applications
curl -X GET "$BASE_URL/api/applications" \
  -H "Authorization: Bearer $TOKEN"

# Start new application
curl -X POST "$BASE_URL/api/applications" \
  -H "Content-Type: application/json" \
  -d '{
    "leadId":"lead-id",
    "program":"cse"
  }'

# Submit application
curl -X POST "$BASE_URL/api/applications/app-id/submit" \
  -H "Content-Type: application/json" \
  -d '{"enclosureNotes":"All docs submitted"}'
```

### Test Authentication
```bash
# Login
curl -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email":"counselor@sviet.edu",
    "password":"password"
  }'

# Get current user
curl -X GET "$BASE_URL/api/auth/me" \
  -H "Authorization: Bearer $TOKEN"
```

### Test AI Chat
```bash
curl -X POST "$BASE_URL/api/ai/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message":"Tell me about CSE program",
    "conversationId":"conv-123"
  }'
```

### Test CRM Stats
```bash
curl -X GET "$BASE_URL/api/crm/stats" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📋 API Endpoints Summary

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/programs` | GET | No | List programs |
| `/api/programs/[slug]` | GET | No | Get program details |
| `/api/leads` | GET/POST | Optional | List/create leads |
| `/api/leads/[id]` | GET/PATCH/DELETE | Yes | Manage lead |
| `/api/leads/[id]/assign` | POST/PATCH | Yes | Assign lead |
| `/api/applications` | GET/POST | Yes | Manage applications |
| `/api/applications/[id]/submit` | POST | No | Submit application |
| `/api/applications/[id]/status` | PATCH | Yes | Update app status |
| `/api/documents` | POST | Yes | Upload document |
| `/api/documents/[id]/review` | PATCH | Yes | Review document |
| `/api/auth/login` | POST | No | Admin login |
| `/api/auth/me` | GET | Yes | Get user info |
| `/api/auth/logout` | POST | Yes | Logout |
| `/api/ai/chat` | POST | No | AI counselor |
| `/api/crm/stats` | GET | Yes | CRM dashboard |
| `/api/crm/leads` | GET | Yes | CRM leads list |
| `/api/crm/leads/[id]` | GET/PATCH | Yes | Manage CRM lead |

---

## 🐛 Troubleshooting Quick Fixes

### Build fails on Vercel
- Check all env vars are set (especially `DATABASE_URL`)
- Delete `.next` folder and rebuild locally first
- Check `npm run build` works locally

### API returns 500 error
- Check database connection: `DATABASE_URL` must be valid
- Check logs in Vercel Deployments tab
- Ensure migrations ran on staging DB

### Auth token not working
- Token must be min 24 characters (set in env var `ADMIN_ACCESS_TOKEN`)
- Use exact token (copy-paste carefully)
- Check Authorization header format: `Bearer YOUR_TOKEN` (space between Bearer and token)

### Staging URL shows old code
- Clear browser cache (Ctrl+Shift+Delete)
- Check latest deployment succeeded (green checkmark on Vercel)
- Redeploy manually from Vercel Dashboard

### Database migration fails
- Ensure direct PostgreSQL connection (not pooled connection)
- Check DIRECT_URL env var is set separately from DATABASE_URL
- Run manually: `psql YOUR_DB_URL -f migration.sql`

---

## 📚 Full Documentation

For complete details, see:
- [VERCEL_STAGING_DEPLOYMENT.md](./VERCEL_STAGING_DEPLOYMENT.md) - Full deployment guide
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference with examples

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

---

## Environment Variables Template

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/sviet_staging
DIRECT_URL=postgresql://user:password@host:5432/sviet_staging

# App
NEXT_PUBLIC_APP_URL=https://staging.vercel.app
ADMIN_ACCESS_TOKEN=your-secure-token-min-24-chars

# Optional
OPENAI_API_KEY=sk-proj-xxxxx
```

---

**Need more help?** See full docs or contact your DevOps team.

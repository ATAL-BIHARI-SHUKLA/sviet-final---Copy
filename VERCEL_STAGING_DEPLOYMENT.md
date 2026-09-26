# Vercel Staging Deployment Guide

This guide explains how to deploy the SVIET application to Vercel staging environment.

## Prerequisites

- GitHub repository with your code pushed
- Vercel account (https://vercel.com)
- Staging PostgreSQL database (separate from production)

## Step 1: Create Vercel Project for Staging

### Option A: Via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository (sviet)
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (default is fine)
   - **Install Command**: `npm install` (default is fine)
   - **Output Directory**: Leave as default (`.next`)
5. Click **"Deploy"** (will fail initially due to missing env vars)

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project
cd c:\Users\amans\Documents\sviet

# Deploy
vercel --prod
# For staging, omit --prod flag
vercel
```

## Step 2: Configure Environment Variables for Staging

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables (mark as appropriate for staging):

### Required Variables

```
DATABASE_URL=postgresql://user:password@host:5432/sviet_staging
NEXT_PUBLIC_APP_URL=https://<staging-url>.vercel.app
ADMIN_ACCESS_TOKEN=your-admin-token-min-24-chars
```

### Optional Variables

```
OPENAI_API_KEY=sk-xxxxx  # Only if using AI chat feature
```

### Set Environment Scope

For each variable, set the scope to:
- **Development** ✓
- **Preview** ✓
- **Production** (for staging, leave unchecked or create separate staging scope)

## Step 3: Set Up Preview Deployments (Recommended)

1. Go to **Project Settings** → **Deployment**
2. Enable **Preview Deployments** for all branches
3. Set up git integration:
   - **Production**: main branch
   - **Preview**: all branches and pull requests

## Step 4: Deploy Staging

### Deploy from Dashboard
1. Go to **Deployments** tab
2. Click **"Redeploy"** or push to a non-main branch

### Deploy from CLI
```bash
vercel --prod  # Deploy to production
vercel        # Deploy to preview/staging
```

## Step 5: Run Database Migrations on Staging

After deployment, run migrations on your staging database:

```bash
# Method 1: Via Vercel Functions (in project root)
npx prisma migrate deploy --skip-generate

# Method 2: Manual SSH (if available)
ssh into staging db and run migrations

# Method 3: Via Vercel Environment Scripts (post-deployment)
# Add to vercel.json post-build script
```

Create or update `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "framework": "nextjs"
}
```

## Step 6: Verify Staging Deployment

### Check Health

```bash
# Public pages
curl https://<staging-url>.vercel.app
curl https://<staging-url>.vercel.app/api/programs

# Admin area (should redirect to login)
curl https://<staging-url>.vercel.app/admin/login
```

### Test APIs
```bash
# List programs
curl -X GET https://<staging-url>.vercel.app/api/programs

# Get program by slug
curl -X GET https://<staging-url>.vercel.app/api/programs/cse
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for full API testing examples.

## Step 7: Configure Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add custom domain (e.g., `staging.sviet.edu`)
3. Update DNS records as per Vercel instructions

## Environment Variables Checklist

- [ ] `DATABASE_URL` - Staging DB connection
- [ ] `NEXT_PUBLIC_APP_URL` - Staging URL
- [ ] `ADMIN_ACCESS_TOKEN` - Min 24 chars
- [ ] `OPENAI_API_KEY` - Optional (if using AI)
- [ ] Scope set correctly (Preview + Development)

## Troubleshooting

### Build Failures

```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - Database connection timeout
# - TypeScript errors
```

### Database Connection Issues

```bash
# Verify DATABASE_URL format
postgresql://user:password@host:port/dbname

# Test connection locally
npx prisma db execute --stdin < /dev/null
```

### Function Timeout

If migrations timeout:
1. Increase function timeout in `vercel.json`
2. Run migrations manually before deployment
3. Use `prisma migrate deploy --skip-generate`

## Monitoring & Logs

1. **Vercel Dashboard**: Deployments tab shows build & runtime logs
2. **Real-time Logs**: Click deployment → **Logs** tab
3. **Function Logs**: API route errors appear in deployment logs

## Rollback

To rollback to previous deployment:

1. Go to **Deployments**
2. Find previous successful deployment
3. Click **"..."** → **"Redeploy"**
4. Confirm

## Next Steps

- [ ] Set up staging database
- [ ] Deploy via Vercel dashboard or CLI
- [ ] Add environment variables
- [ ] Run database migrations
- [ ] Verify deployment with API tests (see API_DOCUMENTATION.md)
- [ ] Test admin login and CRM functions
- [ ] Monitor logs for errors

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

# SVIET Backend: Production QA and Technical Documentation

## A. System Overview

SVIET is implemented as a modular monolith on Next.js App Router with PostgreSQL and Prisma.

### Core goals
- Strong relational data integrity for admissions and CRM workflows.
- Controlled flexibility using JSONB only for multi-step application payloads.
- Strict RBAC and explicit state-transition rules.
- Traceability via activity logs and status history.

### Runtime stack
- Next.js App Router (route handlers in app/api)
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod for runtime validation
- Vitest for automated QA

### Backend module layout
- `lib/`
  - `lib/prisma.ts`: Prisma client bootstrap with PostgreSQL adapter.
  - `lib/db.ts`: server-only re-export for centralized DB import.
- `modules/`
  - `modules/auth`: login/session logic + RBAC guard.
  - `modules/applications`: create/update/submit/status FSM logic.
  - `modules/leads`: lead CRUD and assignment.
  - `modules/documents`: document metadata and review flow.
- `services/`
  - API error abstraction, shared API wrapper, auth context, activity logging.
- `validators/`
  - Zod schemas for auth, leads, applications, documents.
- `app/api/`
  - Route handlers calling validators + module services.

## B. Setup Guide

### 1. Prerequisites
- Node.js 20+
- PostgreSQL 14+
- npm 10+

### 2. Environment
Create `.env` with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/sviet"
ADMIN_ACCESS_TOKEN="your-secure-admin-token-24-plus-chars"
```

Notes:
- `DATABASE_URL` is required.
- `ADMIN_ACCESS_TOKEN` is optional for legacy admin-token checks but recommended.

### 3. Install dependencies
```bash
npm install
```

### 4. Generate Prisma client
```bash
npm run prisma:generate
```

### 5. Run DB migrations
```bash
npm run prisma:migrate
```

### 6. Start dev server
```bash
npm run dev
```

### 7. Quality checks
```bash
npm run lint
npm run test:run
```

## C. API Documentation

All successful responses follow:
```json
{ "ok": true, "data": { ... } }
```

All failures follow:
```json
{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Auth

#### POST /api/auth/login
- Purpose: Basic email/password login with session cookie issuance.
- Body:
```json
{ "email": "student@sviet.edu", "password": "password123" }
```
- Success: `200`, sets `sviet_session` cookie.
- Failures:
  - `400` invalid payload
  - `401` invalid credentials
  - `403` inactive account

#### POST /api/auth/logout
- Purpose: Session termination and cookie clear.
- Success: `200`

### Leads

#### GET /api/leads
- Roles: COUNSELOR, ADMIN, SUPER_ADMIN
- Query: `status`, `ownerCounselorId`, `q`, `take`, `skip`

#### POST /api/leads
- Roles: COUNSELOR, ADMIN, SUPER_ADMIN
- Body:
```json
{
  "firstName": "Asha",
  "lastName": "Patel",
  "email": "asha@example.com",
  "source": "WEBSITE",
  "notes": "Interested in CS",
  "intendedProgramId": "uuid"
}
```

#### GET /api/leads/:leadId
- Roles: COUNSELOR, ADMIN, SUPER_ADMIN
- Returns lead + intended program + owner counselor.

#### PATCH /api/leads/:leadId
- Roles: COUNSELOR, ADMIN, SUPER_ADMIN
- Partial updates accepted via validator.

#### DELETE /api/leads/:leadId
- Roles: ADMIN, SUPER_ADMIN

#### POST /api/leads/:leadId/assign
- Roles: ADMIN, SUPER_ADMIN
- Body:
```json
{ "counselorId": "uuid" }
```

### Applications

#### POST /api/applications
- Roles: APPLICANT, COUNSELOR, ADMIN, SUPER_ADMIN
- Body:
```json
{
  "applicantUserId": "uuid",
  "programId": "uuid",
  "intakeId": "uuid",
  "leadId": "uuid-optional",
  "assignedCounselorId": "uuid-optional"
}
```
- Edge behavior:
  - Duplicate applicant+intake now returns `409 DUPLICATE_APPLICATION`.

#### PATCH /api/applications/:applicationId/step
- Roles: APPLICANT, COUNSELOR, ADMIN, SUPER_ADMIN
- Body:
```json
{
  "stepCode": "PERSONAL_INFO",
  "data": { "firstName": "Riya", "lastName": "Shah" },
  "isCompleted": true
}
```
- Persists JSONB step payload + relational step completion.

#### POST /api/applications/:applicationId/submit
- Roles: APPLICANT, COUNSELOR, ADMIN, SUPER_ADMIN
- Enforces review/submit completeness through service-level check.

#### PATCH /api/applications/:applicationId/status
- Roles: COUNSELOR, ADMIN, SUPER_ADMIN
- Body:
```json
{ "toStatus": "UNDER_REVIEW", "reason": "Initial review started" }
```
- Strict FSM transition validation.

### Documents

#### POST /api/documents
- Roles: APPLICANT, COUNSELOR, ADMIN, SUPER_ADMIN
- Body:
```json
{
  "applicationId": "uuid",
  "applicantUserId": "uuid",
  "type": "TRANSCRIPT",
  "storageKey": "documents/2026/transcript.pdf",
  "originalFileName": "transcript.pdf",
  "mimeType": "application/pdf",
  "sizeBytes": 234567,
  "sha256": "64-char-hex"
}
```

#### PATCH /api/documents/:documentId/review
- Roles: COUNSELOR, ADMIN, SUPER_ADMIN
- Body (approve):
```json
{ "status": "VERIFIED" }
```
- Body (reject):
```json
{ "status": "REJECTED", "rejectionReason": "Unreadable scan" }
```
- Rejecting without reason returns `400`.

## D. Database Schema Explanation

Primary schema in `prisma/schema.prisma`.

### Main entities
- `User`: identity, role, status, session links.
- `Lead`: CRM lead with ownership, source, follow-up.
- `Program` + `Intake`: admission targets and term windows.
- `Application`: canonical admission entity with state and assignment.
- `ApplicationFormData`: JSONB multi-step payload.
- `ApplicationStepProgress`: relational completion tracking by step.
- `Document`: uploaded file metadata + verification state.
- `ApplicationStatusHistory`: immutable status change timeline.
- `ActivityLog`: actor/entity/action audit events.
- `AuthSession`: cookie-backed session records.

### Normalization strategy
- Core searchable/filterable fields are relational columns.
- JSONB is confined to `ApplicationFormData.stepsData` for flexible forms.
- Step completion is not inferred from JSONB; it is normalized in `ApplicationStepProgress`.

### Important constraints and indexes
- Unique application per applicant per intake: `@@unique([applicantUserId, intakeId])`.
- Lead operational indexes: status-owner-updated and program-status paths.
- Application indexes for counselor queues and admin tracking.
- GIN index on JSONB for targeted step data filters.
- Timeline indexes on status history and activity logs.

## E. Testing Report

## What was tested
Automated QA implemented with Vitest across:
- Unit tests for:
  - FSM transition rules
  - Zod schema validation
  - application service edge/error paths
- API tests for all current backend routes:
  - auth
  - leads
  - applications
  - documents
- Role tests for student/counselor/admin access behavior.
- Edge cases: invalid transitions, duplicate submissions, invalid payloads.

## Commands executed
```bash
npm run lint
npm run test:run
```

## Test suite results
- Test files: 7 passed
- Tests: 29 passed
- Route coverage: all route handlers have direct API tests
- Validator/FSM coverage: 100%

## Coverage snapshot (v8)
- Overall statements: 44.57%
- Overall branches: 29.77%
- Overall functions: 53.22%
- Overall lines: 44.92%

Interpretation:
- API contracts and validators are strongly covered.
- Deep service internals for leads/documents/auth context still need additional unit/integration tests.

## API test cases covered
- Auth:
  - login success
  - login failure
  - logout
- Leads:
  - list forbidden for student
  - list success for counselor
  - assign success for admin
  - detail missing lead 404
- Applications:
  - create success
  - create validation failure
  - step update/resume scenario
  - counselor status update success
  - student status update forbidden
  - submit success
- Documents:
  - metadata upload success
  - metadata validation failure
  - review approve success
  - review reject missing reason failure
  - review forbidden for student

## Edge cases handled
- Invalid status transitions rejected by FSM (`422`).
- Duplicate application submission mapped to conflict (`409 DUPLICATE_APPLICATION`).
- Missing required payload fields return validation error (`400`).
- Rejection reason enforced for rejected documents.

## Issues identified and fixed
1. Duplicate application creation surfaced as generic 500.
- Fix: `modules/applications/applications.service.ts` now maps duplicate unique-constraint failures to `409 DUPLICATE_APPLICATION`.

2. Missing document review endpoint blocked counselor document decision flow.
- Fix: Added `PATCH /api/documents/:documentId/review` with role restrictions and rejection-reason validation.

3. Testability/runtime quality issues.
- Fixes:
  - Added Vitest setup to handle `server-only` imports.
  - Added ESLint ignore for `coverage/**` to keep CI lint clean.

## Known limitations
- No payment domain (intended by current scope).
- Session auth is basic and cookie-token based; no refresh rotation.
- No DB-backed policy layer (RLS/PG policies) yet; RBAC is app-layer only.
- Leads/documents/auth-context service-level branch coverage should be expanded.

## F. Usage Guide

### Student flow
1. Login using `/api/auth/login`.
2. Create application with `/api/applications`.
3. Save progress step-by-step using `/api/applications/:id/step`.
4. Resume later by continuing step updates.
5. Upload document metadata via `/api/documents`.
6. Submit application via `/api/applications/:id/submit`.

### Counselor flow
1. View and filter assigned leads via `/api/leads`.
2. Review application progression and update status through `/api/applications/:id/status`.
3. Verify or reject documents via `/api/documents/:documentId/review`.

### Admin flow
1. Full counselor capabilities.
2. Assign leads with `/api/leads/:leadId/assign`.
3. Delete leads when required (`/api/leads/:leadId`).
4. Oversee status transitions and audit events.

## G. Future Improvements

### 1. Add payments
- Add `Payment`, `Invoice`, `PaymentAttempt`, `ScholarshipAward` entities.
- Decouple financial status from admission status.
- Integrate idempotent webhook handling for payment provider events.

### 2. Scaling strategy
- Keep modular monolith but add read-optimized projections/materialized views for dashboards.
- Partition `ActivityLog` and long-term status history tables by time.
- Add background workers for notification, document processing, and analytics aggregation.
- Introduce OpenTelemetry tracing and structured log shipping.

### 3. Security and compliance hardening
- Move from basic sessions to signed/rotating tokens with device/session metadata.
- Add rate limiting and brute-force defenses on auth routes.
- Add PG row-level security (RLS) for defense in depth.

### 4. QA expansion
- Add integration tests with ephemeral PostgreSQL (Testcontainers).
- Add contract tests and snapshot examples for API responses.
- Raise service-layer branch coverage to >80% for critical modules.

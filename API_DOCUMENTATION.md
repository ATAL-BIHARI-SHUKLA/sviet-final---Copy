# API Documentation & curl Testing Guide

Complete reference for all SVIET API endpoints with curl examples for testing.

## Base URL

**Staging**: `https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/`  


## Authentication

Most admin/private endpoints require this header:

```bash
-H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

## Health Check

### Basic Health Check

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/programs
```

**Response**: 200 OK with programs list

---

## 📚 Programs API

### List All Programs

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/programs \
  -H "Content-Type: application/json"
```

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "name": "B.Tech CSE",
    "slug": "cse",
    "description": "Computer Science Engineering"
  }
]
```

### Get Program by Slug

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/programs/cse \
  -H "Content-Type: application/json"
```

**Response**: `200 OK`
```json
{
  "id": 1,
  "slug": "cse",
  "name": "B.Tech Computer Science Engineering",
  "description": "...",
  "duration": 4,
  "seats": 60
}
```

---

## 👥 Leads API

### List All Leads

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Query Parameters**:
- `status`: filter by status (inquiry, contacted, interested, etc.)
- `program`: filter by program slug
- `page`: pagination (default 1)
- `limit`: results per page (default 20)

**Example with filters**:
```bash
curl -X GET "https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads?status=interested&program=cse&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

**Response**: `200 OK`
```json
{
  "leads": [
    {
      "id": "lead-123",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+919876543210",
      "interestProgram": "cse",
      "status": "interested",
      "createdAt": "2025-03-31T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

### Create Lead (From Form)

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "program": "cse",
    "source": "website"
  }'
```

**Response**: `201 Created`
```json
{
  "id": "lead-123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210"
}
```

### Get Lead Details

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/lead-123 \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

**Response**: `200 OK`
```json
{
  "id": "lead-123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "status": "interested",
  "assignedTo": "counselor-456",
  "notes": "Interested in CSE, follow up by end of month"
}
```

### Update Lead

```bash
curl -X PATCH https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/lead-123 \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "scheduled",
    "phone": "+919876543210"
  }'
```

**Response**: `200 OK`

### Delete Lead

```bash
curl -X DELETE https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/lead-123 \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

**Response**: `204 No Content`

### Assign Lead

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/lead-123/assign \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "counselorId": "counselor-456"
  }'
```

**Response**: `200 OK`

### Update Lead Assignment

```bash
curl -X PATCH https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/lead-123/assign \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "counselorId": "counselor-789",
    "notes": "Reassigned due to schedule"
  }'
```

### Query Leads from Contact Form

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+919876543211",
    "message": "Interested in placements data"
  }'
```

**Response**: `201 Created`

### Program Finder Leads

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/leads/program-finder \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "phone": "+919876543212",
    "board": "CBSE",
    "percentage": 85,
    "interests": ["maths", "science"]
  }'
```

**Response**: `201 Created` with recommended programs

---

## 📋 Applications API

### List Applications

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/applications \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Query Parameters**:
- `status`: draft, submitted, under-review, accepted, rejected
- `program`: filter by program slug
- `page`: pagination
- `limit`: results per page

```bash
curl -X GET "https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/applications?status=submitted&program=cse" \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

### Start New Application

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "leadId": "lead-123",
    "program": "cse"
  }'
```

**Response**: `201 Created`
```json
{
  "applicationId": "app-456",
  "status": "draft",
  "currentStep": 1
}
```

### Update Application Step

```bash
curl -X PATCH https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/applications/app-456/step \
  -H "Content-Type: application/json" \
  -d '{
    "step": 2,
    "formData": {
      "10thMarks": 85,
      "12thMarks": 88
    }
  }'
```

**Response**: `200 OK`

### Submit Application

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/applications/app-456/submit \
  -H "Content-Type: application/json" \
  -d '{
    "enclosureNotes": "All documents submitted"
  }'
```

**Response**: `200 OK` with updated status

### Update Application Status

```bash
curl -X PATCH https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/applications/app-456/status \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "under-review",
    "notes": "Under counselor review"
  }'
```

**Response**: `200 OK`

---

## 📄 Documents API

### Upload Document

```bash
# Using form data with file
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/documents \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "applicationId=app-456" \
  -F "type=transcript"
```

**Response**: `201 Created`
```json
{
  "documentId": "doc-789",
  "fileName": "document.pdf",
  "type": "transcript",
  "uploadedAt": "2025-03-31T10:00:00Z"
}
```

### Review Document

```bash
curl -X PATCH https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/documents/doc-789/review \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "approved",
    "feedback": "Document approved for submission"
  }'
```

**Response**: `200 OK`

---

## 🔐 Authentication API

### Login

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "counselor@sviet.edu",
    "password": "secure-password"
  }'
```

**Response**: `200 OK`
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user-123",
    "email": "counselor@sviet.edu",
    "role": "counselor"
  }
}
```

### Get Current User

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response**: `200 OK`
```json
{
  "id": "user-123",
  "email": "counselor@sviet.edu",
  "role": "counselor",
  "name": "John Counselor"
}
```

### Logout

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/auth/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response**: `200 OK`

---

## 🤖 AI Chat API

### Send Message to AI Counselor

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about CSE program",
    "conversationId": "conv-123"
  }'
```

**Response**: `200 OK` (streaming or chunked)
```json
{
  "response": "The CSE program is...",
  "conversationId": "conv-123"
}
```

**Note**: Requires `OPENAI_API_KEY` environment variable

---

## 🏢 CRM API (Admin Only)

### Get CRM Dashboard Stats

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/crm/stats \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

**Response**: `200 OK`
```json
{
  "totalLeads": 150,
  "convertedLeads": 42,
  "pendingFollowUps": 18,
  "applicationsSubmitted": 35
}
```

### List CRM Staff

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/crm/staff \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

**Response**: `200 OK`
```json
[
  {
    "id": "user-123",
    "name": "John Counselor",
    "email": "john@sviet.edu",
    "role": "counselor",
    "leadsAssigned": 10
  }
]
```

### Get CRM Lead

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/crm/leads/lead-123 \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

### List CRM Leads

```bash
curl -X GET https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/crm/leads \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

### Update CRM Lead Status

```bash
curl -X PATCH https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/crm/leads/lead-123/status \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "call-scheduled",
    "nextActionDate": "2025-04-05"
  }'
```

### Add Note to Lead

```bash
curl -X POST https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app/api/crm/leads/lead-123/notes \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Student called, interested in CSE. Follow up next week."
  }'
```

---

## Error Responses

All endpoints return standardized error responses:

### 400 Bad Request
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid input data",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "UNAUTHORIZED",
  "message": "Missing or invalid authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "FORBIDDEN",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "NOT_FOUND",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "INTERNAL_ERROR",
  "message": "An unexpected error occurred"
}
```

---

## Testing Script (Bash)

Save as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="https://sviet-itp0pg151-aryan-kambojs-projects-2c18c0ad.vercel.app"
ADMIN_TOKEN="your-admin-token-here"

echo "=== Testing Programs API ==="
curl -X GET "$BASE_URL/api/programs" \
  -H "Content-Type: application/json"

echo "\n=== Testing Leads API ==="
curl -X GET "$BASE_URL/api/leads" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json"

echo "\n=== Creating a Lead ==="
curl -X POST "$BASE_URL/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "test@example.com",
    "phone": "+919876543210",
    "program": "cse"
  }'

echo "\n=== Done ==="
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## Rate Limiting

- Public endpoints: 100 requests/minute per IP
- Authenticated endpoints: 300 requests/minute per user
- File uploads: 50MB max per file

---

## Documentation Links

- [Prisma Schema](./prisma/schema.prisma) - Database models
- [Lead Validators](./validators/leads.ts) - Input validation
- [Auth Context](./services/auth-context.ts) - Authentication
- [API Handler Patterns](./services/api-handler.ts) - Error handling

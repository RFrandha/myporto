# MyPorto - Project Plan

## Overview

Building a full-stack portfolio website for a Software Engineer with 6+ years of backend experience.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Styling | Tailwind CSS with Navy + Gold theme |
| Blog | Markdown files with remark parser |
| Email | Gmail SMTP |
| Deployment | Vercel (frontend + backend) |
| Domain | rever.cyou (Cloudflare) |

## Project Structure

```
myporto/
├── frontend/          Next.js 14
│   ├── app/           Pages (App Router)
│   ├── components/    Reusable UI components
│   ├── content/blog/  Markdown blog posts
│   ├── lib/           Utilities (api, markdown, types)
│   └── styles/        theme.ts (Navy + Gold colors)
│
├── backend/           Node.js + Express
│   ├── src/
│   │   ├── config/    Environment, SMTP
│   │   ├── routes/    API routes
│   │   ├── handlers/  Request handlers
│   │   ├── services/  Business logic
│   │   ├── middleware/ CORS, errors, logging
│   │   ├── utils/     Logger, responses
│   │   └── types/     TypeScript types
│   └── dist/          Compiled JS
│
├── config/            portfolio.json (static data)
├── shared/            Shared TypeScript types
└── docs/              Documentation
```

## Implementation Status

### Phase 1: Setup ✅
- [x] Clone GitHub repo
- [x] Create folder structure
- [x] Initialize Next.js frontend
- [x] Initialize Node.js backend
- [x] Create shared types
- [x] Create portfolio.json

### Phase 2: Frontend ✅
- [x] theme.ts with Navy + Gold colors
- [x] Layout components (Navbar, Footer, Container)
- [x] Common components (Button, Card)
- [x] Home page with Hero section
- [x] About page
- [x] Experience page with timeline
- [x] Skills page
- [x] Projects page
- [x] Blog listing page
- [x] Blog detail page (markdown rendering)
- [x] Contact page with form

### Phase 3: Backend ✅
- [x] Express server setup
- [x] CORS middleware
- [x] Request logger (Pino)
- [x] Error handler middleware
- [x] Contact form validation (Zod)
- [x] SMTP email service (Nodemailer)
- [x] Standardized response format

### Phase 4: Blog ✅
- [x] gRPC vs REST article
- [x] Ory Kratos article
- [x] Symmetric vs Asymmetric Encryption article
- [x] Markdown parser

### Phase 5: Documentation ✅
- [x] README.md with setup instructions
- [x] SMTP setup guide
- [x] Vercel deployment guide

### Phase 6: Deployment
- [ ] Push to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Vercel
- [ ] Configure custom domain

## Color Scheme

Navy (#001f3f) + Gold (#FFD700)

Configure in: `frontend/styles/theme.ts`

## Response Format

All API responses follow:
```json
{
  "code": "SUCCESS" | "VALIDATION_ERROR" | "INTERNAL_ERROR",
  "message": "Human readable message",
  "data": {}
}
```

## Deployment

### Frontend (Vercel)
- Root Directory: `./frontend`
- Framework: Next.js
- Custom Domain: rever.cyou

### Backend (Vercel)
- Root Directory: `./backend`
- Framework: Other (Node.js)
- Endpoint: https://myporto-api.vercel.app

### Cloudflare DNS
- CNAME `@` → cname.vercel-dns.com
- CNAME `api` → myporto-api.vercel.app

## Timeline

| Phase | Duration |
|-------|----------|
| Setup | 30 min |
| Frontend | 2-3 hours |
| Backend | 1-2 hours |
| Documentation | 30 min |
| **Total** | **~6 hours** |

## References

- Next.js: https://nextjs.org/docs
- Express: https://expressjs.com
- Tailwind CSS: https://tailwindcss.com
- Vercel: https://vercel.com/docs
- Zod: https://zod.dev

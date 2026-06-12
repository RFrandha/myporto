# MyPorto - Portfolio Website

Personal portfolio website showcasing 6+ years of backend engineering experience with Go and Java.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Blog**: Markdown with remark parser
- **Email**: Gmail SMTP
- **Deployment**: Vercel
- **Domain**: rever.cyou

## Project Structure

```
myporto/
├── frontend/          Next.js frontend
├── backend/           Node.js + Express API
├── config/            Portfolio data (JSON)
├── shared/            Shared TypeScript types
└── docs/              Documentation
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

## SMTP Setup (Gmail)

1. Enable 2FA on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate app password for "Mail" + "Windows Computer"
4. Copy the 16-character password
5. Create `backend/.env` file:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=restow.frandha@gmail.com
SMTP_PASSWORD=your-16-char-app-password
CONTACT_EMAIL=restow.frandha@gmail.com

LOG_LEVEL=debug
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
See SMTP Setup section above.

## Vercel Deployment

### Frontend
1. Connect GitHub repo to Vercel
2. Set Root Directory: `./frontend`
3. Set Environment Variable: `NEXT_PUBLIC_API_URL` = your backend URL

### Backend
1. Create separate Vercel project
2. Set Root Directory: `./backend`
3. Set environment variables (SMTP credentials)

### Custom Domain
- Add `rever.cyou` to Vercel frontend project
- Configure Cloudflare DNS

## Blog Posts

Blog posts are stored as markdown files in `frontend/content/blog/`. Each file has frontmatter:

```yaml
---
title: "Post Title"
date: "2026-06-12"
excerpt: "Short description"
---
```

## License

MIT

# PerPic Portfolio — Jam Andrey C. Mariveles
React + Vite · Supabase · Vercel

## Quick Start

### 1. Set up Supabase
- Create project at supabase.com
- Run supabase-setup.sql in SQL Editor
- Create Storage bucket named "portfolio-assets" (public)
- Enable Email Auth, create an admin user
- Copy Project URL + anon key

### 2. Local Setup
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install && npm run dev

### 3. Update Your Links (in src/pages/Contact.jsx)
- CALENDLY_URL → your Calendly link
- ZOOM_LINK → your Zoom meeting link
- Social links → your actual profiles

### 4. Deploy to Vercel
- Push to GitHub
- Import repo at vercel.com
- Add env vars in Vercel dashboard Settings > Environment Variables
- Redeploy

### 5. Custom Domain
Vercel dashboard > Settings > Domains > Add your domain

## Admin Panel
Visit /admin — login with your Supabase Auth credentials
- Portfolio: add/edit items with image uploads
- Certificates: manage credentials
- Messages: read contact form submissions

## Brand Colors
#000000 #404040 #A08862 #EBDEC2 #FFFFFF

## Calendly + Zoom Integration
In Calendly: Settings > Integrations > Zoom > Connect
All new bookings will auto-generate Zoom links.

"Observant Detail, Perfect Results" — PerPic

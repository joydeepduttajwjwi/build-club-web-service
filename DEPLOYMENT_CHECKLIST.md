# Build Club Deployment Checklist

## Pre-Deployment ✓
- [x] Backend updated to use environment variables
- [x] Frontend API endpoint updated to Render URL
- [x] .env.example created for backend
- [x] Deployment guides created

## Frontend (GitHub Pages)

### Prerequisites
- [ ] GitHub account
- [ ] Repository created: `build-club-website`

### Deployment Steps
- [ ] Clone the `build-club-website` repository
- [ ] Copy all files from `buildclub/` to repo root:
  - [ ] admin.html
  - [ ] index.html (if exists)
  - [ ] js/ folder
  - [ ] css/ folder (if exists)
  - [ ] images/ folder (if exists)
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Go to Settings → Pages
- [ ] Set Source to: **main branch**
- [ ] Wait 1-2 minutes for build
- [ ] Access: `https://yourusername.github.io/build-club-website`

## Backend (Render.com)

### Prerequisites
- [ ] GitHub account
- [ ] Render account (free tier)
- [ ] Repository created: `build-club-backend`

### Deployment Steps
- [ ] Clone the `build-club-backend` repository
- [ ] Copy all files from `buildclub/backend/` to repo root
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Go to Render → New Web Service
- [ ] Connect `build-club-backend` repository
- [ ] Configuration:
  - [ ] Name: `buildclub-api`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `node server.js`
- [ ] Add Environment Variables:
  - [ ] `ADMIN_USER=joydeepdutta855@gmail.com`
  - [ ] `ADMIN_PASS=your-secure-password` (change this!)
- [ ] Click Deploy
- [ ] Wait for deployment (2-5 minutes)
- [ ] Copy your Render URL (e.g., `https://buildclub-api.onrender.com`)

## Testing
- [ ] Test backend API: `https://buildclub-api.onrender.com/api/data`
- [ ] Test frontend loads on GitHub Pages
- [ ] Check browser console for API errors
- [ ] Verify admin login works

## Post-Deployment
- [ ] Update `ADMIN_PASS` on Render to a secure password
- [ ] Monitor Render logs for errors
- [ ] Note: Render free tier sleeps after 15 min inactivity

## Important Notes
- Frontend is already configured to use `https://buildclub-api.onrender.com/api`
- Admin credentials are now environment variables (secure!)
- File uploads work at `/uploads` endpoint
- CORS is enabled for all origins

---

**Status:** Ready for deployment! ✨

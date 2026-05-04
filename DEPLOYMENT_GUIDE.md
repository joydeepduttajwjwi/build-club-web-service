# Build Club Website - Deployment Guide

## ✅ Changes Made
- ✓ Backend now reads admin credentials from environment variables
- ✓ Frontend API endpoint updated to: `https://buildclub-api.onrender.com/api`
- ✓ Admin credentials are now configurable on Render

---

## 📋 Frontend Deployment (GitHub Pages)

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `build-club-website`
3. Public repository
4. Click **Create repository**

### Step 2: Prepare Frontend Files
```bash
cd buildclub
# Copy all frontend files to repo root
# Files from frontend/ folder should go to root:
# - admin.html
# - js/
# - css/ (if exists)
# - images/ (if exists)
```

### Step 3: Push to GitHub
```bash
cd build-club-website  # your cloned repo
git add .
git commit -m "Initial commit: Build Club website"
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: **main branch** → Save
4. Wait 1-2 minutes for build
5. Your site: `https://yourusername.github.io/build-club-website`

---

## 🎯 Backend Deployment (Render.com)

### Step 1: Create GitHub Repository for Backend
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `build-club-backend`
3. Public repository
4. Click **Create repository**

### Step 2: Push Backend to GitHub
```bash
cd buildclub/backend
git init
git add .
git commit -m "Initial commit: Build Club backend"
git branch -M main
git remote add origin https://github.com/yourusername/build-club-backend.git
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up or log in
3. Dashboard → **New +** → **Web Service**
4. **Connect Repository**: Select `build-club-backend`
5. **Settings**:
   - Name: `buildclub-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. **Environment Variables** (Add these):
   ```
   ADMIN_USER = joydeepdutta855@gmail.com
   ADMIN_PASS = your-secure-password
   ```
7. Click **Create Web Service**
8. Wait for deployment (2-5 minutes)
9. Copy your Render URL: `https://buildclub-api.onrender.com`

### Step 4: Verify Backend
Test the API:
```bash
curl https://buildclub-api.onrender.com/api/data
```

---

## 🔗 Connect Frontend to Backend

✅ **Already done!** The frontend `main.js` is configured to use:
```javascript
const API_BASE = 'https://buildclub-api.onrender.com/api';
```

When you deploy frontend to GitHub Pages, it will automatically connect to your Render backend.

---

## 📝 Important Notes

1. **Admin Credentials**: Change the password in Render environment variables before going live
2. **CORS**: Backend is configured to accept requests from anywhere (`origin: true`)
3. **Free Tier Limits**:
   - Render: Spins down after 15 mins of inactivity (first request takes ~30 seconds)
   - GitHub Pages: 1GB storage, no usage limits
4. **Uploads Directory**: File uploads go to `backend/public/uploads/` on Render

---

## 🧪 Testing Locally Before Deployment

```bash
# Terminal 1 - Start Backend
cd buildclub/backend
npm install
npm start
# Backend runs at http://localhost:3001

# Terminal 2 - Serve Frontend
# Use Live Server or Python:
cd buildclub
python -m http.server 8000
# Frontend at http://localhost:8000
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| API calls failing | Check Render URL in `main.js` matches your service URL |
| 403 Admin errors | Verify `ADMIN_USER` and `ADMIN_PASS` in Render environment |
| Uploads not working | Ensure `backend/public/uploads/` exists on Render |
| GitHub Pages 404 | Check repository name and Settings → Pages configuration |
| Render takes long to respond | Free tier spins down after inactivity - normal behavior |

---

## 📚 Useful Links
- [GitHub Pages Docs](https://pages.github.com/)
- [Render Docs](https://render.com/docs)
- [Express.js Documentation](https://expressjs.com/)

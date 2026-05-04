# 🚀 FINAL DEPLOYMENT - YOUR WEBSITE GOES LIVE NOW

## ✅ DONE: Code is pushed to GitHub
- ✓ Backend pushed to: https://github.com/joydeepduttajwjwi/build-club-backend
- ✓ Frontend pushed to: https://github.com/joydeepduttajwjwi/build-club

---

## 📝 STEP 1: Enable GitHub Pages (2 minutes)

1. Go to: https://github.com/joydeepduttajwjwi/build-club/settings/pages
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **master** / **root**
   - Click **Save**
3. Wait 1-2 minutes

✨ **YOUR FRONTEND WILL BE AT:** `https://joydeepduttajwjwi.github.io/build-club`

---

## 🌐 STEP 2: Deploy Backend on Render (3 minutes)

1. Go to https://render.com and sign up
2. Click **New +** → **Web Service**
3. Click **Connect Repository** → Select `build-club-backend`
4. Fill in:
   - **Name:** `buildclub-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
5. Click **Advanced** → Add Environment Variables:
   ```
   ADMIN_USER = joydeepdutta855@gmail.com
   ADMIN_PASS = 231456joybuilds231456
   ```
6. Click **Create Web Service**
7. Wait 2-5 minutes for deployment

✨ **YOUR BACKEND WILL BE AT:** `https://buildclub-api.onrender.com`

---

## ✅ TESTING YOUR LIVE SITE

Once both are deployed:

1. **Visit your frontend:**
   `https://joydeepduttajwjwi.github.io/build-club`

2. **Test backend API:**
   `https://buildclub-api.onrender.com/api/data`
   (Should see JSON response)

3. **Admin login:**
   - Email: `joydeepdutta855@gmail.com`
   - Password: `231456joybuilds231456`

4. **Check console for errors:**
   Press F12 in browser → Console tab

---

## 📍 YOUR FINAL WEBSITE LINKS

- **Website (Frontend):** https://joydeepduttajwjwi.github.io/build-club
- **API (Backend):** https://buildclub-api.onrender.com

---

**⚠️ IMPORTANT NOTES:**
- Render free tier sleeps after 15 min of inactivity (wakes up on request)
- Change ADMIN_PASS to something secure when live!
- File uploads go to `/uploads` endpoint
- Keep your environment variables secret

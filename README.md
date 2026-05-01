# 🏗️ Build Club Website

**Apple-style production website + Admin Dashboard for Build Club, St. Anthony's College, Shillong**

---

## 📁 Project Structure

```
buildclub/
├── frontend/
│   ├── index.html          ← Main website (Apple-style)
│   ├── admin.html          ← Admin dashboard
│   └── js/
│       └── main.js         ← All JS: animations, data fetching
└── backend/
    ├── server.js           ← Express API server
    ├── package.json
    └── data/
        └── db.json         ← JSON database (events, projects, team)
```

---

## 🚀 Quick Start (Local)

### 1. Frontend Only (No backend needed)
Just open `frontend/index.html` in your browser. The site works with fallback data built in.

### 2. Full Stack (with backend)

**Install backend dependencies:**
```bash
cd backend
npm install
npm start
```

Backend runs at: `http://localhost:3001`

**Open the frontend:**
- Website: `http://localhost:3001` (served by Express)
- Admin: `http://localhost:3001/admin.html`

**Admin credentials:**
- Email: `joydeepdutta855@gmail.com`
- Password: `231456joybuilds231456`

---

## 🌐 Deployment

### Frontend → GitHub Pages

1. Create a GitHub repository: `build-club-website`
2. Copy all files from `frontend/` to the repo root
3. Go to repo **Settings → Pages → Source → main branch**
4. Your site: `https://yourusername.github.io/build-club-website`

### Backend → Render (Free)

1. Push `backend/` folder to a separate GitHub repo
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. Set:
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add environment variables:
   - `ADMIN_USER=joydeepdutta855@gmail.com`
   - `ADMIN_PASS=your-secure-password`
6. Copy your Render URL (e.g. `https://buildclub-api.onrender.com`)

### Connect Frontend to Backend

Edit `frontend/js/main.js` line 2:
```js
const API_BASE = 'https://buildclub-api.onrender.com/api';
```

---

## ✨ Features

### Website
- Apple-style dark UI with premium typography (Syne + DM Sans)
- GSAP ScrollTrigger animations (fade, slide, parallax)
- Custom animated cursor
- Noise texture + grid overlay for depth
- Sections: Hero, Stats, About, Domains, Events, Projects, Team, Roadmap, Gallery, Contact
- Fully responsive (mobile-first)
- Lazy loading images
- Works without backend (fallback data)

### Admin Dashboard
- Login with session auth
- Add / Edit / Delete Events (with image upload)
- Add / Delete Projects
- Add / Remove Team Members
- Overview stats panel
- All changes reflect live on the website

---

## 🎨 Customization

### Change Colors
Edit `frontend/index.html` CSS variables:
```css
:root {
  --accent: #a78bfa;     /* Soft purple */
  --bg: #faf9f7;         /* Soft warm background */
}
```

### Add Team Members
Use the Admin Dashboard → Team → Add Member

### Update Events
Use Admin Dashboard → Events → Add Event

### Change Hero Text
Edit `backend/data/db.json` → `siteContent.heroTagline`

---

## 🔧 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML5, Vanilla JS, CSS3 |
| Animations | GSAP 3 + ScrollTrigger |
| Fonts | Syne + DM Sans (Google Fonts) |
| Backend | Node.js + Express |
| Database | JSON file (easily swap to MongoDB) |
| Auth | Express Session |
| File Upload | Multer |

---

## 📞 Contact
Built for **Build Club, St. Anthony's College, Shillong**
Powered by **ITEL – Immersive Technology Entrepreneurship Labs**

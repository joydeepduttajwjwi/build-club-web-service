# Quick Render Setup Checklist

## 1️⃣ Environment Variables to Add in Render
Copy these exactly into Render dashboard (Settings → Environment):

```
ADMIN_USER=joydeepdutta855@gmail.com
ADMIN_PASS=your-secure-password
```

## 2️⃣ Render Configuration
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Environment:** Node (auto-detected)

## 3️⃣ After Deployment
1. Copy your service URL (e.g., `https://buildclub-api.onrender.com`)
2. Test: `https://buildclub-api.onrender.com/api/data`
3. Update frontend if needed (already done in main.js)

## 4️⃣ Key Files
- `server.js` - Main app
- `data/db.json` - Database
- `public/uploads/` - File uploads
- `package.json` - Dependencies

## ✅ Admin Login
Email: `joydeepdutta855@gmail.com`  
Password: Set in Render environment variables

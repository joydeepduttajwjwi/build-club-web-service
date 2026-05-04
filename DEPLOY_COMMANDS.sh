#!/bin/bash
# Build Club Website - Deployment Commands
# Copy and paste these commands to deploy

# ==========================================
# FRONTEND DEPLOYMENT (GitHub Pages)
# ==========================================

# Step 1: Create repo on GitHub, then:
git clone https://github.com/yourusername/build-club-website.git
cd build-club-website

# Step 2: Copy all files from buildclub/ folder to repo root
# Use File Explorer or:
# cp -r ../buildclub-website/buildclub/* .

# Step 3: Push to GitHub
git add .
git commit -m "Build Club website - GitHub Pages deployment"
git push -u origin main

# Step 4: Enable Pages in GitHub Settings (manual step)
# Then access: https://yourusername.github.io/build-club-website


# ==========================================
# BACKEND DEPLOYMENT (Render)
# ==========================================

# Step 1: Create repo on GitHub, then:
git clone https://github.com/yourusername/build-club-backend.git
cd build-club-backend

# Step 2: Copy backend folder contents
# cp -r ../buildclub-website/buildclub/backend/* .

# Step 3: Push to GitHub
git add .
git commit -m "Build Club backend - Render deployment"
git push -u origin main

# Step 4: Create Web Service on Render (manual step)
# 1. Go to render.com → New Web Service
# 2. Connect your build-club-backend repo
# 3. Settings:
#    - Build Command: npm install
#    - Start Command: node server.js
# 4. Add Environment Variables:
#    ADMIN_USER=joydeepdutta855@gmail.com
#    ADMIN_PASS=your-secure-password
# 5. Deploy


# ==========================================
# LOCAL TESTING
# ==========================================

# Test Backend Locally
cd buildclub/backend
npm install
npm start
# Then test: curl http://localhost:3001/api/data

# Test Frontend Locally (in another terminal)
cd buildclub
python -m http.server 8000
# Open: http://localhost:8000


# ==========================================
# AFTER DEPLOYMENT
# ==========================================

# Test Frontend is connecting to Backend:
# 1. Check console in GitHub Pages site
# 2. You should see API calls to https://buildclub-api.onrender.com/api
# 3. If not, verify main.js has correct API_BASE URL

# ============================================
# BUILD CLUB WEBSITE - COMPLETE DEPLOYMENT
# ============================================
# This script handles EVERYTHING:
# 1. Prepare backend & push to build-club-backend repo
# 2. Prepare frontend & push to build-club repo  
# 3. Instructions for Render deployment
# ============================================

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  BUILD CLUB WEBSITE - FULL DEPLOYMENT SCRIPT 🚀           ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# ============ PART 1: DEPLOY BACKEND ============
Write-Host "`n[STEP 1/3] 🔧 DEPLOYING BACKEND TO GitHub (build-club-backend)" -ForegroundColor Yellow

$backendPath = "$PSScriptRoot\buildclub\backend"
$backendGitRepo = "https://github.com/YOUR_USERNAME/build-club-backend.git"

Write-Host "📂 Backend path: $backendPath" -ForegroundColor Gray

# Check if backend repo already has git
if (Test-Path "$backendPath\.git") {
    Write-Host "✓ Backend git repo exists, updating..." -ForegroundColor Green
    Set-Location $backendPath
    git add .
    git commit -m "Update: Backend deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git push origin main
} else {
    Write-Host "⚠ Backend git repo NOT found. Initialize it first:" -ForegroundColor Yellow
    Write-Host "
    cd $backendPath
    git init
    git add .
    git commit -m 'Initial commit: Build Club backend'
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/build-club-backend.git
    git push -u origin main
    " -ForegroundColor Magenta
}

# ============ PART 2: DEPLOY FRONTEND ============
Write-Host "`n[STEP 2/3] 🎨 DEPLOYING FRONTEND TO GitHub (build-club)" -ForegroundColor Yellow

$frontendPath = "$PSScriptRoot\buildclub"
$frontendGitRepo = "https://github.com/YOUR_USERNAME/build-club.git"

# Check if main repo exists
if (Test-Path "$PSScriptRoot\.git") {
    Write-Host "✓ Frontend git repo exists, checking status..." -ForegroundColor Green
    Set-Location $PSScriptRoot
    git status
} else {
    Write-Host "⚠ Frontend git repo NOT found. Initialize it:" -ForegroundColor Yellow
    Write-Host "
    cd $PSScriptRoot
    git init
    git add .
    git commit -m 'Initial commit: Build Club website'
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/build-club.git
    git push -u origin main
    " -ForegroundColor Magenta
}

# ============ PART 3: RENDER DEPLOYMENT ============
Write-Host "`n[STEP 3/3] 🌐 RENDER.COM BACKEND DEPLOYMENT" -ForegroundColor Yellow
Write-Host @"
═══════════════════════════════════════════════════════════════════

To complete backend deployment on Render:

1️⃣  Go to https://render.com (sign up if needed)

2️⃣  Click "New +" → "Web Service"

3️⃣  Connect your 'build-club-backend' GitHub repo

4️⃣  Configure:
    • Name: buildclub-api
    • Environment: Node
    • Region: Choose closest to you
    • Build Command: npm install
    • Start Command: node server.js

5️⃣  Add Environment Variables:
    ADMIN_USER = joydeepdutta855@gmail.com
    ADMIN_PASS = 231456joybuilds231456
    (Change ADMIN_PASS to something secure!)

6️⃣  Click "Create Web Service" and WAIT 2-5 minutes

7️⃣  Copy your Render URL (like: https://buildclub-api.onrender.com)

8️⃣  Update backend/server.js with environment variables:
    - Change hardcoded ADMIN_PASS to use process.env.ADMIN_PASS
    
═══════════════════════════════════════════════════════════════════
"@ -ForegroundColor Cyan

# ============ FRONTEND DEPLOYMENT ============
Write-Host "`n🎯 GITHUB PAGES FRONTEND DEPLOYMENT (build-club repo)" -ForegroundColor Yellow
Write-Host @"
═══════════════════════════════════════════════════════════════════

Once your GitHub repo (build-club) has all files:

1️⃣  Go to your GitHub repo (https://github.com/YOUR_USERNAME/build-club)

2️⃣  Go to Settings → Pages

3️⃣  Source: Select "Deploy from a branch"

4️⃣  Branch: main (or master) → root folder → Save

5️⃣  Wait 1-2 minutes for GitHub Pages to build

6️⃣  Your website will be at:
    https://YOUR_USERNAME.github.io/build-club

7️⃣  Check browser console (F12) for any API errors

═══════════════════════════════════════════════════════════════════
"@ -ForegroundColor Cyan

# ============ TESTING ============
Write-Host "`n✅ TESTING CHECKLIST:" -ForegroundColor Green
Write-Host @"
After deployment, verify everything works:

1. Test Backend API:
   curl https://buildclub-api.onrender.com/api/data
   (Should return JSON with your data)

2. Test Frontend:
   https://YOUR_USERNAME.github.io/build-club
   Open admin.html and verify it loads

3. Test Admin Login:
   Email: joydeepdutta855@gmail.com
   Password: 231456joybuilds231456 (or what you set)

4. Test File Upload:
   Try uploading a file through admin panel
   Check if file appears at /uploads

5. Check Browser Console:
   Press F12 in browser → Console tab
   Should have NO red errors

═══════════════════════════════════════════════════════════════════
"@ -ForegroundColor Green

Write-Host "`n🎉 DEPLOYMENT SCRIPT COMPLETE!" -ForegroundColor Cyan
Write-Host "Follow the steps above to fully deploy your website." -ForegroundColor Cyan

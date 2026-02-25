# Render Deployment Guide for Yash Padaliya Portfolio

## 🚀 Deploy to Render.com - Get yashpadaliya.onrender.com

This guide will help you deploy your portfolio to Render.com for FREE with a custom URL.

---

## Prerequisites

1. **GitHub Account** - Sign up at https://github.com if you don't have one
2. **Render Account** - Sign up at https://render.com (free)

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface (Easiest)

1. **Download Your Code**
   - I'll create a zip file of your project
   - Or you can download directly from this workspace

2. **Create Repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `portfolio` or `yashpadaliya-portfolio`
   - Description: "Professional Portfolio Website"
   - Select: **Public** (free for public repos)
   - ✅ Add README file
   - Click "Create repository"

3. **Upload Code**
   - Click "Add file" → "Upload files"
   - Drag and drop all folders (frontend, backend)
   - Include: `render.yaml`, `README.md`
   - Commit message: "Initial portfolio setup"
   - Click "Commit changes"

### Option B: Using Git Command Line

```bash
# Initialize git repository
cd /app
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio setup"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git push -u origin main
```

---

## Step 2: Deploy to Render

### 2.1 Sign Up / Log In

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub repositories

### 2.2 Create New Web Service

1. **Dashboard** → Click "New +" → Select "Blueprint"
2. **Connect Repository**
   - Find: `portfolio` (or whatever you named it)
   - Click "Connect"
3. **Review Services**
   - Render will detect `render.yaml`
   - You'll see:
     - ✅ yashpadaliya-backend (API)
     - ✅ yashpadaliya-frontend (Website)
     - ✅ yashpadaliya-mongodb (Database)
4. **Customize Names (Optional)**
   - Backend: `yashpadaliya-api` or keep default
   - Frontend: `yashpadaliya` (this becomes your main URL)
   - Database: Keep default
5. **Click "Apply"**

### 2.3 Wait for Deployment

- ⏱️ Takes 5-10 minutes
- Watch build logs in real-time
- Backend deploys first
- Then frontend
- MongoDB provisions automatically

---

## Step 3: Configure Environment Variables (If Needed)

Render auto-configures most variables from `render.yaml`, but verify:

### Backend Service:
1. Go to Backend service → "Environment"
2. Verify:
   - `MONGO_URL` → Auto-linked to database ✅
   - `DB_NAME` → portfolio_db ✅
   - `CORS_ORIGINS` → * ✅

### Frontend Service:
1. Go to Frontend service → "Environment"
2. Verify:
   - `REACT_APP_BACKEND_URL` → https://yashpadaliya-backend.onrender.com ✅

---

## Step 4: Access Your Live Website 🎉

Once deployment completes (green checkmark):

**Your URLs:**
- **Main Website**: `https://yashpadaliya.onrender.com` (or your chosen name)
- **Backend API**: `https://yashpadaliya-backend.onrender.com`

**Test It:**
1. Visit your main URL
2. Check if portfolio loads
3. Test contact form
4. Verify all sections work

---

## Step 5: Custom Domain (Optional - Later)

Want `yashpadaliya.com` instead of `.onrender.com`?

1. **Purchase Domain** (~$10/year)
   - Namecheap, Google Domains, etc.

2. **Add to Render**
   - Go to your Frontend service
   - "Settings" → "Custom Domain"
   - Add: `yashpadaliya.com`
   - Follow DNS instructions

3. **Configure DNS**
   - Add CNAME record at your registrar
   - Point to: `yashpadaliya.onrender.com`
   - Wait 5-30 minutes

---

## Troubleshooting

### Build Fails

**Frontend build error:**
```bash
# Check if all dependencies are in package.json
cd frontend && yarn install
```

**Backend build error:**
```bash
# Check requirements.txt
cd backend && pip install -r requirements.txt
```

### Database Connection Issues

1. Go to Backend service → Environment
2. Verify `MONGO_URL` is set
3. Check database service is running (green)

### 500 Server Errors

1. Check Backend logs: Dashboard → Backend service → Logs
2. Look for MongoDB connection errors
3. Verify health check: `https://yashpadaliya-backend.onrender.com/health`

### Frontend Shows Wrong Backend URL

1. Go to Frontend service → Environment
2. Update `REACT_APP_BACKEND_URL`
3. Trigger manual redeploy

---

## Important Notes

### Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month (enough for always-on)
- ✅ Auto-sleep after 15 min inactivity
- ✅ Wakes up on first request (10-30 seconds)
- ✅ Free SSL certificate
- ✅ 100GB bandwidth/month

**Keep-Alive Tip:**
To prevent sleep, use a service like:
- UptimeRobot (free)
- Ping your URL every 14 minutes

### Updating Your Site

**After making code changes:**
1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```
2. Render auto-deploys (if enabled)
3. Or manually trigger deploy in dashboard

---

## Cost Summary

```
✅ GitHub Repository: FREE
✅ Render Hosting: FREE (750 hours/month)
✅ MongoDB Database: FREE (shared cluster)
✅ SSL Certificate: FREE
✅ Subdomain (.onrender.com): FREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: $0/month
```

**Optional:**
- Custom domain (.com): ~$10/year
- Render paid plan: $7/month (faster, no sleep)

---

## Your Final URLs

After successful deployment:

**Website**: https://yashpadaliya.onrender.com
**API**: https://yashpadaliya-backend.onrender.com/api
**Health Check**: https://yashpadaliya-backend.onrender.com/health
**API Docs**: https://yashpadaliya-backend.onrender.com/docs

---

## Next Steps

1. ✅ Create GitHub repo
2. ✅ Push code
3. ✅ Deploy to Render
4. ✅ Test your live site
5. 📱 Share with employers/clients!

**Need Help?** 
- Render Docs: https://render.com/docs
- Community: https://community.render.com
- Support: support@render.com

---

## Ready to Deploy?

Let me know when you've:
1. Created your GitHub repository
2. Pushed the code

Then I'll guide you through the Render deployment!

Or if you need help with the GitHub setup, let me know!

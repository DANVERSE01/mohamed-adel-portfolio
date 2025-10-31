# 🚀 Quick Netlify Deployment Guide

## Step-by-Step Instructions

### 1. Go to Netlify
Visit: https://app.netlify.com

### 2. Create New Site
- Click "Add new site" button
- Select "Import an existing project"

### 3. Connect GitHub
- Choose "GitHub" as your Git provider
- Authorize Netlify if needed
- Search for: `mohamed-adel-portfolio`
- Select the repository

### 4. Configure Build Settings
Netlify will auto-detect from `netlify.toml`:
- **Build command:** `pnpm build`
- **Publish directory:** `dist/public`
- **Branch:** `master`

### 5. Deploy!
- Click "Deploy site"
- Wait 2-3 minutes
- Your site will be live! 🎉

### 6. Custom Domain (Optional)
- Go to Site settings → Domain management
- Click "Add custom domain"
- Follow DNS instructions

---

## 📝 Important Notes

- **No environment variables needed** for basic deployment
- Site will be at: `https://[random-name].netlify.app`
- Auto-deploys on every push to `master` branch
- Build time: ~2-3 minutes

---

## 🔗 Links

- **GitHub Repo:** https://github.com/DANVERSE01/mohamed-adel-portfolio
- **Netlify Dashboard:** https://app.netlify.com
- **Documentation:** See README.md

---

**That's it! Your portfolio will be live in minutes! 🚀**

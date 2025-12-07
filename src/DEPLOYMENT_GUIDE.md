# Agrilink Ghana - Deployment Guide

## Quick Start - Deploy in 5 Minutes with Vercel

### Step 1: Download Your Code
1. In Figma Make, look for the **Download** or **Export** button
2. Download all files as a ZIP
3. Extract the ZIP to a folder on your computer (e.g., `agrilink-ghana`)

### Step 2: Set Up Git (First Time Only)

**Install Git:**
- Windows: Download from [git-scm.com](https://git-scm.com)
- Mac: Install via Terminal: `brew install git` or download from git-scm.com
- Linux: `sudo apt-get install git`

**Configure Git (run these commands in Terminal/Command Prompt):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign up (or log in)
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `agrilink-ghana`
4. Description: "Agricultural marketplace for Ghana"
5. Keep it **Public**
6. **DO NOT** check "Initialize with README"
7. Click **Create repository**

### Step 4: Upload Code to GitHub

Open Terminal/Command Prompt, navigate to your project folder:

```bash
# Navigate to your project folder
cd path/to/agrilink-ghana

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Agrilink Ghana marketplace"

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/agrilink-ghana.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → Choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Click **Add New** → **Project**
5. Find `agrilink-ghana` repository → Click **Import**
6. **Framework Preset:** Vite (should auto-detect)
7. Click **Deploy**
8. Wait 1-2 minutes ⏳
9. **Done!** 🎉 Your site is live!

Your website will be at: `https://agrilink-ghana.vercel.app`

---

## Alternative: Deploy with Netlify

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **Add new site** → **Import an existing project**
4. Choose **GitHub** → Select `agrilink-ghana`
5. **Build command:** `npm run build`
6. **Publish directory:** `dist`
7. Click **Deploy site**
8. Done! Live at: `https://agrilink-ghana.netlify.app`

---

## Add Custom Domain

### Buy a Domain:
- [Namecheap.com](https://namecheap.com) - ~$10-15/year
- [GoDaddy.com](https://godaddy.com)
- [Google Domains](https://domains.google)

Suggested domains:
- `agrilinkghana.com`
- `agrilink.com.gh`
- `ghanaagrimarket.com`

### Connect Domain to Vercel:

1. In Vercel dashboard, click your project
2. Go to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain (e.g., `agrilinkghana.com`)
5. Follow DNS instructions:
   - Go to your domain registrar (Namecheap, etc.)
   - Add the DNS records Vercel provides
   - Wait 10-60 minutes for DNS propagation
6. SSL certificate is automatically added (free HTTPS!)

---

## Update Your Site

After making changes in Figma Make:

```bash
# Download updated code
# Replace files in your local folder

# Commit and push changes
git add .
git commit -m "Updated features"
git push

# Vercel automatically redeploys! (30-60 seconds)
```

---

## Important: Before Going Live with Real Users

⚠️ **Current Status:** This is a DEMO with mock data

**To make it production-ready, you need:**

### 1. Database (Supabase - Recommended)
- Sign up at [supabase.com](https://supabase.com)
- Create tables: `users`, `listings`, `orders`, `messages`
- Replace mock data with real database queries

### 2. Payment Processing
**For Ghana, use:**
- **Paystack** ([paystack.com](https://paystack.com)) - Most popular in Ghana
- **Flutterwave** ([flutterwave.com](https://flutterwave.com))
- Supports Mobile Money, Cards, Bank Transfer

### 3. User Authentication
- Use Supabase Auth (built-in)
- Or Firebase Auth
- Add login/signup pages

### 4. Image Uploads
- Use Cloudinary ([cloudinary.com](https://cloudinary.com)) - Free tier
- Or Supabase Storage
- Allow users to upload product photos

### 5. Email Notifications
- Use SendGrid, Mailgun, or Resend
- Send order confirmations, delivery updates

### 6. SMS for Ghana
- **Hubtel** ([hubtel.com](https://hubtel.com)) - Ghanaian SMS provider
- Send order notifications via SMS

---

## Free Hosting Options

| Platform | Free Tier | Custom Domain | Best For |
|----------|-----------|---------------|----------|
| **Vercel** | Unlimited | Yes (free) | Easiest, fastest |
| **Netlify** | 100GB/month | Yes (free) | Great for static sites |
| **GitHub Pages** | Unlimited | Yes | Simple projects |
| **Render** | 750 hours/month | Yes | Full-stack apps |

**Recommendation:** Use **Vercel** - it's the easiest and most reliable.

---

## Troubleshooting

### "git command not found"
- Install Git from [git-scm.com](https://git-scm.com)

### "Permission denied" when pushing to GitHub
- Use Personal Access Token instead of password
- GitHub Settings → Developer settings → Personal access tokens → Generate new token

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Usually missing dependencies - contact me for help

### Site is slow
- Optimize images (use WebP format)
- Add lazy loading for images
- Enable Vercel's image optimization

---

## Get Help

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Guides:** [guides.github.com](https://guides.github.com)
- **Video Tutorial:** Search YouTube for "Deploy React app to Vercel"

---

## Next Steps After Deployment

1. ✅ Share your live link: `https://your-site.vercel.app`
2. 📱 Test on mobile devices
3. 🔍 Set up Google Analytics (track visitors)
4. 📊 Set up Supabase for real data
5. 💳 Integrate Paystack for payments
6. 🚀 Launch and promote!

---

**Your site will be live and accessible worldwide!** 🌍

Good luck with Agrilink Ghana! 🇬🇭🌾

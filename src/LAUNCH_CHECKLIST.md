# 🚀 Agrilink Ghana - Launch Checklist

Use this checklist to ensure everything is set up correctly before going live.

---

## ✅ Phase 1: Local Setup (30 minutes)

### Database Setup
- [ ] Go to Supabase Dashboard: https://supabase.com/dashboard
- [ ] Open SQL Editor
- [ ] Copy SQL from `/supabase/migrations/001_initial_schema.sql`
- [ ] Run the SQL migration
- [ ] Verify 5 tables created: `profiles`, `listings`, `orders`, `messages`, `reviews`
- [ ] Check Row Level Security is enabled on all tables

### Paystack Setup
- [ ] Sign up at https://paystack.com
- [ ] Verify your business email
- [ ] Go to Settings → API Keys & Webhooks
- [ ] Copy your **Test Public Key** (pk_test_...)
- [ ] Save the key securely

### Project Configuration
- [ ] Create `.env` file in project root
- [ ] Add Paystack test key: `VITE_PAYSTACK_PUBLIC_KEY=pk_test_...`
- [ ] Create/update `index.html` with Paystack script
- [ ] Verify `.env` is in `.gitignore`

### Install Dependencies
- [ ] Run: `npm install @supabase/supabase-js`
- [ ] Run: `npm install` (for any other dependencies)
- [ ] Verify no installation errors

---

## ✅ Phase 2: Testing (20 minutes)

### Test Authentication
- [ ] Run: `npm run dev`
- [ ] Click "Sign In" button
- [ ] Create a test account
- [ ] Check email for verification link
- [ ] Verify email and login
- [ ] Test logout
- [ ] Test login again with same credentials
- [ ] Verify user profile loads correctly

### Test Listings
- [ ] Browse existing listings (mock data)
- [ ] Click on a listing to view details
- [ ] Verify seller information displays
- [ ] Test search functionality
- [ ] Test category filter
- [ ] Test location filter

### Test Payment Flow
- [ ] Select a product
- [ ] Click "Place Secure Order"
- [ ] Fill in delivery details (minimum 50 units)
- [ ] Submit order
- [ ] Wait for validation (auto-approved in demo)
- [ ] Click "Proceed to Payment"
- [ ] Verify Paystack modal opens
- [ ] Use test card: `4084 0840 8408 4081`
- [ ] Expiry: `12/25`, CVV: `123`
- [ ] Complete payment
- [ ] Verify success message
- [ ] Check order in dashboard

### Test User Dashboard
- [ ] Navigate to dashboard
- [ ] Verify user profile displays
- [ ] Check statistics (orders, spent, etc.)
- [ ] View order history
- [ ] Test navigation between pages

---

## ✅ Phase 3: Production Setup (30 minutes)

### Paystack Production Configuration
- [ ] Complete Paystack KYC verification
  - [ ] Upload business registration
  - [ ] Upload ID documents
  - [ ] Add bank account details
  - [ ] Wait for approval (1-3 business days)
- [ ] After approval, get **Live Public Key** (pk_live_...)
- [ ] Save live key securely (DON'T commit to Git!)

### Domain & Hosting
- [ ] Buy domain (recommended: agrilinkghana.com)
- [ ] Push code to GitHub
  ```bash
  git init
  git add .
  git commit -m "Launch Agrilink Ghana"
  git remote add origin YOUR_GITHUB_URL
  git push -u origin main
  ```
- [ ] Sign up for Vercel: https://vercel.com
- [ ] Connect GitHub account
- [ ] Import repository
- [ ] Add environment variables in Vercel:
  - [ ] `VITE_PAYSTACK_PUBLIC_KEY` = your **live** key
- [ ] Deploy to Vercel
- [ ] Verify site is live
- [ ] Connect custom domain in Vercel settings
- [ ] Update DNS records at domain registrar
- [ ] Wait for SSL certificate (auto-configured)
- [ ] Test site with custom domain

### Email Configuration
- [ ] Go to Supabase → Authentication → Email Templates
- [ ] Customize welcome email template
- [ ] Customize password reset template
- [ ] Test email delivery
- [ ] (Optional) Set up custom SMTP:
  - [ ] Sign up for SendGrid/Mailgun/Resend
  - [ ] Add SMTP credentials to Supabase
  - [ ] Test email delivery again

---

## ✅ Phase 4: Content & Data (1 hour)

### Initial Listings
- [ ] Create real product listings (or migrate from mock data)
- [ ] Add high-quality product images
- [ ] Write detailed descriptions
- [ ] Set accurate pricing
- [ ] Verify stock status
- [ ] Set minimum order quantities
- [ ] Test each listing

### User Verification
- [ ] Create process for verifying sellers
- [ ] Define verification criteria
- [ ] Assign Extension Officers (if ready)
- [ ] Test verification workflow

### Policies & Terms
- [ ] Write Terms of Service
- [ ] Write Privacy Policy
- [ ] Write Refund Policy
- [ ] Add escrow terms explanation
- [ ] Get legal review (recommended)
- [ ] Add links to footer

---

## ✅ Phase 5: Enhancement (Optional)

### Image Upload
- [ ] Sign up for Cloudinary (free tier)
- [ ] Get API credentials
- [ ] Integrate image upload for listings
- [ ] Test image upload
- [ ] Add image optimization

### SMS Notifications
- [ ] Sign up for Hubtel: https://hubtel.com
- [ ] Get API credentials
- [ ] Integrate SMS for order updates
- [ ] Test SMS delivery
- [ ] Add opt-out option

### Email Notifications
- [ ] Set up transactional emails:
  - [ ] Order confirmation
  - [ ] Payment received
  - [ ] Order validated
  - [ ] Order shipped
  - [ ] Order delivered
- [ ] Test all email triggers
- [ ] Customize email templates

### Analytics
- [ ] Add Google Analytics
- [ ] Set up conversion tracking
- [ ] Track key metrics:
  - [ ] User registrations
  - [ ] Orders placed
  - [ ] Revenue
  - [ ] Popular products
- [ ] Set up Supabase Analytics

---

## ✅ Phase 6: Security & Performance

### Security Audit
- [ ] Verify all environment variables are secure
- [ ] Check `.env` is not in Git
- [ ] Verify Row Level Security policies
- [ ] Test unauthorized access attempts
- [ ] Enable rate limiting (if needed)
- [ ] Set up error monitoring (Sentry)
- [ ] Review CORS settings
- [ ] Enable HTTPS only (Vercel default)

### Performance Optimization
- [ ] Optimize images (WebP format)
- [ ] Enable lazy loading
- [ ] Test mobile performance
- [ ] Test on slow connections
- [ ] Enable caching
- [ ] Minimize bundle size
- [ ] Test load times (aim for <3s)

### Backup & Recovery
- [ ] Verify Supabase automatic backups
- [ ] Document recovery procedures
- [ ] Test database restore (if possible)
- [ ] Set up monitoring alerts

---

## ✅ Phase 7: Launch Preparation

### Beta Testing
- [ ] Recruit 10-20 beta testers
- [ ] Provide test funds for Paystack
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Make UI/UX improvements
- [ ] Run second beta round

### Marketing Preparation
- [ ] Create social media accounts (Facebook, Instagram, Twitter)
- [ ] Design promotional materials
- [ ] Write launch announcement
- [ ] Prepare press release
- [ ] Contact agricultural organizations
- [ ] Reach out to farmer cooperatives
- [ ] Plan launch event (optional)

### Support Setup
- [ ] Set up customer support email
- [ ] Create FAQ page
- [ ] Write help documentation
- [ ] Train support team
- [ ] Set up WhatsApp Business (for Ghana)
- [ ] Prepare response templates

---

## ✅ Phase 8: Go Live! 🚀

### Pre-Launch (1 day before)
- [ ] Final security review
- [ ] Final performance test
- [ ] Verify all links work
- [ ] Test payment flow end-to-end
- [ ] Check mobile responsiveness
- [ ] Verify email notifications
- [ ] Test on different browsers
- [ ] Prepare rollback plan

### Launch Day
- [ ] Switch Paystack to live mode
- [ ] Update environment variables with live keys
- [ ] Monitor error logs
- [ ] Watch payment transactions
- [ ] Be ready for user support
- [ ] Post launch announcement
- [ ] Share on social media
- [ ] Monitor server performance

### Post-Launch (First Week)
- [ ] Monitor daily
- [ ] Respond to user feedback quickly
- [ ] Fix critical bugs immediately
- [ ] Track key metrics
- [ ] Gather user testimonials
- [ ] Iterate based on feedback

---

## 📊 Success Metrics

Track these metrics weekly:

### User Metrics
- [ ] New registrations
- [ ] Active users
- [ ] User retention rate
- [ ] Farmers vs Buyers ratio

### Business Metrics
- [ ] Total orders
- [ ] Total revenue
- [ ] Average order value
- [ ] Order completion rate
- [ ] Payment success rate

### Product Metrics
- [ ] Most popular categories
- [ ] Most popular regions
- [ ] Average delivery time
- [ ] Customer satisfaction score

---

## 🆘 Emergency Contacts

### Technical Issues
- **Supabase Support:** https://supabase.com/dashboard/support
- **Paystack Support:** support@paystack.com
- **Vercel Support:** https://vercel.com/help

### Business Issues
- **Paystack Phone:** +234 01 888 6881 (Nigeria, also supports Ghana)
- **Emergency Rollback:** Revert to previous Git commit

---

## ✅ Final Pre-Launch Checklist

**Critical Items - Must Complete:**
- [ ] ✅ Database tables created
- [ ] ✅ Paystack live keys configured
- [ ] ✅ Domain connected
- [ ] ✅ SSL certificate active
- [ ] ✅ Email verification working
- [ ] ✅ Payment flow tested end-to-end
- [ ] ✅ All environment variables secure
- [ ] ✅ Terms of Service published
- [ ] ✅ Privacy Policy published
- [ ] ✅ Support email set up
- [ ] ✅ Error monitoring active

**Nice to Have:**
- [ ] Custom logo
- [ ] Social media presence
- [ ] Blog/news section
- [ ] Testimonials
- [ ] Video tutorials
- [ ] Mobile app (future)

---

## 🎉 You're Ready to Launch!

Once all critical items are checked, you're ready to launch Agrilink Ghana!

**Remember:**
- Start small and iterate
- Listen to user feedback
- Fix bugs quickly
- Scale gradually
- Keep security tight
- Monitor everything

**Good luck! 🇬🇭🌾**

---

**Questions?** Check these guides:
- Quick start: `/QUICK_START.md`
- Detailed setup: `/SETUP_INSTRUCTIONS.md`
- Integration details: `/INTEGRATION_SUMMARY.md`
- Deployment: `/DEPLOYMENT_GUIDE.md`

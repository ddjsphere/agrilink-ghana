# Agrilink Ghana - Setup Instructions

## 🎯 You're Almost Ready to Go Live!

I've integrated **Supabase** (database & authentication) and **Paystack** (payments) into your application. Follow these steps to complete the setup.

---

## Step 1: Set Up Supabase Database ✅ (5 minutes)

### 1.1 Create Database Tables

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New query**
5. Open the file `/supabase/migrations/001_initial_schema.sql` in your project
6. **Copy ALL the SQL code** from that file
7. **Paste it** into the Supabase SQL Editor
8. Click **Run** (bottom right)
9. ✅ You should see "Success. No rows returned"

**What this creates:**
- `profiles` table - User accounts and roles
- `listings` table - Products for sale
- `orders` table - Order management with escrow
- `messages` table - Buyer-seller communication
- `reviews` table - User ratings and reviews

### 1.2 Verify Tables Were Created

1. In Supabase dashboard, click **Table Editor**
2. You should see 5 tables: `profiles`, `listings`, `orders`, `messages`, `reviews`
3. ✅ If you see them, you're done!

---

## Step 2: Set Up Paystack (10 minutes)

### 2.1 Create Paystack Account

1. Go to https://paystack.com
2. Click **Get Started**
3. Sign up with your business email
4. Complete KYC verification (required for live payments)
   - Business details
   - ID verification
   - Bank account

### 2.2 Get API Keys

1. Log in to Paystack Dashboard
2. Go to **Settings** → **API Keys & Webhooks**
3. You'll see two keys:
   - **Test Public Key** (starts with `pk_test_`) - For testing
   - **Live Public Key** (starts with `pk_live_`) - For real payments

### 2.3 Add Paystack Script to Your App

Create a file `/index.html` in your project root (if it doesn't exist) and add:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Agrilink Ghana</title>
    
    <!-- Paystack Inline Script -->
    <script src="https://js.paystack.co/v1/inline.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 2.4 Add Environment Variables

Create a file `/.env` in your project root:

```env
# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_TEST_KEY_HERE

# For production, use your live key:
# VITE_PAYSTACK_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY_HERE
```

**Important:** 
- Use **test key** for development
- Use **live key** only when you're ready to accept real payments
- Never commit `.env` file to GitHub (add it to `.gitignore`)

---

## Step 3: Enable Authentication Emails (5 minutes)

### 3.1 Configure Email Settings

1. In Supabase Dashboard, go to **Authentication** → **Email Templates**
2. Customize the email templates:
   - **Confirm signup** - Welcome email with verification link
   - **Magic Link** - Passwordless login
   - **Reset Password** - Password recovery

### 3.2 Set Up Custom SMTP (Optional but Recommended)

For better deliverability, use a custom email service:

1. Go to **Project Settings** → **Auth** → **SMTP Settings**
2. Recommended providers:
   - **SendGrid** (free tier: 100 emails/day)
   - **Mailgun** (free tier: 5000 emails/month)
   - **Resend** (free tier: 3000 emails/month)
3. Add SMTP credentials from your email provider

---

## Step 4: Update Your App to Use Real Data

### 4.1 Replace Mock Data with Real Data

Your app currently uses mock data from `/data/mockData.ts`. Now we need to use real database queries.

**Update `/App.tsx`:**

```tsx
import { useEffect } from 'react';
import { AuthProvider } from './utils/auth/authContext';
import { Toaster } from 'sonner';
// ... rest of imports

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        {/* Your existing app components */}
      </div>
    </AuthProvider>
  );
}
```

**Update `/components/Home.tsx`** to fetch real listings:

```tsx
import { useEffect, useState } from 'react';
import { fetchListings } from '../utils/database/listingsService';

export function Home({ onViewListing }: HomeProps) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadListings() {
      const { data, error } = await fetchListings({
        category: selectedCategory,
        location: selectedLocation,
        search: searchQuery,
        inStockOnly: true,
      });
      
      if (data) setListings(data);
      setLoading(false);
    }
    
    loadListings();
  }, [selectedCategory, selectedLocation, searchQuery]);

  // ... rest of component
}
```

### 4.2 Add Login/Signup to Header

Update `/components/Header.tsx`:

```tsx
import { useState } from 'react';
import { useAuth } from '../utils/auth/authContext';
import { LoginModal } from './auth/LoginModal';

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-green-700 text-white sticky top-0 z-50 shadow-lg">
        {/* ... existing header content ... */}
        
        {user && profile ? (
          <div className="flex items-center gap-2">
            <span>{profile.name}</span>
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={() => setShowLoginModal(true)}>
            Sign In
          </button>
        )}
      </header>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
```

---

## Step 5: Test Everything (10 minutes)

### 5.1 Test User Registration

1. Run your app: `npm run dev`
2. Click "Sign In" → "Sign Up"
3. Create a test account
4. Check your email for verification link
5. Verify your account
6. ✅ You should be logged in!

### 5.2 Test Creating a Listing

1. Create a component to add listings (sellers only)
2. Upload images (use Cloudinary or Supabase Storage)
3. Submit the form
4. ✅ Check Supabase Table Editor to see the new listing

### 5.3 Test Payment Flow

1. Browse a product
2. Place an order
3. When payment modal opens:
   - Use Paystack test card: **4084 0840 8408 4081**
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)
4. Complete payment
5. ✅ Check order status in database

**Paystack Test Cards:**
```
Success: 4084 0840 8408 4081
Declined: 5060 6666 6666 6666 6666
```

---

## Step 6: Deploy to Production

### 6.1 Add Environment Variables to Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_PAYSTACK_PUBLIC_KEY = pk_test_YOUR_KEY_HERE
   ```
5. Click **Save**
6. Redeploy your app

### 6.2 Update Paystack Settings for Live Mode

When ready for real payments:

1. In Paystack Dashboard, switch from **Test Mode** to **Live Mode**
2. Update environment variable to use `pk_live_` key
3. Redeploy

---

## Optional Enhancements

### 📱 SMS Notifications (Ghana)

Use **Hubtel** for SMS:

```bash
npm install axios
```

```typescript
// utils/sms/hubtelService.ts
async function sendSMS(phone: string, message: string) {
  await fetch('https://api.hubtel.com/v1/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('CLIENT_ID:CLIENT_SECRET'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      From: 'Agrilink',
      To: phone,
      Content: message,
    }),
  });
}
```

### 📧 Email Notifications

Use **Resend** for transactional emails:

```bash
npm install resend
```

### 🖼️ Image Upload

Use **Cloudinary**:

```bash
npm install cloudinary
```

Or use **Supabase Storage** (built-in):

```typescript
const { data, error } = await supabase.storage
  .from('listings')
  .upload('image.jpg', file);
```

---

## Troubleshooting

### "Auth Error: User not found"
- Make sure you verified your email
- Check spam folder for verification email
- Try resetting password

### "Paystack not defined"
- Make sure you added the Paystack script to `index.html`
- Check browser console for script loading errors

### "Database connection failed"
- Verify Supabase project is active
- Check if tables were created successfully
- Ensure RLS policies are enabled

### Payment fails in test mode
- Use official Paystack test cards (listed above)
- Check Paystack dashboard for error logs
- Ensure you're using the test public key

---

## Security Checklist Before Going Live

- [ ] All `.env` files added to `.gitignore`
- [ ] Using live Paystack key (not test key)
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] User email verification enabled
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] Rate limiting for API calls
- [ ] Regular database backups (Supabase auto-backups)

---

## Next Steps

1. ✅ Complete database setup
2. ✅ Configure Paystack
3. ✅ Test authentication
4. ✅ Test order flow
5. ✅ Deploy to production
6. 🚀 Launch Agrilink Ghana!

---

**Need Help?**

- Supabase Docs: https://supabase.com/docs
- Paystack Docs: https://paystack.com/docs
- React Query (for data fetching): https://tanstack.com/query

Good luck with your launch! 🇬🇭🌾

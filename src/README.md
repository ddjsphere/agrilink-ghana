# Agrilink Ghana 🇬🇭🌾

A comprehensive agricultural marketplace connecting farmers, suppliers, aggregators, and buyers across Ghana.

![Agrilink Ghana](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop)

## Features

### 🌽 Agriculture-Specific Categories
- Maize, Cocoa, Rice, Cassava
- Poultry, Livestock, Fish
- Seeds, Fertilizers, Equipment
- Tractors, Irrigation Systems
- Agricultural Services

### 👥 Multiple User Roles
- **Farmers** - Sell produce and buy inputs
- **Input Suppliers** - Provide seeds, fertilizers, equipment
- **Aggregators** - Buy in bulk from farmers
- **Manufacturers** - Source raw materials
- **Extension Officers** - Validate orders and provide advisory
- **Buyers** - Purchase agricultural products

### 🔒 Secure Order Flow
1. **Order Placement** - Buyer selects product and quantity
2. **Validation** - Extension officer reviews and approves
3. **Escrow Payment** - Funds held securely (2% fee)
4. **Delivery** - Product shipped to buyer
5. **Confirmation** - Buyer confirms receipt
6. **Fund Release** - Payment released to seller

### 🔍 Search & Filter
- Search by product name or description
- Filter by category (12 agriculture categories)
- Filter by location (10 regions in Ghana)
- Sort by price, date, popularity

### ✅ Trust & Safety
- Verified seller badges
- Seller ratings and reviews
- Extension officer validation
- Escrow payment protection
- Transparent order tracking

## Technology Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Vercel (recommended)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Quick Deploy with Vercel:**
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy in 1 click
4. Live in 2 minutes! 🚀

## Project Structure

```
agrilink-ghana/
├── components/
│   ├── Header.tsx           # Main navigation
│   ├── Home.tsx            # Homepage with listings
│   ├── CategoryGrid.tsx    # Category selection
│   ├── ListingCard.tsx     # Product card
│   ├── ListingDetail.tsx   # Product details page
│   ├── OrderFlow.tsx       # 5-step order process
│   ├── UserDashboard.tsx   # User profile & orders
│   └── ui/                 # Reusable UI components
├── data/
│   └── mockData.ts         # Sample data (replace with real DB)
├── styles/
│   └── globals.css         # Global styles & Tailwind
├── App.tsx                 # Main app component
└── DEPLOYMENT_GUIDE.md     # Deployment instructions
```

## Current Status

⚠️ **This is a DEMO/PROTOTYPE with mock data**

### What's Working:
- ✅ Full UI/UX design
- ✅ Browse and search products
- ✅ View product details
- ✅ Mock order flow (visual demo)
- ✅ User dashboard
- ✅ Responsive design (mobile-friendly)

### What's Needed for Production:
- 🔲 Database integration (Supabase recommended)
- 🔲 Real user authentication
- 🔲 Payment processing (Paystack/Flutterwave)
- 🔲 Image upload functionality
- 🔲 Real-time messaging between users
- 🔲 Email/SMS notifications
- 🔲 Admin dashboard
- 🔲 Extension officer portal

## Making It Production-Ready

### 1. Set Up Supabase (Database)

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Create tables: users, listings, orders, messages, reviews
# Replace mockData.ts with real database queries
```

### 2. Add Payment Processing

**For Ghana, use Paystack:**

```bash
npm install react-paystack
```

- Sign up at [paystack.com](https://paystack.com)
- Get API keys
- Integrate payment flow
- Test with Paystack test mode

### 3. Add Authentication

```javascript
// Using Supabase Auth
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Sign up
await supabase.auth.signUp({ email, password })

// Sign in
await supabase.auth.signInWithPassword({ email, password })
```

### 4. Add Image Uploads

Use Cloudinary or Supabase Storage for product images.

## Ghana-Specific Features

- 🇬🇭 **Regions:** All 10 regions of Ghana
- 💰 **Currency:** Ghana Cedi (GH₵)
- 📱 **Mobile Money:** Support for MTN, Vodafone, AirtelTigo
- 🌾 **Crops:** Focus on Ghanaian agriculture (cocoa, cassava, maize, etc.)
- 📞 **SMS:** Integration with Hubtel for notifications

## Recommended Services for Ghana

| Service | Purpose | Website |
|---------|---------|---------|
| **Paystack** | Payment processing | paystack.com |
| **Hubtel** | SMS notifications | hubtel.com |
| **Supabase** | Database & Auth | supabase.com |
| **Cloudinary** | Image hosting | cloudinary.com |
| **Vercel** | Web hosting | vercel.com |

## Contributing

This is a proprietary project for Agrilink Ghana. For feature requests or bug reports, contact the development team.

## License

Copyright © 2024 Agrilink Ghana. All rights reserved.

## Support

For deployment help, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Made for Ghanaian farmers and agricultural businesses** 🇬🇭

*Connecting farms to markets, one click at a time.* 🌾

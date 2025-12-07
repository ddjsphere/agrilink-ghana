# Authentication System - Usage Guide

## LoginModal Component

The `LoginModal` component provides a unified sign-in and sign-up experience.

### Usage

```tsx
import { useState } from 'react';
import { LoginModal } from './components/auth/LoginModal';

function MyComponent() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <button onClick={() => setShowLogin(true)}>
        Sign In
      </button>
      
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        initialMode="login" // or "signup"
      />
    </>
  );
}
```

### Features

- Email/password authentication
- Role selection (Farmer, Buyer, Supplier, etc.)
- Location selection (Ghana regions)
- Form validation
- Error handling
- Switch between login and signup
- Responsive design

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | required | Controls modal visibility |
| `onClose` | function | required | Called when modal should close |
| `initialMode` | 'login' \| 'signup' | 'login' | Initial view mode |

---

## useAuth Hook

Access authentication state and methods anywhere in your app.

### Basic Usage

```tsx
import { useAuth } from '../../utils/auth/authContext';

function MyComponent() {
  const { user, profile, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <button onClick={() => signIn(email, password)}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {profile?.name}!</p>
      <p>Role: {profile?.role}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Available Properties

```tsx
const {
  user,        // Supabase user object (or null)
  profile,     // User profile from database (or null)
  session,     // Current session (or null)
  loading,     // true while fetching auth state
  signUp,      // Function to create account
  signIn,      // Function to sign in
  signOut,     // Function to sign out
  updateProfile // Function to update profile
} = useAuth();
```

### Sign Up

```tsx
const { signUp } = useAuth();

const handleSignUp = async () => {
  const { error } = await signUp(
    'user@example.com',    // email
    'password123',         // password
    'John Mensah',         // name
    'Farmer',              // role
    'Greater Accra'        // location
  );

  if (error) {
    console.error('Sign up failed:', error);
  } else {
    // Success! User will receive verification email
  }
};
```

### Sign In

```tsx
const { signIn } = useAuth();

const handleSignIn = async () => {
  const { error } = await signIn(
    'user@example.com',
    'password123'
  );

  if (error) {
    console.error('Sign in failed:', error);
  } else {
    // Success! User is now logged in
  }
};
```

### Sign Out

```tsx
const { signOut } = useAuth();

const handleSignOut = async () => {
  await signOut();
  // User is now signed out
};
```

### Update Profile

```tsx
const { updateProfile } = useAuth();

const handleUpdate = async () => {
  const { error } = await updateProfile({
    name: 'New Name',
    location: 'Ashanti Region',
    phone: '+233123456789'
  });

  if (error) {
    console.error('Update failed:', error);
  }
};
```

### Check User Role

```tsx
const { profile } = useAuth();

if (profile?.role === 'Farmer') {
  // Show farmer-specific features
}

if (profile?.role === 'Extension Officer') {
  // Show extension officer dashboard
}
```

---

## Protected Routes

Protect pages that require authentication:

```tsx
import { useAuth } from '../../utils/auth/authContext';
import { useEffect } from 'react';

function ProtectedPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h2>Please sign in to continue</h2>
        <button onClick={() => navigate('/login')}>Sign In</button>
      </div>
    );
  }

  return <div>Protected content</div>;
}
```

---

## Role-Based Access

Restrict features by user role:

```tsx
import { useAuth } from '../../utils/auth/authContext';

function Dashboard() {
  const { profile } = useAuth();

  return (
    <div>
      {/* Everyone sees this */}
      <div>Your orders</div>

      {/* Only farmers see this */}
      {profile?.role === 'Farmer' && (
        <div>Create new listing</div>
      )}

      {/* Only extension officers see this */}
      {profile?.role === 'Extension Officer' && (
        <div>Validate orders</div>
      )}

      {/* Multiple roles */}
      {['Farmer', 'Input Supplier'].includes(profile?.role || '') && (
        <div>Seller dashboard</div>
      )}
    </div>
  );
}
```

---

## Available Roles

1. **Farmer** - Sells produce, buys inputs
2. **Input Supplier** - Sells seeds, fertilizers, equipment
3. **Aggregator** - Buys in bulk from farmers
4. **Manufacturer** - Sources raw materials
5. **Extension Officer** - Validates orders, provides advisory
6. **Buyer** - Purchases agricultural products

---

## Email Verification

Users must verify their email before full access:

```tsx
const { user } = useAuth();

if (user && !user.email_confirmed_at) {
  return (
    <div>
      <h3>Please verify your email</h3>
      <p>Check your inbox for a verification link.</p>
    </div>
  );
}
```

---

## Error Handling

```tsx
const { signIn } = useAuth();

const handleSignIn = async () => {
  const { error } = await signIn(email, password);

  if (error) {
    switch (error.message) {
      case 'Invalid login credentials':
        alert('Wrong email or password');
        break;
      case 'Email not confirmed':
        alert('Please verify your email first');
        break;
      default:
        alert('An error occurred. Please try again.');
    }
  }
};
```

---

## Session Management

Sessions are automatically managed:
- Stored in localStorage
- Refreshed automatically
- Synced across tabs
- Expires after inactivity

---

## Best Practices

### 1. Always Check Loading State
```tsx
const { user, loading } = useAuth();

if (loading) return <Spinner />;
```

### 2. Handle Null Values
```tsx
const { profile } = useAuth();

// Good
const userName = profile?.name || 'Guest';

// Bad
const userName = profile.name; // May crash if profile is null
```

### 3. Use Loading States for Actions
```tsx
const [submitting, setSubmitting] = useState(false);

const handleSignIn = async () => {
  setSubmitting(true);
  await signIn(email, password);
  setSubmitting(false);
};
```

### 4. Provide User Feedback
```tsx
import { toast } from 'sonner';

const handleSignIn = async () => {
  const { error } = await signIn(email, password);
  
  if (error) {
    toast.error('Sign in failed');
  } else {
    toast.success('Welcome back!');
  }
};
```

---

## Testing

### Test Accounts

Create test accounts for each role:

```bash
# Farmer
email: farmer@test.com
password: test123

# Buyer  
email: buyer@test.com
password: test123

# Extension Officer
email: officer@test.com
password: test123
```

### Manual Testing Checklist

- [ ] Sign up with new email
- [ ] Verify email (check spam folder)
- [ ] Sign in with credentials
- [ ] Sign out
- [ ] Sign in again (session persists)
- [ ] Update profile
- [ ] Test wrong password
- [ ] Test unverified email
- [ ] Test role-based features

---

## Troubleshooting

### "User not found" Error
- User may not be registered
- Email may be typo'd
- Try password reset

### "Email not confirmed" Error
- Check email inbox and spam
- Resend verification email
- Wait a few minutes for email delivery

### Profile Not Loading
- Check Supabase table `profiles` exists
- Verify Row Level Security policies
- Check browser console for errors

### Session Not Persisting
- Check browser allows localStorage
- Verify Supabase URL and keys are correct
- Try clearing browser cache

---

## Advanced Usage

### Custom Profile Fields

Add fields in Supabase, then update TypeScript types:

```tsx
// utils/auth/authContext.tsx
interface Profile {
  // ... existing fields
  bio?: string;
  website?: string;
  verified_documents?: string[];
}
```

### Custom Sign Up Flow

```tsx
// Collect extra data during signup
const { signUp } = useAuth();

await signUp(
  email,
  password,
  name,
  role,
  location
);

// Then update profile with additional info
await updateProfile({
  phone: phoneNumber,
  bio: userBio
});
```

---

## Security Notes

⚠️ **Important:**
- Never store passwords in plain text
- Always use HTTPS in production
- Enable Row Level Security on all tables
- Require email verification
- Use strong password requirements
- Rate limit authentication attempts

---

## Need Help?

- Check Supabase Auth docs: https://supabase.com/docs/guides/auth
- Review example in `/components/Header.tsx`
- Check integration guide: `/INTEGRATION_SUMMARY.md`

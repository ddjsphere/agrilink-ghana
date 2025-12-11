import { SignUp } from './components/SignUp';
import { useState } from 'react';
import { AuthProvider, useAuth } from './utils/auth/authContext';
import { Home } from './components/Home';
import { ListingDetail } from './components/ListingDetail';
import { UserDashboard } from './components/UserDashboard';
import { OrderFlow } from './components/OrderFlow';
import { Header } from './components/Header';
import { Toaster } from 'sonner@2.0.3';

type Page = 'home' | 'listing' | 'dashboard' | 'order' | 'signup';

/**
 * Coming Soon page – this is what visitors will see
 * on the live Vercel deployment (production).
 */
function ComingSoon() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        padding: '1.5rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🚜 Agrilink Ghana – Coming Soon
      </h1>
      <p style={{ maxWidth: 520, marginBottom: '1rem' }}>
        We’re building something special.The platform will be live soon.
      </p>
      <p>📧 Contact: info@agrilinkghana.com</p>
    </main>
  );
}

/**
 * Your original app logic – unchanged.
 */
function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const { user, profile, loading } = useAuth();

  // Use logged-in user profile or demo user
  const currentUser = profile || {
    id: '1',
    name: 'Demo User',
    role: 'Farmer' as const,
    location: 'Greater Accra',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
  };

  const handleViewListing = (listingId: string) => {
    setSelectedListingId(listingId);
    setCurrentPage('listing');
  };

  const handlePlaceOrder = (listingId: string) => {
    setSelectedListingId(listingId);
    setCurrentPage('order');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading Agrilink Ghana...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentUser={currentUser}
        onNavigate={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />

      {currentPage === 'home' && (
        <Home onViewListing={handleViewListing} />
      )}

      {currentPage === 'listing' && selectedListingId && (
        <ListingDetail
          listingId={selectedListingId}
          onBack={() => setCurrentPage('home')}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentPage === 'dashboard' && (
        <UserDashboard
          user={currentUser}
          onViewListing={handleViewListing}
        />
      )}

      {currentPage === 'order' && selectedListingId && (
        <OrderFlow
          listingId={selectedListingId}
          currentUser={currentUser}
          onBack={() => setCurrentPage('listing')}
          onComplete={() => setCurrentPage('dashboard')}
        />
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}

/**
 * MainApp wraps your content in AuthProvider (same as your old default App).
 */
function MainApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

/**
 * App decides what to render:
 * - Production (Vercel): ComingSoon
 * - Dev (`npm run dev`): MainApp (your real app)
 */
export default function App() {
  const isProduction = import.meta.env.MODE === 'production';

  if (isProduction) {
    return <ComingSoon />;
  }

  return <MainApp />;
}

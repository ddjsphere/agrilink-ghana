import { useState } from 'react';
import { AuthProvider, useAuth } from './utils/auth/authContext';
import { Home } from './components/Home';
import { ListingDetail } from './components/ListingDetail';
import { UserDashboard } from './components/UserDashboard';
import { OrderFlow } from './components/OrderFlow';
import { Header } from './components/Header';
import { Toaster } from 'sonner@2.0.3';

type Page = 'home' | 'listing' | 'dashboard' | 'order';

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
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo'
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
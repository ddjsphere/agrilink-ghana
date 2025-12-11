import { Search, User, ShoppingCart, Menu, Plus, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../utils/auth/authContext';
import { LoginModal } from './auth/LoginModal';

type Page = 'home' | 'listing' | 'dashboard' | 'order' | 'signup';

interface HeaderProps {
  currentUser: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export function Header({ currentUser, onNavigate, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <>
      <header className="bg-cyan-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              <div className="bg-white text-cyan-600 p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 7v10c0 5.5 3.8 9 8 10 4.2-1 8-4.5 8-10V7l-8-5zm0 2.5l6 3.75v7.75c0 4-2.7 6.9-6 7.8-3.3-.9-6-3.8-6-7.8V8.25l6-3.75z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div>
                <h1>Agrilink Ghana</h1>
                <p className="text-xs opacity-90">Farm to Market</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('home')}
                className={`hover:text-cyan-200 transition ${currentPage === 'home' ? 'border-b-2 border-white' : ''}`}
              >
                Browse
              </button>
              <button className="hover:text-cyan-200 transition">
                Sell
              </button>
              <button className="hover:text-cyan-200 transition">
                About
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <button className="hover:bg-cyan-700 p-2 rounded-lg transition">
                <ShoppingCart size={20} />
              </button>
              
              {user ? (
                <>
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-2 hover:bg-cyan-700 px-3 py-2 rounded-lg transition"
                  >
                    <img 
                      src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`} 
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <div className="hidden md:block text-left text-sm">
                      <p>{currentUser.name}</p>
                      <p className="text-xs opacity-75">{currentUser.role}</p>
                    </div>
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="hover:bg-cyan-700 p-2 rounded-lg transition"
                    title="Sign Out"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-cyan-600 hover:bg-cyan-50 px-4 py-2 rounded-lg transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                >
                  Sign up
                </button>
              )}
              
              <button className="md:hidden p-2">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

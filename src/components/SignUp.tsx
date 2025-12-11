// src/components/SignUp.tsx
import { useState } from 'react';
import { useAuth } from '../utils/auth/authContext';

type SignUpProps = {
  onBack: () => void;
};

export function SignUp({ onBack }: SignUpProps) {
  const { /* we'll add auth helpers later */ } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call your email/password sign-up logic here
    // e.g. await signUpWithEmail(email, password);
    console.log('Sign up with email:', email);
  };

  const handleGoogleSignUp = async () => {
    // TODO: call Google OAuth sign-up logic
    console.log('Sign up with Google');
  };

  const handleFacebookSignUp = async () => {
    // TODO: call Facebook OAuth sign-up logic
    console.log('Sign up with Facebook');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Create your Agrilink account
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Join the marketplace for farmers, buyers and suppliers across Ghana.
        </p>

        <form onSubmit={handleEmailSignUp} className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700"
          >
            Sign up with email
          </button>
        </form>

        <div className="flex items-center gap-2 mb-4">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="space-y-2 mb-4">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full border border-gray-200 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleFacebookSignUp}
            className="w-full border border-gray-200 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Continue with Facebook
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-xs text-gray-500 hover:text-gray-700"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}

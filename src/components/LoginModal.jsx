import { X, ArrowRight, CheckCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { usePro } from '../utils/pro';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_aFa7sLgFi9bR3IW0pz2B200';

export default function LoginModal({ onClose }) {
  const { isPro, user, signUp, signIn, signOut } = usePro();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Logged-in Pro user view
  if (user && isPro) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-1">You're on Pro!</h2>
          <p className="text-gray-500 text-sm mb-1">{user.email}</p>
          <p className="text-gray-400 text-xs mb-6">All premium features are unlocked.</p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors cursor-pointer mb-3"
          >
            Continue
          </button>
          <button
            onClick={async () => { await signOut(); onClose(); }}
            className="flex items-center justify-center gap-1.5 w-full py-2 text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Logged-in free user view
  if (user && !isPro) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome, {user.email}</h2>
          <p className="text-gray-500 text-sm mb-6">Upgrade to Pro to unlock all features.</p>
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors mb-3"
          >
            Upgrade to Pro — $7.99/mo
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={async () => { await signOut(); onClose(); }}
            className="flex items-center justify-center gap-1.5 w-full py-2 text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError('Please fill in both fields.'); return; }
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUp(email, password);
        setSuccessMessage('Account created! Check your email to confirm, then log in.');
        setMode('login');
      } else {
        await signIn(email, password);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {mode === 'signup' ? 'Create an account' : 'Welcome back'}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {mode === 'signup'
            ? 'Sign up to save invoices and client info.'
            : 'Log in to access your saved invoices.'}
        </p>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
        </div>

        {mode === 'login' ? (
          <div className="space-y-3">
            <button
              onClick={() => { setMode('signup'); setError(''); setSuccessMessage(''); }}
              className="w-full py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Create an Account
            </button>
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Subscribe to Pro — $7.99/mo
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <button
            onClick={() => { setMode('login'); setError(''); setSuccessMessage(''); }}
            className="w-full py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Already have an account? Log In
          </button>
        )}
      </div>
    </div>
  );
}

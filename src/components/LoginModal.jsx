import { X, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { usePro } from '../utils/pro';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_aFa7sLgFi9bR3IW0pz2B200';

export default function LoginModal({ onClose }) {
  const { isPro, activate } = usePro();
  const [email, setEmail] = useState('');
  const [showActivate, setShowActivate] = useState(false);

  if (isPro) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">You're on Pro!</h2>
          <p className="text-gray-500 text-sm mb-6">All premium features are unlocked.</p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-gray-500 text-sm mb-6">
          Already a Pro subscriber? Activate your account below.
        </p>

        {!showActivate ? (
          <div className="space-y-3">
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Subscribe to Pro — $7.99/mo
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div>
            </div>

            <button
              onClick={() => setShowActivate(true)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              I already subscribed
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Enter the email you used to subscribe and we'll activate Pro on this device.
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={() => {
                if (email.trim()) {
                  activate();
                  onClose();
                }
              }}
              className="w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Activate Pro
            </button>
            <button
              onClick={() => setShowActivate(false)}
              className="w-full text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { X, Check, Sparkles } from 'lucide-react';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/4gMcN53SD4yhczL7ntb7y00';

const proFeatures = [
  'No watermark on invoices',
  '6 premium templates (Executive, Bold, Studio)',
  'Save invoices & client details',
  'Invoice history — never lose a record',
  'Custom logo on invoices',
  'Early access to new features',
];

export default function UpgradeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Upgrade to Pro</h2>
          <p className="text-gray-500 mt-2">Unlock premium templates and remove watermarks.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-bold text-gray-900">$7.99</span>
            <span className="text-gray-400">/month</span>
          </div>
          <ul className="space-y-3">
            {proFeatures.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-primary-600 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={STRIPE_PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors text-center text-lg"
        >
          Upgrade Now
        </a>
        <p className="text-xs text-gray-400 text-center mt-3">Cancel anytime. Powered by Stripe.</p>
      </div>
    </div>
  );
}

import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_aFa7sLgFi9bR3IW0pz2B200';

export default function ProBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2.5 flex items-center justify-center gap-3 text-sm relative">
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>
        <strong>Go Pro</strong> — Remove watermarks, unlock all templates, save client info.{' '}
        <a
          href={STRIPE_PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-primary-100 transition-colors"
        >
          Just $7.99/month →
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

// ============================================================
// IMPORTANT: Replace this URL with your actual Stripe Payment Link!
//
// To create one:
// 1. Go to https://dashboard.stripe.com/payment-links
// 2. Click "+ New"
// 3. Set it to "Recurring" → $8/month
// 4. Name it "SwiftBill Pro"
// 5. Copy the link and paste it below
// ============================================================
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_LINK_HERE';

export default function ProBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2.5 flex items-center justify-center gap-3 text-sm relative">
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>
        <strong>Go Pro</strong> — Remove watermarks, unlock all templates, priority support.{' '}
        <a
          href={STRIPE_PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-primary-100 transition-colors"
        >
          Just $8/month →
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

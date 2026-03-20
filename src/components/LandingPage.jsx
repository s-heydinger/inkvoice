import { FileText, Download, Zap, Shield, Palette, Clock, Check, Sparkles, LogIn } from 'lucide-react';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { usePro } from '../utils/pro';

// ============================================================
// IMPORTANT: Replace this URL with your actual Stripe Payment Link!
// ============================================================
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_aFa7sLgFi9bR3IW0pz2B200';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Create a professional invoice in under 60 seconds. No sign-up required.',
  },
  {
    icon: Download,
    title: 'Instant PDF Download',
    desc: 'Download your invoice as a crisp, print-ready PDF with one click.',
  },
  {
    icon: Shield,
    title: '100% Private',
    desc: 'Your data never leaves your browser. No servers, no tracking, no accounts.',
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    desc: 'Choose from professionally designed templates that impress clients.',
  },
  {
    icon: Clock,
    title: 'Save & Reuse',
    desc: 'Save invoices locally and reuse them as templates for recurring clients.',
  },
  {
    icon: FileText,
    title: 'All the Details',
    desc: 'Line items, taxes, discounts, notes — everything you need on one page.',
  },
];

export default function LandingPage({ onGetStarted }) {
  const [showLogin, setShowLogin] = useState(false);
  const { isPro } = usePro();

  return (
    <div className="min-h-screen">
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Inkvoice</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              {isPro ? 'My Account' : 'Log In'}
            </button>
            <button
              onClick={onGetStarted}
              className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Create Invoice — Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          100% Free — No Sign-Up Required
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Professional Invoices
          <br />
          <span className="text-primary-600">in Seconds</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Stop wasting time with complicated invoicing software.
          Inkvoice lets you create beautiful, professional invoices and download them as PDFs — instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer"
          >
            Create Your First Invoice
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          No credit card. No account. Just invoices.
        </p>
      </section>

      {/* Preview mockup */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-200 p-6 sm:p-8">
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">INVOICE</div>
                <div className="text-sm text-gray-400 mt-1">#INV-0001</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">Your Company</div>
                <div className="text-sm text-gray-400">your@email.com</div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-4 text-sm font-medium text-gray-500 mb-3">
                <div className="col-span-2">Description</div>
                <div className="text-right">Qty</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="grid grid-cols-4 text-sm py-2 border-t border-gray-100">
                <div className="col-span-2 text-gray-700">Website Design</div>
                <div className="text-right text-gray-500">1</div>
                <div className="text-right font-medium text-gray-900">$2,500.00</div>
              </div>
              <div className="grid grid-cols-4 text-sm py-2 border-t border-gray-100">
                <div className="col-span-2 text-gray-700">SEO Optimization</div>
                <div className="text-right text-gray-500">1</div>
                <div className="text-right font-medium text-gray-900">$800.00</div>
              </div>
              <div className="grid grid-cols-4 text-sm py-3 border-t-2 border-gray-300 font-semibold mt-2">
                <div className="col-span-3 text-right text-gray-700">Total</div>
                <div className="text-right text-primary-600 text-base">$3,300.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            Built for freelancers, contractors, and small businesses who just need to send an invoice and get paid.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-colors">
                <f.icon className="w-6 h-6 text-primary-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Simple, honest pricing
        </h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
          Start for free. Upgrade when you're ready to look even more professional.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="font-semibold text-gray-900 text-lg">Free</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-400 ml-1">/forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {['Unlimited invoices', 'PDF download', '3 templates', 'Tax & discount calculations', 'Multi-currency'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
          {/* Pro */}
          <div className="bg-white rounded-2xl border-2 border-primary-600 p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Most Popular
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">Pro</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">$7.99</span>
              <span className="text-gray-400 ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {['Everything in Free', 'No watermark on invoices', 'Premium templates', 'Save invoices & client details', 'Custom logo on invoices', 'Early access to new features'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-primary-600 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors text-center"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to get paid faster?
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Join thousands of freelancers who create professional invoices with Inkvoice.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer"
        >
          Create Invoice — It's Free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Inkvoice</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Inkvoice. Free forever for basic invoicing.
          </p>
        </div>
      </footer>
    </div>
  );
}

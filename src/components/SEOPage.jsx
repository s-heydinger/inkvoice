import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, LogIn } from 'lucide-react';
import LoginModal from './LoginModal';
import { usePro } from '../utils/pro';

export default function SEOPage({ title, subtitle, description, keywords, slug }) {
  const [showLogin, setShowLogin] = useState(false);
  const { isPro } = usePro();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${title} | Inkvoice`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    const kwMeta = document.querySelector('meta[name="keywords"]');
    if (kwMeta) kwMeta.setAttribute('content', keywords);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://inkvoice.us/${slug}`);
  }, [title, description, keywords, slug]);

  return (
    <div className="min-h-screen">
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Inkvoice</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              {isPro ? 'My Account' : 'Log In'}
            </button>
            <Link
              to="/create"
              className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
            >
              Create Invoice — Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-primary-600 font-medium mb-4">{subtitle}</p>
        )}
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/create"
            className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
          >
            Create Your Invoice Now
          </Link>
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

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to create your invoice?
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Join thousands of professionals who use Inkvoice to create invoices in seconds.
        </p>
        <Link
          to="/create"
          className="inline-block bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
        >
          Create Invoice — It's Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Inkvoice</span>
          </Link>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Inkvoice. Free forever for basic invoicing.
          </p>
        </div>
      </footer>
    </div>
  );
}

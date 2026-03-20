import { FileText, Download, Zap, Shield, Palette, Clock } from 'lucide-react';

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
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">SwiftBill</span>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-primary-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Create Invoice — Free
          </button>
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
          SwiftBill lets you create beautiful, professional invoices and download them as PDFs — instantly.
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

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to get paid faster?
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Join thousands of freelancers who create professional invoices with SwiftBill.
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
            <span className="font-semibold text-gray-900">SwiftBill</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SwiftBill. Free forever for basic invoicing.
          </p>
        </div>
      </footer>
    </div>
  );
}

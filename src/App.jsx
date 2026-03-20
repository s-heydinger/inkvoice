import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import InvoiceBuilder from './components/InvoiceBuilder';
import SEOPage from './components/SEOPage';
import { ProProvider } from './utils/pro';

function LandingPageWrapper() {
  const navigate = useNavigate();
  return <LandingPage onGetStarted={() => navigate('/create')} />;
}

function InvoiceBuilderWrapper() {
  const navigate = useNavigate();
  return <InvoiceBuilder onBack={() => navigate('/')} />;
}

const seoPages = [
  {
    slug: 'freelance-invoice-generator',
    title: 'Free Freelance Invoice Generator',
    subtitle: 'Built for freelancers who want to get paid faster',
    description:
      'Create polished, professional invoices for your freelance work in seconds. Add line items, taxes, and discounts — then download a print-ready PDF. No sign-up, no fees, no hassle.',
    keywords:
      'freelance invoice generator, free freelance invoice, freelancer invoice template, freelance billing, create freelance invoice online',
  },
  {
    slug: 'contractor-invoice-template',
    title: 'Free Contractor Invoice Template',
    subtitle: 'Professional invoicing for independent contractors',
    description:
      'Need a contractor invoice fast? Inkvoice gives you a clean, professional invoice template you can customize and download as a PDF in under 60 seconds. Perfect for independent contractors and 1099 workers.',
    keywords:
      'contractor invoice template, free contractor invoice, independent contractor invoice, 1099 invoice template, contractor billing template',
  },
  {
    slug: 'small-business-invoice-maker',
    title: 'Free Small Business Invoice Maker',
    subtitle: 'Simple invoicing for small business owners',
    description:
      'Stop overpaying for invoicing software. Inkvoice is a free, no-signup invoice maker built for small businesses. Create beautiful invoices with your business details, line items, taxes, and multi-currency support — then download as PDF.',
    keywords:
      'small business invoice maker, free invoice maker, small business billing, invoice generator for small business, simple invoice creator',
  },
  {
    slug: 'invoice-template-pdf',
    title: 'Free Invoice Template PDF Download',
    subtitle: 'Download a professional invoice PDF in seconds',
    description:
      'Looking for a free invoice template you can download as a PDF? Inkvoice lets you fill in your details, customize the layout, and download a crisp, print-ready PDF invoice instantly. No sign-up required.',
    keywords:
      'invoice template PDF, free invoice PDF download, printable invoice template, PDF invoice generator, downloadable invoice template',
  },
];

function App() {
  return (
    <ProProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/create" element={<InvoiceBuilderWrapper />} />
          {seoPages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={
                <SEOPage
                  title={page.title}
                  subtitle={page.subtitle}
                  description={page.description}
                  keywords={page.keywords}
                  slug={page.slug}
                />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ProProvider>
  );
}

export default App;

import { useState, useCallback } from 'react';
import { ArrowLeft, Download, Save, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import SavedInvoices from './SavedInvoices';
import ProBanner from './ProBanner';
import { createBlankInvoice, saveInvoice } from '../utils/storage';
import { generatePDF } from '../utils/pdf';

export default function InvoiceBuilder({ onBack }) {
  const [invoice, setInvoice] = useState(createBlankInvoice);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = useCallback(() => {
    setSaving(true);
    saveInvoice(invoice);
    setSaveMessage('Saved!');
    setTimeout(() => {
      setSaving(false);
      setSaveMessage('');
      setRefreshKey(k => k + 1);
    }, 1500);
  }, [invoice]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      await generatePDF('invoice-preview', `${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
    setDownloading(false);
  }, [invoice.invoiceNumber]);

  const handleLoad = useCallback((inv) => {
    setInvoice(inv);
    setShowSaved(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProBanner />
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className="text-sm text-green-600 font-medium mr-2">{saveMessage}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {downloading ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Left Panel — Form */}
          <div className="w-full lg:w-[420px] shrink-0">
            {/* New / Saved toggle */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setInvoice(createBlankInvoice())}
                className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
              >
                {showSaved ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                Saved Invoices
              </button>
            </div>

            {showSaved && (
              <div className="mb-6 bg-white rounded-xl border border-gray-200 p-4">
                <SavedInvoices
                  key={refreshKey}
                  onLoad={handleLoad}
                  onRefresh={() => setRefreshKey(k => k + 1)}
                />
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <InvoiceForm invoice={invoice} onChange={setInvoice} />
            </div>
          </div>

          {/* Right Panel — Preview */}
          <div className="hidden lg:block flex-1 min-w-0">
            <div className="sticky top-20">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Live Preview</p>
              <div className="bg-gray-200/50 rounded-xl p-4">
                <InvoicePreview invoice={invoice} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile preview */}
        <div className="lg:hidden mt-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Preview</p>
          <div className="bg-gray-200/50 rounded-xl p-4 overflow-x-auto">
            <div style={{ minWidth: '600px' }}>
              <InvoicePreview invoice={invoice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

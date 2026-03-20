import { formatCurrency, calculateTotals } from '../utils/storage';

function ModernTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="p-8 bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
          <p className="text-sm text-gray-400 mt-1">{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            <p><span className="text-gray-400">Date: </span>{invoice.date}</p>
            <p><span className="text-gray-400">Due: </span>{invoice.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
        <div>
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">From</p>
          <p className="font-semibold text-gray-900">{invoice.from.name || 'Your Company'}</p>
          {invoice.from.email && <p className="text-sm text-gray-500">{invoice.from.email}</p>}
          {invoice.from.address && <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.from.address}</p>}
          {invoice.from.phone && <p className="text-sm text-gray-500">{invoice.from.phone}</p>}
        </div>
        <div>
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">Bill To</p>
          <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
          {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
          {invoice.to.address && <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.to.address}</p>}
          {invoice.to.phone && <p className="text-sm text-gray-500">{invoice.to.phone}</p>}
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Description</th>
            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 w-20">Qty</th>
            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 w-28">Rate</th>
            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={item.id || i} className="border-b border-gray-50">
              <td className="py-3 text-sm text-gray-700">{item.description || '—'}</td>
              <td className="py-3 text-sm text-gray-500 text-right">{item.quantity}</td>
              <td className="py-3 text-sm text-gray-500 text-right">{formatCurrency(item.rate, currency)}</td>
              <td className="py-3 text-sm font-medium text-gray-900 text-right">
                {formatCurrency((item.quantity || 0) * (item.rate || 0), currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-700">{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {invoice.discountRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount ({invoice.discountRate}%)</span>
              <span className="text-red-500">-{formatCurrency(totals.discount, currency)}</span>
            </div>
          )}
          {invoice.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
              <span className="text-gray-700">{formatCurrency(totals.tax, currency)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-primary-600">
            <span className="text-gray-900">Total</span>
            <span className="text-primary-600">{formatCurrency(totals.total, currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</p>
          <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      {/* Watermark for free tier */}
      <div className="mt-8 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-300">Created with Inkvoice — inkvoice.us</p>
      </div>
    </div>
  );
}

function ClassicTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="p-8 bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header with blue bar */}
      <div className="bg-primary-700 text-white p-6 rounded-t-lg -mx-8 -mt-8 mb-8 px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-primary-200 text-sm mt-1">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold text-lg">{invoice.from.name || 'Your Company'}</p>
            {invoice.from.email && <p className="text-primary-200">{invoice.from.email}</p>}
            {invoice.from.phone && <p className="text-primary-200">{invoice.from.phone}</p>}
          </div>
        </div>
      </div>

      {/* Meta + Bill To */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Bill To</p>
          <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
          {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
          {invoice.to.address && <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.to.address}</p>}
          {invoice.to.phone && <p className="text-sm text-gray-500">{invoice.to.phone}</p>}
        </div>
        <div className="text-right">
          <div className="inline-block text-left">
            <div className="flex gap-4 text-sm mb-1">
              <span className="text-gray-400 w-16">Date:</span>
              <span className="text-gray-700">{invoice.date}</span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-gray-400 w-16">Due:</span>
              <span className="text-gray-700">{invoice.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold text-gray-600 uppercase py-3 px-4">Description</th>
            <th className="text-right text-xs font-semibold text-gray-600 uppercase py-3 px-4 w-20">Qty</th>
            <th className="text-right text-xs font-semibold text-gray-600 uppercase py-3 px-4 w-28">Rate</th>
            <th className="text-right text-xs font-semibold text-gray-600 uppercase py-3 px-4 w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={item.id || i} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-700">{item.description || '—'}</td>
              <td className="py-3 px-4 text-sm text-gray-500 text-right">{item.quantity}</td>
              <td className="py-3 px-4 text-sm text-gray-500 text-right">{formatCurrency(item.rate, currency)}</td>
              <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                {formatCurrency((item.quantity || 0) * (item.rate || 0), currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-700">{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {invoice.discountRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount ({invoice.discountRate}%)</span>
              <span className="text-red-500">-{formatCurrency(totals.discount, currency)}</span>
            </div>
          )}
          {invoice.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
              <span className="text-gray-700">{formatCurrency(totals.tax, currency)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold pt-2 border-t-2 border-primary-700 text-lg">
            <span>Total</span>
            <span className="text-primary-700">{formatCurrency(totals.total, currency)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Notes</p>
          <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      <div className="mt-8 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-300">Created with Inkvoice — inkvoice.us</p>
      </div>
    </div>
  );
}

function MinimalTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="p-8 bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="mb-10">
        <h1 className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em]">Invoice</h1>
        <p className="text-xs text-gray-300 mt-1">{invoice.invoiceNumber} · {invoice.date}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <p className="font-medium text-gray-900 text-sm">{invoice.from.name || 'Your Company'}</p>
          {invoice.from.email && <p className="text-xs text-gray-400 mt-0.5">{invoice.from.email}</p>}
          {invoice.from.address && <p className="text-xs text-gray-400 whitespace-pre-line">{invoice.from.address}</p>}
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900 text-sm">{invoice.to.name || 'Client'}</p>
          {invoice.to.email && <p className="text-xs text-gray-400 mt-0.5">{invoice.to.email}</p>}
          {invoice.to.address && <p className="text-xs text-gray-400 whitespace-pre-line">{invoice.to.address}</p>}
        </div>
      </div>

      <div className="mb-10">
        {invoice.items.map((item, i) => (
          <div key={item.id || i} className="flex justify-between py-3 border-b border-gray-100 text-sm">
            <div>
              <span className="text-gray-700">{item.description || '—'}</span>
              <span className="text-gray-300 ml-2">×{item.quantity}</span>
            </div>
            <span className="text-gray-900 font-medium">
              {formatCurrency((item.quantity || 0) * (item.rate || 0), currency)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="w-48 space-y-1.5">
          {(invoice.discountRate > 0 || invoice.taxRate > 0) && (
            <div className="flex justify-between text-xs text-gray-400">
              <span>Subtotal</span>
              <span>{formatCurrency(totals.subtotal, currency)}</span>
            </div>
          )}
          {invoice.discountRate > 0 && (
            <div className="flex justify-between text-xs text-gray-400">
              <span>Discount</span>
              <span>-{formatCurrency(totals.discount, currency)}</span>
            </div>
          )}
          {invoice.taxRate > 0 && (
            <div className="flex justify-between text-xs text-gray-400">
              <span>Tax</span>
              <span>{formatCurrency(totals.tax, currency)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-gray-900">
            <span className="text-sm font-medium text-gray-900">Total</span>
            <span className="text-sm font-bold text-gray-900">{formatCurrency(totals.total, currency)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-10">
          <p className="text-xs text-gray-300 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-xs text-gray-200">inkvoice.us</p>
      </div>

      <div className="mt-4 text-right">
        <p className="text-xs text-gray-300">Due: {invoice.dueDate}</p>
      </div>
    </div>
  );
}

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
};

export default function InvoicePreview({ invoice }) {
  const totals = calculateTotals(invoice);
  const Template = templates[invoice.template] || ModernTemplate;

  return (
    <div
      id="invoice-preview"
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ width: '100%', minHeight: '700px' }}
    >
      <Template invoice={invoice} totals={totals} />
    </div>
  );
}

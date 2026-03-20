import { formatCurrency, calculateTotals, formatAddress } from '../utils/storage';

function Watermark() {
  return (
    <div className="mt-8 pt-5 border-t border-primary-100 text-center bg-primary-50/50 -mx-8 -mb-8 px-8 pb-5 rounded-b-lg">
      <p className="text-sm text-primary-400 font-medium tracking-wide">
        Created with <span className="font-semibold text-primary-500">Inkvoice</span>
      </p>
      <p className="text-xs text-primary-300 mt-0.5">Free invoicing at inkvoice.us</p>
    </div>
  );
}

function AddressBlock({ party }) {
  const addr = formatAddress(party);
  if (!addr) return null;
  return <p className="text-sm text-gray-500 whitespace-pre-line">{addr}</p>;
}

function ItemsTable({ invoice, currency, headerBg = 'bg-transparent', headerText = 'text-gray-500' }) {
  return (
    <table className="w-full mb-8">
      <thead>
        <tr className={`border-b-2 border-gray-200 ${headerBg}`}>
          <th className={`text-left text-xs font-semibold uppercase tracking-wider pb-3 pt-3 px-2 ${headerText}`}>Description</th>
          <th className={`text-right text-xs font-semibold uppercase tracking-wider pb-3 pt-3 px-2 w-20 ${headerText}`}>Qty</th>
          <th className={`text-right text-xs font-semibold uppercase tracking-wider pb-3 pt-3 px-2 w-28 ${headerText}`}>Rate</th>
          <th className={`text-right text-xs font-semibold uppercase tracking-wider pb-3 pt-3 px-2 w-28 ${headerText}`}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {invoice.items.map((item, i) => (
          <tr key={item.id || i} className="border-b border-gray-50">
            <td className="py-3 px-2 text-sm text-gray-700">{item.description || '—'}</td>
            <td className="py-3 px-2 text-sm text-gray-500 text-right">{item.quantity}</td>
            <td className="py-3 px-2 text-sm text-gray-500 text-right">{formatCurrency(item.rate, currency)}</td>
            <td className="py-3 px-2 text-sm font-medium text-gray-900 text-right">
              {formatCurrency((item.quantity || 0) * (item.rate || 0), currency)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TotalsBlock({ invoice, totals, currency, accentColor = 'text-primary-600', borderColor = 'border-primary-600' }) {
  return (
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
        <div className={`flex justify-between text-lg font-bold pt-2 border-t-2 ${borderColor}`}>
          <span className="text-gray-900">Total</span>
          <span className={accentColor}>{formatCurrency(totals.total, currency)}</span>
        </div>
      </div>
    </div>
  );
}

function Notes({ notes }) {
  if (!notes) return null;
  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</p>
      <p className="text-sm text-gray-500 whitespace-pre-line">{notes}</p>
    </div>
  );
}

// ─── FREE TEMPLATES ─────────────────────────────────────────

function ModernTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="p-8 bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
          <p className="text-sm text-gray-400 mt-1">{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p><span className="text-gray-400">Date: </span>{invoice.date}</p>
          <p><span className="text-gray-400">Due: </span>{invoice.dueDate}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
        <div>
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">From</p>
          <p className="font-semibold text-gray-900">{invoice.from.name || 'Your Company'}</p>
          {invoice.from.email && <p className="text-sm text-gray-500">{invoice.from.email}</p>}
          <AddressBlock party={invoice.from} />
          {invoice.from.phone && <p className="text-sm text-gray-500">{invoice.from.phone}</p>}
        </div>
        <div>
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">Bill To</p>
          <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
          {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
          <AddressBlock party={invoice.to} />
          {invoice.to.phone && <p className="text-sm text-gray-500">{invoice.to.phone}</p>}
        </div>
      </div>
      <ItemsTable invoice={invoice} currency={currency} />
      <TotalsBlock invoice={invoice} totals={totals} currency={currency} />
      <Notes notes={invoice.notes} />
      <Watermark />
    </div>
  );
}

function ClassicTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="p-8 bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
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
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Bill To</p>
          <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
          {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
          <AddressBlock party={invoice.to} />
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
      <ItemsTable invoice={invoice} currency={currency} headerBg="bg-gray-50" headerText="text-gray-600" />
      <TotalsBlock invoice={invoice} totals={totals} currency={currency} accentColor="text-primary-700" borderColor="border-primary-700" />
      <Notes notes={invoice.notes} />
      <Watermark />
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
          <AddressBlock party={invoice.from} />
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-900 text-sm">{invoice.to.name || 'Client'}</p>
          {invoice.to.email && <p className="text-xs text-gray-400 mt-0.5">{invoice.to.email}</p>}
          <AddressBlock party={invoice.to} />
        </div>
      </div>
      <div className="mb-10">
        {invoice.items.map((item, i) => (
          <div key={item.id || i} className="flex justify-between py-3 border-b border-gray-100 text-sm">
            <div>
              <span className="text-gray-700">{item.description || '—'}</span>
              <span className="text-gray-300 ml-2">x{item.quantity}</span>
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
      <Watermark />
      <div className="mt-4 text-right">
        <p className="text-xs text-gray-300">Due: {invoice.dueDate}</p>
      </div>
    </div>
  );
}

// ─── PREMIUM TEMPLATES ──────────────────────────────────────

function ExecutiveTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Dark sidebar header */}
      <div className="flex">
        <div className="w-1/3 bg-gray-900 p-8 text-white min-h-[180px]">
          <h1 className="text-xl font-bold tracking-wider mb-4">INVOICE</h1>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">From</p>
          <p className="font-semibold text-sm">{invoice.from.name || 'Your Company'}</p>
          {invoice.from.email && <p className="text-gray-400 text-xs mt-1">{invoice.from.email}</p>}
          <AddressBlock party={invoice.from} />
          {invoice.from.phone && <p className="text-gray-400 text-xs">{invoice.from.phone}</p>}
        </div>
        <div className="w-2/3 p-8">
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
              <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
              {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
              <AddressBlock party={invoice.to} />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{invoice.invoiceNumber}</p>
              <p className="text-sm text-gray-600">{invoice.date}</p>
              <p className="text-xs text-gray-400 mt-2">Due: {invoice.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Items */}
      <div className="px-8 pb-8">
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="text-left text-xs font-bold text-gray-900 uppercase tracking-wider pb-3">Description</th>
              <th className="text-right text-xs font-bold text-gray-900 uppercase tracking-wider pb-3 w-20">Qty</th>
              <th className="text-right text-xs font-bold text-gray-900 uppercase tracking-wider pb-3 w-28">Rate</th>
              <th className="text-right text-xs font-bold text-gray-900 uppercase tracking-wider pb-3 w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={item.id || i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-3 px-2 text-sm text-gray-700">{item.description || '—'}</td>
                <td className="py-3 px-2 text-sm text-gray-500 text-right">{item.quantity}</td>
                <td className="py-3 px-2 text-sm text-gray-500 text-right">{formatCurrency(item.rate, currency)}</td>
                <td className="py-3 px-2 text-sm font-medium text-gray-900 text-right">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="w-64 bg-gray-900 text-white rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span>{formatCurrency(totals.subtotal, currency)}</span>
            </div>
            {invoice.discountRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Discount</span>
                <span className="text-red-400">-{formatCurrency(totals.discount, currency)}</span>
              </div>
            )}
            {invoice.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span>{formatCurrency(totals.tax, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-700">
              <span>Total</span>
              <span>{formatCurrency(totals.total, currency)}</span>
            </div>
          </div>
        </div>
        <Notes notes={invoice.notes} />
        <Watermark />
      </div>
    </div>
  );
}

function BoldTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Gradient header */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black tracking-tight">INVOICE</h1>
            <p className="text-blue-200 text-sm mt-1">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">{invoice.from.name || 'Your Company'}</p>
            {invoice.from.email && <p className="text-blue-200 text-sm">{invoice.from.email}</p>}
            {invoice.from.phone && <p className="text-blue-200 text-sm">{invoice.from.phone}</p>}
            <AddressBlock party={invoice.from} />
          </div>
        </div>
      </div>
      <div className="p-8">
        {/* Meta bar */}
        <div className="flex gap-6 mb-8 -mt-4 relative z-10">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
            <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
            {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
            <AddressBlock party={invoice.to} />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
            <p className="font-semibold text-gray-900">{invoice.date}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 mt-3">Due</p>
            <p className="font-semibold text-gray-900">{invoice.dueDate}</p>
          </div>
        </div>
        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-violet-50">
              <th className="text-left text-xs font-bold text-blue-900 uppercase tracking-wider py-3 px-4 rounded-l-lg">Description</th>
              <th className="text-right text-xs font-bold text-blue-900 uppercase tracking-wider py-3 px-4 w-20">Qty</th>
              <th className="text-right text-xs font-bold text-blue-900 uppercase tracking-wider py-3 px-4 w-28">Rate</th>
              <th className="text-right text-xs font-bold text-blue-900 uppercase tracking-wider py-3 px-4 w-28 rounded-r-lg">Amount</th>
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
        <TotalsBlock invoice={invoice} totals={totals} currency={currency} accentColor="text-violet-600" borderColor="border-violet-600" />
        <Notes notes={invoice.notes} />
        <Watermark />
      </div>
    </div>
  );
}

function StudioTemplate({ invoice, totals }) {
  const { currency } = invoice;
  return (
    <div className="p-8 bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Accent bar at top */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 -mx-8 -mt-8 mb-8 rounded-t-lg" />
      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="font-bold text-gray-900 text-lg">{invoice.from.name || 'Your Company'}</p>
          {invoice.from.email && <p className="text-sm text-gray-500">{invoice.from.email}</p>}
          <AddressBlock party={invoice.from} />
          {invoice.from.phone && <p className="text-sm text-gray-500">{invoice.from.phone}</p>}
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-black text-gray-900">INVOICE</h1>
          <p className="text-sm text-orange-500 font-semibold mt-1">{invoice.invoiceNumber}</p>
        </div>
      </div>
      {/* Dates + Client in colored cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">Issue Date</p>
          <p className="text-sm font-semibold text-gray-900">{invoice.date}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider mb-1">Due Date</p>
          <p className="text-sm font-semibold text-gray-900">{invoice.dueDate}</p>
        </div>
        <div className="bg-rose-50 rounded-lg p-4">
          <p className="text-xs text-rose-600 font-semibold uppercase tracking-wider mb-1">Amount Due</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(totals.total, currency)}</p>
        </div>
      </div>
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
        <p className="font-semibold text-gray-900">{invoice.to.name || 'Client Name'}</p>
        {invoice.to.email && <p className="text-sm text-gray-500">{invoice.to.email}</p>}
        <AddressBlock party={invoice.to} />
      </div>
      {/* Items */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-orange-300">
            <th className="text-left text-xs font-bold text-orange-600 uppercase tracking-wider pb-3">Description</th>
            <th className="text-right text-xs font-bold text-orange-600 uppercase tracking-wider pb-3 w-20">Qty</th>
            <th className="text-right text-xs font-bold text-orange-600 uppercase tracking-wider pb-3 w-28">Rate</th>
            <th className="text-right text-xs font-bold text-orange-600 uppercase tracking-wider pb-3 w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={item.id || i} className="border-b border-gray-100">
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
      <TotalsBlock invoice={invoice} totals={totals} currency={currency} accentColor="text-orange-600" borderColor="border-orange-500" />
      <Notes notes={invoice.notes} />
      <Watermark />
    </div>
  );
}

// ─── TEMPLATE REGISTRY ──────────────────────────────────────

export const TEMPLATES = {
  modern:    { name: 'Modern',    component: ModernTemplate,    pro: false },
  classic:   { name: 'Classic',   component: ClassicTemplate,   pro: false },
  minimal:   { name: 'Minimal',   component: MinimalTemplate,   pro: false },
  executive: { name: 'Executive', component: ExecutiveTemplate, pro: true },
  bold:      { name: 'Bold',      component: BoldTemplate,      pro: true },
  studio:    { name: 'Studio',    component: StudioTemplate,    pro: true },
};

export default function InvoicePreview({ invoice }) {
  const totals = calculateTotals(invoice);
  const templateEntry = TEMPLATES[invoice.template] || TEMPLATES.modern;
  const Template = templateEntry.component;

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

import { Plus, Trash2 } from 'lucide-react';

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'BRL', 'MXN'];

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        {...props}
      />
    </div>
  );
}

function PartyFields({ label, party, onChange }) {
  const update = (field, value) => onChange({ ...party, [field]: value });
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{label}</h3>
      <div className="space-y-2">
        <Field label="Name / Company" value={party.name} onChange={e => update('name', e.target.value)} />
        <Field label="Email" type="email" value={party.email} onChange={e => update('email', e.target.value)} />
        <Field label="Address" value={party.address} onChange={e => update('address', e.target.value)} />
        <Field label="Phone" value={party.phone} onChange={e => update('phone', e.target.value)} />
      </div>
    </div>
  );
}

export default function InvoiceForm({ invoice, onChange }) {
  const update = (field, value) => onChange({ ...invoice, [field]: value });

  const updateItem = (id, field, value) => {
    const items = invoice.items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    update('items', items);
  };

  const addItem = () => {
    update('items', [
      ...invoice.items,
      { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (invoice.items.length === 1) return;
    update('items', invoice.items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={e => update('invoiceNumber', e.target.value)}
        />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Currency</label>
          <select
            value={invoice.currency}
            onChange={e => update('currency', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Invoice Date"
          type="date"
          value={invoice.date}
          onChange={e => update('date', e.target.value)}
        />
        <Field
          label="Due Date"
          type="date"
          value={invoice.dueDate}
          onChange={e => update('dueDate', e.target.value)}
        />
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PartyFields label="From (Your Details)" party={invoice.from} onChange={v => update('from', v)} />
        <PartyFields label="Bill To (Client)" party={invoice.to} onChange={v => update('to', v)} />
      </div>

      {/* Line Items */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Line Items</h3>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
            <div className="col-span-5">Description</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-3">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {invoice.items.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                className="col-span-5 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Description"
                value={item.description}
                onChange={e => updateItem(item.id, 'description', e.target.value)}
              />
              <input
                className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                type="number"
                min="0"
                value={item.quantity}
                onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
              />
              <input
                className="col-span-3 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                type="number"
                min="0"
                step="0.01"
                value={item.rate}
                onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
              />
              <div className="col-span-2 flex items-center justify-end gap-1">
                <span className="text-sm font-medium text-gray-700">
                  {((item.quantity || 0) * (item.rate || 0)).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-3 flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Line Item
        </button>
      </div>

      {/* Tax & Discount */}
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Tax Rate (%)"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={invoice.taxRate}
          onChange={e => update('taxRate', parseFloat(e.target.value) || 0)}
        />
        <Field
          label="Discount (%)"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={invoice.discountRate}
          onChange={e => update('discountRate', parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Notes / Payment Terms</label>
        <textarea
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-20 resize-none"
          placeholder="Payment is due within 30 days..."
          value={invoice.notes}
          onChange={e => update('notes', e.target.value)}
        />
      </div>

      {/* Template selector */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Template</label>
        <div className="flex gap-2">
          {['modern', 'classic', 'minimal'].map(t => (
            <button
              key={t}
              onClick={() => update('template', t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
                invoice.template === t
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

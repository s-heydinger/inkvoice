import { Plus, Trash2, Lock, Save, ChevronDown, User, Users } from 'lucide-react';
import { useState } from 'react';
import { TEMPLATES } from './InvoicePreview';
import { getSavedProfiles, saveProfile, deleteProfile, getSavedClients, saveClient, deleteClient, formatCurrency } from '../utils/storage';

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

function HalfField({ label, ...props }) {
  return (
    <div className="flex-1">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
        {...props}
      />
    </div>
  );
}

function SavedDropdown({ items, onSelect, onDelete, onSave, currentData, label, icon: Icon }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex gap-1">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
        >
          <Icon className="w-3 h-3" />
          {label}
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <button
          onClick={() => {
            if (!currentData.name) return;
            onSave({ ...currentData, id: currentData.id || crypto.randomUUID() });
          }}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-600 font-medium cursor-pointer"
          title="Save current info"
        >
          <Save className="w-3 h-3" />
        </button>
      </div>
      {open && (
        <div className="absolute top-6 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[200px] max-h-48 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-xs text-gray-400 px-3 py-2">No saved entries yet. Fill in the fields and click the save icon.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50 group">
                <button
                  onClick={() => { onSelect(item); setOpen(false); }}
                  className="text-sm text-gray-700 hover:text-primary-600 text-left flex-1 cursor-pointer truncate"
                >
                  {item.name || 'Unnamed'}
                  {item.email && <span className="text-gray-400 ml-1 text-xs">{item.email}</span>}
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer ml-2"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function PartyFields({ label, party, onChange, savedItems, onSaveItem, onDeleteItem, onSelectItem, dropdownLabel, dropdownIcon, isPro, onProClick }) {
  const update = (field, value) => onChange({ ...party, [field]: value });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
        {isPro ? (
          <button
            onClick={onProClick}
            className="flex items-center gap-1 text-xs text-amber-600 font-medium cursor-pointer"
          >
            <Lock className="w-3 h-3" /> Save / Load
          </button>
        ) : (
          <SavedDropdown
            items={savedItems}
            onSelect={onSelectItem}
            onDelete={onDeleteItem}
            onSave={onSaveItem}
            currentData={party}
            label={dropdownLabel}
            icon={dropdownIcon}
          />
        )}
      </div>
      <div className="space-y-2">
        <Field label="Name / Company" value={party.name} onChange={e => update('name', e.target.value)} />
        <Field label="Email" type="email" value={party.email} onChange={e => update('email', e.target.value)} />
        <Field label="Address Line 1" value={party.address1 || ''} onChange={e => update('address1', e.target.value)} placeholder="123 Main St" />
        <Field label="Address Line 2" value={party.address2 || ''} onChange={e => update('address2', e.target.value)} placeholder="Suite 100" />
        <div className="flex gap-2">
          <HalfField label="City" value={party.city || ''} onChange={e => update('city', e.target.value)} />
          <HalfField label="State" value={party.state || ''} onChange={e => update('state', e.target.value)} />
        </div>
        <div className="flex gap-2">
          <HalfField label="ZIP Code" value={party.zip || ''} onChange={e => update('zip', e.target.value)} />
          <HalfField label="Phone" value={party.phone} onChange={e => update('phone', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default function InvoiceForm({ invoice, onChange, onProClick, isPro = false }) {
  const update = (field, value) => onChange({ ...invoice, [field]: value });
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate(n => n + 1);

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

  const saveLoadIsPro = !isPro;

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
        <PartyFields
          label="From (Your Details)"
          party={invoice.from}
          onChange={v => update('from', v)}
          savedItems={getSavedProfiles()}
          onSaveItem={(p) => { saveProfile(p); refresh(); }}
          onDeleteItem={(id) => { deleteProfile(id); refresh(); }}
          onSelectItem={(p) => update('from', { ...p })}
          dropdownLabel="Saved"
          dropdownIcon={User}
          isPro={saveLoadIsPro}
          onProClick={onProClick}
        />
        <PartyFields
          label="Bill To (Client)"
          party={invoice.to}
          onChange={v => update('to', v)}
          savedItems={getSavedClients()}
          onSaveItem={(c) => { saveClient(c); refresh(); }}
          onDeleteItem={(id) => { deleteClient(id); refresh(); }}
          onSelectItem={(c) => update('to', { ...c })}
          dropdownLabel="Clients"
          dropdownIcon={Users}
          isPro={saveLoadIsPro}
          onProClick={onProClick}
        />
      </div>

      {/* Line Items */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Line Items</h3>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Qty</div>
            <div className="col-span-3">Rate</div>
            <div className="col-span-4 text-right">Amount</div>
          </div>

          {invoice.items.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                className="col-span-4 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-0"
                placeholder="Description"
                value={item.description}
                onChange={e => updateItem(item.id, 'description', e.target.value)}
              />
              <input
                className="col-span-1 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-0 text-center"
                type="number"
                min="0"
                value={item.quantity}
                onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
              />
              <input
                className="col-span-3 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-0"
                type="number"
                min="0"
                step="0.01"
                value={item.rate}
                onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
              />
              <div className="col-span-4 flex items-center justify-end gap-1 min-w-0">
                <span className="text-sm font-medium text-gray-700 truncate">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), invoice.currency)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer shrink-0"
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
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEMPLATES).map(([key, tmpl]) => {
            const isProTemplate = tmpl.pro && !isPro;
            return (
              <button
                key={key}
                onClick={() => update('template', key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  invoice.template === key
                    ? isProTemplate
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                      : 'bg-primary-600 text-white'
                    : isProTemplate
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 hover:border-amber-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tmpl.name}
                {isProTemplate && <Lock className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

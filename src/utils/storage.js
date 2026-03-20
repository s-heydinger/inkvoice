const STORAGE_KEY = 'inkvoice_invoices';
const SETTINGS_KEY = 'inkvoice_settings';
const COUNTER_KEY = 'inkvoice_counter';

export function saveInvoice(invoice) {
  const invoices = getInvoices();
  const existing = invoices.findIndex(i => i.id === invoice.id);
  if (existing >= 0) {
    invoices[existing] = invoice;
  } else {
    invoices.push(invoice);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

export function getInvoices() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function deleteInvoice(id) {
  const invoices = getInvoices().filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

export function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getNextInvoiceNumber() {
  const count = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10) + 1;
  localStorage.setItem(COUNTER_KEY, String(count));
  return `INV-${String(count).padStart(4, '0')}`;
}

export function createBlankInvoice() {
  return {
    id: crypto.randomUUID(),
    invoiceNumber: getNextInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    from: { name: '', email: '', address: '', phone: '' },
    to: { name: '', email: '', address: '', phone: '' },
    items: [{ id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }],
    notes: '',
    taxRate: 0,
    discountRate: 0,
    currency: 'USD',
    template: 'modern',
  };
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculateTotals(invoice) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.rate || 0),
    0
  );
  const discount = subtotal * ((invoice.discountRate || 0) / 100);
  const taxable = subtotal - discount;
  const tax = taxable * ((invoice.taxRate || 0) / 100);
  const total = taxable + tax;
  return { subtotal, discount, tax, total };
}

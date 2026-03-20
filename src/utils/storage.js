const STORAGE_KEY = 'inkvoice_invoices';
const SETTINGS_KEY = 'inkvoice_settings';
const COUNTER_KEY = 'inkvoice_counter';
const PROFILES_KEY = 'inkvoice_profiles';
const CLIENTS_KEY = 'inkvoice_clients';

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

// ─── Saved Profiles (Your Info) ─────────────────────────────

export function getSavedProfiles() {
  try {
    return JSON.parse(localStorage.getItem(PROFILES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveProfile(profile) {
  const profiles = getSavedProfiles();
  const existing = profiles.findIndex(p => p.id === profile.id);
  if (existing >= 0) {
    profiles[existing] = profile;
  } else {
    profiles.push({ ...profile, id: profile.id || crypto.randomUUID() });
  }
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function deleteProfile(id) {
  const profiles = getSavedProfiles().filter(p => p.id !== id);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

// ─── Saved Clients ──────────────────────────────────────────

export function getSavedClients() {
  try {
    return JSON.parse(localStorage.getItem(CLIENTS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveClient(client) {
  const clients = getSavedClients();
  const existing = clients.findIndex(c => c.id === client.id);
  if (existing >= 0) {
    clients[existing] = client;
  } else {
    clients.push({ ...client, id: client.id || crypto.randomUUID() });
  }
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

export function deleteClient(id) {
  const clients = getSavedClients().filter(c => c.id !== id);
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

// ─── Invoice helpers ────────────────────────────────────────

export function getNextInvoiceNumber() {
  const count = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10) + 1;
  localStorage.setItem(COUNTER_KEY, String(count));
  return `INV-${String(count).padStart(4, '0')}`;
}

export function emptyParty() {
  return { name: '', email: '', address1: '', address2: '', city: '', state: '', zip: '', phone: '' };
}

export function formatAddress(party) {
  const parts = [party.address1, party.address2, [party.city, party.state].filter(Boolean).join(', ')].filter(Boolean);
  if (party.zip) {
    const last = parts.length - 1;
    parts[last] = parts[last] ? `${parts[last]} ${party.zip}` : party.zip;
  }
  return parts.join('\n');
}

export function createBlankInvoice() {
  return {
    id: crypto.randomUUID(),
    invoiceNumber: getNextInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    from: emptyParty(),
    to: emptyParty(),
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

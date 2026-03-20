import { supabase } from './supabase';

// ─── Invoices ───────────────────────────────────────────────

export async function saveInvoiceToCloud(invoice, userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('invoices')
    .upsert({ ...invoice, user_id: userId, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select()
    .single();
  if (error) { console.error('Save invoice error:', error); return null; }
  return data;
}

export async function getInvoicesFromCloud(userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) { console.error('Get invoices error:', error); return []; }
  return data || [];
}

export async function deleteInvoiceFromCloud(invoiceId, userId) {
  if (!supabase || !userId) return;
  await supabase.from('invoices').delete().eq('id', invoiceId).eq('user_id', userId);
}

// ─── Saved Profiles (Your Info) ─────────────────────────────

export async function saveProfileToCloud(profile, userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('saved_profiles')
    .upsert({ ...profile, user_id: userId }, { onConflict: 'id' })
    .select()
    .single();
  if (error) { console.error('Save profile error:', error); return null; }
  return data;
}

export async function getProfilesFromCloud(userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase
    .from('saved_profiles')
    .select('*')
    .eq('user_id', userId);
  if (error) { console.error('Get profiles error:', error); return []; }
  return data || [];
}

export async function deleteProfileFromCloud(profileId, userId) {
  if (!supabase || !userId) return;
  await supabase.from('saved_profiles').delete().eq('id', profileId).eq('user_id', userId);
}

// ─── Saved Clients ──────────────────────────────────────────

export async function saveClientToCloud(client, userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase
    .from('saved_clients')
    .upsert({ ...client, user_id: userId }, { onConflict: 'id' })
    .select()
    .single();
  if (error) { console.error('Save client error:', error); return null; }
  return data;
}

export async function getClientsFromCloud(userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase
    .from('saved_clients')
    .select('*')
    .eq('user_id', userId);
  if (error) { console.error('Get clients error:', error); return []; }
  return data || [];
}

export async function deleteClientFromCloud(clientId, userId) {
  if (!supabase || !userId) return;
  await supabase.from('saved_clients').delete().eq('id', clientId).eq('user_id', userId);
}

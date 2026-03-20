import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

const PRO_KEY = 'inkvoice_pro';

const ProContext = createContext({
  isPro: false,
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  activate: () => {},
  deactivate: () => {},
});

export function ProProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(() => {
    try { return localStorage.getItem(PRO_KEY) === 'true'; } catch { return false; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkProStatus(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkProStatus(session.user.id);
      } else {
        // Keep localStorage Pro status as fallback when logged out
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check URL for Stripe activation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('pro') === 'activated') {
      localStorage.setItem(PRO_KEY, 'true');
      setIsPro(true);
      // If logged in, update their profile in the database
      if (user && supabase) {
        supabase.from('profiles').upsert({ id: user.id, is_pro: true });
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [user]);

  async function checkProStatus(userId) {
    if (!supabase) return;
    const { data } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', userId)
      .single();
    if (data?.is_pro) {
      setIsPro(true);
      localStorage.setItem(PRO_KEY, 'true');
    }
  }

  const signUp = async (email, password) => {
    if (!supabase) throw new Error('Not configured');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    if (!supabase) throw new Error('Not configured');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Check pro status after login
    if (data.user) {
      await checkProStatus(data.user.id);
    }
    return data;
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    // Don't clear Pro from localStorage — they might still have a subscription
  };

  const activate = () => {
    localStorage.setItem(PRO_KEY, 'true');
    setIsPro(true);
    if (user && supabase) {
      supabase.from('profiles').upsert({ id: user.id, is_pro: true });
    }
  };

  const deactivate = () => {
    localStorage.removeItem(PRO_KEY);
    setIsPro(false);
  };

  return (
    <ProContext value={{ isPro, user, loading, signUp, signIn, signOut, activate, deactivate }}>
      {children}
    </ProContext>
  );
}

export function usePro() {
  return useContext(ProContext);
}

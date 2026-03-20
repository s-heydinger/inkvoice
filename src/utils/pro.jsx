import { createContext, useContext, useState, useEffect } from 'react';

const PRO_KEY = 'inkvoice_pro';

const ProContext = createContext({ isPro: false, activate: () => {}, deactivate: () => {} });

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(() => {
    try {
      return localStorage.getItem(PRO_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Check URL for activation (Stripe redirect lands here with ?pro=activated)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('pro') === 'activated') {
      localStorage.setItem(PRO_KEY, 'true');
      setIsPro(true);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const activate = () => {
    localStorage.setItem(PRO_KEY, 'true');
    setIsPro(true);
  };

  const deactivate = () => {
    localStorage.removeItem(PRO_KEY);
    setIsPro(false);
  };

  return (
    <ProContext value={{ isPro, activate, deactivate }}>
      {children}
    </ProContext>
  );
}

export function usePro() {
  return useContext(ProContext);
}

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import InvoiceBuilder from './components/InvoiceBuilder';
import { ProProvider } from './utils/pro';

function App() {
  const [view, setView] = useState('landing');

  return (
    <ProProvider>
      {view === 'builder' ? (
        <InvoiceBuilder onBack={() => setView('landing')} />
      ) : (
        <LandingPage onGetStarted={() => setView('builder')} />
      )}
    </ProProvider>
  );
}

export default App;

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import InvoiceBuilder from './components/InvoiceBuilder';

function App() {
  const [view, setView] = useState('landing');

  if (view === 'builder') {
    return <InvoiceBuilder onBack={() => setView('landing')} />;
  }

  return <LandingPage onGetStarted={() => setView('builder')} />;
}

export default App;

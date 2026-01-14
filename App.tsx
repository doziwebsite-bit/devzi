
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FooterContact from './components/FooterContact';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Architect from './pages/Architect';
import Login from './pages/Login';

const AppContent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/process" element={<Process />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/architect" element={<Architect />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Global Contact Section as Footer (only show if not on contact, architect, or login page) */}
      {location.pathname !== '/contact' && location.pathname !== '/architect' && location.pathname !== '/login' && <FooterContact />}
    </div>
  );
};

// Context
import { AuthProvider } from './context/AuthContext';

// ... (imports remain)

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { View, User, TrainingRequest } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Auth from './components/Auth';
import TrainerForm from './components/TrainerForm';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard';
import { sendSubmissionEmail, sendBuildCompletionEmail } from './services/emailService';
import { saveSubmission } from './services/storageService';
import { ADMIN_EMAIL } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash === 'admin-secret-dashboard') {
        // Only allow if logged in as admin
        if (user?.isAdmin) {
          setView(View.ADMIN);
        } else {
          // If trying to access admin without permission, redirect
          window.location.hash = '';
          setView(user?.isLoggedIn ? View.FORM : View.HOME);
        }
      } else if (!hash) {
        setView(View.HOME);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    sendBuildCompletionEmail();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const handleLogin = (u: User) => {
    setUser(u);
    if (u.isAdmin) {
      window.location.hash = '#/admin-secret-dashboard';
      setView(View.ADMIN);
    } else {
      setView(View.FORM);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setView(View.HOME);
    window.location.hash = '';
  };

  const handleStart = () => {
    if (user?.isLoggedIn) {
      setView(user.isAdmin ? View.ADMIN : View.FORM);
    } else {
      setView(View.AUTH);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: TrainingRequest) => {
    saveSubmission(data);
    await sendSubmissionEmail(data);
    setView(View.SUCCESS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (v: View) => {
    if (v === View.ADMIN && !user?.isAdmin) {
      setView(View.AUTH);
      return;
    }
    
    setView(v);
    if (v === View.HOME) window.location.hash = '';
    if (v === View.ADMIN) window.location.hash = '#/admin-secret-dashboard';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">
      <Navbar 
        user={user} 
        currentView={view} 
        onNavigate={navigateTo} 
        onLogout={handleLogout} 
      />

      <main className="flex-grow">
        {view === View.HOME && <Hero onStart={handleStart} />}
        {view === View.AUTH && <Auth onLogin={handleLogin} />}
        {view === View.FORM && user && <TrainerForm user={user} onSubmit={handleFormSubmit} />}
        {view === View.SUCCESS && <Confirmation onReset={() => navigateTo(View.HOME)} />}
        {view === View.ADMIN && user?.isAdmin && <Dashboard />}
      </main>

      <footer className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-10 md:mb-0">
              <span className="text-2xl font-black font-poppins tracking-tighter">
                Trainer<span className="text-blue-600">Buddy</span>
              </span>
              <p className="mt-4 text-gray-400 max-w-xs leading-relaxed">
                The elite platform for connecting world-class athletic talent with dedicated coaches.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-12 md:gap-24">
              <div>
                <h4 className="font-black text-gray-900 text-xs uppercase tracking-[0.2em] mb-6">Support</h4>
                <ul className="space-y-4 text-sm font-bold text-gray-500">
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                  <li className="pt-4 pb-2 text-[10px] font-black text-gray-900 uppercase tracking-widest border-t border-gray-50">Contact Us</li>
                  <li><a href="mailto:trainerbuddy1@Gmail.com" className="hover:text-blue-600 transition-all font-bold text-gray-700">trainerbuddy1@Gmail.com</a></li>
                  <li><a href="tel:8779847549" className="hover:text-blue-600 transition-all font-bold text-gray-700">8779847549</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">© 2025 TRAINERBUDDY GLOBAL</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { View, TrainingRequest } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchingWizard from './components/MatchingWizard';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard';
import CoachProfile from './components/CoachProfile';
import Chat from './components/Chat';
import Pricing from './components/Pricing';
import Logo from './components/Logo';
import { Coach } from './mockData';
import { sendSubmissionEmail, sendBuildCompletionEmail } from './services/emailService';
import { saveSubmission } from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);
  const [lastRequest, setLastRequest] = useState<TrainingRequest | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash === 'admin-secret-dashboard') {
        setView(View.ADMIN);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    sendBuildCompletionEmail();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStart = () => {
    setView(View.WIZARD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: TrainingRequest) => {
    setLastRequest(data);
    saveSubmission(data);
    await sendSubmissionEmail(data);
    setView(View.SUCCESS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProfile = (coach: Coach) => {
    setSelectedCoach(coach);
    setView(View.COACH_PROFILE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChat = () => {
    setView(View.MESSAGES);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (v: View) => {
    setView(v);
    if (v === View.HOME) window.location.hash = '';
    if (v === View.ADMIN) window.location.hash = '#/admin-secret-dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">
      <Navbar 
        currentView={view} 
        onNavigate={navigateTo} 
      />

      <main className="flex-grow">
        {view === View.HOME && <Hero onStart={handleStart} onBrowse={handleStart} />}
        {view === View.WIZARD && (
          <MatchingWizard 
            onSubmit={handleFormSubmit} 
            onBackToHome={() => navigateTo(View.HOME)} 
            onViewProfile={handleViewProfile}
          />
        )}
        {view === View.SUCCESS && <Confirmation onReset={() => navigateTo(View.HOME)} lastRequest={lastRequest} />}
        {view === View.ADMIN && <Dashboard />}
        {view === View.PRICING && <Pricing />}
        {view === View.COACH_PROFILE && selectedCoach && (
          <CoachProfile 
            coach={selectedCoach} 
            onBack={() => setView(View.WIZARD)} 
            onMessage={handleStartChat}
          />
        )}
        {view === View.MESSAGES && selectedCoach && (
          <Chat 
            coach={selectedCoach} 
            onBack={() => setView(View.COACH_PROFILE)} 
          />
        )}
      </main>

      <footer className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-8 h-8 text-gray-900" />
                <span className="text-lg font-bold tracking-tight text-gray-900">
                  Trainer<span className="text-blue-600">Buddy</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed">
                The definitive matching system for local athletic performance. 
                Vetted coaches. Precision results.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-8">Network</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Browse Roster</a>
                </li>
                <li>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd_0NzwlT1jasTghpIaWGU01JniyB8hDNnacDCiXHixgnTUdQ/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    Enroll for Coach
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-8">Contact</h4>
              <a href="mailto:trainerbuddy1@Gmail.com" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                trainerbuddy1@Gmail.com
              </a>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-medium text-gray-400">
              © 2026 TrainerBuddy. All rights reserved.
            </p>
            <div className="flex items-center gap-8 opacity-40 grayscale">
              <span className="font-bold text-[10px] tracking-widest uppercase text-gray-400">Fitness Hub</span>
              <span className="font-bold text-[10px] tracking-widest uppercase text-gray-400">Elite Gyms</span>
              <span className="font-bold text-[10px] tracking-widest uppercase text-gray-400">Sports Club</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
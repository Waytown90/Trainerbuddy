
import React from 'react';
import { View, User } from '../types';

interface NavbarProps {
  user: User | null;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, onNavigate, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 glass shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate(View.HOME)}
          >
            <span className="text-2xl font-bold font-poppins tracking-tight">
              Trainer<span className="text-blue-600 group-hover:text-purple-600 transition-colors">Buddy</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSd_0NzwlT1jasTghpIaWGU01JniyB8hDNnacDCiXHixgnTUdQ/viewform?usp=sharing&ouid=100013622528179949486"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-purple-600 transition-colors hidden sm:block"
            >
              Want to be a trainer?
            </a>
            
            {user?.isLoggedIn ? (
              <>
                {user.isAdmin && (
                  <button
                    onClick={() => onNavigate(View.ADMIN)}
                    className={`text-sm font-bold uppercase tracking-wider transition-all px-4 py-2 rounded-xl ${
                      currentView === View.ADMIN 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Admin Panel
                  </button>
                )}
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Logged in as
                  </span>
                  <span className="text-sm font-semibold text-gray-800 leading-none">
                    {user.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-5 py-2 rounded-xl border-2 border-red-50 text-red-500 text-sm font-bold hover:bg-red-50 transition-all active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              currentView !== View.AUTH && (
                <button
                  onClick={() => onNavigate(View.AUTH)}
                  className="px-8 py-3 rounded-2xl bg-gray-900 text-white font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95"
                >
                  Sign In
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

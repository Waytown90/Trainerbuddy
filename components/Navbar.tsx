
import React from 'react';
import { View } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate(View.HOME)}
          >
            <Logo className="w-8 h-8 text-blue-600" />
            <span className="text-lg font-bold tracking-tight text-gray-900">
              TrainerBuddy
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate(View.HOME)}
              className={`text-sm font-medium transition-colors ${currentView === View.HOME ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate(View.WIZARD)}
              className={`text-sm font-medium transition-colors ${currentView === View.WIZARD ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Find a Coach
            </button>
            <button
              onClick={() => onNavigate(View.PRICING)}
              className={`text-sm font-medium transition-colors ${currentView === View.PRICING ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Pricing
            </button>
            
            <button
              onClick={() => onNavigate(View.WIZARD)}
              className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

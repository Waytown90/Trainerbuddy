
import React from 'react';
import { View } from '../types';
import { motion } from 'motion/react';
import { Star, Users, Building2, Quote } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onBrowse: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onBrowse }) => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-8 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now live in your region
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Find the perfect <br />
            <span className="text-blue-600">personal trainer.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
            We match you with vetted, local coaches based on your goals, 
            budget, and schedule. No more searching, just results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStart}
              className="px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
            >
              Find My Coach
            </button>
            <button
              onClick={onBrowse}
              className="px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
            >
              Browse Roster
            </button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-gray-100 pt-12">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-500 font-medium">Verified Coaches</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12k+</div>
              <div className="text-sm text-gray-500 font-medium">Happy Clients</div>
            </div>
            <div className="hidden md:block">
              <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-500 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Background Element */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px]"></div>
      </div>
    </section>
  );
};

export default Hero;

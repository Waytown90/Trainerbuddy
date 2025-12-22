
import React from 'react';
import { View } from '../types';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Images Collage */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 opacity-30">
        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="fitness" />
        <img src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="yoga" />
        <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="football" />
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="gym" />
        <img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="gym" />
        <img src="https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="running" />
        <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="soccer" />
        <img src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="volleyball" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white via-white/80 to-blue-50/50"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
          Your Personal Training Matchmaker
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold font-poppins mb-8 leading-tight">
          Train Smarter. Get Matched <br />
          <span className="gradient-text">With the Right Coach.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12">
          Tell us your sport, timing, and budget — we'll do the matching. 
          Expert coaching is just a few clicks away.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold shadow-2xl shadow-blue-300 hover:shadow-blue-400 hover:scale-105 transition-all active:scale-95"
          >
            Start Training Now 🚀
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

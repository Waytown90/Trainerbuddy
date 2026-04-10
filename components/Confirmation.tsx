
import React, { useEffect, useState } from 'react';
import { TrainingRequest } from '../types';
import { getAIRecommendation } from '../services/aiService';

interface ConfirmationProps {
  onReset: () => void;
  lastRequest: TrainingRequest | null;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onReset, lastRequest }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lastRequest) {
      getAIRecommendation(lastRequest).then(insight => {
        setAiInsight(insight);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [lastRequest]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-xl w-full text-center bg-white p-10 md:p-16 border border-gray-200 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="mb-10 flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          Request Received
        </h2>
        
        {/* AI Insight Section */}
        <div className="mb-10 p-6 rounded-2xl bg-blue-50/50 border border-blue-100 text-left relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Tailored Match Insight</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400"></span>
          </div>
          
          {loading ? (
            <div className="space-y-2">
              <div className="h-3 w-full bg-blue-100/50 rounded-full"></div>
              <div className="h-3 w-3/4 bg-blue-100/50 rounded-full"></div>
            </div>
          ) : (
            <p className="text-blue-900 font-medium italic leading-relaxed">
              "{aiInsight}"
            </p>
          )}
        </div>

        <p className="text-gray-500 mb-10 leading-relaxed font-medium text-sm">
          Our team is now manually vetting local coaches based on your requirements. 
          Expect a curated list in your inbox within 24 hours.
        </p>

        {/* Referral Loop Section */}
        <div className="mb-10 p-8 rounded-[2rem] bg-gray-900 text-white text-left relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-blue-600 text-[9px] font-bold uppercase tracking-widest rounded">Limited Offer</span>
              <h4 className="text-lg font-bold">Skip the queue?</h4>
            </div>
            <p className="text-gray-400 text-sm mb-6 font-medium leading-relaxed">
              Refer 2 friends and get your match results in <span className="text-white font-bold">under 1 hour</span> instead of 24.
            </p>
            <div className="flex gap-2">
              <input 
                readOnly 
                value="https://trainerbuddy.app/ref/user123" 
                className="flex-grow bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs font-mono text-gray-300 outline-none"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold transition-all active:scale-95">
                Copy
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <button
          onClick={onReset}
          className="w-full sm:w-auto px-12 py-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all active:scale-95 shadow-lg"
        >
          Return to Home
        </button>

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
      </div>
    </div>
  );
};

export default Confirmation;

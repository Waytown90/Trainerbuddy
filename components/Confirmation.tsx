
import React from 'react';

interface ConfirmationProps {
  onReset: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onReset }) => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center bg-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        {/* Animated Checkmark */}
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-4xl font-bold font-poppins mb-6">Thanks! We've received your request 🎉</h2>
        <p className="text-xl text-gray-500 mb-10 leading-relaxed">
          We're reaching out to trainers across your preferred sports. You'll hear from us soon at your email address.
        </p>

        <button
          onClick={onReset}
          className="px-12 py-5 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
        >
          Back to Home
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Confirmation;

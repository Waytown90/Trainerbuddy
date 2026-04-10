import React from 'react';
import { Coach } from '../mockData';
import { Star, ShieldCheck, MapPin, Clock, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface CoachCardProps {
  coach: Coach;
  isAnonymized?: boolean;
  onUnlock?: () => void;
  onViewProfile?: (coach: Coach) => void;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, isAnonymized = false, onUnlock, onViewProfile }) => {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onViewProfile?.(coach)}
    >
      {isAnonymized && (
        <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center p-6 text-center">
          <button 
            onClick={onUnlock}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            Unlock Full Profile
          </button>
        </div>
      )}
      
      <div className="flex items-start gap-5 mb-8">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-100 overflow-hidden rounded-full border border-gray-200">
            <img 
              src={coach.photo} 
              alt={coach.name} 
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isAnonymized ? 'blur-xl grayscale' : ''}`}
              referrerPolicy="no-referrer"
            />
          </div>
          {coach.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-lg z-20">
              <ShieldCheck size={14} />
            </div>
          )}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`text-lg font-bold text-gray-900 tracking-tight truncate ${isAnonymized ? 'blur-sm' : ''}`}>
              {isAnonymized ? 'Elite Coach' : coach.name}
            </h4>
            <div className="flex items-center gap-1 text-blue-600 text-xs font-bold">
              <Star size={12} fill="currentColor" />
              {coach.rating}
            </div>
          </div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 truncate">
            {coach.specialization}
          </p>
          <div className="flex flex-wrap gap-2">
            {coach.sports.map(sport => (
              <span key={sport} className="px-2 py-1 bg-gray-50 text-gray-600 text-[9px] font-bold uppercase tracking-wider rounded-md border border-gray-100">
                {sport}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-500 font-bold uppercase tracking-widest">Experience</span>
          <span className="text-gray-900 font-semibold">{coach.experience} Years</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-gray-500 font-bold uppercase tracking-widest">Availability</span>
          <span className="text-gray-900 font-semibold">{coach.availability}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-4 border-t border-gray-100">
          <span className="text-gray-500 font-bold uppercase tracking-widest">Rate</span>
          <span className="text-blue-600 font-bold text-base">{coach.rateRange}</span>
        </div>
        <p className={`text-xs text-gray-500 leading-relaxed line-clamp-2 mt-6 font-medium ${isAnonymized ? 'blur-sm' : ''}`}>
          {coach.bio}
        </p>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile?.(coach);
          }}
          className="w-full py-3 bg-gray-50 text-gray-900 text-xs font-bold rounded-xl hover:bg-gray-100 transition-all"
        >
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default CoachCard;

import React from 'react';
import { Coach } from '../mockData';
import { Star, ShieldCheck, MapPin, Clock, Trophy, ChevronLeft, MessageCircle, Calendar, Share2, Award, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface CoachProfileProps {
  coach: Coach;
  onBack: () => void;
  onMessage: () => void;
}

const CoachProfile: React.FC<CoachProfileProps> = ({ coach, onBack, onMessage }) => {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-16 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <img 
                    src={coach.photo} 
                    alt={coach.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {coach.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-2xl shadow-xl border-4 border-white">
                    <ShieldCheck size={20} />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{coach.name}</h1>
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                    <Star size={14} fill="currentColor" />
                    {coach.rating}
                  </div>
                </div>
                <p className="text-xl font-medium text-gray-500 mb-6">{coach.specialization}</p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {coach.sports.map(sport => (
                    <span key={sport} className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-widest rounded-xl border border-gray-100">
                      {sport}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-100">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                    <p className="text-lg font-bold text-gray-900">{coach.experience} Years</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Level</p>
                    <p className="text-lg font-bold text-gray-900">{coach.highestLevel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Students</p>
                    <p className="text-lg font-bold text-gray-900">150+</p>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="text-blue-600" size={24} />
                About {coach.name.split(' ')[1]}
              </h3>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed font-medium">
                <p>{coach.bio}</p>
                <p className="mt-4">
                  I believe in a holistic approach to training that combines technical mastery with mental resilience. 
                  Whether you're a beginner or looking to compete at a national level, I tailor my sessions to your 
                  specific goals and physical capabilities.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="text-blue-600" size={24} />
                Certifications & Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Certified Elite Performance Coach',
                  'Advanced Sports Nutrition Specialist',
                  'Former National Level Competitor',
                  '10+ Years of Professional Coaching'
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Trophy size={20} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Star className="text-blue-600" size={24} />
                Client Reviews
              </h3>
              <div className="space-y-6">
                {coach.reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-gray-900">{review.userName}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < review.rating ? 'text-blue-600' : 'text-gray-300'} 
                            fill={i < review.rating ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-100/50">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Session Rate</p>
                    <p className="text-3xl font-bold text-gray-900">₹{coach.sessionRate}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-500 mb-1">per session</p>
                </div>

                <div className="space-y-4 mb-8">
                  <button 
                    onClick={onMessage}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200 flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={20} />
                    Message Coach
                  </button>
                  
                  {/* Calendly Embed Placeholder */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Booking Widget</p>
                    <div className="h-40 bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                      <p className="text-xs text-gray-400 font-medium px-4">Calendly widget will be embedded here for direct scheduling.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Clock size={18} className="text-blue-600" />
                    <span>Responds within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <MapPin size={18} className="text-blue-600" />
                    <span>{coach.availability} Sessions</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">Refer a friend</h4>
                  <p className="text-blue-100 text-sm mb-6 font-medium">Get 2 free sessions when your friend joins!</p>
                  <button className="w-full py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/30 transition-all text-sm">
                    Copy Referral Link
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;

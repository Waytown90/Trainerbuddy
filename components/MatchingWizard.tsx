import React, { useState } from 'react';
import { WizardStep, TrainingRequest, ScheduleSlot } from '../types';
import { SPORTS_OPTIONS, WEEKDAYS, TIME_SLOTS, EQUIPMENT_OPTIONS } from '../constants';
import { MOCK_COACHES, Coach } from '../mockData';
import CoachCard from './CoachCard';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Mail, Phone, CheckCircle2 } from 'lucide-react';

interface MatchingWizardProps {
  onSubmit: (data: TrainingRequest) => void;
  onBackToHome: () => void;
  onViewProfile: (coach: Coach) => void;
}

const MatchingWizard: React.FC<MatchingWizardProps> = ({ onSubmit, onBackToHome, onViewProfile }) => {
  const [step, setStep] = useState<WizardStep>(WizardStep.SPORT);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [availability, setAvailability] = useState<ScheduleSlot[]>([]);
  const [budget, setBudget] = useState(1000);
  const [sessionsPerMonth, setSessionsPerMonth] = useState(8);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [traineeGender, setTraineeGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [otherSportText, setOtherSportText] = useState('');
  const [otherEquipmentText, setOtherEquipmentText] = useState('');
  const [selectedDay, setSelectedDay] = useState(WEEKDAYS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = React.useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (step === WizardStep.SPORT) {
      if (selectedSports.length === 0) {
        alert('Please select at least one sport');
        return;
      }
      setStep(WizardStep.TIMING_BUDGET);
    } else if (step === WizardStep.TIMING_BUDGET) {
      setStep(WizardStep.PREVIEW);
    }
  };

  const handleBack = () => {
    if (step === WizardStep.TIMING_BUDGET) setStep(WizardStep.SPORT);
    else if (step === WizardStep.PREVIEW) setStep(WizardStep.TIMING_BUDGET);
    else onBackToHome();
  };

  const toggleSport = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
    );
  };

  const toggleEquipment = (item: string) => {
    setSelectedEquipment(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const addAvailability = () => {
    const exists = availability.find(s => s.day === selectedDay && s.time === selectedTime);
    if (!exists) {
      setAvailability(prev => [...prev, { day: selectedDay, time: selectedTime }]);
    }
  };

  const removeAvailability = (day: string, time: string) => {
    setAvailability(prev => prev.filter(s => !(s.day === day && s.time === time)));
  };

  const handleUnlock = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      alert('Please provide your email and phone to unlock matches');
      return;
    }

    setIsSubmitting(true);

    const request: TrainingRequest = {
      id: Math.random().toString(36).substring(7),
      userEmail: email,
      userPhone: phone,
      userGender: traineeGender,
      trainerGenderPreference: gender,
      sports: selectedSports.map(s => s === 'Others' ? `Other: ${otherSportText}` : s),
      equipment: selectedEquipment.map(e => e === 'Others' ? `Other: ${otherEquipmentText}` : e),
      schedule: availability,
      perSessionBudget: budget,
      sessionsPerMonth: sessionsPerMonth,
      dateOfBirth: dateOfBirth,
      submittedAt: new Date().toISOString(),
    };
    
    try {
      await onSubmit(request);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar - Minimal */}
        <div className="flex items-center gap-4 mb-12 px-4">
          {[WizardStep.SPORT, WizardStep.TIMING_BUDGET, WizardStep.PREVIEW].map((s, idx) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${step === s ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-bold ${step === s ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s === WizardStep.SPORT ? 'Sport' : 
                   s === WizardStep.TIMING_BUDGET ? 'Timing & Budget' : 
                   'Preview'}
                </span>
              </div>
              {idx < 2 && <div className="flex-grow h-[2px] bg-gray-200" />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === WizardStep.SPORT && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 md:p-12 border border-gray-200 rounded-3xl shadow-sm"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select your sports</h2>
                <p className="text-gray-500">Choose the disciplines you're interested in training.</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {SPORTS_OPTIONS.map((sport) => (
                  <button
                    key={sport.label}
                    onClick={() => toggleSport(sport.label)}
                    className={`group p-6 border rounded-2xl transition-all relative ${
                      selectedSports.includes(sport.label)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-100 bg-gray-50/50 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{sport.icon}</span>
                    <span className={`text-sm font-bold ${selectedSports.includes(sport.label) ? 'text-blue-600' : 'text-gray-600'}`}>
                      {sport.label}
                    </span>
                  </button>
                ))}
              </div>

              {selectedSports.includes('Others') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-12"
                >
                  <label className="block text-sm font-bold text-gray-700 mb-3">Please specify the sport</label>
                  <input
                    type="text"
                    value={otherSportText}
                    onChange={(e) => setOtherSportText(e.target.value)}
                    placeholder="Enter sport name..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-600 transition-all"
                  />
                </motion.div>
              )}

              <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <button onClick={handleBack} className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="px-10 py-4 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === WizardStep.TIMING_BUDGET && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-8 md:p-12 border border-gray-200 rounded-3xl shadow-sm"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Set your preferences</h2>
                <p className="text-gray-500">Help us narrow down the best matches for you.</p>
              </div>
              
              <div className="space-y-12 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Your Gender</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          onClick={() => setTraineeGender(g)}
                          className={`py-4 text-sm font-bold border rounded-xl transition-all ${
                            traineeGender === g ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-100 text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">Date of Birth</label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Preferred Trainer Gender</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Male', 'Female', 'Other'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`py-4 text-sm font-bold border rounded-xl transition-all ${
                          gender === g ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-gray-100 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Equipment You Have</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {EQUIPMENT_OPTIONS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => toggleEquipment(item.label)}
                        className={`p-4 border rounded-xl transition-all text-center ${
                          selectedEquipment.includes(item.label)
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-100 bg-gray-50/50 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">{item.icon}</span>
                        <span className="text-xs font-bold">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {selectedEquipment.includes('Others') && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-8"
                    >
                      <label className="block text-sm font-bold text-gray-700 mb-3">Please specify other equipment</label>
                      <input
                        type="text"
                        value={otherEquipmentText}
                        onChange={(e) => setOtherEquipmentText(e.target.value)}
                        placeholder="Enter equipment..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-600 transition-all"
                      />
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Your Availability (Days & Times)</label>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-grow">
                      <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-600 transition-all text-sm font-medium"
                      >
                        {WEEKDAYS.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-grow">
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-600 transition-all text-sm font-medium"
                      >
                        {TIME_SLOTS.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={addAvailability}
                      className="px-8 py-4 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95"
                    >
                      Add Slot
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availability.length > 0 ? (
                      availability.map((slot, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-xs font-bold"
                        >
                          <span>{slot.day}, {slot.time}</span>
                          <button
                            type="button"
                            onClick={() => removeAvailability(slot.day, slot.time)}
                            className="hover:text-blue-800 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No time slots added yet.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-sm font-bold text-gray-700">Budget Per Session</label>
                      <span className="text-2xl font-bold text-blue-600">₹{budget.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="mt-2 flex justify-between text-xs font-bold text-gray-400">
                      <span>₹500</span>
                      <span>₹10,000</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-sm font-bold text-gray-700">Sessions Per Month</label>
                      <span className="text-2xl font-bold text-blue-600">{sessionsPerMonth}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={sessionsPerMonth}
                      onChange={(e) => setSessionsPerMonth(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="mt-2 flex justify-between text-xs font-bold text-gray-400">
                      <span>1 session</span>
                      <span>30 sessions</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <button onClick={handleBack} className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="px-10 py-4 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95"
                >
                  Generate Matches
                </button>
              </div>
            </motion.div>
          )}

          {step === WizardStep.PREVIEW && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">We found matches!</h2>
                <p className="text-gray-500 max-w-xl mx-auto">These coaches fit your criteria perfectly. Complete your profile to connect with them.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_COACHES.slice(0, 3).map(coach => (
                  <CoachCard 
                    key={coach.id} 
                    coach={coach} 
                    isAnonymized={true} 
                    onUnlock={handleUnlock}
                    onViewProfile={onViewProfile}
                  />
                ))}
              </div>

              <div ref={formRef} className="bg-white border border-gray-200 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Unlock Access</h3>
                  <p className="text-gray-500 text-center mb-10 text-sm">Enter your details to receive full profiles and contact info.</p>
                  
                  <form onSubmit={handleFinalSubmit} className="max-w-md mx-auto">
                    <div className="space-y-4 mb-8">
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium outline-none focus:border-blue-600 rounded-xl transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                          <Phone size={18} />
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium outline-none focus:border-blue-600 rounded-xl transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 bg-blue-600 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          Processing...
                        </>
                      ) : (
                        'Get Full Profiles'
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div className="text-center">
                <button onClick={handleBack} className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors mx-auto">
                  Back to Parameters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MatchingWizard;

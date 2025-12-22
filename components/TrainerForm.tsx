
import React, { useState } from 'react';
import { 
  SPORTS_OPTIONS, 
  EQUIPMENT_OPTIONS, 
  TIME_SLOTS, 
  WEEKDAYS 
} from '../constants';
import { TrainingRequest, User } from '../types';

interface TrainerFormProps {
  user: User;
  onSubmit: (data: TrainingRequest) => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ user, onSubmit }) => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [otherSportText, setOtherSportText] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [trainerGenderPref, setTrainerGenderPref] = useState('No Preference');
  const [budget, setBudget] = useState(2500);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSports.length === 0) {
      alert("Please select at least one sport.");
      return;
    }

    let finalSports = [...selectedSports];
    if (selectedSports.includes('Others')) {
      if (!otherSportText.trim()) {
        alert("Please specify the other sport you'd like to play.");
        return;
      }
      finalSports = finalSports.filter(s => s !== 'Others');
      finalSports.push(otherSportText.trim());
    }

    const request: TrainingRequest = {
      id: Math.random().toString(36).substring(7),
      userEmail: email,
      userPhone: phone,
      userGender: user.gender,
      userDob: user.dob,
      userPassword: user.password,
      trainerGenderPreference: trainerGenderPref,
      sports: finalSports,
      equipment: selectedEquipment,
      timeSlots: selectedTimes,
      days: selectedDays,
      budget,
      submittedAt: new Date().toISOString(),
    };
    onSubmit(request);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full">
          Step-by-step matchmaking
        </div>
        <h2 className="text-4xl font-extrabold font-poppins mb-4 tracking-tight">Let's Find Your Coach</h2>
        <p className="text-xl text-gray-500">Take a minute to tell us what you're looking for.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Sports Selection */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            What sports do you want to learn?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {SPORTS_OPTIONS.map((sport) => (
              <button
                key={sport.label}
                type="button"
                onClick={() => toggleItem(selectedSports, setSelectedSports, sport.label)}
                className={`group p-5 rounded-[2rem] flex flex-col items-center justify-center transition-all border-2 ${
                  selectedSports.includes(sport.label)
                    ? 'border-blue-500 bg-blue-50 shadow-inner'
                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                }`}
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sport.icon}</span>
                <span className={`text-sm font-bold ${selectedSports.includes(sport.label) ? 'text-blue-700' : 'text-gray-600'}`}>
                  {sport.label}
                </span>
              </button>
            ))}
          </div>

          {selectedSports.includes('Others') && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 ml-1">Specify your sport</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl border-2 border-blue-100 bg-blue-50/30 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-blue-900 placeholder-blue-300 shadow-inner"
                placeholder="e.g. Golf, Squash, Rock Climbing..."
                value={otherSportText}
                onChange={(e) => setOtherSportText(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Trainer Gender Preference */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            Recommended gender of the trainer?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Male', 'Female', 'No Preference'].map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => setTrainerGenderPref(pref)}
                className={`p-6 rounded-2xl flex items-center justify-center font-bold transition-all border-2 ${
                  trainerGenderPref === pref
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-inner'
                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 text-gray-500'
                }`}
              >
                {pref === 'Male' && <span className="mr-2">👨</span>}
                {pref === 'Female' && <span className="mr-2">👩</span>}
                {pref === 'No Preference' && <span className="mr-2">🌈</span>}
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Selection */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            What equipment do you have?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {EQUIPMENT_OPTIONS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => toggleItem(selectedEquipment, setSelectedEquipment, item.label)}
                className={`p-5 rounded-[2rem] flex flex-col items-center justify-center transition-all border-2 ${
                  selectedEquipment.includes(item.label)
                    ? 'border-purple-500 bg-purple-50 shadow-inner'
                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                }`}
              >
                <span className="text-3xl mb-3">{item.icon}</span>
                <span className={`text-xs font-bold text-center leading-tight ${selectedEquipment.includes(item.label) ? 'text-purple-700' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Training Time */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            When can you train?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => toggleItem(selectedTimes, setSelectedTimes, slot)}
                className={`px-8 py-5 rounded-2xl text-left font-bold transition-all border-2 ${
                  selectedTimes.includes(slot)
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 text-gray-700'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            Which days are you free?
          </h3>
          <div className="flex flex-wrap gap-3">
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleItem(selectedDays, setSelectedDays, day)}
                className={`px-8 py-4 rounded-2xl font-black transition-all border-2 ${
                  selectedDays.includes(day)
                    ? 'border-amber-500 bg-amber-500 text-white shadow-xl shadow-amber-200 scale-105'
                    : 'border-gray-50 bg-gray-50/50 hover:border-gray-200 text-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Selection - REVERTED TO ORIGINAL PREMIUM STYLE */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-8 flex items-center">
            Your Monthly Budget
          </h3>
          <div className="px-4 py-8">
            <input
              type="range"
              min="500"
              max="15000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between mt-10 items-center">
              <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Min</span>
              <div className="text-center">
                <div className="text-5xl font-black text-rose-600 font-poppins tracking-tighter">₹{budget.toLocaleString()}</div>
                <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2">Maximum Per Month</div>
              </div>
              <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Max</span>
            </div>
          </div>
        </div>

        {/* Final Confirmation */}
        <div className="bg-gray-950 text-white p-10 md:p-16 rounded-[3rem] shadow-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-black font-poppins mb-4">Final Check! 🏁</h3>
              <p className="text-gray-400 text-lg">We'll use these details to contact you with trainer matches.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-1">Email Confirmation</label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-5 rounded-2xl bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-blue-500 outline-none transition-all"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-1">Phone Confirmation</label>
                <input
                  type="tel"
                  required
                  className="w-full px-6 py-5 rounded-2xl bg-gray-900 border border-gray-800 text-white placeholder-gray-600 focus:border-blue-500 outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="group w-full py-8 rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-2xl font-black shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.01] transition-all active:scale-[0.99] flex items-center justify-center gap-4"
            >
              Get My Trainer Match
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-center mt-6 text-xs text-gray-500 font-medium">By submitting, you agree to receive training offers via email/SMS.</p>
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
        </div>
      </form>
    </div>
  );
};

export default TrainerForm;

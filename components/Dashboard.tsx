
import React, { useEffect, useState } from 'react';
import { getSubmissions, clearSubmissions } from '../services/storageService';
import { TrainingRequest } from '../types';

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<TrainingRequest[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all submission data? This cannot be undone.')) {
      clearSubmissions();
      setSubmissions([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-3">
            Admin Management
          </div>
          <h1 className="text-4xl font-extrabold font-poppins text-gray-900 tracking-tight">Control Panel</h1>
          <p className="text-gray-500 mt-2">Managing all incoming trainer requests for waytown90@gmail.com</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-gray-100 px-6 py-3 rounded-2xl shadow-sm">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Requests</div>
            <div className="text-2xl font-black text-gray-900">{submissions.length}</div>
          </div>
          <button
            onClick={handleClear}
            className="px-6 py-4 rounded-2xl border-2 border-red-100 text-red-500 font-bold text-sm hover:bg-red-50 transition-all active:scale-95"
          >
            Clear Data
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-100">
          <div className="text-7xl mb-8">📥</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Queue is Empty</h3>
          <p className="text-gray-400 max-w-xs mx-auto">New training requests from users will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {submissions.map((req) => (
            <div key={req.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-xs font-bold tracking-wider">
                  #{req.id.toUpperCase()}
                </div>
                <div className="text-xs font-medium text-gray-400 flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(req.submittedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Account Profile</label>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
                    <div className="font-bold text-gray-900 truncate flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {req.userEmail}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {req.userPhone && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-black">
                          {req.userPhone}
                        </span>
                      )}
                      {req.userGender && (
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-black">
                          {req.userGender}
                        </span>
                      )}
                      {req.userDob && (
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-black">
                          DOB: {req.userDob}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">PW Secret</label>
                    <div className="px-3 py-2 bg-red-50 rounded-lg border border-red-100">
                      <span className="text-[10px] font-mono text-red-600 font-bold">{req.userPassword}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Trainer Pref</label>
                    <div className="px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                      <span className="text-[10px] font-black text-indigo-600">{req.trainerGenderPreference}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Sports & Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {req.sports.map(s => (
                      <span key={s} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                    <label className="text-[9px] font-black text-rose-400 uppercase tracking-widest block mb-1">Monthly Budget</label>
                    <div className="font-black text-rose-600 text-lg">₹{req.budget.toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <label className="text-[9px] font-black text-amber-500 uppercase tracking-widest block mb-1">Availability</label>
                    <div className="font-black text-amber-700 text-lg">{req.days.length} Days</div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Equipment Details</label>
                  <p className="text-xs font-medium text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {req.equipment.length > 0 ? req.equipment.join(' • ') : 'None'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

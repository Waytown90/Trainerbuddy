
import React, { useEffect, useState } from 'react';
import { getSubmissions, clearSubmissions } from '../services/storageService';
import { TrainingRequest } from '../types';

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<TrainingRequest[]>([]);

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all submission data?')) {
      clearSubmissions();
      setSubmissions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4 border border-blue-100">
              Admin Management
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Control Panel</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white border border-gray-200 px-6 py-3 rounded-2xl text-center shadow-sm">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Requests</div>
              <div className="text-2xl font-bold text-gray-900">{submissions.length}</div>
            </div>
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-xl border border-red-100 text-red-600 font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all"
            >
              Clear Data
            </button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-24 text-center border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Requests Yet</h3>
            <p className="text-gray-500 max-w-xs mx-auto text-sm font-medium">New training requests will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((req) => (
              <div key={req.id} className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-gray-50 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-gray-100">
                    #{req.id}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {new Date(req.submittedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">User Details</label>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="font-bold text-gray-900 truncate mb-1 text-sm">{req.userEmail}</div>
                      <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{req.userPhone}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Budget</label>
                      <div className="font-bold text-gray-900 text-lg">₹{req.perSessionBudget}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Frequency</label>
                      <div className="font-bold text-gray-900 text-lg">{req.sessionsPerMonth}/mo</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Gender</label>
                      <div className="font-bold text-gray-900 text-sm">{req.userGender}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">DOB</label>
                      <div className="font-bold text-gray-900 text-sm">{req.dateOfBirth || 'N/A'}</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Equipment</label>
                    <div className="flex flex-wrap gap-2">
                      {req.equipment?.length > 0 ? req.equipment.map(e => (
                        <span key={e} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[9px] font-bold uppercase">
                          {e}
                        </span>
                      )) : <span className="text-[9px] text-gray-400 italic">None</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Availability</label>
                    <div className="flex flex-wrap gap-2">
                      {req.schedule?.length > 0 ? req.schedule.map((s, i) => (
                        <span key={i} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[9px] font-bold uppercase border border-blue-100">
                          {s.day.slice(0,3)} {s.time.split(' – ')[0]}
                        </span>
                      )) : <span className="text-[9px] text-gray-400 italic">No slots selected</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Sports</label>
                    <div className="flex flex-wrap gap-2">
                      {req.sports.map(s => (
                        <span key={s} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-blue-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

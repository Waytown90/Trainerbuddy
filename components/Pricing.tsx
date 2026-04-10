import React from 'react';
import { Check, Info } from 'lucide-react';
import { motion } from 'motion/react';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-6">Transparent Pricing</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            No hidden fees. We believe in fair value for both athletes and coaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* For Athletes */}
          <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-100/50">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Athletes</h3>
              <p className="text-gray-500 font-medium">Find and book the best local coaches.</p>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-gray-900">₹0</span>
              <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Platform Fee</span>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Free matching with vetted coaches',
                'Secure in-app payments',
                'Direct messaging with coaches',
                'No subscription required',
                'Pay only for the sessions you book'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-green-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white rounded-2xl border border-gray-200 flex items-start gap-3">
              <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Athletes pay the session rate set by the coach. TrainerBuddy does not add any extra service fees for athletes.
              </p>
            </div>
          </div>

          {/* For Coaches */}
          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">For Coaches</h3>
                <p className="text-blue-100 font-medium">Grow your business with elite tools.</p>
              </div>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold">15%</span>
                <span className="text-blue-100 font-bold uppercase tracking-widest text-xs">Platform Commission</span>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  'Set your own session rates',
                  'Automated booking & scheduling',
                  'Secure Stripe payouts',
                  'Verified Coach badge',
                  'Performance analytics dashboard'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-blue-50">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-start gap-3">
                <Info size={18} className="text-white shrink-0 mt-0.5" />
                <p className="text-xs text-blue-100 leading-relaxed font-medium">
                  We only make money when you do. The 15% fee covers payment processing, platform maintenance, and marketing to bring you more clients.
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 text-left">
            {[
              { q: 'How do I get paid?', a: 'We use Stripe for all payouts. Once a session is completed, the funds (minus commission) are automatically transferred to your linked bank account.' },
              { q: 'Is there a signup fee?', a: 'No, there are no upfront costs to join TrainerBuddy as an athlete or a coach.' },
              { q: 'What is the "Verified Coach" badge?', a: 'It indicates that our team has manually reviewed your certifications, experience, and background check.' }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

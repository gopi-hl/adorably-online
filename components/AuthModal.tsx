import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onLogin({
        email,
        name: name || email.split('@')[0] || 'User',
      });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 dark:bg-slate-900 dark:border-slate-700 border bg-white border-slate-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 transition-colors dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 dark:text-white text-slate-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-sm dark:text-slate-400 text-slate-500">
              {isLogin ? 'Sign in to access your favorites' : 'Join to save and organize prompts'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-medium ml-1 dark:text-slate-300 text-slate-700">Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 dark:text-slate-500 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 border"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium ml-1 dark:text-slate-300 text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 dark:text-slate-500 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 border"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium ml-1 dark:text-slate-300 text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 dark:text-slate-500 text-slate-400" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 border"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg py-3 font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm dark:text-slate-500 text-slate-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
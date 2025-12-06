'use client';

import React, { ReactNode, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Sparkles, Github, User as UserIcon, LogOut, Heart, Sun, Moon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import AuthModal from './AuthModal';
import { FEATURE_FLAGS } from '@/featureFlags';

interface LayoutWrapperProps {
  children: ReactNode;
}

// Header navigation component that uses searchParams
const HeaderNav: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    isDarkMode,
    toggleTheme,
    user,
    setUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    favorites,
  } = useApp();

  const isHome = pathname === '/';
  const hasFavoritesParam = searchParams.get('favorites') === 'true';

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = (newUser: { name: string; email: string }) => {
    setUser(newUser);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0b]/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-pink-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isDarkMode ? 'bg-black border-white/10' : 'bg-white border-slate-200'}`}>
                <Sparkles className={isDarkMode ? "text-white" : "text-violet-600"} size={20} />
              </div>
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tight font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Adorably<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">.online</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Premium UI Catalog</p>
            </div>
          </Link>

          <nav className={`flex items-center gap-6 text-sm font-medium font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="hidden md:flex items-center gap-6 mr-2">
              <Link
                href="/"
                className={`transition-colors hover:text-violet-500 ${isHome && (isDarkMode ? 'text-white' : 'text-slate-900')}`}
              >
                CATALOG
              </Link>
              <a
                href="https://github.com/gopi-hl/adorably-online"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 transition-colors hover:text-violet-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
              >
                <Github size={16} />
                GITHUB
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'}`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {FEATURE_FLAGS.ENABLE_AUTH_FEATURES && (
              user ? (
                <div className={`flex items-center gap-4 pl-6 border-l ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <Link
                    href="/?favorites=true"
                    className={`flex items-center gap-2 transition-colors ${hasFavoritesParam ? 'text-pink-500' : 'hover:text-pink-400'}`}
                  >
                    <Heart size={16} className={hasFavoritesParam ? "fill-current" : ""} />
                    <span className="hidden sm:inline">FAVORITES</span>
                    {favorites.length > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>{favorites.length}</span>
                    )}
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                      <UserIcon size={14} />
                    </div>
                    <button onClick={handleLogout} className="text-slate-500 hover:text-red-400" title="Sign Out">
                      <LogOut size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  disabled
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-bold tracking-tight text-xs uppercase cursor-not-allowed opacity-60 ${isDarkMode ? 'bg-white/20 text-white/60' : 'bg-slate-300 text-slate-500'}`}
                >
                  <UserIcon size={14} />
                  <span>Sign In</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-500/30 text-violet-400 font-bold">SOON</span>
                </button>
              )
            )}
          </nav>
        </div>
      </header>

      {FEATURE_FLAGS.ENABLE_AUTH_FEATURES && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { isDarkMode } = useApp();

  return (
    <div className={`min-h-screen font-sans selection:bg-violet-500/30 pb-20 overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0b] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>

      {/* Background Ambience (Dark Mode Only) */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(131,56,236,0.15)_0%,transparent_70%)] blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,0,110,0.1)_0%,transparent_70%)] blur-3xl"></div>
      </div>

      {/* Background Ambience (Light Mode Only) */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-[-10%] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] blur-3xl"></div>
      </div>

      {/* Header wrapped in Suspense */}
      <Suspense fallback={<HeaderFallback />}>
        <HeaderNav />
      </Suspense>

      <main className="container mx-auto px-4 py-16 relative z-10">
        {children}
      </main>

      <footer className={`border-t py-16 mt-20 relative z-10 ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-slate-200 bg-white'}`}>
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-serif italic text-2xl text-slate-600 mb-6">Adorably.online</h3>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">&copy; {new Date().getFullYear()} AI Design Showcase</p>
        </div>
      </footer>
    </div>
  );
};

// Fallback header for Suspense
const HeaderFallback: React.FC = () => (
  <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 bg-[#0a0a0b]/80 border-white/5">
    <div className="container mx-auto px-4 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse"></div>
        <div>
          <div className="h-5 w-32 bg-white/10 rounded animate-pulse"></div>
          <div className="h-3 w-24 bg-white/5 rounded mt-1 animate-pulse"></div>
        </div>
      </div>
    </div>
  </header>
);

export default LayoutWrapper;

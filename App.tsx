import React, { useState, useMemo, useEffect } from 'react';
import { DESIGN_PROMPTS } from './constants';
import PromptDetail from './components/PromptDetail';
import AuthModal from './components/AuthModal';
import PromptCard from './components/PromptCard';
import { DesignPrompt, User } from './types';
import { Sparkles, Github, Palette, Search, User as UserIcon, LogOut, Heart, Sun, Moon } from 'lucide-react';

const CATEGORIES = ['All', 'Card', 'Layout', 'Animation', 'Interaction', 'Background'];

const App: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<DesignPrompt | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setShowFavoritesOnly(false);
  };

  const toggleFavorite = (id: number) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredPrompts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return DESIGN_PROMPTS.filter(prompt => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(query) || 
        prompt.description.toLowerCase().includes(query) ||
        prompt.useCases?.some(useCase => useCase.toLowerCase().includes(query)) ||
        prompt.implementationTips?.some(tip => tip.toLowerCase().includes(query)) ||
        prompt.accessibility?.toLowerCase().includes(query);

      const matchesCategory = activeCategory === 'All' || prompt.category === activeCategory;
      const matchesFavorite = !showFavoritesOnly || favorites.includes(prompt.id);

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [searchQuery, activeCategory, favorites, showFavoritesOnly]);

  const handleCloseDetail = () => {
    setSelectedPrompt(null);
  };

  const handleLogoClick = () => {
    setSelectedPrompt(null);
    setActiveCategory('All');
    setShowFavoritesOnly(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      {/* Header */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0b]/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
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
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium font-mono text-slate-400">
            <div className="hidden md:flex items-center gap-6 mr-2">
              <button 
                onClick={() => {
                  handleCloseDetail();
                  setShowFavoritesOnly(false);
                  setActiveCategory('All');
                }} 
                className={`transition-colors hover:text-violet-500 ${!showFavoritesOnly && !selectedPrompt && (isDarkMode ? 'text-white' : 'text-slate-900')}`}
              >
                CATALOG
              </button>
              <a href="#" className={`flex items-center gap-2 transition-colors hover:text-violet-500 ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'}`}>
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
            
            {user ? (
              <div className={`flex items-center gap-4 pl-6 border-l ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                <button 
                  onClick={() => {
                    handleCloseDetail();
                    setShowFavoritesOnly(!showFavoritesOnly);
                  }}
                  className={`flex items-center gap-2 transition-colors ${showFavoritesOnly ? 'text-pink-500' : 'hover:text-pink-400'}`}
                >
                  <Heart size={16} className={showFavoritesOnly ? "fill-current" : ""} />
                  <span className="hidden sm:inline">FAVORITES</span>
                  {favorites.length > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>{favorites.length}</span>
                  )}
                </button>
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
                onClick={() => setIsAuthModalOpen(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-bold tracking-tight text-xs uppercase ${isDarkMode ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                <UserIcon size={14} />
                <span>Sign In</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Hero Section - Only show if no prompt selected */}
        {!selectedPrompt && (
            <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="font-mono text-violet-500 text-xs tracking-[0.2em] uppercase mb-6">AI Design Showcase</p>
            <h2 className={`text-5xl md:text-7xl font-bold mb-8 leading-[0.9] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                45 Premium<br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 pr-4">
                Design Effects
                </span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                A curated collection of modern UI effects and animations. Preview live, copy the prompt, or generate the React code instantly.
            </p>
            </div>
        )}

        {/* Search & Filter - Only show if no prompt selected */}
        {!selectedPrompt && (
            <div className="sticky top-24 z-30 mb-12 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className={`backdrop-blur-xl border p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'bg-[#121214]/80 border-white/10' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
                
                <div className="relative w-full md:w-72 shrink-0 group px-2">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search effects, usage, accessibility..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm placeholder-slate-500 focus:outline-none focus:ring-0 font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                />
                </div>

                <div className={`h-6 w-px hidden md:block mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

                <div className="flex items-center gap-1 w-full overflow-x-auto no-scrollbar pb-1 md:pb-0 px-2">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all font-mono ${
                        activeCategory === cat 
                            ? (isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white')
                            : (isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
                        }`}
                    >
                        {cat}
                    </button>
                ))}
                </div>
            </div>
            </div>
        )}

        {/* Results Count */}
        {!selectedPrompt && (searchQuery || activeCategory !== 'All' || showFavoritesOnly) && (
             <div className="max-w-7xl mx-auto mb-8 text-xs font-mono text-slate-500 uppercase tracking-wider text-center animate-in fade-in">
                Found {filteredPrompts.length} result{filteredPrompts.length !== 1 ? 's' : ''}
                {showFavoritesOnly && ' in Favorites'}
            </div>
        )}

        {/* Grid - Only show if no prompt selected */}
        {!selectedPrompt ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {filteredPrompts.length > 0 ? (
                filteredPrompts.map((prompt) => (
                <PromptCard 
                    key={prompt.id}
                    prompt={prompt}
                    isFavorite={favorites.includes(prompt.id)}
                    onToggleFavorite={() => toggleFavorite(prompt.id)}
                    onOpenCode={() => setSelectedPrompt(prompt)}
                />
                ))
            ) : (
                <div className={`col-span-full py-32 text-center border border-dashed rounded-3xl ${isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50'}`}>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`}>
                        <Palette size={32} className="text-slate-500" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No effects found</h3>
                    <p className="text-slate-500 max-w-md mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            )}
            </div>
        ) : (
            // Detail View
            <PromptDetail 
                prompt={selectedPrompt} 
                onClose={handleCloseDetail}
                isFavorite={favorites.includes(selectedPrompt.id)}
                onToggleFavorite={() => toggleFavorite(selectedPrompt.id)}
            />
        )}

      </main>

      <footer className={`border-t py-16 mt-20 relative z-10 ${isDarkMode ? 'border-white/5 bg-[#050505]' : 'border-slate-200 bg-white'}`}>
        <div className="container mx-auto px-4 text-center">
           <h3 className="font-serif italic text-2xl text-slate-600 mb-6">Adorably.online</h3>
           <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">&copy; {new Date().getFullYear()} AI Design Showcase</p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

    </div>
  );
};

export default App;
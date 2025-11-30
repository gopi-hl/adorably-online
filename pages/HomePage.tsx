import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DESIGN_PROMPTS } from '../constants';
import PromptCard from '../components/PromptCard';
import { useApp } from '../context/AppContext';
import { Palette, Search, LayoutList, LayoutGrid } from 'lucide-react';

const CATEGORIES = ['All', 'Hero', 'Card', 'Layout', 'Animation', 'Interaction', 'Background'];

type ViewMode = 'list' | 'grid';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode, favorites, toggleFavorite, isFavorite } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const showFavoritesOnly = searchParams.get('favorites') === 'true';

  const setShowFavoritesOnly = (show: boolean) => {
    if (show) {
      setSearchParams({ favorites: 'true' });
    } else {
      setSearchParams({});
    }
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

  const handleOpenDetail = (promptId: number) => {
    navigate(`/prompt/${promptId}`);
  };


  return (
    <>
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <p className="font-mono text-violet-500 text-xs tracking-[0.2em] uppercase mb-6">AI Design Showcase</p>
        <h2 className={`text-5xl md:text-7xl font-bold mb-8 leading-[0.9] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          51 Premium<br />
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 pr-4">
            Design Effects
          </span>
        </h2>
        <p className={`text-xl max-w-2xl mx-auto font-light mb-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          A curated collection of modern UI effects, including <span className="text-violet-500 font-medium">6 new Hero Sections</span>. Preview live, copy the prompt, or generate the React code instantly.
        </p>
      </div>

      {/* Search & Filter */}
      <div id="filter-section" className="sticky top-24 z-30 mb-12 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className={`backdrop-blur-xl border p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'bg-[#121214]/80 border-white/10' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>

          <div className="relative w-full md:w-72 shrink-0 group px-2">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search effects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm placeholder-slate-500 focus:outline-none focus:ring-0 font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            />
          </div>

          <div className={`h-6 w-px hidden md:block mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

          <div className="flex-1 flex items-center gap-1 w-full overflow-x-auto no-scrollbar pb-1 md:pb-0 px-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (showFavoritesOnly) setShowFavoritesOnly(false);
                }}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all font-mono ${activeCategory === cat
                    ? (isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white')
                    : (isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
                  }`}
              >
                {cat}
                {cat === 'Hero' && (
                  <span className="absolute top-0 right-0 flex h-2.5 w-2.5 translate-x-1/2 -translate-y-1/4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className={`h-6 w-px hidden md:block mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

          <div className={`flex items-center gap-1 p-1 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${viewMode === 'list' ? (isDarkMode ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="List View"
            >
              <LayoutList size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? (isDarkMode ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || activeCategory !== 'All' || showFavoritesOnly) && (
        <div className="max-w-7xl mx-auto mb-8 text-xs font-mono text-slate-500 uppercase tracking-wider text-center animate-in fade-in">
          Found {filteredPrompts.length} result{filteredPrompts.length !== 1 ? 's' : ''}
          {showFavoritesOnly && ' in Favorites'}
        </div>
      )}

      {/* Content Area */}
      <div className={viewMode === 'grid'
        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
        : "flex flex-col gap-0 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
      }>
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((prompt, index) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              index={index}
              viewMode={viewMode}
              isFavorite={isFavorite(prompt.id)}
              onToggleFavorite={() => toggleFavorite(prompt.id)}
              onOpenCode={() => handleOpenDetail(prompt.id)}
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
    </>
  );
};

export default HomePage;

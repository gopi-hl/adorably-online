'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DesignPrompt } from '@/types';
import PromptCard from '@/components/PromptCard';
import { useApp } from '@/context/AppContext';
import { Palette, Search, LayoutList, LayoutGrid, Layers, Target } from 'lucide-react';

// Style categories (visual/design style)
const STYLE_CATEGORIES = ['All', 'Hero', 'Card', 'Layout', 'Animation', 'Interaction', 'Background'];

// Component type categories (where/how it's used)
const TYPE_CATEGORIES = ['All', 'Hero Section', 'Navigation', 'Content', 'Form', 'Feedback', 'Data Display', 'Marketing', 'Utility'];

type ViewMode = 'list' | 'grid';
type FilterMode = 'style' | 'type';

interface HomePageClientProps {
  prompts: DesignPrompt[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ prompts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDarkMode, favorites, toggleFavorite, isFavorite } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('style');
  const [activeStyleCategory, setActiveStyleCategory] = useState('All');
  const [activeTypeCategory, setActiveTypeCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const showFavoritesOnly = searchParams.get('favorites') === 'true';

  const setShowFavoritesOnly = (show: boolean) => {
    if (show) {
      router.push('/?favorites=true');
    } else {
      router.push('/');
    }
  };

  const filteredPrompts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return prompts.filter(prompt => {
      const matchesSearch =
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.useCases?.some(useCase => useCase.toLowerCase().includes(query)) ||
        prompt.implementationTips?.some(tip => tip.toLowerCase().includes(query)) ||
        prompt.accessibility?.toLowerCase().includes(query);

      const matchesStyleCategory = activeStyleCategory === 'All' || prompt.category === activeStyleCategory;
      const matchesTypeCategory = activeTypeCategory === 'All' || prompt.componentType === activeTypeCategory;
      const matchesFavorite = !showFavoritesOnly || favorites.includes(prompt.id);

      return matchesSearch && matchesStyleCategory && matchesTypeCategory && matchesFavorite;
    });
  }, [searchQuery, activeStyleCategory, activeTypeCategory, favorites, showFavoritesOnly, prompts]);

  const handleOpenDetail = (promptId: number) => {
    router.push(`/prompt/${promptId}`);
  };


  return (
    <>
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <p className="font-mono text-violet-500 text-xs tracking-[0.2em] uppercase mb-6">UI Component Library</p>
        <h2 className={`text-5xl md:text-7xl font-bold mb-8 leading-[0.9] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Build Stunning UIs<br />
          <span
            className="font-serif italic pr-4"
            style={{
              background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            with Simple Prompts
          </span>
        </h2>
        <p className={`text-xl max-w-2xl mx-auto font-light mb-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {prompts.length} curated design prompts with live previews. Copy the prompt, use with any AI, and build beautiful interfaces.
        </p>
      </div>

      {/* Search & Filter */}
      <div id="filter-section" className="sticky top-24 z-30 mb-12 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className={`backdrop-blur-xl border p-2 rounded-3xl shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-[#121214]/80 border-white/10' : 'bg-white/80 border-slate-200 shadow-slate-200/50'}`}>
          {/* Top row: Search + Filter Mode Toggle + View Mode */}
          <div className="flex flex-col md:flex-row items-center gap-2 mb-2 px-2">
            {/* Search */}
            <div className="relative w-full md:flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search effects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent border-none py-3 pl-12 pr-4 text-sm placeholder-slate-500 focus:outline-none focus:ring-0 font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              />
            </div>

            <div className={`h-6 w-px hidden md:block ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

            {/* Filter Mode Toggle */}
            <div className={`flex items-center gap-1 p-1 rounded-full shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
              <button
                type="button"
                onClick={() => setFilterMode('style')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filterMode === 'style' ? (isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                title="Filter by visual style"
              >
                <Layers size={14} />
                Style
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('type')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filterMode === 'type' ? (isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                title="Filter by component type"
              >
                <Target size={14} />
                Type
              </button>
            </div>

            <div className={`h-6 w-px hidden md:block ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

            {/* View Mode Toggle */}
            <div className={`flex items-center gap-1 p-1 rounded-full shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all ${viewMode === 'list' ? (isDarkMode ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                title="List View"
              >
                <LayoutList size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? (isDarkMode ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm') : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* Bottom row: Category filters */}
          <div className="flex items-center gap-1 w-full overflow-x-auto no-scrollbar pb-1 px-2">
            {filterMode === 'style' ? (
              STYLE_CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setActiveStyleCategory(cat);
                    if (showFavoritesOnly) setShowFavoritesOnly(false);
                  }}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all font-mono ${activeStyleCategory === cat
                      ? (isDarkMode ? 'bg-violet-500 text-white' : 'bg-violet-500 text-white')
                      : (isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
                    }`}
                >
                  {cat}
                </button>
              ))
            ) : (
              TYPE_CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setActiveTypeCategory(cat);
                    if (showFavoritesOnly) setShowFavoritesOnly(false);
                  }}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all font-mono ${activeTypeCategory === cat
                      ? (isDarkMode ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white')
                      : (isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')
                    }`}
                >
                  {cat}
                </button>
              ))
            )}
          </div>

          {/* Active filters indicator */}
          {(activeStyleCategory !== 'All' || activeTypeCategory !== 'All') && (
            <div className="flex items-center gap-2 px-4 pt-2 border-t border-slate-200 dark:border-white/10 mt-2">
              <span className="text-xs text-slate-500">Filters:</span>
              {activeStyleCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-medium">
                  <Layers size={12} />
                  {activeStyleCategory}
                  <button type="button" onClick={() => setActiveStyleCategory('All')} className="ml-1 hover:text-violet-700">&times;</button>
                </span>
              )}
              {activeTypeCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-medium">
                  <Target size={12} />
                  {activeTypeCategory}
                  <button type="button" onClick={() => setActiveTypeCategory('All')} className="ml-1 hover:text-pink-700">&times;</button>
                </span>
              )}
              <button
                type="button"
                onClick={() => { setActiveStyleCategory('All'); setActiveTypeCategory('All'); }}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 ml-auto"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || activeStyleCategory !== 'All' || activeTypeCategory !== 'All' || showFavoritesOnly) && (
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

export default HomePageClient;

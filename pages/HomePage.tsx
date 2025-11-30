import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DESIGN_PROMPTS } from '../constants';
import PromptCard from '../components/PromptCard';
import { useApp } from '../context/AppContext';
import { Palette, Search, LayoutList, LayoutGrid, Sparkles, Moon, Sun, Zap, Star, Heart, ArrowRight } from 'lucide-react';

// Import new UI components
import {
  MagneticButton,
  RippleButton,
  GlowingText,
  TypingText,
  GlitchText,
  ParallaxCard,
  GradientBorder,
  MorphingBlob,
  FloatingParticles,
  NumberCounter,
  RadialProgress,
  Spotlight,
  TextReveal,
  InfiniteMarquee,
  MarqueeItem,
  SwitchToggle,
  ShimmerCard,
  HoverTilt,
  SkeletonLoader,
  TooltipWrapper,
} from '../components/ui';

const CATEGORIES = ['All', 'Hero', 'Card', 'Layout', 'Animation', 'Interaction', 'Background'];

type ViewMode = 'list' | 'grid';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode, favorites, toggleFavorite, isFavorite } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [demoToggle, setDemoToggle] = useState(false);
  const [showComponentShowcase, setShowComponentShowcase] = useState(true);

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

      {/* Component Showcase Section */}
      {showComponentShowcase && (
        <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20 mb-6">
              <Sparkles size={16} className="text-violet-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-violet-500">New Components</span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <GlowingText color="rainbow" intensity="medium" animated>
                20 Reusable UI Components
              </GlowingText>
            </h3>
            <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <TypingText
                text={["Magnetic buttons", "Glowing text", "Parallax cards", "And more..."]}
                speed={80}
                pauseDuration={1500}
              />
            </p>
          </div>

          {/* Showcase Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">

            {/* Magnetic & Ripple Buttons */}
            <GradientBorder gradient="rainbow" animated speed="slow" className="h-full">
              <div className={`p-6 h-full ${isDarkMode ? 'bg-[#0a0a0b]' : 'bg-white'}`}>
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Interactive Buttons
                </h4>
                <div className="flex flex-wrap gap-3">
                  <MagneticButton variant="default" magnetStrength={0.3}>
                    <Zap size={16} /> Magnetic
                  </MagneticButton>
                  <RippleButton variant="success" size="md">
                    <Star size={16} /> Ripple
                  </RippleButton>
                  <MagneticButton variant="gradient">
                    Gradient
                  </MagneticButton>
                </div>
              </div>
            </GradientBorder>

            {/* Text Effects */}
            <ParallaxCard intensity={10} glare className="h-full">
              <div className={`p-6 h-full ${isDarkMode ? 'bg-slate-900/50' : 'bg-white'}`}>
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Text Effects
                </h4>
                <div className="space-y-3">
                  <GlowingText color="cyan" intensity="strong" as="p" className="text-xl font-bold">
                    Glowing Cyan
                  </GlowingText>
                  <GlitchText intensity="medium" color="purple-green" className="text-xl font-bold">
                    GLITCH
                  </GlitchText>
                  <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    <TextReveal direction="up" stagger={50}>
                      Reveal on scroll
                    </TextReveal>
                  </div>
                </div>
              </div>
            </ParallaxCard>

            {/* Progress & Numbers */}
            <Spotlight color="rgba(139, 92, 246, 0.2)" size={300}>
              <div className={`p-6 rounded-2xl border h-full ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'}`}>
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Progress & Counters
                </h4>
                <div className="flex items-center justify-around">
                  <RadialProgress value={75} color="gradient" size={80} strokeWidth={6} />
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      <NumberCounter end={2573} duration={2000} separator="," />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Lines of Code</p>
                  </div>
                </div>
              </div>
            </Spotlight>

            {/* Hover Tilt Card */}
            <HoverTilt maxTilt={12} glare glareOpacity={0.15}>
              <div className={`p-6 rounded-2xl border h-full ${isDarkMode ? 'bg-gradient-to-br from-violet-900/30 to-pink-900/30 border-white/10' : 'bg-gradient-to-br from-violet-50 to-pink-50 border-slate-200'}`}>
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  3D Hover Tilt
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Move your cursor over this card to see the 3D tilt effect with glare.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs bg-violet-500/20 text-violet-400">Perspective</span>
                  <span className="px-3 py-1 rounded-full text-xs bg-pink-500/20 text-pink-400">Glare</span>
                </div>
              </div>
            </HoverTilt>

            {/* Toggle & Tooltip */}
            <ShimmerCard shimmerSpeed="slow" className="h-full">
              <div className={`p-6 ${isDarkMode ? '' : ''}`}>
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Interactive Controls
                </h4>
                <div className="space-y-4">
                  <SwitchToggle
                    checked={demoToggle}
                    onChange={setDemoToggle}
                    variant="glow"
                    size="lg"
                    label={demoToggle ? "Enabled" : "Disabled"}
                    icon={{ on: <Sun size={12} />, off: <Moon size={12} /> }}
                  />
                  <div className="flex gap-2">
                    <TooltipWrapper content="I'm a tooltip!" position="top" variant="gradient">
                      <button className={`px-4 py-2 rounded-lg text-sm ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}>
                        Hover me
                      </button>
                    </TooltipWrapper>
                    <TooltipWrapper content="Another one!" position="bottom" variant="dark">
                      <button className={`px-4 py-2 rounded-lg text-sm ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}>
                        Or me
                      </button>
                    </TooltipWrapper>
                  </div>
                </div>
              </div>
            </ShimmerCard>

            {/* Morphing Blob Background */}
            <div className={`relative p-6 rounded-2xl border overflow-hidden h-full ${isDarkMode ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <MorphingBlob color="gradient" size="lg" speed="slow" blur opacity={0.5} />
              </div>
              <div className="relative z-10">
                <h4 className={`text-sm font-mono uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Morphing Blob
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Organic animated blob shapes perfect for backgrounds and decorative elements.
                </p>
              </div>
            </div>

          </div>

          {/* Infinite Marquee */}
          <div className="mt-12 overflow-hidden">
            <InfiniteMarquee speed={40} pauseOnHover gap={24}>
              {['MagneticButton', 'GlowingText', 'ParallaxCard', 'MorphingBlob', 'TypingText', 'RippleButton', 'GradientBorder', 'FloatingParticles', 'NumberCounter', 'Spotlight'].map((name, i) => (
                <MarqueeItem key={i}>
                  <span className={`px-6 py-3 rounded-full border text-sm font-mono ${isDarkMode ? 'border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-violet-500'} transition-colors cursor-default`}>
                    {name}
                  </span>
                </MarqueeItem>
              ))}
            </InfiniteMarquee>
          </div>

          {/* Hide showcase button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowComponentShowcase(false)}
              className={`text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
            >
              Hide Component Showcase
            </button>
          </div>
        </div>
      )}

      {/* Show showcase button when hidden */}
      {!showComponentShowcase && (
        <div className="text-center mb-12">
          <button
            onClick={() => setShowComponentShowcase(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors ${isDarkMode ? 'border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-violet-500'}`}
          >
            <Sparkles size={14} />
            Show Component Showcase
          </button>
        </div>
      )}

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

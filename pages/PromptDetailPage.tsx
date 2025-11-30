import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DESIGN_PROMPTS } from '../constants';
import { getExampleComponent } from '../components/LiveExamples';
import CodeViewer from '../components/CodeViewer';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Lightbulb, Accessibility, Layers, Heart, Share2, Maximize2,
  ChevronDown
} from 'lucide-react';

const PromptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleFavorite, isFavorite } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const prompt = DESIGN_PROMPTS.find(p => p.id === Number(id));
  const LiveComponent = prompt ? getExampleComponent(prompt.id) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
        } else {
          navigate('/');
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate, isDrawerOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  if (!prompt) {
    return (
      <div className="text-center py-32">
        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Prompt not found</h2>
        <Link to="/" className="text-violet-500 hover:underline">Back to Catalog</Link>
      </div>
    );
  }

  const promptIsFavorite = isFavorite(prompt.id);

  return (
    <div className="w-full min-h-screen animate-in slide-in-from-right duration-500 ease-out">

      {/* Sticky Sub-Header */}
      <div className="sticky top-20 z-30 px-4 md:px-6 h-12 flex items-center justify-between transition-colors duration-300">
        <Link
          to="/"
          className="flex items-center gap-2 transition-colors group dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-medium">Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(prompt.id)}
            className={`p-1.5 rounded-full transition-all ${promptIsFavorite
                ? 'text-pink-500'
                : 'dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900'
              }`}
            title="Toggle Favorite"
          >
            <Heart size={16} className={promptIsFavorite ? "fill-current" : ""} />
          </button>
          <button className="p-1.5 rounded-full transition-colors dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

        {/* Left Column: Sticky Preview */}
        <div className="lg:sticky lg:top-40 h-fit space-y-6">
          <div className="group relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] dark:bg-[#121214] dark:border-white/10 dark:shadow-black/50 bg-white border-slate-200 shadow-slate-200/50 border ring-1 ring-white/10">
            <div className="absolute inset-0 dark:bg-[#0f0f1a] bg-slate-50 transition-colors duration-300">
              {LiveComponent}
            </div>
            <div
              onClick={() => setIsDrawerOpen(true)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
            >
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 size={18} /> View Live Demo
              </span>
            </div>
          </div>

          <div className="rounded-2xl p-6 border dark:bg-[#121214]/50 dark:border-white/10 bg-white border-slate-200">
            <h3 className="font-bold mb-3 flex items-center gap-2 dark:text-white text-slate-900 text-sm uppercase tracking-wide">
              <Accessibility size={16} className="text-blue-500" />
              Accessibility Note
            </h3>
            <p className="text-sm leading-relaxed dark:text-slate-400 text-slate-600">
              {prompt.accessibility || "Ensure sufficient color contrast and keyboard navigability."}
            </p>
          </div>
        </div>

        {/* Right Column: Content & Code */}
        <div className="space-y-10 animate-in slide-in-from-bottom duration-700 delay-100 pb-10">

          {/* Header Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20 text-[10px] font-bold font-mono uppercase tracking-wider">
                {prompt.category}
              </span>
              <span className="text-xs font-mono dark:text-slate-600 text-slate-500">#{prompt.id.toString().padStart(3, '0')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] dark:text-white text-slate-900 tracking-tight">
              {prompt.title}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed font-light dark:text-slate-400 text-slate-600 border-l-2 dark:border-white/10 border-slate-200 pl-6 mb-8">
              {prompt.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 bg-slate-900 text-white hover:bg-slate-800"
              >
                <Maximize2 size={18} />
                View Live Demo
              </button>
            </div>
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-2xl p-6 dark:bg-[#121214]/50 dark:border-white/5 bg-white border-slate-200">
              <h3 className="font-bold mb-4 flex items-center gap-2 dark:text-white text-slate-900 text-sm uppercase tracking-wide">
                <Layers size={16} className="text-pink-500" />
                Use Cases
              </h3>
              <ul className="space-y-3">
                {prompt.useCases?.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm dark:text-slate-400 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0 opacity-50"></span>
                    {useCase}
                  </li>
                )) || <li className="text-slate-500 italic">No specific use cases listed.</li>}
              </ul>
            </div>

            <div className="border rounded-2xl p-6 dark:bg-[#121214]/50 dark:border-white/5 bg-white border-slate-200">
              <h3 className="font-bold mb-4 flex items-center gap-2 dark:text-white text-slate-900 text-sm uppercase tracking-wide">
                <Lightbulb size={16} className="text-amber-500" />
                Implementation Tips
              </h3>
              <ul className="space-y-3">
                {prompt.implementationTips?.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm dark:text-slate-400 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0 opacity-50"></span>
                    {tip}
                  </li>
                )) || <li className="text-slate-500 italic">No tips listed.</li>}
              </ul>
            </div>
          </div>

          {/* Embedded Code Viewer */}
          <div className="pt-2">
            <CodeViewer prompt={prompt} isEmbedded={true} />
          </div>

        </div>
      </div>

      {/* Bottom Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[101] h-[85vh] transform transition-transform duration-500 ease-out ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drawer Handle */}
        <div className="flex justify-center py-3 bg-transparent">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronDown size={18} />
            Close Demo
          </button>
        </div>

        {/* Drawer Content */}
        <div className="h-full bg-white dark:bg-[#0a0a0b] rounded-t-3xl shadow-2xl overflow-hidden border-t border-slate-200 dark:border-white/10">
          <div className="h-full overflow-y-auto">
            <LiveDemoContent prompt={prompt} LiveComponent={LiveComponent} onClose={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Live Demo Content ---
const LiveDemoContent: React.FC<{ prompt: any; LiveComponent: React.ReactNode; onClose: () => void }> = ({ prompt, LiveComponent }) => {
  const isHero = prompt.category === 'Hero';
  const isBackground = prompt.category === 'Background';

  // For backgrounds and heroes, show full-screen
  if (isBackground || isHero) {
    return (
      <div className="w-full h-full min-h-[80vh] relative">
        <div className="absolute inset-0">{LiveComponent}</div>
      </div>
    );
  }

  // For regular components, show at full size in a clean container
  return (
    <div className="w-full h-full min-h-[80vh] flex items-center justify-center bg-white dark:bg-[#0a0a0b]">
      <div className="w-full h-full">
        {LiveComponent}
      </div>
    </div>
  );
};

export default PromptDetailPage;

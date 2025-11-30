import React, { useEffect } from 'react';
import { DesignPrompt } from '../types';
import { getExampleComponent } from './LiveExamples';
import CodeViewer from './CodeViewer';
import { ArrowLeft, Lightbulb, Accessibility, Layers, Heart, Share2 } from 'lucide-react';

interface PromptDetailProps {
  prompt: DesignPrompt;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PromptDetail: React.FC<PromptDetailProps> = ({ prompt, onClose, isFavorite, onToggleFavorite }) => {
  const LiveComponent = getExampleComponent(prompt.id);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="w-full min-h-screen animate-in slide-in-from-right duration-500 ease-out">
      
      {/* Sticky Sub-Header (Sits below the 5rem/20 main header) */}
      <div className="sticky top-20 z-30 backdrop-blur-xl border-b px-4 md:px-6 h-14 flex items-center justify-between transition-colors duration-300 dark:bg-[#0a0a0b]/80 dark:border-white/5 bg-white/80 border-slate-200">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 transition-colors group dark:text-slate-400 dark:hover:text-white text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-wider font-medium">Back to Catalog</span>
        </button>
        
        <div className="flex items-center gap-3">
             <button 
                onClick={onToggleFavorite}
                className={`p-2 rounded-full border transition-all ${
                    isFavorite 
                    ? 'bg-pink-500/10 border-pink-500/50 text-pink-500' 
                    : 'dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Toggle Favorite"
            >
                <Heart size={16} className={isFavorite ? "fill-current" : ""} />
             </button>
             <button className="p-2 rounded-full border transition-colors dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900">
                <Share2 size={16} />
             </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Column: Sticky Preview */}
        <div className="lg:sticky lg:top-40 h-fit space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3] dark:bg-[#121214] dark:border-white/10 dark:shadow-black/50 bg-white border-slate-200 shadow-slate-200/50 border ring-1 ring-white/10">
                <div className="absolute inset-0 dark:bg-[#0f0f1a] bg-slate-50 transition-colors duration-300">
                    {LiveComponent}
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
                    <span className="text-xs font-mono dark:text-slate-600 text-slate-400">#{prompt.id.toString().padStart(3, '0')}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] dark:text-white text-slate-900 tracking-tight">
                    {prompt.title}
                </h1>
                <p className="text-lg md:text-xl leading-relaxed font-light dark:text-slate-400 text-slate-600 border-l-2 dark:border-white/10 border-slate-200 pl-6">
                    {prompt.description}
                </p>
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
    </div>
  );
};

export default PromptDetail;
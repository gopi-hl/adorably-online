import React, { useState } from 'react';
import { DesignPrompt } from '../types';
import { getExampleComponent, GenericExample } from './LiveExamples';
import { Copy, Check, Heart, Code2, Terminal, ArrowRight, Layers } from 'lucide-react';
import { CODE_EXAMPLES } from '../exampleCode';

interface PromptCardProps {
  prompt: DesignPrompt;
  index?: number;
  viewMode?: 'list' | 'grid';
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenCode: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index = 0, viewMode = 'grid', isFavorite, onToggleFavorite, onOpenCode }) => {
  const [promptCopied, setPromptCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const LiveComponent = getExampleComponent(prompt.id);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.description);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    const code = CODE_EXAMPLES[prompt.id];
    if (code) {
      navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  // --- LIST MODE LAYOUT (Linear Section) ---
  if (viewMode === 'list') {
    return (
      <div className="w-full py-20 border-b dark:border-white/5 border-slate-200 first:pt-0 last:border-0">
        <div className="flex flex-col lg:flex-row items-start gap-12">
            
            {/* Header Section */}
            <div className="lg:w-1/3 flex flex-row lg:flex-col gap-6 lg:gap-8 sticky lg:top-32">
                 <div className="font-mono text-6xl lg:text-8xl font-bold dark:text-white/5 text-slate-200 leading-none select-none">
                    {(index + 1).toString().padStart(2, '0')}
                 </div>
                 
                 <div className="flex-1">
                     <h3 className="text-2xl lg:text-3xl font-bold mb-4 dark:text-white text-slate-900 group-hover:text-violet-500 transition-colors cursor-pointer" onClick={onOpenCode}>
                        {prompt.title}
                     </h3>
                     <p className="text-slate-600 dark:text-slate-400 text-base lg:text-lg leading-relaxed mb-6">
                        {prompt.description}
                     </p>

                     <div className="flex flex-wrap gap-3 items-center">
                        <span className="px-3 py-1 rounded-full border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-100 text-xs font-mono uppercase tracking-wider dark:text-slate-400 text-slate-600">
                            {prompt.category}
                        </span>
                        
                        <div className="w-px h-4 bg-slate-300 dark:bg-white/10 mx-2"></div>
                        
                        <button 
                            onClick={handleCopyCode}
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900"
                        >
                            {codeCopied ? <span className="text-green-500 flex items-center gap-1"><Check size={14}/> Copied</span> : "Copy Code"}
                        </button>
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                            className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500'}`}
                        >
                            <Heart size={18} className={isFavorite ? "fill-current" : ""} />
                        </button>
                     </div>

                     <div className="mt-8">
                         <button 
                            onClick={onOpenCode}
                            className="flex items-center gap-2 text-sm font-bold border-b-2 border-violet-500 pb-1 hover:pr-4 transition-all dark:text-white text-slate-900"
                         >
                            View Implementation <ArrowRight size={16} />
                         </button>
                     </div>
                 </div>
            </div>

            {/* Preview Section */}
            <div className="lg:w-2/3 w-full">
                <div 
                    className="w-full aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden border dark:border-white/5 border-slate-200 relative dark:bg-[#0a0a0b] bg-slate-50 shadow-2xl dark:shadow-black/50 shadow-slate-200/50 group cursor-pointer"
                    onClick={onOpenCode}
                >
                     <div className="absolute inset-0 dark:bg-[#0f0f1a] bg-white transition-transform duration-700 group-hover:scale-[1.02]">
                        {LiveComponent ? LiveComponent : <GenericExample title={prompt.title} />}
                     </div>
                     
                     {/* Overlay Hint */}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-mono text-sm uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            View Details
                        </span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // --- GRID MODE LAYOUT (Compact Card) ---
  return (
    <div className="group relative rounded-3xl border transition-all duration-300 flex flex-col h-full overflow-hidden dark:bg-[#121214] dark:border-white/5 dark:hover:border-white/10 dark:hover:shadow-violet-500/10 bg-white border-slate-200 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5">
      
      {/* Preview Area - Responsive Background */}
      <div 
        className="h-72 dark:bg-[#0a0a0b] bg-slate-50 relative p-4 cursor-pointer overflow-hidden"
        onClick={onOpenCode}
      >
         <div className="w-full h-full rounded-2xl overflow-hidden border dark:border-white/5 border-slate-200 relative dark:bg-[#0f0f1a] bg-white transition-transform duration-500 ease-out group-hover:scale-[1.02] origin-center">
            {LiveComponent ? LiveComponent : <GenericExample title={prompt.title} />}
         </div>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-20">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite();
                }}
                className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border transition-all shadow-lg ${
                    isFavorite 
                    ? 'bg-pink-500 text-white border-pink-500' 
                    : 'bg-black/50 text-white hover:bg-white hover:text-black border-white/10 dark:bg-black/50 dark:hover:bg-white dark:hover:text-black bg-white/50 text-slate-900 hover:bg-slate-900 hover:text-white border-slate-200'
                }`}
                title="Add to Favorites"
            >
                <Heart size={18} className={isFavorite ? "fill-current" : ""} />
            </button>
        </div>

        <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 z-20">
             <span className="font-mono text-[10px] uppercase dark:bg-black/60 bg-white/90 backdrop-blur border dark:border-white/10 border-slate-200 dark:text-white text-slate-800 px-3 py-1.5 rounded-full shadow-sm">
                {prompt.category}
             </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 pt-4 flex-1 flex flex-col relative z-10 dark:bg-[#121214] bg-white">
        <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-xl font-bold transition-all cursor-pointer dark:text-white text-slate-900 group-hover:text-violet-500" onClick={onOpenCode}>
                {prompt.title}
            </h3>
             <span className="font-mono text-3xl font-bold absolute right-6 top-0 pointer-events-none transition-colors dark:text-white/10 text-slate-100 group-hover:dark:text-white/5">
                {(index + 1).toString().padStart(2, '0')}
            </span>
        </div>
        
        <p className="text-sm leading-relaxed mb-6 font-light line-clamp-3 dark:text-slate-400 text-slate-500 h-[4.5em]">
            {prompt.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t pt-6 gap-2 dark:border-white/5 border-slate-100">
            <div className="flex items-center gap-4">
                <button 
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider transition-colors dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900"
                    title="Copy Prompt Description"
                >
                    {promptCopied ? (
                        <span className="text-green-500 flex items-center gap-1"><Check size={12}/> Copied</span>
                    ) : (
                        <span className="flex items-center gap-1 group/btn">
                            <Copy size={12} className="group-hover/btn:text-violet-500 transition-colors" /> Prompt
                        </span>
                    )}
                </button>

                <button 
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider transition-colors dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900"
                    title="Copy Component Code"
                >
                    {codeCopied ? (
                        <span className="text-green-500 flex items-center gap-1"><Check size={12}/> Copied</span>
                    ) : (
                        <span className="flex items-center gap-1 group/btn">
                            <Terminal size={12} className="group-hover/btn:text-violet-500 transition-colors" /> Code
                        </span>
                    )}
                </button>
            </div>

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onOpenCode();
                }}
                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider border px-4 py-2 rounded-full transition-all group/view dark:text-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/5 text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200"
            >
                View Details <ArrowRight size={12} className="group-hover/view:translate-x-0.5 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
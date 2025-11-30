import React, { useState } from 'react';
import { DesignPrompt } from '../types';
import { getExampleComponent, GenericExample } from './LiveExamples';
import { Copy, Check, Heart, Code2, Terminal, ArrowRight } from 'lucide-react';
import { CODE_EXAMPLES } from '../exampleCode';

interface PromptCardProps {
  prompt: DesignPrompt;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenCode: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, isFavorite, onToggleFavorite, onOpenCode }) => {
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
                {prompt.id.toString().padStart(2, '0')}
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
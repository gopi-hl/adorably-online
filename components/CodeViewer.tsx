'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Terminal, Loader2, Code2, Check, Sparkles } from 'lucide-react';
import { generateComponentCode } from '../services/geminiService';
import { DesignPrompt } from '../types';
import { CODE_EXAMPLES } from '../exampleCode';

interface CodeViewerProps {
  prompt: DesignPrompt;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ prompt, onClose, isEmbedded = false }) => {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [mode, setMode] = useState<'static' | 'ai'>('static');

  // Load static code on mount
  useEffect(() => {
    if (CODE_EXAMPLES[prompt.id]) {
        setCode(CODE_EXAMPLES[prompt.id]);
        setMode('static');
    } else {
        setMode('ai');
    }
  }, [prompt.id]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setMode('ai');
    setCode(null); // Clear code to show loading state
    try {
      const result = await generateComponentCode(prompt.title, prompt.description);
      setCode(result.code);
    } catch (err) {
      setError("Failed to generate code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const containerClasses = isEmbedded 
    ? "flex flex-col h-full w-full rounded-2xl border overflow-hidden dark:bg-[#0a0a0b] dark:border-white/5 bg-slate-50 border-slate-200" 
    : "flex flex-col h-full w-full md:w-[600px] shadow-2xl absolute right-0 top-0 bottom-0 z-50 animate-in slide-in-from-right duration-300 dark:bg-[#0a0a0b] dark:border-l dark:border-white/10 dark:shadow-black/50 bg-white border-l border-slate-200 shadow-slate-200/50";

  return (
    <div className={containerClasses}>
      
      {/* Header - Only show if not embedded */}
      {!isEmbedded && (
        <div className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl dark:bg-[#0a0a0b]/90 dark:border-white/10 bg-white/90 border-slate-200">
            <h3 className="font-medium flex items-center gap-2 font-mono text-sm dark:text-white text-slate-900">
            <Terminal size={16} className="text-violet-500" />
            {mode === 'static' ? 'Source Code' : 'AI Generator'}
            </h3>
            {onClose && (
                <button onClick={onClose} className="text-xs font-mono uppercase tracking-wider transition-colors dark:text-slate-500 dark:hover:text-white text-slate-400 hover:text-slate-900">
                Close [ESC]
                </button>
            )}
        </div>
      )}

      {isEmbedded && (
        <div className="px-6 py-4 border-b flex items-center justify-between dark:border-white/5 dark:bg-white/[0.02] bg-white border-slate-200">
             <h3 className="font-bold text-sm flex items-center gap-2 dark:text-white text-slate-900">
                <Code2 size={16} className="text-violet-500" />
                Component Code
             </h3>
             <div className="flex gap-2">
                <button 
                    onClick={() => {
                        setCode(CODE_EXAMPLES[prompt.id]);
                        setMode('static');
                    }}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border transition-all ${mode === 'static' 
                        ? 'dark:bg-white/10 dark:border-white/20 dark:text-white bg-slate-200 border-slate-300 text-slate-900' 
                        : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                    Static
                </button>
                <button 
                    onClick={handleGenerate}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border transition-all flex items-center gap-1 ${mode === 'ai' 
                        ? 'bg-violet-500/10 border-violet-500/50 text-violet-500' 
                        : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                    <Sparkles size={10} /> AI Remix
                </button>
             </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin dark:scrollbar-thumb-white/10 dark:scrollbar-track-transparent scrollbar-thumb-slate-200 scrollbar-track-transparent">
        
        {/* If not embedded, show title/desc in header area */}
        {!isEmbedded && (
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 dark:text-white text-slate-900">{prompt.title}</h2>
                <p className="text-sm leading-relaxed dark:text-slate-400 text-slate-600">{prompt.description}</p>
                {/* Action Bar for Non-embedded */}
                <div className="flex gap-2 mt-4">
                    <button 
                        onClick={() => {
                            setCode(CODE_EXAMPLES[prompt.id]);
                            setMode('static');
                        }}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all ${mode === 'static' 
                            ? 'dark:bg-white/10 dark:border-white/20 dark:text-white bg-slate-200 border-slate-300 text-slate-900' 
                            : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                    >
                        Exact Code
                    </button>
                    <button 
                        onClick={handleGenerate}
                        disabled={loading}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all flex items-center justify-center gap-2 ${mode === 'ai' 
                            ? 'bg-violet-500/10 border-violet-500/50 text-violet-500' 
                            : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                    >
                        {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        {mode === 'ai' && code ? 'Regenerate' : 'Remix with AI'}
                    </button>
                </div>
            </div>
        )}

        {!code && !loading && mode === 'ai' && (
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl dark:border-white/10 dark:bg-white/[0.02] border-slate-200 bg-slate-50">
            <Code2 size={32} className="mb-3 dark:text-slate-700 text-slate-400" />
            <p className="text-xs mb-4 text-center max-w-[200px] dark:text-slate-500 text-slate-500">
              Generate a unique version of this component using Gemini AI.
            </p>
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-violet-500/20 flex items-center gap-2 text-xs"
            >
              <Sparkles size={14} /> Generate
            </button>
            {error && <p className="text-red-400 mt-4 text-xs">{error}</p>}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-48">
            <Loader2 size={24} className="text-violet-500 animate-spin mb-3" />
            <p className="animate-pulse font-mono text-xs dark:text-slate-500 text-slate-400">Generating code...</p>
          </div>
        )}

        {code && (
          <div className="relative group animate-in fade-in duration-500">
             <div className="absolute right-4 top-4 z-10">
                <button 
                    onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-md transition-all border ${isCopied 
                        ? 'bg-green-500/20 border-green-500/50 text-green-500' 
                        : 'dark:bg-slate-800/80 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white bg-white/80 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span className="text-xs font-mono">{isCopied ? 'COPIED' : 'COPY'}</span>
                </button>
             </div>
             {/* Code block always dark for better syntax highlighting contrast */}
            <pre className="p-4 rounded-xl overflow-x-auto text-xs font-mono border leading-relaxed shadow-inner bg-[#121214] border-white/10 text-slate-300">
              <code>{code}</code>
            </pre>
            
            {mode === 'ai' && (
                <div className="mt-4 flex justify-end">
                    <p className="text-[10px] font-mono uppercase dark:text-slate-600 text-slate-400">Generated by Gemini 2.5 Flash</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;
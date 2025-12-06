'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Terminal, Code2, Check, MessageSquareText } from 'lucide-react';
import { DesignPrompt } from '../types';
import { CODE_EXAMPLES } from '../exampleCode';

interface CodeViewerProps {
  prompt: DesignPrompt;
  onClose?: () => void;
  isEmbedded?: boolean;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ prompt, onClose, isEmbedded = false }) => {
  const [code, setCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');

  // Load static code on mount
  useEffect(() => {
    if (CODE_EXAMPLES[prompt.id]) {
      setCode(CODE_EXAMPLES[prompt.id]);
    }
  }, [prompt.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerClasses = isEmbedded
    ? "flex flex-col h-full w-full rounded-2xl border overflow-hidden dark:bg-[#0a0a0b] dark:border-white/5 bg-slate-50 border-slate-200"
    : "flex flex-col h-full w-full md:w-[600px] shadow-2xl absolute right-0 top-0 bottom-0 z-50 animate-in slide-in-from-right duration-300 dark:bg-[#0a0a0b] dark:border-l dark:border-white/10 dark:shadow-black/50 bg-white border-l border-slate-200 shadow-slate-200/50";

  // Build the prompt text (description + implementation tips + accessibility, but NOT use cases)
  const promptText = `${prompt.description}

Implementation Tips:
${prompt.implementationTips?.map(tip => `• ${tip}`).join('\n') || 'N/A'}

Accessibility:
${prompt.accessibility || 'Ensure proper contrast and keyboard accessibility.'}`;

  return (
    <div className={containerClasses}>

      {/* Header - Only show if not embedded */}
      {!isEmbedded && (
        <div className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl dark:bg-[#0a0a0b]/90 dark:border-white/10 bg-white/90 border-slate-200">
            <h3 className="font-medium flex items-center gap-2 font-mono text-sm dark:text-white text-slate-900">
            <Terminal size={16} className="text-violet-500" />
            {activeTab === 'prompt' ? 'Design Prompt' : 'Sample Code'}
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
                {activeTab === 'prompt' ? (
                  <>
                    <MessageSquareText size={16} className="text-violet-500" />
                    Design Prompt
                  </>
                ) : (
                  <>
                    <Code2 size={16} className="text-violet-500" />
                    Sample Code
                  </>
                )}
             </h3>
             <div className="flex gap-2">
                <button
                    onClick={() => setActiveTab('prompt')}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border transition-all ${activeTab === 'prompt'
                        ? 'dark:bg-white/10 dark:border-white/20 dark:text-white bg-slate-200 border-slate-300 text-slate-900'
                        : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                    Prompt
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border transition-all flex items-center gap-1 ${activeTab === 'code'
                        ? 'dark:bg-white/10 dark:border-white/20 dark:text-white bg-slate-200 border-slate-300 text-slate-900'
                        : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                    Code
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
                {/* Tab Bar for Non-embedded */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setActiveTab('prompt')}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all ${activeTab === 'prompt'
                            ? 'dark:bg-white/10 dark:border-white/20 dark:text-white bg-slate-200 border-slate-300 text-slate-900'
                            : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                    >
                        Prompt
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all ${activeTab === 'code'
                            ? 'dark:bg-white/10 dark:border-white/20 dark:text-white bg-slate-200 border-slate-300 text-slate-900'
                            : 'border-transparent text-slate-500 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-slate-100'}`}
                    >
                        Code
                    </button>
                </div>
            </div>
        )}

        {/* Prompt Tab Content */}
        {activeTab === 'prompt' && (
          <div className="relative group animate-in fade-in duration-500">
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={() => copyToClipboard(promptText)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-md transition-all border ${isCopied
                  ? 'bg-green-500/20 border-green-500/50 text-green-500'
                  : 'dark:bg-slate-800/80 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white bg-white/80 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                <span className="text-xs font-mono">{isCopied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl overflow-x-auto text-sm border leading-relaxed shadow-inner bg-[#121214] border-white/10 text-slate-300 whitespace-pre-wrap">
              <div className="mb-4">
                <span className="text-violet-400 font-semibold">Prompt:</span>
                <p className="mt-2 text-slate-200">{prompt.description}</p>
              </div>

              {prompt.implementationTips && prompt.implementationTips.length > 0 && (
                <div className="mb-4">
                  <span className="text-amber-400 font-semibold">Implementation Tips:</span>
                  <ul className="mt-2 space-y-1">
                    {prompt.implementationTips.map((tip, i) => (
                      <li key={i} className="text-slate-400">• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {prompt.accessibility && (
                <div>
                  <span className="text-blue-400 font-semibold">Accessibility:</span>
                  <p className="mt-2 text-slate-400">{prompt.accessibility}</p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-mono uppercase dark:text-slate-600 text-slate-400">
                Copy this prompt to use with any AI
              </p>
            </div>
          </div>
        )}

        {/* Code Tab Content */}
        {activeTab === 'code' && (
          <>
            {code && (
              <div className="relative group animate-in fade-in duration-500">
                <div className="absolute right-4 top-4 z-10">
                  <button
                    onClick={() => copyToClipboard(code)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-md transition-all border ${isCopied
                      ? 'bg-green-500/20 border-green-500/50 text-green-500'
                      : 'dark:bg-slate-800/80 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white bg-white/80 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    <span className="text-xs font-mono">{isCopied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl overflow-x-auto text-xs font-mono border leading-relaxed shadow-inner bg-[#121214] border-white/10 text-slate-300">
                  <code>{code}</code>
                </pre>
              </div>
            )}

            {!code && (
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl dark:border-white/10 dark:bg-white/[0.02] border-slate-200 bg-slate-50">
                <Code2 size={32} className="mb-3 dark:text-slate-700 text-slate-400" />
                <p className="text-xs text-center max-w-[200px] dark:text-slate-500 text-slate-500">
                  No sample code available for this component.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;
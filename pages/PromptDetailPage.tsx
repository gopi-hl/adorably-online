import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DESIGN_PROMPTS } from '../constants';
import { DesignPrompt } from '../types';
import { getExampleComponent } from '../components/LiveExamples';
import CodeViewer from '../components/CodeViewer';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Lightbulb, Accessibility, Layers, Heart, Share2, Maximize2, X, CheckCircle2, BarChart3, Users, Globe, ArrowRight } from 'lucide-react';

// --- Mock Page Context for Live Demo ---
const MockPageContext: React.FC<{ children: React.ReactNode; category: string; title: string }> = ({ children, category, title }) => {
  const isHero = category === 'Hero';
  const isBackground = category === 'Background';

  const Header = () => (
    <header className={`w-full py-4 px-6 flex items-center justify-between border-b z-20 relative ${isBackground ? 'bg-transparent border-white/10' : 'bg-white dark:bg-[#0a0a0b] border-slate-200 dark:border-white/10'}`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">A</div>
        <span className={`font-bold ${isBackground ? 'text-white' : 'text-slate-900 dark:text-white'}`}>Acme Corp</span>
      </div>
      <nav className={`hidden md:flex gap-6 text-sm font-medium ${isBackground ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>
        <span>Product</span>
        <span>Solutions</span>
        <span>Enterprise</span>
        <span>Pricing</span>
      </nav>
      <div className="flex gap-3">
        <button className={`text-sm font-medium px-4 py-2 ${isBackground ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>Log in</button>
        <button className="text-sm font-medium px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">Sign up</button>
      </div>
    </header>
  );

  const Features = () => (
    <section className={`py-20 px-6 ${isBackground ? 'relative z-10 text-white' : 'bg-slate-50 dark:bg-[#111] text-slate-900 dark:text-white'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Enterprise-grade capabilities</h2>
          <p className={`max-w-2xl mx-auto ${isBackground ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
            Everything you need to manage your business, scale your operations, and delight your customers.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time insights into your performance metrics." },
            { icon: Users, title: "Team Collaboration", desc: "Built-in tools for seamless remote work." },
            { icon: Globe, title: "Global Scale", desc: "Deploy worldwide with edge computing network." }
          ].map((f, i) => (
            <div key={i} className={`p-6 rounded-xl border ${isBackground ? 'bg-white/10 border-white/10 backdrop-blur-md' : 'bg-white dark:bg-[#1a1a1a] border-slate-200 dark:border-white/5'}`}>
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-4">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className={isBackground ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (isBackground) {
    return (
      <div className="relative w-full h-full min-h-screen overflow-y-auto overflow-x-hidden bg-slate-900">
        <div className="fixed inset-0 z-0">{children}</div>
        <div className="relative z-10">
          <Header />
          <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Future</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
              Experience the background effect in a full-page context. Scroll down to see how it behaves with content overlays.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-colors">Get Started</button>
              <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-colors">Learn More</button>
            </div>
          </section>
          <Features />
          <footer className="py-12 text-center text-white/40 border-t border-white/10">
            <p>© 2024 Acme Corp. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  }

  if (isHero) {
    return (
      <div className="w-full h-full min-h-screen overflow-y-auto bg-white dark:bg-[#0a0a0b]">
        <Header />
        <div className="relative z-0">{children}</div>
        <div className="py-12 border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#111]">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <span className="text-xl font-bold">NETFLIX</span>
            <span className="text-xl font-bold">STRIPE</span>
            <span className="text-xl font-bold">SPOTIFY</span>
            <span className="text-xl font-bold">SLACK</span>
          </div>
        </div>
        <Features />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto bg-white dark:bg-[#0a0a0b]">
      <Header />
      <section className="py-20 px-6 text-center border-b border-slate-100 dark:border-white/5">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Integrate Seemlessly</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          See how the <span className="text-indigo-600 font-mono bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">{title}</span> component fits into a real application layout.
        </p>
      </section>
      <section className="py-24 px-6 bg-slate-50 dark:bg-[#0f0f12]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
              Live Component Demo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Interactive & Dynamic</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              This component is designed to enhance user engagement. Interact with the live example on the right to see its behavior in context.
            </p>
            <ul className="space-y-4 mb-8">
              {['Fully Responsive', 'Dark Mode Compatible', 'Smooth Animations'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={20} className="text-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Read Documentation <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-white/10 shadow-2xl p-8 md:p-12 flex items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10 w-full flex justify-center">{children}</div>
            </div>
          </div>
        </div>
      </section>
      <Features />
      <footer className="py-12 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0b] text-center text-slate-500 text-sm">
        <p>© 2024 Acme Corp. Built with Adorably.</p>
      </footer>
    </div>
  );
};

const PromptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleFavorite, isFavorite } = useApp();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const prompt = DESIGN_PROMPTS.find(p => p.id === Number(id));
  const LiveComponent = prompt ? getExampleComponent(prompt.id) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          navigate('/');
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate, isFullScreen]);

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

      {/* Full Screen Live Demo Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#050505] overflow-y-auto animate-in fade-in duration-300">
          <button
            onClick={() => setIsFullScreen(false)}
            className="fixed top-6 right-6 z-[110] p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all hover:scale-110 shadow-lg border border-white/10"
            title="Close Demo [ESC]"
          >
            <X size={24} />
          </button>
          <MockPageContext category={prompt.category} title={prompt.title}>
            {LiveComponent}
          </MockPageContext>
        </div>
      )}

      {/* Sticky Sub-Header */}
      <div className="sticky top-20 z-30 backdrop-blur-xl border-b px-4 md:px-6 h-14 flex items-center justify-between transition-colors duration-300 dark:bg-[#0a0a0b]/80 dark:border-white/5 bg-white/80 border-slate-200">
        <Link
          to="/"
          className="flex items-center gap-2 transition-colors group dark:text-slate-400 dark:hover:text-white text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs uppercase tracking-wider font-medium">Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(prompt.id)}
            className={`p-2 rounded-full border transition-all ${promptIsFavorite
                ? 'bg-pink-500/10 border-pink-500/50 text-pink-500'
                : 'dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            title="Toggle Favorite"
          >
            <Heart size={16} className={promptIsFavorite ? "fill-current" : ""} />
          </button>
          <button className="p-2 rounded-full border transition-colors dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900">
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
              onClick={() => setIsFullScreen(true)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
            >
              <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 size={18} /> View Live Demo
              </button>
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
                onClick={() => setIsFullScreen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-violet-500/20 hover:scale-105 active:scale-95 border border-violet-500"
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
    </div>
  );
};

export default PromptDetailPage;

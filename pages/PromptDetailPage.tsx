import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DESIGN_PROMPTS } from '../constants';
import { getExampleComponent } from '../components/LiveExamples';
import CodeViewer from '../components/CodeViewer';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft, Lightbulb, Accessibility, Layers, Heart, Share2, Maximize2, X,
  Zap, Shield, BarChart3, Users, Globe, Sparkles, CheckCircle2, ArrowRight,
  Play, Star, ChevronRight, Menu, Cpu, Rocket, ChevronDown
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
const LiveDemoContent: React.FC<{ prompt: any; LiveComponent: React.ReactNode; onClose: () => void }> = ({ prompt, LiveComponent, onClose }) => {
  const isHero = prompt.category === 'Hero';
  const isBackground = prompt.category === 'Background';

  if (isBackground) {
    return <BackgroundDemoContext prompt={prompt}>{LiveComponent}</BackgroundDemoContext>;
  } else if (isHero) {
    return <HeroDemoContext prompt={prompt}>{LiveComponent}</HeroDemoContext>;
  } else {
    return <ComponentDemoContext prompt={prompt}>{LiveComponent}</ComponentDemoContext>;
  }
};

// --- Background Effect Demo Context ---
const BackgroundDemoContext: React.FC<{ children: React.ReactNode; prompt: any }> = ({ children, prompt }) => {
  return (
    <div className="relative w-full min-h-full bg-slate-900">
      <div className="absolute inset-0 z-0">{children}</div>
      <div className="relative z-10">
        <SaaSHeader variant="dark" />
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles size={16} className="text-violet-400" />
            Now with AI-Powered Automation
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight max-w-4xl leading-[0.9]">
            Ship Products <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">10x Faster</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed font-light">
            The all-in-one platform for modern teams. Build, deploy, and scale your applications without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl shadow-white/20 flex items-center gap-2">
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2">
              <Play size={20} /> Watch Demo
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> 14-day free trial</div>
          </div>
        </section>
        <TrustedBySection variant="dark" />
        <FeaturesSection variant="dark" />
        <CTASection variant="dark" />
        <SaaSFooter variant="dark" />
      </div>
    </div>
  );
};

// --- Hero Component Demo Context ---
const HeroDemoContext: React.FC<{ children: React.ReactNode; prompt: any }> = ({ children, prompt }) => {
  return (
    <div className="w-full min-h-full bg-white dark:bg-[#0a0a0b]">
      <SaaSHeader />
      <div className="relative">{children}</div>
      <TrustedBySection />
      <FeaturesSection />
      <CTASection />
      <SaaSFooter />
    </div>
  );
};

// --- Regular Component Demo Context ---
const ComponentDemoContext: React.FC<{ children: React.ReactNode; prompt: any }> = ({ children, prompt }) => {
  return (
    <div className="w-full min-h-full bg-white dark:bg-[#0a0a0b]">
      <SaaSHeader />
      <section className="py-16 px-6 text-center border-b border-slate-100 dark:border-white/5 bg-gradient-to-b from-slate-50 to-white dark:from-[#0f0f12] dark:to-[#0a0a0b]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
          Interactive Component
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">{prompt.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          See how this component integrates seamlessly into a real application.
        </p>
      </section>
      <section className="py-16 px-6 bg-slate-50 dark:bg-[#0f0f12]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Built for Modern Applications</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              This component is designed with performance and accessibility in mind. Fully responsive, dark mode compatible, with smooth animations.
            </p>
            <ul className="space-y-3 mb-6">
              {['Fully Responsive Design', 'Dark Mode Compatible', 'Smooth CSS Animations', 'Accessible by Default'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-green-600 dark:text-green-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl p-6 md:p-10 flex items-center justify-center min-h-[300px]">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-xl" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="relative z-10 w-full flex justify-center">{children}</div>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <CTASection />
      <SaaSFooter />
    </div>
  );
};

// --- Shared Components ---
const SaaSHeader: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant }) => {
  const isDark = variant === 'dark';
  return (
    <header className={`w-full py-4 px-6 flex items-center justify-between border-b sticky top-0 z-50 backdrop-blur-xl ${isDark ? 'bg-slate-900/80 border-white/10' : 'bg-white/80 dark:bg-[#0a0a0b]/80 border-slate-200 dark:border-white/10'}`}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>Velocity</span>
        </div>
        <nav className={`hidden md:flex gap-5 text-sm font-medium ${isDark ? 'text-white/70' : 'text-slate-600 dark:text-slate-400'}`}>
          <a href="#" className="hover:text-violet-500 transition-colors">Product</a>
          <a href="#" className="hover:text-violet-500 transition-colors">Solutions</a>
          <a href="#" className="hover:text-violet-500 transition-colors">Pricing</a>
          <a href="#" className="hover:text-violet-500 transition-colors">Enterprise</a>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <a href="#" className={`text-sm font-medium hidden sm:block ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 dark:text-slate-300'}`}>Sign in</a>
        <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25">
          Start Free
        </button>
      </div>
    </header>
  );
};

const TrustedBySection: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant }) => {
  const isDark = variant === 'dark';
  const logos = ['STRIPE', 'VERCEL', 'NOTION', 'FIGMA', 'LINEAR'];
  return (
    <section className={`py-12 border-y ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0f0f12]'}`}>
      <div className="max-w-5xl mx-auto px-6">
        <p className={`text-center text-xs font-medium mb-6 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>TRUSTED BY 10,000+ COMPANIES</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <span key={logo} className={`text-lg font-bold tracking-wider ${isDark ? 'text-white/30' : 'text-slate-300 dark:text-white/20'}`}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant }) => {
  const isDark = variant === 'dark';
  const features = [
    { icon: Rocket, title: "Lightning Fast", desc: "Deploy in seconds with our optimized infrastructure." },
    { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II certified. End-to-end encryption." },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time insights and custom dashboards." },
    { icon: Users, title: "Team Collaboration", desc: "Built-in tools for seamless teamwork." },
    { icon: Globe, title: "Global Edge Network", desc: "200+ edge locations worldwide." },
    { icon: Cpu, title: "AI-Powered", desc: "Intelligent automation that learns and adapts." },
  ];
  return (
    <section className={`py-16 px-6 ${isDark ? 'bg-transparent' : 'bg-white dark:bg-[#0a0a0b]'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-500 font-bold text-xs uppercase tracking-wider mb-3">Features</p>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>Everything you need to scale</h2>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>
            A complete toolkit for modern development teams.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className={`p-6 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 dark:bg-[#121214] border-slate-100 dark:border-white/5'}`}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-violet-500 mb-4">
                <feature.icon size={20} />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{feature.title}</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant }) => {
  const isDark = variant === 'dark';
  return (
    <section className={`py-16 px-6 ${isDark ? 'bg-gradient-to-b from-transparent to-slate-900' : 'bg-gradient-to-b from-violet-600 to-purple-700'}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to ship faster?</h2>
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
          Join thousands of developers who have transformed their deployment workflow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
};

const SaaSFooter: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant }) => {
  const isDark = variant === 'dark';
  return (
    <footer className={`py-12 px-6 border-t ${isDark ? 'bg-slate-900 border-white/10' : 'bg-slate-50 dark:bg-[#0a0a0b] border-slate-200 dark:border-white/5'}`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900 dark:text-white'}`}>Velocity</span>
        </div>
        <p className={`text-sm ${isDark ? 'text-white/40' : 'text-slate-500'}`}>© 2025 Velocity, Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className={`text-sm hover:text-violet-500 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Twitter</a>
          <a href="#" className={`text-sm hover:text-violet-500 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>GitHub</a>
          <a href="#" className={`text-sm hover:text-violet-500 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Discord</a>
        </div>
      </div>
    </footer>
  );
};

export default PromptDetailPage;

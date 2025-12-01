'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Layers, MousePointer2, Search as SearchIcon, Bell, Check, X, Code, Terminal, Star, ChevronDown, ChevronRight, Info, Play, ArrowRight, Layout, Monitor, Smartphone, Globe, CheckCircle } from 'lucide-react';

// --- Utility ---
export const ExampleContainer = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`w-full h-full min-h-[300px] flex items-center justify-center dark:bg-[#0a0a0b] bg-slate-50 overflow-hidden relative transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

// --- 1. Glassmorphism Card ---
export const GlassCardExample = () => {
  return (
    <ExampleContainer>
      <div className="relative w-64 h-80 group">
        <div className="absolute inset-0 rounded-[24px] p-[3px] bg-[linear-gradient(45deg,#ff006e,#8338ec,#3a86ff,#ff006e)] bg-[length:300%_300%] animate-gradient-rotate opacity-80 dark:opacity-100">
             <div className="w-full h-full rounded-[22px] dark:bg-[#0a0a0b] bg-white"></div>
        </div>
        <div className="absolute inset-[3px] rounded-[22px] dark:bg-white/5 bg-white/40 backdrop-blur-xl p-6 flex flex-col justify-between shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] border border-white/20 dark:border-transparent">
            <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xl mb-6 shadow-lg shadow-violet-500/20">⚡</div>
                <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-2 font-sans">Analytics Pro</h3>
                <p className="dark:text-white/60 text-slate-600 text-sm">Real-time insights and custom dashboards for your team.</p>
            </div>
            <div className="flex gap-2 text-[10px] font-mono dark:text-white/30 text-slate-400 uppercase">
                <span>$29/mo</span> • <span>Pro Plan</span>
            </div>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 2. Bento Grid ---
export const BentoGridExample = () => {
  return (
    <ExampleContainer>
      <div className="grid grid-cols-3 grid-rows-3 gap-3 w-64 h-64 perspective-1000">
        <div className="col-span-2 row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 text-white shadow-lg transform-gpu transition-all duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-2xl z-10 cursor-pointer flex items-end font-bold text-lg">Main</div>
        <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"></div>
        <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"></div>
        <div className="row-span-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"></div>
        <div className="col-span-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"></div>
      </div>
    </ExampleContainer>
  );
};

// --- 3. Parallax Hero ---
export const ParallaxHeroExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset({ x, y });
  };

  return (
    <ExampleContainer>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setOffset({ x: 0, y: 0 })}
        className="relative w-full h-full bg-gradient-to-br dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f0f23] from-slate-100 via-slate-200 to-slate-300 overflow-hidden flex items-center justify-center cursor-default"
      >
        <span className="absolute text-5xl font-black dark:text-white/5 text-slate-900/5 transition-transform duration-100 ease-out select-none scale-125" style={{ transform: `translate(${offset.x * 20}px, ${offset.y * 20}px) scale(1.3)` }}>VELOCITY</span>
        <span className="absolute text-5xl font-black dark:text-white/10 text-slate-900/10 transition-transform duration-100 ease-out select-none scale-110" style={{ transform: `translate(${offset.x * 40}px, ${offset.y * 40}px) scale(1.15)` }}>VELOCITY</span>
        <span className="absolute text-5xl font-black dark:text-white text-slate-900 transition-transform duration-100 ease-out select-none dark:drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] drop-shadow-xl" style={{ transform: `translate(${offset.x * 80}px, ${offset.y * 80}px)` }}>VELOCITY</span>
      </div>
    </ExampleContainer>
  );
};

// --- 4. Orbital Cards ---
export const OrbitalCardsExample = () => {
  return (
    <ExampleContainer>
      <div className="relative w-64 h-64 flex items-center justify-center group">
         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 z-10 flex items-center justify-center text-2xl dark:shadow-[0_0_60px_rgba(131,56,236,0.4)] shadow-xl shadow-violet-500/20">✨</div>
         <div className="absolute w-56 h-56 border border-dashed dark:border-white/10 border-slate-300 rounded-full"></div>
         {[0, 1, 2, 3].map((i) => (
             <div 
                key={i} 
                className="absolute inset-0 animate-orbit group-hover:[animation-play-state:paused]"
                style={{ animationDelay: `${i * -3}s` }}
             >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 dark:bg-white/10 bg-white/80 backdrop-blur-md rounded-full border dark:border-white/20 border-slate-200 shadow-sm rotate-90"></div>
             </div>
         ))}
      </div>
    </ExampleContainer>
  );
};

// --- 5. Comparison Slider ---
export const ComparisonSliderExample = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, x)));
  };

  return (
    <ExampleContainer>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full cursor-ew-resize select-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#1a1a2e] flex items-center justify-center">
            <div className="text-center">
                <div className="text-4xl mb-2">🌙</div>
                <h3 className="text-white font-bold">Dark</h3>
            </div>
        </div>
        <div 
            className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
             <div className="text-center">
                <div className="text-4xl mb-2">☀️</div>
                <h3 className="text-slate-800 font-bold">Light</h3>
            </div>
        </div>
        <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20" style={{ left: `${sliderPos}%` }}>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-lg">↔</div>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 6. Stacked Carousel ---
export const StackedCarouselExample = () => {
    const [index, setIndex] = useState(0);
    const cards = [
        { color: 'from-pink-500 to-rose-500', icon: '🎨', title: 'Design' },
        { color: 'from-violet-500 to-purple-500', icon: '💻', title: 'Code' },
        { color: 'from-cyan-500 to-blue-500', icon: '🚀', title: 'Ship' },
        { color: 'from-emerald-400 to-green-500', icon: '📈', title: 'Grow' },
    ];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIndex((prev) => (prev + 1) % cards.length);
    };

    return (
        <ExampleContainer>
            <div className="relative w-48 h-64 perspective-1000 cursor-pointer" onClick={handleNext}>
                {cards.map((card, i) => {
                    const offset = (i - index + cards.length) % cards.length;
                    
                    return (
                        <div
                            key={i}
                            className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br ${card.color} transition-all duration-500 ease-out border dark:border-white/10 border-white/20 shadow-xl`}
                            style={{
                                zIndex: cards.length - offset,
                                transform: `translateY(${-offset * 12}px) scale(${1 - offset * 0.05})`,
                                opacity: 1 - offset * 0.2,
                            }}
                        >
                            <span className="text-4xl drop-shadow-md">{card.icon}</span>
                            <h3 className="text-2xl font-bold text-white drop-shadow-md">{card.title}</h3>
                        </div>
                    );
                })}
            </div>
        </ExampleContainer>
    );
};

// --- 7. Morphing Blob ---
export const MorphingBlobExample = () => {
  return (
    <ExampleContainer className="dark:bg-[#0f0f1a] bg-white">
      <div className="relative w-full h-full overflow-hidden">
        {/* Dark Mode Blobs (Screen blend) */}
        <div className="hidden dark:block">
            <div className="absolute top-[-20%] left-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-morph animate-blob-drift"></div>
            <div className="absolute top-[30%] right-[10%] w-56 h-56 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-morph animate-blob-drift [animation-delay:-4s] [animation-direction:reverse]"></div>
            <div className="absolute bottom-[-10%] left-[30%] w-60 h-60 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-morph animate-blob-drift [animation-delay:-2s]"></div>
        </div>

        {/* Light Mode Blobs (Multiply blend or just opacity) */}
        <div className="block dark:hidden">
             <div className="absolute top-[-20%] left-0 w-64 h-64 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-morph animate-blob-drift"></div>
            <div className="absolute top-[30%] right-[10%] w-56 h-56 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-morph animate-blob-drift [animation-delay:-4s] [animation-direction:reverse]"></div>
            <div className="absolute bottom-[-10%] left-[30%] w-60 h-60 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-morph animate-blob-drift [animation-delay:-2s]"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl font-bold dark:text-white text-slate-800 text-center z-10">Unleash Your<br/>Creativity</h3>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 8. Text Reveal ---
export const TextRevealExample = () => {
    const [key, setKey] = useState(0);

    return (
        <ExampleContainer>
            <div 
                className="flex gap-2 font-black text-3xl cursor-pointer" 
                onClick={(e) => { e.stopPropagation(); setKey(k => k+1); }}
            >
                {['Build', 'Something', 'Epic'].map((word, i) => (
                    <span 
                        key={`${key}-${i}`}
                        className="bg-gradient-to-br dark:from-white dark:to-violet-300 from-slate-900 to-violet-600 bg-clip-text text-transparent opacity-0 animate-reveal-word"
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <p className="absolute bottom-4 text-xs dark:text-slate-500 text-slate-400">Click to replay</p>
        </ExampleContainer>
    );
};

// --- 9. Isometric Grid ---
export const IsometricGridExample = () => {
    return (
        <ExampleContainer>
            <div className="flex gap-6 [transform:rotateX(10deg)] perspective-1000 py-10">
                {[
                    { color: 'bg-blue-500', side: 'bg-blue-600', front: 'bg-blue-700', price: '$9' },
                    { color: 'bg-violet-500', side: 'bg-violet-600', front: 'bg-violet-700', price: '$29' },
                ].map((card, i) => (
                    <div key={i} className="relative w-24 h-32 preserve-3d [transform:rotateX(55deg)_rotateZ(-45deg)] hover:[transform:rotateX(55deg)_rotateZ(-45deg)_translateZ(30px)] transition-transform duration-300 cursor-pointer group">
                        <div className={`absolute inset-0 rounded-xl flex items-center justify-center ${card.color} shadow-lg group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-shadow`}>
                            <span className="text-xl font-bold text-white">{card.price}</span>
                        </div>
                        {/* Right side (thickness) */}
                        <div className={`absolute top-full w-full h-4 origin-top [transform:rotateX(-90deg)] rounded-b ${card.side}`}></div>
                        {/* Left side (thickness) */}
                        <div className={`absolute left-full w-4 h-full origin-left [transform:rotateY(90deg)] rounded-r ${card.front}`}></div>
                    </div>
                ))}
            </div>
        </ExampleContainer>
    );
};

// --- 10. Magnetic Button ---
export const MagneticButtonExample = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  return (
    <ExampleContainer className="cursor-default" >
        <div className="absolute inset-0" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })}></div>
        <button
            ref={btnRef}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            className="relative px-8 py-3 bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-full font-bold text-lg transition-transform duration-100 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(131,56,236,0.6)] animate-pulse-glow z-20 pointer-events-none"
        >
            Get Started Free
        </button>
    </ExampleContainer>
  );
};

// --- 11. Scrolling Marquee ---
export const ScrollingMarqueeExample = () => {
    return (
        <ExampleContainer>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
                <div className="flex gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
                    {[1,2,3,4].map(i => (
                        <React.Fragment key={i}>
                            <span className="text-2xl font-bold dark:text-white/80 text-slate-700">STRIPE</span>
                            <span className="text-violet-500">•</span>
                            <span className="text-2xl font-bold dark:text-white/80 text-slate-700">VERCEL</span>
                            <span className="text-violet-500">•</span>
                            <span className="text-2xl font-bold dark:text-white/80 text-slate-700">NOTION</span>
                            <span className="text-violet-500">•</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </ExampleContainer>
    )
}

// --- 12. Layered Paper ---
export const LayeredPaperExample = () => {
    return (
        <ExampleContainer>
            <div className="relative w-64 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center z-20 text-center">
                     <div>
                        <h3 className="text-xl font-bold text-white">Enterprise</h3>
                        <p className="text-white/60 text-xs">Unlimited everything</p>
                     </div>
                </div>
                <div className="absolute left-0 right-0 bottom-0 h-20 bg-white/10 [clip-path:ellipse(80%_100%_at_50%_100%)]"></div>
                <div className="absolute left-0 right-0 bottom-0 h-14 bg-white/15 [clip-path:ellipse(70%_100%_at_50%_100%)]"></div>
                <div className="absolute left-0 right-0 bottom-0 h-8 bg-white/20 [clip-path:ellipse(60%_100%_at_50%_100%)]"></div>
                <div className="absolute left-0 right-0 top-0 h-14 bg-black/20 [clip-path:ellipse(90%_100%_at_50%_0%)]"></div>
            </div>
        </ExampleContainer>
    )
}

// --- 13. Spotlight Cursor ---
export const SpotlightCursorExample = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ExampleContainer>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0)}
        className="relative w-full h-full flex items-center justify-center cursor-none group transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-violet-500 flex items-center justify-center">
            <h3 className="text-4xl font-black text-white tracking-widest">DISCOVER</h3>
        </div>
        <div 
            className="absolute inset-0 dark:bg-[#0a0a0b] bg-slate-50 pointer-events-none transition-opacity duration-100"
            style={{
                maskImage: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, transparent 0%, black 100%)`,
                WebkitMaskImage: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, transparent 0%, black 100%)`,
                opacity: opacity ? 1 : 1 
            }}
        ></div>
         {/* Visible Hint in Light Mode */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 dark:opacity-0 transition-opacity">
            <p className="text-sm font-mono uppercase tracking-widest text-slate-500">Hover to reveal</p>
         </div>
      </div>
    </ExampleContainer>
  );
};

// --- 14. Flip Card ---
export const FlipCardExample = () => {
    return (
        <ExampleContainer>
            <div className="flex flex-col items-center group cursor-pointer" style={{ perspective: '1000px' }}>
                <div className="relative w-40 h-56 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front */}
                    <div className="absolute inset-0 rounded-xl p-6 bg-gradient-to-br from-cyan-500 to-blue-500 flex flex-col justify-between shadow-xl [backface-visibility:hidden]">
                         <span className="text-3xl text-white">📊</span>
                         <h4 className="text-white font-bold">Analytics</h4>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 rounded-xl p-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 flex flex-col justify-between shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                         <span className="text-3xl text-white">📈</span>
                         <h4 className="text-white font-bold">+340% Growth</h4>
                    </div>
                </div>
                {/* Reflection */}
                <div className="w-40 h-16 mt-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-30 blur-sm [transform:scaleY(-1)_perspective(1000px)_rotateX(40deg)] [mask-image:linear-gradient(to_bottom,black,transparent)] transition-colors duration-700 group-hover:from-fuchsia-500 group-hover:to-purple-600"></div>
            </div>
        </ExampleContainer>
    )
}

// --- 15. Mesh Gradient ---
export const MeshGradientExample = () => {
    return (
        <ExampleContainer className="dark:bg-[#0a0a0b] bg-white">
            <div className="relative w-full h-full overflow-hidden">
                {/* Dark Mode */}
                <div className="hidden dark:block">
                     <div className="absolute top-[-30%] left-[-10%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,0,110,0.7)_0%,transparent_70%)] filter blur-3xl animate-[drift_20s_ease-in-out_infinite]"></div>
                    <div className="absolute top-[20%] right-[-5%] w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(131,56,236,0.6)_0%,transparent_70%)] filter blur-3xl animate-[drift_25s_ease-in-out_infinite_reverse]"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(58,134,255,0.5)_0%,transparent_70%)] filter blur-3xl animate-[drift_22s_ease-in-out_infinite]" style={{ animationDelay: '-10s' }}></div>
                </div>

                {/* Light Mode */}
                <div className="block dark:hidden">
                    <div className="absolute top-[-30%] left-[-10%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,0,110,0.3)_0%,transparent_70%)] filter blur-3xl animate-[drift_20s_ease-in-out_infinite]"></div>
                    <div className="absolute top-[20%] right-[-5%] w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(131,56,236,0.2)_0%,transparent_70%)] filter blur-3xl animate-[drift_25s_ease-in-out_infinite_reverse]"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(58,134,255,0.2)_0%,transparent_70%)] filter blur-3xl animate-[drift_22s_ease-in-out_infinite]" style={{ animationDelay: '-10s' }}></div>
                </div>

                 <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold dark:text-white text-slate-800 drop-shadow-lg">Ship Faster</h3>
                 </div>
            </div>
            <style>{`
                @keyframes drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(30px, -20px) scale(1.05); }
                    50% { transform: translate(-20px, 20px) scale(0.95); }
                    75% { transform: translate(20px, 30px) scale(1.02); }
                }
            `}</style>
        </ExampleContainer>
    )
}

// --- 16. Aurora Text ---
export const AuroraTextExample = () => {
  return (
    <ExampleContainer>
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-[linear-gradient(45deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] bg-[length:200%_auto] animate-[aurora_3s_linear_infinite] dark:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        VELOCITY
      </h1>
      <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </ExampleContainer>
  );
};

// --- 17. Cyberpunk Glitch Text ---
export const GlitchTextExample = () => {
  return (
    <ExampleContainer>
      <div className="relative group cursor-default">
        <h1 className="text-5xl font-black tracking-wider text-white relative z-10 mix-blend-difference">LAUNCH_</h1>
        <h1 className="text-5xl font-black tracking-wider text-cyan-500 absolute top-0 left-0 -translate-x-1 animate-glitch opacity-70">LAUNCH_</h1>
        <h1 className="text-5xl font-black tracking-wider text-pink-500 absolute top-0 left-0 translate-x-1 animate-glitch opacity-70 [animation-delay:-0.5s]">LAUNCH_</h1>
      </div>
    </ExampleContainer>
  );
};

// --- 18. Neumorphic Soft UI ---
export const NeumorphicSwitchExample = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <ExampleContainer className="dark:bg-[#2d2d2d] bg-[#e0e5ec]">
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
          className={`w-20 h-10 rounded-full p-1 transition-all duration-300 flex items-center ${isOn ? 'dark:shadow-[inset_3px_3px_6px_#1e1e1e,inset_-3px_-3px_6px_#3c3c3c] shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff] dark:bg-[#2d2d2d] bg-[#e0e5ec]' : 'dark:shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#3c3c3c] shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_#ffffff] dark:bg-[#2d2d2d] bg-[#e0e5ec]'}`}
        >
          <div className={`w-8 h-8 rounded-full transition-all duration-300 transform shadow-md ${isOn ? 'translate-x-10 bg-cyan-400 shadow-cyan-400/50' : 'translate-x-0 bg-slate-400 dark:bg-slate-500'}`}></div>
        </button>
        <span className={`text-sm font-medium transition-colors ${isOn ? 'text-cyan-500 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`}>
          {isOn ? 'ON' : 'OFF'}
        </span>
      </div>
    </ExampleContainer>
  );
};

// --- 19. Holographic Foil Card ---
export const HolographicCardExample = () => {
  return (
    <ExampleContainer>
      <div className="w-48 h-64 rounded-xl bg-slate-800 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity bg-[linear-gradient(135deg,transparent_20%,rgba(255,255,255,0.4)_25%,transparent_30%,rgba(255,255,255,0.4)_35%,transparent_100%)] bg-[length:200%_200%] animate-shine"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-2xl rotate-45">PRO</div>
      </div>
    </ExampleContainer>
  );
};

// --- 20. Typewriter Effect ---
export const TypewriterExample = () => {
  return (
    <ExampleContainer>
      <div className="font-mono text-xl dark:text-green-400 text-slate-800 border-r-2 border-current animate-[typewriter_2s_steps(22)_forwards,blink_0.7s_infinite]">
        console.log("Hello!");
      </div>
      <style>{`
        @keyframes typewriter {
          from { width: 0; }
          to { width: 22ch; }
        }
        @keyframes blink {
          0%, 100% { border-color: currentColor; }
          50% { border-color: transparent; }
        }
      `}</style>
    </ExampleContainer>
  );
};

// --- 21. Magic Border Beam ---
export const MagicBorderBeamExample = () => {
  return (
    <ExampleContainer>
      <div className="relative w-64 h-40 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-[-2px] flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <div className="w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#8b5cf6_350deg,#ec4899_360deg)] opacity-70"></div>
        </div>
        <div className="absolute inset-[2px] bg-slate-900 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">Deploy Now</span>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 22. Grid Beams ---
export const GridBeamsExample = () => {
  return (
    <ExampleContainer>
      <div className="relative w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute top-1/2 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-beam"></div>
        <div className="absolute top-1/4 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-beam [animation-direction:reverse]"></div>
      </div>
    </ExampleContainer>
  );
};

// --- 23. Meteor Shower ---
export const MeteorShowerExample = () => {
  return (
    <ExampleContainer className="bg-slate-900">
        {[...Array(5)].map((_, i) => (
            <div 
                key={i}
                className="absolute w-[2px] h-[100px] bg-gradient-to-b from-white to-transparent animate-meteor"
                style={{ 
                    left: `${20 + i * 15}%`, 
                    top: '-10%', 
                    animationDelay: `${i * 0.8}s` 
                }}
            ></div>
        ))}
    </ExampleContainer>
  );
};

// --- 24. Sparkles Effect ---
export const SparklesExample = () => {
  return (
    <ExampleContainer>
        <button 
          className="relative px-6 py-3 bg-slate-800 text-white rounded-lg font-bold group"
          onClick={(e) => e.stopPropagation()}
        >
            AI Magic
            <Star className="absolute -top-2 -right-2 text-yellow-400 w-4 h-4 animate-bounce" />
            <Star className="absolute bottom-1 -left-3 text-cyan-400 w-3 h-3 animate-pulse" />
        </button>
    </ExampleContainer>
  );
};

// --- 25. Dock Zoom ---
export const DockZoomExample = () => {
    return (
        <ExampleContainer>
            <div className="flex items-end gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 bg-slate-500 rounded-lg hover:w-14 hover:h-14 transition-all duration-200 cursor-pointer origin-bottom"></div>
                ))}
            </div>
        </ExampleContainer>
    )
}

// --- 26. Skeleton Shimmer ---
export const SkeletonShimmerExample = () => {
    return (
        <ExampleContainer>
            <div className="w-64 p-4 border border-slate-200 dark:border-white/10 rounded-xl space-y-3">
                <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
            </div>
        </ExampleContainer>
    )
}

// --- 27. Radar Pulse ---
export const RadarPulseExample = () => {
    return (
        <ExampleContainer>
            <div className="relative flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full z-10"></div>
                <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute w-16 h-16 border border-red-500/50 rounded-full animate-pulse"></div>
                <div className="absolute w-32 h-32 border border-red-500/30 rounded-full animate-pulse [animation-delay:0.5s]"></div>
            </div>
        </ExampleContainer>
    )
}

// --- 28. Ripple Button ---
export const RippleButtonExample = () => {
    const [ripples, setRipples] = useState<{x: number; y: number; id: number}[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples(prev => [...prev, {x, y, id}]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    };

    return (
        <ExampleContainer>
            <button
                className="relative overflow-hidden px-8 py-3 bg-blue-600 text-white rounded-full font-bold active:scale-95 transition-transform"
                onClick={handleClick}
            >
                Try Free
                {ripples.map(ripple => (
                    <span
                        key={ripple.id}
                        className="absolute bg-white/30 rounded-full animate-[ripple_0.6s_ease-out]"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}
            </button>
            <style>{`
                @keyframes ripple {
                    0% { width: 0; height: 0; opacity: 0.5; }
                    100% { width: 200px; height: 200px; opacity: 0; }
                }
            `}</style>
        </ExampleContainer>
    )
}

// --- 29. Sliding Tabs ---
export const SlidingTabsExample = () => {
    const [active, setActive] = useState(0);
    const tabs = ['Overview', 'Analytics', 'Settings'];
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    return (
        <ExampleContainer>
            <div className="relative flex bg-slate-200 dark:bg-slate-800 rounded-full p-1">
                {tabs.map((tab, i) => (
                    <button
                        key={tab}
                        ref={el => { tabRefs.current[i] = el; }}
                        onClick={(e) => { e.stopPropagation(); setActive(i); }}
                        className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors ${active === i ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}
                    >
                        {tab}
                    </button>
                ))}
                <div
                    className="absolute top-1 bottom-1 bg-white dark:bg-slate-600 rounded-full shadow-sm transition-all duration-300"
                    style={{
                        left: `calc(${(100 / tabs.length) * active}% + 4px)`,
                        width: `calc(${100 / tabs.length}% - 8px)`,
                    }}
                ></div>
            </div>
        </ExampleContainer>
    )
}

// --- 30. Stacked Notifications ---
export const StackedNotificationsExample = () => {
    return (
        <ExampleContainer>
            <div className="relative w-64 h-32 flex flex-col items-center justify-end pb-4">
                <div className="absolute w-56 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bottom-8 scale-90 opacity-60 z-0"></div>
                <div className="absolute w-60 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bottom-4 scale-95 opacity-80 z-10"></div>
                <div className="relative w-64 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 flex items-center px-4 gap-3 z-20">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={16}/></div>
                    <div className="text-sm dark:text-white"><span className="font-bold">Deployed!</span> Live in 2s.</div>
                </div>
            </div>
        </ExampleContainer>
    )
}

// --- 31. Blur Focus Cards ---
export const BlurFocusCardsExample = () => {
    return (
        <ExampleContainer>
            <div className="flex -space-x-4 hover:space-x-4 transition-all duration-300 group">
                {[1,2,3].map(i => (
                    <div key={i} className="w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:!scale-110 hover:z-10"></div>
                ))}
            </div>
        </ExampleContainer>
    )
}

// --- 32. Interactive Grid Pattern ---
export const InteractiveGridPatternExample = () => {
    const [activeSquares, setActiveSquares] = useState<Set<number>>(new Set());

    const handleMouseEnter = (index: number) => {
        setActiveSquares(prev => new Set([...prev, index]));
        setTimeout(() => {
            setActiveSquares(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        }, 1000);
    };

    return (
        <ExampleContainer>
             <div className="grid grid-cols-12 gap-0.5 p-4 rounded-xl dark:bg-[#0f0f1a] bg-slate-100 border dark:border-white/10 border-slate-200 shadow-inner overflow-hidden">
                {[...Array(144)].map((_, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => handleMouseEnter(i)}
                        className={`w-3 h-3 rounded-[1px] transition-all duration-500 cursor-crosshair ${
                            activeSquares.has(i)
                                ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                                : 'dark:bg-white/5 bg-slate-300/50'
                        }`}
                    ></div>
                ))}
             </div>
        </ExampleContainer>
    )
}

// --- 33. Button Shine Sweep ---
export const ButtonShineSweepExample = () => {
    return (
        <ExampleContainer>
            <button
                className="relative px-8 py-3 bg-slate-900 text-white font-bold rounded-lg overflow-hidden group"
                onClick={(e) => e.stopPropagation()}
            >
                Get Started
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-[shine_0.8s_ease-in-out]"></div>
            </button>
            <style>{`
                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            `}</style>
        </ExampleContainer>
    )
}

// --- 34. Sun/Moon Toggle ---
export const SunMoonToggleExample = () => {
    const [isDark, setIsDark] = useState(false);
    return (
        <ExampleContainer className={`${isDark ? 'bg-slate-900' : 'bg-sky-100'}`}>
            <button 
                onClick={(e) => { e.stopPropagation(); setIsDark(!isDark); }} 
                className="relative w-16 h-8 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors p-1"
            >
                <div className={`w-6 h-6 rounded-full shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-8 bg-slate-900' : 'translate-x-0 bg-yellow-400'}`}>
                    {isDark ? <div className="absolute top-1 right-1 w-2 h-2 bg-slate-700 rounded-full"></div> : null}
                </div>
            </button>
        </ExampleContainer>
    )
}

// --- 35. Dot Pulse Loader ---
export const DotPulseLoaderExample = () => {
    return (
        <ExampleContainer>
            <div className="flex gap-2 items-center">
                {[0, 150, 300].map((delay) => (
                    <div
                        key={delay}
                        className="w-4 h-4 bg-violet-500 rounded-full animate-[dotPulse_1s_ease-in-out_infinite]"
                        style={{ animationDelay: `${delay}ms` }}
                    ></div>
                ))}
            </div>
            <style>{`
                @keyframes dotPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(0.5); opacity: 0.5; }
                }
            `}</style>
        </ExampleContainer>
    )
}

// --- 36. Circular Progress ---
export const CircularProgressExample = () => {
    return (
        <ExampleContainer>
            <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-white/10" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="60" className="text-violet-500" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xl dark:text-white text-slate-800">75%</div>
            </div>
        </ExampleContainer>
    )
}

// --- 37. Wave Footer ---
export const WaveFooterExample = () => {
    return (
        <ExampleContainer>
            <div className="w-full h-32 bg-blue-500 relative mt-auto flex items-end overflow-hidden">
                <div className="w-[200%] h-full bg-white/20 absolute bottom-0 animate-shimmer" style={{ clipPath: 'polygon(0 40%, 100% 60%, 100% 100%, 0% 100%)' }}></div>
                <div className="w-[200%] h-full bg-white/30 absolute bottom-0 animate-shimmer [animation-duration:3s]" style={{ clipPath: 'polygon(0 50%, 100% 40%, 100% 100%, 0% 100%)' }}></div>
            </div>
        </ExampleContainer>
    )
}

// --- 38. Code Typing ---
export const CodeTypingExample = () => {
    return (
        <ExampleContainer>
            <div className="w-64 h-40 bg-slate-900 rounded-lg border border-slate-700 p-4 font-mono text-xs">
                <div className="flex gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="text-green-400 overflow-hidden whitespace-nowrap border-r-2 border-green-400 animate-[codeType_2.5s_steps(19)_forwards,codeBlink_0.7s_infinite]">
                    npx velocity deploy
                </div>
            </div>
            <style>{`
                @keyframes codeType {
                    from { width: 0; }
                    to { width: 19ch; }
                }
                @keyframes codeBlink {
                    0%, 100% { border-color: #4ade80; }
                    50% { border-color: transparent; }
                }
            `}</style>
        </ExampleContainer>
    )
}

// --- 39. Avatar Stack ---
export const AvatarStackExample = () => {
    return (
        <ExampleContainer>
            <div className="flex items-center pl-3">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0f0f1a] bg-slate-300 -ml-3 hover:translate-y-[-4px] transition-transform cursor-pointer relative z-0 hover:z-10">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full rounded-full" />
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0f0f1a] bg-slate-100 flex items-center justify-center text-xs font-bold -ml-3 z-0">+9</div>
            </div>
        </ExampleContainer>
    )
}

// --- 40. Breadcrumb Collapse ---
export const BreadcrumbCollapseExample = () => {
    return (
        <ExampleContainer>
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Home</span>
                <ChevronRight size={14} />
                <span className="w-4 overflow-hidden whitespace-nowrap group hover:w-auto hover:bg-slate-100 rounded px-1 transition-all cursor-pointer">...</span>
                <ChevronRight size={14} />
                <span className="font-semibold text-slate-900 dark:text-white">Current Page</span>
            </div>
        </ExampleContainer>
    )
}

// --- 41. Badge Pulse ---
export const BadgePulseExample = () => {
    return (
        <ExampleContainer>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium border border-green-200 dark:border-green-800">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-[badgePing_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Live Status
            </span>
            <style>{`
                @keyframes badgePing {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
            `}</style>
        </ExampleContainer>
    )
}

// --- 42. Input Focus Expand ---
export const InputFocusExpandExample = () => {
    return (
        <ExampleContainer>
            <input 
                type="text" 
                placeholder="Focus me..." 
                className="w-32 focus:w-64 transition-all duration-300 px-4 py-2 rounded-lg border focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none bg-white dark:bg-white/5" 
                onClick={(e) => e.stopPropagation()}
            />
        </ExampleContainer>
    )
}

// --- 43. Search Bar Expand ---
export const SearchBarExpandExample = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <ExampleContainer>
            <div className={`flex items-center justify-center ${expanded ? 'w-64 px-3' : 'w-10'} h-10 bg-white dark:bg-white/10 rounded-full shadow-sm border dark:border-white/20 border-slate-200 transition-all duration-300 overflow-hidden`}>
                <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                    className={`shrink-0 flex items-center justify-center ${expanded ? '' : 'w-full h-full'}`}
                >
                    <SearchIcon size={18} className="text-slate-500" />
                </button>
                {expanded && (
                    <>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="ml-2 bg-transparent outline-none text-sm w-full dark:text-white text-slate-700"
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                        <button onClick={(e) => { e.stopPropagation(); setExpanded(false); }}>
                            <X size={14} className="text-slate-400 hover:text-slate-600" />
                        </button>
                    </>
                )}
            </div>
        </ExampleContainer>
    )
}

// --- 44. Tooltip Animated ---
export const TooltipAnimatedExample = () => {
    return (
        <ExampleContainer>
            <div className="relative group">
                <Info size={24} className="text-slate-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap pointer-events-none">
                    Helpful information here
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                </div>
            </div>
        </ExampleContainer>
    )
}

// --- 45. Accordion Spring ---
export const AccordionSpringExample = () => {
    const [open, setOpen] = useState(false);
    return (
        <ExampleContainer>
            <div className="w-64 border rounded-lg bg-white dark:bg-white/5 overflow-hidden">
                <button 
                    onClick={(e) => { e.stopPropagation(); setOpen(!open); }} 
                    className="w-full px-4 py-3 flex items-center justify-between font-medium"
                >
                    Click to toggle
                    <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${open ? 'max-h-24' : 'max-h-0'}`}>
                    <p className="px-4 pb-4 text-sm text-slate-500">
                        This content springs open smoothly. Great for FAQs or menus.
                    </p>
                </div>
            </div>
        </ExampleContainer>
    )
}

// --- 46. Perspective Dashboard ---
export const PerspectiveDashboardExample = () => {
  return (
    <ExampleContainer className="perspective-1000">
      <div className="relative w-80 h-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xl animate-float [transform:rotateX(20deg)_rotateY(-10deg)_rotateZ(2deg)]">
         <div className="absolute inset-x-0 top-0 h-8 border-b dark:border-white/10 border-slate-200 flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
         </div>
         <div className="p-4 pt-10 grid grid-cols-2 gap-3">
             <div className="h-20 bg-slate-100 dark:bg-white/5 rounded-lg"></div>
             <div className="h-20 bg-slate-100 dark:bg-white/5 rounded-lg"></div>
             <div className="col-span-2 h-16 bg-slate-100 dark:bg-white/5 rounded-lg"></div>
         </div>
      </div>
    </ExampleContainer>
  );
};

// --- 47. Floating Phone ---
export const FloatingPhoneExample = () => {
  return (
    <ExampleContainer>
        <div className="w-48 h-80 bg-black rounded-[30px] p-2 shadow-2xl animate-float border-[4px] border-slate-800">
            <div className="w-full h-full bg-slate-900 rounded-[24px] overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center">
                    <div className="w-16 h-4 bg-black rounded-b-xl"></div>
                </div>
                <div className="p-4 pt-10 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/10"></div>
                    <div className="w-3/4 h-4 bg-white/10 rounded"></div>
                    <div className="w-1/2 h-4 bg-white/10 rounded"></div>
                    <div className="w-full h-24 bg-white/5 rounded-xl mt-4"></div>
                </div>
            </div>
        </div>
    </ExampleContainer>
  );
};

// --- 48. Retro Grid ---
export const RetroGridExample = () => {
  return (
    <ExampleContainer className="dark:bg-[#050510] bg-indigo-950 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,#a855f7_100%)] opacity-20"></div>
        <div className="absolute inset-0 perspective-1000">
             <div className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom h-[200%] -top-[50%] bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-flow"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#050510] h-full"></div>
        <h1 className="relative z-10 text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-400 to-purple-700 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">FUTURE</h1>
    </ExampleContainer>
  );
};

// --- 49. Modern SaaS Hero ---
export const ModernSaaSHeroExample = () => {
    return (
        <ExampleContainer className="flex-col dark:bg-slate-950 bg-slate-50">
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                 {/* Background gradient */}
                 <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>

                 <div className="relative z-10">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold mb-3 border border-violet-500/30">
                         <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                         New Release 2.0
                     </div>
                     <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">
                         Build faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">AI Power</span>
                     </h1>
                     <p className="text-xs dark:text-slate-400 text-slate-600 max-w-xs mb-4">
                         Deploy your next project in seconds.
                     </p>
                     <div className="flex gap-2 mb-4 justify-center">
                         <button className="px-4 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-violet-500/25 hover:bg-violet-500 transition-colors">Get Started</button>
                         <button className="px-4 py-1.5 dark:bg-white/10 bg-white dark:text-white text-slate-700 rounded-lg text-xs font-bold border dark:border-white/20 border-slate-200 hover:bg-slate-100 dark:hover:bg-white/20 transition-colors">Docs</button>
                     </div>

                     {/* Dashboard Mockup */}
                     <div className="w-56 h-24 bg-slate-900 rounded-t-lg border-t border-x border-slate-700 shadow-2xl p-1.5 relative mx-auto">
                          <div className="w-full h-full bg-slate-800 rounded-md border border-slate-700 flex items-center justify-center">
                              <div className="flex gap-1">
                                  <div className="w-8 h-2 bg-violet-500/50 rounded"></div>
                                  <div className="w-6 h-2 bg-pink-500/50 rounded"></div>
                                  <div className="w-10 h-2 bg-blue-500/50 rounded"></div>
                              </div>
                          </div>
                     </div>
                 </div>
            </div>
        </ExampleContainer>
    )
}

// --- 50. Split Screen Hero ---
export const SplitScreenHeroExample = () => {
    return (
        <ExampleContainer>
            <div className="w-full h-full grid grid-cols-2">
                {/* Left Content */}
                <div className="p-8 flex flex-col justify-center dark:bg-[#0a0a0b] bg-white">
                    <h1 className="text-2xl font-black dark:text-white text-slate-900 mb-3 leading-tight">Design<br/>Without<br/>Limits.</h1>
                    <p className="text-xs dark:text-slate-400 text-slate-500 mb-6">Create stunning interfaces with our component library.</p>
                    <div className="flex items-center gap-2 text-xs font-bold dark:text-white text-slate-900 group cursor-pointer">
                        See Portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
                {/* Right Visual */}
                <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-bl from-pink-500 to-orange-400 opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl transform rotate-12"></div>
                    </div>
                </div>
            </div>
        </ExampleContainer>
    )
}

// --- 51. Cinematic Glow Hero ---
export const CinematicGlowHeroExample = () => {
    return (
        <ExampleContainer className="bg-black">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mix-blend-overlay opacity-90">
                    VELOCITY
                </h1>
                <p className="text-indigo-200 text-sm tracking-[0.3em] uppercase mt-2 opacity-70">Ship Products 10x Faster</p>
                <div className="mt-8 flex justify-center">
                     <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                         <Play size={16} fill="currentColor" />
                     </button>
                </div>
            </div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </ExampleContainer>
    )
}

// === NEW REUSABLE UI COMPONENT EXAMPLES (52-71) ===

import {
  MagneticButton as MagneticBtn,
  RippleButton as RippleBtn,
  GlowingText,
  TypingText,
  GlitchText,
  ParallaxCard,
  MorphingBlob,
  FloatingParticles,
  GradientBorder,
  SkeletonLoader,
  NumberCounter,
  Spotlight,
  TextReveal,
  InfiniteMarquee,
  MarqueeItem,
  RadialProgress,
  TooltipWrapper,
  SwitchToggle,
  ShimmerCard,
  HoverTilt,
  MagneticCursor,
  MagneticElement,
  // New SaaS Components (72-91)
  AnimatedPricingCard,
  TestimonialCarousel,
  TestimonialShowcase,
  AnimatedStatsCounter,
  ProcessTimeline,
  FeatureBento,
  LogoCloud,
  CTABanner,
  FeatureTabs,
  IntegrationOrbit,
  MorphingText,
  FloatingDashboard,
  AnimatedFAQ,
  ScrollRevealSection,
  GlowingCard,
  StackedCards,
  ElasticSlider,
} from './ui';

// --- 52. Magnetic Button ---
export const MagneticButtonExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex flex-col items-center gap-6">
        <MagneticBtn variant="default" magnetStrength={0.4}>
          <span className="flex items-center gap-2">✨ Magnetic Effect</span>
        </MagneticBtn>
        <MagneticBtn variant="gradient" magnetStrength={0.3}>
          Gradient Style
        </MagneticBtn>
        <MagneticBtn variant="outline" magnetStrength={0.5}>
          Outline Variant
        </MagneticBtn>
      </div>
    </ExampleContainer>
  );
};

// --- 53. Ripple Button ---
export const RippleButtonExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex flex-col items-center gap-4">
        <RippleBtn variant="primary" size="lg">
          Click for Ripple
        </RippleBtn>
        <div className="flex gap-3">
          <RippleBtn variant="success" size="md">Success</RippleBtn>
          <RippleBtn variant="danger" size="md">Danger</RippleBtn>
          <RippleBtn variant="secondary" size="md">Secondary</RippleBtn>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 54. Glowing Text ---
export const GlowingTextExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex flex-col items-center gap-6 text-center">
        <GlowingText color="violet" intensity="strong" as="h2" className="text-3xl font-bold">
          Violet Glow
        </GlowingText>
        <GlowingText color="cyan" intensity="medium" as="h2" className="text-3xl font-bold">
          Cyan Neon
        </GlowingText>
        <GlowingText color="rainbow" intensity="strong" as="h2" className="text-3xl font-bold">
          Rainbow Magic
        </GlowingText>
      </div>
    </ExampleContainer>
  );
};

// --- 55. Typing Text ---
export const TypingTextExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="text-center">
        <p className="dark:text-slate-400 text-slate-500 text-sm mb-4">I am a</p>
        <div className="text-3xl font-bold dark:text-white text-slate-900">
          <TypingText
            text={["Developer", "Designer", "Creator", "Problem Solver"]}
            speed={100}
            deleteSpeed={50}
            pauseDuration={2000}
          />
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 56. Glitch Text ---
export const GlitchTextExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex flex-col items-center gap-8">
        <GlitchText intensity="subtle" className="text-4xl font-black dark:text-white text-slate-900">
          SUBTLE
        </GlitchText>
        <GlitchText intensity="medium" color="cyan-red" className="text-4xl font-black dark:text-white text-slate-900">
          MEDIUM
        </GlitchText>
        <GlitchText intensity="intense" color="purple-green" className="text-4xl font-black dark:text-white text-slate-900">
          INTENSE
        </GlitchText>
      </div>
    </ExampleContainer>
  );
};

// --- 57. Parallax 3D Card ---
export const ParallaxCardExampleNew = () => {
  return (
    <ExampleContainer>
      <ParallaxCard intensity={15} glare shadow className="w-64">
        <div className="p-6 dark:bg-slate-900 bg-white rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 mb-4 flex items-center justify-center text-white text-xl">
            🎯
          </div>
          <h3 className="text-lg font-bold dark:text-white text-slate-900 mb-2">3D Card</h3>
          <p className="text-sm dark:text-slate-400 text-slate-500">
            Move your mouse over this card to see the parallax effect.
          </p>
        </div>
      </ParallaxCard>
    </ExampleContainer>
  );
};

// --- 58. Morphing Blob ---
export const MorphingBlobExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="relative w-full h-full flex items-center justify-center">
        <MorphingBlob color="gradient" size="lg" speed="medium" blur opacity={0.6} />
        <div className="absolute z-10 text-center">
          <h3 className="text-xl font-bold dark:text-white text-slate-900">Morphing Blob</h3>
          <p className="text-sm dark:text-slate-400 text-slate-500">Organic animation</p>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 59. Floating Particles ---
export const FloatingParticlesExampleNew = () => {
  return (
    <ExampleContainer className="bg-slate-900">
      <FloatingParticles count={40} color="mixed" speed="medium" direction="up" />
      <div className="relative z-10 text-center">
        <h3 className="text-xl font-bold text-white">Floating Particles</h3>
        <p className="text-sm text-slate-400">Ambient atmosphere</p>
      </div>
    </ExampleContainer>
  );
};

// --- 60. Gradient Border ---
export const GradientBorderExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex gap-4">
        <GradientBorder gradient="rainbow" animated speed="medium" borderWidth={2}>
          <div className="p-6 dark:bg-[#0a0a0b] bg-white rounded-xl">
            <h4 className="font-bold dark:text-white text-slate-900">Rainbow</h4>
            <p className="text-xs dark:text-slate-400 text-slate-500">Animated border</p>
          </div>
        </GradientBorder>
        <GradientBorder gradient="sunset" animated speed="slow" borderWidth={2}>
          <div className="p-6 dark:bg-[#0a0a0b] bg-white rounded-xl">
            <h4 className="font-bold dark:text-white text-slate-900">Sunset</h4>
            <p className="text-xs dark:text-slate-400 text-slate-500">Warm tones</p>
          </div>
        </GradientBorder>
      </div>
    </ExampleContainer>
  );
};

// --- 61. Skeleton Loader ---
export const SkeletonLoaderExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="w-64 p-4 dark:bg-slate-900 bg-white rounded-xl border dark:border-white/10 border-slate-200">
        <SkeletonLoader variant="rounded" height={120} className="mb-4" />
        <div className="flex items-center gap-3 mb-4">
          <SkeletonLoader variant="circular" width={40} height={40} />
          <div className="flex-1">
            <SkeletonLoader variant="text" width="70%" className="mb-2" />
            <SkeletonLoader variant="text" width="50%" height={12} />
          </div>
        </div>
        <SkeletonLoader variant="text" count={3} gap={8} />
      </div>
    </ExampleContainer>
  );
};

// --- 62. Number Counter ---
export const NumberCounterExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex gap-8 text-center">
        <div>
          <div className="text-4xl font-bold dark:text-white text-slate-900">
            <NumberCounter end={1234} duration={2000} triggerOnView={false} />
          </div>
          <p className="text-sm dark:text-slate-400 text-slate-500">Users</p>
        </div>
        <div>
          <div className="text-4xl font-bold dark:text-white text-slate-900">
            $<NumberCounter end={99} duration={1500} decimals={0} triggerOnView={false} />K
          </div>
          <p className="text-sm dark:text-slate-400 text-slate-500">Revenue</p>
        </div>
        <div>
          <div className="text-4xl font-bold dark:text-white text-slate-900">
            <NumberCounter end={99.9} duration={2500} decimals={1} triggerOnView={false} />%
          </div>
          <p className="text-sm dark:text-slate-400 text-slate-500">Uptime</p>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 63. Spotlight ---
export const SpotlightExampleNew = () => {
  return (
    <ExampleContainer>
      <Spotlight color="rgba(139, 92, 246, 0.2)" size={350} blur={100}>
        <div className="p-8 dark:bg-slate-900/50 bg-white rounded-2xl border dark:border-white/10 border-slate-200">
          <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">Spotlight Effect</h3>
          <p className="text-sm dark:text-slate-400 text-slate-500 max-w-xs">
            Move your cursor over this area to see the spotlight follow you.
          </p>
        </div>
      </Spotlight>
    </ExampleContainer>
  );
};

// --- 64. Text Reveal ---
export const TextRevealExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="text-center space-y-6">
        <TextReveal direction="up" stagger={40} triggerOnView={false} className="text-3xl font-bold dark:text-white text-slate-900">
          Words reveal one by one
        </TextReveal>
        <TextReveal direction="left" stagger={30} triggerOnView={false} className="text-lg dark:text-slate-400 text-slate-500">
          Animated text effect
        </TextReveal>
      </div>
    </ExampleContainer>
  );
};

// --- 65. Infinite Marquee ---
export const InfiniteMarqueeExampleNew = () => {
  const logos = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js', 'GraphQL', 'Next.js', 'Prisma'];
  return (
    <ExampleContainer>
      <div className="w-full">
        <InfiniteMarquee speed={30} pauseOnHover gap={32}>
          {logos.map((logo, i) => (
            <MarqueeItem key={i}>
              <span className="px-6 py-3 rounded-full dark:bg-white/5 bg-slate-100 dark:text-white text-slate-700 font-medium">
                {logo}
              </span>
            </MarqueeItem>
          ))}
        </InfiniteMarquee>
      </div>
    </ExampleContainer>
  );
};

// --- 66. Radial Progress ---
export const RadialProgressExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex gap-8 items-center">
        <RadialProgress value={75} color="violet" size={100} strokeWidth={8} />
        <RadialProgress value={50} color="gradient" size={100} strokeWidth={8} />
        <RadialProgress value={90} color="emerald" size={100} strokeWidth={8}>
          <div className="text-center">
            <span className="text-lg font-bold dark:text-white text-slate-900">A+</span>
          </div>
        </RadialProgress>
      </div>
    </ExampleContainer>
  );
};

// --- 67. Animated Tooltip ---
export const AnimatedTooltipExampleNew = () => {
  return (
    <ExampleContainer>
      <div className="flex gap-4">
        <TooltipWrapper content="Top tooltip!" position="top" variant="default">
          <button className="px-4 py-2 dark:bg-white/10 bg-slate-200 rounded-lg dark:text-white text-slate-700 font-medium">
            Hover Top
          </button>
        </TooltipWrapper>
        <TooltipWrapper content="Gradient style" position="bottom" variant="gradient">
          <button className="px-4 py-2 dark:bg-white/10 bg-slate-200 rounded-lg dark:text-white text-slate-700 font-medium">
            Hover Bottom
          </button>
        </TooltipWrapper>
        <TooltipWrapper content="Light theme" position="right" variant="light">
          <button className="px-4 py-2 dark:bg-white/10 bg-slate-200 rounded-lg dark:text-white text-slate-700 font-medium">
            Hover Right
          </button>
        </TooltipWrapper>
      </div>
    </ExampleContainer>
  );
};

// --- 68. Fancy Toggle ---
export const FancyToggleExampleNew = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(false);

  return (
    <ExampleContainer>
      <div className="flex flex-col gap-6">
        <SwitchToggle
          checked={toggle1}
          onChange={setToggle1}
          variant="default"
          size="lg"
          label="Default Style"
        />
        <SwitchToggle
          checked={toggle2}
          onChange={setToggle2}
          variant="gradient"
          size="lg"
          label="Gradient Track"
        />
        <SwitchToggle
          checked={toggle3}
          onChange={setToggle3}
          variant="glow"
          size="lg"
          label="Glow Effect"
        />
      </div>
    </ExampleContainer>
  );
};

// --- 69. Shimmer Card ---
export const ShimmerCardExampleNew = () => {
  return (
    <ExampleContainer>
      <ShimmerCard shimmerSpeed="medium" className="w-64">
        <div className="p-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 mb-4 flex items-center justify-center text-white">
            ✨
          </div>
          <h3 className="font-bold dark:text-white text-slate-900 mb-2">Shimmer Card</h3>
          <p className="text-sm dark:text-slate-400 text-slate-500">
            Watch the shimmer effect sweep across the card.
          </p>
        </div>
      </ShimmerCard>
    </ExampleContainer>
  );
};

// --- 70. 3D Hover Tilt ---
export const HoverTiltExampleNew = () => {
  return (
    <ExampleContainer>
      <HoverTilt maxTilt={15} glare glareOpacity={0.2} scale={1.05}>
        <div className="w-56 h-72 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-1">
          <div className="w-full h-full dark:bg-slate-900 bg-white rounded-xl p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"></div>
            <div>
              <h4 className="font-bold dark:text-white text-slate-900">3D Tilt</h4>
              <p className="text-xs dark:text-slate-400 text-slate-500">Hover to see effect</p>
            </div>
          </div>
        </div>
      </HoverTilt>
    </ExampleContainer>
  );
};

// --- 71. Magnetic Cursor ---
export const MagneticCursorExampleNew = () => {
  return (
    <ExampleContainer>
      <MagneticCursor cursorSize={24} cursorColor="rgba(139, 92, 246, 0.6)" trailEffect trailLength={5}>
        <div className="w-full h-full flex items-center justify-center gap-8 p-8">
          <MagneticElement>
            <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-500 transition-colors">
              Magnetic
            </button>
          </MagneticElement>
          <MagneticElement>
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white text-2xl">
              🎯
            </div>
          </MagneticElement>
          <MagneticElement>
            <button className="px-6 py-3 dark:bg-white/10 bg-slate-200 dark:text-white text-slate-700 rounded-xl font-medium">
              Element
            </button>
          </MagneticElement>
        </div>
      </MagneticCursor>
    </ExampleContainer>
  );
};

// === NEW SAAS COMPONENT EXAMPLES (72-91) ===

// --- 72. Animated Pricing Card ---
export const AnimatedPricingCardExample = () => {
  const tier = {
    name: 'Pro',
    price: '$29',
    period: 'month',
    description: 'Perfect for growing teams',
    features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom integrations'],
    highlighted: true,
    badge: 'Most Popular',
    ctaText: 'Start Free Trial',
  };
  return (
    <ExampleContainer>
      <AnimatedPricingCard tier={tier} />
    </ExampleContainer>
  );
};

// --- 73. Testimonial Showcase ---
export const TestimonialShowcaseExample = () => {
  const testimonials = [
    { id: 1, content: 'This product transformed our workflow completely. Highly recommended!', author: 'Sarah Chen', role: 'CEO', company: 'TechCorp', rating: 5 },
    { id: 2, content: 'The best investment we made this year. Support is outstanding.', author: 'Mike Johnson', role: 'CTO', company: 'StartupXYZ', rating: 5 },
    { id: 3, content: 'Simple, powerful, and reliable. Everything we needed.', author: 'Emily Davis', role: 'Product Lead', company: 'DesignCo', rating: 4 },
  ];
  return (
    <ExampleContainer>
      <div className="w-full px-4">
        <TestimonialShowcase testimonials={testimonials} variant="cards" columns={3} />
      </div>
    </ExampleContainer>
  );
};

// --- 74. Animated Stats Counter ---
export const AnimatedStatsCounterExample = () => {
  const stats = [
    { value: 10000, label: 'Users', suffix: '+', icon: <span>👥</span> },
    { value: 99, label: 'Uptime', suffix: '%', icon: <span>⚡</span> },
    { value: 50, label: 'Countries', suffix: '+', icon: <span>🌍</span> },
    { value: 4.9, label: 'Rating', icon: <span>⭐</span> },
  ];
  return (
    <ExampleContainer>
      <div className="w-full px-4">
        <AnimatedStatsCounter stats={stats} variant="cards" />
      </div>
    </ExampleContainer>
  );
};

// --- 75. Process Timeline ---
export const ProcessTimelineExample = () => {
  const steps = [
    { title: 'Sign Up', description: 'Create your account in seconds', status: 'completed' as const },
    { title: 'Configure', description: 'Set up your workspace', status: 'current' as const },
    { title: 'Integrate', description: 'Connect your tools', status: 'upcoming' as const },
    { title: 'Launch', description: 'Go live with confidence', status: 'upcoming' as const },
  ];
  return (
    <ExampleContainer>
      <div className="w-full px-8">
        <ProcessTimeline steps={steps} variant="horizontal" />
      </div>
    </ExampleContainer>
  );
};

// --- 76. Feature Bento ---
export const FeatureBentoExample = () => {
  const items = [
    { title: 'Analytics', description: 'Real-time insights', icon: <span>📊</span>, span: 'wide' as const },
    { title: 'Security', description: 'Enterprise-grade', icon: <span>🔒</span> },
    { title: 'Speed', description: 'Lightning fast', icon: <span>⚡</span> },
    { title: 'Support', description: '24/7 assistance', icon: <span>💬</span>, span: 'wide' as const },
  ];
  return (
    <ExampleContainer>
      <div className="w-full px-4 h-64">
        <FeatureBento items={items} />
      </div>
    </ExampleContainer>
  );
};

// --- 77. Logo Cloud ---
export const LogoCloudExample = () => {
  const logos = [
    { name: 'Stripe' }, { name: 'Vercel' }, { name: 'Notion' },
    { name: 'Figma' }, { name: 'Linear' }, { name: 'Slack' },
  ];
  return (
    <ExampleContainer>
      <div className="w-full">
        <LogoCloud logos={logos} variant="scroll" title="Trusted by industry leaders" />
      </div>
    </ExampleContainer>
  );
};

// --- 78. CTA Banner ---
export const CTABannerExample = () => {
  return (
    <ExampleContainer className="dark:bg-slate-950 bg-slate-100">
      <div className="w-full px-4">
        <CTABanner
          title="Ready to get started?"
          description="Join thousands already using our platform."
          primaryCTA={{ text: 'Start Free' }}
          secondaryCTA={{ text: 'Learn More' }}
          variant="gradient"
          animated={false}
        />
      </div>
    </ExampleContainer>
  );
};

// --- 79. Feature Tabs ---
export const FeatureTabsExample = () => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Layout size={16} />, content: <div className="p-8 text-center dark:text-slate-300 text-slate-600">Dashboard Content</div> },
    { id: 'analytics', label: 'Analytics', icon: <Monitor size={16} />, content: <div className="p-8 text-center dark:text-slate-300 text-slate-600">Analytics Content</div> },
    { id: 'settings', label: 'Settings', icon: <Globe size={16} />, content: <div className="p-8 text-center dark:text-slate-300 text-slate-600">Settings Content</div> },
  ];
  return (
    <ExampleContainer>
      <div className="w-full px-4">
        <FeatureTabs tabs={tabs} variant="pills" />
      </div>
    </ExampleContainer>
  );
};

// --- 80. Integration Orbit ---
export const IntegrationOrbitExample = () => {
  const integrations = [
    { id: 'slack', name: 'Slack', icon: <span>💬</span> },
    { id: 'github', name: 'GitHub', icon: <span>🐙</span> },
    { id: 'figma', name: 'Figma', icon: <span>🎨</span> },
    { id: 'notion', name: 'Notion', icon: <span>📝</span> },
    { id: 'linear', name: 'Linear', icon: <span>📋</span> },
  ];
  return (
    <ExampleContainer>
      <IntegrationOrbit integrations={integrations} orbitRadius={100} />
    </ExampleContainer>
  );
};

// --- 81. Notification Toast ---
// Note: NotificationToast uses fixed positioning, so we show a static preview here
export const NotificationToastExample = () => {
  return (
    <ExampleContainer>
      <div className="flex flex-col gap-3 w-80">
        {/* Success Toast Preview */}
        <div className="p-4 rounded-lg dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 shadow-lg border-l-4 border-l-emerald-500">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-emerald-500 mt-0.5" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold dark:text-white text-slate-900">Success!</h4>
              <p className="text-sm dark:text-slate-400 text-slate-500">Your changes have been saved.</p>
            </div>
            <button className="dark:text-slate-400 text-slate-500 hover:text-slate-700">
              <X size={16} />
            </button>
          </div>
        </div>
        {/* Info Toast Preview */}
        <div className="p-4 rounded-lg dark:bg-slate-800 bg-white border dark:border-white/10 border-slate-200 shadow-lg border-l-4 border-l-blue-500">
          <div className="flex items-start gap-3">
            <Info className="text-blue-500 mt-0.5" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold dark:text-white text-slate-900">New Notification</h4>
              <p className="text-sm dark:text-slate-400 text-slate-500">You have a new message.</p>
            </div>
            <button className="dark:text-slate-400 text-slate-500 hover:text-slate-700">
              <X size={16} />
            </button>
          </div>
        </div>
        <p className="text-xs dark:text-slate-500 text-slate-400 text-center">
          Preview (actual component uses fixed positioning)
        </p>
      </div>
    </ExampleContainer>
  );
};

// --- 82. Morphing Text ---
export const MorphingTextExample = () => {
  const [variant, setVariant] = useState<'slide' | 'fade' | 'flip' | 'blur'>('slide');

  return (
    <ExampleContainer>
      <div className="text-center">
        <p className="dark:text-slate-400 text-slate-500 mb-2">We help you</p>
        <MorphingText
          texts={['Build', 'Ship', 'Scale', 'Grow']}
          variant={variant}
          interval={2500}
          className="text-4xl font-black dark:text-white text-slate-900"
        />
        <div className="flex gap-2 mt-6 justify-center">
          {(['slide', 'fade', 'flip', 'blur'] as const).map((v) => (
            <button
              key={v}
              onClick={(e) => { e.stopPropagation(); setVariant(v); }}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                variant === v
                  ? 'bg-violet-500 text-white'
                  : 'dark:bg-white/10 bg-slate-200 dark:text-white text-slate-700'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- 83. Floating Dashboard ---
export const FloatingDashboardExample = () => {
  return (
    <ExampleContainer>
      <div className="w-80">
        <FloatingDashboard variant="3d-tilt" />
      </div>
    </ExampleContainer>
  );
};

// --- 84. Animated FAQ ---
export const AnimatedFAQExample = () => {
  const items = [
    { id: 1, question: 'How does it work?', answer: 'Simply sign up, configure your settings, and you are ready to go!' },
    { id: 2, question: 'Is there a free trial?', answer: 'Yes! We offer a 14-day free trial with full access to all features.' },
    { id: 3, question: 'Can I cancel anytime?', answer: 'Absolutely. No contracts, cancel whenever you want.' },
  ];
  return (
    <ExampleContainer>
      <div className="w-full max-w-lg px-4">
        <AnimatedFAQ items={items} variant="accordion" />
      </div>
    </ExampleContainer>
  );
};

// --- 85. Scroll Reveal Section ---
export const ScrollRevealSectionExample = () => {
  return (
    <ExampleContainer>
      <ScrollRevealSection variant="slide-up" stagger staggerDelay={0.15}>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <div className="w-16 h-16 rounded-xl bg-pink-500/20 flex items-center justify-center">
            <span className="text-2xl">💡</span>
          </div>
          <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </ScrollRevealSection>
    </ExampleContainer>
  );
};

// --- 86. Animated Nav ---
// Note: AnimatedNav uses fixed positioning, so we show a static preview here
export const AnimatedNavExample = () => {
  return (
    <ExampleContainer>
      <div className="w-full max-w-2xl">
        {/* Static preview since AnimatedNav uses fixed positioning */}
        <div className="px-2 py-2 rounded-2xl dark:bg-slate-900/90 bg-white/90 backdrop-blur-xl border dark:border-white/10 border-slate-200 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="px-4">
              <span className="text-lg font-bold dark:text-white text-slate-900">Logo</span>
            </div>
            <div className="hidden md:flex items-center">
              {['Features', 'Pricing', 'About'].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 dark:text-slate-300 text-slate-600 hover:text-violet-500 transition-colors font-medium text-sm cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
            <button className="px-5 py-2 rounded-xl bg-violet-500 text-white font-medium text-sm hover:bg-violet-600 transition-colors">
              Get Started
            </button>
          </div>
        </div>
        <p className="text-xs dark:text-slate-500 text-slate-400 mt-3 text-center">
          Preview of floating variant (actual component uses fixed positioning)
        </p>
      </div>
    </ExampleContainer>
  );
};

// --- 87. Glowing Card ---
export const GlowingCardExample = () => {
  return (
    <ExampleContainer>
      <GlowingCard variant="ambient" glowColor="rgba(139, 92, 246, 0.4)">
        <div className="p-6">
          <h3 className="font-bold dark:text-white text-slate-900 mb-2">Premium Feature</h3>
          <p className="text-sm dark:text-slate-400 text-slate-500">Experience the magic of ambient glow effects.</p>
        </div>
      </GlowingCard>
    </ExampleContainer>
  );
};

// --- 88. Stacked Cards ---
export const StackedCardsExample = () => {
  const cards = [
    { id: 1, content: <div className="p-6 h-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">Card 1</div> },
    { id: 2, content: <div className="p-6 h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">Card 2</div> },
    { id: 3, content: <div className="p-6 h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">Card 3</div> },
  ];
  return (
    <ExampleContainer>
      <StackedCards cards={cards} variant="stack" />
    </ExampleContainer>
  );
};

// --- 89. Elastic Slider ---
export const ElasticSliderExample = () => {
  const [value, setValue] = useState(50);
  return (
    <ExampleContainer>
      <div className="w-64">
        <ElasticSlider
          value={value}
          onChange={setValue}
          variant="gradient"
          label="Volume"
          showValue
          formatValue={(v) => `${v}%`}
        />
      </div>
    </ExampleContainer>
  );
};

// --- 90. Testimonial Carousel ---
export const TestimonialCarouselExample = () => {
  const testimonials = [
    { id: 1, content: 'Absolutely incredible product. Changed how we work.', author: 'Alex Rivera', role: 'Founder', company: 'TechStart', rating: 5 },
    { id: 2, content: 'The best tool in our stack. Period.', author: 'Jordan Lee', role: 'Engineering Lead', company: 'ScaleUp Inc', rating: 5 },
  ];
  return (
    <ExampleContainer>
      <div className="w-full max-w-md px-8">
        <TestimonialCarousel testimonials={testimonials} autoPlay={false} />
      </div>
    </ExampleContainer>
  );
};

// --- 91. Animated Counter ---
export const AnimatedCounterExample = () => {
  return (
    <ExampleContainer>
      <div className="flex gap-8 text-center">
        <div>
          <div className="text-4xl font-bold dark:text-white text-slate-900">
            <NumberCounter end={1000} duration={2000} triggerOnView={false} />+
          </div>
          <p className="text-sm dark:text-slate-400 text-slate-500">Customers</p>
        </div>
        <div>
          <div className="text-4xl font-bold dark:text-white text-slate-900">
            $<NumberCounter end={5} duration={1500} triggerOnView={false} />M
          </div>
          <p className="text-sm dark:text-slate-400 text-slate-500">Revenue</p>
        </div>
      </div>
    </ExampleContainer>
  );
};

// --- Generic Fallback ---
export const GenericExample = ({ title }: { title: string }) => (
    <ExampleContainer>
        <div className="text-center p-6">
            <div className="w-16 h-16 dark:bg-white/5 bg-slate-200 rounded-2xl mx-auto mb-4 flex items-center justify-center border dark:border-white/10 border-slate-300">
                 <Box className="dark:text-slate-500 text-slate-400" />
            </div>
            <h4 className="dark:text-slate-300 text-slate-600 font-medium mb-2">{title}</h4>
        </div>
    </ExampleContainer>
);

export const getExampleComponent = (id: number) => {
  switch (id) {
    case 1: return <GlassCardExample />;
    case 2: return <BentoGridExample />;
    case 3: return <ParallaxHeroExample />;
    case 4: return <OrbitalCardsExample />;
    case 5: return <ComparisonSliderExample />;
    case 6: return <StackedCarouselExample />;
    case 7: return <MorphingBlobExample />;
    case 8: return <TextRevealExample />;
    case 9: return <IsometricGridExample />;
    case 10: return <MagneticButtonExample />;
    case 11: return <ScrollingMarqueeExample />;
    case 12: return <LayeredPaperExample />;
    case 13: return <SpotlightCursorExample />;
    case 14: return <FlipCardExample />;
    case 15: return <MeshGradientExample />;
    case 16: return <AuroraTextExample />;
    case 17: return <GlitchTextExample />;
    case 18: return <NeumorphicSwitchExample />;
    case 19: return <HolographicCardExample />;
    case 20: return <TypewriterExample />;
    case 21: return <MagicBorderBeamExample />;
    case 22: return <GridBeamsExample />;
    case 23: return <MeteorShowerExample />;
    case 24: return <SparklesExample />;
    case 25: return <DockZoomExample />;
    case 26: return <SkeletonShimmerExample />;
    case 27: return <RadarPulseExample />;
    case 28: return <RippleButtonExample />;
    case 29: return <SlidingTabsExample />;
    case 30: return <StackedNotificationsExample />;
    case 31: return <BlurFocusCardsExample />;
    case 32: return <InteractiveGridPatternExample />;
    case 33: return <ButtonShineSweepExample />;
    case 34: return <SunMoonToggleExample />;
    case 35: return <DotPulseLoaderExample />;
    case 36: return <CircularProgressExample />;
    case 37: return <WaveFooterExample />;
    case 38: return <CodeTypingExample />;
    case 39: return <AvatarStackExample />;
    case 40: return <BreadcrumbCollapseExample />;
    case 41: return <BadgePulseExample />;
    case 42: return <InputFocusExpandExample />;
    case 43: return <SearchBarExpandExample />;
    case 44: return <TooltipAnimatedExample />;
    case 45: return <AccordionSpringExample />;
    case 46: return <PerspectiveDashboardExample />;
    case 47: return <FloatingPhoneExample />;
    case 48: return <RetroGridExample />;
    case 49: return <ModernSaaSHeroExample />;
    case 50: return <SplitScreenHeroExample />;
    case 51: return <CinematicGlowHeroExample />;
    // New reusable UI components (52-71)
    case 52: return <MagneticButtonExampleNew />;
    case 53: return <RippleButtonExampleNew />;
    case 54: return <GlowingTextExampleNew />;
    case 55: return <TypingTextExampleNew />;
    case 56: return <GlitchTextExampleNew />;
    case 57: return <ParallaxCardExampleNew />;
    case 58: return <MorphingBlobExampleNew />;
    case 59: return <FloatingParticlesExampleNew />;
    case 60: return <GradientBorderExampleNew />;
    case 61: return <SkeletonLoaderExampleNew />;
    case 62: return <NumberCounterExampleNew />;
    case 63: return <SpotlightExampleNew />;
    case 64: return <TextRevealExampleNew />;
    case 65: return <InfiniteMarqueeExampleNew />;
    case 66: return <RadialProgressExampleNew />;
    case 67: return <AnimatedTooltipExampleNew />;
    case 68: return <FancyToggleExampleNew />;
    case 69: return <ShimmerCardExampleNew />;
    case 70: return <HoverTiltExampleNew />;
    case 71: return <MagneticCursorExampleNew />;
    // New SaaS Components (72-91)
    case 72: return <AnimatedPricingCardExample />;
    case 73: return <TestimonialShowcaseExample />;
    case 74: return <AnimatedStatsCounterExample />;
    case 75: return <ProcessTimelineExample />;
    case 76: return <FeatureBentoExample />;
    case 77: return <LogoCloudExample />;
    case 78: return <CTABannerExample />;
    case 79: return <FeatureTabsExample />;
    case 80: return <IntegrationOrbitExample />;
    case 81: return <NotificationToastExample />;
    case 82: return <MorphingTextExample />;
    case 83: return <FloatingDashboardExample />;
    case 84: return <AnimatedFAQExample />;
    case 85: return <ScrollRevealSectionExample />;
    case 86: return <AnimatedNavExample />;
    case 87: return <GlowingCardExample />;
    case 88: return <StackedCardsExample />;
    case 89: return <ElasticSliderExample />;
    case 90: return <TestimonialCarouselExample />;
    default: return null;
  }
};
import React, { useState, useRef, useEffect } from 'react';
import { Box, Layers, MousePointer2, Search as SearchIcon, Bell, Check, X, Code, Terminal, Star, ChevronDown, ChevronRight, Info } from 'lucide-react';

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
                <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-2 font-sans">Glassmorphism</h3>
                <p className="dark:text-white/60 text-slate-600 text-sm">Frosted glass effect with rotating gradient border.</p>
            </div>
            <div className="flex gap-2 text-[10px] font-mono dark:text-white/30 text-slate-400 uppercase">
                <span>blur-xl</span> • <span>gradient</span>
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
        <span className="absolute text-5xl font-black dark:text-white/5 text-slate-900/5 transition-transform duration-100 ease-out select-none scale-125" style={{ transform: `translate(${offset.x * 20}px, ${offset.y * 20}px) scale(1.3)` }}>PARALLAX</span>
        <span className="absolute text-5xl font-black dark:text-white/10 text-slate-900/10 transition-transform duration-100 ease-out select-none scale-110" style={{ transform: `translate(${offset.x * 40}px, ${offset.y * 40}px) scale(1.15)` }}>PARALLAX</span>
        <span className="absolute text-5xl font-black dark:text-white text-slate-900 transition-transform duration-100 ease-out select-none dark:drop-shadow-[0_0_60px_rgba(255,255,255,0.3)] drop-shadow-xl" style={{ transform: `translate(${offset.x * 80}px, ${offset.y * 80}px)` }}>PARALLAX</span>
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
            <h3 className="text-3xl font-bold dark:text-white text-slate-800 text-center z-10">Morphing<br/>Background</h3>
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
            Hover Me
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
                            <span className="text-2xl font-bold dark:text-white/80 text-slate-700">React</span>
                            <span className="text-violet-500">•</span>
                            <span className="text-2xl font-bold dark:text-white/80 text-slate-700">Tailwind</span>
                            <span className="text-violet-500">•</span>
                            <span className="text-2xl font-bold dark:text-white/80 text-slate-700">Gemini</span>
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
                        <h3 className="text-xl font-bold text-white">Layers</h3>
                        <p className="text-white/60 text-xs">Paper cut effect</p>
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
            <h3 className="text-4xl font-black text-white tracking-widest">REVEAL</h3>
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
            <div className="flex flex-col items-center group perspective-1000 cursor-pointer">
                <div className="relative w-40 h-56 preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden rounded-xl p-6 bg-gradient-to-br from-cyan-500 to-blue-500 flex flex-col justify-between shadow-xl">
                         <span className="text-3xl text-white">🎴</span>
                         <h4 className="text-white font-bold">Flip Me</h4>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl p-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 flex flex-col justify-between shadow-xl">
                         <span className="text-3xl text-white">✨</span>
                         <h4 className="text-white font-bold">Revealed</h4>
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
                     <div className="absolute top-[-30%] left-[-10%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,0,110,0.7)_0%,transparent_70%)] filter blur-3xl animate-blob-drift"></div>
                    <div className="absolute top-[20%] right-[-5%] w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(131,56,236,0.6)_0%,transparent_70%)] filter blur-3xl animate-blob-drift [animation-delay:-5s] [animation-direction:reverse]"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(58,134,255,0.5)_0%,transparent_70%)] filter blur-3xl animate-blob-drift [animation-delay:-10s]"></div>
                </div>

                {/* Light Mode */}
                <div className="block dark:hidden">
                    <div className="absolute top-[-30%] left-[-10%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(255,0,110,0.3)_0%,transparent_70%)] filter blur-3xl animate-blob-drift"></div>
                    <div className="absolute top-[20%] right-[-5%] w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(131,56,236,0.2)_0%,transparent_70%)] filter blur-3xl animate-blob-drift [animation-delay:-5s] [animation-direction:reverse]"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(58,134,255,0.2)_0%,transparent_70%)] filter blur-3xl animate-blob-drift [animation-delay:-10s]"></div>
                </div>

                 <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold dark:text-white text-slate-800 drop-shadow-lg">Mesh Gradient</h3>
                 </div>
            </div>
        </ExampleContainer>
    )
}

// --- 16. Aurora Text ---
export const AuroraTextExample = () => {
  return (
    <ExampleContainer>
      <h1 className="text-5xl font-black text-transparent bg-clip-text bg-[linear-gradient(45deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] bg-[length:200%_auto] animate-shimmer dark:drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        AURORA
      </h1>
    </ExampleContainer>
  );
};

// --- 17. Cyberpunk Glitch Text ---
export const GlitchTextExample = () => {
  return (
    <ExampleContainer>
      <div className="relative group cursor-default">
        <h1 className="text-5xl font-black tracking-wider text-white relative z-10 mix-blend-difference">GLITCH_</h1>
        <h1 className="text-5xl font-black tracking-wider text-cyan-500 absolute top-0 left-0 -translate-x-1 animate-glitch opacity-70">GLITCH_</h1>
        <h1 className="text-5xl font-black tracking-wider text-pink-500 absolute top-0 left-0 translate-x-1 animate-glitch opacity-70 [animation-delay:-0.5s]">GLITCH_</h1>
      </div>
    </ExampleContainer>
  );
};

// --- 18. Neumorphic Soft UI ---
export const NeumorphicSwitchExample = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <ExampleContainer className="dark:bg-[#2d2d2d] bg-[#e0e5ec]">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
        className={`w-20 h-10 rounded-full p-1 transition-all duration-300 flex items-center ${isOn ? 'dark:shadow-[inset_3px_3px_6px_#1e1e1e,inset_-3px_-3px_6px_#3c3c3c] shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff]' : 'dark:shadow-[5px_5px_10px_#1e1e1e,-5px_-5px_10px_#3c3c3c] shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_#ffffff]'}`}
      >
        <div className={`w-8 h-8 rounded-full transition-all duration-300 transform ${isOn ? 'translate-x-10 bg-cyan-400' : 'translate-x-0 bg-slate-400'}`}></div>
      </button>
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
        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-2xl rotate-45">HOLO</div>
      </div>
    </ExampleContainer>
  );
};

// --- 20. Typewriter Effect ---
export const TypewriterExample = () => {
  return (
    <ExampleContainer>
      <div className="font-mono text-xl dark:text-green-400 text-slate-800 border-r-2 border-current animate-typewriter overflow-hidden whitespace-nowrap w-0">
        console.log("Hello!");
      </div>
    </ExampleContainer>
  );
};

// --- 21. Magic Border Beam ---
export const MagicBorderBeamExample = () => {
  return (
    <ExampleContainer>
      <div className="relative w-64 h-40 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-50"></div>
        </div>
        <div className="absolute inset-[1px] bg-[#0a0a0b] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">Border Beam</span>
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
    return (
        <ExampleContainer>
            <button 
                className="relative overflow-hidden px-8 py-3 bg-blue-600 text-white rounded-full font-bold active:scale-95 transition-transform group"
                onClick={(e) => e.stopPropagation()}
            >
                Click Me
                <div className="absolute inset-0 pointer-events-none group-active:after:content-[''] group-active:after:absolute group-active:after:top-1/2 group-active:after:left-1/2 group-active:after:w-4 group-active:after:h-4 group-active:after:bg-white/30 group-active:after:rounded-full group-active:after:-translate-x-1/2 group-active:after:-translate-y-1/2 group-active:after:animate-ripple"></div>
            </button>
        </ExampleContainer>
    )
}

// --- 29. Sliding Tabs ---
export const SlidingTabsExample = () => {
    const [active, setActive] = useState(0);
    return (
        <ExampleContainer>
            <div className="relative flex bg-slate-200 dark:bg-slate-800 rounded-full p-1">
                {['Home', 'About', 'Contact'].map((tab, i) => (
                    <button 
                        key={tab} 
                        onClick={(e) => { e.stopPropagation(); setActive(i); }} 
                        className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors ${active === i ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}
                    >
                        {tab}
                    </button>
                ))}
                <div className="absolute top-1 bottom-1 bg-white dark:bg-slate-600 rounded-full shadow-sm transition-all duration-300" style={{ left: `${active * 33.33}%`, width: '33.33%' }}></div>
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
                    <div className="text-sm dark:text-white"><span className="font-bold">Success!</span> Item saved.</div>
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
    return (
        <ExampleContainer>
             <div className="grid grid-cols-12 gap-0.5 p-4 rounded-xl dark:bg-[#0f0f1a] bg-slate-100 border dark:border-white/10 border-slate-200 shadow-inner overflow-hidden">
                {[...Array(144)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-3 h-3 rounded-[1px] dark:bg-white/5 bg-slate-300/50 transition-colors duration-1000 ease-out hover:bg-violet-500 hover:duration-0 hover:delay-0 cursor-crosshair"
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
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine"></div>
            </button>
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
            <div className="flex gap-2">
                {[0, 150, 300].map((delay) => (
                    <div 
                        key={delay} 
                        className="w-4 h-4 bg-violet-500 rounded-full animate-bounce" 
                        style={{ animationDelay: `${delay}ms` }}
                    ></div>
                ))}
            </div>
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
                <div className="text-green-400 animate-typewriter overflow-hidden whitespace-nowrap w-0 border-r-2 border-green-400">
                    npm install magic-ui
                </div>
            </div>
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Status
            </span>
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
            <div className={`flex items-center ${expanded ? 'w-64 px-3' : 'w-10 justify-center'} h-10 bg-white dark:bg-white/10 rounded-full shadow-sm border transition-all duration-300 overflow-hidden`}>
                <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} className="shrink-0"><SearchIcon size={18} className="text-slate-500" /></button>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className={`ml-2 bg-transparent outline-none text-sm w-full ${expanded ? 'opacity-100' : 'opacity-0'} transition-opacity`} 
                    onClick={(e) => e.stopPropagation()}
                />
                {expanded && <button onClick={(e) => { e.stopPropagation(); setExpanded(false); }}><X size={14} className="text-slate-400" /></button>}
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
    default: return null;
  }
};
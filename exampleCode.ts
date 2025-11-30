

export const CODE_EXAMPLES: Record<number, string> = {
  1: `import React from 'react';

const GlassmorphismCard = () => {
  return (
    <div className="relative w-64 h-80 group">
      <div className="absolute inset-0 rounded-[24px] p-[3px] bg-[linear-gradient(45deg,#ff006e,#8338ec,#3a86ff,#ff006e)] bg-[length:300%_300%] animate-gradient-rotate">
           <div className="w-full h-full rounded-[22px] bg-[#0a0a0b]"></div>
      </div>
      <div className="absolute inset-[3px] rounded-[22px] bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] transition-transform duration-500 hover:scale-[1.02]">
          <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xl mb-6 shadow-lg shadow-violet-500/20">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2 font-sans">Glassmorphism</h3>
              <p className="text-white/60 text-sm">Frosted glass effect with rotating gradient border.</p>
          </div>
          <div className="flex gap-2 text-[10px] font-mono text-white/30 uppercase">
              <span>blur-xl</span> • <span>gradient</span>
          </div>
      </div>
    </div>
  );
};

export default GlassmorphismCard;`,

  2: `import React from 'react';

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-3 w-64 h-64 perspective-1000">
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 text-white shadow-lg transform-gpu transition-all duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-2xl z-10 cursor-pointer flex items-end font-bold text-lg">
        Analytics
      </div>
      <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-emerald-500/20"></div>
      <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-violet-500/20"></div>
      <div className="row-span-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-amber-500/20"></div>
      <div className="col-span-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-blue-500/20"></div>
    </div>
  );
};

export default BentoGrid;`,

  3: `import React, { useRef, useState } from 'react';

const ParallaxHero = () => {
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
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="relative w-full h-[300px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] overflow-hidden flex items-center justify-center cursor-default rounded-xl border border-white/5"
    >
      <span 
        className="absolute text-5xl font-black text-white/5 transition-transform duration-100 ease-out select-none" 
        style={{ transform: \`translate(\${offset.x * 20}px, \${offset.y * 20}px) scale(1.3)\` }}
      >
        PARALLAX
      </span>
      <span 
        className="absolute text-5xl font-black text-white/10 transition-transform duration-100 ease-out select-none" 
        style={{ transform: \`translate(\${offset.x * 40}px, \${offset.y * 40}px) scale(1.15)\` }}
      >
        PARALLAX
      </span>
      <span 
        className="absolute text-5xl font-black text-white transition-transform duration-100 ease-out select-none drop-shadow-[0_0_60px_rgba(255,255,255,0.3)]" 
        style={{ transform: \`translate(\${offset.x * 80}px, \${offset.y * 80}px)\` }}
      >
        PARALLAX
      </span>
    </div>
  );
};

export default ParallaxHero;`,

  4: `import React from 'react';

const OrbitalCards = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center group">
       {/* Center Core */}
       <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 z-10 flex items-center justify-center text-2xl shadow-[0_0_60px_rgba(131,56,236,0.4)]">
         ✨
       </div>
       
       {/* Orbit Path */}
       <div className="absolute w-56 h-56 border border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite] group-hover:[animation-play-state:paused]"></div>
       
       {/* Orbiting Elements */}
       {[0, 1, 2, 3].map((i) => (
           <div 
              key={i} 
              className="absolute inset-0 animate-orbit group-hover:[animation-play-state:paused]"
              style={{ animationDelay: \`\${i * -3}s\` }}
           >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center shadow-lg rotate-90">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
               </div>
           </div>
       ))}
    </div>
  );
};

export default OrbitalCards;`,

  5: `import React, { useRef, useState } from 'react';

const ComparisonSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, x)));
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[300px] cursor-ew-resize select-none overflow-hidden rounded-xl border border-white/10"
    >
      {/* Before Image/Content */}
      <div className="absolute inset-0 bg-[#1a1a2e] flex items-center justify-center">
          <div className="text-center">
              <div className="text-5xl mb-4">🌙</div>
              <h3 className="text-white font-bold text-xl">Dark Mode</h3>
              <p className="text-white/40 text-sm mt-2">Easy on the eyes</p>
          </div>
      </div>

      {/* After Image/Content */}
      <div 
          className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center"
          style={{ clipPath: \`inset(0 \${100 - sliderPos}% 0 0)\` }}
      >
           <div className="text-center">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-slate-800 font-bold text-xl">Light Mode</h3>
              <p className="text-slate-600/60 text-sm mt-2">Clean & Crisp</p>
          </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20" 
        style={{ left: \`\${sliderPos}%\` }}
      >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-500 shadow-lg">
             ↔
           </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;`,

  6: `import React, { useState } from 'react';

const StackedCarousel = () => {
    const [index, setIndex] = useState(0);
    const cards = [
        { color: 'from-pink-500 to-rose-500', icon: '🎨', title: 'Design' },
        { color: 'from-violet-500 to-purple-500', icon: '💻', title: 'Code' },
        { color: 'from-cyan-500 to-blue-500', icon: '🚀', title: 'Ship' },
        { color: 'from-emerald-400 to-green-500', icon: '📈', title: 'Grow' },
    ];

    const handleNext = () => setIndex((prev) => (prev + 1) % cards.length);

    return (
        <div className="relative w-48 h-64 perspective-1000 cursor-pointer" onClick={handleNext}>
            {cards.map((card, i) => {
                const offset = (i - index + cards.length) % cards.length;
                return (
                    <div
                        key={i}
                        className={\`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br \${card.color} transition-all duration-500 ease-out border border-white/10 shadow-2xl\`}
                        style={{
                            zIndex: cards.length - offset,
                            transform: \`translateY(\${-offset * 12}px) scale(\${1 - offset * 0.05})\`,
                            opacity: 1 - offset * 0.2,
                        }}
                    >
                        <span className="text-4xl">{card.icon}</span>
                        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                        <p className="text-white/60 text-xs">Click to flip</p>
                    </div>
                );
            })}
        </div>
    );
};

export default StackedCarousel;`,

  7: `import React from 'react';

const MorphingBlobs = () => {
  return (
    <div className="relative w-full h-[300px] overflow-hidden bg-[#0f0f1a] rounded-xl border border-white/5">
      <div className="absolute top-[-20%] left-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-morph animate-blob-drift"></div>
      <div className="absolute top-[30%] right-[10%] w-56 h-56 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-morph animate-blob-drift [animation-delay:-4s] [animation-direction:reverse]"></div>
      <div className="absolute bottom-[-10%] left-[30%] w-60 h-60 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-morph animate-blob-drift [animation-delay:-2s]"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-4xl font-black text-white text-center tracking-tight">
            Morphing<br/>Background
          </h3>
      </div>
    </div>
  );
};

export default MorphingBlobs;`,

  8: `import React, { useState } from 'react';

const TextReveal = () => {
    const [key, setKey] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center h-48">
            <div className="flex gap-3 font-black text-4xl cursor-pointer select-none" onClick={() => setKey(k => k+1)}>
                {['Build', 'Something', 'Epic'].map((word, i) => (
                    <span 
                        key={\`\${key}-\${i}\`}
                        className="bg-gradient-to-br from-white to-violet-300 bg-clip-text text-transparent opacity-0 animate-reveal-word"
                        style={{ animationDelay: \`\${i * 0.15}s\` }}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <p className="mt-8 text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">Click text to replay</p>
        </div>
    );
};

export default TextReveal;`,

  9: `import React from 'react';

const IsometricGrid = () => {
    return (
        <div className="flex gap-8 [transform:rotateX(10deg)] perspective-1000 py-10 justify-center">
            {[
                { color: 'bg-blue-500', side: 'bg-blue-600', front: 'bg-blue-700', price: '$9' },
                { color: 'bg-violet-500', side: 'bg-violet-600', front: 'bg-violet-700', price: '$29' },
                { color: 'bg-pink-500', side: 'bg-pink-600', front: 'bg-pink-700', price: '$99' },
            ].map((card, i) => (
                <div key={i} className="relative w-24 h-32 preserve-3d [transform:rotateX(55deg)_rotateZ(-45deg)] hover:[transform:rotateX(55deg)_rotateZ(-45deg)_translateZ(30px)] transition-transform duration-300 cursor-pointer group">
                    {/* Top Face */}
                    <div className={\`absolute inset-0 rounded-xl flex items-center justify-center \${card.color} shadow-lg group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-shadow border border-white/10\`}>
                        <span className="text-xl font-bold text-white">{card.price}</span>
                    </div>
                    {/* Right Face (Thickness) */}
                    <div className={\`absolute top-full w-full h-4 origin-top [transform:rotateX(-90deg)] rounded-b \${card.side}\`}></div>
                    {/* Left Face (Thickness) */}
                    <div className={\`absolute left-full w-4 h-full origin-left [transform:rotateY(90deg)] rounded-r \${card.front}\`}></div>
                </div>
            ))}
        </div>
    );
};

export default IsometricGrid;`,

  10: `import React, { useRef, useState } from 'react';

const MagneticButton = () => {
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
    <div className="relative w-full h-48 flex items-center justify-center">
        {/* Detection Area */}
        <div 
            className="absolute inset-0 z-10" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => setPosition({ x: 0, y: 0 })}
        ></div>
        
        {/* Button */}
        <button
            ref={btnRef}
            style={{ transform: \`translate(\${position.x}px, \${position.y}px)\` }}
            className="relative px-10 py-4 bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-full font-bold text-lg transition-transform duration-100 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(131,56,236,0.6)] animate-pulse-glow z-20 pointer-events-none"
        >
            Hover Near Me
        </button>
    </div>
  );
};

export default MagneticButton;`,

  11: `import React from 'react';

const InfiniteMarquee = () => {
    return (
        <div className="w-full max-w-lg overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
                {[1,2,3,4].map(i => (
                    <React.Fragment key={i}>
                        <span className="text-2xl font-bold text-white/80">React</span>
                        <span className="text-violet-500 text-xl">•</span>
                        <span className="text-2xl font-bold text-white/80">Tailwind</span>
                        <span className="text-violet-500 text-xl">•</span>
                        <span className="text-2xl font-bold text-white/80">Gemini</span>
                        <span className="text-violet-500 text-xl">•</span>
                        <span className="text-2xl font-bold text-white/80">Motion</span>
                        <span className="text-violet-500 text-xl">•</span>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default InfiniteMarquee;`,

  12: `import React from 'react';

const PaperCutLayers = () => {
    return (
        <div className="relative w-80 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center z-20 text-center">
                 <div>
                    <h3 className="text-2xl font-black text-white">Paper Layers</h3>
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest mt-1">CSS Clip-path</p>
                 </div>
            </div>
            
            {/* Layers */}
            <div className="absolute left-0 right-0 bottom-0 h-24 bg-white/10 [clip-path:ellipse(80%_100%_at_50%_100%)]"></div>
            <div className="absolute left-0 right-0 bottom-0 h-16 bg-white/15 [clip-path:ellipse(70%_100%_at_50%_100%)]"></div>
            <div className="absolute left-0 right-0 bottom-0 h-10 bg-white/20 [clip-path:ellipse(60%_100%_at_50%_100%)]"></div>
            
            {/* Top Shadow */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-black/20 [clip-path:ellipse(90%_100%_at_50%_0%)]"></div>
        </div>
    )
}

export default PaperCutLayers;`,

  13: `import React, { useRef, useState } from 'react';

const SpotlightCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-full h-[300px] flex items-center justify-center cursor-none group bg-[#0a0a0b] overflow-hidden rounded-xl border border-white/5"
    >
      {/* Hidden Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-violet-500 flex items-center justify-center">
          <div className="text-center">
             <h3 className="text-5xl font-black text-white tracking-widest mb-2">REVEAL</h3>
             <div className="flex justify-center gap-4 text-3xl">
                 <span>💎</span><span>🔮</span><span>⚡</span>
             </div>
          </div>
      </div>
      
      {/* Overlay Mask */}
      <div 
          className="absolute inset-0 bg-[#0a0a0b] pointer-events-none transition-opacity duration-200"
          style={{
              maskImage: \`radial-gradient(circle 120px at \${position.x}px \${position.y}px, transparent 0%, black 100%)\`,
              WebkitMaskImage: \`radial-gradient(circle 120px at \${position.x}px \${position.y}px, transparent 0%, black 100%)\`,
              opacity: 1
          }}
      >
          <div className="absolute inset-0 flex items-center justify-center">
             <p className="text-slate-600 text-sm font-mono uppercase tracking-widest">Hover to reveal</p>
          </div>
      </div>
    </div>
  );
};

export default SpotlightCursor;`,

  14: `import React from 'react';

const FlipCard = () => {
    return (
        <div className="flex flex-col items-center group perspective-1000 cursor-pointer py-10">
            <div className="relative w-48 h-64 preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden rounded-2xl p-6 bg-gradient-to-br from-cyan-500 to-blue-500 flex flex-col justify-between shadow-xl border border-white/10">
                     <span className="text-4xl">🎴</span>
                     <h4 className="text-white font-bold text-xl">Flip Me</h4>
                     <p className="text-white/60 text-xs">Hover to reveal</p>
                </div>
                
                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 flex flex-col justify-between shadow-xl border border-white/10">
                     <span className="text-4xl">✨</span>
                     <h4 className="text-white font-bold text-xl">Revealed</h4>
                     <p className="text-white/60 text-xs">CSS 3D Transform</p>
                </div>
            </div>
            
            {/* Reflection */}
            <div className="w-48 h-12 mt-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20 blur-sm [transform:scaleY(-1)_perspective(1000px)_rotateX(40deg)] [mask-image:linear-gradient(to_bottom,black,transparent)] transition-colors duration-700 group-hover:from-fuchsia-500 group-hover:to-purple-600"></div>
        </div>
    )
}

export default FlipCard;`,

  15: `import React from 'react';

const MeshGradient = () => {
    return (
        <div className="relative w-full h-[300px] overflow-hidden bg-[#0a0a0b] rounded-xl border border-white/5">
            <div className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,0,110,0.6)_0%,transparent_70%)] filter blur-[80px] animate-blob-drift"></div>
            <div className="absolute top-[20%] right-[-5%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(131,56,236,0.5)_0%,transparent_70%)] filter blur-[80px] animate-blob-drift [animation-delay:-5s] [animation-direction:reverse]"></div>
             <div className="absolute bottom-[-20%] left-[20%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(58,134,255,0.4)_0%,transparent_70%)] filter blur-[80px] animate-blob-drift [animation-delay:-10s]"></div>
             
             {/* Content Overlay */}
             <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">Mesh Gradient</h3>
                    <p className="text-white/60 text-sm">Pure CSS Radial Gradients</p>
                </div>
             </div>
        </div>
    )
}

export default MeshGradient;`,

  16: `import React from 'react';

const AuroraText = () => {
  return (
    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-[linear-gradient(45deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)] bg-[length:200%_auto] animate-shimmer">
      AURORA
    </h1>
  );
};
export default AuroraText;`,

  17: `import React from 'react';

const GlitchText = () => {
  return (
    <div className="relative group cursor-default">
      <h1 className="text-6xl font-black tracking-wider text-white relative z-10 mix-blend-difference">GLITCH_</h1>
      <h1 className="text-6xl font-black tracking-wider text-cyan-500 absolute top-0 left-0 -translate-x-1 animate-glitch opacity-70">GLITCH_</h1>
      <h1 className="text-6xl font-black tracking-wider text-pink-500 absolute top-0 left-0 translate-x-1 animate-glitch opacity-70 [animation-delay:-0.5s]">GLITCH_</h1>
    </div>
  );
};
export default GlitchText;`,

  18: `import React, { useState } from 'react';

const NeumorphicSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="p-10 bg-[#e0e5ec] rounded-2xl">
      <button 
        onClick={() => setIsOn(!isOn)}
        className={\`w-20 h-10 rounded-full p-1 transition-all duration-300 flex items-center \${isOn ? 'shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff]' : 'shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_#ffffff]'}\`}
      >
        <div className={\`w-8 h-8 rounded-full transition-all duration-300 transform \${isOn ? 'translate-x-10 bg-cyan-400' : 'translate-x-0 bg-slate-400'}\`}></div>
      </button>
    </div>
  );
};
export default NeumorphicSwitch;`,

  19: `import React from 'react';

const HolographicCard = () => {
  return (
    <div className="w-48 h-64 rounded-xl bg-slate-800 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity bg-[linear-gradient(135deg,transparent_20%,rgba(255,255,255,0.4)_25%,transparent_30%,rgba(255,255,255,0.4)_35%,transparent_100%)] bg-[length:200%_200%] animate-shine"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mix-blend-overlay"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-2xl rotate-45">HOLO</div>
    </div>
  );
};
export default HolographicCard;`,

  20: `import React from 'react';

const Typewriter = () => {
  return (
    <div className="font-mono text-xl text-green-400 border-r-2 border-current animate-typewriter overflow-hidden whitespace-nowrap w-0">
      console.log("Hello World");
    </div>
  );
};
export default Typewriter;`,

  21: `import React from 'react';

const MagicBorderBeam = () => {
  return (
    <div className="relative w-64 h-40 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-50"></div>
      </div>
      <div className="absolute inset-[1px] bg-[#0a0a0b] rounded-xl flex items-center justify-center">
          <span className="text-white font-bold">Border Beam</span>
      </div>
    </div>
  );
};
export default MagicBorderBeam;`,

  22: `import React from 'react';

const GridBeams = () => {
  return (
    <div className="relative w-full h-64 bg-slate-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-beam"></div>
      <div className="absolute top-1/4 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-beam [animation-direction:reverse]"></div>
    </div>
  );
};
export default GridBeams;`,

  23: `import React from 'react';

const MeteorShower = () => {
  return (
    <div className="relative w-full h-64 bg-slate-900 overflow-hidden">
        {[...Array(5)].map((_, i) => (
            <div 
                key={i}
                className="absolute w-[2px] h-[100px] bg-gradient-to-b from-white to-transparent animate-meteor"
                style={{ 
                    left: \`\${20 + i * 15}%\`, 
                    top: '-10%', 
                    animationDelay: \`\${i * 0.8}s\` 
                }}
            ></div>
        ))}
    </div>
  );
};
export default MeteorShower;`,

  24: `import React from 'react';
import { Star } from 'lucide-react';

const Sparkles = () => {
  return (
    <button className="relative px-6 py-3 bg-slate-800 text-white rounded-lg font-bold group">
        AI Magic
        <Star className="absolute -top-2 -right-2 text-yellow-400 w-4 h-4 animate-bounce" />
        <Star className="absolute bottom-1 -left-3 text-cyan-400 w-3 h-3 animate-pulse" />
    </button>
  );
};
export default Sparkles;`,

  25: `import React from 'react';

const DockZoom = () => {
    return (
        <div className="flex items-end gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 w-fit">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 bg-slate-500 rounded-lg hover:w-14 hover:h-14 transition-all duration-200 cursor-pointer origin-bottom"></div>
            ))}
        </div>
    )
}
export default DockZoom;`,

  26: `import React from 'react';

const SkeletonShimmer = () => {
    return (
        <div className="w-64 p-4 border border-slate-700 rounded-xl space-y-3 bg-slate-900">
            <div className="w-full h-32 bg-slate-800 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>
            <div className="h-4 w-2/3 bg-slate-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>
        </div>
    )
}
export default SkeletonShimmer;`,

  27: `import React from 'react';

const RadarPulse = () => {
    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            <div className="w-4 h-4 bg-red-500 rounded-full z-10"></div>
            <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute w-16 h-16 border border-red-500/50 rounded-full animate-pulse"></div>
            <div className="absolute w-32 h-32 border border-red-500/30 rounded-full animate-pulse [animation-delay:0.5s]"></div>
        </div>
    )
}
export default RadarPulse;`,

  28: `import React from 'react';

const RippleButton = () => {
    return (
        <button className="relative overflow-hidden px-8 py-3 bg-blue-600 text-white rounded-full font-bold active:scale-95 transition-transform group">
            Click Me
            <div className="absolute inset-0 pointer-events-none group-active:after:content-[''] group-active:after:absolute group-active:after:top-1/2 group-active:after:left-1/2 group-active:after:w-4 group-active:after:h-4 group-active:after:bg-white/30 group-active:after:rounded-full group-active:after:-translate-x-1/2 group-active:after:-translate-y-1/2 group-active:after:animate-ripple"></div>
        </button>
    )
}
export default RippleButton;`,

  29: `import React, { useState } from 'react';

const SlidingTabs = () => {
    const [active, setActive] = useState(0);
    return (
        <div className="relative flex bg-slate-800 rounded-full p-1 w-fit">
            {['Home', 'About', 'Contact'].map((tab, i) => (
                <button key={tab} onClick={() => setActive(i)} className={\`relative z-10 px-4 py-2 text-sm font-medium transition-colors \${active === i ? 'text-white' : 'text-slate-400'}\`}>
                    {tab}
                </button>
            ))}
            <div className="absolute top-1 bottom-1 bg-slate-600 rounded-full shadow-sm transition-all duration-300" style={{ left: \`\${active * 33.33}%\`, width: '33.33%' }}></div>
        </div>
    )
}
export default SlidingTabs;`,

  30: `import React from 'react';
import { Check } from 'lucide-react';

const StackedNotifications = () => {
    return (
        <div className="relative w-64 h-32 flex flex-col items-center justify-end pb-4">
            <div className="absolute w-56 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bottom-8 scale-90 opacity-60 z-0"></div>
            <div className="absolute w-60 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bottom-4 scale-95 opacity-80 z-10"></div>
            <div className="relative w-64 h-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 flex items-center px-4 gap-3 z-20">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={16}/></div>
                <div className="text-sm dark:text-white"><span className="font-bold">Success!</span> Item saved.</div>
            </div>
        </div>
    )
}
export default StackedNotifications;`,

  31: `import React from 'react';

const BlurFocusCards = () => {
    return (
        <div className="flex -space-x-4 hover:space-x-4 transition-all duration-300 group justify-center">
            {[1,2,3].map(i => (
                <div key={i} className="w-16 h-24 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:!scale-110 hover:z-10"></div>
            ))}
        </div>
    )
}
export default BlurFocusCards;`,

  32: `import React from 'react';

const InteractiveGridPattern = () => {
    return (
        <div className="grid grid-cols-12 gap-0.5 p-4 rounded-xl dark:bg-[#0f0f1a] bg-slate-100 border dark:border-white/10 border-slate-200 shadow-inner overflow-hidden">
            {[...Array(144)].map((_, i) => (
                <div 
                    key={i} 
                    className="w-3 h-3 rounded-[1px] dark:bg-white/5 bg-slate-300/50 transition-colors duration-1000 ease-out hover:bg-violet-500 hover:duration-0 hover:delay-0 cursor-crosshair"
                ></div>
            ))}
        </div>
    )
}
export default InteractiveGridPattern;`,

  33: `import React from 'react';

const ButtonShineSweep = () => {
    return (
        <button className="relative px-8 py-3 bg-slate-900 text-white font-bold rounded-lg overflow-hidden group">
            Get Started
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-shine"></div>
        </button>
    )
}
export default ButtonShineSweep;`,

  34: `import React, { useState } from 'react';

const SunMoonToggle = () => {
    const [isDark, setIsDark] = useState(false);
    return (
        <div className={\`p-4 rounded-xl \${isDark ? 'bg-slate-900' : 'bg-sky-100'}\`}>
            <button onClick={() => setIsDark(!isDark)} className="relative w-16 h-8 rounded-full bg-slate-300 dark:bg-slate-700 transition-colors p-1">
                <div className={\`w-6 h-6 rounded-full shadow-sm transition-transform duration-300 \${isDark ? 'translate-x-8 bg-slate-900' : 'translate-x-0 bg-yellow-400'}\`}>
                    {isDark ? <div className="absolute top-1 right-1 w-2 h-2 bg-slate-700 rounded-full"></div> : null}
                </div>
            </button>
        </div>
    )
}
export default SunMoonToggle;`,

  35: `import React from 'react';

const DotPulseLoader = () => {
    return (
        <div className="flex gap-2">
            {[0, 150, 300].map((delay) => (
                <div 
                    key={delay} 
                    className="w-4 h-4 bg-violet-500 rounded-full animate-bounce" 
                    style={{ animationDelay: \`\${delay}ms\` }}
                ></div>
            ))}
        </div>
    )
}
export default DotPulseLoader;`,

  36: `import React from 'react';

const CircularProgress = () => {
    return (
        <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-white/10" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="60" className="text-violet-500" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl dark:text-white text-slate-800">75%</div>
        </div>
    )
}
export default CircularProgress;`,

  37: `import React from 'react';

const WaveFooter = () => {
    return (
        <div className="w-full h-32 bg-blue-500 relative mt-auto flex items-end overflow-hidden rounded-xl">
            <div className="w-[200%] h-full bg-white/20 absolute bottom-0 animate-shimmer" style={{ clipPath: 'polygon(0 40%, 100% 60%, 100% 100%, 0% 100%)' }}></div>
            <div className="w-[200%] h-full bg-white/30 absolute bottom-0 animate-shimmer [animation-duration:3s]" style={{ clipPath: 'polygon(0 50%, 100% 40%, 100% 100%, 0% 100%)' }}></div>
        </div>
    )
}
export default WaveFooter;`,

  38: `import React from 'react';

const CodeTyping = () => {
    return (
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
    )
}
export default CodeTyping;`,

  39: `import React from 'react';

const AvatarStack = () => {
    return (
        <div className="flex items-center pl-3">
            {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-300 -ml-3 hover:translate-y-[-4px] transition-transform cursor-pointer relative z-0 hover:z-10">
                    <img src={\`https://i.pravatar.cc/100?img=\${i+10}\`} alt="avatar" className="w-full h-full rounded-full" />
                </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-100 flex items-center justify-center text-xs font-bold -ml-3 z-0 text-slate-900">+9</div>
        </div>
    )
}
export default AvatarStack;`,

  40: `import React from 'react';
import { ChevronRight } from 'lucide-react';

const BreadcrumbCollapse = () => {
    return (
        <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Home</span>
            <ChevronRight size={14} />
            <span className="w-4 overflow-hidden whitespace-nowrap group hover:w-auto hover:bg-slate-100 rounded px-1 transition-all cursor-pointer">...</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-slate-900 dark:text-white">Current Page</span>
        </div>
    )
}
export default BreadcrumbCollapse;`,

  41: `import React from 'react';

const BadgePulse = () => {
    return (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Status
        </span>
    )
}
export default BadgePulse;`,

  42: `import React from 'react';

const InputFocusExpand = () => {
    return (
        <input 
            type="text" 
            placeholder="Focus me..." 
            className="w-32 focus:w-64 transition-all duration-300 px-4 py-2 rounded-lg border focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none bg-white dark:bg-white/5" 
        />
    )
}
export default InputFocusExpand;`,

  43: `import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBarExpand = () => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div className={\`flex items-center \${expanded ? 'w-64 px-3' : 'w-10 justify-center'} h-10 bg-white dark:bg-white/10 rounded-full shadow-sm border transition-all duration-300 overflow-hidden\`}>
            <button onClick={() => setExpanded(!expanded)} className="shrink-0"><Search size={18} className="text-slate-500" /></button>
            <input type="text" placeholder="Search..." className={\`ml-2 bg-transparent outline-none text-sm w-full \${expanded ? 'opacity-100' : 'opacity-0'} transition-opacity\`} />
            {expanded && <button onClick={() => setExpanded(false)}><X size={14} className="text-slate-400" /></button>}
        </div>
    )
}
export default SearchBarExpand;`,

  44: `import React from 'react';
import { Info } from 'lucide-react';

const TooltipAnimated = () => {
    return (
        <div className="relative group">
            <Info size={24} className="text-slate-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap pointer-events-none">
                Helpful information here
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
            </div>
        </div>
    )
}
export default TooltipAnimated;`,

  45: `import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionSpring = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-64 border rounded-lg bg-white dark:bg-white/5 overflow-hidden">
            <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 flex items-center justify-between font-medium">
                Click to toggle
                <ChevronDown size={16} className={\`transition-transform duration-300 \${open ? 'rotate-180' : ''}\`} />
            </button>
            <div className={\`overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] \${open ? 'max-h-24' : 'max-h-0'}\`}>
                <p className="px-4 pb-4 text-sm text-slate-500">
                    This content springs open smoothly. Great for FAQs or menus.
                </p>
            </div>
        </div>
    )
}
export default AccordionSpring;`
};




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
export default AccordionSpring;`,

  46: `import React from 'react';

const PerspectiveDashboardHero = () => {
    return (
        <div className="relative w-full h-[300px] flex items-center justify-center perspective-1000 overflow-hidden bg-slate-50 dark:bg-[#0a0a0b]">
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
        </div>
    )
}
export default PerspectiveDashboardHero;`,

  47: `import React from 'react';

const FloatingPhoneMockup = () => {
    return (
        <div className="w-full h-[400px] flex items-center justify-center bg-slate-100 dark:bg-[#0f0f1a]">
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
        </div>
    )
}
export default FloatingPhoneMockup;`,

  48: `import React from 'react';

const RetroHorizonGrid = () => {
    return (
        <div className="relative w-full h-[300px] bg-[#050510] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,#a855f7_100%)] opacity-20"></div>
            <div className="absolute inset-0 perspective-1000">
                <div className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom h-[200%] -top-[50%] bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-flow"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#050510] h-full"></div>
            <h1 className="relative z-10 text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-fuchsia-400 to-purple-700 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">RETRO</h1>
        </div>
    )
}
export default RetroHorizonGrid;`,

  49: `import React from 'react';

const ModernSaaSHero = () => {
    return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-[#0a0a0b] overflow-hidden">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-bold mb-4 border border-violet-500/20">
                 <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                 New Release 2.0
             </div>
             <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900 mb-4">
                 Build faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">AI Power</span>
             </h1>
             <p className="text-sm dark:text-slate-400 text-slate-500 max-w-sm mb-6 leading-relaxed">
                 Deploy your next project in seconds, not hours. Trusted by 10,000+ developers worldwide for scalability and speed.
             </p>
             <div className="flex gap-3 mb-10">
                 <button className="px-5 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-violet-500/25 hover:bg-violet-500 transition-colors">Get Started</button>
                 <button className="px-5 py-2.5 dark:bg-white/5 bg-slate-200 dark:text-white text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-white/10 transition-colors">Documentation</button>
             </div>
             
             {/* Dashboard Mockup */}
             <div className="w-[80%] h-40 bg-slate-900 rounded-t-xl border-t border-x border-slate-700 shadow-2xl p-2 relative overflow-hidden perspective-1000 [transform:rotateX(10deg)] origin-bottom">
                  <div className="w-full h-full bg-slate-800 rounded-lg opacity-80 border border-slate-700 grid grid-cols-3 gap-2 p-2">
                       <div className="col-span-1 bg-white/5 rounded"></div>
                       <div className="col-span-2 bg-white/5 rounded"></div>
                       <div className="col-span-3 h-20 bg-white/5 rounded mt-2"></div>
                  </div>
             </div>
        </div>
    )
}
export default ModernSaaSHero;`,

  50: `import React from 'react';
import { ArrowRight } from 'lucide-react';

const SplitScreenHero = () => {
    return (
        <div className="w-full h-full min-h-[400px] grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-[#0a0a0b]">
            {/* Left Content */}
            <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-black dark:text-white text-slate-900 mb-3 leading-tight">Design<br/>Without<br/>Limits.</h1>
                <p className="text-xs dark:text-slate-400 text-slate-500 mb-6 leading-relaxed">
                    Create stunning interfaces with our comprehensive component library. Open source and free forever.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold dark:text-white text-slate-900 group cursor-pointer hover:text-pink-500 transition-colors">
                    See Portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            {/* Right Visual */}
            <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-bl from-pink-500 to-orange-400 opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full blur-2xl animate-pulse"></div>
                <div className="w-32 h-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl transform rotate-12 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
            </div>
        </div>
    )
}
export default SplitScreenHero;`,

  51: `import React from 'react';
import { Play } from 'lucide-react';

const CinematicGlowHero = () => {
    return (
        <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Pulse Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mix-blend-overlay opacity-90 drop-shadow-lg">
                    IMPACT
                </h1>
                <p className="text-indigo-200 text-xs md:text-sm tracking-[0.3em] uppercase mt-4 opacity-70">The Future of Digital Experiences</p>

                <div className="mt-10 flex justify-center">
                     <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110">
                         <Play size={20} fill="currentColor" />
                     </button>
                </div>
            </div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
        </div>
    )
}
export default CinematicGlowHero;`,

  // === NEW REUSABLE UI COMPONENTS (52-71) ===

  52: `import React, { useRef, useState, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magnetStrength?: number;
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magnetStrength = 0.4,
  variant = 'default',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * magnetStrength;
    const distY = (e.clientY - centerY) * magnetStrength;
    setPosition({ x: distX, y: distY });
  }, [magnetStrength]);

  const variantStyles = {
    default: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25',
    outline: 'border-2 border-violet-500 text-violet-500',
    ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300',
    gradient: 'bg-[linear-gradient(135deg,#667eea,#764ba2,#f093fb)] text-white bg-[length:200%_200%]',
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setPosition({ x: 0, y: 0 }); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      className={\`px-6 py-3 rounded-xl font-medium transition-all \${variantStyles[variant]} \${className}\`}
      style={{ transform: \`translate(\${position.x}px, \${position.y}px) scale(\${isHovered ? 1.05 : 1})\` }}
    >
      {children}
    </button>
  );
};

export default MagneticButton;`,

  53: `import React, { useState, useCallback } from 'react';

interface RippleButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, []);

  const variantStyles = {
    primary: 'bg-violet-600 hover:bg-violet-700 text-white',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizeStyles = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5', lg: 'px-7 py-3.5 text-lg' };

  return (
    <button onClick={handleClick} className={\`relative overflow-hidden rounded-lg \${variantStyles[variant]} \${sizeStyles[size]}\`}>
      <span className="relative z-10">{children}</span>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/40 animate-[ripple_0.6s_ease-out]"
          style={{ left: ripple.x, top: ripple.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}
      <style>{\`@keyframes ripple { to { width: 500px; height: 500px; opacity: 0; } }\`}</style>
    </button>
  );
};

export default RippleButton;`,

  54: `import React from 'react';

interface GlowingTextProps {
  children: React.ReactNode;
  color?: 'violet' | 'cyan' | 'emerald' | 'pink' | 'rainbow';
  intensity?: 'soft' | 'medium' | 'strong';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const GlowingText: React.FC<GlowingTextProps> = ({
  children,
  color = 'violet',
  intensity = 'medium',
  as: Component = 'span',
}) => {
  const colorStyles = {
    violet: 'text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]',
    cyan: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]',
    emerald: 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]',
    pink: 'text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]',
    rainbow: 'bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent',
  };

  const intensityStyles = {
    soft: 'brightness-100',
    medium: 'brightness-110',
    strong: 'brightness-125 drop-shadow-[0_0_25px_currentColor]',
  };

  return (
    <Component className={\`\${colorStyles[color]} \${intensityStyles[intensity]} animate-pulse\`}>
      {children}
    </Component>
  );
};

export default GlowingText;`,

  55: `import React, { useState, useEffect, useCallback } from 'react';

interface TypingTextProps {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
}) => {
  const texts = Array.isArray(text) ? text : [text];
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typeText = useCallback(() => {
    const currentText = texts[textIndex];
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      } else if (texts.length > 1 || loop) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }
  }, [displayText, isDeleting, textIndex, texts, loop, pauseDuration]);

  useEffect(() => {
    const timer = setTimeout(typeText, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timer);
  }, [typeText, isDeleting, speed, deleteSpeed]);

  return (
    <span className="inline-flex items-center">
      {displayText}
      <span className="ml-0.5 animate-pulse text-violet-500">|</span>
    </span>
  );
};

export default TypingText;`,

  56: `import React from 'react';

interface GlitchTextProps {
  children: string;
  intensity?: 'subtle' | 'medium' | 'intense';
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  intensity = 'medium',
}) => {
  const offset = { subtle: 2, medium: 4, intense: 8 }[intensity];

  return (
    <>
      <span className="relative inline-block glitch-text" data-text={children}>
        {children}
      </span>
      <style>{\`
        .glitch-text { animation: glitch 2.5s infinite; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #00ffff;
          animation: glitch-before 2.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        .glitch-text::after {
          color: #ff0040;
          animation: glitch-after 2.5s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }
        @keyframes glitch-before {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-\${offset}px, 0); }
          94% { transform: translate(\${offset}px, 0); }
        }
        @keyframes glitch-after {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(\${offset}px, 0); }
          94% { transform: translate(-\${offset}px, 0); }
        }
      \`}</style>
    </>
  );
};

export default GlitchText;`,

  57: `import React, { useRef, useState, useCallback } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
  intensity?: number;
  glare?: boolean;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  intensity = 15,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTransform({ rotateX: -y * intensity, rotateY: x * intensity });
    setGlarePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTransform({ rotateX: 0, rotateY: 0 }); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
      style={{
        transform: \`perspective(1000px) rotateX(\${transform.rotateX}deg) rotateY(\${transform.rotateY}deg)\`,
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: \`radial-gradient(circle at \${glarePos.x}% \${glarePos.y}%, rgba(255,255,255,0.15), transparent 60%)\` }}
        />
      )}
    </div>
  );
};

export default ParallaxCard;`,

  58: `import React from 'react';

interface MorphingBlobProps {
  color?: 'violet' | 'cyan' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  blur?: boolean;
}

const MorphingBlob: React.FC<MorphingBlobProps> = ({
  color = 'gradient',
  size = 'md',
  blur = true,
}) => {
  const sizeStyles = { sm: 'w-32 h-32', md: 'w-64 h-64', lg: 'w-96 h-96' };
  const colorStyles = {
    violet: 'bg-violet-500',
    cyan: 'bg-cyan-500',
    gradient: 'bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-500',
  };

  return (
    <div className={\`relative \${sizeStyles[size]}\`}>
      <div
        className={\`absolute inset-0 \${colorStyles[color]} \${blur ? 'blur-3xl' : ''} rounded-full opacity-60 animate-morph\`}
      />
      <style>{\`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg); }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(180deg); }
        }
        .animate-morph { animation: morph 8s ease-in-out infinite; }
      \`}</style>
    </div>
  );
};

export default MorphingBlob;`,

  59: `import React, { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  color?: 'violet' | 'cyan' | 'mixed';
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  color = 'mixed',
}) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    })), [count]);

  const colors = {
    violet: ['bg-violet-400', 'bg-violet-500'],
    cyan: ['bg-cyan-400', 'bg-cyan-500'],
    mixed: ['bg-violet-400', 'bg-cyan-400', 'bg-pink-400'],
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={p.id}
          className={\`absolute rounded-full \${colors[color][i % colors[color].length]}\`}
          style={{
            width: p.size,
            height: p.size,
            left: \`\${p.x}%\`,
            top: \`\${p.y}%\`,
            animation: \`float-up \${p.duration}s linear infinite\`,
            animationDelay: \`\${p.delay}s\`,
          }}
        />
      ))}
      <style>{\`@keyframes float-up { to { transform: translateY(-100vh); opacity: 0; } }\`}</style>
    </div>
  );
};

export default FloatingParticles;`,

  60: `import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  gradient?: 'rainbow' | 'sunset' | 'ocean';
  animated?: boolean;
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  gradient = 'rainbow',
  animated = true,
}) => {
  const gradients = {
    rainbow: 'linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #00f2fe, #43e97b, #f093fb)',
    sunset: 'linear-gradient(135deg, #fa709a, #fee140, #fa709a)',
    ocean: 'linear-gradient(135deg, #667eea, #764ba2, #667eea)',
  };

  return (
    <div className="relative rounded-xl group">
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: gradients[gradient],
          backgroundSize: animated ? '300% 300%' : '100% 100%',
          animation: animated ? 'gradient-rotate 3s linear infinite' : 'none',
        }}
      />
      <div className="relative bg-white dark:bg-[#0a0a0b] rounded-xl m-[2px]">
        {children}
      </div>
      <style>{\`
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      \`}</style>
    </div>
  );
};

export default GradientBorder;`,

  61: `import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={\`bg-slate-200 dark:bg-slate-800 \${variantStyles[variant]} animate-shimmer\`}
          style={{
            width: width || '100%',
            height: height || (variant === 'text' ? 16 : 100),
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      ))}
      <style>{\`@keyframes shimmer { to { background-position: 200% 0; } }\`}</style>
    </div>
  );
};

export default SkeletonLoader;`,

  62: `import React, { useState, useEffect, useRef } from 'react';

interface NumberCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(eased * end);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export default NumberCounter;`,

  63: `import React, { useState, useCallback, useRef } from 'react';

interface SpotlightProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
}

const Spotlight: React.FC<SpotlightProps> = ({
  children,
  color = 'rgba(139, 92, 246, 0.15)',
  size = 400,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden"
    >
      <div
        className="absolute pointer-events-none transition-opacity"
        style={{
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          width: size,
          height: size,
          background: \`radial-gradient(circle, \${color} 0%, transparent 70%)\`,
          filter: 'blur(80px)',
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Spotlight;`,

  64: `import React, { useState, useEffect, useRef } from 'react';

interface TextRevealProps {
  children: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  stagger?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  direction = 'up',
  stagger = 30,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const words = children.split(' ');

  const transforms = {
    up: { initial: 'translateY(100%)', final: 'translateY(0)' },
    down: { initial: 'translateY(-100%)', final: 'translateY(0)' },
    left: { initial: 'translateX(100%)', final: 'translateX(0)' },
    right: { initial: 'translateX(-100%)', final: 'translateX(0)' },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block transition-transform duration-500"
            style={{
              transform: isRevealed ? transforms[direction].final : transforms[direction].initial,
              transitionDelay: \`\${i * stagger}ms\`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};

export default TextReveal;`,

  65: `import React from 'react';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
}) => {
  return (
    <div className={\`overflow-hidden \${pauseOnHover ? 'group' : ''}\`}>
      <div
        className="flex gap-8 group-hover:[animation-play-state:paused]"
        style={{
          animation: \`marquee-\${direction} \${100 / speed}s linear infinite\`,
        }}
      >
        <div className="flex gap-8 shrink-0">{children}</div>
        <div className="flex gap-8 shrink-0" aria-hidden>{children}</div>
      </div>
      <style>{\`
        @keyframes marquee-left { to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      \`}</style>
    </div>
  );
};

export default InfiniteMarquee;`,

  66: `import React, { useState, useEffect, useRef } from 'react';

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'violet' | 'cyan' | 'gradient';
}

const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'violet',
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - animatedValue / max);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const startTime = performance.now();
        const animate = (time: number) => {
          const progress = Math.min((time - startTime) / 1500, 1);
          setAnimatedValue((1 - Math.pow(1 - progress, 3)) * value);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const colors = { violet: '#8b5cf6', cyan: '#06b6d4', gradient: 'url(#gradient)' };

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {color === 'gradient' && (
          <defs>
            <linearGradient id="gradient"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient>
          </defs>
        )}
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={colors[color]} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-lg font-semibold">{Math.round(animatedValue)}%</span>
    </div>
  );
};

export default RadialProgress;`,

  67: `import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => { timeoutRef.current = setTimeout(() => setIsVisible(true), 200); }}
      onMouseLeave={() => { clearTimeout(timeoutRef.current); setIsVisible(false); }}
    >
      {children}
      {isVisible && (
        <div className={\`absolute z-50 px-3 py-2 text-sm bg-slate-900 text-white rounded-lg whitespace-nowrap \${positions[position]} animate-fade-in\`}>
          {content}
        </div>
      )}
      <style>{\`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.15s ease-out; }\`}</style>
    </div>
  );
};

export default Tooltip;`,

  68: `import React from 'react';

interface SwitchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: 'default' | 'gradient' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({
  checked,
  onChange,
  variant = 'default',
  size = 'md',
  label,
}) => {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
    lg: { track: 'w-16 h-8', thumb: 'w-7 h-7', translate: 'translate-x-8' },
  };

  const variants = {
    default: checked ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700',
    gradient: checked ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500' : 'bg-slate-300 dark:bg-slate-700',
    glow: checked ? 'bg-violet-600 shadow-lg shadow-violet-500/50' : 'bg-slate-300 dark:bg-slate-700',
  };

  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={\`relative rounded-full transition-all \${sizes[size].track} \${variants[variant]}\`}
      >
        <span className={\`absolute rounded-full bg-white transition-transform \${sizes[size].thumb} \${checked ? sizes[size].translate : 'translate-x-0.5'} top-0.5\`} />
      </div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
};

export default SwitchToggle;`,

  69: `import React from 'react';

interface ShimmerCardProps {
  children: React.ReactNode;
  shimmerSpeed?: 'slow' | 'medium' | 'fast';
}

const ShimmerCard: React.FC<ShimmerCardProps> = ({
  children,
  shimmerSpeed = 'medium',
}) => {
  const speeds = { slow: '3s', medium: '2s', fast: '1s' };

  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shimmer-card">
      <div className="relative z-10">{children}</div>
      <div
        className="absolute inset-0 shimmer-effect"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          width: 200,
          animation: \`shimmer-slide \${speeds[shimmerSpeed]} ease-in-out infinite\`,
        }}
      />
      <style>{\`
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(calc(100% + 200px)); }
        }
      \`}</style>
    </div>
  );
};

export default ShimmerCard;`,

  70: `import React, { useRef, useState, useCallback } from 'react';

interface HoverTiltProps {
  children: React.ReactNode;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
}

const HoverTilt: React.FC<HoverTiltProps> = ({
  children,
  maxTilt = 15,
  glare = true,
  scale = 1.02,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTransform({ rotateX: -y * maxTilt, rotateY: x * maxTilt });
    setGlarePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTransform({ rotateX: 0, rotateY: 0 }); setIsHovered(false); }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <div
        style={{
          transform: \`rotateX(\${transform.rotateX}deg) rotateY(\${transform.rotateY}deg) scale(\${isHovered ? scale : 1})\`,
          transition: isHovered ? 'none' : 'transform 0.4s ease-out',
        }}
      >
        {children}
        {glare && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{ background: \`radial-gradient(circle at \${glarePos.x}% \${glarePos.y}%, rgba(255,255,255,0.2), transparent 60%)\` }}
          />
        )}
      </div>
    </div>
  );
};

export default HoverTilt;`,

  71: `import React, { useState, useEffect, useCallback, useRef } from 'react';

interface MagneticCursorProps {
  children: React.ReactNode;
  cursorSize?: number;
  cursorColor?: string;
  trailEffect?: boolean;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({
  children,
  cursorSize = 20,
  cursorColor = 'rgba(139, 92, 246, 0.5)',
  trailEffect = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    if (trailEffect) {
      idRef.current++;
      setTrail(prev => [...prev.slice(-4), { x, y, id: idRef.current }]);
    }
  }, [trailEffect]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={ref}
      className="relative"
      style={{ cursor: isInside ? 'none' : 'auto' }}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => { setIsInside(false); setTrail([]); }}
    >
      {children}
      {trailEffect && trail.map((p, i) => (
        <div
          key={p.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: p.x, top: p.y,
            width: cursorSize * (0.3 + (i / 5) * 0.7),
            height: cursorSize * (0.3 + (i / 5) * 0.7),
            backgroundColor: cursorColor,
            opacity: 0.2 + (i / 5) * 0.3,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {isInside && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{ left: pos.x, top: pos.y, width: cursorSize, height: cursorSize, backgroundColor: cursorColor, transform: 'translate(-50%, -50%)' }}
        />
      )}
    </div>
  );
};

// MagneticElement wrapper for magnetic targets
export const MagneticElement: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-magnetic>{children}</div>
);

export default MagneticCursor;`,

  72: `'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
}

interface AnimatedPricingCardProps {
  tier: PricingTier;
  onSelect?: () => void;
  delay?: number;
  className?: string;
}

export const AnimatedPricingCard: React.FC<AnimatedPricingCardProps> = ({
  tier,
  onSelect,
  delay = 0,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={\`relative \${className}\`}
    >
      {tier.highlighted && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl blur-lg opacity-75"
          animate={{ opacity: isHovered ? 1 : 0.75, scale: isHovered ? 1.02 : 1 }}
        />
      )}

      <div className={\`relative p-8 rounded-2xl border \${
        tier.highlighted
          ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-violet-500/50'
          : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/10'
      }\`}>
        <AnimatePresence>
          {tier.badge && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold">
                <Sparkles size={12} />
                {tier.badge}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mb-6">
          <motion.h3
            className={\`text-xl font-bold mb-2 \${tier.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}\`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {tier.name}
          </motion.h3>
          <p className={\`text-sm \${tier.highlighted ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}\`}>
            {tier.description}
          </p>
        </div>

        <div className="text-center mb-6">
          <motion.div className="flex items-baseline justify-center gap-1" animate={{ scale: isHovered ? 1.1 : 1 }}>
            <span className={\`text-5xl font-black \${tier.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}\`}>
              {tier.price}
            </span>
            {tier.period && <span className={\`text-sm \${tier.highlighted ? 'text-slate-400' : 'text-slate-400'}\`}>/{tier.period}</span>}
          </motion.div>
        </div>

        <ul className="space-y-3 mb-8">
          {tier.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <motion.span
                className={\`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center \${
                  tier.highlighted ? 'bg-violet-500/20 text-violet-400' : 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }\`}
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Check size={12} />
              </motion.span>
              <span className={\`text-sm \${tier.highlighted ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}\`}>
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={onSelect}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={\`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 \${
            tier.highlighted ? 'bg-white text-slate-900' : 'bg-slate-900 dark:bg-white/10 text-white'
          }\`}
        >
          <Zap size={16} />
          {tier.ctaText || 'Get Started'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnimatedPricingCard;`,

  73: `'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string | number;
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialShowcaseProps {
  testimonials: Testimonial[];
  variant?: 'cards' | 'wall' | 'featured' | 'minimal';
  className?: string;
  columns?: 2 | 3 | 4;
}

export const TestimonialShowcase: React.FC<TestimonialShowcaseProps> = ({
  testimonials,
  variant = 'cards',
  className = '',
  columns = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [current, setCurrent] = useState(0);

  const renderCards = () => (
    <div className={\`grid gap-6 grid-cols-1 md:grid-cols-\${columns}\`}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="relative p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10"
        >
          <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Quote size={14} className="text-violet-500" />
          </div>
          {testimonial.rating && (
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < testimonial.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'} />
              ))}
            </div>
          )}
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">"{testimonial.content}"</p>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">{testimonial.author}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderFeatured = () => (
    <div className="text-center max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mx-auto mb-8">
            <Quote className="text-white" size={28} />
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-relaxed mb-8">
            "{testimonials[current].content}"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
              {testimonials[current].author.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-bold text-lg text-slate-900 dark:text-white">{testimonials[current].author}</p>
              <p className="text-slate-500 dark:text-slate-400">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-4 mt-12">
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <ChevronLeft size={20} />
        </motion.button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button key={index} onClick={() => setCurrent(index)} className={\`h-2 rounded-full transition-all \${index === current ? 'w-8 bg-violet-500' : 'w-2 bg-slate-300 dark:bg-slate-600'}\`} />
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      {variant === 'cards' && renderCards()}
      {variant === 'featured' && renderFeatured()}
    </div>
  );
};

export default TestimonialShowcase;`,

  74: `'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: number;
}

interface AnimatedStatsCounterProps {
  stats: StatItem[];
  duration?: number;
  className?: string;
  variant?: 'cards' | 'inline' | 'minimal';
}

const AnimatedNumber: React.FC<{ value: number; duration: number; prefix?: string; suffix?: string }> = ({ value, duration, prefix = '', suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}<motion.span>{display}</motion.span>{suffix}
    </span>
  );
};

export const AnimatedStatsCounter: React.FC<AnimatedStatsCounterProps> = ({ stats, duration = 2, className = '', variant = 'cards' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className={\`grid grid-cols-2 md:grid-cols-4 gap-4 \${className}\`}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: index * 0.1, type: 'spring' }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            {stat.icon && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white mb-4"
              >
                {stat.icon}
              </motion.div>
            )}
            <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
              <AnimatedNumber value={stat.value} duration={duration} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
            {stat.trend !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className={\`flex items-center gap-1 text-xs font-medium \${stat.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}\`}
              >
                <ArrowUpRight size={14} className={stat.trend < 0 ? 'rotate-90' : ''} />
                {Math.abs(stat.trend)}% vs last month
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStatsCounter;`,

  75: `'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface TimelineStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
  className?: string;
  variant?: 'vertical' | 'horizontal';
  animated?: boolean;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps, className = '', variant = 'vertical', animated = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <div ref={containerRef} className={\`relative \${className}\`}>
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800">
        {animated && <motion.div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-violet-500 to-pink-500" style={{ height: lineHeight }} />}
      </div>
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, type: 'spring' }}
            className="relative flex gap-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.1, type: 'spring' }}
              className={\`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center \${
                step.status === 'completed' ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                step.status === 'current' ? 'bg-gradient-to-br from-violet-500 to-pink-500 ring-4 ring-violet-500/20' :
                'bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700'
              }\`}
            >
              {step.icon ? (
                <span className={step.status === 'upcoming' ? 'text-slate-400' : 'text-white'}>{step.icon}</span>
              ) : (
                <span className={\`text-sm font-bold \${step.status === 'upcoming' ? 'text-slate-400' : 'text-white'}\`}>{index + 1}</span>
              )}
              {step.status === 'current' && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-violet-500"
                  animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div className="flex-1 pt-1">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.2 }}
                className={\`text-lg font-bold mb-2 \${step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900 dark:text-white'}\`}
              >
                {step.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="text-slate-500 dark:text-slate-400"
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;`,

  76: `'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BentoItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  span?: 'normal' | 'wide' | 'tall' | 'large';
  gradient?: string;
}

interface FeatureBentoProps {
  items: BentoItem[];
  className?: string;
  animated?: boolean;
}

const getSpanClasses = (span: BentoItem['span']): string => {
  switch (span) {
    case 'wide': return 'md:col-span-2';
    case 'tall': return 'md:row-span-2';
    case 'large': return 'md:col-span-2 md:row-span-2';
    default: return '';
  }
};

export const FeatureBento: React.FC<FeatureBentoProps> = ({ items, className = '', animated = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className={\`grid grid-cols-1 md:grid-cols-3 gap-4 \${className}\`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, y: 30, scale: 0.95 } : {}}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
          whileHover={{ scale: 1.02, y: -5 }}
          className={\`group relative overflow-hidden rounded-3xl \${getSpanClasses(item.span)}\`}
        >
          <div className={\`absolute inset-0 \${item.gradient || 'bg-gradient-to-br from-slate-900 to-slate-800'}\`} />
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 50%)' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
            {item.icon && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-white backdrop-blur-sm border border-white/10"
              >
                {item.icon}
              </motion.div>
            )}
            <div className="mt-auto">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-xl font-bold text-white mb-2"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="text-slate-400 text-sm leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureBento;`,

  77: `'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Logo {
  name: string;
  icon?: React.ReactNode;
}

interface LogoCloudProps {
  logos: Logo[];
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'grid' | 'scroll' | 'fade';
  grayscale?: boolean;
  speed?: number;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({
  logos,
  title,
  subtitle,
  className = '',
  variant = 'grid',
  grayscale = true,
  speed = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const renderGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
      {logos.map((logo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1, type: 'spring' }}
          whileHover={{ scale: 1.1, y: -5 }}
          className={\`flex items-center justify-center p-4 rounded-xl transition-all \${
            grayscale ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100' : ''
          } bg-slate-100 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg\`}
        >
          {logo.icon ? (
            <div className="text-slate-600 dark:text-slate-300">{logo.icon}</div>
          ) : (
            <span className="font-bold text-sm text-slate-600 dark:text-slate-300">{logo.name}</span>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderScroll = () => (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#0a0a0b] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#0a0a0b] to-transparent z-10" />
      <motion.div
        className="flex gap-8 items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { duration: speed, repeat: Infinity, ease: 'linear' } }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className={\`flex-shrink-0 flex items-center justify-center p-6 rounded-xl \${
              grayscale ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100' : ''
            } bg-slate-100 dark:bg-white/5\`}
          >
            {logo.icon ? (
              <div className="text-slate-600 dark:text-slate-300 text-3xl">{logo.icon}</div>
            ) : (
              <span className="font-bold text-lg text-slate-600 dark:text-slate-300 whitespace-nowrap">{logo.name}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          {subtitle && <p className="text-sm text-violet-500 font-medium uppercase tracking-wider mb-2">{subtitle}</p>}
          {title && <h3 className="text-lg text-slate-600 dark:text-slate-300">{title}</h3>}
        </motion.div>
      )}
      {variant === 'grid' && renderGrid()}
      {variant === 'scroll' && renderScroll()}
    </div>
  );
};

export default LogoCloud;`,

  78: `'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';

interface CTABannerProps {
  title: string;
  description?: string;
  primaryCTA?: { text: string; onClick?: () => void };
  secondaryCTA?: { text: string; onClick?: () => void };
  className?: string;
  variant?: 'gradient' | 'glass' | 'dark' | 'bordered';
  animated?: boolean;
  icon?: React.ReactNode;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className = '',
  variant = 'gradient',
  animated = true,
  icon,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient': return 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600';
      case 'glass': return 'bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10';
      case 'dark': return 'bg-slate-900 dark:bg-slate-800';
      case 'bordered': return 'bg-transparent border-2 border-violet-500';
      default: return '';
    }
  };

  const textColorClass = variant === 'glass' || variant === 'bordered' ? 'text-slate-900 dark:text-white' : 'text-white';

  return (
    <motion.div
      ref={containerRef}
      initial={animated ? { opacity: 0, y: 30 } : {}}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring' }}
      className={\`relative overflow-hidden rounded-3xl \${getVariantStyles()} \${className}\`}
    >
      {variant === 'gradient' && (
        <>
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%]"
            animate={{ backgroundPosition: ['200% 0%', '-50% 0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}
      {animated && (
        <>
          <motion.div className="absolute top-4 left-[10%] text-white/20" animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Star size={24} />
          </motion.div>
          <motion.div className="absolute bottom-4 right-[15%] text-white/20" animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Sparkles size={20} />
          </motion.div>
        </>
      )}
      <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left max-w-2xl">
          {icon && (
            <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ type: 'spring', delay: 0.2 }} className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 mb-4">
              {icon}
            </motion.div>
          )}
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className={\`text-2xl md:text-4xl font-black mb-3 \${textColorClass}\`}>
            {title}
          </motion.h2>
          {description && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className={\`text-lg \${variant === 'glass' || variant === 'bordered' ? 'text-slate-600 dark:text-slate-300' : 'text-white/80'}\`}>
              {description}
            </motion.p>
          )}
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
          {primaryCTA && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={primaryCTA.onClick} className={\`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 \${variant === 'gradient' || variant === 'dark' ? 'bg-white text-slate-900' : 'bg-violet-600 text-white'}\`}>
              <Zap size={18} />
              {primaryCTA.text}
              <ArrowRight size={18} />
            </motion.button>
          )}
          {secondaryCTA && (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={secondaryCTA.onClick} className={\`px-8 py-4 rounded-xl font-bold border-2 \${variant === 'gradient' || variant === 'dark' ? 'border-white/30 text-white' : 'border-violet-500 text-violet-600'}\`}>
              {secondaryCTA.text}
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CTABanner;`,

  79: `'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface FeatureTabsProps {
  tabs: Tab[];
  className?: string;
  variant?: 'pills' | 'underline' | 'cards';
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export const FeatureTabs: React.FC<FeatureTabsProps> = ({ tabs, className = '', variant = 'pills', defaultTab, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const renderPills = () => (
    <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/50 backdrop-blur-sm">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => handleTabChange(tab.id)} className="relative px-6 py-3 rounded-xl text-sm font-medium transition-colors">
          {activeTab === tab.id && (
            <motion.div layoutId="activeTab" className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-lg" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
          <span className={\`relative z-10 flex items-center gap-2 \${activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}\`}>
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );

  const renderUnderline = () => (
    <div className="relative border-b border-slate-200 dark:border-slate-700">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={\`relative pb-4 px-1 text-sm font-medium transition-colors \${activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}\`}>
            <span className="flex items-center gap-2">{tab.icon}{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className={\`relative p-6 rounded-2xl text-left transition-all \${
            activeTab === tab.id ? 'bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-500/20 dark:to-pink-500/20 border-2 border-violet-500' : 'bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700'
          }\`}
        >
          {tab.icon && (
            <div className={\`w-10 h-10 rounded-xl flex items-center justify-center mb-3 \${activeTab === tab.id ? 'bg-violet-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}\`}>
              {tab.icon}
            </div>
          )}
          <span className={\`font-semibold \${activeTab === tab.id ? 'text-violet-700 dark:text-white' : 'text-slate-700 dark:text-slate-300'}\`}>{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className={\`\${variant === 'cards' ? '' : 'flex justify-center mb-8'}\`}>
        {variant === 'pills' && renderPills()}
        {variant === 'underline' && renderUnderline()}
        {variant === 'cards' && renderCards()}
      </motion.div>
      <div className={variant === 'cards' ? 'mt-8' : ''}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.3, type: 'spring' }}>
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeatureTabs;`,

  80: `'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  icon?: React.ReactNode;
  color?: string;
  description?: string;
}

interface IntegrationOrbitProps {
  integrations: Integration[];
  centerContent?: React.ReactNode;
  className?: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  pauseOnHover?: boolean;
}

export const IntegrationOrbit: React.FC<IntegrationOrbitProps> = ({
  integrations,
  centerContent,
  className = '',
  orbitRadius = 120,
  orbitSpeed = 30,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hoveredIntegration = integrations.find((i) => i.id === hoveredItem);

  return (
    <div
      ref={containerRef}
      className={\`relative flex items-center justify-center \${className}\`}
      style={{ minHeight: orbitRadius * 2.5 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => { pauseOnHover && setIsPaused(false); setHoveredItem(null); }}
    >
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="relative z-20">
        {centerContent || (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <span className="text-3xl text-white font-bold">✦</span>
          </div>
        )}
      </motion.div>
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-full" style={{ width: orbitRadius * 2, height: orbitRadius * 2 }} />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: isPaused ? 0 : 360 }}
        transition={{ duration: orbitSpeed, repeat: Infinity, ease: 'linear' }}
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {integrations.map((integration, index) => {
          const angle = (360 / integrations.length) * index;
          const isHovered = hoveredItem === integration.id;
          return (
            <motion.div
              key={integration.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: 'spring', delay: 0.3 + index * 0.1 }}
              className="absolute"
              style={{ transform: \`rotate(\${angle}deg) translateX(\${orbitRadius}px) rotate(-\${angle}deg)\` }}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={() => setHoveredItem(integration.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={\`cursor-pointer transition-all duration-300 \${isHovered ? 'z-30' : 'z-10'}\`}
                style={{ transform: isPaused ? 'none' : \`rotate(-\${angle}deg)\` }}
              >
                <motion.div animate={{ rotate: isPaused ? 0 : -360 }} transition={{ duration: orbitSpeed, repeat: Infinity, ease: 'linear' }} style={{ animationPlayState: isPaused ? 'paused' : 'running' }}>
                  <div className={\`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 \${isHovered ? 'ring-4 ring-violet-500/30 shadow-lg shadow-violet-500/20' : ''} \${integration.color || 'bg-white dark:bg-slate-800'} border border-slate-200 dark:border-slate-700\`}>
                    {integration.icon ? <span className="text-2xl">{integration.icon}</span> : <span className="font-bold text-sm text-slate-900 dark:text-white">{integration.name.charAt(0)}</span>}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      <AnimatePresence>
        {hoveredIntegration && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-40">
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 text-center">
              <p className="font-bold text-slate-900 dark:text-white">{hoveredIntegration.name}</p>
              {hoveredIntegration.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{hoveredIntegration.description}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntegrationOrbit;`,

  81: `'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationToastProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}

const getIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success': return <CheckCircle className="text-emerald-500" size={20} />;
    case 'error': return <AlertCircle className="text-red-500" size={20} />;
    case 'warning': return <AlertTriangle className="text-amber-500" size={20} />;
    case 'info': return <Info className="text-blue-500" size={20} />;
  }
};

const getTypeStyles = (type: Toast['type']) => {
  switch (type) {
    case 'success': return 'border-l-4 border-l-emerald-500';
    case 'error': return 'border-l-4 border-l-red-500';
    case 'warning': return 'border-l-4 border-l-amber-500';
    case 'info': return 'border-l-4 border-l-blue-500';
  }
};

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void; position: string }> = ({ toast, onDismiss, position }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.duration) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / toast.duration!) * 100);
      setProgress(remaining);
      if (remaining === 0) onDismiss(toast.id);
    }, 10);
    return () => clearInterval(interval);
  }, [toast.duration, toast.id, onDismiss]);

  const isRight = position?.includes('right');
  const isBottom = position?.includes('bottom');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: isRight ? 100 : position?.includes('left') ? -100 : 0, y: isBottom ? 100 : -100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: isRight ? 100 : position?.includes('left') ? -100 : 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      className={\`relative mb-3 w-80 overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 \${getTypeStyles(toast.type)}\`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
            {getIcon(toast.type)}
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 dark:text-white">{toast.title}</p>
            {toast.message && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{toast.message}</p>}
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => onDismiss(toast.id)} className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X size={16} className="text-slate-500 dark:text-slate-400" />
          </motion.button>
        </div>
      </div>
      {toast.duration && <motion.div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500" initial={{ width: '100%' }} animate={{ width: \`\${progress}%\` }} transition={{ duration: 0.1 }} />}
    </motion.div>
  );
};

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss, position = 'top-right', className = '' }) => {
  return (
    <div className={\`fixed z-50 \${positionStyles[position]} \${className}\`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} position={position} />)}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;`,

  82: `'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface MorphingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
  variant?: 'fade' | 'slide' | 'flip' | 'blur' | 'typewriter' | 'scramble';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  prefix?: string;
  suffix?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className = '',
  interval = 3000,
  variant = 'fade',
  as: Component = 'span',
  prefix = '',
  suffix = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % texts.length), interval);
    return () => clearInterval(timer);
  }, [texts.length, interval, isInView]);

  useEffect(() => {
    if (variant !== 'scramble') return;
    const targetText = texts[currentIndex];
    let iteration = 0;
    const scrambleInterval = setInterval(() => {
      setDisplayText(targetText.split('').map((char, index) => (index < iteration ? char : char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''));
      iteration += 1 / 3;
      if (iteration >= targetText.length) { clearInterval(scrambleInterval); setDisplayText(targetText); }
    }, 30);
    return () => clearInterval(scrambleInterval);
  }, [currentIndex, texts, variant]);

  useEffect(() => {
    if (variant !== 'typewriter') return;
    const targetText = texts[currentIndex];
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= targetText.length) { setDisplayText(targetText.slice(0, charIndex)); charIndex++; } else { clearInterval(typeInterval); }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [currentIndex, texts, variant]);

  const renderFade = () => (
    <AnimatePresence mode="wait">
      <motion.span key={currentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
        {texts[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );

  const renderSlide = () => (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span key={currentIndex} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} className="block">
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  const renderBlur = () => (
    <AnimatePresence mode="wait">
      <motion.span key={currentIndex} initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 0.4 }}>
        {texts[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );

  const renderTypewriter = () => (
    <span>
      {displayText}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block ml-0.5 w-0.5 h-[1em] bg-current align-middle" />
    </span>
  );

  const renderScramble = () => (
    <span className="font-mono">
      {displayText.split('').map((char, i) => (
        <motion.span key={\`\${currentIndex}-\${i}\`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block">{char}</motion.span>
      ))}
    </span>
  );

  const renderContent = () => {
    switch (variant) {
      case 'slide': return renderSlide();
      case 'blur': return renderBlur();
      case 'typewriter': return renderTypewriter();
      case 'scramble': return renderScramble();
      default: return renderFade();
    }
  };

  return (
    <div ref={containerRef} className={\`inline-flex items-baseline \${className}\`}>
      {prefix && <span className="mr-2">{prefix}</span>}
      <Component className="inline-block">{renderContent()}</Component>
      {suffix && <span className="ml-2">{suffix}</span>}
    </div>
  );
};

export default MorphingText;`,

  83: `'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface FloatingDashboardProps {
  children?: React.ReactNode;
  image?: string;
  className?: string;
  variant?: '3d-tilt' | 'float' | 'parallax' | 'perspective';
  glowColor?: string;
  shadowIntensity?: 'light' | 'medium' | 'heavy';
}

export const FloatingDashboard: React.FC<FloatingDashboardProps> = ({
  children,
  image,
  className = '',
  variant = '3d-tilt',
  glowColor = 'rgba(139, 92, 246, 0.4)',
  shadowIntensity = 'medium',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

  const shadowClasses = { light: 'shadow-xl', medium: 'shadow-2xl shadow-black/20', heavy: 'shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)]' };

  const DashboardPlaceholder = () => (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 mb-3" />
            <div className="h-6 w-16 bg-slate-100 dark:bg-slate-700 rounded mb-1" />
            <div className="h-3 w-12 bg-slate-100/50 dark:bg-slate-700/50 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-40 rounded-xl bg-white dark:bg-slate-800 p-4">
          <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded mb-4" />
          <div className="flex items-end gap-2 h-24">
            {[40, 65, 45, 80, 55, 70, 60, 90, 75, 85].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-pink-500" style={{ height: \`\${h}%\` }} />
            ))}
          </div>
        </div>
        <div className="h-40 rounded-xl bg-white dark:bg-slate-800 p-4">
          <div className="h-4 w-16 bg-slate-100 dark:bg-slate-700 rounded mb-4" />
          <div className="relative w-full h-24 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-8 border-slate-200 dark:border-slate-700" />
            <div className="absolute w-20 h-20 rounded-full border-8 border-transparent border-t-violet-500 border-r-violet-500" style={{ transform: 'rotate(45deg)' }} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, type: 'spring' }}
      style={{ perspective: 1000 }}
      className={\`relative \${className}\`}
    >
      <motion.div className="absolute -inset-4 rounded-3xl blur-3xl" style={{ background: glowColor, opacity: 0.4 }} animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div
        className={\`relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 \${shadowClasses[shadowIntensity]}\`}
        animate={{ rotateX: mousePosition.y * -15, rotateY: mousePosition.x * 15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <div className="h-8 bg-slate-900 dark:bg-slate-800 flex items-center gap-2 px-4 border-b border-slate-700 dark:border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <div className="flex-1 mx-4">
            <div className="h-5 bg-slate-700 rounded-md flex items-center px-3">
              <span className="text-xs text-slate-400 truncate">app.yourproduct.com/dashboard</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900">
          {image ? <img src={image} alt="Dashboard" className="w-full" /> : children || <DashboardPlaceholder />}
        </div>
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: \`radial-gradient(circle at \${50 + mousePosition.x * 50}% \${50 + mousePosition.y * 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)\` }} />
      </motion.div>
    </motion.div>
  );
};

export default FloatingDashboard;`,

  84: `'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

interface AnimatedFAQProps {
  items: FAQItem[];
  className?: string;
  variant?: 'accordion' | 'cards' | 'minimal' | 'chat';
  allowMultiple?: boolean;
}

export const AnimatedFAQ: React.FC<AnimatedFAQProps> = ({ items, className = '', variant = 'accordion', allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<(string | number)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const toggleItem = (id: string | number) => {
    if (allowMultiple) {
      setOpenItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    } else {
      setOpenItems((prev) => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div ref={containerRef} className={\`space-y-4 \${className}\`}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden"
          >
            <div className={\`rounded-2xl border transition-all \${isOpen ? 'bg-white dark:bg-slate-800/50 border-violet-200 dark:border-violet-500/30 shadow-lg' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10'}\`}>
              <button onClick={() => toggleItem(item.id)} className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left">
                <span className={\`font-semibold transition-colors \${isOpen ? 'text-violet-700 dark:text-white' : 'text-slate-700 dark:text-slate-200'}\`}>{item.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={\`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center \${isOpen ? 'bg-violet-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}\`}>
                  <ChevronDown size={18} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedFAQ;`,

  85: `'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur';
  delay?: number;
  duration?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const variants: Record<string, Variants> = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  'slide-up': { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
  'slide-left': { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
  'slide-right': { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(10px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
};

export const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  variant = 'slide-up',
  delay = 0,
  duration = 0.6,
  once = true,
  stagger = false,
  staggerDelay = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px 0px 0px' });

  if (stagger && React.Children.count(children) > 1) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div variants={variants[variant]} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ duration, delay: delay + index * staggerDelay, ease: [0.25, 0.1, 0.25, 1] }}>
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div ref={ref} variants={variants[variant]} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;`,

  86: `'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavItem[];
  badge?: string;
}

interface AnimatedNavProps {
  logo?: React.ReactNode;
  items: NavItem[];
  cta?: { label: string; onClick?: () => void };
  className?: string;
  variant?: 'default' | 'floating' | 'minimal' | 'centered';
  transparent?: boolean;
  hideOnScroll?: boolean;
}

// Static preview version - simplified for display
export const AnimatedNav: React.FC<AnimatedNavProps> = ({
  logo,
  items,
  cta,
  className = '',
  variant = 'default',
  transparent = false,
}) => {
  const navBackground = 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10';

  return (
    <nav className={\`relative z-50 \${navBackground} \${className}\`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {logo || <span className="text-xl font-bold text-slate-900 dark:text-white">Logo</span>}
          </div>
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <a key={item.label} href={item.href || '#'} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-violet-500 transition-colors font-medium">
                {item.label}
              </a>
            ))}
          </div>
          {cta && (
            <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors">
              {cta.label}
              <ArrowRight size={16} />
            </button>
          )}
          <button className="md:hidden p-2 rounded-lg text-slate-900 dark:text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AnimatedNav;`,

  87: `'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'spotlight' | 'border' | 'ambient';
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  hoverEffect?: boolean;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  variant = 'default',
  glowColor = 'rgba(139, 92, 246, 0.5)',
  glowIntensity = 'medium',
  hoverEffect = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const intensityValues = { low: { blur: 40 }, medium: { blur: 80 }, high: { blur: 120 } };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (variant === 'spotlight') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={\`relative group overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 \${className}\`}
      >
        <motion.div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ background: \`radial-gradient(circle 200px at \${mousePosition.x}px \${mousePosition.y}px, \${glowColor}, transparent)\`, opacity: isHovered ? 1 : 0 }} />
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  if (variant === 'border') {
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={\`relative group \${className}\`}
      >
        <motion.div className="absolute -inset-[1px] rounded-2xl overflow-hidden" style={{ background: \`conic-gradient(from 0deg at 50% 50%, \${glowColor}, transparent 60%, \${glowColor})\` }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
        <div className="absolute -inset-[1px] rounded-2xl blur-sm" style={{ background: glowColor, opacity: isHovered ? 0.5 : 0.2 }} />
        <div className="relative rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={\`relative group \${className}\`}
    >
      <motion.div className="absolute -inset-2 rounded-3xl pointer-events-none" animate={{ opacity: hoverEffect ? (isHovered ? 0.8 : 0.4) : 0.4, scale: hoverEffect ? (isHovered ? 1.02 : 1) : 1 }} style={{ background: glowColor, filter: \`blur(\${intensityValues[glowIntensity].blur}px)\` }} />
      <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden">{children}</div>
    </motion.div>
  );
};

export default GlowingCard;`,

  88: `'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardData {
  id: string | number;
  content: React.ReactNode;
}

interface StackedCardsProps {
  cards: CardData[];
  className?: string;
  variant?: 'stack' | 'fan' | 'tinder' | 'deck';
  visibleCards?: number;
  onCardChange?: (index: number) => void;
}

export const StackedCards: React.FC<StackedCardsProps> = ({ cards, className = '', variant = 'stack', visibleCards = 3, onCardChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const nextCard = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(newIndex);
    onCardChange?.(newIndex);
  };

  if (variant === 'fan') {
    return (
      <div ref={containerRef} className={\`relative h-80 w-full flex items-center justify-center \${className}\`}>
        {cards.map((card, index) => {
          const isSelected = index === currentIndex;
          const offset = index - currentIndex;
          const rotation = offset * 8;
          const translateX = offset * 80;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2, scale: isSelected ? 1 : 0.85, x: translateX, rotate: rotation, zIndex: cards.length - Math.abs(offset) }}
              whileHover={isSelected ? { y: -10 } : {}}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => { setCurrentIndex(index); onCardChange?.(index); }}
              className="absolute cursor-pointer"
              style={{ transformOrigin: 'bottom center' }}
            >
              <div className={\`w-56 h-72 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-xl transition-shadow \${isSelected ? 'ring-2 ring-violet-500 shadow-2xl' : ''}\`}>
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={\`relative h-80 w-72 cursor-pointer \${className}\`} onClick={nextCard}>
      <AnimatePresence>
        {cards.map((card, index) => {
          const offset = (index - currentIndex + cards.length) % cards.length;
          if (offset > 3) return null;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1 - offset * 0.2, scale: 1 - offset * 0.05, y: -offset * 15, zIndex: cards.length - offset }}
              exit={{ opacity: 0, x: 300, rotate: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute inset-0"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-xl">
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); onCardChange?.(index); }} className={\`h-2 rounded-full transition-all \${index === currentIndex ? 'w-6 bg-violet-500' : 'w-2 bg-slate-300 dark:bg-slate-600'}\`} />
        ))}
      </div>
    </div>
  );
};

export default StackedCards;`,

  89: `'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';

interface ElasticSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
  variant?: 'default' | 'gradient' | 'glow' | 'stepped';
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export const ElasticSlider: React.FC<ElasticSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value: controlledValue,
  onChange,
  className = '',
  variant = 'default',
  label,
  showValue = true,
  formatValue = (v) => v.toString(),
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = (clientX: number) => {
    if (!sliderRef.current) return value;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
    const newValue = calculateValue(clientX);
    if (controlledValue === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClick = (e: React.MouseEvent) => {
    const newValue = calculateValue(e.clientX);
    if (controlledValue === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  if (variant === 'gradient') {
    return (
      <div className={\`space-y-2 \${className}\`}>
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>}
            {showValue && <span className="text-sm font-bold bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent tabular-nums">{formatValue(value)}</span>}
          </div>
        )}
        <div ref={sliderRef} onClick={handleClick} className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer overflow-hidden">
          <motion.div className="absolute h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full" style={{ width: \`\${percentage}%\` }} animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0.1}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileHover={{ scale: 1.2 }}
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full shadow-lg cursor-grab active:cursor-grabbing"
            style={{ left: \`calc(\${percentage}% - 12px)\`, boxShadow: isDragging ? '0 0 20px rgba(139, 92, 246, 0.6)' : 'none' }}
          >
            <div className="absolute inset-1 bg-white rounded-full" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={\`space-y-2 \${className}\`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>}
          {showValue && (
            <motion.span key={value} initial={{ scale: 1.2, color: 'rgb(139, 92, 246)' }} animate={{ scale: 1, color: '' }} className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
              {formatValue(value)}
            </motion.span>
          )}
        </div>
      )}
      <div ref={sliderRef} onClick={handleClick} className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer">
        <motion.div className="absolute h-full bg-violet-500 rounded-full" style={{ width: \`\${percentage}%\` }} layoutId="slider-fill" />
        <motion.div
          drag="x"
          dragConstraints={sliderRef}
          dragElastic={0.1}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-violet-500 cursor-grab active:cursor-grabbing"
          style={{ left: \`calc(\${percentage}% - 10px)\` }}
        >
          {isDragging && (
            <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute inset-0 bg-violet-500 rounded-full" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ElasticSlider;`,

  90: `'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string | number;
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  className = '',
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const currentIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const paginate = (newDirection: number) => setPage([page + newDirection, newDirection]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => paginate(1), autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, page]);

  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -10000) paginate(1);
    else if (swipe > 10000) paginate(-1);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.8 }),
  };

  const testimonial = testimonials[currentIndex];

  return (
    <div className={\`relative \${className}\`}>
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="p-8 md:p-12 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2 }} className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                  <Quote className="text-white" size={24} />
                </div>
              </motion.div>
              {testimonial.rating && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} className={i < testimonial.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300 dark:text-slate-600'} />)}
                </motion.div>
              )}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8">
                "{testimonial.content}"
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}{testimonial.company && \` at \${testimonial.company}\`}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {showNavigation && (
        <>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => paginate(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-white/10 flex items-center justify-center z-10">
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => paginate(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-white/10 flex items-center justify-center z-10">
            <ChevronRight size={20} />
          </motion.button>
        </>
      )}
      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <motion.button key={index} onClick={() => setPage([index, index > currentIndex ? 1 : -1])} className={\`h-2 rounded-full transition-all \${index === currentIndex ? 'w-8 bg-violet-500' : 'w-2 bg-slate-300 dark:bg-slate-600'}\`} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;`,

  91: `'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface NumberCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  easing?: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut';
  triggerOnView?: boolean;
  onComplete?: () => void;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  easing = 'easeOut',
  triggerOnView = true,
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeIn: (t: number) => t * t * t,
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  const formatNumber = useCallback((num: number): string => {
    const fixed = num.toFixed(decimals);
    if (separator) {
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, separator);
      return parts.join('.');
    }
    return fixed;
  }, [decimals, separator]);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const easingFn = easingFunctions[easing];

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn(progress);
      const currentValue = start + (end - start) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [start, end, duration, easing, onComplete]);

  useEffect(() => {
    if (!triggerOnView) {
      const timer = setTimeout(() => { setHasStarted(true); animate(); }, delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => { setHasStarted(true); animate(); }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [triggerOnView, delay, hasStarted, animate]);

  return (
    <span ref={elementRef} className={\`tabular-nums \${className}\`}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default NumberCounter;`
};
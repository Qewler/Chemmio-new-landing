import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { ArrowRight, Terminal, Globe, Shield, Activity, Cpu, Crosshair } from 'lucide-react';

// --- DATA ---
const SECTIONS = [
  {
    id: "01",
    label: "SYSTEM_INTRO",
    title: "The Operating System for Chemistry",
    desc: "Chemmio is not a logistics company. It is a distributed operating system managing the movement of critical matter. We digitize the physical supply chain into a controllable, predictable, and secure data stream.",
    prompt: "A high-tech, dark futuristic control room screen displaying a 3D wireframe of a chemical molecule, black background, green data overlays, 8k resolution, cinematic",
    fallback: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    label: "TRACEABILITY",
    title: "Atomic-Level Visibility",
    desc: "Our proprietary sensor network tracks environmental conditions in real-time. Temperature, pressure, and shock events are logged to an immutable ledger every 12 milliseconds.",
    prompt: "Cinematic close up of a futuristic server rack with glowing green cables and liquid cooling pipes, dark atmosphere, cyberpunk industrial aesthetic",
    fallback: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "03",
    label: "AUTONOMY",
    title: "Algorithmic Routing",
    desc: "Human dispatchers are obsolete. The Chemmio Core calculates optimal routes across road, rail, and sea, dynamically adjusting for weather patterns, border delays, and geopolitical risk.",
    prompt: "Abstract digital map of the world with glowing green connection lines representing supply chain routes, dark background, technological data visualization",
    fallback: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
];

const ParallaxShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<string[]>(SECTIONS.map(s => s.fallback));

  useEffect(() => {
    const fetchImages = async () => {
      let apiKey = '';
      try { apiKey = process.env.API_KEY || ''; } catch(e) {}
      if (!apiKey) return;

      const ai = new GoogleGenAI({ apiKey });
      
      // Load images one by one to avoid rate limits
      for (let i = 0; i < SECTIONS.length; i++) {
        try {
          const res = await ai.models.generateContent({
             model: 'gemini-2.5-flash-image',
             contents: { parts: [{ text: SECTIONS[i].prompt }] }
          });
          const part = res.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
          if (part) {
            setImages(prev => {
              const next = [...prev];
              next[i] = `data:image/png;base64,${part.inlineData.data}`;
              return next;
            });
          }
        } catch (e) {
          console.log(`Gen failed for ${i}, keeping fallback.`);
        }
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="relative w-full border-t border-white/10">
      <div className="flex flex-col lg:flex-row">
        
        {/* --- LEFT: VISUAL DECK (STICKY) --- */}
        {/* We use sticky logic here. It will stick relative to the parent container. */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 bg-black overflow-hidden border-r border-white/10 z-10">
           <AnimatePresence mode="wait">
             <motion.div 
               key={activeIndex}
               className="absolute inset-0"
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
             >
               {/* Background Image */}
               <img 
                 src={images[activeIndex]} 
                 alt="Visual"
                 className="w-full h-full object-cover opacity-60 grayscale-[50%]"
               />
               
               {/* Overlays */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
               
               {/* HUD Elements */}
               <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                 <div className="flex justify-between items-start mt-16 lg:mt-0">
                   <div className="border border-white/20 p-2 backdrop-blur-sm bg-black/50">
                      <Crosshair className="w-6 h-6 text-green-500 animate-spin-slow" style={{ animationDuration: '10s' }} />
                   </div>
                   <div className="text-right font-mono text-[10px] text-green-500/80 bg-black/50 p-2 border border-white/10">
                     <div>CAM_FEED_0{activeIndex + 1}</div>
                     <div>REC ●</div>
                   </div>
                 </div>

                 <div className="space-y-1">
                   <div className="h-[1px] w-full bg-white/20 mb-4" />
                   <div className="flex justify-between font-mono text-xs text-white/60">
                     <span>X: 42.102</span>
                     <span>Y: -12.441</span>
                     <span>Z: 00.000</span>
                   </div>
                 </div>
               </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* --- RIGHT: CONTENT SCROLL --- */}
        <div className="w-full lg:w-1/2 bg-[#050505] relative z-20">
           {SECTIONS.map((section, idx) => (
             <Section 
               key={section.id} 
               data={section} 
               index={idx} 
               onInView={() => setActiveIndex(idx)} 
             />
           ))}
        </div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

type SectionData = typeof SECTIONS[number];

interface SectionProps {
  data: SectionData;
  index: number;
  onInView: () => void;
}

const Section: React.FC<SectionProps> = ({ data, index, onInView }) => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-24 border-b border-white/5"
      onViewportEnter={() => onInView()}
      viewport={{ amount: 0.5 }}
    >
       <div className="mb-6 flex items-center gap-3">
         <span className="font-mono text-green-500 text-sm">0{index + 1}</span>
         <div className="h-[1px] w-12 bg-green-500/50" />
         <span className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em]">{data.label}</span>
       </div>

       <h2 className="text-4xl md:text-6xl font-bold leading-[0.9] tracking-tighter text-white mb-8 uppercase">
         {data.title}
       </h2>

       <p className="text-lg text-slate-400 font-light leading-relaxed max-w-md border-l border-white/10 pl-6 mb-12">
         {data.desc}
       </p>

       <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
          <div className="border border-white/10 p-4 hover:border-green-500/50 transition-colors cursor-crosshair">
            <Activity className="w-4 h-4 mb-2 text-white" />
            System_Metric_A
          </div>
          <div className="border border-white/10 p-4 hover:border-green-500/50 transition-colors cursor-crosshair">
            <Shield className="w-4 h-4 mb-2 text-white" />
            Security_Protocol
          </div>
       </div>
    </motion.div>
  );
};

export default ParallaxShowcase;
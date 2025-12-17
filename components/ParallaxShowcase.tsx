import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Activity, Shield, Crosshair } from 'lucide-react';

// --- DATA ---
const GAS_STATION_IMAGE = `${import.meta.env.BASE_URL}Chemmio%20on%20gas%20station.png`;
const PLANT_IMAGE = `${import.meta.env.BASE_URL}Gemini_Generated_Image_2mdi3h2mdi3h2mdi.png`;

type SectionDef = {
  id: string;
  label: string;
  title: string;
  desc: string;
  prompt: string;
  fallback: string;
  fixedImage?: string;
};

const SECTIONS: SectionDef[] = [
  {
    id: "01",
    label: "FLEET_OPERATIONS",
    title: "The Modern Tank Fleet",
    desc: "We operate a dedicated fleet of 20ft and 23ft ISO tank containers. Constructed from 316L stainless steel, our units are baffled and capable of handling hazardous chemical classes 3, 4, 5, 6, 8, and 9.",
    prompt: "Cinematic low-angle shot of a futuristic matte-black semi-truck carrying a polished stainless steel ISO tank container. The truck is driving on a wet highway at night with subtle neon green running lights. Hyper-realistic, 8k resolution, volumetric fog, cyberpunk industrial aesthetic.",
    fallback: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "02",
    label: "SMART_TELEMETRY",
    title: "Real-time Cargo Monitoring",
    desc: "Our proprietary sensor network tracks cargo conditions in real-time. Temperature, pressure, and shock events are logged during transit, ensuring product integrity from loading arm to discharge.",
    prompt: "Photorealistic close-up of industrial stainless steel chemical tank containers stacked in a high-tech port. Glowing emerald green holographic data overlays displaying pressure metrics floating near the valves. Night time, cinematic lighting, sharp details, 8k.",
    // Keep this visual static (avoids mismatched AI/stock imagery).
    fixedImage: PLANT_IMAGE,
    fallback: PLANT_IMAGE
  },
  {
    id: "03",
    label: "INTERMODAL",
    title: "Strategic Routing",
    desc: "Seamless transition between transport modes. We calculate optimal routes across road, rail, and sea, dynamically adjusting for weather patterns, border delays, and port congestion.",
    prompt: "Wide atmospheric shot of a futuristic logistics hub filled with rows of ISO tank containers and autonomous trucks. Dark moody atmosphere with emerald green security lasers cutting through the mist. Wet concrete reflections, high-tech facility, 8k resolution.",
    // Replace the previous stock photo that didn't match the brand.
    fixedImage: GAS_STATION_IMAGE,
    fallback: GAS_STATION_IMAGE
  }
];

const ParallaxShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<string[]>(SECTIONS.map(s => s.fixedImage ?? s.fallback));

  useEffect(() => {
    const fetchImages = async () => {
      let apiKey = '';
      try { 
        // For local/dev you can set VITE_GEMINI_API_KEY (Vite-exposed env var).
        // For embedded demos, you can also set window.GEMINI_API_KEY.
        apiKey = import.meta.env.VITE_GEMINI_API_KEY ||
                 (window as any).GEMINI_API_KEY || 
                 (window as any).process?.env?.GEMINI_API_KEY || 
                 (window as any).process?.env?.API_KEY || 
                 ''; 
      } catch(e) {
        console.warn("API Key detection failed", e);
      }
      
      if (!apiKey) return;

      const ai = new GoogleGenAI({ apiKey });
      
      // Load images one by one
      for (let i = 0; i < SECTIONS.length; i++) {
        if (SECTIONS[i].fixedImage) continue;
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
          console.warn(`Gen failed for ${i}, using fallback.`);
        }
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="relative w-full border-t border-white/10 bg-black">
      <div className="flex flex-col lg:flex-row">
        
        {/* --- LEFT: VISUAL DECK (STICKY) --- */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 border-r border-white/10 overflow-hidden z-10">
           <AnimatePresence mode="popLayout">
             <motion.div 
               key={activeIndex}
               className="absolute inset-0 w-full h-full"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1, ease: "easeInOut" }}
             >
               {/* Background Image with slow zoom */}
               <motion.img 
                 src={images[activeIndex]} 
                 alt="Visual"
                 className="w-full h-full object-cover opacity-60 grayscale-[40%]"
                 initial={{ scale: 1.1 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 10, ease: "linear" }}
               />
               
               {/* Overlays */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
               <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
               
               {/* HUD Elements */}
               <div className="absolute inset-0 p-12 flex flex-col justify-between z-20 pointer-events-none">
                 <div className="flex justify-between items-start">
                   <div className="border border-white/20 p-2 backdrop-blur-sm bg-black/50">
                      <Crosshair className="w-6 h-6 text-emerald-500 animate-[spin_10s_linear_infinite]" />
                   </div>
                   <div className="text-right font-mono text-[10px] text-emerald-500 bg-black/80 px-3 py-2 border border-emerald-500/20">
                     <div className="animate-pulse">LIVE FEED // CAM_0{activeIndex + 1}</div>
                     <div className="text-white/50 mt-1">REC ● [4K_HDR]</div>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <div className="flex items-center gap-2 text-emerald-500/80 font-mono text-[10px]">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      FLEET_OPTIMAL
                   </div>
                   <div className="h-[1px] w-full bg-gradient-to-r from-emerald-500/50 to-transparent" />
                   <div className="flex justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest">
                     <span>Telemetry: Active</span>
                     <span>Tracking: GPS/GSM</span>
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
               image={images[idx]}
               onInView={() => setActiveIndex(idx)} 
             />
           ))}
        </div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

interface SectionProps {
  data: typeof SECTIONS[number];
  index: number;
  image: string;
  onInView: () => void;
}

const Section: React.FC<SectionProps> = ({ data, index, image, onInView }) => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24 border-b border-white/5 relative"
      onViewportEnter={onInView}
      viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
    >
       {/* Mobile Image (Visible only on small screens) */}
       <div className="lg:hidden w-full h-64 mb-8 relative overflow-hidden border border-white/10 group">
          <img 
            src={image} 
            className="w-full h-full object-cover opacity-60 grayscale-[40%]"
            alt={data.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-emerald-500 bg-black/80 px-2 py-1 border border-emerald-900">
            IMG_REF_0{index + 1}
          </div>
       </div>

       <div className="mb-6 flex items-center gap-3">
         <span className="font-mono text-emerald-500 text-sm font-bold">0{index + 1}</span>
         <div className="h-[1px] w-12 bg-emerald-900" />
         <span className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em]">{data.label}</span>
       </div>

       <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter text-white mb-8 uppercase">
         {data.title}
       </h2>

       <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-emerald-900/30 pl-6 mb-12">
         {data.desc}
       </p>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
          <div className="border border-white/10 p-5 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-crosshair group">
            <Activity className="w-5 h-5 mb-3 text-emerald-800 group-hover:text-emerald-500 transition-colors" />
            <div className="mb-1 text-slate-400">Payload_Capacity</div>
            <div className="text-lg text-white">26,000 L</div>
          </div>
          <div className="border border-white/10 p-5 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-crosshair group">
            <Shield className="w-5 h-5 mb-3 text-emerald-800 group-hover:text-emerald-500 transition-colors" />
            <div className="mb-1 text-slate-400">ADR_Classes</div>
            <div className="text-lg text-white">3, 6.1, 8, 9</div>
          </div>
       </div>
    </motion.div>
  );
};

export default ParallaxShowcase;

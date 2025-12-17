import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Globe, Activity, Cpu } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <section className="relative h-screen flex flex-col pt-24 px-6 border-b border-white/10 overflow-hidden bg-black bg-grid-pattern">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />

      <div className="max-w-[1800px] mx-auto w-full h-full relative z-10 flex flex-col justify-between pb-12">
        
        {/* Top Bar */}
        <div className="flex justify-between items-start font-mono text-[10px] text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 block animate-pulse" />
            <span>System_Online</span>
          </div>
          <div className="hidden md:block">
            Chemmio_OS v2.4.0
          </div>
          <div className="text-right">
            <div>Secure_Link: Est.</div>
            <div className="text-emerald-500">Encryption: Active</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-end my-auto">
          <div className="md:col-span-9">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
               <h1 className="text-[12vw] leading-[0.8] font-bold text-white tracking-tighter mb-6 uppercase">
                 Chemmio<br/>
                 <span className="text-zinc-800">Logistic</span>
               </h1>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="flex flex-col md:flex-row gap-8 items-start border-t border-white/10 pt-8"
             >
               <p className="text-xl md:text-2xl text-zinc-400 font-light leading-tight max-w-xl">
                 The operating system for the global chemical supply chain.
                 <span className="block mt-4 text-emerald-500 font-mono text-sm uppercase tracking-widest">
                   // Precision Logistics
                 </span>
               </p>
             </motion.div>
          </div>
          
          <div className="md:col-span-3 w-full flex flex-col justify-end gap-4">
             <div className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                <Activity className="w-5 h-5 text-emerald-500 mb-2" />
                <div className="font-mono text-[10px] text-zinc-500 uppercase">Network_Load</div>
                <div className="text-2xl text-white font-mono">42%</div>
             </div>
             <div className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                <Cpu className="w-5 h-5 text-emerald-500 mb-2" />
                <div className="font-mono text-[10px] text-zinc-500 uppercase">AI_Optimization</div>
                <div className="text-2xl text-white font-mono">ACTIVE</div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div style={{ opacity }} className="flex justify-between items-end">
           <div className="flex flex-col gap-2">
             <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em]">Scroll_To_Initialize</span>
             <ArrowDown className="w-4 h-4 text-emerald-500" />
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
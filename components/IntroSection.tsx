import React from 'react';
import { motion } from 'framer-motion';

const IntroSection: React.FC = () => {
  return (
    <section className="bg-slate-950 text-white border-b border-slate-800 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left: Manifesto */}
        <div className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-center relative">
           <div className="absolute top-0 left-0 w-24 h-0.5 bg-emerald-500"></div>
           <span className="font-mono text-xs text-emerald-500 mb-8 uppercase tracking-widest block">
             [ Core_Mission_Statement ]
           </span>
           
           <h2 className="text-4xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-white mb-12">
             WE ENGINEER<br/>
             THE FLOW OF<br/>
             <span className="text-slate-600">HAZARDOUS MATTER.</span>
           </h2>
           
           <p className="text-slate-400 text-xl font-light leading-relaxed max-w-md border-l border-slate-800 pl-6">
             Chemical logistics is not just transport. It is a complex physics problem of thermal control, pressure management, and route optimization for dangerous goods.
           </p>
        </div>

        {/* Right: Feature Stack */}
        <div className="bg-slate-900 p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-10" 
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
           </div>

           <div className="relative z-10 flex flex-col divide-y divide-slate-800 border-t border-b border-slate-800">
             <FeatureRow num="01" title="Compliance" desc="Full ADR, RID, & IMDG compliance for Classes 3, 6.1, 8 & 9." />
             <FeatureRow num="02" title="Intermodal" desc="Seamless connection of Road, Rail, and Sea transport across EMEA." />
             <FeatureRow num="03" title="Equipment" desc="Dedicated fleet of T11, T14, and T50 ISO Tank Containers." />
           </div>
        </div>
      </div>
    </section>
  );
};

const FeatureRow = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="py-10 group cursor-default"
  >
    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
      <span className="font-mono text-emerald-500 text-xs font-bold border border-emerald-900/30 bg-emerald-900/10 px-2 py-1">{num}</span>
      <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-emerald-500 transition-colors uppercase">{title}</h3>
    </div>
    <p className="text-slate-500 text-sm md:pl-16 max-w-md font-mono">{desc}</p>
  </motion.div>
);

export default IntroSection;
import React from 'react';
import { motion } from 'framer-motion';
import { Container, FileCheck, Anchor, Clock, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

const FeatureGrid: React.FC = () => {
  return (
    <section id="capabilities" className="bg-slate-950 py-32 border-b border-slate-800">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
           <div>
             <span className="font-mono text-xs text-emerald-500 mb-2 block">:: SYSTEM_MODULES ::</span>
             <h2 className="text-4xl font-bold tracking-tight text-white uppercase">Capabilities_Index</h2>
           </div>
           <span className="font-mono text-xs text-slate-500 mt-4 md:mt-0">FULL_SPECTRUM_LOGISTICS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-800">
          {[
            { icon: <Container />, title: "Freight Forwarding", desc: "Road, sea, and rail networks optimized.", id: "01" },
            { icon: <FileCheck />, title: "Customs Clearance", desc: "Automated documentation processing.", id: "02" },
            { icon: <Anchor />, title: "Import/Export", desc: "Global trade regulation compliance.", id: "03" },
            { icon: <Clock />, title: "Expedited", desc: "Time-critical delivery protocols.", id: "04" },
            { icon: <ArrowLeftRight />, title: "Multimodal", desc: "Integrated transport solutions.", id: "05" },
            { icon: <CheckCircle2 />, title: "Certified Quality", desc: "ISO & SQAS audited operations.", id: "06" }
          ].map((item) => (
            <GridCard 
              key={item.id}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface GridCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  id: string;
}

const GridCard: React.FC<GridCardProps> = ({ icon, title, desc, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group p-10 border-b border-r border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors duration-300 relative aspect-[4/3] flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <div className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-300 scale-125 origin-top-left">
          {icon}
        </div>
        <span className="font-mono text-xs text-slate-600 group-hover:text-emerald-500/50">MOD_{id}</span>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 mb-2 uppercase tracking-tight transition-colors">{title}</h3>
        <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default FeatureGrid;
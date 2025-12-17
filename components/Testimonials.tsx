import React, { useRef } from 'react';
import { Star, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-emerald-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 border-b border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs mb-2 uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Transmission_Log</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Client Feedback</h2>
          </div>
          <p className="text-slate-500 font-mono text-sm mt-4 md:mt-0">VERIFIED_SIGNALS_ONLY</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div style={{ y: y1 }}>
            <TestimonialCard 
              quote="Chemmio provided exceptional service for our chemical transport needs, ensuring safety and efficiency throughout the process."
              author="Alina Krushevich"
              role="Logistics Director, BASF"
              delay={0}
            />
          </motion.div>
          <motion.div style={{ y: y2 }}>
            <TestimonialCard 
              quote="Reliable and professional, Chemmio made our urgent shipments seamless and stress-free. Highly recommend their services!"
              author="Andres Covac"
              role="Supply Chain Mgr, Ineos"
              delay={0.1}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, author, role, delay }: { quote: string, author: string, role: string, delay: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-slate-900 p-10 border border-slate-800 relative h-full group hover:border-emerald-500/30 transition-colors"
    >
      <div className="flex gap-1 mb-8 text-emerald-500/50 group-hover:text-emerald-500 transition-colors">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" />
        ))}
      </div>
      <blockquote className="text-xl text-slate-300 font-light leading-relaxed mb-8">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-4 mt-auto border-t border-slate-800 pt-6">
        <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center text-emerald-500 font-bold border border-slate-700 font-mono">
          {author.charAt(0)}
        </div>
        <div>
          <div className="text-white font-bold tracking-wide uppercase text-sm">{author}</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonials;
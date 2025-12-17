import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Aperture } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-slate-900/90 backdrop-blur-md border-slate-800' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="w-full px-6 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-emerald-500 text-slate-900 flex items-center justify-center font-bold">
              <Aperture className="w-5 h-5 animate-spin-slow" style={{ animationDuration: '10s' }} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-white font-mono group-hover:text-emerald-500 transition-colors">
                CHEMMIO
              </span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest">
                SUPPLY_OS_V2
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center h-full">
            <div className="flex h-full border-l border-white/5">
              <NavLink href="#" label="Index_01" />
              <NavLink href="#capabilities" label="Sys_Ops_02" />
              <NavLink href="#contact" label="Comm_Link_03" />
            </div>
            <button className="h-full px-8 bg-white hover:bg-emerald-500 text-slate-900 transition-colors font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              Access Network
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-slate-900 flex flex-col p-6 border-l border-emerald-500/20"
          >
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
              <span className="text-xl font-mono font-bold text-white">MENU_OVERLAY</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-emerald-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-2xl font-light font-mono text-slate-300">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-500">01 // Index</a>
              <a href="#capabilities" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-500">02 // Capabilities</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-500">03 // Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    className="h-full px-8 flex items-center text-xs font-mono text-slate-400 hover:text-emerald-500 hover:bg-white/5 transition-all border-r border-white/5 uppercase tracking-widest"
  >
    {label}
  </a>
);

export default Navbar;
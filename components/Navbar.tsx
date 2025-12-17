import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.tsx';

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
          <a href="#index" className="flex items-center gap-4 group cursor-pointer">
            <Logo className="h-6 text-white group-hover:text-emerald-500 transition-colors w-auto" />
            <div className="h-5 w-[1px] bg-white/20" />
            <span className="text-[10px] text-slate-500 font-mono tracking-widest pt-1 hidden sm:block">
              GLOBAL_LOGISTICS_V2
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center h-full">
            <div className="flex h-full border-l border-white/5">
              <NavLink href="#index" label="Index_01" />
              <NavLink href="#capabilities" label="Fleet_Ops_02" />
              <NavLink href="#contact" label="Comm_Link_03" />
            </div>
            <a href="#contact" className="h-full px-8 bg-white hover:bg-emerald-500 text-slate-900 transition-colors font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              Access Network
              <ArrowRight className="w-3 h-3" />
            </a>
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
              <a href="#index" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-500">01 // Index</a>
              <a href="#capabilities" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-emerald-500">02 // Fleet Ops</a>
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
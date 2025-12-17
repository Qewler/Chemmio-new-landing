import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import IntroSection from './components/IntroSection.tsx';
import ParallaxShowcase from './components/ParallaxShowcase.tsx';
import FeatureGrid from './components/FeatureGrid.tsx';
import Testimonials from './components/Testimonials.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Handle scroll to hash after loading is complete
  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [loading]);

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content" className="relative z-0">
            <Navbar />
            <Hero />
            <IntroSection />
            <ParallaxShowcase />
            <FeatureGrid />
            <Testimonials />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_SEQUENCE = [
  "FLEET_TRACKING_INIT",
  "CONNECTING_TO_PORT_AUTHORITY...",
  "CHECKING_ADR_DATABASE [OK]",
  "CALIBRATING_TANK_SENSORS...",
  "LOADING_MANIFESTS...",
  "LOGISTICS_NET_READY"
];

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += Math.random() * 300 + 150; // Random typing speed
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono text-xs md:text-sm text-green-500 p-8"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 border-b border-green-900 pb-2 flex justify-between">
            <span>CHEMMIO_LOGISTICS_V2.04</span>
            <span>FLEET: ACTIVE</span>
        </div>
        <div className="flex flex-col gap-1">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="opacity-50 mr-4">
                {String(i * 10).padStart(4, '0')}
              </span>
              <span>{line}</span>
            </div>
          ))}
          <div className="h-4 w-3 bg-green-500 animate-pulse mt-2" />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
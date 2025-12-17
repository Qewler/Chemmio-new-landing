import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-6" }) => {
  const [error, setError] = useState(false);

  // If the image fails to load, we render a high-fidelity SVG text version
  // that matches the logo's typography (Montserrat/Geometric Sans).
  if (error) {
    return (
      <svg 
        viewBox="0 0 400 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        aria-label="Chemmio Logo"
      >
        <text 
          x="0" 
          y="60" 
          fill="currentColor" 
          fontFamily="'Montserrat', sans-serif" 
          fontWeight="400" 
          fontSize="72" 
          letterSpacing="0.08em"
        >
          CHEMMIO
        </text>
      </svg>
    );
  }

  // Using the image logo with a filter to make it white (invert) for the dark theme.
  return (
    <img 
      src="/CHEMMIO.svg" 
      alt="CHEMMIO" 
      className={`${className} object-contain brightness-0 invert`}
      onError={() => setError(true)}
    />
  );
};

export default Logo;

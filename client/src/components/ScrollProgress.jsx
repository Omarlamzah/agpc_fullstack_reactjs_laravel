// components/ScrollProgress.js

import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  const calculateScrollPercent = () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const totalHeight = documentHeight - windowHeight;
    const scrolled = (scrollTop / totalHeight) * 100;
    setScrollPercent(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollPercent);
    return () => window.removeEventListener('scroll', calculateScrollPercent);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-2 bg-gray-200"
      style={{ 
        height: '4px',
        background: '#ddd',
        zIndex: 9999
      }}
    >
      <div
        className="h-full bg-[#ea261d] md:bg-[#000000]"
        style={{ width: `${scrollPercent}%`, transition: 'width 0.2s ease' }}
      ></div>
    </div>
  );
};

export default ScrollProgress;

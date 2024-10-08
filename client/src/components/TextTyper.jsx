import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const TextTyper = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'block',
        fontWeight: 'bold',
        height: '195px',
        lineHeight: '1.2',
        textAlign: 'center',
        opacity: isHovered ? 1 : 0.5, // Change opacity on hover
        transition: 'opacity 0.3s ease-in-out', // Smooth transition
      }}
    >
      {showAnimation && (
        <TypeAnimation
          style={{
            display: 'block',
            height: '100%',
            whiteSpace: 'pre-line',
          }}
          sequence={[
            `Une \n formation actualisée\n pour une prise en charge de qualité.`,
            1000,
            "",
          ]}
          repeat={Infinity}
        />
      )}
    </div>
  );
};

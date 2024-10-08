// components/GoToTopButton.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <motion.div
        className="fixed bottom-4 right-4 bg-[#ea261d] text-white rounded-full p-3 cursor-pointer shadow-lg"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaChevronUp size={24} />
      </motion.div>
    )
  );
};

export default GoToTopButton;

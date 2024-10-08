import React from 'react';
import { motion } from 'framer-motion';
import "./css.css";

export default function WelcomLoader() {
  return (
    <motion.div
      className="loader bg-black z-[999] animate-pulse text-2xl sm:text-3xl md:text-7xl"
      initial={{ y: '-100vh' , x:'-50%', scale: 0 }} // Start from above the viewport
      animate={{ y: '-50%', x:'-50%', scale: 1 }} // Animate to the centered position
      
      transition={{ duration: 2, ease: "easeInOut" }} // Define the duration and easing
    >
      <span>BIENVENUE À AGPC</span>
      <span>BIENVENUE À AGPC</span>
    </motion.div>
  );
}

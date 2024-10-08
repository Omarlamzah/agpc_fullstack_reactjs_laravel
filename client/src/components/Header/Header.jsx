import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./Header.css";
import { TextTyper } from '../textTyper';
  import Counter from '../Counter/Counter';
import { apiurl } from '../../utlis/var';

export default function Header() {
  const [bgToggle, setBgToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgToggle(prevToggle => !prevToggle);
    }, 5000); // Toggle every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <header
      className={`showcase mb-16 relative ${bgToggle ? 'bg2' : 'bg1'}`}
      
    >
      

      <div  className="showcase-top"  >   </div>

      <motion.div    className="showcase-content"
        initial={{ opacity: 0, x: 30 }} // Animate from the right
        animate={{ opacity: 1, x: 0 }} // Move to original position
        transition={{ duration: 0.8, ease: 'easeOut', delay: 3 }}
      >
                    <motion.div 
                      
                    >
                          <p className=' '><TextTyper /></p>  
                  </motion.div>

                  <motion.span
                    className=" relative btn-xl "
                    initial={{ opacity: 0, x: -500, scale: 0.9 }} // Animate from the right with slight scaling
                    animate={{ opacity: 1, x: 0, scale: 1 }} // Move to original position and scale up
 
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 3 }}
                    viewport={{ once: true }}

                  >
                    <Counter />


                   
                   </motion.span> 
      </motion.div>
    </header>
  );
}

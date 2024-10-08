import React from 'react';
import { motion } from 'framer-motion';
import Titleanimated from '../../components/Title/Titleanimated';
import InnerImageZoom from 'react-inner-image-zoom';
import imgevent1 from "./../../assets/lastevent/evnt1.png";
import { Player } from '@lottiefiles/react-lottie-player';
 
export default function Agenda() {
  // Variants for the title animation
 

  // Variants for the image animation
  const imageVariants = {
    hidden: { opacity: 0, scale: 0 }, // Start from 50px below with opacity 0
    visible: { opacity: 1, scale: 1, transition: { duration: 0.01 } }, // Move to original position and fade in
  };

  return (
    <div className='pt-3 bg-slate-500'>
 
      <h6
        className="my-3 m-auto bg-slate-950 md:w-[150px] mb-6" >
        <Titleanimated text="AGENDA" />
      </h6>
      
      <motion.div
        className="mb-4 flex justify-center items-center gap-10 md:flex-row flex-col"
        initial="hidden"
        whileInView="visible"
        variants={imageVariants}
      >
                  <Player  src="assets/anim/agenda3.json"  loop autoplay className="player md:w-60 w-28 "/>  
      
        <img
          src={imgevent1}
          alt="Event 1"
          className="md:w-1/3 w-[70%] mb-4 h-auto rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
        />
      </motion.div>



      
    </div>
  );
}

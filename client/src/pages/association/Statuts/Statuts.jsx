import React from 'react';
import { motion } from 'framer-motion';
  import association from "/assets/status/status.pdf";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Titleanimated from '../../../components/Title/Titleanimated';

export default function Statuts() {
  // Variants for the title animation
  const titleVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from 50px below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } }, // Move to original position and fade in
  };

  // Variants for the text and list items animation
  const textVariants = {
    hidden: { opacity: 0, y: 30 }, // Start from 30px below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } }, // Move to original position and fade in
  };

  // Variants for the PDF viewer animation
  const pdfVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from 50px below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } }, // Move to original position and fade in
  };

  return (
    <div className="">
      
      <motion.h6
        className=" bg-slate-950 md:w-[160px] mx-auto my-10"
        initial="hidden"
        whileInView="visible"
        variants={titleVariants}
      >
        <Titleanimated text="Statuts" />
      </motion.h6>
 

    

   

     

      <motion.div
        className="h-[300px] md:h-[550px] w-full border border-gray-300 mt-6"
        initial="hidden"
        whileInView="visible"
        variants={pdfVariants}
      >
      
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={association} />
        </Worker>
      </motion.div>



      

       
    </div>
  );
}

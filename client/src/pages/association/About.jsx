import React from 'react';
import { delay, motion } from 'framer-motion';
import { BiCheckDouble } from "react-icons/bi";
import Titleanimated from '../../components/Title/Titleanimated';
import association from "./../../../public/assets/association/association.pdf";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
 
export default function About() {
  // Variants for the title animation
  const titleVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from 50px below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 ,delay:0.2} }, // Move to original position and fade in
  };

  // Variants for the text and list items animation
  const textVariants = {
    hidden: { opacity: 0, y: 30 }, // Start from 30px below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 ,delay:0.2 } }, // Move to original position and fade in
  };

  // Variants for the PDF viewer animation
  const pdfVariants = {
    hidden: { opacity: 0, y: 50 }, // Start from 50px below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration:0.5 ,delay:0.2 } }, // Move to original position and fade in
  };



  

  return (
    <div className="px-10 md:px-52 ">
      <motion.h6
        className=" hidden bg-slate-950 md:w-[250px] mx-auto my-10"
        initial="hidden"
        whileInView="visible"
        variants={titleVariants}
      >
        <Titleanimated text="L'association" />
      </motion.h6>

      <motion.a  initial="hidden"
        whileInView="visible"
        variants={titleVariants}  href="https://itechagencymaroc.com/AGPC/" target="_blank" rel="noopener noreferrer">
            <img  className=' shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] my-2 w-[70%] md:w-1/2 m-auto' 
            src="/prog.png" alt="" srcset="" />

      </motion.a>


      <motion.h6
        className="mb-6 text-base  md:text-xl text-center uppercase font-bold bg-gradient-to-b from-purple-500 via-[#ea261d] to-white bg-clip-text text-transparent"
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
      >
        L'Association des Gastro-entérologues Privés de Casablanca
      </motion.h6>

      <motion.p
        className="text-black"
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
      >
        L'Association des Gastro-entérologues Privés de Casablanca (AGPC) est fondée en 1996 et regroupe les médecins spécialisés en gastro-entérologie exerçant à titre privé dans la région de Casablanca. L’AGPC est un organisme à but non lucratif ayant pour mission de :
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row gap-4 mt-4"
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
      >
        <p className="flex items-start  text-slate-700 hover:text-black hover:scale-110 transition duration-700">
          <span className="w-11">
            <BiCheckDouble className="w-6 h-6 mr-2 fill-[#ea261d]" />
          </span>
          Promouvoir et encourager la recherche clinique, endoscopique et échographique dans le domaine de l'hépato-gastro-entérologie en pratique de ville : soins cliniques, diagnostics échographiques et endoscopiques, etc.
        </p>
        <p className="flex items-start text-slate-700 hover:text-black hover:scale-110 transition duration-700">
          <span className="w-11">
            <BiCheckDouble className="w-6 h-6 mr-2 fill-[#ea261d]" />
          </span>
          Développer une collaboration avec les associations et organismes nationaux et internationaux poursuivant les mêmes buts.
        </p>
      </motion.div>

      <motion.p
        className="text-black my-10"
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
      >
        Ce site est dédié essentiellement à apporter une information sur nos activités et les autres manifestations concernant l’Hépato-Gastro-Entérologie.
      </motion.p>

      <motion.div
        className=" hidden h-[300px] md:h-[350px] border border-gray-300 mt-6"
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

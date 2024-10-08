import { BiPhone } from "react-icons/bi"; 
import { AiTwotoneMail } from "react-icons/ai"; 
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-stone-300 text-black py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo with Animation */}
          <motion.div 
            className="mb-4 md:mb-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/logo.png" alt="AGPC Logo" className="h-20"/>
          </motion.div>

          {/* Contact Information with Fade-in Animation */}
          <motion.div 
            className="text-center md:text-left mb-4 md:mb-0"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <p className="flex items-center gap-2"><AiTwotoneMail /> Email: <a href="mailto:contact@agpc.com" className="text-[#ea261d] hover:text-[#5b2522]">contact@agpc.com</a></p>
            <p className="flex items-center gap-2"><BiPhone /> Phone: <a href="tel:+212661625028" className="text-[#ea261d] hover:text-[#5b2522]">+212 6 61625028</a></p>
          </motion.div>
        </div>

        {/* Copyright Section with Fade-in Animation */}
        <motion.div 
          className="text-center md:text-right"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="copyright">
            &copy; {currentYear} <strong><span>AGPC</span></strong>. Tous droits réservés |
            Design par <a href="http://itechagencymaroc.com" target="_blank" className="text-[#ea261d] hover:text-[#5b2522]">itechagencymaroc</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

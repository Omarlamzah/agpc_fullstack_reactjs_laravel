import React from 'react';
import { motion } from 'framer-motion';
import "./css.css";

export default function CardUser({ img, name, title }) {
  return (
    <motion.div
      className="card"
      whileHover={{
        scale: 1.1,
       
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="profileImage">
        <img className=' hover:scale-125 transition duration-500' src={img} alt={name} />
      </div>
      <div className="textContainer mt-10">
        <p className="name">{name}</p>
        <p className="profile">{title}</p>
      </div>

      
    </motion.div>
  );
}

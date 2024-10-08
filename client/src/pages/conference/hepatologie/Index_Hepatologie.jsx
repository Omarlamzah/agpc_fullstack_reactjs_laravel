import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
const Index_Hepatologie = ({ scrollPosition }) => {
  // Sample data with date parameters
  const cards = [
    {
      image: '/imgshepo/AGPC_17.jpg',
      date: '09 Septembre 2023',
      title: "17ème Journée d'Hépatologie de l'AGPC",
      dateParam: '2023-09-09',
    },
    {
      image: '/imgshepo/AGPC_15.png',
      date: '11 Septembre 2021',
      title: "15ème Journée d'Hépatologie de l'AGPC",
      dateParam: '2021-09-11',
    },
    {
      image: '/imgshepo/AGPC_14.png',
      date: '12 Septembre 2020',
      title: "14ème Journée d'Hépatologie de l'AGPC",
      dateParam: '2020-09-12',
    },
    {
      image: '/imgshepo/AGPC_13.png',
      date: '14 Septembre 2019',
      title: "13ème Journée d'Hépatologie de l'AGPC",
      dateParam: '2019-09-14',
    },
  ];

  return (
<div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {cards.map((card, index) => (
    <motion.div
      key={index}
      className=" bg-transparent shadow-lg rounded-lg overflow-hidden flex flex-col justify-center items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/conferences/hepatologie/${card.dateParam}`} className="flex flex-col justify-center items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <LazyLoadImage
            src={card.image}
            alt={card.title}
            className="w-48 h-48 md:w-64md:h-64 object-cover rounded-full"
            effect="blur"
            scrollPosition={scrollPosition} // Pass the scroll position to LazyLoadImage
          />
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="p-4 text-center"
        >
          <p className="text-gray-500 text-sm hover:text-blue-500 transition-colors duration-300">{card.date}</p>
          <h2 className="text-gray-500 text-lg font-semibold mt-2 hover:text-blue-500 transition-colors duration-300">{card.title}</h2>
        </motion.div>
      </Link>
    </motion.div>
  ))}
</div>


  );
};

export default trackWindowScroll(Index_Hepatologie);

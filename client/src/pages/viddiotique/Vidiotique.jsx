import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Titleanimated from '../../components/Title/Titleanimated';
import AnimatedCursor from 'react-animated-cursor';

export default function Vidiotique() {
  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 20, // Move from bottom
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0, // Move to original position
      scale: 1,
      transition: {
        duration: 1.5,
        type: 'spring',
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="videotheque" className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="">
           <h6
        className="my-3 m-auto text-white  md:w-[250px] mb-6" >
        <Titleanimated text="VIDÉOTHEQUE" />
      </h6>

          <div className="flex flex-wrap justify-center text-center">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <motion.div
                whileInView="visible"
                initial="hidden"
                variants={imageVariants}
                whileHover="hover"
              >
                <Link to="/conferences/agpc">
                  <img
                    src="assets/img/videos/conference_agpc.png"
                    className="w-1/2 m-auto h-auto rounded-lg shadow-lg"
                    alt="Conference AGPC"
                  />
                </Link>
              </motion.div>
              <h5 className="text-lg font-semibold mt-4 text-white">Conférences AGPC</h5>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <motion.div
                whileInView="visible"
                initial="hidden"
                variants={imageVariants}
                whileHover="hover"
              >
                <Link to="/conferences/echographie_digestive">
                  <img
                    src="assets/img/videos/echographie_digestive.png"
                    className="w-1/2 m-auto h-auto rounded-lg shadow-lg"
                    alt="Echographie digestive"
                  />
                </Link>
              </motion.div>
              <h5 className="text-lg font-semibold mt-4 text-white">Echographie digestive</h5>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <motion.div
                whileInView="visible"
                initial="hidden"
                variants={imageVariants}
                whileHover="hover"
              >
                <Link to="/conferences/journees_hepatologie">
                  <img
                    src="assets/img/videos/journee.png"
                    className="w-1/2 m-auto h-auto rounded-lg shadow-lg"
                    alt="Journées d'Hépato"
                  />
                </Link>
              </motion.div>
              <h5 className="text-lg font-semibold mt-4 text-white">Journées d'Hépatologie</h5>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <motion.div
                whileInView="visible"
                initial="hidden"
                variants={imageVariants}
                whileHover="hover"
              >
                <Link to="/conferences/authers_conferences">
                  <img
                    src="assets/img/videos/conference.png"
                    className="w-1/2 m-auto h-auto rounded-lg shadow-lg"
                    alt="Autres conférences"
                  />
                </Link>
              </motion.div>
              <h5 className="text-lg font-semibold mt-4 text-white">Autres conférences</h5>
            </div>
          </div>
        </div>
      </div>


      <AnimatedCursor
      innerSize={20}
      outerSize={20}
      color='234, 38, 29' // use #ea261d
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',"p", "h3","img","span",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
    </section>
  );
}

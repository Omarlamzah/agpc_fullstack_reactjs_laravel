import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

import imgevent1 from "./../../assets/lastevent/evnt1.png";
import imgevent2 from "./../../assets/lastevent/evnt2.png";
import programe from "./../../../public/assets/programme/programme.pdf";
import Titleanimated from '../Title/Titleanimated';
import ButtonDownload from '../buttons/buttonDownload/ButtonDownload';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Event() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageVariantsRight = {
    hidden: { opacity: 0, x: 30 }, // Start from the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariantsLeft = {
    hidden: { opacity: 0, x: -30 }, // Start from the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="p-4 ">
      <h6 className="m-auto bg-slate-950 md:w-[370px] mb-3">
        <Titleanimated text="Prochain événement" />
      </h6>
      <div className="mb-4 flex justify-center items-center gap-4 md:flex-row flex-col">
        <motion.div
          whileInView="visible"
          initial="hidden"
          variants={imageVariantsRight}
          className="md:w-1/3 h-auto"
        >
          <InnerImageZoom
            src={imgevent1}
            alt="Event 1"
            className="w-full h-auto rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
          />
        </motion.div>
        <motion.div
          whileInView="visible"
          initial="hidden"
          variants={imageVariantsLeft}
          className="md:w-1/3 h-auto"
        >
          <InnerImageZoom
            src={imgevent2}
            alt="Event 2"
            className="w-full h-auto rounded-lg shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"
          />
        </motion.div>
      </div>
      <motion.button
        onClick={handleShow}
        className="m-auto w-full  text-white py-2 px-4 rounded-md shadow-lg "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ButtonDownload />
      </motion.button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>TÉLÉCHARGER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          TÉLÉCHARGER LE PROGRAMME & FRAIS D'INSCRIPTION
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            <a download href={programe}>TÉLÉCHARGER</a>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

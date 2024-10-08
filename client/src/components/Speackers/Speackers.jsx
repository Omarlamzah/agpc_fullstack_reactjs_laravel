import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './css.css'; // Ensure this path is correct
import { motion } from 'framer-motion';
import img1 from "./../../../public/assets/speackers/1.jpeg";
import img2 from "./../../../public/assets/speackers/2.jpeg";
import img3 from "./../../../public/assets/speackers/3.jpeg";
import img4 from "./../../../public/assets/speackers/4.jpeg";
import img5 from "./../../../public/assets/speackers/5.jpeg";
import img6 from "./../../../public/assets/speackers/6.jpeg";
import Readmore from '../Readmore';
import Titleanimated from '../Title/Titleanimated';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Buttongrid from '../buttons/buttongrid/Buttongrid';

const Speackers = () => {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };


  const users = [
    { id: 1, name: 'Jean-Michel Pawlotsky', title: 'title 1', photo: img1, description: `Jean-Michel Pawlotsky, MD, PhD Dr Jean-Michel Pawlotsky is Professor of Medicine at the University of Paris-Est. He is the Director of the National Reference Center for Viral Hepatitis B, C and D and of the Department of Virology at the Henri Mondor University Hospital in Créteil, France, and Director of research team “Viruses-Hepatology-Cancers“ at the Mondor Institute of Biomedical Research (INSERM U955). He focuses on teaching and research in virology (primarily hepatitis viruses) and liver oncology. Dr Pawlotsky earned his medical degree in Hepatology and Gastroenterology in 1992. In addition, he earned a Thesis in molecular virology from the University of Paris, France, and he is a graduate in virology from the Pasteur Institute in Paris and microbiology from the University of Paris. Dr Pawlotsky has been acting as the Secretary General of the European Association for the Study of the Liver (EASL) between 2005 and 2009. He is a member of the Strategic Committee of the National Agency for Research on AIDS and Viral Hepatitis (ANRS). Dr Pawlotsky has been an Associate Editor of Hepatology, the official journal of the American Association for the Study of Liver Diseases (AASLD), between 2001 and 2006, and an Associate Editor of Gastroenterology, the official journal of the American Gastroenterological Association (AGA), between 2011 and 2016. Dr Pawlotsky’s noted career contributions include the publication of over 500 articles and book chapters in his areas of expertise and over 650 invited lectures at international meetings.` },
    { id: 2, name: 'Christophe Bureau', photo: img2, description: `Christophe Bureau Professeur des Universités, Praticien Hospitalier au Centre Hospitalo-Universitaire de Toulouse Rangueil dans le service d’Hépatologie. Spécialiste de la cirrhose et de ses complications. Je dirige l’équipe de recherche clinique en hépatologie de Toulouse dans une structure de recherche labellisée Cardiomet Toulouse FHU impact. Je collabore avec de de nombreux groupes internationaux (Espagne, Canada, Royaume Uni, Suisse, Roumanie, Autriche, Italie, Belgique, Allemagne,…). Responsable du centre de compétence “Maladies vasculaires du foie – Maladies des voies biliaires et auto immunes – Surcharges génétiques en fer“. Membre élu de la DRRC, coordonnateur et référent pour la DRI de la recherche clinique du pôle hospitalo-universitaire des maladies de l’appareil digestif. J’ai été  Président du Club francophone pour l’étude de l’hypertension portale, coordonnateur régional du DES d’hépato-gastroentérologie, membre élu du Conseil Scientifique de la Faculté de Médecine de Purpan et secrétaire général de l’AFEF.` },
    { id: 3, name: 'DOMINIQUE VALLA', photo: img3, description: `DOMINIQUE VALLA A professor of hepatology, Dominique Valla was the head of the liver unit in Hôpital Beaujon, from 1999 to 2013. He was the founding director of the French reference center for vascular diseases of the liver. Since 2013, he has been the founding coordinator of Département hospitalo-universitaire (DHU) UNITY, a network connecting university hospitals Paris-Nord Val-de-Seine), Université Paris Diderot, and the Centre de Recherche de l’Inflammation Paris-Montmartre, Inserm UMR1149) focusing on digestive diseases. His clinical activities are focused on rare liver diseases. He is involved in clinical research on portal hypertension, complications of chronic liver diseases, and vascular liver diseases.` },
    { id: 4, name: 'Mustapha Benazzouz', photo: img4, description: `Mustapha Benazzouz is Professor of Hepatogastroenterology from Rabat Medical School within Mohamed V University in Rabat, Morocco. He was a Hepatogastroenterologist at IBN SINA hospital in Rabat during 25 years. After receiving his medical degree from Casablanca Medical School at Hassan II University, Morocco, he completed his residency in Internal Medicine at IBN SINA hospital. In 1990, Mustapha Benazzouz was made Associate Professor of Internal Medicine at Rabat Medical School. He then went to complete a fellowship in Hepatogastroenterology in Yamanshi Medical College in Japan. In 1995 he was made Professor of Gastroenterology at Rabat medical school. In the field of hepatology he has focused his research efforts on the study of hepatocellular carcinoma and viral hepatitis. He was General Secretary of the Moroccan Society of Hepatogastroenterology and Vice President of the Moroccan Society of Endoscopy. He is also a member of the Moroccan Society of Gastroenterology and the European Society of Hepatology, and has held the post of Vice General Secretary for the Moroccan Society of Medical Science in the past. He is among the founder of Mediterranean association of the study of the liver. Currently he is the president of CME commission for hepatogastroenterolgy a branch of Moroccan Society of hepatogastroenterology since 2009` },
    { id: 5, name: 'Dr Isabelle Rosa', photo: img5, description: `David is a 32-year-old accountant with experience in both corporate and public accounting. He grew up in a family of accountants and has always been interested in finance and numbers. He is a certified public accountant and enjoys helping businesses and individuals manage their finances. David is detail-oriented and has a strong work ethic. In his free time, he likes to play golf and read. He is an avid reader and enjoys learning about a wide range of topics. David is a friendly and approachable person who is always willing to help others.` },
    { id: 6, name: 'Pr Tahri Jouti Mohammed', photo: img6, description: `Pr Tahri Jouti Mohammed Professeur de gastroentérologie à la faculté de médecine de Casablanca Président de la société marocaine des maladies de appareil digestif ( SMMAD ) vice Président du comite des guidelines de l’organisation mondiale de la gastroentérologie ( wgo). Diplôme d’endoscopie digestive interventionnelle de la faculté de médecine de kuala lumpur Diplôme de transplantation d’organe de l’hôpital de Paul brousse.` }
  ];

  const items = users.map((user) => (
    <motion.div
      key={user.id}
      className="user-profile mx-6  my-3 flex flex-col items-center bg-white   rounded-lg overflow-hidden shadow-[5px_5px_#ea261d4d,_10px_10px_#ea261d33,_15px_15px_#ea261d1a,_20px_20px_#ea261d0d,_25px_25px_#ea261d05]"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
         <img
        src={user.photo}
        alt={user.name}
        role="presentation"
        className="w-32 h-32 rounded-full object-cover mb-4 shadow-[9px_9px_7px_0px_#1a202c] "
      />
      
      
      <h5 className="text-lg font-semibold mb-2 text-center text-gray-800">{user.name}</h5>
      <p className="text-start text-gray-600 mb-4">
        {user.description.slice(0, 80)}
        {user.description.length > 80 ? '...' : ''}
      </p>
      <button
        onClick={() => handleShow(user)}
        className="  text-black px-0 w-full text-center  py-2 m-auto
         rounded-full "
      >
            <Buttongrid text={"En savoir plus"}/> 

      </button>

    </motion.div>
  ));
  

  return (
    <div className=' mt-3'>
      <motion.section
         whileInView={{ opacity: [0, 1], y: [50, 0] }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <h6 className="m-auto bg-slate-950 md:w-[190px] mb-3">
          <Titleanimated text="Speakers" />
        </h6>
        <div className='   '>
          <AliceCarousel
            mouseTracking
            items={items}
            autoPlayInterval={1500}
            autoPlay={true}
            infinite
            responsive={{
              0: { items: 1 },
              768: { items: 2 },
              1024: { items: 4 }
            }}
          />
        </div>
      </motion.section>

      <Modal show={show} onHide={handleClose} centered className="cursor-pointer">
  <Modal.Body className="text-gray-800 p-6 bg-white rounded-lg shadow-lg">
    <Modal.Title className="text-2xl font-semibold text-center mb-4">
      {selectedUser?.name}
    </Modal.Title>

    <img
      className="m-auto rounded-full border-2 border-gray-300 shadow-sm mb-4"
      src={selectedUser?.photo}
      alt={selectedUser?.name}
      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
    />

    <p className="text-sm leading-relaxed text-justify">
      {selectedUser?.description}
    </p>
  </Modal.Body>
  
  <Modal.Footer className="flex justify-center">
    <Button
      variant="secondary"
      onClick={handleClose}
      className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
    >
      Fermer
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default Speackers;

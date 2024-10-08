import React from 'react';
import { motion } from 'framer-motion';
import Titleanimated from '../../../components/Title/Titleanimated';
import CardUser from '../../../components/Card/CardUser';

import team1 from "./../../../../public/assets/team/kbenhayoun.png";
import team2 from "./../../../../public/assets/team/msabir.png";
import team3 from "./../../../../public/assets/team/olahlou.png";
import team4 from "./../../../../public/assets/team/jabrane.jpeg";
import team5 from "./../../../../public/assets/team/mboutaieb.png";
import team6 from "./../../../../public/assets/team/alahlou.png";
import team7 from "./../../../../public/assets/team/avatar.jpg";
 
export default function Bureau() {
  const teams = [
    { img: team1, name: "Président", title: "Dr Mohamed Kamal Benhayoun" },
    { img: team2, name: "1er Vice-Président", title: "Dr Mostafa Sabir" },
    { img: team3, name: "2è Vice-Président", title: "Dr Omar Lahlou" },
    { img: team4, name: "Secrétaire Général", title: "Dr Naima Jebrane" },
    { img: team5, name: "Secrétaire Général Adjoint", title: "Dr Mohamed Boutaleb" },
    { img: team6, name: "Trésorier", title: "Dr Abdelfettah Lahlou" },
    { img: team7, name: "Trésorier adjoint", title: "Dr Meriem Ouadine" },
  ];

  return (
    <div className="container mx-auto p-6 mb-8 bg-gray-50 rounded-lg shadow-lg">
      <div className=" m-2">
        <h6 className="m-auto bg-slate-950 md:w-[160px] p-2 rounded-md text-white mb-8">
          <Titleanimated text="BUREAU" />
        </h6>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {teams.map((team, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="flex justify-center"
          >
            <CardUser img={team.img} name={team.name} title={team.title} />
          </motion.div>
        ))}
      </section>


      

     
    </div>
  );
}

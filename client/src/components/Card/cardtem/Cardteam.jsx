import React from "react";
import { motion } from "framer-motion";
import { apiurl } from "../../../utlis/var";

export default function Cardteam({
  photo,
  civilite,
  nom,
  prenom,
  telephone,
  adresse,
  ville,
  email,
}) {
  // Determine the photo URL based on the provided photo prop
  const photoUrl =
    photo === "Male"
      ? `${apiurl}/storage/photos/default/Male.png`
      : photo === "Female"
      ? `${apiurl}/storage/photos/default/Female.png`
      : photo
      ? `${apiurl}/storage/${photo}`
      : `${apiurl}/storage/photos/default/defaultimage.png`;

  return (
    <motion.div
    className="m-10 max-w-sm shadow-[5px_5px_rgba(234,_38,_29,_0.4),_10px_10px_rgba(234,_38,_29,_0.3),_15px_15px_rgba(234,_38,_29,_0.2),_20px_20px_rgba(234,_38,_29,_0.1),_25px_25px_rgba(234,_38,_29,_0.05)]"
    whileHover={{ scale: 1.05 }}
      whileInView={{ opacity: 1  ,scale: 1}}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
          <img
            className="mx-auto h-auto w-full rounded-full"
            src={photoUrl}
            alt={`${nom} ${prenom}`}
          />
        </div>
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {`${civilite} ${prenom} ${nom}`}
        </h1>
        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
          {adresse && `${adresse}, ${ville}`}
        </p>
        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
          {telephone && `Phone: ${telephone}`}
        </p>
        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
          {email && `Email: ${email}`}
        </p>
      </div>
    </motion.div>
  );
}

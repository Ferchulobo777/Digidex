import React from 'react';
import { motion } from 'framer-motion';

const DigimonCard = ({ digimon }) => {
  return (
    <section className="mt-2 mb-2">
      <motion.div
        className="bg-orange-300 rounded-md p-10 mx-6 shadow-md shadow-black"
        whileHover={{
          boxShadow: '0px 5px 15px -5px rgba(0, 0, 0, 0.3) inset',
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        {digimon.img ? (
          <motion.img
            src={digimon.img}
            alt={digimon.name}
            className="mx-auto border-8 border-cyan-300 outline outline-black"
            whileHover={{
              scale: 1.1,
              filter: 'saturate(200%)',
              borderRadius: '50%',
              transition: { duration: 0.2 },
            }}
          />
        ) : null}
        <p className="text-xl font-black text-center capitalize mt-4">{digimon.name}</p>
        <p className="text-lg font-semibold text-center capitalize">{digimon.level}</p>
      </motion.div>
    </section>
  );
};

export default DigimonCard;

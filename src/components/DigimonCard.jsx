import React from 'react';

const DigimonCard = ({ digimon }) => {
  return (
    <section className="mt-2 mb-2">
      <div className="bg-orange-300 rounded-md p-6 shadow-md shadow-black hover:shadow-lg hover:shadow-white">
        {digimon.img ? (
          <img
            src={digimon.img}
            alt={digimon.name}
            className="mx-auto hover:transform hover:scale-110 hover:saturate-200 hover:rounded-full border-8 border-cyan-300 outline outline-black"
          />
        ) : null}
        <p className="text-xl font-black text-center capitalize mt-4">{digimon.name}</p>
        <p className="text-lg font-semibold text-center capitalize">{digimon.level}</p>
      </div>
    </section>
  );
};

export default DigimonCard;

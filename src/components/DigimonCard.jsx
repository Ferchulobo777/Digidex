import React from 'react';

const DigimonCard = ({ digimon }) => {
  return (
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
  );
};

export default DigimonCard;

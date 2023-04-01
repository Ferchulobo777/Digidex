import React from 'react';

const DigimonCard = ({ digimon }) => {
  return (
    <div className="bg-gray-200 rounded-md p-4 shadow-md">
      {digimon.img ? (
        <img src={digimon.img} alt={digimon.name} className="mx-auto" />
      ) : null}
      <p className="text-lg font-bold text-center">{digimon.name}</p>
      <p className="text-center">{digimon.level}</p>
    </div>
  );
};

export default DigimonCard;
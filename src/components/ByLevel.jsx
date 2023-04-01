import React, { useState } from 'react';
import { usePagination } from '../hooks/usePagination';
import DigimonCard from './DigimonCard';

const ByLevel = ({ getByLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [filteredDigimon, setFilteredDigimon] = useState([]);
  const digimonPerPage = 12;

  const handleFilterByLevel = async (event) => {
    const level = event.target.value;
    setSelectedLevel(level);
    const digimon = await getByLevel(level);
    setFilteredDigimon(digimon);
  };

  const filteredPagination = usePagination(filteredDigimon, digimonPerPage);

  return (
    <div className="flex flex-col justify-center items-center mt-16 w-1/2">
      <p className="text-2xl font-bold mb-2 text-center">Buscar por nivel:</p>
      <select
        value={selectedLevel}
        onChange={handleFilterByLevel}
        className="w-1/2 text-xl font-bold rounded-lg shadow-md cursor-pointer text-center border-2 border-black text-zinc-800 input flex justify-center"
      >
        <option value="" className="font-black text-center">
          --Seleccione un nivel--
        </option>
        <option value="Fresh" className="font-black">
          Fresh
        </option>
        <option value="In Training" className="font-black">
          In Training
        </option>
        <option value="Rookie" className="font-black">
          Rookie
        </option>
        <option value="Champion" className="font-black">
          Champion
        </option>
        <option value="Ultimate" className="font-black">
          Ultimate
        </option>
        <option value="Mega" className="font-black">
          Mega
        </option>
      </select>
      {filteredDigimon.length > 0 && (
        <div className="flex flex-wrap flex-row gap-6 mt-20 mb-20 mx-6 justify-evenly">
          <div className="flex flex-wrap flex-row gap-4 mt-20 justify-center w-3/4 text-xl font-bold hover:shadow-md hover:shadow-red-500 rounded-lg cursor-pointer">
            {filteredPagination.pages.map((page) => (
              <button
                key={page}
                onClick={() => filteredPagination.changePageTo(page)}
                className={
                  filteredPagination.currentPage === page
                    ? 'text-red-500 font-black text-3xl hover:shadow-md hover:shadow-red-500 rounded-lg'
                    : 'hover:shadow-md hover:shadow-red-500 rounded-lg'
                }
              >
                {page}
              </button>
            ))}
          </div>
          {filteredDigimon.map((digimon) => (
            <DigimonCard key={digimon.id} digimon={digimon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ByLevel;
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import DigimonCard from '../components/DigimonCard';
import Bylevel from '../components/ByLevel';
import { usePagination } from '../hooks/usePagination';

const Digidex = () => {
  const { user } = useContext(UserContext);
  const [digimons, setDigimons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const digimonsPagination = usePagination(
    digimons.length > 0
      ? digimons.filter((digimon) =>
          digimon.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
        )
      : [],
    21,
  );
  const getAllDigimons = async () => {
    try {
      const res = await axios.get('https://digimon-api.vercel.app/api/digimon');
      const digimons = res.data.map((d) => {
        return {
          name: d.name,
          img: d.img,
          level: d.level,
        };
      });
      return digimons;
    } catch (error) {
      console.error(error);
    }
  };
  const getByLevel = async (level) => {
    try {
      const res = await axios.get(
        `https://digimon-api.vercel.app/api/digimon/level/${level}`,
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const loadAllDigimons = async () => {
    const allDigimons = await getAllDigimons();

    setDigimons(allDigimons);
  };

  useEffect(() => {
    loadAllDigimons();
  }, [loadAllDigimons]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
  };

  const getDigimonByName = async (name) => {
    try {
      const res = await axios.get(
        `https://digimon-api.vercel.app/api/digimon/name/${name}`,
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 mb-10 w-full">
      <p className="w-full relative text-center top-52 text-black font-bold text-4xl light">
        Hola Tamer <span className="text-orange-500 user">{user} </span>Bienvenido a tu
        Digivice
      </p>
      <input
        className="mt-60 mb-10 flex w-1/2 h-10 text-xl rounded-lg input p-3 placeholder:text-gray-400 font-black placeholder:text-center border-2 border-black"
        type="text"
        placeholder="Busca aquí tu Digimon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="flex flex-row flex-wrap gap-12 justify-between">
        <button
          className="mt-8 mb-10 bg-red-500 w-28 h-12 text-lg font-bold rounded-lg hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white shadow shadow-blue-text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={handleResetSearch}
        >
          Borrar
        </button>
        <button
          className="mt-8 mb-10 bg-blue-500 w-28 h-12 text-lg font-bold rounded-lg hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white shadow shadow-blue-text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ml-4"
          onClick={() => (window.location.href = '/')}
        >
          Inicio
        </button>
      </div>
      <div className="flex w-full justify-center items-center">
        <Bylevel getByLevel={getByLevel} />
      </div>
      <div className="flex flex-wrap flex-row gap-4 mt-20 justify-center w-3/4 text-3xl font-bold hover:shadow-md hover:shadow-red-500 rounded-lg cursor-pointer h-20">
        {digimonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => digimonsPagination.changePageTo(page)}
            className={
              digimonsPagination.currentPage === page
                ? 'text-red-500 font-black text-4xl hover:saturate-200'
                : ''
            }
          >
            {page}
          </button>
        ))}
      </div>
      <section className="flex flex-wrap flex-row gap-6 mt-20 mb-20 mx-6 justify-evenly">
        {digimonsPagination.listSlice.map((digimon, index) => (
          <DigimonCard key={index} digimon={digimon} />
        ))}
      </section>
    </div>
  );
};

export default Digidex;

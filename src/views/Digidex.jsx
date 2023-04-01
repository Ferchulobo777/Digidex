import { useState, useEffect } from 'react';
import axios from 'axios';
import DigimonCard from '../components/DigimonCard';
import Bylevel from '../components/ByLevel';
import { usePagination } from '../hooks/usePagination';

const Digidex = ({ user }) => {
  const [digimons, setDigimons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [digimonsPerPage, setDigimonsPerPage] = useState(12);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
  };

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

  useEffect(() => {
    const loadAllDigimons = async () => {
      const allDigimons = await getAllDigimons();
      console.log(allDigimons); // Agregar esta línea
      setDigimons(allDigimons);
      setLoading(false);
    };

    loadAllDigimons();
  }, []);
  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="w-full relative text-center top-52 text-black font-bold text-4xl light">
        Hola Tamer <span className="text-orange-500 user">{user} </span>Bienvenido a tu
        Digidex
      </p>
      <input
        className="mt-60 flex w-1/2 h-10 text-xl rounded-lg input p-3 placeholder:text-gray-400 font-black placeholder:text-center border-2 border-black"
        type="text"
        placeholder="Busca aquí tu Digimon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="flex flex-row flex-wrap gap-12 justify-between">
        <button
          className="mt-8 bg-red-500 w-28 h-12 text-lg font-bold rounded-lg hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white shadow shadow-blue-text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={handleResetSearch}
        >
          Borrar
        </button>
        <button
          className="mt-8 bg-blue-500 w-28 h-12 text-lg font-bold rounded-lg hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white shadow shadow-blue-text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ml-4"
          onClick={() => (window.location.href = '/')}
        >
          Inicio
        </button>
        <Bylevel getByLevel={getByLevel} />
      </div>
      <div className="flex flex-wrap justify-center mt-8 gap-8">
        {loading ? (
          <p className="text-black font-bold text-xl">Cargando...</p>
        ) : (
          digimons
            .filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((d, i) => <DigimonCard key={i} digimon={d} />)
        )}
      </div>
    </div>
  );
};

export default Digidex;

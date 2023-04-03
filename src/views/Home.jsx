import React, { useState, useContext } from 'react';
import Sound from '../components/Sound';
import background from '../assets/video/Digimon.mp4';
import sound from '../assets/audio/Digimon.mp3';
import logo from '../assets/img/Logo_Digimon.png';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router';

const Home = () => {
  const [nameValue, setNameValue] = useState('');

  const [nameError, setNameError] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);

    if (newNameValue === '') setNameError('El nombre es requerido');
    else if (!/^[A-Z][a-z ]{2,}$/.test(newNameValue))
      setNameError(
        'Solo se permiten letras, espacios, y el nombre debe tener al menos 3 caracteres',
      );
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) {
      setUser(nameValue);
    }
  };

  return (
    <div className="w-full h-full flex">
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-0 object-cover"
      >
        <source src={background} type="video/mp4" />
      </video>
      <div className="relative w-80 h-2 sm:w-4/5 sm:h-2/4 sm:top-28 sm:ml-16 flex justify-center items-center mx-8 md:w-3/4 md:h-2/4 md:ml-24 md:top-28 lg:h-16 lg:w-3/5 lg:ml-52 lg:top-24 xl:ml-96 xl:w-2/5 xl:h-48 xl:top-2 2xl:w-2/4 2xl:h-48 2xl:top-14 2xl:ml-96">
        <img
          className="absolute z-10 hover:saturate-200 image-logo"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="bg-white/30 h-3/4 w-4/5 flex rounded-3xl shadow-xl shadow-black p-0 mt-44 z-10 absolute top-0 botom-0 left-10 right-0 border-4 border-orange-400 outline outline-black hover:traslate sm:ml-8 sm:h-4/5 md:ml-12 sm:mt-60 md:h-4/5 lg:h-4/5 lg:w-3/5 lg:mt-72 lg:ml-40 xl:w-1/2 xl:ml-72 xl:mt-52 xl:h-4/6 2xl:h-4/5 2xl:ml-96 2xl:w-2/4 2xl:mt-80 hover:shadow-lg hover:shadow-white modal">
        <div className="h-full w-full max-w-lg rounded-3xl p-5 mt-4 mb-4 flex flex-col justify-evenly">
          <h1 className="title font-black text-center text-5xl text-orange-400 stroke-red-500 stroke-6 md:ml-12 xl:ml-16 2xl:ml-32 w-full hover:saturate-200">
            ¡Hola Tamer!
          </h1>
          <p className="title2 text-3xl text-white font-bold text-center md:ml-14 lg:ml-12  xl:ml-20 2xl:ml-32 w-full">
            Ingresa tu nombre para comenzar!
          </p>
          <form
            className="flex flex-col gap-4 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full h-9 px-3 border-4 border-orange-400 outline outline-black rounded-md shadow-lg shadow-slate-500 placeholder:text-black placeholder:text-base placeholder:text-center placeholder:font-bold md:ml-24 xl:ml-36 2xl:ml-60"
              required
              maxLength={10}
              id="name"
              type="text"
              placeholder="Nombre"
              value={nameValue}
              onChange={handleChange}
            />
            <button
              className="w-4/5 h-10 border-2 border-white outline outline-black bg-orange-400 text-zinc-900 transform hover:scale-110 text-lg font-bold rounded-md sm:w-52 md:ml-28 xl:ml-40 2xl:ml-60 hover:saturate-200"
              type="submit"
            >
              Digimundo
            </button>
            <Sound autoPlay src={sound} />
          </form>
          {nameError && (
            <p className="text-red-500 w-full text-center text-xl xl:ml-16 font-black warning">
              {nameError}
            </p>
          )}
          {user && <Navigate to="/digidex" />}
        </div>
      </div>
    </div>
  );
};

export default Home;

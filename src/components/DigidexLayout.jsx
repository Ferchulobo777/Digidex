import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import headerred from '../assets/img/Header_Pokedex_Red.png';
import headerblack from '../assets/img/Header_Pokedex_Black.png';
import logo from '../assets/img/Logo_Pokedex.png';
import ball from '../assets/img/Ellipse 3.png';
import { FiSun, FiMoon } from 'react-icons/fi';
import Footer from './Footer';

const DigidexLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('bg-black');
      document.body.classList.add('text-white');
    } else {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('text-white');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="w-full box-border">
      <img
        className="absolute w-full top-0 left-0 h-20"
        src={headerred}
        alt="header-red"
      />
      <img
        className="absolute w-full h-12 left-0 top-20"
        src={headerblack}
        alt="header-black"
      />
      <img
        className="absolute w-48 h-14 left-4 top-6 header"
        src={logo}
        alt="logo-pokedex"
      />
      <img className="absolute ball" src={ball} alt="ball" />
      <button
        className="absolute top-12 right-14 bg-red-500 p-4 rounded-full border-2 border-slate-400 outline outline-slate-400 togle"
        onClick={handleToggleDarkMode}
      >
        {isDarkMode ? (
          <FiSun className="h-6 w-6 text-yellow-500 font-black" />
        ) : (
          <FiMoon className="h-6 w-6 text-yellow-500 font-black" />
        )}
      </button>
      <Outlet />
      <Footer />
    </div>
  );
};

export default DigidexLayout;

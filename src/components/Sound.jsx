import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const Sound = ({ src }) => {
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const newSound = new Howl({
      src,
      autoplay: true,
      loop: true,
      volume: 1,
    });
    setSound(newSound);
    setPlaying(true);

    // Reproducir música automáticamente cuando se carga la página
    newSound.play();

    return () => {
      // Detener la instancia de Howl cuando el componente se desmonte
      newSound.stop();
    };
  }, [src]);

  const toggleSound = () => {
    if (sound) {
      if (playing) {
        sound.pause();
        setPlaying(false);
      } else {
        sound.play();
        setPlaying(true);
      }
    }
  };
  return (
    <div className="flex items-center justify-center">
      <button
        className="w-20 h-10 bg-black border-2 border-white outline outline-cyan-300 rounded-md md:ml-28 xl:ml-40 2xl:ml-60 hover:saturate-200"
        onClick={toggleSound}
      >
        <FontAwesomeIcon
          className="text-orange-300 w-10 h-6 icon_music items-center justify-center"
          icon={playing ? faStop : faPlay}
        />
      </button>
    </div>
  );
};

export default Sound;

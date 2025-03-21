import React from 'react';

const Tetris = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <iframe
        src="https://www.lumpty.com/amusements/Games/Tetris/tetris.html"
        title="Tetris"
        width="1024"
        height="768"
        frameBorder="0"
        scrolling="no"
        className="rounded-lg bg-black w-full max-w-4xl"
        style={{ 
          maxHeight: '80vh',
          aspectRatio: '16/9'
        }}
        allowFullScreen
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default Tetris; 
import React from 'react';

const Pong = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <iframe
        src="https://www.crazygames.com/embed/table-tennis-world-tour"
        title="Pong"
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

export default Pong; 
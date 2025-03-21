import React from 'react';

const FlappyBird = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <iframe
        src="https://www.crazygames.com/embed/flappy-bird"
        title="Flappy Bird"
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        className="rounded-lg bg-black"
        style={{ 
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: '4/3'
        }}
        allowFullScreen
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default FlappyBird; 
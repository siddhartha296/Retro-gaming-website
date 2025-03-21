import React, { useState } from 'react';
import { Trophy, LogOut, ArrowRight } from 'lucide-react';
import Login from './Login';
import FlappyBird from './games/FlappyBird';
import Tetris from './games/Tetris';
import Pacman from './games/Pacman';
import Snake from './games/Snake';
import SpaceInvaders from './games/SpaceInvaders';
import Pong from './games/Pong';
import Ad from './Ad';
import EmailLinkHandler from './EmailLinkHandler';

const RetroGaming = () => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState({
    flappyBird: 0,
    tetris: 0,
    pacman: 0,
    snake: 0,
    spaceInvaders: 0,
    pong: 0
  });
  const [activeGame, setActiveGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState('flappy-bird');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveGame(null);
  };

  const games = {
    'pacman': {
      title: 'Pacman',
      component: <Pacman />,
      instructions: 'Use Arrow keys to move Pacman and eat all the dots while avoiding ghosts',
      description: 'The classic maze chase game where you eat dots and avoid ghosts. One of the most iconic arcade games ever made.',
      color: 'yellow',
      status: 'live'
    },
    'tetris': {
      title: 'Tetris',
      component: <Tetris />,
      instructions: 'Arrow keys to move, Up to rotate, Space to hard drop, C to hold piece',
      description: 'The ultimate puzzle game. Stack blocks, clear lines, and challenge yourself to reach higher levels.',
      color: 'blue',
      status: 'live'
    },
    'snake': {
      title: 'Snake',
      component: <Snake />,
      instructions: 'Use Arrow keys to control the snake. Eat food to grow longer, avoid hitting walls and yourself',
      description: 'Guide your snake to eat food and grow longer, but don\'t hit the walls or yourself! A true classic.',
      color: 'purple',
      status: 'live'
    },
    'space-invaders': {
      title: 'Space Invaders',
      component: <SpaceInvaders />,
      instructions: 'Arrow keys to move, Space to shoot. Destroy all aliens while avoiding their attacks',
      description: 'Defend Earth from waves of descending aliens in this legendary shoot \'em up arcade game.',
      color: 'red',
      status: 'live'
    },
    'pong': {
      title: 'Pong',
      component: <Pong />,
      instructions: 'Use mouse or arrow keys to move the paddle. Keep the ball in play and score points!',
      description: 'The original video game! Play this classic table tennis simulation that started it all.',
      color: 'orange',
      status: 'live'
    },
    'flappy-bird': {
      title: 'Flappy Bird',
      component: <FlappyBird />,
      instructions: 'Press SPACE to jump',
      description: 'Navigate your bird through pipes by tapping to flap. Simple to learn, challenging to master!',
      color: 'green',
      status: 'live'
    }
  };

  const filteredGames = Object.entries(games).filter(([key, game]) => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">Retro Arcade</h1>
          {user && (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {!user ? (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 mb-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to Retro Arcade!</h2>
              <p className="text-xl mb-6">Login to play classic arcade games for free!</p>
              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
            <EmailLinkHandler onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <>
            {!activeGame && (
              <div className="mb-8">
                <div className="max-w-xl mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search games..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {!activeGame ? (
          <>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Available Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.map(([key, game]) => (
                  <div key={key} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300">
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <span className="text-5xl" role="img" aria-label={game.title}>
                          {key === 'pacman' && '👾'}
                          {key === 'tetris' && '🟦'}
                          {key === 'snake' && '🐍'}
                          {key === 'space-invaders' && '👽'}
                          {key === 'pong' && '🏓'}
                          {key === 'flappy-bird' && '🐦'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-center">{game.title}</h3>
                      <p className="text-gray-400 mb-4 h-20">{game.description}</p>
                      <div className="flex flex-col gap-4">
                        {user ? (
                          <>
                            <div className="flex items-center justify-center gap-2">
                              <Trophy size={20} className="text-yellow-500" />
                              <span>High Score: {scores[key.replace('-', '')]}</span>
                            </div>
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setActiveGame(key);
                                  setSelectedGame(key);
                                }}
                                className={`flex items-center gap-2 px-6 py-3 bg-${game.color}-600 rounded-lg hover:bg-${game.color}-700 transition`}
                                disabled={game.status !== 'live'}
                              >
                                Play Now <ArrowRight size={16} />
                              </button>
                            </div>
                          </>
                        ) : (
                          <button
                            onClick={() => document.querySelector('input[type="email"]').focus()}
                            className="mt-4 px-6 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
                          >
                            Login to Play
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center mt-8 p-8 bg-gray-800 rounded-lg">
                <p className="text-xl text-gray-400">No games found matching "{searchTerm}"</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl mb-4">
              Playing {games[selectedGame].title}
            </h2>
            <button
              onClick={() => setActiveGame(null)}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Back to Games
            </button>
            <div className="mt-8 p-4 bg-gray-800 rounded">
              <div className="w-full max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-xl p-4">
                <h2 className="text-xl text-white mb-4 text-center">{games[selectedGame].title}</h2>
                <div className="bg-black rounded-lg overflow-hidden">
                  {games[selectedGame].component}
                </div>
                
                <div className="mt-4 text-gray-300 text-center">
                  <p>{games[selectedGame].instructions}</p>
                  <p className="text-sm mt-2">Click to start the game</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Ad slot="4037845175" />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-auto py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Retro Arcade</h3>
              <p className="text-gray-400">
                Welcome to Retro Arcade, your destination for classic gaming! Play timeless favorites 
                like Pacman, Tetris, Snake, and more completely free in your browser. No downloads 
                needed, just instant retro gaming fun.
              </p>
              <p className="text-gray-400 mt-4">
                Our collection features carefully selected versions of the most popular arcade games, 
                optimized for modern browsers and devices. Enjoy high scores, smooth gameplay, and 
                the authentic retro gaming experience.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Games</h4>
              <ul className="space-y-2 text-gray-400">
                {Object.entries(games).map(([key, game]) => (
                  <li key={key}>
                    <button 
                      onClick={() => {
                        setActiveGame(key);
                        setSelectedGame(key);
                      }}
                      className="hover:text-purple-400"
                    >
                      {game.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Share</h4>
              <div className="flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Play classic arcade games online!`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  Twitter
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Retro Arcade. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Made with 💜 by{' '}
              <a 
                href="https://github.com/siddhartha296" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Siddhartha Pittala
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RetroGaming;
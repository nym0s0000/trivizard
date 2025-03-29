import { useState } from 'react';
import GameScreen from './GameScreen';
import './App.css';

function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <div className="app">
      {!inGame ? (
        <div className="lobby">
          <h1>🏟️ Trivizard Tournament</h1>
          <button 
            onClick={() => setInGame(true)}
            className="start-button"
          >
            Start Quiz!
          </button>
        </div>
      ) : (
        <GameScreen />
      )}
    </div>
  );
}

export default App;
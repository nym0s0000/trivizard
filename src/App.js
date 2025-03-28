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
            style={{ 
              padding: "10px 20px", 
              fontSize: "18px", 
              background: "#740001", 
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
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
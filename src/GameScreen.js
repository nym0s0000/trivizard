import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { useState, useEffect } from 'react';
import correctSound from '/Users/DELL/trivizard/src/sound/correct.mp3';
import wrongSound from '/Users/DELL/trivizard/src/sound/wrong.mp3';
import './GameScreen.css';

function GameScreen() {
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  const questions = [
    {
      q: "What is the core of Harry's wand?",
      a: "Phoenix feather",
      options: ["Dragon heartstring", "Phoenix feather", "Unicorn hair"],
      house: "Gryffindor"
    },
    {
      q: "Who guards the entrance to Gryffindor Tower?",
      a: "The Fat Lady",
      options: ["The Grey Lady", "The Bloody Baron", "The Fat Lady"],
      house: "Gryffindor"
    },
    {
      q: "What potion makes you lucky?",
      a: "Felix Felicis",
      options: ["Polyjuice Potion", "Felix Felicis", "Veritaserum"],
      house: "Ravenclaw"
    },
    {
      q: "What creature is Aragog?",
      a: "Acromantula",
      options: ["Basilisk", "Acromantula", "Thestral"],
      house: "Slytherin"
    },
    {
      q: "What position does Harry play in Quidditch?",
      a: "Seeker",
      options: ["Chaser", "Seeker", "Keeper"],
      house: "Gryffindor"
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [housePoints, setHousePoints] = useState({
    Gryffindor: 0,
    Slytherin: 0,
    Ravenclaw: 0,
    Hufflepuff: 0
  });

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQ].a;
    
    if (isCorrect) {
      playCorrect();
      const newScore = score + 10;
      setScore(newScore);
      setHousePoints(prev => ({
        ...prev,
        [questions[currentQ].house]: prev[questions[currentQ].house] + 10
      }));
    } else {
      playWrong();
    }

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setCurrentQ(currentQ + 1);
      setSelectedAnswer("");
    }, 1500);
  };

  if (currentQ >= questions.length) {
    const winningHouse = Object.entries(housePoints).reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0];

    return (
      <motion.div 
        className="game-over"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>🏆 House Cup Awarded! 🏆</h2>
        <p>Your final score: {score}</p>
        
        <div className="house-results">
          {Object.entries(housePoints).map(([house, points]) => (
            <motion.div
              key={house}
              className={`house ${house === winningHouse ? 'winning' : ''}`}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{house}: {points} points</h3>
              <div className="house-bar" style={{
                width: `${(points / 50) * 100}%`,
                background: 
                  house === 'Gryffindor' ? 'linear-gradient(to right, #740001, #ffc500)' :
                  house === 'Slytherin' ? 'linear-gradient(to right, #1a472a, #aaaaaa)' :
                  house === 'Ravenclaw' ? 'linear-gradient(to right, #0e1a40, #946b2d)' :
                  'linear-gradient(to right, #372e29, #ecb939)'
              }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="badge-container"
        >
          <img 
            src={`c:\Users\DELL\Downloads\explore-the-magic-of-harry-potter-in-4k-65ia7qsffn6yt3te.jpg/${winningHouse === 'Gryffindor' ? '7Q5Ny6X' : 
                  winningHouse === 'Slytherin' ? '3tYK7Zn' :
                  winningHouse === 'Ravenclaw' ? '9zQYjJf' : '5vJ8XbT'}.png`} 
            alt={`${winningHouse} Badge`} 
            width="120"
          />
          <p>The {winningHouse} House Wins!</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="game-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="question-header">
        <h2>Question {currentQ + 1}: {questions[currentQ].q}</h2>
        <span className="house-tag" style={{
          background: 
            questions[currentQ].house === 'Gryffindor' ? '#740001' :
            questions[currentQ].house === 'Slytherin' ? '#1a472a' :
            questions[currentQ].house === 'Ravenclaw' ? '#0e1a40' : '#372e29'
        }}>
          {questions[currentQ].house}
        </span>
      </div>

      <motion.div
        className="snitch"
        animate={{ 
          x: score * 5,
          y: Math.sin(Date.now() / 300) * 20,
          rotate: score * 10
        }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      <div className="options">
        {questions[currentQ].options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => checkAnswer(option)}
            disabled={showResult}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`option ${selectedAnswer === option ? 
              (option === questions[currentQ].a ? 'correct' : 'wrong') : ''}`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <div className="score-display">
        <motion.div 
          className="score"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
          key={score}
        >
          <h3>Score: {score}</h3>
          <div className="progress-bar">
            <motion.div
              animate={{ width: `${(score / 50) * 100}%` }}
              style={{ 
                height: '100%', 
                background: "linear-gradient(to right, #740001, #ffc500)" 
              }}
            />
          </div>
        </motion.div>
      </div>

      {showResult && (
        <motion.div
          className="result-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ 
            color: selectedAnswer === questions[currentQ].a ? '#4CAF50' : '#F44336',
            textShadow: selectedAnswer === questions[currentQ].a ? 
              '0 0 10px #4CAF50' : '0 0 10px #F44336'
          }}
        >
          {selectedAnswer === questions[currentQ].a ? 
            "Correct! +10 points to " + questions[currentQ].house + "!" : 
            "Wrong! The answer was: " + questions[currentQ].a}
        </motion.div>
      )}
    </motion.div>
  );
}

export default GameScreen;
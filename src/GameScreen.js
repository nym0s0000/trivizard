import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function GameScreen() {
  // Harry Potter trivia questions
  const questions = [
    {
      q: "What is the core of Harry's wand?",
      a: "Phoenix feather",
      options: ["Dragon heartstring", "Phoenix feather", "Unicorn hair"]
    },
    {
      q: "Who guards the entrance to Gryffindor Tower?",
      a: "The Fat Lady",
      options: ["The Grey Lady", "The Bloody Baron", "The Fat Lady"]
    },
    {
      q: "What potion makes you lucky?",
      a: "Felix Felicis",
      options: ["Polyjuice Potion", "Felix Felicis", "Veritaserum"]
    },
    {
      q: "What creature is Aragog?",
      a: "Acromantula",
      options: ["Basilisk", "Acromantula", "Thestral"]
    },
    {
      q: "What position does Harry play in Quidditch?",
      a: "Seeker",
      options: ["Chaser", "Seeker", "Keeper"]
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Handle answer selection
  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQ].a) {
      setScore(score + 10);
    }
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setCurrentQ(currentQ + 1);
      setSelectedAnswer("");
    }, 1500);
  };

  // Quidditch animation (Snitch flies when score increases)
  useEffect(() => {
    // Add sound effects here later (e.g., "whoosh" on correct answer)
  }, [score]);

  // Game over if all questions answered
  if (currentQ >= questions.length) {
    return (
      <div className="game-over">
        <h2>🏆 Game Over! 🏆</h2>
        <p>Your score: {score}</p>
        {score >= 30 ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://i.imgur.com/7Q5Ny6X.png" alt="Gryffindor Badge" width="100" />
            <p>You won the House Cup!</p>
          </motion.div>
        ) : (
          <p>Try again to earn a badge!</p>
        )}
      </div>
    );
  }

  return (
    <div className="game-screen">
      <h2>Question {currentQ + 1}: {questions[currentQ].q}</h2>
      
      {/* Quidditch Snitch Animation */}
      <motion.div
        className="snitch"
        animate={{ x: score * 10, rotate: 360 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{
          width: 30,
          height: 30,
          background: "gold",
          borderRadius: "50%",
          position: "absolute",
        }}
      />

      {/* Answer Options */}
      <div className="options">
        {questions[currentQ].options.map((option, index) => (
          <button
            key={index}
            onClick={() => checkAnswer(option)}
            disabled={showResult}
            style={{
              background: selectedAnswer === option 
                ? option === questions[currentQ].a ? "green" : "red" 
                : "#f0f0f0",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Score Display */}
      <div className="score">
        <h3>Score: {score}</h3>
        <div className="progress-bar">
          <motion.div
            animate={{ width: `${(score / 50) * 100}%` }}
            style={{ height: 20, background: "linear-gradient(to right, #ff0000, #ffcc00)" }}
          />
        </div>
      </div>

      {showResult && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: selectedAnswer === questions[currentQ].a ? "green" : "red" }}
        >
          {selectedAnswer === questions[currentQ].a ? "Correct! 🎉" : "Wrong! 😢"}
        </motion.p>
      )}
    </div>
  );
}

export default GameScreen;
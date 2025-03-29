import { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './AuthPage.css';

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      onLogin(formData.username || formData.email.split('@')[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hogwarts-banner">
        <img 
          src="" 
          alt="Hogwarts Crest" 
          className="crest"
        />
        <h1 className="title">Trivizard Tournament</h1>
      </div>

      <motion.div 
        className="auth-box"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="input-group"
            >
              <label>
                <i className="fas fa-hat-wizard"></i> Wizard Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. HarryPotter"
                required={!isLogin}
              />
            </motion.div>
          )}

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: isLogin ? 0.4 : 0.5 }}
            className="input-group"
          >
            <label>
              <i className="fas fa-envelope"></i> Owl Mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@owlmail.com"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: isLogin ? 0.5 : 0.6 }}
            className="input-group"
          >
            <label>
              <i className="fas fa-lock"></i> Secret Spell
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </motion.div>

          {error && (
            <motion.p 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isLogin ? 0.6 : 0.7 }}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        <motion.div
          className="switch-mode"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isLogin ? 0.7 : 0.8 }}
        >
          {isLogin ? (
            <p>
              First time at Hogwarts?{' '}
              <span onClick={() => setIsLogin(false)}>Create an account</span>
            </p>
          ) : (
            <p>
              Already enrolled?{' '}
              <span onClick={() => setIsLogin(true)}>Sign In</span>
            </p>
          )}
        </motion.div>
      </motion.div>

      <div className="floating-candles">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="candle"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default AuthPage;
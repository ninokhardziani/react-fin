// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useDarkMode } from './context/DarkModeContext';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <nav>
          <ul className="nav-links">
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/">Register</Link></li>
            <li>
              <button onClick={toggleDarkMode} className="mode-toggle-button">
                {darkMode ? '☀' : '☽'}
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="main-content">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
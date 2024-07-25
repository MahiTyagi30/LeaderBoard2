// src/App.tsx

import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import AddScore from './components/AddScore';
import { FaPlus } from 'react-icons/fa';
import './App.css';

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <h1>Leaderboard</h1>
      <button onClick={togglePopup} className="add-score-button">
        <FaPlus /> Add Score
      </button>
      {showPopup && <AddScore closePopup={togglePopup} />}
      <Leaderboard />
    </div>
  );
};

export default App;

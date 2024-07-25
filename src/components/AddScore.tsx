// src/components/AddScore.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../features/leaderboardSlice';
import './AddScore.css';

interface AddScoreProps {
  closePopup: () => void;
}

const AddScore: React.FC<AddScoreProps> = ({ closePopup }) => {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addScore({ username, score }));
    setUsername('');
    setScore('');
    closePopup();
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <h3>Add Score</h3>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Score (MM:SS:MSS):
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            pattern="\d{2}:\d{2}:\d{3}"
            placeholder="MM:SS:MSS"
          />
        </label>
        <button type="submit">Add Score</button>
        <button type="button" onClick={closePopup} className="close-button">
          Close
        </button>
      </form>
    </div>
  );
};

export default AddScore;

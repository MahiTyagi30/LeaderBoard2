// src/components/AddScore.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addScore } from '../features/leaderboardSlice';
import './AddScore.css';

interface AddScoreProps {
  closePopup: () => void;
}

const AddScore: React.FC<AddScoreProps> = ({ closePopup }) => {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');
  const dispatch = useDispatch();

  const suprSendUrl = process.env.REACT_APP_SUPRSEND_URL || 'https://api.suprsend.com';
  const suprSendApiKey = process.env.REACT_APP_SUPRSEND_API_KEY;

  const sendNotification = async (message: string) => {
    if (!suprSendUrl || !suprSendApiKey) {
      console.error('SuprSend URL or API Key is not defined');
      return;
    }

    const payload = {
      message,
    };

    try {
      await axios.post(suprSendUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${suprSendApiKey}`,
        },
      });
    } catch (error) {
      console.error('Error sending notification', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addScore({ username, score }));
    await sendNotification(`New score added by ${username}: ${score}`);
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

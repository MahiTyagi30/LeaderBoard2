// src/components/Leaderboard.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { FaTrophy, FaList } from 'react-icons/fa';
import './Leaderboard.css';

const Leaderboard: React.FC = () => {
  const scores = useSelector((state: RootState) => state.leaderboard.scores);

  return (
    <div className="leaderboard">
      <h2> <FaTrophy style={{ marginRight: '5px' }} />Top 10 Scores</h2>
      <div className="leaderboard-header">
        <div className="leaderboard-rank">S.No</div>
        <div className="leaderboard-name">Name</div>
        <div className="leaderboard-score">Score (MM:SS:MSS)</div>
      </div>
      {scores.map((score, index) => (
        <div className="leaderboard-item" key={index}>
          <div className="leaderboard-rank">{index + 1}</div>
          <div className="leaderboard-name">{score.username}</div>
          <div className="leaderboard-score">{score.score}</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;

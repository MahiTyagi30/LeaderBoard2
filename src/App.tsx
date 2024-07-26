// src/App.tsx

import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import AddScore from './components/AddScore';
import { FaPlus } from 'react-icons/fa';
import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css'; // Needed for toast notifications
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

      {/* SuprSend Inbox Component */}
      <SuprSendInbox
        workspaceKey={process.env.REACT_APP_SUPRSEND_WORKSPACE_KEY || '<your_workspace_key>'}
        subscriberId={process.env.REACT_APP_SUPRSEND_SUBSCRIBER_ID || '<your_subscriber_id>'}
        distinctId={process.env.REACT_APP_SUPRSEND_DISTINCT_ID || '<your_distinct_id>'}
      />
    </div>
  );
};

export default App;

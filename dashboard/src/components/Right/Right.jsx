import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import GameInfo from './GameInfo';
import './Right.css';

function Right() {
  const [selectedGameId, setSelectedGameId] = useState(() => {
    // Read game ID from local storage or set default to 1
    const storedGameId = localStorage.getItem('selectedGameId');
    return storedGameId ? parseInt(storedGameId) : 1;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Check if the game ID in local storage has changed
      const storedGameId = localStorage.getItem('selectedGameId');
      const newGameId = storedGameId ? parseInt(storedGameId) : 1;
      if (newGameId !== selectedGameId) {
        // If it has changed, update selectedGameId state
        setSelectedGameId(newGameId);
      }
    }, 100); // Check every 100 milliseconds

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, [selectedGameId]); // Re-run effect whenever selectedGameId changes

  return (
    <Col>
      <GameInfo gameId={selectedGameId} />
    </Col>
  );
}

export default Right;
import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import GameInfo from './GameInfo';
import './Right.css';

function Right() {
  const [selectedGameId, setSelectedGameId] = useState(() => {
    const storedGameId = localStorage.getItem('selectedGameId');
    return storedGameId ? parseInt(storedGameId) : 1;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const storedGameId = localStorage.getItem('selectedGameId');
      const newGameId = storedGameId ? parseInt(storedGameId) : 1;
      if (newGameId !== selectedGameId) {
        setSelectedGameId(newGameId);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selectedGameId]);

  return (
    <Col>
      <GameInfo gameId={selectedGameId} />
    </Col>
  );
}

export default Right;
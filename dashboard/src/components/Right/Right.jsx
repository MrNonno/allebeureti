import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import GameInfo from './GameInfo';
import './Right.css';

function Right() {
  const [selectedGameId, setSelectedGameId] = useState(1);

  const handleGameSelect = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <>
      <Col>
        <GameInfo gameId={selectedGameId} />
      </Col>
    </>
  );
}

export default Right;
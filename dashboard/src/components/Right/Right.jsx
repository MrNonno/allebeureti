import React from 'react';
import { Col } from 'react-bootstrap';
import GameInfo from './GameInfo';
import './Right.css';

function Right() {
  return (
    <Col>
      <GameInfo gameId="1"/>
    </Col>
  );
}

export default Right;
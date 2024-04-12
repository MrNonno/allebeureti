import React from 'react';
import { Col } from 'react-bootstrap';
import GamesList from './GamesList';
import Title from './Title';
import './Left.css';

function Left({ onSelectGame }) {
  return (
    <Col sm={4}>
      <Title />
      <GamesList onSelectGame={onSelectGame} />
    </Col>
  );
}

export default Left;
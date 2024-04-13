import React from 'react';
import { Col } from 'react-bootstrap';
import GamesList from './GamesList';
import Title from './Title';
import './Left.css';

function Left() {
  return (
    <Col sm={4}>
      <Title />
      <GamesList />
    </Col>
  );
}

export default Left;
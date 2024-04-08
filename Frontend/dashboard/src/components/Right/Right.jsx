import React from 'react';
import { Col } from 'react-bootstrap';
import GameSelected from './GameSelected';
import './Right.css';

function Right() {
  return (
    <>
      <Col sm={8}>
        <GameSelected />
      </Col>
    </>
  );
}

export default Right;
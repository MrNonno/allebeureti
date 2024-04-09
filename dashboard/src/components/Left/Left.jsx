import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Title from './Title';
import GamesList from './GamesList';
import './Left.css';

function Left() {
  return (
    <>
        <Col sm={4}>
            <Row>
                <Col>
                    <Title />
                </Col>
            </Row>
            <Row>
                <Col>
                    <GamesList />
                </Col>
            </Row>
        </Col>
    </>
  );
}

export default Left;
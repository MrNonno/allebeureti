import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Title from './components/Title';
import Games from './components/Games';
import GameSelected from './components/GameSelected'; // Import the new component
import './App.css';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
          <div className="left-section">
            <Row>
              <Col>
                <Title />
              </Col>
            </Row>
            <Row>
              <Col>
                <Games />
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={8}>
          <div className="right-section">
            <GameSelected />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
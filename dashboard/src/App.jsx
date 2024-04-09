import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Left from './components/Left/Left';
import Right from './components/Right/Right';
import './App.css';

function App() {
  return (
    <Container fluid>
      <Row>
          <Left />
          <Right />
      </Row>
    </Container>
  );
}

export default App;
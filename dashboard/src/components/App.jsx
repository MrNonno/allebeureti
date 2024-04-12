import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Left from './Left/Left';
import Right from './Right/Right';
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
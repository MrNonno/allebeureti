// PlayerCard.jsx
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

// Constant for styling
const cardStyle = {
  width: '12rem',
  margin: '0.5rem',
  padding: '10px',
  borderRadius: '10px', // Add border radius
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Add box shadow for depth
  backgroundColor: '#333', // Match the background color of game card
};

function PlayerCard({ player }) {
  return (
    <Card className="player-card text-white" style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <img src="playa.webp" alt="Player" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
      </div>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h5 style={{ textAlign: 'center', color: '#fff' }}>{player.first_name}</h5>
            <h5 style={{ textAlign: 'center', color: '#fff' }}>{player.last_name}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p style={{ textAlign: 'center', color: '#ddd', fontSize: '1rem', marginBottom: '5px' }}>{player.position}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PlayerCard;
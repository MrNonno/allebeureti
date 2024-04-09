import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TeamStats({ teamData }) {
  const { name, players } = teamData;
  return (
    <Col md={6}>
      <div className="team">
        <h2 className="team-name">{name}</h2>
        <h3 className="team-players-title">Players:</h3>
        <ul className="team-players-list">
          {players.map((player, index) => (
            <li key={index} className="team-player">{player}</li>
          ))}
        </ul>
      </div>
    </Col>
  );
}

export default TeamStats;
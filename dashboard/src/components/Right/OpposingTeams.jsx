import React from 'react';
import { Row, Col } from 'react-bootstrap';

function OpposingTeams({ team1, team2, homeTeamScore, visitorTeamScore }) {
  return (
    <Row className="justify-content-center align-items-center mb-4 game">
      <Col xs={12} className="text-center mb-4">
        <h1 className="game-name">{team1.full_name} vs {team2.full_name}</h1>
      </Col>
      <Col md={6}>
        <Row>
          <Col xs={6} className="text-center">
            <img src="/husk.png" alt={team1.full_name} className="team-logo" />
            <h2 className="team-name">{team1.full_name}</h2>
            <p className="team-points">Points: {team1.points}</p>
            <p className="team-score">Score: {homeTeamScore}</p>
          </Col>
          <Col xs={6} className="text-center">
            <img src="/husk.png" alt={team2.full_name} className="team-logo" />
            <h2 className="team-name">{team2.full_name}</h2>
            <p className="team-points">Points: {team2.points}</p>
            <p className="team-score">Score: {visitorTeamScore}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default OpposingTeams;
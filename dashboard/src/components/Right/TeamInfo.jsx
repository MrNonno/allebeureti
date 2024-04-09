import React from 'react';
import { Row, Col } from 'react-bootstrap';
// Import the CSS file for custom styling if needed

function TeamInfo({ team }) {
  return (
    <Row className="team-info justify-content-center">
      <Col xs={12} className="text-center mb-4">
        <h2 className="team-name">{team.full_name}</h2>
      </Col>
      <Col md={6}>
        <Row className="justify-content-center">
          <Col xs={6} className="text-center">
            <p className="team-city">City: {team.city}</p>
            <p className="team-division">Division: {team.division}</p>
          </Col>
          <Col xs={6} className="text-center">
            <p className="team-conference">Conference: {team.conference}</p>
            <p className="team-abbreviation">Abbreviation: {team.abbreviation}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TeamInfo;
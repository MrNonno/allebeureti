import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DisplayStats from './DisplayStats';

function TeamInfo({ team }) {
  const [teamStatistics, setTeamStatistics] = useState(null);

  return (
    <Row className="team-info justify-content-center">
      <Col xs={12} className="text-center mb-4">
        <h2 className="team-name">{team.full_name}</h2>
        <h5 className="team-abbreviation">{team.abbreviation}</h5>
      </Col>
      <Col md={6}>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <p className="team-details mb-0">
              {team.city} &bull; {team.division} &bull; {team.conference}
            </p>
          </Col>
        </Row>
      </Col>
      <Col xs={12} className="text-center mt-4">
        <h3 className="team-stats">Team Statistics</h3>
        <DisplayStats teamId={team.id} setTeamStatistics={setTeamStatistics} />
      </Col>
    </Row>
  );
}

export default TeamInfo;
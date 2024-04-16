import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DisplayStats from './DisplayStats'; // Import the DisplayStats component

function TeamInfo({ team }) {
  const [teamStatistics, setTeamStatistics] = useState(null);

  useEffect(() => {
    // Fetch team statistics when component mounts
    fetch(`/api/teams/${team.id}/statistics`)
      .then(response => response.json())
      .then(data => {
        console.log('Team Statistics:', data); // Log team statistics to console
        setTeamStatistics(data);
      })
      .catch(error => console.error('Error fetching team statistics:', error));
  }, [team.id]);

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
        {teamStatistics ? (
          <div>
            <p>Win Rate: {teamStatistics.winRate}</p>
            <p>Total Games Played: {teamStatistics.totalGamesPlayed}</p>
            {/* Include the DisplayStats component here */}
            <DisplayStats teamId={team.id} />
          </div>
        ) : (
          <p>Loading team statistics...</p>
        )}
      </Col>
    </Row>
  );
}

export default TeamInfo;
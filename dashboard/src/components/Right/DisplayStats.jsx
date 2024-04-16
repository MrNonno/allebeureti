import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './DisplayStats.css'; // Import CSS file for additional styling

const DisplayStats = ({ teamId, setTeamStatistics }) => {
  const [teamStats, setTeamStats] = useState(null);

  useEffect(() => {
    // Fetch team statistics from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/teams/${teamId}/statistics`);
        if (!response.ok) {
          throw new Error('Failed to fetch team statistics');
        }
        const data = await response.json();
        console.log('Team Statistics Data:', data);
        setTeamStats(data);
        setTeamStatistics(data);
      } catch (error) {
        console.error('Error fetching team statistics:', error);
      }
    };
    
    fetchData();
  }, [teamId, setTeamStatistics]);

  return (
    <div className="team-stats-container">
      <h2 className="team-stats-title">Team Statistics</h2>
      {teamStats ? (
        <Container>
          <Row>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Win Rate:</span>
                <span className="stat-value">{teamStats.winRate}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Average Win Rate:</span>
                <span className="stat-value">{teamStats.averageWinRate}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Total Games Played:</span>
                <span className="stat-value">{teamStats.totalGamesPlayed}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Field Goal Percentage:</span>
                <span className="stat-value">{teamStats.fieldGoalPercentage}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Three-Point Percentage:</span>
                <span className="stat-value">{teamStats.threePointPercentage}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Free Throw Percentage:</span>
                <span className="stat-value">{teamStats.freeThrowPercentage}</span>
              </div>
            </Col>
          </Row>
          <Row>
          <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Rebounds:</span>
                <span className="stat-value">{teamStats.averageRebounds}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Average Assists:</span>
                <span className="stat-value">{teamStats.averageAssists}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Average Steals:</span>
                <span className="stat-value">{teamStats.averageSteals}</span>
              </div>
            </Col>
          </Row>
          <Row>
          <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Average Blocks:</span>
                <span className="stat-value">{teamStats.averageBlocks}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Average Turnovers:</span>
                <span className="stat-value">{teamStats.averageTurnovers}</span>
              </div>
            </Col>
            <Col md={4}>
              <div className="statistic">
                <span className="stat-label">Average Personal Fouls:</span>
                <span className="stat-value">{teamStats.averagePersonalFouls}</span>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <p>Loading team statistics...</p>
      )}
    </div>
  );
}

export default DisplayStats;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OpposingTeams from './OpposingTeams';
import Team from './Team';

function GameInfo({ gameId }) {
  const [players, setPlayers] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/games/${gameId}`)
      .then(response => response.json())
      .then(data => {
        setGameData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching game data:', error));
    
    fetch(`http://localhost:3000/api/games/${gameId}/players`)
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
      })
      .catch(error => console.error('Error fetching players:', error));
  }, [gameId]);

  if (loading || !gameData) {
    return <h1>Loading...</h1>;
  }

  const homeTeamPlayers = players.filter(player => player.team.abbreviation === gameData.home_team.abbreviation);
  const visitorTeamPlayers = players.filter(player => player.team.abbreviation === gameData.visitor_team.abbreviation);

  return (
    <>
      <Container className="boxy">
        <OpposingTeams
          team1={gameData.home_team}
          team2={gameData.visitor_team}
          homeTeamScore={gameData.home_team_score}
          visitorTeamScore={gameData.visitor_team_score}
        />
      </Container>

      <Container className="boxy">
        <Row>
          <Col xs={6}>
            <Team team={gameData.home_team} players={homeTeamPlayers} />
          </Col>
          <Col xs={6}>
            <Team team={gameData.visitor_team} players={visitorTeamPlayers} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GameInfo;
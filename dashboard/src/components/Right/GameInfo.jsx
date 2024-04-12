import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OpposingTeams from './OpposingTeams';
import TeamInfo from './TeamInfo'; // Import the TeamInfo component

function GameInfo() {
  const [players, setPlayers] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch game data from the server when the component mounts
    fetch('http://localhost:3000/api/games/2') // Change '1' to the actual gameId
      .then(response => response.json())
      .then(data => {
        setGameData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching game data:', error));
    
    // Fetch player data from the server when the component mounts
    fetch('http://localhost:3000/api/games/2/players') // Change '1' to the actual gameId
      .then(response => response.json())
      .then(data => {
        setPlayers(data);
      })
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  if (loading || !gameData) {
    return <h1>Loading...</h1>; // Display a loading message while data is being fetched
  }

  return (
    <>
      <Container className="boxy">
        {/* Display opposing teams */}
        <OpposingTeams
          team1={gameData.home_team}
          team2={gameData.visitor_team}
          homeTeamScore={gameData.home_team_score}
          visitorTeamScore={gameData.visitor_team_score}
        />
      </Container>

      {/* Display player data */}
      <Container className="boxy">
        <Row>
          <Col>
            <TeamInfo team={gameData.home_team} />
            {/* Map through players and display their information */}
            {players.map(player => (
              <div key={player.id}>
                {player.first_name} {player.last_name} - {player.position}
              </div>
            ))}
          </Col>
          <Col>
            <TeamInfo team={gameData.visitor_team} />
            {/* Map through players and display their information */}
            {players.map(player => (
              <div key={player.id}>
                {player.first_name} {player.last_name} - {player.position}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GameInfo;
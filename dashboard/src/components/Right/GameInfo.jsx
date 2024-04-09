import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OpposingTeams from './OpposingTeams';
import TeamInfo from './TeamInfo'; // Import the TeamInfo component

function GameInfo() {
  // Mock data for the game
  const gameData = {
    id: 1,
    date: "2023-10-24",
    season: 2023,
    status: "Final",
    period: 4,
    time: "Final",
    postseason: false,
    home_team_score: 119,
    visitor_team_score: 107,
    home_team: {
      id: 8,
      conference: "West",
      division: "Northwest",
      city: "Denver",
      name: "Nuggets",
      full_name: "Denver Nuggets",
      abbreviation: "DEN"
    },
    visitor_team: {
      id: 14,
      conference: "West",
      division: "Pacific",
      city: "Los Angeles",
      name: "Lakers",
      full_name: "Los Angeles Lakers",
      abbreviation: "LAL"
    }
  };

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
          <Col>
            <TeamInfo team={gameData.home_team} />
          </Col>
          <Col>
            <TeamInfo team={gameData.visitor_team} />
          </Col>
        </Row>  
      </Container>
    </>
  );
}

export default GameInfo;
import React from 'react';

function GameSelected() {
  const gameData = {
    gameName: "Game X",
    team1: {
      name: "Pogballers",
      logo: "husk.png",
      points: 85,
      players: ["Player1", "Player2", "Player3"]
    },
    team2: {
      name: "Lakers",
      logo: "husk.png",
      points: 92,
      players: ["PlayerA", "PlayerB", "PlayerC"]
    }
  };

  return (
    <div className="container display game-selected">
      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-12 text-center mb-4"> 
          <h1 className="game-name">{gameData.gameName}</h1>
        </div>

        <div className="col-md-6">
          <div className="row">
            <div className="col-6 text-center team-card">
              <img src={gameData.team1.logo} alt={gameData.team1.name} className="team-logo" />
              <h2 className="team-name">{gameData.team1.name}</h2>
              <p className="team-points">Points: {gameData.team1.points}</p>
            </div>
            <div className="col-6 text-center team-card">
              <img src={gameData.team2.logo} alt={gameData.team2.name} className="team-logo" />
              <h2 className="team-name">{gameData.team2.name}</h2>
              <p className="team-points">Points: {gameData.team2.points}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="team">
            <h2 className="team-name">{gameData.team1.name}</h2>
            <h3 className="team-players-title">Players:</h3>
            <ul className="team-players-list">
              {gameData.team1.players.map((player, index) => (
                <li key={index} className="team-player">{player}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="team">
            <h2 className="team-name">{gameData.team2.name}</h2>
            <h3 className="team-players-title">Players:</h3>
            <ul className="team-players-list">
              {gameData.team2.players.map((player, index) => (
                <li key={index} className="team-player">{player}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSelected;
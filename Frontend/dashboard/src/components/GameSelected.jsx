import React from 'react';
import './GameSelected.css'; // Importing custom CSS file

function GameSelected() {
  // Sample data
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
    <div className="container display">
      
      <div className="row justify-content-center align-items-center mb-4 bg-decorated"> {/* Applying custom background */}
        {/* Page Title */}
        <div className="col-12 text-center mb-4"> 
          <h1>{gameData.gameName}</h1>
        </div>

        
        <div className="col-md-6">
          <div className="row">
            <div className="col-6">
              <img src={gameData.team1.logo} alt={gameData.team1.name} className="img-fluid rounded-circle" />
              <h2>{gameData.team1.name}</h2>
              <p className="mb-0">Points: {gameData.team1.points}</p>
            </div>
            <div className="col-6">
              <img src={gameData.team2.logo} alt={gameData.team2.name} className="img-fluid rounded-circle" />
              <h2>{gameData.team2.name}</h2>
              <p className="mb-0">Points: {gameData.team2.points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Info Section */}
      <div className="row justify-content-center mb-4"> {/* Centering the team info */}
        <div className="col-md-6">
          <div className="team">
            <h2>{gameData.team1.name}</h2>
            <h3>Players:</h3>
            <ul className="mb-0">
              {gameData.team1.players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="team">
            <h2>{gameData.team2.name}</h2>
            <h3>Players:</h3>
            <ul className="mb-0">
              {gameData.team2.players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSelected;
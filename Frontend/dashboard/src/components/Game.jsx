import React from 'react';

function Game({ team1Name, team1Icon, team2Name, team2Icon }) {
  return (
    <div className="game-card">
      <div className="team">
        <img src={team1Icon} alt={team1Name} />
        <h3>{team1Name}</h3>
      </div>
      <div className="vs">vs</div>
      <div className="team">
        <img src={team2Icon} alt={team2Name} />
        <h3>{team2Name}</h3>
      </div>
    </div>
  );
}

export default Game;
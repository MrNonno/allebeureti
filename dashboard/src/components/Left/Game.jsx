import React from 'react';

function Game({ gameId, team1Name, team1Icon, team2Name, team2Icon, onSelectGame }) {
  const handleClick = () => {
    onSelectGame(gameId);
  };

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="team-card">
        <img src={team1Icon} alt={team1Name} />
        <h4>{team1Name}</h4>
      </div>
      <div className="vs">vs</div>
      <div className="team-card">
        <img src={team2Icon} alt={team2Name} />
        <h4>{team2Name}</h4>
      </div>
    </div>
  );
}

export default Game;
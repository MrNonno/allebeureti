import React from 'react';
import Game from './Game';

function Games() {
  return (
    <div className="games-list">
      <Game
        team1Name="Pogballers"
        team1Icon="/husk.png"
        team2Name="Lakers"
        team2Icon="/husk.png"
      />
    </div>
  );
}

export default Games;

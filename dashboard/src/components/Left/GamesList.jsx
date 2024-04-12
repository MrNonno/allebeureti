import React from 'react';
import Game from './Game';

function GamesList() {
  return (
    <div className="games-list-container">
      <div className="games-list">
        <Game team1Name="Pogballers" team1Icon="/Logo_Basket.png" team2Name="Lakers" team2Icon="/husk.png" />
        <Game team1Name="Pogballers" team1Icon="/husk.png" team2Name="Lakers" team2Icon="/husk.png" />
        <Game team1Name="Pogballers" team1Icon="/husk.png" team2Name="Lakers" team2Icon="/husk.png" />
        <Game team1Name="Pogballers" team1Icon="/husk.png" team2Name="Lakers" team2Icon="/husk.png" />
        <Game team1Name="Pogballers" team1Icon="/husk.png" team2Name="Lakers" team2Icon="/husk.png" />
        <Game team1Name="Pogballers" team1Icon="/husk.png" team2Name="Lakers" team2Icon="/husk.png" />
        <Game team1Name="Pogballers" team1Icon="/husk.png" team2Name="Lakers" team2Icon="/husk.png" />
      </div>
    </div>
  );
}

export default GamesList;
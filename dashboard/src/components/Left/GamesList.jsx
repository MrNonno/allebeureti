import React, { useState, useEffect } from 'react';
import Game from './Game';

function GamesList({ onSelectGame }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch games when the component mounts
    fetch('http://localhost:3000/api/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  const handleGameSelect = (gameId) => {
    onSelectGame(gameId);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="games-list-container">
      <div className="games-list">
        {games.map(game => (
          <Game
            key={game.id}
            gameId={game.id}
            team1Name={game.home_team.full_name}
            team1Icon={`/teams/${game.home_team.name.toLowerCase()}.png`}
            team2Name={game.visitor_team.full_name}
            team2Icon={`/teams/${game.visitor_team.name.toLowerCase()}.png`}
            onSelectGame={handleGameSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default GamesList;
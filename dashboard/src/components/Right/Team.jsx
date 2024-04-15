import React, { useRef } from 'react';
import TeamInfo from './TeamInfo';
import PlayerCard from './PlayerCard';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; // Import icons

function Team({ team, players }) {
  const teamRef = useRef(null);

  const scrollLeft = () => {
    if (teamRef.current) {
      teamRef.current.scrollLeft -= 100; // Adjust scroll speed as needed
    }
  };

  const scrollRight = () => {
    if (teamRef.current) {
      teamRef.current.scrollLeft += 100; // Adjust scroll speed as needed
    }
  };

  return (
    <div className="team-container">
      <TeamInfo team={team} />
      <div className="arrows-container">
        <div className="scroll-arrows">
          <button className="scroll-button left" onClick={scrollLeft}><BsChevronLeft /></button>
          <button className="scroll-button right" onClick={scrollRight}><BsChevronRight /></button>
        </div>
        <div className="team-player-cards-container" ref={teamRef}>
          {players.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
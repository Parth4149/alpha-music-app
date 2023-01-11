import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container" > 
      <img src={currentSong.cover} alt={currentSong.name} />
      <h3>{currentSong.name}</h3>
      <p>{currentSong.artist}</p>
    </div>
  );
};

export default Song;

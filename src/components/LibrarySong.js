import React from "react";


const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying }) => {
  const songSelectHandler = async () => {
    // const selectedSong = songs.filter((stat) => stat.id === song.id); // id = song.id
    // setCurrentSong(selectedSong[0]); // filter returns an array

    await setCurrentSong(song); 

    // check if the song is playing
    if (isPlaying) audioRef.current.play();

    // Add active state
    songs.forEach((song) => {
      song.active = false;
    });
    song.active = true;
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h4>{song.name}</h4>
        <p>{song.artist}</p>
      </div>
    </div>
  );
};

export default LibrarySong;

import React, { useState, useRef, useEffect } from "react";
// Import styles
import "./styles/app.scss";
// Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Input data
import data from "./data";

function App() {
  // Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
    // calculate percentage & update css variable
    // document.documentElement.style.setProperty(`--track-percentage`,`${(currentTime * 100) / duration }%` );
  };

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    currentSong.active = false; // remove highlight active
    if (currentIndex === songs.length - 1) {
      // forward
      currentIndex = -1;
    }
    songs[currentIndex + 1].active = true; // highlight active
    try {
      setCurrentSong(songs[currentIndex + 1]);
    } catch(err) {
      console.log(err);
    }

    // check if the song is playing
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        // skipTrackHandler={skipTrackHandler}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
    //? onloadedmetadata event occurs when meta data for a media has been loaded.
    // Meta data for an audio or video consists of: Duration, Dimensions (video), Tracks
  );
}

export default App;

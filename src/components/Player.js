import React,{useEffect} from "react";

import { ReactComponent as PlayIcon } from "../img/Play.svg";
import { ReactComponent as PauseIcon } from "../img/Pause.svg";
import { ReactComponent as Left } from "../img/LeftArrow.svg";
import { ReactComponent as Right } from "../img/RightArrow.svg";

const Player = ({
  audioRef,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  libraryStatus,
  setLibraryStatus,
}) => {

// eslint-disable-next-line react-hooks/exhaustive-deps
const handleKeyDown = (e) => {
  console.log(e.key);
  if (e.ctrlKey && e.key==='b') {
    setLibraryStatus(!libraryStatus);
  }
  if (!handleKeyboard[e.key]) {
    return;
  }
  handleKeyboard[e.key]();
};
const handleKeyboard = {
  " ": () => playSongHandler(),
  ArrowLeft: () => skipTrackHandler("skip-back"),
  ArrowRight: () => skipTrackHandler("skip-forward"),
  m: () => {
    if (audioRef.current.muted) {
      audioRef.current.muted = false;
    } else {
      audioRef.current.muted = true;
    }
  },
  ArrowDown: () => {
    if (audioRef.current['volume'] > 0.1) {
      audioRef.current['volume'] -= 0.1;
    }
    console.log(audioRef.current['volume']);
  },
  ArrowUp: () =>{
    if (audioRef.current['volume'] < 1) {
      audioRef.current['volume'] += 0.1;
      console.log(audioRef.current['volume']);
    }
  },
};






  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);








  const playSongHandler = () => {
    // isPlaying ? audioRef.current.pause() : audioRef.current.play();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying); // toggles play
  };

  //Event Handlers
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    // console.log(e.target.value);
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    currentSong.active = false; // remove highlight active
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        currentIndex = songs.length;
      }
      songs[currentIndex - 1].active = true; // highlight active
      await setCurrentSong(songs[currentIndex - 1]);
    } else if (direction === "skip-forward") {
      if (currentIndex === songs.length - 1) {
        currentIndex = -1;
      }
      songs[currentIndex + 1].active = true; // highlight active
      await setCurrentSong(songs[currentIndex + 1]);
    }

    // check if the song is playing
    if (isPlaying) audioRef.current.play();
  };

  // Add the styles
  const trackUpdate = {
    transform: `translateX(${
      (songInfo.currentTime * 100) / songInfo.duration
    }%)`,
  };
  const linearGradient = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        {/* <p>{songInfo.currentTime}</p> */}
        <p> {getTime(songInfo.currentTime)} </p>
        <div className="track" style={linearGradient}>
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
            name="range"
            id="range"
          />
          <div className="animate-track" style={trackUpdate}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <span
          className="skip-back"
          onClick={() => skipTrackHandler("skip-back")}
        >
          <Left />
        </span>
        <span className="play" onClick={playSongHandler}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
        <span
          className="skip-forward"
          onClick={() => skipTrackHandler("skip-forward")}
        >
          <Right />
        </span>
      </div>
    </div>
  );
};

export default Player;

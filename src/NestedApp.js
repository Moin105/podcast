import React, { useState, useEffect, useContext, useRef } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import Player from "./screens/Player";
import { useSelector,useDispatch } from "react-redux";
import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
import Players from "./screens/Players";
import {addSong} from './features/playingEpisode'

const NestedApp = () => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const { currentSong, darkMode } = useContext(ThemeContext);
  // const   
  const  episodesss = useSelector((state) => state.seriesEpisodes);

  const [lastSong, setLastSong] = useState(episodesss.currentEpisode);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
 const dispatch = useDispatch()
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    console.log(audioRef.current.currentTime)
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    console.log(audioRef.current.currentTime)
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  useEffect(() => {
    console.log("wwwwwwwwwwwwwwww")
    if (darkMode) {
      document.body.style.backgroundColor = "#161616";
    } else {
      document.body.style.backgroundColor = "#fff";
    }

    // Clean up the style when the component unmounts
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  }, [darkMode]);
   const playingSong = useSelector((state) => state.seriesEpisodes.currentEpisode);
//   useEffect(() => {
//     if (lastSong) {
//       // Push the last song into the array in redux store if it hasn't ended
//       dispatch(addSong(playingSong));
//     }
    
//     // Update the last song
//     setLastSong(playingSong);
// console.log("wwwwwwwwwwwwwwwwwwwwwwww222",episodesss.playedSongs)
//   }, [playingSong, dispatch, lastSong]);
//    console.log("wwwwwwwwwwwwwwwwwwwwwwww222",playingSong)
  return (
    <div className="bodylight">
      <audio
        ref={audioRef}
        src={playingSong?.song}
        id="myAudio"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={() => {
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
          setLastSong(null);  
        }}
        // controls
      />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                audioRef={audioRef}
                handleTimeUpdate={handleTimeUpdate}
                handleLoadedData={handleLoadedData}
                handleSeek={handleSeek}
                togglePlay={togglePlay}
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                skipForward={skipForward}
                skipBackward={skipBackward}
                volume={volume}
                setVolume={setVolume}
                speed={speed}
                setSpeed={setSpeed}
              />
            }
          />
          {/* Other routes */}
          <Route
            path="/Player/:id"
            element={
              <Player
                audioRef={audioRef}
                handleTimeUpdate={handleTimeUpdate}
                handleLoadedData={handleLoadedData}
                handleSeek={handleSeek}
                togglePlay={togglePlay}
                currentTime={currentTime}
                setIsPlaying={setIsPlaying}
                duration={duration}
                isPlaying={isPlaying}
                skipForward={skipForward}
                skipBackward={skipBackward}
                volume={volume}
                setVolume={setVolume}
                speed={speed}
                setSpeed={setSpeed}
              />
            }
          />
             <Route
            path="/Players/:id"
            element={
              <Players
                audioRef={audioRef}
                handleTimeUpdate={handleTimeUpdate}
                handleLoadedData={handleLoadedData}
                handleSeek={handleSeek}
                togglePlay={togglePlay}
                currentTime={currentTime}
                setIsPlaying={setIsPlaying}
                duration={duration}
                isPlaying={isPlaying}
                skipForward={skipForward}
                skipBackward={skipBackward}
                volume={volume}
                setVolume={setVolume}
                speed={speed}
                setSpeed={setSpeed}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default NestedApp;

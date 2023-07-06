import React, { createContext, useState } from "react";
import Matafaka from "../matafaka.mp3";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    song: Matafaka,
    index: 0,
  });
  const [carousels, setCarousels] = useState([]);
  const [series, setSeries] = useState([]);
  const [completeCarousels, setCompleteCarousels] = useState([]);
  const [filteredCarousels, setFilteredCarousels] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedSeriesData, setSelectedSeriesData] = useState({});
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        showPlayer,
        setShowPlayer,
        currentSong,
        setCurrentSong,
        carousels,
        setCarousels,
        series,
        setSeries,
        completeCarousels,
        setCompleteCarousels,
        selectedSeries,
        setSelectedSeries,
        selectedEpisodeIndex,
        setSelectedEpisodeIndex,
        selectedSeriesData,
        setSelectedSeriesData,
        filteredCarousels,
        setFilteredCarousels,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

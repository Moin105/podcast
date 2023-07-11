import React, { createContext, useState ,useContext,useEffect} from "react";
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
  const [theme, setTheme] = useState('light');

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   if (mediaQuery.matches) setTheme('dark');

  //   const handler = () => setTheme(mediaQuery.matches ? 'dark' : 'light');
  //   mediaQuery.addEventListener('change', handler);
  //   return () => mediaQuery.removeEventListener('change', handler);
  // }, []);
  useEffect(() => {
    // This condition will return true if the system is in dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
      setDarkMode(true)
      console.log("wwwwwwwwwwwwwwwwwwww",theme)
    }
  }, []);
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
        theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
export const useTheme = () => useContext(ThemeContext);

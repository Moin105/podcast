import React, { useContext, useEffect, useRef, useState } from "react";
import Draggable from "../components/Draggable";
import axios from "axios";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import { useMediaQuery } from "react-responsive";
import ListRenderOne from "./ListRenderOne";
import hoverImg from "../images/hoverImg.png";
import ListRenderTwo from "./ListRenderTwo";
import { useSelector } from "react-redux";
import { useTheme } from "../components/ThemeContext";
import './card.css'

function Card({ audioRef, setVolume, list, volume, setIsPlaying,item }) {
  const { categories, episodes, series, tags,id } = item;
    // console.log("wfewewwefewfebitches",item);
  ////console.log("datta",item.categories);
  const idArray = categories ? categories.map(category => ({ id: category.id })) : [];
  ////console.log("juni",idArray);
  //   ////console.log(series);
  //   ////console.log(tags);
  const [episode, setEpisodes] = useState(null);
  const [category, setCategory] = useState(null);
  const [serie, setSerie] = useState(null);
  const [tag, setTag] = useState(null);
  const [tagEpisode,setTagEpisode]=useState(null);
  const [categorySeries,setCategorySeries]=useState(null);
  const navigate = useNavigate();
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const {
    darkMode,
    setDarkMode,
    showPlayer,
    setShowPlayer,
    currentSong,
    setCurrentSong,
    selectedSeries,
    setSelectedSeries,
    selectedEpisodeIndex,
    setSelectedEpisodeIndex,
    selectedSeriesData,
    setSelectedSeriesData,
  } = useContext(ThemeContext);
  const theme = useTheme()
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const customWidth = isTabletOrMobile ? 215 : 248;
  const customHeight = isTabletOrMobile ? 135 : 160;
   const customHeightThird = isTabletOrMobile ? 100 : 125;
  const customWidthThird = isTabletOrMobile ? 190 : 220;
  useEffect(() => {
    setEpisodes(episodes);
    setCategory(categories);
    setSerie(series);
    setTag(tags);
    if (episode && episode.length > 0) {
      ////console.log("THE LIST ========epsiode==", episode);
    }
    else if (category && category.length > 0) {
      ////console.log("THE LIST ========wakawaka==", category);
    } else if (serie && serie.length > 0) {
      ////console.log("THE LIST ========wakawaka==", serie);
    } else if (tag && tag.length > 0) {
      ////console.log("THE LIST ========wakawaka==", tag);
    }
  }, []);
  const postData = async () => {
      let data = {
          tags: item.carousel.tags,
          carousel_id: item.id
      };
      try {
        if(item.carousel.tags == "" ){
        }else{
          const response = await axios.post('https://podcasts.cucurico.co.il/podcast/public/api/episodetag', data);
          if( response.data.data !== null){
            // console.log("response.data.data",response.data.data)
              setTagEpisode([ response.data.data]);
          } else if(response.data.data.length == [] || response.data.data == null){
          } else {
          }}
      } catch (error) {
          // Handle the error
          console.error('Error posting data', error);
      }
  }
  const postSeries = async (id) => {
    // Define the data body
    let data = {
        categories: id,
    };
    try {
        // Make the POST request
        const response = await axios.post('https://podcasts.cucurico.co.il/podcast/public/api/categoryseries', data);
        return response.data.data
    } catch (error) {
        // Handle the error
        console.error('Error posting data', error);
    }
}
const searchings = useSelector((state) => state);
const unfinishedSongs = useSelector((state) => state.seriesEpisodes.playedSongs);
const fetchResponses = async () => {
    const responses = await Promise.all(idArray.map(id => postSeries(id.id)));
  const flattenedResponses = responses.flat();
  // console.log("flattenedResponses",flattenedResponses)
    setCategorySeries(flattenedResponses);
}
useEffect(() => {
      postData();
      fetchResponses();
}, [tags])
const filteredSerie = serie?.filter(ser => ser.status=='published');
const filteredEpisode = episode?.filter(ep => ep.status == 'published');
const filteredEpisodes = filteredEpisode?.filter(ep => ep.name?.toLowerCase().includes(searchings.search.search.toLowerCase()));
const filteredSeries = filteredSerie?.filter(ser => ser.name?.toLowerCase().includes(searchings.search.search.toLowerCase()));
const filteredTagEpisodes = tagEpisode?.filter(ep => ep.name?.toLowerCase().includes(searchings.search.search.toLowerCase()));
const filteredUnfinishedEpisodes = unfinishedSongs?.filter(ep => ep.name?.toLowerCase().includes(searchings.search.search.toLowerCase()));
const filteredCategorySeries = categorySeries?.filter(ser => ser.series.name?.toLowerCase().includes(searchings.search.search.toLowerCase()));
// useEffect(() => {
//   console.log("aasing episode",item.carousel.sorting,filteredEpisodes)
//    console.log("aasing series",item.carousel.sorting,filteredSeries)
//    console.log("aasing filtered",item.carousel.sorting,filteredTagEpisodes)
//    console.log("aasing categories",categorySeries)
//   }, [])
  function sortByCreatedAt(array, sortOrder) {
    if (sortOrder === "old_to_new") {
        return array?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    } else if (sortOrder === "new_to_old") {
        return array?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }else if(sortOrder === 'random'){
        return array
    } else {
        throw new Error(`Invalid sort order: ${sortOrder}`);
    }
}
function sortByCreatedAtSeries(array, sortOrder) {
  if (sortOrder === "old_to_new") {
      return array?.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
  } else if (sortOrder === "new_to_old") {
      return array?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }else if(sortOrder === 'random'){
      return array
  } else {
      throw new Error(`Invalid sort order: ${sortOrder}`);
  }
}
const episodeSort = sortByCreatedAt(filteredEpisodes, item.carousel.sorting);
const seriesSort = sortByCreatedAtSeries(filteredSeries, item.carousel.sorting);
const tagSort = sortByCreatedAt(filteredTagEpisodes, item.carousel.sorting);
const categorySort = sortByCreatedAtSeries(filteredCategorySeries, item.carousel.sorting);
  return (
    <>
      {episodeSort && episodeSort.length > 0
          ? episodeSort.map((epos, index) => {
        // //console.log("epos",epos);
              return (
                <>
                <div 
                className={index === 0 ? "draggableFirst" : "draggableRest"}
                >
                 <Draggable>
                <ListRenderOne
                        item={epos}
                        index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={epos?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                 </Draggable>
                 </div>
                </>
              );
            })
          : ""}
              {seriesSort && seriesSort.length > 0
          ? seriesSort.map((serie, index) => {
              return (
                <>
                 <div 
                className={index === 0 ? "draggableFirst" : "draggableRest"}
                >
                <Draggable>
                   <ListRenderTwo
                     item={serie}
                     index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={episode}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                </Draggable>
                </div>
                </>
              );
            })
          : ""}
             {tagSort && tagSort.length > 0
          ? tagSort?.map((epos, index) => {
            return (
                <>
                <div 
                className={index === 0 ? "draggableFirst" : "draggableRest"}
                >
                <Draggable>
                <ListRenderOne
                        item={epos}
                        index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={item?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                </Draggable>
                </div>
                </>
              );
            })
          : ""}
            {categorySort && categorySort.length > 0
          ? categorySort.map((series, index) => {
                    return (
                        <>
                    <div 
                className={index === 0 ? "draggableFirst" : "draggableRest"}
                >
                        <Draggable>
                              <ListRenderTwo
                     item={series.series}
                     index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={item?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                        </Draggable>
                        </div>
                        </>
                        
              );
            })
          : ""}
          {item.carousel.name == "Continue Listening" && filteredUnfinishedEpisodes && filteredUnfinishedEpisodes.length > 0 ?
           filteredUnfinishedEpisodes.map((epos, index) => {
                  return (
                    <>
                   <div 
                className={index === 0 ? "draggableFirst" : "draggableRest"}
                >
                     <Draggable>
                    <ListRenderOne
                            item={epos}
                            index={index}
                            audioRef={audioRef}
                            setVolume={setVolume}
                            list={epos?.subData}
                            volume={volume}
                            setIsPlaying={setIsPlaying}
                          />
                     </Draggable>
                     </div>
                    </>
                  );
                }):<p 
                className="cardPara">  {item.carousel.name == "Continue Listening"&&"No Songs Played Yet"} </p>
          }
    </>
  );
}
export default Card;
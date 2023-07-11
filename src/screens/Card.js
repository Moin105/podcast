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
function Card({ audioRef, setVolume, list, volume, setIsPlaying,item }) {
  const { categories, episodes, series, tags,id } = item;

    // console.log("wfewewwefewfebitches",item);
  ////console.log("datta",item.categories);
  const idArray = categories.map(category => ({ id: category.id }));
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
      // Define the data body
      
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
// let uniqueArray = [];
// if (unfinishedSongs && unfinishedSongs.length) {
//    uniqueArray = unfinishedSongs.filter((obj, index, self) =>
//     index === self.findIndex((t) => (
//       t.id === obj.id && t.name === obj.name
//     ))
//   );

//   console.log("werwerwer",uniqueArray); // Output: [{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }]
// }
// useEffect(() => {
//   console.log("werwerwer",uniqueArray)
// }, [unfinishedSongs])

const fetchResponses = async () => {
    const responses = await Promise.all(idArray.map(id => postSeries(id.id)));
    setCategorySeries(responses);
}
useEffect(() => {
      postData();   
      fetchResponses();
      // console.log("werwerwer",uniqueArray);
}, [tags])
const filteredSerie = serie?.filter(ser => ser.status=='published');
const filteredEpisode = episode?.filter(ep => ep.status=='published');

const filteredEpisodes = filteredEpisode?.filter(ep => ep.name.includes(searchings.search.search));
const filteredSeries = filteredSerie?.filter(ser => ser.name.includes(searchings.search.search));
const filteredTagEpisodes = tagEpisode?.filter(ep => ep.name.includes(searchings.search.search));
const filteredUnfinishedEpisodes = unfinishedSongs?.filter(ep => ep.name.includes(searchings.search.search));
const filteredCategorySeries = categorySeries?.map(series => series?.filter(ser => ser.name.includes(searchings.search.search)));
useEffect(() => {
  // console.log("filteredEpisodes",filteredEpisodes,filteredSeries,tagEpisode,filteredCategorySeries)
  //console.log("miseeeeee",filteredSeries)
}, [searchings.search.search])

  return (
    <>
      {/* <Draggable> */}
      {filteredEpisodes && filteredEpisodes.length > 0
          ? filteredEpisodes.map((epos, index) => {
        // //console.log("epos",epos);
              return (
                <>
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
                </>

              );
            })
          : ""}
        {/* {episode && episode.length > 0
          ? episode.map((epos, index) => {
        // //console.log("epos",epos);
              return (
                <>
                <ListRenderOne
                        item={epos}
                        index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={epos?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                </>

              );
            })
          : ""} */}
              {filteredSeries && filteredSeries.length > 0
          ? filteredSeries.map((serie, index) => {
              return (
                <>
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
                </>
              
              );
            })
          : ""}
             {filteredTagEpisodes && filteredTagEpisodes.length > 0
          ? filteredTagEpisodes?.map((epos, index) => {
            return (
                <>
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
                </>
           
              );
            })
          : ""}
            {filteredCategorySeries && filteredCategorySeries.length > 0
          ? filteredCategorySeries.map((series, index) => {
          return  series?.map((serie,index)=>{
                    return (
                      
                        <>
                        <Draggable>
                              <ListRenderTwo
                     item={serie}
                     index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={item?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                        </Draggable>
                        </>
    
              );
            })
        
            })
          : ""}
          {item.carousel.name == "Continue Listening" && filteredUnfinishedEpisodes && filteredUnfinishedEpisodes.length>0 ? 
           filteredUnfinishedEpisodes.map((epos, index) => {
            // //console.log("epos",epos);
                  return (
                    <>
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
                    </>
    
                  );
                }):<p style={{margin:"0 auto",padding:"50px 0px"}}>  {item.carousel.name == "Continue Listening"&&"No Songs Played Yet"} </p>

          }
      {/* </Draggable> */}
   
    </>
  );
}

export default Card;

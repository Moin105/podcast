import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.css";
import { ThemeContext } from "../components/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import hoverImg from "../images/hoverImg.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Draggable from "../components/Draggable";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import {setPlayingEpisodeData,setSeriesEpisodes} from '../features/playingEpisode'

const ListRenderTwo = ({ audioRef, setVolume,index, list,item, volume, setIsPlaying }) => {
  //console.log("LIST IN 2 ===============", list);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();
const handleRouteChange = (url,datas) => {
  navigate(url, { state: { data: datas } });
};
  const width = window.innerWidth;
  const height = window.innerHeight;
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  }
  
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  }; 
   const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const customDivMargin = isTabletOrMobile ? 15 : 50;
  const customHeightThird = isTabletOrMobile ? 100 : 125;
  const customWidthThird = isTabletOrMobile ? 190 : 220;
 
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

  return (
    <>
      {item ? (
        <Draggable>
          {/* {list?.map((item, index) => {
            return ( */}
              <>
                <div
                  key={index}
                  style={{
                    width: customWidthThird,
                    marginLeft: 10,
                  }}
                >
                  <div
                    style={{
                      marginTop: 10,
                      color: "#000",
                    }}
                  ></div>
                  <div
                    style={{
                      width: customWidthThird,
                      height: customHeightThird + 15,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        color: "#fff",
                        width: customWidthThird,
                        height: customHeightThird + 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        onClick={() => {
                          console.log(item.id)
                          dispatch(setPlayingEpisodeData(null))
                          dispatch(setSeriesEpisodes([])) 
                          handleRouteChange(`/player/${item.id}`,item.id)
                          // setCurrentSong({
                          //   song: item?.episodes[0]?.url,
                          //   index: 0,
                          // });

                          // if (index == selectedEpisodeIndex) {
                          //   setSelectedSeries(item?.episodes);
                          //   setSelectedEpisodeIndex(0);
                          //   const { episodes, ...selectedSeriesData } = item;
                          //   setSelectedSeriesData(selectedSeriesData);
                          // } else {
                          //   audioRef.current.pause();
                          //   audioRef.current.currentTime = 0;
                          //   setSelectedSeries(item?.episodes);
                          //   setSelectedEpisodeIndex(0);
                          //   const { episodes, ...selectedSeriesData } = item;
                          //   setSelectedSeriesData(selectedSeriesData);
                          // }

                        //   setTimeout(() => {
                        //     navigate("/player");
                        //     // setShowPlayer(true);
                        //   }, 500);
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          width: 60,
                          height: 60,
                          // background: "red",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                      />
                      {hoveredIndex === index && (
                        <img
                          src={hoverImg}
                          style={{
                            width: customWidthThird,
                            height: customHeightThird + 15,
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        />
                      )}
                    </div>
                    <img
                      src={
                        "https://podcasts.cucurico.co.il/podcast/public/images/" +
                        item?.cover_image
                      }
                      style={{
                        width: customWidthThird,
                        height: customHeightThird + 15,
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        // objectFit: "contain",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      background: darkMode ? "#282828" : "#E97B65",
                      paddingTop: isTabletOrMobile ? 8 : 10,
                      paddingBottom: isTabletOrMobile ? 23 : 20,
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                      paddingRight: 12,
                      paddingLeft: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#fff",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.name}
                    </div>

                    <div
                      style={{
                        marginTop: 3,
                        fontSize: 12,
                        color: "#fff",
                        textAlign: "right",
                        marginBottom: 3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      With: {item?.presenter}
                    </div>

                    <div
                      style={{
                        marginTop: 2,
                        color: darkMode ? "#777777" : "#E9D9D6",
                        fontSize: 12,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item?.category?.name?.toString()} {`${"00:41:55"}`}
                    </div>
                  </div>
                </div>
              </>
            {/* );
          })} */}
        </Draggable>
      ) : (
        <>
          <div
            style={{
              marginTop: "4%",

              marginBottom: "7%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                background: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.7)",
                padding: 20,
                fontWeight: "Bold",
                color: "white",

                // minWidth:"fitContent"
              }}
            >
              Nothing to show here
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ListRenderTwo;

import React, { useContext, useEffect, useRef, useState } from "react";
// import "./home.css";
import './listRenderOne.css'

import { ThemeContext } from "../components/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import hoverImg from "../images/hoverImg.png";
import img11 from "../images/img11.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Draggable from "../components/Draggable";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import {
  setPlayingEpisodeData,
  setSeriesEpisodes,
} from "../features/playingEpisode";
import axios from "axios";
import { useTheme } from "../components/ThemeContext";
const ListRenderOne = ({
  audioRef,
  setVolume,
  list,
  index,
  volume,
  setIsPlaying,
  item,
}) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // const {categories,episodes,series,tags} = item;
  ////console.log(categories)
  ////console.log(episodes)
  ////console.log(series)
  ////console.log(tags)
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
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

  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const customWidth = isTabletOrMobile ? 215 : 248;
  const customHeight = isTabletOrMobile ? 135 : 160;
  const [episode, setEpisodes] = useState(null);

  useEffect(() => {
    //console.log("THE LIST ========wakawaka==",  list)
    //console.log(item)
    if (list !== undefined) {
      ////console.log("THE LIST ========wakawaka==",  list);
      ////console.log(list[0]?.episodes)
      setEpisodes(list[0]?.episodes);
      ////console.log("THE EPISODES ========wakawaka==",  episode)
    }
  }, [list]);
  let tag = item?.tags;
  // console.log("iski ma ka bhossra", item)
  tag = typeof tag === "string" ? [tag] : tag;

  // Array.isArray(tag) && tag.map(item => {
  //     //console.log(item.name); // replace this with your map function logic
  // });
  return (
    <>
      {item ? (
        <Draggable>
          {/* {episode.map((item, index) => {
            return ( */}
          <>
            <div
            className="listRenderOneMain"
              style={{
                width: customWidth,
              }}
            >
              <div
              className="listRenderInner"
                // style={{
                //   marginTop: 10,
                //   color: "#000",
                // }}
              ></div>
              <div
                style={{
                  width: customWidth,
                  height: customHeight,
                }}
              >
                <div
                className="onClickPlay"
                  style={{
                    // position: "absolute",
                    // alignItems: "center",
                    // justifyContent: "center",
                    // display: "flex",
                    width: customWidth,
                    height: customHeight,
                    // cursor:"pointer",
                 
                  }}
                  onClick={() => {
                    dispatch(setPlayingEpisodeData(null));
                    dispatch(setSeriesEpisodes([]));
                    handleRouteChange(`/players/${item.series_id}`, item);
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
 
         className="onClickPlayHover"
                    style={{
                      // width: 75,
                      // height: 75,
                      // position: "absolute",
                      // cursor: "pointer",
                     
                    }}
                  />
                  {hoveredIndex === index && (
                    <img
                      src={hoverImg}
                      style={{
                        width: customWidth,
                        height: customHeight,
                        borderRadius: 10,
                      }}
                    />
                  )}
                </div>

                <img
                  src={
                    "https://podcasts.cucurico.co.il/podcast/public/images/" +
                    item?.image
                  }
                  style={{
                    width: customWidth,
                    height: customHeight,
                    borderRadius: 15,
                    // background:"red",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
              className="itemName"
                style={{
                  // fontSize: "15px",
                  // fontWeight: "bold",
                  // marginTop: 5,
                  color: darkMode ? "#fff" : "#212121",
                  // textAlign: "right",
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                }}
              >
                {item?.name}
              </div>

              <div
              className="renderOneDescription"
                style={{
                  // marginTop: 2,
                  // fontSize: "12px",
                  // color: darkMode ? "#fff" : "#E97B65",
                  // textAlign: "right",
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                }}
              >
                {item?.description}
              </div>

              <div
              className="renderOneItemGuests"
                style={{
                  // marginTop: 2,
                  color: darkMode ? "#777777" : "#000",
                  // fontSize: 12,

                  // textAlign: "right",
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                }}
              >
                {item?.guests}
              </div>

              <div
              className="durationMain"
                style={{
                  // marginTop: 2,
                  // color: "#777777",
                  // textAlign: "right",
                  // display: "flex",
                  // fontSize: 12,
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                  // flexDirection: "row-reverse",
                  // justifyContent: "flex-end",
                  // alignItems: "center",
                }}
              >
                {/* {item?.tags?.length > 0 ? item.tags.map((tag,index)=>{return <p key={index}>{tag.name}</p>}) :item?.tags[0].name} | {item?.duration} */}
                <p
                className="DurationPara"
                  style={{
                    // margin: "1px 4px 0px 0px",
                    // display: "flex",
                    // alignItems: "center",
                  }}
                >
                  {item?.duration}
                </p>
                {Array.isArray(tag) && tag.length > 0 && (
                  <p
                  className="dash"
                    style={{
                      // margin: "0px",
                      // display: "flex",
                      // alignItems: "center",
                    }}
                  >
                    |
                  </p>
                )}{" "}
                {Array.isArray(tag) &&
                  tag.map((item, index) => {
                    return (
                      <p
                      className="itemName"
                        style={{
                          // margin: "0px 3px",
                          // display: "flex",
                          // alignItems: "center",
                          // textAlign: "left",
                          // textOverflow: "ellipsis",
                          // alignItems: "center",
                        }}
                      >
                        {item.name}
                        {index != 0 && (
                          <div
                          className="bulll"
                            style={{
                              // marginTop: "1px",
                              // marginRight: "4px",
                              // marginLeft: "1px",
                            }}
                          >
                            &bull;
                          </div>
                        )}
                      </p>
                    );
                    //console.log(item.name); // replace this with your map function logic
                  })}
                {/* {
                    Array.isArray(tag) && tag.map(item => {
                      return <p>{item.name}</p>
                      //console.log(item.name); // replace this with your map function logic
                  })
                  } */}
                {/* {item?.tags.map((item,index)=>{return <span key={index}>{item.name} </span>})} */}
                {/* {`${"00:41:55"}`} */}
              </div>
            </div>
          </>
          {/* );
          })} */}
        </Draggable>
      ) : (
        <>
          <div
          className="nothing"
            style={{
              // marginTop: "4%",

              // marginBottom: "7%",
              // textAlign: "center",
              // display: "flex",
              // justifyContent: "center",
            }}
          >
            <p
            className= "nothingInner"
              style={{
                background: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.7)",
                // padding: 20,
                // fontWeight: "Bold",
                // color: "white",

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

export default ListRenderOne;

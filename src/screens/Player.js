import React, { useContext, useEffect } from "react";
import "./player.css";
// import axios from "axios";
import playerEp1 from "../images/playerEp1.png";
import playSmall from "../images/playSmall.png";
import plus from "../images/plus.png";
import kinina from "../images/rightround.png";
import showMore from "../images/showMore.png";
import plusRed from "../images/plusRed.png";
import pauseLogo from "../images/pauseLogo.png";
import axios from "axios";
import playLogo from "../images/playLogo.png";
import roundArrow from "../../src/images/return.png";
import copyLink from "../images/copyLink.png";
import "./player.css";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useRef } from "react";
import "./Episode.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSeriesEpisodes,
  setPlayingEpisode,
  setPlayingEpisodeData,
} from "../features/playingEpisode";
import { useTheme } from "../components/ThemeContext";
import Header from "../components/Header";
import { ThemeContext } from "../components/ThemeContext";
const Player = ({
  audioRef,
  currentTime,
  duration,
  handleSeek,
  togglePlay,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
}) => {
  const disptach = useDispatch();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  const location = useLocation();

  const [episodeList, setEpisodeList] = useState([]);
  const theme = useTheme();
  const data = location.state ? location.state.data : null;
  const postData = async (series_id) => {
    // Define the data body
    let data = {
      series_id: series_id,
    };
    try {
      const response = await axios.post(
        "https://podcasts.cucurico.co.il/podcast/public/api/seriesEpisode",
        data
      );
      if (
        response.data.data.length > 0 &&
        response.data.data !== [] &&
        response.data.data !== null
      ) {
        setEpisodeList(response.data.data);
        disptach(setSeriesEpisodes(response.data.data));
        //console.log(episodeList);
      } else if (
        response.data.data.length == [] ||
        response.data.data == null
      ) {
      } else {
      }
    } catch (error) {
      // Handle the error
      console.error("Error posting data", error);
    }
  };
  useEffect(() => {
    console.log("koi data nhi====", episodesss);

    console.log("koi data nhi", filteredEpisodes);
    postData(data);
  }, []);
  const searchings = useSelector((state) => state);
  const episodesss = useSelector((state) => state.seriesEpisodes);
  const filteredEpisodes = episodesss?.episodes?.filter((ep) =>
    ep.name?.toLowerCase().includes(searchings.search.search.toLowerCase())
  );

  useEffect(() => {
    //console.log("laila", episodesss);
    //console.log("laila", episodesss.currentEpisode);
    if (episodesss.currentEpisode == null) {
      const episodeone = episodesss.episodes[0];
      disptach(setPlayingEpisodeData(episodeone));
      console.log("sadapay", episodesss.episodes);
      // disptach(setPlayingEpisodeData(episodesss.playingEpisode))
    }
    //console.log(episodesss);
  }, [episodesss?.episodes]);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1150px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1020px)" });

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const [active, setActive] = useState(0);
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const [show, setShow] = useState(false);
  const [more, setMore] = useState(true);
  const {
    darkMode,
    selectedSeries,
    setSelectedSeries,
    selectedEpisodeIndex,
    setSelectedEpisodeIndex,
    selectedSeriesData,
    setSelectedSeriesData,
    showPlayer,
    setShowPlayer,
    currentSong,
    setCurrentSong,
  } = useContext(ThemeContext);
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  }
  const width = window.innerWidth;
  const height = window.innerHeight;

  // STYLES >>>>>>>>

  const styles = {
    tcont3: {
      textAlign: "right",
      color: "white",
      fontSize: 14,
      cursor: "pointer",
      margin: "0px 10px 0px 0px",
      paddingRight: 3,
    },
    cont1: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      // position: "absolute",
      // top: 100,
      marginTop: isTabletOrMobile ? "-235px" : "-350px",
      background:
        isTabletOrMobile && darkMode
          ? "#161616"
          : !isTabletOrMobile && darkMode
          ? "#1A1A1A"
          : "#FFFFFF",
    },
    cont2: {
      width: isTabletOrMobile ? "94%" : "60%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    },
    cont3: {
      display: "flex",
      // width: 620,
      // height: 300,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    txt1: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      textAlign: "right",
      color: "white",
      fontSize: isTabletOrMobile ? 34 : 45,
      marginBottom: isTabletOrMobile ? null : "-3px",
    },
    txt2: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      color: "white",
      fontSize: isTabletOrMobile ? 12 : 15,
      marginBottom: isTabletOrMobile ? 7 : 6,
    },
    txt3: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      color: "white",
      fontSize: 9.4,
    },
    txt4: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      color: "#ADADAD",
      fontSize: 9.4,
    },
    cont4: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      gap: "7px",
      color: "white",
      fontSize: "15px",
      marginTop: "17px",
    },
    rangestyle: {
      cursor: "pointer",

      height: "3.5px",
      width: "100%",
      appearance: "none",
      borderRadius: "5px",
      background: darkMode
        ? `linear-gradient(to right,#E50914 0%,#E50914 ${
            (currentTime / duration) * 100
          }%, #eaeaea ${(currentTime / duration) * 100}%, #eaeaea 100%)`
        : `linear-gradient(to right, #E97B65 0%, #E97B65 ${
            (currentTime / duration) * 100
          }%, #eaeaea ${(currentTime / duration) * 100}%, #eaeaea 100%)`,
    },

    txt5: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "3px",
      fontSize: "4.356px",
    },
    cont5: {
      // height: "25px",
      // widtth: "40px",
      background: darkMode ? "#E50914" : "#E97B65",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3px",
      gap: "3px",
      paddingRight: width * 0.01,
      paddingLeft: width * 0.01,
      paddingTop: height * 0.01,
      paddingBottom: height * 0.01,
      fontSize: "13px",
    },
    txt6: {
      fontSize: 15,
    },
    txt7: {
      fontSize: 15,
    },
    rangecont: {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "2px",
      marginTop: isTabletOrMobile ? 6 : 0,
      marginBottom: isTabletOrMobile ? -8 : -10,
    },
    rangetxt: {
      fontSize: isTabletOrMobile ? 9.5 : 13,
      color: "#767676",
    },
    btn2: {
      background: darkMode ? "#E50914" : "#E97B65",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3px",
      gap: "3px",
      padding: "10px 20px",
      cursor: "pointer",
    },
    btn1: {
      background: "#0a0a0a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3px",
      // gap: "3px",
      padding: "10px 20px",
      cursor: "pointer",
    },
    btn1second: {
      background: "#0a0a0a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3px",
      // gap: "3px",
      padding: "12px",
      width: "42%",
      cursor: "pointer",
    },
    btn2second: {
      background: darkMode ? "#E50914" : "#E97B65",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "3px",
      gap: "3px",
      padding: "12px",
      width: "42%",
      cursor: "pointer",
    },
    cont6: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      gap: "7px",
      color: "white",
      fontSize: "15px",
      marginTop: "10px",
    },
    cont6second: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "right",
      gap: "7px",
      color: "white",
      fontSize: "15px",
      marginTop: "15px",
    },
    tcont1: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      color: "white",
      fontSize: "15px",
      marginTop: "10px",
      marginBottom: "7px",
    },
    tcont2: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      fontSize: 14,
      cursor: "pointer",
      paddingRight: 35,
    },
  };
  useEffect(() => {
    console.log("current episode jo open hui", episodesss?.currentEpisode);
  }, []);

  // STYLES <<<<<<<<<<
  const share = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setShow(!show);
  };

  const Show = () => {
    setMore(!more);
  };

  const linkRef = useRef();

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        alert("Failed to copy link to clipboard:", error);
      });
  };
  return (
    <>
      <div className="wrapper" style={{ background: "white" }}>
        <Header />

        <div
          style={{
            width: "100%",
            background: darkMode ? "#1A1A1A" : "white",
          }}
        >
          <img
            style={{
              width: "100%",
              height: isTabletOrMobile ? 250 : 400,
              filter: "blur(8px)",
            }}
            src={
              "https://podcasts.cucurico.co.il/podcast/public/images/" +
              // selectedSeriesData?.cover_image;
              episodesss?.currentEpisode?.series?.cover_image
            }
            alt=""
          />
        </div>
        <div style={styles.cont1}>
          <div style={styles.cont2}>
            <div
              className="imageHeightDiv"
              style={
                {
                  // height: isTabletOrMobile ?  452 :  681 ,
                }
              }
            >
              <div className="ImageHeightGradient">
                <div
                  className="button-container"
                  style={{
                    position: "absolute",
                    top: "0px",
                    flexDirection: isTabletOrMobile ? "column" : null,
                  }}
                >
                  <button
                    style={{
                      fontSize: 15,
                      padding: isTabletOrMobile
                        ? "8.5px 19.45px"
                        : "7px 14.45px",
                    }}
                    className="qwe"
                  >
                    הושמע
                  </button>
                  <button
                    style={{ fontSize: 17 }}
                    className="share"
                    alt="Share"
                    onClick={() => {
                      share();
                    }}
                  >
                    שיתוף <img src={kinina} />
                  </button>
                </div>
              </div>
              <img
                className="imageHeight"
                style={{
                  height: isTabletOrMobile ? 250 : 681,
                }}
                src={
                  "https://podcasts.cucurico.co.il/podcast/public/images/" +
                  // selectedSeriesData?.profile_image
                  episodesss?.currentEpisode?.series?.featured_image
                }
                alt=""
              />
            </div>
            {/* <div
              className="button-container"
              style={{
                position: "absolute",
                top: "0px",
                flexDirection: isTabletOrMobile ? "column" : null,
              }}
            >
              <button className="qwe">הושמע</button>
              <button
                className="share"
                alt="Share" 
                onClick={() => {
                  share();
                }}
              >
                שיתוף
                <img src={kinina} />
              </button>
            </div>
            <img
              className="imageHeight"
              // style={{
              //   width: "100%",

              //   height: isTabletOrMobile ? 250 : !isBigScreen? 396 : 550 ,

              // }}
              src={
                "https://podcasts.cucurico.co.il/podcast/public/images/" +
                episodesss?.currentEpisode?.series.featured_image
                //selectedSeriesData?.profile_image
                // episodesss?.currentEpisode?.featured_image
              }
              alt=""
            /> */}

            <div className="absoluteImage" style={styles.cont3}>
              <div
                className="absoluteImageText"
                style={{
                  position: "absolute",
                  width: isTabletOrMobile ? "90%" : "90%",
                  marginBottom: isTabletOrMobile ? -10 : 17.4,
                }}
              >
                <div style={styles.txt1}>
                  {episodesss?.currentEpisode?.series?.name}
                </div>
                <div style={styles.txt2}>
                  {episodesss?.currentEpisode?.name} :
                  {episodesss?.currentEpisode?.ep_number} פרק
                </div>
                {isTabletOrMobile && (
                  <div style={styles.txt3}>
                    Hosted by: {episodesss?.currentEpisode?.author_name}
                  </div>
                )}
                {isTabletOrMobile && (
                  <div style={styles.txt4}>
                    {episodesss?.currentEpisode?.tags?.map((item, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          {index !== 0 && (
                            <div
                              style={{
                                marginTop: "1px",
                                marginRight: "4px",
                                marginLeft: "4px",
                              }}
                            >
                              &bull;
                            </div>
                          )}
                          {item.name}
                        </div>
                      );
                    })}

                    <div
                      style={{
                        marginLeft: 2,
                      }}
                    >
                      {" "}
                      | {filteredEpisodes?.length}
                    </div>
                  </div>
                )}

                <div style={styles.rangecont}>
                  <div style={styles.rangetxt}>{formatTime(currentTime)}</div>
                  <div style={styles.rangetxt}>{formatTime(duration)}</div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  style={styles.rangestyle}
                  className="other-range"
                />
                {!isTabletOrMobile && (
                  <div style={styles.cont6}>
                    <div style={styles.btn1}>
                      <div style={styles.txt7}>עוד פעולות</div>

                      <img
                        style={{
                          width: 22,
                          // marginRight: width * 0.007
                          marginLeft: 7,
                        }}
                        src={darkMode ? plusRed : plus}
                        alt=""
                      />
                    </div>
                    <div
                      style={styles.btn2}
                      onClick={() => {
                        if (!audioRef?.current?.paused) {
                          setIsPlaying(false);
                          audioRef?.current?.pause();

                          setShowPlayer(false);
                        } else {
                          setIsPlaying(true);
                          audioRef?.current?.play();
                          setShowPlayer(true);
                        }
                      }}
                    >
                      <div
                        style={{
                          fontSize: 15,
                        }}
                      >
                        להאזנה
                      </div>
                      <img
                        style={{
                          width: 22,
                          filter: "brightness(0) invert(1)",
                          color: "white",
                        }}
                        src={isPlaying ? pauseLogo : playLogo}
                        alt=""
                      />
                    </div>
                  </div>
                )}

                {!isTabletOrMobile ? (
                  <>
                    <div style={styles.tcont1}>
                      <div
                        onClick={() => {
                          setActive(1);
                        }}
                        style={{}}
                      >
                        <div style={styles.tcont2}>אודות הסדרה</div>
                      </div>
                      <div
                        onClick={() => {
                          setActive(0);
                        }}
                      >
                        <div style={styles.tcont3}>תקציר הפרק</div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        style={{
                          width: "40%",
                          height: active == 1 ? 2.5 : 1.5,

                          background:
                            active == 1 && darkMode
                              ? "#E50914"
                              : active == 1 && !darkMode
                              ? "#E97B65"
                              : "gray",
                        }}
                      />
                      <div
                        style={{
                          width: isBigScreen ? "15%" : "20%",
                          height: active == 0 ? 2.2 : 1.5,

                          background:
                            active == 0 && darkMode
                              ? "#E50914"
                              : active == 0 && !darkMode
                              ? "#E97B65"
                              : "gray",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        marginTop: 6,
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          width: "45%",
                          textAlign: "right",
                          fontSize: 12,
                          marginRight: "12%",

                          // marginTop:"-1%",
                          // lineHeight:"0.1",
                        }}
                      >
                        <div>
                          Hosted by: {episodesss?.currentEpisode?.author_name}
                        </div>
                        <div
                          style={{
                            color: "#9B9A9A",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          {episodesss?.currentEpisode?.tags?.map(
                            (item, index) => {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  {index !== 0 && (
                                    <div
                                      style={{
                                        marginTop: "1.5px",
                                        marginRight: "4px",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      &bull;
                                    </div>
                                  )}

                                  {item.name}
                                </div>
                              );
                            }
                          )}

                          <div
                            style={{
                              marginLeft: 3,
                            }}
                          >
                            {" "}
                            | {filteredEpisodes.length}
                          </div>
                        </div>
                      </div>
                      {more ? (
                        <div
                          style={{
                            color: "white",
                            // lineHeight:"1.2",
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "flex-end",
                            textAlign: "right",
                            fontSize: 12,
                            width: isTabletOrMobile ? "100%" : "65%",
                            display: "flex",
                            flexDirection: "column",
                            height: "70px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                            // maxHeight: more ? "50px" : "50px",

                            // overflow: more ? "hidden" : null,
                            // textOverflow: more ? "ellipsis" : null,
                            // whiteSpace:"nowrap",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                            }}
                          >
                            {" "}
                            {active == 1
                              ? episodesss?.currentEpisode?.series?.about_series
                              : episodesss?.currentEpisode?.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "1%",
                              textAlign: "right",
                              justifyContent: "flex-end",
                              color: "#9B9A9A",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setMore(!more);
                            }}
                          >
                            {" "}
                            read more
                            <img
                              style={{
                                width: "3%",
                                objectFit: "contain",
                              }}
                              src={showMore}
                              alt=""
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "white",
                            // lineHeight:"1.2",
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "flex-end",
                            textAlign: "right",
                            fontSize: 12,
                            width: isTabletOrMobile ? "100%" : "65%",
                            display: "flex",
                            flexDirection: "column",
                            height: "70px",
                            overflow: "scroll",

                            // maxHeight: more ? "50px" : "50px",

                            // overflow: more ? "hidden" : null,
                            // textOverflow: more ? "ellipsis" : null,
                            // whiteSpace:"nowrap",
                          }}
                        >
                          <p>
                            {" "}
                            {active == 1
                              ? episodesss?.currentEpisode?.series?.about_series
                              : episodesss?.currentEpisode?.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "1%",
                              textAlign: "right",
                              justifyContent: "flex-end",
                              color: "#9B9A9A",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setMore(!more);
                            }}
                          >
                            {" "}
                            read less
                            <img
                              style={{
                                width: "3%",
                                objectFit: "contain",
                                transform: "rotate(180deg)",
                              }}
                              src={showMore}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {isTabletOrMobile && (
              <div
                style={{
                  background: darkMode ? "#161616" : "#FFFFFF",
                  // background: "#161616",
                  // paddingRight: 15,
                  // paddingLeft: 15,
                  display: "flex",
                  color: darkMode ? "#FFFFFF" : "#161616",
                  alignSelf: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={styles.cont6second}>
                  <div style={styles.btn1second}>
                    <div style={styles.txt7}>עוד פעולות</div>

                    <img
                      style={{
                        width: 15,
                        // marginRight: width * 0.007
                        marginLeft: 5,
                      }}
                      src={darkMode ? plusRed : plus}
                      alt=""
                    />
                  </div>
                  <div
                    style={styles.btn2second}
                    onClick={() => {
                      if (!audioRef?.current?.paused) {
                        setIsPlaying(false);
                        audioRef?.current?.pause();
                        setShowPlayer(false);
                      } else {
                        setIsPlaying(true);
                        audioRef?.current?.play();
                        setShowPlayer(true);
                      }
                    }}
                  >
                    <div
                      style={{
                        fontSize: 15,
                      }}
                    >
                      להאזנה
                    </div>
                    <img
                      style={{
                        width: 15,
                        height: 15,
                        filter: "brightness(0) invert(1)",
                        color: "white",
                      }}
                      src={isPlaying ? pauseLogo : playLogo}
                      alt=""
                    />
                  </div>
                </div>
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "right",
                      color: "white",
                      fontSize: "15px",
                      marginTop: "20px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      onClick={() => {
                        setActive(1);
                      }}
                      style={{}}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          fontSize: 13,
                          cursor: "pointer",
                          color: darkMode ? "#FFFFFF" : "#161616",
                          paddingRight: 53,
                        }}
                      >
                        אודות הסדרה
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setActive(0);
                      }}
                    >
                      <div
                        style={{
                          textAlign: "center",
                          color: darkMode ? "#FFFFFF" : "#161616",
                          fontSize: 13,
                          cursor: "pointer",
                          margin: "0px 10px 0px 0px",
                          paddingRight: 25,
                        }}
                      >
                        תקציר הפרק
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "75%",
                        color: darkMode ? "#FFFFFF" : "#161616",
                        height: active == 1 ? 2 : 1,

                        background:
                          active == 1 && darkMode
                            ? "#E50914"
                            : active == 1 && !darkMode
                            ? "#E97B65"
                            : "gray",
                      }}
                    />
                    <div
                      style={{
                        width: window.innerWidth < 500 ? "43%" : "140px",
                        height: active == 0 ? 2 : 1,
                        color: darkMode ? "#FFFFFF" : "#161616",
                        background:
                          active == 0 && darkMode
                            ? "#E50914"
                            : active == 0 && !darkMode
                            ? "#E97B65"
                            : "gray",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      marginTop: 12,
                    }}
                  >
                    {more ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            color: darkMode ? "#FFFFFF" : "#161616",

                            textAlign: "right",
                            fontSize: 10,
                            width: isTabletOrMobile ? "90%" : "80%",

                            height: 25,
                            overflow: "scroll",
                          }}
                        >
                          {active == 1
                            ? episodesss?.currentEpisode?.series?.about_series
                            : episodesss?.currentEpisode?.description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "4%",
                            textAlign: "right",
                            justifyContent: "flex-end",
                            color: "#9B9A9A",
                            cursor: "pointer",
                            fontSize: "11px",
                            height: "48px",
                            alignItems: "flex-start",
                            marginBottom: "10px",
                          }}
                          onClick={() => {
                            setMore(!more);
                          }}
                        >
                          {" "}
                          read more
                          <img
                            style={{
                              width: "8%",
                              objectFit: "contain",
                              marginTop: "4px",
                            }}
                            src={showMore}
                            alt=""
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            color: darkMode ? "#FFFFFF" : "#161616",

                            textAlign: "right",
                            fontSize: 10,
                            width: "80%",
                            // margin: "0px 10px 0px 0px",

                            height: 60,
                            overflow: "scroll",
                          }}
                        >
                          {active == 1
                            ? episodesss?.currentEpisode?.series?.about_series
                            : episodesss?.currentEpisode?.description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "4%",
                            textAlign: "right",
                            justifyContent: "flex-end",
                            color: "#9B9A9A",
                            cursor: "pointer",
                            fontSize: "11px",
                            marginBottom: "10px",
                          }}
                          onClick={() => {
                            setMore(!more);
                          }}
                        >
                          {" "}
                          read less
                          <img
                            style={{
                              width: "8%",
                              objectFit: "contain",
                              transform: "rotate(180deg)",
                            }}
                            src={showMore}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              </div>
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                // background: darkMode ? "#252525" : "none",
                background:
                  isTabletOrMobile && darkMode
                    ? "#161616"
                    : !isTabletOrMobile && darkMode
                    ? "#252525"
                    : "none",
                // background: "red",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                marginBottom: 100,
              }}
            >
              <div
                style={{
                  marginTop: isTabletOrMobile ? "5px" : "35px",
                  marginBottom: "15px",
                  width: "80%",
                  height: isTabletOrMobile ? "80px" : "105px",
                  backgroundColor: "#F9F3F2",
                  color: darkMode ? "#FFFFFF" : "#E4B1B1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: darkMode ? "#1A1A1A" : "#F9F3F2",
                }}
              >
                AD
              </div>

              <div
                style={{
                  marginTop: "5px",
                  marginBottom: "-5px",
                  width: "96%",
                  display: "flex",
                  justifyContent: "flex-end",
                  color: darkMode ? "#FFFFFF" : "#212121",
                }}
              >
                <div>כל הפרקים</div>
              </div>
              {filteredEpisodes.length > 0 ? (
                filteredEpisodes?.map((item, index) => {
                  return (
                    <>
                      <div
                        style={{
                          cursor: "pointer",
                          width: "100%",
                        }}
                        onClick={() => {
                          setSelectedEpisodeIndex(index);
                          disptach(
                            setPlayingEpisode({
                              song: item?.url,
                              index: item.ep_number,
                            })
                          );
                          disptach(setPlayingEpisodeData(item));
                          //console.log("laila", episodesss);
                          // setCurrentSong({
                          //   song: item?.url,
                          //   index: index,
                          // });
                          audioRef.current.pause();
                          audioRef.current.currentTime = 0;
                          if (volume == 0) {
                            audioRef.current.volume = 0.5;
                            setVolume(audioRef.current.volume * 100);
                          }
                          setIsPlaying(true);
                          setTimeout(() => {
                            audioRef.current.play();
                          }, 200);
                          setShowPlayer(true);
                        }}
                      >
                        <div
                          className="episodes"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",

                            backgroundColor:
                              darkMode &&
                              isTabletOrMobile &&
                              index == selectedEpisodeIndex
                                ? "#1A1A1A"
                                : darkMode &&
                                  !isTabletOrMobile &&
                                  index == selectedEpisodeIndex
                                ? "#1A1A1A"
                                : !darkMode &&
                                  isTabletOrMobile &&
                                  index == selectedEpisodeIndex
                                ? "#F9F3F2"
                                : !darkMode &&
                                  !isTabletOrMobile &&
                                  index == selectedEpisodeIndex
                                ? "#F9F3F2"
                                : darkMode && isTabletOrMobile
                                ? "#1A1A1A"
                                : darkMode
                                ? "#252525"
                                : "#FFFFFF",
                            margin: "0% 2%",
                            padding: "2%",
                            padding: "0px 8px",
                            paddingTop: 8,
                            paddingBottom: 8,
                            marginTop: 8,
                          }}
                        >
                          <div
                            style={{
                              width: "80%",
                              padding: "10px",
                              paddingRight: "4%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              textAlign: "right",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 12,
                                  width: "20%",
                                  display: isTabletOrMobile ? "none" : "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  color: darkMode ? "#777777" : "#484848",
                                }}
                              >
                                {item?.duration}
                              </div>
                              <div
                                style={{
                                  width: "100%",
                                  fontSize: 17,
                                  fontWeight: "",
                                  color: darkMode ? "#FFFFFF" : "#212121",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>

                            <div
                              style={{
                                // width:"90%",
                                fontSize: 12,
                                color: darkMode ? "#FFFFFF" : "#212121",

                                width: "80%",
                                marginTop: isTabletOrMobile ? "8px" : "5px",
                                textOverflow: "ellipsis",
                                maxHeight: isTabletOrMobile ? "30px" : "55px",
                                overflow: isTabletOrMobile
                                  ? "hidden"
                                  : "hidden",
                              }}
                            >
                              {item?.description}
                            </div>
                            {/* <div
                            style={{
                              fontSize: 12,
                              marginTop: "6px",
                              color: darkMode ? "#777777" : "#484848",
                            }}
                          >
                            {item?.author_name}
                          </div> */}
                            <div
                              style={{
                                fontSize: isTabletOrMobile ? 10 : 12,
                                marginTop: "6px",
                                color: darkMode ? "#777777" : "#484848",
                                display: "flex",
                                marginTop: "-5px",
                                gap: "4px",
                              }}
                            >
                              <p> {item?.hebrew_date} </p>
                              <p>|</p>{" "}
                              <p>
                                {" "}
                                {format(
                                  new Date(item?.ep_date),
                                  "dd.MM.yyyy"
                                )}{" "}
                              </p>
                              {/* {item?.created_at} */}
                            </div>
                            <div
                              style={{
                                color: "#E97B65",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 11,
                                marginTop: "-10px",
                              }}
                              onClick={() => {
                                setShow(true);
                              }}
                            >
                              שיתוף
                              <div>
                                <img
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    objectFit: "contain",
                                    marginLeft: "4px",
                                  }}
                                  onClick={() => {
                                    setShow(true);
                                  }}
                                  src={roundArrow}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <img
                            style={{
                              minWidth: isTabletOrMobile ? 103 : 170,

                              maxWidth: isTabletOrMobile ? 103 : 170,
                              display: "flex",
                              justifyContent: "flex-end",
                              height: isTabletOrMobile ? 73 : 120,
                              borderRadius: "8px",
                              marginBottom: isTabletOrMobile ? "18px" : null,
                            }}
                            src={
                              "https://podcasts.cucurico.co.il/podcast/public/images/" +
                              item?.image
                              // playerEp1
                            }
                            alt=""
                          />
                        </div>
                        {/* <img
                       
                        src={playerLine}
                        alt=""
                      /> */}

                        {/* {index == item.length?( */}
                        <div
                          style={{
                            width: "96%",
                            marginLeft: "2%",
                            background:
                              index == filteredEpisodes.length - 1
                                ? "transparent"
                                : darkMode
                                ? "#424242"
                                : "#dddddd",
                            height: 1.5,
                            marginTop: 7,
                          }}
                        />
                      </div>
                    </>
                  );
                })
              ) : (
                <p>Item Does Not Exist</p>
              )}
            </div>
          </div>
          <div
            style={{
              background: "#282828",
              width: "100%",
              paddingTop: 13,
              paddingBottom: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                color: "#B3B3B3",
                fontSize: 10.5,
              }}
            >
              © כל הזכויות שמורות משפחה
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#B3B3B3",
                  fontSize: 10.5,
                }}
              >
                CREATED BY
              </div>
              <div
                style={{
                  marginLeft: 2.5,
                  color: "#E97B65",
                  fontSize: 10.5,
                }}
              >
                COMBIX
              </div>
            </div>
          </div>
        </div>
        {show && (
          <div
            className="overlay"
            onClick={() => {
              setShow(false);
            }}
          >
            <div className="modal">
              Copy Link{" "}
              <div className="modalInner">
                <p className="modalP">{window.location.href}</p>
                <img
                  className="copyImage"
                  src={copyLink}
                  alt=""
                  ref={linkRef}
                  value={window.location.href}
                  readOnly
                  onClick={handleCopyLink}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Player;

// {selectedSeries?.map((item, index) => {
//   return (
//     <>
//       <div
//         style={{
//           cursor: "pointer",
//           width: "100%",
//         }}
//         onClick={() => {
//           setSelectedEpisodeIndex(index);
//           setCurrentSong({
//             song: item?.url,
//             index: index,
//           });
//           audioRef.current.pause();
//           audioRef.current.currentTime = 0;
//           if (volume == 0) {
//             audioRef.current.volume = 0.5;
//             setVolume(audioRef.current.volume * 100);
//           }
//           setIsPlaying(true);
//           setTimeout(() => {
//             audioRef.current.play();
//           }, 200);
//           setShowPlayer(true);
//         }}
//       >
//         <div
//           className="episodes"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "row",

//             backgroundColor:
//               darkMode && index == selectedEpisodeIndex
//                 ? "#1a1a1a"
//                 : !darkMode && index == selectedEpisodeIndex
//                 ? "#f9f3f2"
//                 : darkMode
//                 ? "#252525"
//                 : "#fff",
//             margin: "0% 2%",
//             padding: "2%",
//             padding: "0px 8px",
//             paddingTop: 8,
//             paddingBottom: 8,
//             marginTop: 8,
//           }}
//         >
//           <div
//             style={{
//               width: "80%",
//               padding: "10px",
//               paddingRight: "4%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "flex-end",
//               textAlign: "right",
//             }}
//           >
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 12,
//                   width: "20%",
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                   color: darkMode ? "#777777" : "#484848",
//                 }}
//               >
//                 {item?.duration}
//               </div>
//               <div
//                 style={{
//                   width: "80%",
//                   fontSize: 17,
//                   fontWeight: "",
//                   color: darkMode ? "#FFFFFF" : "#212121",
//                 }}
//               >
//                 {item?.name}
//               </div>
//             </div>

//             <div
//               style={{
//                 fontSize: 12,
//                 color: darkMode ? "#FFFFFF" : "#212121",
//               }}
//             >
//               {item?.description}
//             </div>
//             <div
//               style={{
//                 fontSize: 12,
//                 marginTop: "6px",
//                 color: darkMode ? "#777777" : "#484848",
//               }}
//             >
//               {item?.author_name}
//             </div>
//             <div
//               style={{
//                 fontSize: 12,
//                 marginTop: "6px",
//                 color: darkMode ? "#777777" : "#484848",
//               }}
//             >{
//               format(new Date(item?.created_at), 'dd.MM.yyyy')
//             }
//               {/* {item?.created_at} */}
//             </div>
//             <div
//               style={{
//                 color: "#E97B65",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: 11,
//                 marginTop: "2px",
//               }}
//             >
//               שיתוף
//               <div>
//                 <img
//                   style={{
//                     width: "16px",
//                     height:"16px",
//                     objectFit:"contain",
//                     marginLeft: "4px",
//                   }}
//                   src={
//                     roundArrow
//                   }
//                   alt=""
//                 />
//               </div>
//             </div>
//           </div>
//           <img
//             style={{
//               width: isTabletOrMobile ? 60 : 200,
//               display: "flex",
//               justifyContent: "flex-end",
//               height: isTabletOrMobile ? 60 : 170,
//             }}
//             src={
//               "https://podcasts.cucurico.co.il/podcast/public/images/" +
//               item?.image
//               // playerEp1
//             }
//             alt=""
//           />
//         </div>
//         {/* <img

//           src={playerLine}
//           alt=""
//         /> */}
//         <div
//           style={{
//             width: "96%",
//             marginLeft: "2%",
//             background:
//               index == selectedSeries.length - 1
//                 ? "transparent"
//                 : darkMode
//                 ? "#424242"
//                 : "#dddddd",
//             height: 1.5,
//             marginTop: 7,
//           }}
//         />
//       </div>
//     </>
//   );
// })}

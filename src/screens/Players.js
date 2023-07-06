import React, { useContext, useEffect } from "react";
import "./player.css";
// import axios from "axios";
import playerEp1 from "../images/playerEp1.png";
import playSmall from "../images/playSmall.png";
import plus from "../images/plus.png";
import plusRed from "../images/plusRed.png";
import pauseLogo from "../images/pauseLogo.png";
import axios from "axios";
import playLogo from "../images/playLogo.png";
import  roundArrow from '../../src/images/return.png'
import { format } from 'date-fns';
import { useLocation } from "react-router-dom";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useState } from "react";
import "./Episode.css";
import { useDispatch,useSelector } from "react-redux";
import  {setSeriesEpisodes,setPlayingEpisode,setPlayingEpisodeData} from '../features/playingEpisode' 
import Header from "../components/Header";
import { ThemeContext } from "../components/ThemeContext";
const Players = ({
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
  const [episodeList ,setEpisodeList] = useState([])
  const data = location.state ? location.state.data : null;
  const postData = async (series_id) => {
    // Define the data body
    let data = {
      series_id: series_id,
    };
    try {
        const response = await axios.post('https://podcasts.cucurico.co.il/podcast/public/api/seriesEpisode', data);
        if(response.data.data.length>0 && response.data.data !== [] && response.data.data !== null){
          setEpisodeList( response.data.data);
          disptach(setSeriesEpisodes(response.data.data))
          console.log(episodeList)
        } else if(response.data.data.length == [] || response.data.data == null){
 
        } else { 
        }
    } catch (error) {
        // Handle the error
        console.error('Error posting data', error);
    }
}
useEffect(() => {
   console.log("laila",data.series_id)
   postData(data.series_id)
   disptach(setPlayingEpisode({song: data?.url, index: data.ep_number}))
    disptach(setPlayingEpisodeData(data))
    // audioRef.current.pause();
    // audioRef.current.currentTime = 0;
    // if (volume == 0) {
    //   audioRef.current.volume = 0.5;
    //   setVolume(audioRef.current.volume * 100);
    // }
    // setIsPlaying(true);
    // // setTimeout(() => {
    // //   audioRef?.current?.play();
    // // }, 200);
    // setShowPlayer(true);
}, [])
const  episodesss = useSelector((state) => state.seriesEpisodes);
useEffect(() => {
  console.log("laila",episodesss) 
  console.log("laila",episodesss.currentEpisode,episodesss?.currentEpisode)
  if(episodesss.currentEpisode == null){
      const episodeone = episodesss.episodes[0]
      disptach(setPlayingEpisode(episodeone))
    //   disptach(setPlayingEpisodeData({song: data.url, index: data.ep_number}))
    //   audioRef.current.pause();
    //   audioRef.current.currentTime = 0;
    //   if (volume == 0) {
    //     audioRef.current.volume = 0.5;
    //     setVolume(audioRef.current.volume * 100);
    //   }
    //   setIsPlaying(true);
    //   setTimeout(() => {
    //     audioRef?.current?.play();
    //   }, 200);
    //   setShowPlayer(true);
    // console.log("laila",episodesss.currentEpisode)
    // disptach(setPlayingEpisodeData(episodesss.playingEpisode))
  }
console.log(episodesss)
}, [episodesss?.episodes])
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const [active, setActive] = useState(0);
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
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
      paddingRight: 3,
    },
    cont1: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      position: "absolute",
      top: 100,
    },
    cont2: {
      width: isTabletOrMobile ? "95%" : "60%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
      textAlign: "",
      color: "white",
      fontSize: isTabletOrMobile ? 35 : 50,
    },
    txt2: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "right",
      color: "white",
      fontSize: isTabletOrMobile ? 12 : 16,
      marginBottom: isTabletOrMobile ? 7 : 15,
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
      marginTop: "10px",
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
    },
    rangetxt: {
      fontSize: isTabletOrMobile ? 11 : 13,
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
      marginTop: "10px",
    },
    tcont1: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      color: "white",
      fontSize: "15px",
      marginTop: "20px",
      marginBottom: "8px",
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
 //console.log("sadapay",selectedSeries)
}, [])

  // STYLES <<<<<<<<<<

  return (
    <>
      <div className="wrapper" style={{}}>
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
              episodesss?.currentEpisode?.image

            }
            alt=""
          />
        </div>
        <div style={styles.cont1}>
          <div style={styles.cont2}>
         
              <img
              style={{ width: "100%", height: isTabletOrMobile ? 250 : 700 }}
              src={
                "https://podcasts.cucurico.co.il/podcast/public/images/" +
                // selectedSeriesData?.profile_image
                episodesss?.currentEpisode?.image
              }
              alt=""
            />
         
            <div className="absoluteImage" style={styles.cont3}>
              <div
                className="absoluteImageText"
                style={{
                  position: "absolute",
                  width: isTabletOrMobile ? "90%" : "55%",
                  marginBottom: isTabletOrMobile ? 0 : 17.4,
                }}
              >
                <div style={styles.txt1}>{episodesss?.currentEpisode?.series?.name}</div>
                <div style={styles.txt2}>
                  {episodesss?.currentEpisode?.name}
                </div>
                {isTabletOrMobile && (
                  <div style={styles.txt3}>עם: אריה ארליך, מוישה ויסברג</div>
                )}
                {isTabletOrMobile && (
                  <div style={styles.txt4}>
                    חסידות • הסטוריה • יהדות | 4 פרקים
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
                          width: "35%",
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
                          width: "10%",
                          height: active == 0 ? 2.5 : 1.5,

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
                        marginTop: 17,
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          // display: "flex",
                          // justifyContent: "center",
                          // alignItems: "flex-end",
                          textAlign: "right",
                          fontSize: 13,
                          width: "50%",
                        }}
                      >
                        {active == 1
                          ? episodesss?.currentEpisode?.series?.about_series
                          : episodesss?.currentEpisode?.description}

                        {/* מסע מרתק וייחודי אל סודות האדמו"רים וחצרות החסידות. מסע
                        מרתק וייחודי אל סודות האדמו"רים וחצרות החסידות מסע מרתק */}
                      </div>
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
                  background: "#161616",
                  // paddingRight: 15,
                  // paddingLeft: 15,
                  display: "flex",
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
                          fontSize: 12,
                          cursor: "pointer",
                          paddingRight: 30,
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
                          color: "white",
                          fontSize: 12,
                          cursor: "pointer",
                          paddingRight: 3,
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
                        width: "25%",
                        height: active == 0 ? 2.5 : 1.5,

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
                    <div
                      style={{
                        color: "white",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "flex-end",
                        textAlign: "right",
                        fontSize: 10,
                        width: "80%",
                        marginBottom: 30,
                      }}
                    >
                      {active == 1
                        ? episodesss?.currentEpisode?.series?.about_series
                        : episodesss?.currentEpisode?.description}

                      {/* מסע מרתק וייחודי אל סודות האדמו"רים וחצרות החסידות. מסע
                        מרתק וייחודי אל סודות האדמו"רים וחצרות החסידות מסע מרתק */}
                    </div>
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
                background: darkMode ? "#252525" : "none",
                // background: "red",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                marginBottom: 100,
              }}
            >
              <div
                style={{
                  marginTop: "35px",
                  marginBottom: "15px",
                  width: "80%",
                  height: "80px",
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
                  marginBottom: "8px",
                  width: "96%",
                  display: "flex",
                  justifyContent: "flex-end",
                  color: darkMode ? "#FFFFFF" : "#212121",
                }}
              >
                <div>כל הפרקים</div>
              </div>
              {episodesss?.episodes?.map((item, index) => {
                return (
                  <>
                    <div
                      style={{
                        cursor: "pointer",
                        width: "100%",
                      }}
                      onClick={() => {
                        setSelectedEpisodeIndex(index);
                        disptach(setPlayingEpisode({song: item?.url, index: item.ep_number}));
                        disptach(setPlayingEpisodeData(item))
                        console.log("laila",episodesss)
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
                            darkMode && index == selectedEpisodeIndex
                              ? "#1a1a1a"
                              : !darkMode && index == selectedEpisodeIndex
                              ? "#f9f3f2"
                              : darkMode
                              ? "#252525"
                              : "#fff",
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
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                color: darkMode ? "#777777" : "#484848",
                              }}
                            >
                              {item?.duration}
                            </div>
                            <div
                              style={{
                                width: "80%",
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
                              fontSize: 12,
                              color: darkMode ? "#FFFFFF" : "#212121",
                            }}
                          >
                            {item?.description}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              marginTop: "6px",
                              color: darkMode ? "#777777" : "#484848",
                            }}
                          >
                            {item?.author_name}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              marginTop: "6px",
                              color: darkMode ? "#777777" : "#484848",
                            }}
                          >{
                            format(new Date(item?.created_at), 'dd.MM.yyyy')
                          }
                            {/* {item?.created_at} */}
                          </div>
                          <div
                            style={{
                              color: "#E97B65",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: 11,
                              marginTop: "2px",
                            }}
                          >
                            שיתוף
                            <div>
                              <img
                                style={{
                                  width: "16px",
                                  height:"16px",
                                  objectFit:"contain",
                                  marginLeft: "4px",
                                }}
                                src={
                                  roundArrow
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <img
                          style={{
                            width: isTabletOrMobile ? 60 : 200,
                            display: "flex",
                            justifyContent: "flex-end",
                            height: isTabletOrMobile ? 60 : 170,
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
                      <div
                        style={{
                          width: "96%",
                          marginLeft: "2%",
                          background:
                            index == selectedSeries.length - 1
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
              })}
          
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

        {/* <div
          className="marginDiv"
          style={{
            width: "100%",
            background: darkMode ? "#1A1A1A" : "#F5F5F5",
            top: "140px",
            display: "flex",

            justifyContent: "center",
          }}
        ></div> */}
      </div>
    </>
  );
};

export default Players;



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
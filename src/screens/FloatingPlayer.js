import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.css";
import { ThemeContext } from "../components/ThemeContext";
import img11 from "../images/img11.png";
import img12 from "../images/img12.png";
import img13 from "../images/img13.png";
import img21 from "../images/img21.png";
import crossSign from "../images/crossSign.png";
import { Link, useNavigate } from "react-router-dom";
import img22 from "../images/img22.png";
import img23 from "../images/img23.png";
import heart from "../images/heart.png";
import plusHeart from "../images/plusHeart.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pauseLogo from "../images/pauseLogo.png";
import playLogo from "../images/playLogo.png";
import next from "../images/next.png";
import prev from "../images/prev.png";
import soundIcon from "../images/soundIcon.png";
import speedicon from "../images/speed.png";
import forward from "../images/forward.png";
import { useSelector, useDispatch } from "react-redux";
import backward from "../images/backward.png";
import playerRightImg from "../images/playerRightImg.png";
import { useMediaQuery } from "react-responsive";
import {
  setPlayingEpisode,
  setPlayingEpisodeData,
} from "../features/playingEpisode";
import { useTheme } from "../components/ThemeContext";
import "./floatingPlayer.css";
const FloatingPlayer = ({
  audioRef,
  currentTime,
  duration,
  handleSeek,
  togglePlay,
  isPlaying,
  skipForward,
  skipBackward,
  volume,
  setVolume,
  speed,
  setSpeed,
  setIsPlaying,
}) => {
  const isIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
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
  const navigate = useNavigate();
  const playingSong = useSelector(
    (state) => state.seriesEpisodes.currentEpisode
  );
  const {
    darkMode,
    setDarkMode,
    showPlayer,
    setShowPlayer,
    currentSong,
    setCurrentSong,
    selectedSeries,
    selectedEpisodeIndex,
    selectedSeriesData,
  } = useContext(ThemeContext);
  const volumeBarRef = useRef(null);
  const handleVolumeBarChange = (event) => {
    audioRef.current.volume = event.target.value / 100;
    setVolume(event.target.value);
  };
  const theme = useTheme();
  const episodesss = useSelector((state) => state.seriesEpisodes);
  //console.log("sharjeeel",episodesss)
  const dispatch = useDispatch();
  const [currentEp, setCurrentEp] = useState(
    episodesss?.currentEpisode?.ep_number
  );
  //console.log("")
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <>
      {showPlayer &&
        (isTabletOrMobile ? (
          <div
            className="floating-bottom-container"
            style={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              background: "#fff",
              flexDirection: "column",
              width: "100%",

              paddingBottom: 15,
            }}
          >
            <div
              style={{
                background: "#e97b65",
                height: 5,
                width: "100%",
                marginBottom: 15,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "98%",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 12 }}>{speed} x</div>
                  <div
                    onClick={() => {
                      if (audioRef.current.playbackRate == 1) {
                        setSpeed(1.5);
                        audioRef.current.playbackRate = 1.5;
                      } else if (audioRef.current.playbackRate == 1.5) {
                        setSpeed(2);
                        audioRef.current.playbackRate = 2;
                      } else if (audioRef.current.playbackRate == 2) {
                        setSpeed(1);
                        audioRef.current.playbackRate = 1;
                      }
                    }}
                  >
                    <img
                      src={speedicon}
                      style={{
                        width: 24,
                        height: 24,
                        marginTop: 3,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    onClick={() => {
                      //console.log("wwqqeqwewqeqwe")
                      // if (episodesss?.playingEpisode.index >= 0 ) {
                      if (episodesss.episodes.length > 0 && currentEp >= 1) {
                        //console.log("wwqqeqwewqeqwe")
                        audioRef?.current?.pause();
                        audioRef.current.currentTime = 0;
                        //console.log("currentSong", episodesss?.playingEpisode.index);
                        // //console.log("currentSong", episodesss.playingEpisode);
                        setCurrentEp(parseInt(currentEp) - 1);
                        //console.log("currentSong", episodesss.currentEpisode.ep_number);
                        var currentSong = episodesss.currentEpisode.ep_number;
                        //console.log("currentSong", currentEp);
                        currentSong++;
                        //console.log("currentSong", episodesss.episodes);
                        const nextSong = episodesss.episodes.find(
                          (obj) => obj.ep_number == currentEp
                        );
                        //console.log("currentSong", nextSong);
                        setTimeout(() => {
                          dispatch(
                            setPlayingEpisode({
                              song: nextSong?.url,
                              index: nextSong.ep_number,
                            })
                          );
                          dispatch(setPlayingEpisodeData(nextSong));
                          //  dispatch( setPlayingEpisode({
                          //       song:episodesss.episodes[episodesss.playingEpisode.index - 1]?.url ,
                          //       index: episodesss.playingEpisode.index - 1,
                          //     }))

                          // setCurrentSong({
                          //   song: selectedSeries[currentSong.index - 1]?.url,
                          //   index: currentSong.index - 1,
                          // });
                        }, 100);
                        //console.log("qwqwewqewqeqwewqewqewqewqeqwqweqweqwe",episodesss.playingEpisode,episodesss.episodes.length )

                        setTimeout(() => {
                          audioRef.current.play();
                          setIsPlaying(true);

                          // navigate("/player");
                        }, 200);
                      }
                    }}
                  >
                    <img
                      src={prev}
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 15,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div
                    onClick={() => {
                      skipBackward();
                    }}
                  >
                    <img
                      src={backward}
                      style={{
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div
                    onClick={() => {
                      if (
                        !audioRef?.current?.paused &&
                        !audioRef?.current?.ended
                      ) {
                        setIsPlaying(false);
                        audioRef?.current?.pause();
                      } else {
                        audioRef?.current?.play();
                        setIsPlaying(true);
                      }
                    }}
                    style={{
                      marginRight: 27,
                      marginLeft: 27,
                    }}
                  >
                    {isPlaying ? (
                      <img
                        src={pauseLogo}
                        style={{
                          width: 42,
                          height: 42,
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <img
                        src={playLogo}
                        style={{
                          width: 42,
                          height: 42,
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                  <div
                    onClick={() => {
                      skipForward();
                    }}
                  >
                    <img
                      src={forward}
                      style={{
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div
                    onClick={() => {
                      if (
                        episodesss.episodes.length > 0 &&
                        currentEp <= episodesss.episodes.length
                      ) {
                        audioRef?.current?.pause();
                        audioRef.current.currentTime = 0;
                        setCurrentEp(parseInt(currentEp) + 1);
                        //console.log("currentSong", episodesss.currentEpisode.ep_number);
                        var currentSong = episodesss.currentEpisode.ep_number;
                        //console.log("currentSong", currentEp);
                        currentSong++;
                        //console.log("currentSong", episodesss.episodes);
                        const nextSong = episodesss.episodes.find(
                          (obj) => obj.ep_number == currentEp
                        );
                        //console.log("currentSong", nextSong);

                        setTimeout(() => {
                          dispatch(
                            setPlayingEpisode({
                              song: nextSong?.url,
                              index: nextSong?.ep_number,
                            })
                          );
                          dispatch(setPlayingEpisodeData(nextSong));
                          // dispatch(    setPlayingEpisode({
                          //       song:episodesss.episodes[parseInt(episodesss.playingEpisode.index) + parseInt(1)]?.url ,
                          //       index: parseInt(episodesss.playingEpisode.index ) + parseInt(1),
                          //     }))
                          //console.log("qwqwewqewqeqwewqewqewqewqeqwqweqweqwe",episodesss.playingEpisode,episodesss.episodes.length )
                          // setCurrentSong({
                          //   song: selectedSeries[currentSong.index + 1]?.url,
                          //   index: currentSong.index + 1,
                          // });
                        }, 100);

                        setTimeout(() => {
                          audioRef.current.play();
                          setIsPlaying(true);

                          // navigate("/player");
                        }, 200);
                      }
                    }}
                  >
                    <img
                      src={next}
                      style={{
                        width: 24,
                        height: 24,
                        marginLeft: 15,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                <div
                  onClick={() => {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setShowPlayer(false);
                  }}
                >
                  <img
                    src={crossSign}
                    style={{
                      width: 14,
                      height: 14,
                      cursor: "pointer",

                      //   marginTop: 3,
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#212121",
                  }}
                >
                  {formatTime(currentTime)}
                </div>

                <input
                  type="range"
                  
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  style={{
                    height: 3,
                    width: "75%",
                    appearance: "none",
                    borderRadius: "5px",
                    background: `linear-gradient(to right, #E97B65 0%, #E97B65 ${
                      (currentTime / duration) * 100
                    }%, #eaeaea ${
                      (currentTime / duration) * 100
                    }%, #eaeaea 100%)`,
                    marginLeft: "4%",
                    marginRight: "4%",
                    cursor: "pointer",
                    alignItems:"flex-end"
                  }}
                  className="other-range"
                />
                <div
                  style={{
                    fontSize: 10,
                    color: "#212121",
                  }}
                >
                  {formatTime(duration - currentTime)}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: 5,
              }}
            >
              {isIOS() ? (
                <div style={{ width: "20%" }} />
              ) : (
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    width: "30%",
                  }}
                >
                  <img
                    src={soundIcon}
                    style={{
                      width: 13,
                      height: 13,
                      marginLeft: 7,
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="range"
                    ref={volumeBarRef}
                    value={volume}
                    min="0"
                    max="100"
                    onChange={handleVolumeBarChange}
                    style={{
                      height: 3,
                      width: "70%",
                      marginLeft: "2%",
                      appearance: "none",
                      borderRadius: "5px",
                      background: `linear-gradient(to right, #E97B65 0%, #E97B65 ${volume}%, #eaeaea ${volume}%, #eaeaea 100%)`,
                      cursor: "pointer",
                    }}
                    className="custom-range"
                  />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginRight: 7,
                  width: "70%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "end",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {/* צמרמורת אוחזת בבשרי */}
                    {selectedSeriesData?.name}
                  </div>
                  <div
                    style={{
                      color: "#E97B65",
                      fontSize: 12,
                      marginTop: 3,
                      marginBottom: 3,
                    }}
                  >
                    {/* קורת רוח | פרק 17 */}
                    {selectedSeries[selectedEpisodeIndex]?.name}
                  </div>
                  <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginTop: 5,
                        color: darkMode ? "#fff" : "#212121",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {episodesss?.currentEpisode?.series?.name}
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        fontSize: "11px",
                        color: darkMode ? "#fff" : "#E97B65",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {episodesss?.currentEpisode.series?.description}
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        color: darkMode ? "#777777" : "#E97B65",
                        fontSize: 12,

                        textAlign: "right",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      With :{episodesss?.currentEpisode.series?.presenter}
                    </div>
                 
                  <div
                    style={{
                      display: "flex",
                      textAlign: "end",
                      justifyContent: "flex-end",
                      gap: "5px",
                      marginTop:10,
                      marginBottom:5,
                    }}
                  >
                    <img
                      style={{ width: 13.5, cursor: "pointer" }}
                      src={plusHeart}
                      alt=""
                    />

                    <img
                      style={{ width: 13.5, cursor: "pointer" }}
                      src={heart}
                      alt=""
                    />
                  </div>
                  <div>
                    {" "}
                  
           
                    {/* <div
                      style={{
                        marginTop: 2,
                        color: "#777777",
                        textAlign: "right",

                        fontSize: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                  
                      {episodesss?.currentEpisode.series?.duration}
                  
                    </div> */}
                  </div>
                </div>    {/* {item?.tags.map((item,index)=>{return <span key={index}>{item.name} </span>})} */}
                      {/* {`${"00:41:55"}`} */}    {/* {episodesss?.currentEpisode.series?.tags[0].name} */}{" "}
                <img
                  style={{
                    width: 100,
                    height: 65,
                    borderRadius: 6,
                    cursor: "pointer",
                  
                  }}
                  src={
                    "https://podcasts.cucurico.co.il/podcast/public/images/" +
                    episodesss?.currentEpisode?.image
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="floating-bottom-container"
            style={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              background: "#fff",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "#e97b65",
                height: 5,
                width: "100%",
              }}
            />
            <div
              style={{
                paddingRight: "2%",
                paddingLeft: "2%",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 130,
                  background: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    // marginTop: height * 0.065,
                    flexDirection: "column",
                    marginRight: "8%",
                  }}
                >
                  <div
                    onClick={() => {
                      audioRef.current.pause();
                      audioRef.current.currentTime = 0;
                      setShowPlayer(false);
                    }}
                  >
                    <img
                      src={crossSign}
                      style={{
                        width: 16,
                        height: 16,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      marginTop: 40,
                    }}
                  >
                    <img
                      src={soundIcon}
                      style={{
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                      }}
                    />
                    <input
                      type="range"
                      ref={volumeBarRef}
                      value={volume}
                      min="0"
                      max="100"
                      onChange={handleVolumeBarChange}
                      style={{
                        cursor: "pointer",
                        height: 3,
                        width: 130,
                        marginLeft: "10%",
                        appearance: "none",
                        borderRadius: "5px",
                        background: `linear-gradient(to right, #E97B65 0%, #E97B65 ${volume}%, #eaeaea ${volume}%, #eaeaea 100%)`,
                      }}
                      className="custom-range"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          marginRight: 20,
                        }}
                      >
                        {speed} x
                      </div>
                      <div
                        onClick={() => {
                          if (audioRef.current.playbackRate == 1) {
                            setSpeed(1.5);
                            audioRef.current.playbackRate = 1.5;
                          } else if (audioRef.current.playbackRate == 1.5) {
                            setSpeed(2);
                            audioRef.current.playbackRate = 2;
                          } else if (audioRef.current.playbackRate == 2) {
                            setSpeed(1);
                            audioRef.current.playbackRate = 1;
                          }
                        }}
                      >
                        <img
                          src={speedicon}
                          style={{
                            width: 30,
                            height: 30,
                            marginRight: 25,
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (currentSong.index != 0) {
                          audioRef?.current?.pause();
                          audioRef.current.currentTime = 0;

                          setCurrentSong({
                            song: selectedSeries[currentSong.index - 1]?.url,
                            index: currentSong.index - 1,
                          });
                          setTimeout(() => {
                            audioRef.current.play();
                            setIsPlaying(true);

                            // navigate("/player");
                          }, 200);
                        }
                      }}
                    >
                      <img
                        src={prev}
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 25,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        skipBackward();
                      }}
                    >
                      <img
                        src={backward}
                        style={{
                          width: 30,
                          cursor: "pointer",

                          height: 30,
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        if (
                          !audioRef?.current?.paused &&
                          !audioRef?.current?.ended
                        ) {
                          setIsPlaying(false);
                          audioRef?.current?.pause();
                        } else {
                          setIsPlaying(true);
                          audioRef?.current?.play();
                        }
                      }}
                      style={{
                        marginRight: 35,
                        marginLeft: 35,
                      }}
                    >
                      {isPlaying ? (
                        <img
                          src={pauseLogo}
                          style={{
                            width: 55,
                            height: 55,
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          src={playLogo}
                          style={{
                            width: 55,
                            height: 55,
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </div>
                    <div
                      onClick={() => {
                        skipForward();
                      }}
                    >
                      <img
                        src={forward}
                        style={{
                          width: 30,
                          height: 30,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        if (currentSong.index != selectedSeries.length - 1) {
                          audioRef.current.currentTime = 0;

                          audioRef?.current?.pause();

                          setCurrentSong({
                            song: selectedSeries[currentSong.index + 1]?.url,
                            index: currentSong.index + 1,
                          });
                          setTimeout(() => {
                            audioRef.current.play();
                            setIsPlaying(true);
                            // navigate("/player");
                          }, 200);
                        }
                      }}
                    >
                      <img
                        src={next}
                        style={{
                          width: 30,
                          height: 30,
                          marginLeft: 25,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        marginLeft: 25,
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: "#212121",
                      }}
                    >
                      {formatTime(currentTime)}
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      style={{
                        height: 3,
                        width: width * 0.36,
                        appearance: "none",
                        borderRadius: "5px",
                        background: `linear-gradient(to right, #E97B65 0%, #E97B65 ${
                          (currentTime / duration) * 100
                        }%, #eaeaea ${
                          (currentTime / duration) * 100
                        }%, #eaeaea 100%)`,
                        marginLeft: 20,
                        marginRight: 20,
                        cursor: "pointer",
                      }}
                      className="custom-range"
                    />
                    <div
                      style={{
                        fontSize: 13,
                        color: "#212121",
                      }}
                    >
                      {formatTime(duration)}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => {
                    // audioRef.current.currentTime = 0;
                    // audioRef.current.pause();
                    // setShowPlayer(false);
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "end",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        {/* צמרמורת אוחזת בבשרי */}
                        {/* {selectedSeries[selectedEpisodeIndex]?.name} */}

                        {/* {selectedSeriesData?.name} */}
                        {episodesss?.currentEpisode.series?.name}
                      </div>
                      <div
                        style={{
                          color: "#E97B65",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      >
                        {/* קורת רוח | פרק 17 */}
                        {/* {selectedSeries[selectedEpisodeIndex]?.name} */}
                        {/* {episodesss?.currentEpisode.series?.description} */}
                        With :{episodesss?.currentEpisode.series?.presenter}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          textAlign: "end",
                          justifyContent: "flex-end",
                          gap: "7px",
                        }}
                      >
                        <img
                          style={{ width: 20, cursor: "pointer" }}
                          src={plusHeart}
                          alt=""
                        />

                        <img
                          style={{ width: 20, cursor: "pointer" }}
                          src={heart}
                          alt=""
                        />
                      </div>
                    </div>
                    <img
                      style={{
                        width: 150,
                        borderRadius: 8,
                        height: 115,
                        cursor: "pointer",
                      }}
                      src={
                        "https://podcasts.cucurico.co.il/podcast/public/images/" +
                        episodesss?.currentEpisode?.image
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FloatingPlayer;

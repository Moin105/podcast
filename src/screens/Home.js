import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../components/ThemeContext";
import Header from "../components/Header";
import img11 from "../images/img11.png";
import img12 from "../images/img12.png";
import img13 from "../images/img13.png";
import img21 from "../images/img21.png";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import img22 from "../images/img22.png";
import img23 from "../images/img23.png";
import dot from "../images/dot.png";
import { useMediaQuery } from "react-responsive";
import FloatingPlayer from "./FloatingPlayer";
import Footer from "./Footer";
import ListRenderOne from "./ListRenderOne";
import ListRenderTwo from "./ListRenderTwo";

import axios from "axios";
import ActivityIndicator from "./ActivityIndicator";
import Card from "./Card";
import { useTheme } from "../components/ThemeContext";
const Home = ({
  audioRef,
  currentTime,
  duration,
  handleSeek,
  togglePlay,
  isPlaying,
  skipForward,
  setIsPlaying,
  skipBackward,
  volume,
  setVolume,
  speed,
  setSpeed,
}) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const navigate = useNavigate();
  const {
    carousels,
    setCarousels,
    series,
    setSeries,
    completeCarousels,
    setCompleteCarousels,
    filteredCarousels,
    setFilteredCarousels,
  } = useContext(ThemeContext);
  const theme = useTheme()
  const [loading, setLoading] = useState(false);
  const [carouselList, setCarouselList] = useState([]);
  function mergeSeriesIntoCarousel(carouselList, seriesList) {
    return carouselList.map((carouselItem) => {
      const matchingSeries = seriesList.filter(
        (seriesItem) => seriesItem.carousel_id === carouselItem.id
      );
      if (matchingSeries.length > 0) {
        return {
          ...carouselItem,
          subData: matchingSeries,
        };
      }
      return carouselItem;
    });
  }
  // http://192.168.18.82:8000/
  const getCarousels = async () => {
    setLoading(true);
    await axios
      // .get("https://podcasts.cucurico.co.il/podcast/publicapi/carousel")
      .get("https://podcasts.cucurico.co.il/podcast/public/api/carousel")
      .then((response) => {
        setLoading(false);
        getSeries(response?.data?.data);
        setCarouselList(response?.data?.data);
        ////console.log("THE CAROUSELS -------------", response?.data?.data);
        ////console.log("THE CAROUSELS -------------", carouselList);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  const getSeries = async (carouselData) => {
    setLoading(true);
    await axios
      // .get("https://podcasts.cucurico.co.il/podcast/publicapi/series")
      .get("https://podcasts.cucurico.co.il/podcast/public/api/series")
      .then((response) => {
        let mergedData = mergeSeriesIntoCarousel(
          carouselData,
          response?.data?.data
        );
        setCompleteCarousels(mergedData);
        setFinalArray(mergedData);
        setLoading(false);
        ////console.log("THE MERGED DATA -------------", mergedData);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const [finalArray, setFinalArray] = useState([{s:"w"}]);
  useEffect(() => {
    getCarousels();
    // getSeries();
    // Fetch data from the API
  }, []); // Empty dependency array to run the effect only once

  // useEffect(() => {
  //   if (filteredCarousels) {
  //     setFinalArray(filteredCarousels);
  //   } else {
  //     setFinalArray(completeCarousels);
  //   }
  // }, [filteredCarousels]);

  const {
    darkMode,
    setDarkMode,
    showPlayer,
    setShowPlayer,
    currentSong,
    setCurrentSong,
  } = useContext(ThemeContext);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const customDivMargin = isTabletOrMobile ? 15 : 50;

  return (
    <>
      {loading ? (
        <div
          style={{
            background: darkMode ? "#1A1A1A" : "#fff",
            minHeight: "100vh",
          }}
        >
          <Header list={finalArray} />
          {/* <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            style={{
              margin:"0px 0px 0px 50px "
            }}
          >
            SWITCH MODE
          </button> */}
          <div style={{ marginTop: 250 }}>
            <ActivityIndicator isLoading={loading} />
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              background: darkMode ? "#1A1A1A" : "#fff",
              minHeight: "100vh",
            }}
          >
            <Header />
            {/* <button
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              style={{
                margin:"0px 0px 0px 50px "
              }}
            >
              SWITCH MODE
            </button> */}
            <div className="">
              {carouselList.map((item, index) => {
                return (
                  <div className="upper-row" key={index}>
                  
                    <div
                      className="dots-heading"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img src={dot} alt="" style={{width:"9px",height:"9px"}}/>
                      <div
                        className="figee"
                        style={{
                          fontSize: 21,
                          fontWeight: "bold",
                          color: darkMode ? "#fff" : "#212121",
                        }}
                      >  {item.carousel.name}</div>
                      <img src={dot} alt="" style={{width:"9px",height:"9px"}}/>
                    </div>
                    <div
                      style={{
                        margin: "0px",
                        fontSize: 13,
                        fontWeight: "400",
                        marginTop: height * 0.005,
                        color: darkMode ? "#dddddd" : "#212121",
                        width: "300px", 
                        textAlign:"end",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap", 
                      }}
                    >{item.carousel.short_description}</div>
                    <div
                      // style={{
                      //   marginRight: customDivMargin,
                      // }}
                      className="row"
                    >
                      <Card 
                        item={item}   
                         audioRef={audioRef}
                         setVolume={setVolume}
                         list={item?.subData}
                         volume={volume}
                         setIsPlaying={setIsPlaying}
                      />
                      {/* <ListRenderOne
                        item={item}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={item?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      /> */}
                    </div>
                  </div>
                );

                // if(item.carousel.length > 0 ){
                //   return  <div  className="upper-row" key={index}>
                //    {item.carousel.name  }
                //         <div
                //           className="dots-heading"
                //           style={{
                //             display: "flex",
                //             justifyContent: "center",
                //             alignItems: "center",
                //             gap: "5px",
                //           }}
                //         >
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //           <div
                //             className="figee"
                //             style={{
                //               fontSize: 21,
                //               fontWeight: "bold",
                //               color: darkMode ? "#fff" : "#212121",
                //             }}
                //           >

                //           </div>
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //         </div>
                //         <div
                //           style={{
                //             margin: "0px",
                //             fontSize: 13,
                //             fontWeight: "400",
                //             marginTop: height * 0.005,
                //             color: darkMode ? "#dddddd" : "#212121",
                //           }}
                //         >

                //         </div>
                //       </div>

                // }if(item.categories.length > 0 ){
                //    return  <div  className="upper-row" key={index}>
                //     {item.carousel.name}
                //        <div
                //           className="dots-heading"
                //           style={{
                //             display: "flex",
                //             justifyContent: "center",
                //             alignItems: "center",
                //             gap: "5px",
                //           }}
                //         >
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //           <div
                //             className="figee"
                //             style={{
                //               fontSize: 21,
                //               fontWeight: "bold",
                //               color: darkMode ? "#fff" : "#212121",
                //             }}
                //           >

                //           </div>
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //         </div>
                //         <div
                //           style={{
                //             margin: "0px",
                //             fontSize: 13,
                //             fontWeight: "400",
                //             marginTop: height * 0.005,
                //             color: darkMode ? "#dddddd" : "#212121",
                //           }}
                //         >

                //         </div>
                //       </div>
                // }
                // if(item.series.length > 0 ){
                //      return  <div  className="upper-row" key={index}>
                //       {item.carousel.name}
                //      <div
                //           className="dots-heading"
                //           style={{
                //             display: "flex",
                //             justifyContent: "center",
                //             alignItems: "center",
                //             gap: "5px",
                //           }}
                //         >
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //           <div
                //             className="figee"
                //             style={{
                //               fontSize: 21,
                //               fontWeight: "bold",
                //               color: darkMode ? "#fff" : "#212121",
                //             }}
                //           >

                //           </div>
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //         </div>
                //         <div
                //           style={{
                //             margin: "0px",
                //             fontSize: 13,
                //             fontWeight: "400",
                //             marginTop: height * 0.005,
                //             color: darkMode ? "#dddddd" : "#212121",
                //           }}
                //         >

                //         </div>

                //       </div>
                // }
                // if(item.episodes.length > 0 ){

                //     return  <div  className="upper-row" key={index}>
                //     {item.carousel.name}
                //       <div
                //           className="dots-heading"
                //           style={{
                //             display: "flex",
                //             justifyContent: "center",
                //             alignItems: "center",
                //             gap: "5px",
                //           }}
                //         >
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //           <div
                //             className="figee"
                //             style={{
                //               fontSize: 21,
                //               fontWeight: "bold",
                //               color: darkMode ? "#fff" : "#212121",
                //             }}
                //           >

                //           </div>
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //         </div>
                //         <div
                //           style={{
                //             margin: "0px",
                //             fontSize: 13,
                //             fontWeight: "400",
                //             marginTop: height * 0.005,
                //             color: darkMode ? "#dddddd" : "#212121",
                //           }}
                //         >

                //         </div>

                //       </div>
                // }
                // if(item.tags.length > 0 ){
                //      return  <div  className="upper-row" key={index}>
                //     <div
                //           className="dots-heading"
                //           style={{
                //             display: "flex",
                //             justifyContent: "center",
                //             alignItems: "center",
                //             gap: "5px",
                //           }}
                //         >
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //           <div
                //             className="figee"
                //             style={{
                //               fontSize: 21,
                //               fontWeight: "bold",
                //               color: darkMode ? "#fff" : "#212121",
                //             }}
                //           >

                //           </div>
                //           <img
                //             src={dot}
                //             alt=""

                //           />
                //         </div>
                //         <div
                //           style={{
                //             margin: "0px",
                //             fontSize: 13,
                //             fontWeight: "400",
                //             marginTop: height * 0.005,
                //             color: darkMode ? "#dddddd" : "#212121",
                //           }}
                //         >

                //         </div>
                //       </div>
                // }
              })}
            </div>
            <div>
              {finalArray?.map((item, index) => {
                ////console.log("SUBDATA =============", item);
                // return (
                //   <div
                //     style={{
                //       marginRight: customDivMargin,
                //     }}
                //     className="row"
                //   >
                //     <div
                //       style={{
                //         // paddingRight: "60px",
                //         display: "flex",
                //         flexDirection: "column",
                //         alignItems: "end",
                //         justifyContent: "center",
                //         marginTop: "50px",
                //       }}
                //     >
                //       <div
                //         className="dots-heading"
                //         style={{
                //           display: "flex",
                //           justifyContent: "center",
                //           alignItems: "center",

                //           gap: "5px",
                //         }}
                //       >
                //         <img
                //           src={dot}
                //           alt=""
                //           style={
                //             darkMode
                //               ? {
                //                   filter: "grayscale(100%)",
                //                 }
                //               : {}
                //           }
                //         />
                //         <div
                //           className="figee"
                //           style={{
                //             // marginTop: "70px",
                //             // paddingRight: "55px",
                //             fontSize: 21,
                //             fontWeight: "bold",
                //             color: darkMode ? "#fff" : "#212121",
                //           }}
                //         >
                //           {/* פרקים חדשים */}
                //           {item?.name}
                //         </div>
                //         <img
                //           src={dot}
                //           alt=""
                //           style={
                //             darkMode
                //               ? {
                //                   filter: "grayscale(100%)",
                //                 }
                //               : {}
                //           }
                //         />
                //       </div>
                //       <div
                //         style={{
                //           // marginBottom: "5px",
                //           margin: "0px",
                //           fontSize: 13,
                //           fontWeight: "400",
                //           marginTop: height * 0.005,
                //           color: darkMode ? "#dddddd" : "#212121",
                //         }}
                //       >
                //         {item?.short_description}
                //       </div>
                //     </div>
                //     {/* {item?.type == "Episode" ? (
                //       <ListRenderOne
                //         audioRef={audioRef}
                //         setVolume={setVolume}
                //         list={item?.subData}
                //         volume={volume}
                //         setIsPlaying={setIsPlaying}
                //       />
                //     ) : (
                //       <ListRenderTwo
                //         audioRef={audioRef}
                //         setVolume={setVolume}
                //         list={item?.subData}
                //         volume={volume}
                //         setIsPlaying={setIsPlaying}
                //       />
                //     )} */}
                //   </div>
                // );
              })}
            </div>
            {!loading && (
              <div style={{ marginTop: 30 }}>
                <Footer />
              </div>
            )}
          </div>
          <FloatingPlayer
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
            handleSeek={handleSeek}
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            skipForward={skipForward}
            skipBackward={skipBackward}
            volume={volume}
            setVolume={setVolume}
            speed={speed}
            setSpeed={setSpeed}
            setIsPlaying={setIsPlaying}
          />
        </>
      )}
    </>
  );
};

export default Home;

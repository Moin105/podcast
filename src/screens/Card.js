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

function Card({ audioRef, setVolume, list, volume, setIsPlaying,item }) {
  const { categories, episodes, series, tags,id } = item;

    //console.log(categories);
  //console.log("datta",item.categories);
  const idArray = categories.map(category => ({ id: category.id }));
  //console.log("juni",idArray);
  //   //console.log(series);
  //   //console.log(tags);
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
      //console.log("THE LIST ========epsiode==", episode);
    }
    else if (category && category.length > 0) {
      //console.log("THE LIST ========wakawaka==", category);
    } else if (serie && serie.length > 0) {
      //console.log("THE LIST ========wakawaka==", serie);
    } else if (tag && tag.length > 0) {
      //console.log("THE LIST ========wakawaka==", tag);
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
          if(response.data.data.length>0 && response.data.data !== [] && response.data.data !== null){
              setTagEpisode( response.data.data);
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
const fetchResponses = async () => {
    const responses = await Promise.all(idArray.map(id => postSeries(id.id)));
    setCategorySeries(responses);
}
useEffect(() => {
      postData();   
      fetchResponses();
}, [tags])

  return (
    <>
      <Draggable>
        {episode && episode.length > 0
          ? episode.map((epos, index) => {
        // console.log("epos",epos);
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
            //     <>
            //     {" "}
            //     <div
            //       key={index}
            //       style={{
            //         width: customWidth,
            //         marginLeft: 10,
            //       }}
            //     >
            //       <div
            //         style={{
            //           marginTop: 10,
            //           color: "#000",
            //         }}
            //       ></div>
            //       <div
            //         style={{
            //           width: customWidth,
            //           height: customHeight,
            //         }}
            //       >
            //         <div
            //           style={{
            //             position: "absolute",
            //             alignItems: "center",
            //             justifyContent: "center",
            //             display: "flex",
            //             width: customWidth,
            //             height: customHeight,
            //           }}
            //         >
            //           <div
            //           // onClick={() => {
            //           //   setCurrentSong({
            //           //     song: item?.url,
            //           //     index: 0,
            //           //   });
            //           //   if (index == selectedEpisodeIndex) {
            //           //     setSelectedSeries(item?.episodes);
            //           //     setSelectedEpisodeIndex(0);
            //           //     const { episodes, ...selectedSeriesData } = item;
            //           //     setSelectedSeriesData(selectedSeriesData);
            //           //   } else {
            //           //     audioRef.current.pause();
            //           //     audioRef.current.currentTime = 0;
            //           //     setSelectedSeries(item?.episodes);
            //           //     setSelectedEpisodeIndex(0);
            //           //     const { episodes, ...selectedSeriesData } = item;
            //           //     setSelectedSeriesData(selectedSeriesData);
            //           //   }

            //           //   setTimeout(() => {
            //           //     navigate("/player");
            //           //     // setShowPlayer(true);
            //           //   }, 500);
            //           // }}
            //           // onMouseEnter={() => handleMouseEnter(index)}
            //           // onMouseLeave={handleMouseLeave}
            //           // style={{
            //           //   width: 75,
            //           //   height: 75,
            //           //   position: "absolute",
            //           //   cursor: "pointer",
            //           // }}
            //           />
            //         {hoveredIndex === index && (
            //             <img
            //               src={hoverImg}
            //               style={{
            //                 width: customWidth,
            //                 height: customHeight,
            //                 borderRadius: 10,
            //               }}
            //             />
            //           )}
            //         </div>

            //         <img
            //           src={
            //             "https://podcasts.cucurico.co.il/podcast/public/images/" +
            //             epos?.image
            //           }
            //           style={{
            //             width: customWidth,
            //             height: customHeight,
            //             borderRadius: 15,
            //             // background:"red",
            //             objectFit: "cover",
            //           }}
            //         />
            //       </div>
            //       <div
            //       style={{
            //         fontSize: "15px",
            //         fontWeight: "bold",
            //         marginTop: 5,
            //         color: darkMode ? "#fff" : "#212121",
            //         textAlign: "right",
            //         whiteSpace: "nowrap",
            //         overflow: "hidden",
            //         textOverflow: "ellipsis",
            //       }}
            //       >
            //         {epos?.name}
            //       </div>

            //       <div
            //         style={{
            //           marginTop: 2,
            //           fontSize: "11px",
            //           color: darkMode ? "#fff" : "#E97B65",
            //           textAlign: "right",
            //           whiteSpace: "nowrap",
            //           overflow: "hidden",
            //           textOverflow: "ellipsis",
            //         }}
            //       >
            //         {epos?.about_series}
            //       </div>

            //       <div
            //       style={{
            //         marginTop: 2,
            //         color: darkMode ? "#777777" : "#000",
            //         fontSize: 12,

            //         textAlign: "right",
            //         whiteSpace: "nowrap",
            //         overflow: "hidden",
            //         textOverflow: "ellipsis",
            //       }}
            //       >
            //         :With {epos?.guests}
            //       </div>

            //       <div
            //         style={{
            //           marginTop: 2,
            //           color: "#777777",
            //           textAlign: "right",

            //           fontSize: 12,
            //           whiteSpace: "nowrap",
            //           overflow: "hidden",
            //           textOverflow: "ellipsis",
            //         }}
            //       >
            //         {epos?.duration}
            //         {/* {`${"00:41:55"}`} */}
            //       </div>
            //     </div>
            //   </>
              );
            })
          : ""}
              {serie && serie.length > 0
          ? serie.map((serie, index) => {
              return (
                <>
                   <ListRenderTwo
                     item={serie}
                     index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={episode}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                </>
                // <>
                //   {" "}
                //   <div
                //   key={index}
                //   style={{
                //     width: customWidthThird,
                //     marginLeft: 10,
                //   }}
                // >
                //   <div
                //     style={{
                //       marginTop: 10,
                //       color: "#000",
                //     }}
                //   ></div>
                //   <div
                //     style={{
                //       width: customWidthThird,
                //       height: customHeightThird + 15,
                //     }}
                //   >
                //     <div
                //       style={{
                //         position: "absolute",
                //         color: "#fff",
                //         width: customWidthThird,
                //         height: customHeightThird + 15,
                //         display: "flex",
                //         alignItems: "center",
                //         justifyContent: "center",
                //       }}
                //     >
                //         <div
                //         // onClick={() => {
                //         //   setCurrentSong({
                //         //     song: item?.url,
                //         //     index: 0,
                //         //   });
                //         //   if (index == selectedEpisodeIndex) {
                //         //     setSelectedSeries(item?.episodes);
                //         //     setSelectedEpisodeIndex(0);
                //         //     const { episodes, ...selectedSeriesData } = item;
                //         //     setSelectedSeriesData(selectedSeriesData);
                //         //   } else {
                //         //     audioRef.current.pause();
                //         //     audioRef.current.currentTime = 0;
                //         //     setSelectedSeries(item?.episodes);
                //         //     setSelectedEpisodeIndex(0);
                //         //     const { episodes, ...selectedSeriesData } = item;
                //         //     setSelectedSeriesData(selectedSeriesData);
                //         //   }

                //         //   setTimeout(() => {
                //         //     navigate("/player");
                //         //     // setShowPlayer(true);
                //         //   }, 500);
                //         // }}
                //         // onMouseEnter={() => handleMouseEnter(index)}
                //         // onMouseLeave={handleMouseLeave}
                //         // style={{
                //         //   width: 75,
                //         //   height: 75,
                //         //   position: "absolute",
                //         //   cursor: "pointer",
                //         // }}
                //         />
                //         {/* {hoveredIndex === index && (
                //     <img
                //       src={hoverImg}
                //       style={{
                //         width: customWidth,
                //         height: customHeight,
                //         borderRadius: 10,
                //       }}
                //     />
                //   )} */}
                //       </div>

                //       <img
                //         src={
                //           "https://podcasts.cucurico.co.il/podcast/public/images/" +
                //           serie?.featured_image
                //         }
                //         style={{
                //           width: "150px",
                //           height: "150px",
                //           borderRadius: 15,
                //           // background:"red",
                //           objectFit: "cover",
                //         }}
                //       />
                //     </div>
                //     <div
                //     // style={{
                //     //   fontSize: "15px",
                //     //   fontWeight: "bold",
                //     //   marginTop: 5,
                //     //   color: darkMode ? "#fff" : "#212121",
                //     //   textAlign: "right",
                //     //   whiteSpace: "nowrap",
                //     //   overflow: "hidden",
                //     //   textOverflow: "ellipsis",
                //     // }}
                //     >
                //       {item?.name}
                //     </div>

                //     <div
                //       style={{
                //         marginTop: 2,
                //         fontSize: "11px",
                //         //   color: darkMode ? "#fff" : "#E97B65",
                //         textAlign: "right",
                //         whiteSpace: "nowrap",
                //         overflow: "hidden",
                //         width: "150px",
                //         textOverflow: "ellipsis",
                //       }}
                //     >
                //       {serie?.about_series}
                //     </div>

                //     <div
                //     // style={{
                //     //   marginTop: 2,
                //     //   color: darkMode ? "#777777" : "#000",
                //     //   fontSize: 12,

                //     //   textAlign: "right",
                //     //   whiteSpace: "nowrap",
                //     //   overflow: "hidden",
                //     //   textOverflow: "ellipsis",
                //     // }}
                //     >
                //       :With {serie?.guests}
                //     </div>

                //     <div
                //       style={{
                //         marginTop: 2,
                //         color: "#777777",
                //         textAlign: "right",

                //         fontSize: 12,
                //         whiteSpace: "nowrap",
                //         overflow: "hidden",
                //         textOverflow: "ellipsis",
                //       }}
                //     >
                //       {serie?.duration}
                //       {/* {`${"00:41:55"}`} */}
                //     </div>
                //   </div>
                // </>
              );
            })
          : ""}
             {tagEpisode && tagEpisode.length > 0
          ? tagEpisode.map((epos, index) => {
            return (
                <>
                <ListRenderOne
                        item={epos}
                        index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={item?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                </>
            //     <>
            //     {" "}
            //     <div key={index}>
            //       <div></div>
            //       <div>
            //         <div
            //           style={{
            //             position: "absolute",
            //             alignItems: "center",
            //             justifyContent: "center",
            //             display: "flex",
            //           }}
            //         >
            //           <div
            //           // onClick={() => {
            //           //   setCurrentSong({
            //           //     song: item?.url,
            //           //     index: 0,
            //           //   });
            //           //   if (index == selectedEpisodeIndex) {
            //           //     setSelectedSeries(item?.episodes);
            //           //     setSelectedEpisodeIndex(0);
            //           //     const { episodes, ...selectedSeriesData } = item;
            //           //     setSelectedSeriesData(selectedSeriesData);
            //           //   } else {
            //           //     audioRef.current.pause();
            //           //     audioRef.current.currentTime = 0;
            //           //     setSelectedSeries(item?.episodes);
            //           //     setSelectedEpisodeIndex(0);
            //           //     const { episodes, ...selectedSeriesData } = item;
            //           //     setSelectedSeriesData(selectedSeriesData);
            //           //   }

            //           //   setTimeout(() => {
            //           //     navigate("/player");
            //           //     // setShowPlayer(true);
            //           //   }, 500);
            //           // }}
            //           // onMouseEnter={() => handleMouseEnter(index)}
            //           // onMouseLeave={handleMouseLeave}
            //           // style={{
            //           //   width: 75,
            //           //   height: 75,
            //           //   position: "absolute",
            //           //   cursor: "pointer",
            //           // }}
            //           />
            //           {/* {hoveredIndex === index && (
            //       <img
            //         src={hoverImg}
            //         style={{
            //           width: customWidth,
            //           height: customHeight,
            //           borderRadius: 10,
            //         }}
            //       />
            //     )} */}
            //         </div>

            //         <img
            //           src={
            //             "https://podcasts.cucurico.co.il/podcast/public/images/" +
            //             epos?.image
            //           }
            //           style={{
            //             width: "150px",
            //             height: "150px",
            //             borderRadius: 15,
            //             // background:"red",
            //             objectFit: "cover",
            //           }}
            //         />
            //       </div>
            //       <div
            //       // style={{
            //       //   fontSize: "15px",
            //       //   fontWeight: "bold",
            //       //   marginTop: 5,
            //       //   color: darkMode ? "#fff" : "#212121",
            //       //   textAlign: "right",
            //       //   whiteSpace: "nowrap",
            //       //   overflow: "hidden",
            //       //   textOverflow: "ellipsis",
            //       // }}
            //       >
            //         {epos?.name}
            //       </div>

            //       <div
            //         style={{
            //           marginTop: 2,
            //           fontSize: "11px",
            //           //   color: darkMode ? "#fff" : "#E97B65",
            //           textAlign: "right",
            //           whiteSpace: "nowrap",
            //           overflow: "hidden",
            //           width: "150px",
            //           textOverflow: "ellipsis",
            //         }}
            //       >
            //         {epos?.about_series}
            //       </div>

            //       <div
            //       // style={{
            //       //   marginTop: 2,
            //       //   color: darkMode ? "#777777" : "#000",
            //       //   fontSize: 12,

            //       //   textAlign: "right",
            //       //   whiteSpace: "nowrap",
            //       //   overflow: "hidden",
            //       //   textOverflow: "ellipsis",
            //       // }}
            //       >
            //         :With {epos?.guests}
            //       </div>

            //       <div
            //         style={{
            //           marginTop: 2,
            //           color: "#777777",
            //           textAlign: "right",

            //           fontSize: 12,
            //           whiteSpace: "nowrap",
            //           overflow: "hidden",
            //           textOverflow: "ellipsis",
            //         }}
            //       >
            //         {epos?.duration}
            //         {/* {`${"00:41:55"}`} */}
            //       </div>
            //     </div>
            //   </>
              );
            })
          : ""}
            {categorySeries && categorySeries.length > 0
          ? categorySeries.map((series, index) => {
          return  series.map((serie,index)=>{
                    return (
                        <>
                              <ListRenderTwo
                     item={serie}
                     index={index}
                        audioRef={audioRef}
                        setVolume={setVolume}
                        list={item?.subData}
                        volume={volume}
                        setIsPlaying={setIsPlaying}
                      />
                        </>
                // <>
                //   {" "}
                //   <div key={index}>
                //     <div></div>
                //     <div>
                //       <div
                //         style={{
                //           position: "absolute",
                //           alignItems: "center",
                //           justifyContent: "center",
                //           display: "flex",
                //         }}
                //       >
                //         <div
                //         // onClick={() => {
                //         //   setCurrentSong({
                //         //     song: item?.url,
                //         //     index: 0,
                //         //   });
                //         //   if (index == selectedEpisodeIndex) {
                //         //     setSelectedSeries(item?.episodes);
                //         //     setSelectedEpisodeIndex(0);
                //         //     const { episodes, ...selectedSeriesData } = item;
                //         //     setSelectedSeriesData(selectedSeriesData);
                //         //   } else {
                //         //     audioRef.current.pause();
                //         //     audioRef.current.currentTime = 0;
                //         //     setSelectedSeries(item?.episodes);
                //         //     setSelectedEpisodeIndex(0);
                //         //     const { episodes, ...selectedSeriesData } = item;
                //         //     setSelectedSeriesData(selectedSeriesData);
                //         //   }

                //         //   setTimeout(() => {
                //         //     navigate("/player");
                //         //     // setShowPlayer(true);
                //         //   }, 500);
                //         // }}
                //         // onMouseEnter={() => handleMouseEnter(index)}
                //         // onMouseLeave={handleMouseLeave}
                //         // style={{
                //         //   width: 75,
                //         //   height: 75,
                //         //   position: "absolute",
                //         //   cursor: "pointer",
                //         // }}
                //         />
                //         {/* {hoveredIndex === index && (
                //     <img
                //       src={hoverImg}
                //       style={{
                //         width: customWidth,
                //         height: customHeight,
                //         borderRadius: 10,
                //       }}
                //     />
                //   )} */}
                //       </div>

                //       <img
                //         src={
                //           "https://podcasts.cucurico.co.il/podcast/public/images/" +
                //           serie?.featured_image
                //         }
                //         style={{
                //           width: "150px",
                //           height: "150px",
                //           borderRadius: 15,
                //           // background:"red",
                //           objectFit: "cover",
                //         }}
                //       />
                //     </div>
                //     <div
                //     // style={{
                //     //   fontSize: "15px",
                //     //   fontWeight: "bold",
                //     //   marginTop: 5,
                //     //   color: darkMode ? "#fff" : "#212121",
                //     //   textAlign: "right",
                //     //   whiteSpace: "nowrap",
                //     //   overflow: "hidden",
                //     //   textOverflow: "ellipsis",
                //     // }}
                //     >
                //       {item?.name}
                //     </div>

                //     <div
                //       style={{
                //         marginTop: 2,
                //         fontSize: "11px",
                //         //   color: darkMode ? "#fff" : "#E97B65",
                //         textAlign: "right",
                //         whiteSpace: "nowrap",
                //         overflow: "hidden",
                //         width: "150px",
                //         textOverflow: "ellipsis",
                //       }}
                //     >
                //       {serie?.about_series}
                //     </div>

                //     <div
                //     // style={{
                //     //   marginTop: 2,
                //     //   color: darkMode ? "#777777" : "#000",
                //     //   fontSize: 12,

                //     //   textAlign: "right",
                //     //   whiteSpace: "nowrap",
                //     //   overflow: "hidden",
                //     //   textOverflow: "ellipsis",
                //     // }}
                //     >
                //       :With {serie?.guests}
                //     </div>

                //     <div
                //       style={{
                //         marginTop: 2,
                //         color: "#777777",
                //         textAlign: "right",

                //         fontSize: 12,
                //         whiteSpace: "nowrap",
                //         overflow: "hidden",
                //         textOverflow: "ellipsis",
                //       }}
                //     >
                //       {serie?.duration}
                //       {/* {`${"00:41:55"}`} */}
                //     </div>
                //   </div>
                // </>
              );
            })
        
            })
          : ""}
          {item.carousel.name == "Continue Listening" ? <>
          wqwqe
          </>: ""

          }
      </Draggable>
      {/* <Draggable>
        {category && category.length > 0
          ? category.map((epos, item) => {
              return <>categosry</>;
            })
          : ""}
      </Draggable> */}
     
      {/* <Draggable>
        {tagEpisode && tagEpisode.length > 0
          ? tagEpisode.map((epos, item) => {
              return <>sifewefwefwe</>;
            })
          : ""}
      </Draggable> */}
    </>
  );
}

export default Card;
//  <Draggable>
//         {serie && serie.length > 0
//           ? serie.map((serie, index) => {
//               return (
//                 <>
//                   {" "}
//                   <div key={index}>
//                     <div></div>
//                     <div>
//                       <div
//                         style={{
//                           position: "absolute",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           display: "flex",
//                         }}
//                       >
//                         <div
//                         // onClick={() => {
//                         //   setCurrentSong({
//                         //     song: item?.url,
//                         //     index: 0,
//                         //   });
//                         //   if (index == selectedEpisodeIndex) {
//                         //     setSelectedSeries(item?.episodes);
//                         //     setSelectedEpisodeIndex(0);
//                         //     const { episodes, ...selectedSeriesData } = item;
//                         //     setSelectedSeriesData(selectedSeriesData);
//                         //   } else {
//                         //     audioRef.current.pause();
//                         //     audioRef.current.currentTime = 0;
//                         //     setSelectedSeries(item?.episodes);
//                         //     setSelectedEpisodeIndex(0);
//                         //     const { episodes, ...selectedSeriesData } = item;
//                         //     setSelectedSeriesData(selectedSeriesData);
//                         //   }

//                         //   setTimeout(() => {
//                         //     navigate("/player");
//                         //     // setShowPlayer(true);
//                         //   }, 500);
//                         // }}
//                         // onMouseEnter={() => handleMouseEnter(index)}
//                         // onMouseLeave={handleMouseLeave}
//                         // style={{
//                         //   width: 75,
//                         //   height: 75,
//                         //   position: "absolute",
//                         //   cursor: "pointer",
//                         // }}
//                         />
//                         {/* {hoveredIndex === index && (
//                     <img
//                       src={hoverImg}
//                       style={{
//                         width: customWidth,
//                         height: customHeight,
//                         borderRadius: 10,
//                       }}
//                     />
//                   )} */}
//                       </div>

//                       <img
//                         src={
//                           "https://podcasts.cucurico.co.il/podcast/public" +
//                           serie?.featured_image
//                         }
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           borderRadius: 15,
//                           // background:"red",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </div>
//                     <div
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: "bold",
//                       marginTop: 5,
//                     //   color: darkMode ? "#fff" : "#212121",
//                       textAlign: "right",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                     >
//                       {item?.name}
//                     </div>

//                     <div
//                       style={{
//                         marginTop: 2,
//                         fontSize: "11px",
//                         //   color: darkMode ? "#fff" : "#E97B65",
//                         textAlign: "right",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         width: "150px",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {serie?.about_series}
//                     </div>

//                     <div
//                     style={{
//                       marginTop: 2,
//                     //   color: darkMode ? "#777777" : "#000",
//                       fontSize: 12,

//                       textAlign: "right",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                     }}
//                     >
//                       :With {serie?.guests}
//                     </div>

//                     <div
//                       style={{
//                         marginTop: 2,
//                         color: "#777777",
//                         textAlign: "right",

//                         fontSize: 12,
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {serie?.duration}
//                     </div>
//                   </div>
//                 </>
//               );
//             })
//           : ""}
//       </Draggable>
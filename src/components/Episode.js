// import React from "react";

// import layer1 from "../images/Layer1.png";
// import playerBG from "../images/playerBG.png";
// import playerEp1 from "../images/playerEp1.png";
// import returnimg from "../images/return.png";
// import playerLine from "../images/playerLine.png";
// import playSmall from "../images/playSmall.png";
// import plus from "../images/plus.png";

// import { useState } from "react";
// import SubUrban from "../subUrban.mp3";
// import Matafaka from "../matafaka.mp3";
// import "./Episode.css";
// import Header from "./Header";

// const Episode = ({
//   darkMode,
//   audioRef,
//   currentTime,
//   duration,
//   handleSeek,
//   togglePlay,
//   isPlaying,
// }) => {
//   function formatTime(timeInSeconds) {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
//       seconds
//     ).padStart(2, "0")}`;
//     return formattedTime;
//   }
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const responsiveFontSize = (height + width) / 10;

//   const [list, setList] = useState([
//     {
//       time: "00:41:55",
//       text1: `מבוא: רשב"ם פינת קרעסטיר.1`,
//       text2: `איך השפיע רעיון שהתחיל לפני 300 שנה באוקראינה על כל העולם היהודי?
//         מסע קצר אל אפיקי ההתפשטות החסידית מהבעש"ט עד לימינו.`,
//       text3: "12.04.2022  |  א בתשרי תשפ”ב",
//       image: playerEp1,
//     },
//     {
//       time: "00:41:55",
//       text1: `מבוא: רשב"ם פינת קרעסטיר.1`,
//       text2: `איך השפיע רעיון שהתחיל לפני 300 שנה באוקראינה על כל העולם היהודי?
//         מסע קצר אל אפיקי ההתפשטות החסידית מהבעש"ט עד לימינו.`,
//       text3: "12.04.2022  |  א בתשרי תשפ”ב",
//       image: playerEp1,
//     },
//     {
//       time: "00:41:55",
//       text1: `מבוא: רשב"ם פינת קרעסטיר.1`,
//       text2: `איך השפיע רעיון שהתחיל לפני 300 שנה באוקראינה על כל העולם היהודי?
//         מסע קצר אל אפיקי ההתפשטות החסידית מהבעש"ט עד לימינו.`,
//       text3: "12.04.2022  |  א בתשרי תשפ”ב",
//       image: playerEp1,
//     },
//     {
//       time: "00:41:55",
//       text1: `מבוא: רשב"ם פינת קרעסטיר.1`,
//       text2: `איך השפיע רעיון שהתחיל לפני 300 שנה באוקראינה על כל העולם היהודי?
//         מסע קצר אל אפיקי ההתפשטות החסידית מהבעש"ט עד לימינו.`,
//       text3: "12.04.2022  |  א בתשרי תשפ”ב",
//       image: playerEp1,
//     },
//   ]);

//   return (
//     <>
//       <div style={{}}>
//         <Header />

//         <div
//           style={{ width: "100%", background: darkMode ? "#1A1A1A" : "white" }}
//         >
//           <img style={{ width: "100%" }} src={layer1} alt="" />
//         </div>

//         <div
//           style={{
//             // marginTop: -window.innerHeight * 0.35,

//             width: "100%",
//             background: darkMode ? "#1A1A1A" : "#F5F5F5",
//             top: "140px",
//             display: "flex",

//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               width: "50%",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 width: width * 0.5,
//                 height: height * 0.62,
//                 background: "red",
//               }}
//             >
//               {/* <img
//                 style={{ width: "100%", height: height * 0.62 }}
//                 src={playerBG}
//                 alt=""
//               /> */}
//               <div
//                 style={{
//                   position: "absolute",
//                   width: width * 0.04,
//                   height: width * 0.04,
//                   background: "green",
//                   bottom: 1,
//                   right: 2,
//                   display: "flex",
//                 }}
//               ></div>
//             </div>

//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 background: darkMode ? "#252525" : "none",
//               }}
//             >
//               <div style={{}}>
//                 {/* <div
//                   style={{
//                     width: width * 0.5,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: height * 0.015,
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: responsiveFontSize * 0.055,
//                       color: "#767676",
//                     }}
//                   >
//                     {formatTime(currentTime)}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: responsiveFontSize * 0.055,
//                       color: "#767676",
//                     }}
//                   >
//                     {formatTime(duration)}
//                   </div>
//                 </div> */}
//                 {/* <input
//                   type="range"
//                   min={0}
//                   max={duration}
//                   value={currentTime}
//                   onChange={handleSeek}
//                   style={{
//                     height: "10px",
//                     width: "100%",
//                     appearance: "none",
//                     borderRadius: "5px",
//                     background: `linear-gradient(to right, #E97B65 0%, #E97B65 ${
//                       (currentTime / duration) * 100
//                     }%, #eaeaea ${
//                       (currentTime / duration) * 100
//                     }%, #eaeaea 100%)`,
//                   }}
//                   className="other-range"
//                 /> */}
//               </div>
//               <div
//                 style={{
//                   marginTop: "35px",
//                   marginBottom: "15px",
//                   width: "80%",
//                   height: "80px",
//                   backgroundColor: "#F9F3F2",
//                   color: darkMode ? "#FFFFFF" : "#E4B1B1",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: darkMode ? "#1A1A1A" : "#F9F3F2",
//                 }}
//               >
//                 AD
//               </div>

//               <div
//                 style={{
//                   marginBottom: "8px",
//                   width: "96%",
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   color: darkMode ? "#FFFFFF" : "#212121",
//                 }}
//               >
//                 <div>כל הפרקים</div>
//               </div>
//               {list.map((item, index) => {
//                 return (
//                   <>
//                     <div>
//                       <div
//                         className="episodes"
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           flexDirection: "row",

//                           backgroundColor:
//                             darkMode && index == 0
//                               ? "#1a1a1a"
//                               : !darkMode && index == 0
//                               ? "#f9f3f2"
//                               : darkMode
//                               ? "#252525"
//                               : "#fff",
//                           margin: "0% 2%",
//                           padding: "2%",
//                           // padding:"0px 8px"
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "80%",
//                             //  padding:"10px",
//                             paddingRight: "4%",
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "center",
//                             alignItems: "flex-end",
//                             textAlign: "right",
//                           }}
//                         >
//                           <div
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 fontSize: "10px",
//                                 width: "20%",
//                                 display: "flex",
//                                 justifyContent: "flex-start",
//                                 alignItems: "center",
//                                 color: darkMode ? "#777777" : "#484848",
//                               }}
//                             >
//                               {item?.time}
//                             </div>
//                             <div
//                               style={{
//                                 width: "80%",
//                                 fontSize: "14px",
//                                 fontWeight: "",
//                                 color: darkMode ? "#FFFFFF" : "#212121",
//                               }}
//                             >
//                               {item?.text1}
//                             </div>
//                           </div>

//                           <div
//                             style={{
//                               fontSize: "9px",
//                               color: darkMode ? "#FFFFFF" : "#212121",
//                             }}
//                           >
//                             {item?.text2}
//                           </div>
//                           <div
//                             style={{
//                               fontSize: "9px",
//                               marginTop: "6px",
//                               color: darkMode ? "#777777" : "#484848",
//                             }}
//                           >
//                             {item?.text3}
//                           </div>

//                           <div
//                             style={{
//                               color: "#E97B65",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               fontSize: "9px",
//                               marginTop: "2px",
//                             }}
//                           >
//                             שיתוף
//                             <div>
//                               <img
//                                 style={{
//                                   width: "7px",
//                                 }}
//                                 src={returnimg}
//                                 alt=""
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div style={{ width: "25%" }}>
//                           <img
//                             style={{
//                               width: "100%",
//                               display: "flex",
//                               justifyContent: "flex-end",
//                             }}
//                             src={playerEp1}
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                       <img
//                         style={{ width: "96%", marginLeft: "2%" }}
//                         src={playerLine}
//                         alt=""
//                       />
//                     </div>
//                   </>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Episode;

// // <div
// // style={{
// //   position: "absolute",
// //   // top: 1,
// //   // left: width * 0.275,
// //   width: "45%",
// //   top: 1,
// // }}
// // >
// // <div
// //   style={{
// //     display: "flex",
// //     justifyContent: "flex-end",
// //     alignItems: "right",
// //     textAlign: "",
// //     color: "white",
// //     fontSize: responsiveFontSize * 0.23,
// //   }}
// // >
// //   פארענצ’ס
// // </div>

// // <div
// //   style={{
// //     display: "flex",
// //     justifyContent: "flex-end",
// //     alignItems: "right",

// //     color: "white",
// //     fontSize: responsiveFontSize * 0.075,
// //   }}
// // >
// //   פרק 4: סודה של "כת קטנה"
// // </div>
// // {/* <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
// // <input
// // type="range"
// // min={0}
// // max={duration}
// // value={currentTime}
// // onChange={handleSeek}
// // /> */}
// // <div
// //   style={{
// //     width: width * 0.44,
// //     display: "flex",
// //     justifyContent: "space-between",
// //     marginTop: height * 0.015,
// //     marginLeft: "2px",
// //   }}
// // >
// //   <div
// //     style={{
// //       fontSize: responsiveFontSize * 0.055,
// //       color: "#767676",
// //     }}
// //   >
// //     {formatTime(currentTime)}
// //   </div>
// //   <div
// //     style={{
// //       fontSize: responsiveFontSize * 0.055,
// //       color: "#767676",
// //     }}
// //   >
// //     {formatTime(duration)}
// //   </div>
// // </div>
// // <input
// //   type="range"
// //   min={0}
// //   max={duration}
// //   value={currentTime}
// //   onChange={handleSeek}
// //   style={{
// //     height: "4px",
// //     width: "100%",
// //     appearance: "none",
// //     borderRadius: "5px",
// //     background: `linear-gradient(to right, #E97B65 0%, #E97B65 ${
// //       (currentTime / duration) * 100
// //     }%, #eaeaea ${
// //       (currentTime / duration) * 100
// //     }%, #eaeaea 100%)`,
// //   }}
// //   className="other-range"
// // />
// // {/* player line k neechay */}
// // <div
// //   style={{
// //     display: "flex",
// //     justifyContent: "flex-end",
// //     alignItems: "right",
// //     gap: "7px",
// //     color: "white",
// //     fontSize: "15px",
// //     marginTop: "10px",
// //   }}
// // >
// //   <div
// //     style={{
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       gap: "3px",
// //       fontSize: responsiveFontSize * 0.045,
// //     }}
// //   >
// //     עוד פעולות
// //     <img
// //       style={{ height: "", width: "15px" }}
// //       src={plus}
// //       alt=""
// //     />
// //   </div>
// //   <div
// //     style={{
// //       // height: "25px",
// //       // widtth: "40px",
// //       background: "#E97B65",
// //       backgroundColor: "#E97B65",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       borderRadius: "3px",
// //       gap: "3px",
// //       paddingRight: width * 0.01,
// //       paddingLeft: width * 0.01,
// //       paddingTop: height * 0.01,
// //       paddingBottom: height * 0.01,
// //       fontSize: "13px",
// //     }}
// //   >
// //     <div
// //       style={{
// //         fontSize: responsiveFontSize * 0.045,
// //       }}
// //     >
// //       להאזנה
// //     </div>
// //     <img
// //       style={{ height: width * 0.01, width: width * 0.01 }}
// //       src={playSmall}
// //       alt=""
// //     />
// //   </div>
// // </div>

// // <div
// //   style={{
// //     display: "flex",
// //     justifyContent: "flex-end",
// //     alignItems: "right",
// //     gap: "7px",
// //     color: "white",
// //     fontSize: "15px",
// //     marginTop: "10px",
// //   }}
// // >
// //   <div
// //     style={{
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       gap: "3px",
// //       fontSize: responsiveFontSize * 0.045,
// //     }}
// //   >
// //     אודות הסדרה
// //   </div>
// //   <div
// //     style={{
// //       // height: "25px",
// //       // widtth: "40px",
// //       textAlign: "right",
// //       color: "white",

// //       fontSize: responsiveFontSize * 0.045,
// //     }}
// //   >
// //     <div>תקציר הפרק</div>
// //   </div>
// // </div>
// // {/* line k neechay yhn tk */}

// // <div
// //   style={{
// //     color: "white",
// //     // display: "flex",
// //     // justifyContent: "center",
// //     // alignItems: "flex-end",
// //     marginTop: height * 0.006,
// //     textAlign: "right",
// //     fontSize: responsiveFontSize * 0.045,
// //   }}
// // >
// //   מסע מרתק וייחודי אל סודות האדמו"רים וחצרות החסידות. מסע מרתק
// //   וייחודי אל סודות האדמו"רים וחצרות החסידות מסע מרתק
// // </div>
// // </div>
import React from "react";

const Episode = () => {
  return <div>Episode</div>;
};

export default Episode;

import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.png";
import logo2 from "../images/logo2.png";
import menu from "../images/menu.png";
import search from "../images/search.png";
import search2 from "../images/search2.png";
import menu2 from "../images/menu2.png";
import MediaQuery from "react-responsive";
// import { Link } from "react-router-dom";
import expandup from "../images/expandup.png";
import { useSelector } from "react-redux";
import axios from "axios";
import "./header.css";
import { ThemeContext } from "./ThemeContext";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSearch, setSearch } from "../features/Search";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";
import FallbackImage from "./Fallback";
import FallbackImagea from "./Fallbacks";


const Header = ({ list }) => {

 
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const {
    darkMode,
    setDarkMode,
    completeCarousels,
    setCompleteCarousels,
    filteredCarousels,
    setFilteredCarousels,
  } = useContext(ThemeContext);
  const theme = useTheme()
  useEffect(() => {
    ////console.log("lister", list);
  }, []);
  const [dynamicUrl, setDynamicUrl] = useState("");
  const [logoss, setLogoss] = useState(logo);
  async function getData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error occurred while fetching data from ${url}: `, error);
    }
  }
  const location = useLocation()
  useEffect(() => {
    getData("https://podcasts.cucurico.co.il/podcast/public/api/appmanagement")
      .then((data) => {
        console.log(data);
        setDynamicUrl(data.data.url);
        setLogoss(data.data.logo);
      })
      .catch((error) => console.error(error));
  }, []);
  function filterCarouselsByName(completeCarousels, desiredName) {
    const filteredCarousels = completeCarousels.map((carousel) => {
      // Assuming each carousel object has a "subData" field
      const filteredSubData = carousel?.subData?.filter((item, index) => {
        ////console.log("NAME ========", item?.name);
        let subDataWithName = item?.name;
        return (
          subDataWithName &&
          subDataWithName?.toLowerCase().includes(desiredName?.toLowerCase())
        );
      });

      // Create a new carousel object with only the filtered subData
      const filteredCarousel = { ...carousel, subData: filteredSubData };

      return filteredCarousel;
    });

    return filteredCarousels;
  }
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
useEffect(() => { 
  console.log("search",searchings.search)
  dispatch(setSearch(''));
 
}, [location.pathname])

  const dispatch = useDispatch();
  const searchings = useSelector((state) => state);
  const handleInputChange = (event) => {
    const searchText = event.target.value;
    dispatch(setSearch(searchText));

    setSearchText(searchText);
    let filteredData = filterCarouselsByName(completeCarousels, searchText);
    ////console.log("FILTERED DATA ==============", filteredData);
    setFilteredCarousels(filteredData);
  };

  useEffect(() => {
    //console.log("miseeeeee",searchings.search.search)
  }, [handleInputChange]);
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div
        style={{
          background: darkMode ? "#000" : "#fff",
          width: "100%",
          margin: "0 auto",
        }}
        className="footer-main "
      >
        <MediaQuery minWidth={430}>
          <div className="footer2">
            <Link
              to="/"
              onClick={(event) => {
                event.preventDefault();
                openInNewTab(dynamicUrl);
              }}
              style={{textDecoration:"none",margin:"0px 0px 0px 15px"}}
            >
              {" "}
              <div
                className="logo"
                style={{
                  background: "#fff",
                }}
              >
                <img
                  style={{
                    width: "50px",
                    objectFit: "contain",
                    height: "34px",
                  }}
                  src={logo}
                  alt=""
                />
                <div
                  style={{
                    color: "#000",
                    fontSize:
                      ((window.innerHeight + window.innerWidth) / 10) * 0.055,
                    marginLeft: window.innerWidth * 0.005,
textDecoration:"none"
                  }}
                >
                 <p style={{textDecoration:"none"}}> אתר</p>
                </div>
              </div>
            </Link>

            <div
              className="input-main"
              style={{
                background: darkMode ? "#161616" : "#F7F6F9",
                color: darkMode ? "#DDDDDD" : "#484848",
                border:darkMode?"0.5px solid #FFFFFF" : null,
              }}
            >
              <div className="search">
                <img src={darkMode ? search2 : search} alt="" />
              </div>
              <div
             className={darkMode ? "white-placeholder" : "black-placeholder"}
              >
                <input
                  type="text"
                  placeholder="חיפוש"
                  style={{
                    outline: "none",
                    background: darkMode ? "#161616" : "#F7F6F9",
                    color: darkMode ? "#F7F6F9" : "black",
                  }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="footer3">
            <div className="logo2" >
              <Link to="/">
                {/* <img style={{width: "160px",
    objectFit: "contain",
    height: "50px"}}src={`https://podcasts.cucurico.co.il/podcast/public/images/${logoss}`} alt="" /> */}
        <FallbackImage src={`https://podcasts.cucurico.co.il/podcast/public/images/${logoss}`} alt=""/>

              </Link>
            </div>

            <div className="menu">
              <img
                style={{
                  marginLeft: window.innerWidth * 0.006,
                  cursor: "pointer",
                  margin:"0px 15px 0px 8px"
                }}
                
                src={darkMode ? menu2 : menu}
                alt=""
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </div>

            {showDropdown && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "40%",
                  // background: "#050718",
                  background: "#071330",

                  // border: "1px solid #FFFFFF",
                  // borderRadius: "10px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",

                  zIndex: "999999",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                  }}
                >
                  <img
                    style={{
                      padding: "10px 0px 10px 10px",
                      width: "60%",
                      marginLeft: "50px",
                    }}
                    src={logo}
                    alt=""
                  />
                  <div
                    style={{
                      width: "100%",
                      background: "white",
                      height: "1px",
                    }}
                  ></div>
                </div>

                <Link to="/">
                <div
                  style={{
                    padding: "10px 5px 10px 10px",
                    color: "white",
                    
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    marginTop: "150px",
                    marginLeft: "20px",
                  }}
                >
                  Home
                </div>
                </Link>
                {/* <div
              style={{
                height: 1,
                backgroundColor: "white",
                margin: "2px 0px 2px 0px",
              }}
            ></div> */}
                <div
                  style={{
                    color: "white",
                    padding: "10px 5px 10px 10px",
                    marginLeft: "20px",
                  }}
                >
                  How It Works?
                </div>
                {/* <div
              style={{
                height: 1,
                backgroundColor: "white",
                margin: "2px 0px 2px 0px",
              }}
            ></div> */}
                <div
                  style={{
                    color: "white",
                    padding: "10px 5px 10px 10px",
                    marginLeft: "20px",
                  }}
                >
                  API Integration
                </div>
                {/* <div
              style={{
                height: 1,
                backgroundColor: "white",
                margin: "2px 0px 2px 0px",
              }}
            ></div> */}
                <div
                  style={{
                    color: "white",
                    padding: "10px 5px 10px 10px",
                    marginLeft: "20px",
                  }}
                >
                  FAQ
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 340,
                    left: -16,
                    width: "35px",
                    height: "35px",
                    borderRadius: "999px",
                    background: "#071330",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "30%",
                      cursor: "pointer",
                      transform: "rotate(90deg)",
                    }}
                    src={expandup}
                    alt=""
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </MediaQuery>

        <MediaQuery maxWidth={430}>
          <div className="footer3">
            <Link href="/" style={{textDecoration:"none"}}>
              <div
                style={{
                  width: window.innerWidth * 0.09,
                  height: window.innerWidth * 0.09,
                  borderRadius: 1000,
                  margin:"0px 0px 0px 15px",
                  background: "#161616",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
               
                  <img
                    style={{ width: window.innerWidth * 0.04 }}
                    src={darkMode ? search2 : search2}
                    // src={search2}
                    alt=""
                    onClick={() => {
                      setSearchShow(!searchShow);
                    }}
                  />
            

                {searchShow && (
                  <input
                    type="text"
                    placeholder="חיפוש"
                    style={{
                      outline: "none",
                      background: darkMode ? "#161616" : "#F7F6F9",
                      color: darkMode ? "#F7F6F9" : "black",
                      margin: "90px 0px 0px 90px",
                      // border: "1px solid black",
                      width: "110px",
                      textDecoration:"none",
                      borderRadius: "30px",
                      padding: "5px",
                    }}
                    onBlur={() => {
                      setSearchShow(!searchShow);
                    }}
                    onMouseLeave={() => {
                      setSearchShow(!searchShow);
                    }}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            </Link>
            <div className="logo2">
              
              <Link to="/">
                <img style={{width: "90px",
    objectFit: "contain",
    height: "50px"}}src={logo2} alt="" />
    {/* <FallbackImagea src={`https://podcasts.cucurico.co.il/podcast/public/images/${logoss}`} alt=""/> */}
              </Link>
           
            </div>

            <div className="menu">
              <img
                style={{
                  marginLeft: window.innerWidth * 0.006,
                  margin:"0px 15px 0px 15px"
                }}
                src={darkMode ? menu2 : menu}
                alt=""
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </div>
          </div>
          {showDropdown && (
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "94%",
                // background: "#050718",
                background: "#071330",

                // border: "1px solid #FFFFFF",
                // borderRadius: "10px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                zIndex: "999999",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                }}
              >
                <img
                  style={{
                    padding: "10px 0px 10px 10px",
                    width: "60%",
                    marginLeft: "50px",
                  }}
                  src={logo}
                  alt=""
                />
                <div
                  style={{
                    width: "100%",
                    background: "white",
                    height: "1px",
                    textDecoration:"none",
                  }}
                ></div>
              </div>
              <Link to="/">
              <div
                style={{
                  padding: "10px 5px 10px 10px",
                  color: "white",
                  // WebkitBackgroundClip: "text",
                  // WebkitTextFillColor: "transparent",
                  marginTop: "150px",
                  marginLeft: "20px",
                  
                }}
              >
                Home
              </div>
              </Link>
              {/* <div
              style={{
                height: 1,
                backgroundColor: "white",
                margin: "2px 0px 2px 0px",
              }}
            ></div> */}
              <div
                style={{
                  color: "white",
                  padding: "10px 5px 10px 10px",
                  marginLeft: "20px",
                }}
              >
                How It Works?
              </div>
              {/* <div
              style={{
                height: 1,
                backgroundColor: "white",
                margin: "2px 0px 2px 0px",
              }}
            ></div> */}
              <div
                style={{
                  color: "white",
                  padding: "10px 5px 10px 10px",
                  marginLeft: "20px",
                }}
              >
                API Integration
              </div>
              {/* <div
              style={{
                height: 1,
                backgroundColor: "white",
                margin: "2px 0px 2px 0px",
              }}
            ></div> */}
              <div
                style={{
                  color: "white",
                  padding: "10px 5px 10px 10px",
                  marginLeft: "20px",
                }}
              >
                FAQ
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 340,
                  left: -16,
                  width: "35px",
                  height: "35px",
                  borderRadius: "999px",
                  background: "#071330",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "30%",
                    cursor: "pointer",
                    transform: "rotate(90deg)",
                  }}
                  src={expandup}
                  alt=""
                  onClick={() => {
                    setShowDropdown(!showDropdown);
                  }}
                />
              </div>
            </div>
          )}
        </MediaQuery>

        {/* <MediaQuery minWidth={430}></MediaQuery> */}
      </div>
    </>
  );
};
export default Header;

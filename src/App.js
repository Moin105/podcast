// import React, { useState, useEffect, useContext, useRef } from "react";
// import "./App.css";

// import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
// import NestedApp from "./NestedApp";
// import axios from 'axios';
// import { useTheme } from "./components/ThemeContext";
// import { set } from "date-fns";

// async function getData(url) {
//     try {
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.error(`Error occurred while fetching data from ${url}: `, error);
//     }
// }

// const App = () => {
//   const theme = useTheme()
//   function setFavicon(iconUrl) {
//     let link =
//       document.querySelector("link[rel*='icon']") ||
//       document.createElement("link");
//     link.type = "image/x-icon";
//     link.rel = "shortcut icon";
//     link.href = iconUrl;
//     document.getElementsByTagName("head")[0].appendChild(link);
//   }
//   const [icon, setIcon] = useState("");
//   useEffect(() => {
//     getData('https://podcasts.cucurico.co.il/podcast/public/api/appmanagement')
//     .then(data => {
//      return setIcon(data.data.icon) 
//     }
//     )
//     .catch(error => console.error(error));

//   }, [])
//   useEffect(() => {
//     setFavicon(`https://podcasts.cucurico.co.il/podcast/public/images/${icon}`);
//   }, [icon]);
  
//   return (
//     <>
//       <ThemeProvider>
//         <NestedApp />
//       </ThemeProvider>
//     </>
//   );
// };

// export default App;



import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";

import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
import NestedApp from "./NestedApp";
import axios from 'axios';


async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error occurred while fetching data from ${url}: `, error);
  }
}

const App = () => {
  const [icon, setIcon] = useState("");
  const [systemTheme, setSystemTheme] = useState("light"); // 'light' or 'dark'

  const lightModeIconUrl = `https://podcasts.cucurico.co.il/podcast/public/images/${icon}`;
  const darkModeIconUrl = `https://podcasts.cucurico.co.il/podcast/public/images/${icon}`;

  // Fetch data and set icon URL
  useEffect(() => {
    getData("https://podcasts.cucurico.co.il/podcast/public/api/appmanagement")
      .then((data) => setIcon(data.data.icon))
      .catch((error) => console.error(error));
  }, []);

  // Set favicon based on system theme and icon URL
  useEffect(() => {
    function setFavicon(iconUrl) {
      let link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = iconUrl;
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    setFavicon(systemTheme === "dark" ? darkModeIconUrl : lightModeIconUrl);
  }, [icon, systemTheme]);

  // Detect the system's preferred color scheme
  useEffect(() => {
    function handleSystemThemeChange(e) {
      setSystemTheme(e.matches ? "dark" : "light");
      console.log("darkkkkkdhscglakdfgwek", lightModeIconUrl)
    }

    const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(systemThemeQuery.matches ? "dark" : "light");
    systemThemeQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      systemThemeQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <>
          <>
       <ThemeProvider>
         <NestedApp />
       </ThemeProvider>
     </>
    </>
  );
};

export default App;

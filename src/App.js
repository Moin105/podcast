import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";

import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
import NestedApp from "./NestedApp";
import axios from 'axios';
import { set } from "date-fns";

async function getData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error occurred while fetching data from ${url}: `, error);
    }
}

const App = () => {
  function setFavicon(iconUrl) {
    let link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = iconUrl;
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  const [icon, setIcon] = useState("");
  useEffect(() => {
    getData('https://podcasts.cucurico.co.il/podcast/public/api/appmanagement')
    .then(data => {
     return setIcon(data.data.icon) 
    }
    )
    .catch(error => console.error(error));

  }, [])
  useEffect(() => {
    setFavicon(`https://podcasts.cucurico.co.il/podcast/public/images/${icon}`);
  }, [icon]);
  return (
    <>
      <ThemeProvider>
        <NestedApp />
      </ThemeProvider>
    </>
  );
};

export default App;

import React, { useState, useEffect, useContext, useRef } from "react";
import "./App.css";

import { ThemeContext, ThemeProvider } from "./components/ThemeContext";
import NestedApp from "./NestedApp";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <NestedApp />
      </ThemeProvider>
    </>
  );
};

export default App;

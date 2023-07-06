import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.css";
import { ThemeContext } from "../components/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";
const Footer = ({}) => {
  const { showPlayer } = useContext(ThemeContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return (
    <>
      <div
        style={{
          background: "#282828",
          width: "100%",
          paddingTop: 13,
          paddingBottom: showPlayer ? (isDesktopOrLaptop ? 165 : 220) : 13,
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
    </>
  );
};

export default Footer;

import React, { createContext, useState, useEffect } from "react";

const WindowWidthContext = createContext();

const WindowWidthContextProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(null);

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
  }, [windowWidth]);

  return (
    <WindowWidthContext.Provider value={windowWidth}>{children}</WindowWidthContext.Provider>
  );
};

export { WindowWidthContext, WindowWidthContextProvider };

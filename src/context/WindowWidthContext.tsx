import React, { createContext, useState, useEffect, ReactElement } from "react";

const WindowWidthContext = createContext<number | {}>({});

const WindowWidthContextProvider = ({
  children,
}: {
  children: any;
}): ReactElement => {
  const [windowWidth, setWindowWidth] = useState<number | {}>({});

  const updateDimensions = (): void => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {}, [windowWidth]);

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export { WindowWidthContext, WindowWidthContextProvider };

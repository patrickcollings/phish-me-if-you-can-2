import { WindowWidthContextProvider } from "./WindowWidthContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <WindowWidthContextProvider>
        {children}
    </WindowWidthContextProvider>
  );
};

export { GlobalContextProvider };

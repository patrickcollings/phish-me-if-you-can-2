import { ModalContextProvider } from "./ModalContext";
import { WindowWidthContextProvider } from "./WindowWidthContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <WindowWidthContextProvider>
      <ModalContextProvider>
        {children}
      </ModalContextProvider>
    </WindowWidthContextProvider>
  );
};

export { GlobalContextProvider };

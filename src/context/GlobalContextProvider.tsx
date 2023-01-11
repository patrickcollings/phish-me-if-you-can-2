import { ReactElement } from "react";
import { ModalContextProvider } from "./ModalContext";
import { WindowWidthContextProvider } from "./WindowWidthContext";

const GlobalContextProvider = ({
  children,
}: {
  children: any;
}): ReactElement => {
  return (
    <WindowWidthContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </WindowWidthContextProvider>
  );
};

export { GlobalContextProvider };

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { GlobalContextProvider } from "./context/GlobalContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();

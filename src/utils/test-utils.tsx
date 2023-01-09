import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import scoreReducer from "redux/scores";
import emailReducer from "redux/emails";
import type { RootState } from "redux/store";
import emails from "helpers/emails";

// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: any;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      emails: {
        emails: JSON.parse(JSON.stringify(emails)),
        emailList: JSON.parse(JSON.stringify(emails)),
        scamList: [],
        selectedEmail: null,
      },
      scores: {
        scores: {},
      },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        scores: scoreReducer,
        emails: emailReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  // @ts-expect-error
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

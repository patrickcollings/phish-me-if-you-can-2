import { configureStore } from "@reduxjs/toolkit";
import emails from "./emails";
import scores from "./scores";

const preloadedState = localStorage.getItem('reduxStore') ? JSON.parse(localStorage.getItem('reduxStore')) : {};

export const store = configureStore({
  reducer: {
    scores,
    emails,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxStore', JSON.stringify(store.getState()));
})
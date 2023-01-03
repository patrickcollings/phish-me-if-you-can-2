import { configureStore } from "@reduxjs/toolkit";
import showResult from './showResult';
import emails from "./emails";

const preloadedState = localStorage.getItem('reduxStore') ? JSON.parse(localStorage.getItem('reduxStore')) : {};

export const store = configureStore({
  reducer: {
    showResult,
    emails
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxStore', JSON.stringify(store.getState()));
})
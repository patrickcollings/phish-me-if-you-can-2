import { configureStore } from "@reduxjs/toolkit";
import selectedEmail from "./selectedEmail";
import showResult from './showResult';
import emailList from "./emailList";
import scamList from "./scamList";

const preloadedState = localStorage.getItem('reduxStore') ? JSON.parse(localStorage.getItem('reduxStore')) : {};

export const store = configureStore({
  reducer: {
    selectedEmail,
    showResult,
    emailList,
    scamList
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('reduxStore', JSON.stringify(store.getState()));
})
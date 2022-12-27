import { configureStore } from "@reduxjs/toolkit";
import selectedEmail from "./selectedEmail";
import showResult from './showResult';

export const store = configureStore({
  reducer: {
    selectedEmail,
    showResult,
  },
});

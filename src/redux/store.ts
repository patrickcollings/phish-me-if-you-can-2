import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import emails from "./emails";
import scores from "./scores";

const savedStore = localStorage.getItem('reduxStore');
const preloadedState = !!savedStore ? JSON.parse(savedStore) : {};

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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;

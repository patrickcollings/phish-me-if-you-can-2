import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  value: JSON.parse(localStorage.getItem('phishme_showResult')),
};

export const showResultSlice = createSlice({
  name: "showResult",
  initialState,
  reducers: {
    show: (state) => {
      state.value = true;
    },
    hide: (state) => {
      state.value = false;
    },
  },
});

export const { show, hide } = showResultSlice.actions;

export default showResultSlice.reducer;

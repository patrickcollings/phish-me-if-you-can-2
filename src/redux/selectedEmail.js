import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const selectedEmailSlice = createSlice({
  name: "selectedEmail",
  initialState,
  reducers: {
    select: (state, action) => {
        state.value = JSON.parse(JSON.stringify(action.payload));
    },
    deselect: (state) => {
        state.value = null;
    },
  },
});

export const { select, deselect } = selectedEmailSlice.actions;

export default selectedEmailSlice.reducer;

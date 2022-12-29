import { createSlice } from "@reduxjs/toolkit";
import emails from "../helpers/emails";
import { orderListByTime } from "../helpers/helper";

const initialState = {
  value: [],
};

export const scamListSlice = createSlice({
  name: "scamList",
  initialState,
  reducers: {
    spliceScamList: (state, action) => {
      state.value.splice(action.payload, 1);
    },
    appendScamList: (state, action) => {
      state.value.push(JSON.parse(JSON.stringify(action.payload)));
      orderListByTime(state.value);
    },
    resetScamList: (state) => {
      state.value = [];
    },
    showResultOnScamEmail: (state) => {
      state.value = state.value.map((email) => {
        email.correct = email.scam;
        return email;
      });
    },
  },
});

export const {
  spliceScamList,
  appendScamList,
  resetScamList,
  showResultOnScamEmail,
} = scamListSlice.actions;

export default scamListSlice.reducer;

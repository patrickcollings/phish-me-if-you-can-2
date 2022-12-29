import { createSlice } from "@reduxjs/toolkit";
import emails from "../helpers/emails";
import { orderListByTime } from "../helpers/helper";

const initialState = {
  value: JSON.parse(JSON.stringify(emails)),
};

export const emailListSlice = createSlice({
  name: "emailList",
  initialState,
  reducers: {
    spliceEmailList: (state, action) => {
      state.value.splice(action.payload, 1);
    },
    appendEmailList: (state, action) => {
      state.value.push(JSON.parse(JSON.stringify(action.payload)));
      orderListByTime(state.value);
    },
    resetEmailList: (state) => {
        state.value = JSON.parse(JSON.stringify(emails));
    },
    readEmail: (state, action) => {
        const index = state.value.findIndex((email) => action.payload.id === email.id);
        state.value[index].read = true;
    },
    showResultOnEmail: (state) => {
        state.value = state.value.map((email) => {
          email.correct = !email.scam;
          return email;
        }); 
    }
  },
});

export const { spliceEmailList, appendEmailList, resetEmailList, readEmail, showResultOnEmail } = emailListSlice.actions;

export default emailListSlice.reducer;

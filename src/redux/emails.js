import { createSlice } from "@reduxjs/toolkit";
import emails from "../helpers/emails";
import { orderListByTime } from "../helpers/helper";

const initialState = {
  emails: JSON.parse(JSON.stringify(emails)),
  emailList: JSON.parse(JSON.stringify(emails)),
  scamList: [],
  selectedEmail: null,
};

export const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    addSelectedEmailToScamList: (state) => {
      const index = state.emailList.findIndex(
        (email) => state.selectedEmail.id === email.id
      );
      if (index > -1) state.emailList.splice(index, 1);
      state.scamList.push(JSON.parse(JSON.stringify(state.selectedEmail)));
      orderListByTime(state.scamList);
    },
    removeSelectedEmailFromScamList: (state) => {
      const index = state.scamList.findIndex(
        (email) => state.selectedEmail.id === email.id
      );
      if (index > -1) state.scamList.splice(index, 1);
      state.emailList.push(JSON.parse(JSON.stringify(state.selectedEmail)));
      orderListByTime(state.emailList);
    },
    resetEmails: (state) => {
      state.emailList = JSON.parse(JSON.stringify(emails));
      state.scamList = [];
    },
    readEmail: (state, action) => {
      const index = state.emailList.findIndex(
        (email) => action.payload.id === email.id
      );
      state.emailList[index].read = true;
    },
    showResultOnEmail: (state) => {
      state.emailList = state.emailList.map((email) => {
        email.correct = !email.scam;
        return email;
      });
      state.scamList = state.scamList.map((email) => {
        email.correct = email.scam;
        return email;
      });
    },
    selectEmail: (state, action) => {
      state.selectedEmail = JSON.parse(JSON.stringify(action.payload));
    },
    deselectEmail: (state) => {
      state.selectedEmail = null;
    },
  },
});

export const {
  resetEmails,
  readEmail,
  showResultOnEmail,
  selectEmail,
  deselectEmail,
  addSelectedEmailToScamList,
  removeSelectedEmailFromScamList,
} = emailSlice.actions;

export default emailSlice.reducer;

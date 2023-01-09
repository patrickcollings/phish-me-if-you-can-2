import { createSlice } from "@reduxjs/toolkit";
import emails from "helpers/emails";
import { orderListByTime } from "helpers/helper";
import { Email } from "models/Email";
import { RootState } from "./store";

interface SliceState {
  emails: Email[];
  emailList: Email[];
  scamList: Email[];
  selectedEmail: Email | null;
}

const initialState: SliceState = {
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
        (email) => (state.selectedEmail != null) && state.selectedEmail.id === email.id
      );
      if (index > -1) state.emailList.splice(index, 1);
      state.scamList.push(JSON.parse(JSON.stringify(state.selectedEmail)));
      orderListByTime(state.scamList);
    },
    removeSelectedEmailFromScamList: (state) => {
      const index = state.scamList.findIndex(
        (email) => (state.selectedEmail != null) && state.selectedEmail.id === email.id
      );
      if (index > -1) state.scamList.splice(index, 1);
      state.emailList.push(JSON.parse(JSON.stringify(state.selectedEmail)));
      orderListByTime(state.emailList);
    },
    resetEmails: (state) => {
      state.emailList = JSON.parse(JSON.stringify(emails));
      state.scamList = [];
    },
    selectEmail: (state, action) => {
      const index = state.emailList.findIndex(
        (email) => action.payload.id === email.id
      );
      if (index > -1) state.emailList[index].read = true;
      state.selectedEmail = JSON.parse(JSON.stringify(action.payload));
    },
    deselectEmail: (state) => {
      state.selectedEmail = null;
    },
  },
});

export const selectIsEmailCorrect = (state: RootState, email: Email) => {
  const inScamList =
    state.emails.scamList.findIndex((e) => email.id === e.id) > -1;
  const inEmailList =
    state.emails.emailList.findIndex((e) => email.id === e.id) > -1;
  if (email.scam && inScamList) return true;
  if (!email.scam && inScamList) return false;
  if (email.scam && inEmailList) return false;
  if (!email.scam && inEmailList) return true;
  return false;
};

export const {
  resetEmails,
  selectEmail,
  deselectEmail,
  addSelectedEmailToScamList,
  removeSelectedEmailFromScamList,
} = emailSlice.actions;

export default emailSlice.reducer;

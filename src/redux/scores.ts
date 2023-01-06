import { createSlice } from "@reduxjs/toolkit";
import mixpanel from "mixpanel-browser";
import { Email } from "models/Email";
import { TOTAL_ATTEMPTS_ALLOWED } from "../helpers/constants";
import { getYearAndMonth } from "../helpers/helper";
import { RootState } from "./store";

if (process.env.REACT_APP_MIXPANEL_ID) {
  mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);
}

type Score = {
  attempts: number[];
  missed?: number;
  accidental?: number;
  caught?: number;
  score?: number;
};

type SliceState = {
  scores: {
    [key: string]: Score;
  };
};

const initialState: SliceState = {
  scores: {},
};

export const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    updateScoreForCurrentMonth: (state, action) => {
      const yearAndMonth = getYearAndMonth();

      if (
        state.scores[yearAndMonth] &&
        state.scores[yearAndMonth].attempts &&
        state.scores[yearAndMonth].attempts.length >= TOTAL_ATTEMPTS_ALLOWED
      ) {
        return;
      }

      const scamsMissed = action.payload.emailList.filter(
        (email: Email) => !!email.scam
      );
      const normalsCaught = action.payload.scamList.filter(
        (email: Email) => !email.scam
      );
      const totalScamsCaught =
        action.payload.scamList.length - normalsCaught.length;
      const penalty = normalsCaught.length > 0 ? normalsCaught.length / 2 : 0;
      const totalScore = totalScamsCaught - penalty;
      const score = Math.round(
        (totalScore / (totalScamsCaught + scamsMissed.length)) * 100
      );

      // Get previous attempts if exists
      let attempts =
        state.scores[yearAndMonth] && state.scores[yearAndMonth].attempts
          ? [...state.scores[yearAndMonth].attempts, totalScamsCaught]
          : [totalScamsCaught];

      state.scores[yearAndMonth] = { attempts };

      if (
        state.scores[yearAndMonth].attempts.length >= TOTAL_ATTEMPTS_ALLOWED ||
        score === 100
      ) {
        state.scores[yearAndMonth] = {
          attempts: state.scores[yearAndMonth].attempts,
          missed: scamsMissed.length,
          accidental: normalsCaught.length,
          caught: totalScamsCaught,
          score: score,
        };
        mixpanel.track("finished_test", state.scores[yearAndMonth]);
      }
    },
    restartCurrentMonth: (state) => {
      const yearAndMonth = getYearAndMonth();
      if (state.scores[yearAndMonth]) {
        delete state.scores[yearAndMonth];
      }
    },
  },
});

/**
 * Check that a score exists for the month. If it does then the game has been completed.
 *
 * @param {*} state
 * @returns boolean
 */
export const selectIsFinished = (state: RootState) => {
  return (
    state.scores.scores[getYearAndMonth()] &&
    "score" in state.scores.scores[getYearAndMonth()]
  );
};

export const selectCurrentAttempts = (state: RootState) => {
  return state.scores.scores[getYearAndMonth()] &&
    state.scores.scores[getYearAndMonth()].attempts
    ? state.scores.scores[getYearAndMonth()].attempts
    : [];
};

export const selectCurrentResult = (state: RootState) => {
  const yearAndMonth = getYearAndMonth();
  return state.scores.scores[yearAndMonth];
};

export const { updateScoreForCurrentMonth, restartCurrentMonth } =
  scoresSlice.actions;

export default scoresSlice.reducer;

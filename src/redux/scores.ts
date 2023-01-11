import { createSlice } from "@reduxjs/toolkit";
import mixpanel from "mixpanel-browser";
import { Email } from "models/Email";
import { TOTAL_ATTEMPTS_ALLOWED } from "../helpers/constants";
import { getYearAndMonth } from "../helpers/helper";
import { RootState } from "./store";

if (process.env.REACT_APP_MIXPANEL_ID != null) {
  mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);
}

interface Score {
  attempts: number[];
  missed?: number;
  accidental?: number;
  caught?: number;
  score?: number;
}

interface SliceState {
  scores: Record<string, Score>;
}

const initialState: SliceState = {
  scores: {},
};

export const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    updateScoreForCurrentMonth: (
      state,
      action: { payload: { emailList: Email[]; scamList: Email[] } }
    ) => {
      const yearAndMonth = getYearAndMonth();

      if (
        state.scores[yearAndMonth]?.attempts?.length >= TOTAL_ATTEMPTS_ALLOWED
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
      const attempts =
        state.scores[yearAndMonth]?.attempts != null
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
          score,
        };
        mixpanel.track("finished_test", state.scores[yearAndMonth]);
      }
    },
    restartCurrentMonth: (state) => {
      const yearAndMonth = getYearAndMonth();
      if (state.scores[yearAndMonth] != null) {
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
export const selectIsFinished = (state: RootState): boolean => {
  return (
    state.scores.scores[getYearAndMonth()] != null &&
    "score" in state.scores.scores[getYearAndMonth()]
  );
};

export const selectCurrentAttempts = (state: RootState): number[] => {
  return state.scores.scores[getYearAndMonth()]?.attempts != null
    ? state.scores.scores[getYearAndMonth()].attempts
    : [];
};

export const selectCurrentResult = (state: RootState): Score => {
  const yearAndMonth = getYearAndMonth();
  return state.scores.scores[yearAndMonth];
};

export const { updateScoreForCurrentMonth, restartCurrentMonth } =
  scoresSlice.actions;

export default scoresSlice.reducer;

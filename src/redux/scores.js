import { createSlice } from "@reduxjs/toolkit";
import { TOTAL_ATTEMPTS_ALLOWED } from "../helpers/constants";
import { getYearAndMonth } from "../helpers/helper";

const initialState = {
  scores: {},
};

export const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    updateScoreForCurrentMonth: (state, action) => {
      const yearAndMonth = getYearAndMonth();

      if (state.scores[yearAndMonth] && state.scores[yearAndMonth].attempts && state.scores[yearAndMonth].attempts.length >= TOTAL_ATTEMPTS_ALLOWED) {
        return;
      }

      const scamsMissed = action.payload.emailList.filter(
        (email) => !!email.scam
      );
      const normalsCaught = action.payload.scamList.filter(
        (email) => !email.scam
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
      }
      // TODO log to mixpanel here?
      // mixpanel.track("finished_test", {
      //   breakdown: {
      //     scamsMissed: results.missed,
      //     accidental: results.accidental,
      //     caught: results.caught,
      //   },
      //   score: results.score,
      //   attempt: attempts.length + 1,
      // });
    },
    restartCurrentMonth: (state) => {
        const yearAndMonth = getYearAndMonth();
        if (state.scores[yearAndMonth]) {
            delete state.scores[yearAndMonth];
        }
    }
  },
});

/**
 * Check that a score exists for the month. If it does then the game has been completed.
 * 
 * @param {*} state 
 * @returns boolean 
 */
export const selectIsFinished = (state) => {
    return state.scores.scores[getYearAndMonth()] &&
      state.scores.scores[getYearAndMonth()].score >= 0;
}

export const selectCurrentAttempts = (state) => {
    return state.scores.scores[getYearAndMonth()] &&
      state.scores.scores[getYearAndMonth()].attempts ?
      state.scores.scores[getYearAndMonth()].attempts : [];
}

export const selectCurrentResult = (state) => {
    const yearAndMonth = getYearAndMonth();
    return state.scores.scores[yearAndMonth];
}

export const { updateScoreForCurrentMonth, restartCurrentMonth } = scoresSlice.actions;

export default scoresSlice.reducer;

import { checkChallengeStarted } from "./helper";

export function getItem(name) {
    return JSON.parse(localStorage.getItem(name));
}

export function setItem(name, value) {
  return localStorage.setItem(name, value);
}

export function getPreviousResults() {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let savedScores = getItem("phishme_scores");
    let savedEmailList, savedScamList, savedShowResult, savedAttempts;

    if (savedScores && checkChallengeStarted(savedScores)) {
      savedShowResult = getItem("phishme_showResult");
      savedEmailList = getItem("phishme_emailList");
      savedScamList = getItem("phishme_scamList");
      savedAttempts = getItem("phishme_attempts");
    } else {
      if (savedScores) savedScores = [...savedScores, { month, year }];
      else savedScores = [{ month, year }];
    }

    return {
        savedScores,
        savedEmailList,
        savedScamList,
        savedShowResult,
        savedAttempts
    }
}
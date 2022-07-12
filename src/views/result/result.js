import { useEffect, useState } from "react";
import styled from "styled-components";
import emails from "../../assets/emails";
import { orderListByTime } from "../../assets/helper";
import EmailDisplay from "../../components/email-display/email-display";
import EmailSidebar from "../../components/email-sidebar/email-sidebar";
import FinishedDialog from "../../components/finished-dialog/finished-dialog";
import NavBar from "../../components/nav-bar/nav-bar";
import mixpanel from "mixpanel-browser";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/confirmation-dialog/confirmation-dialog";

mixpanel.init("123");
mixpanel.track("joined");

const EmailSidebarContainer = styled.div`
  position: absolute;
  top: 64px;
  bottom: 0;
  left: 0;
  width: 400px;
  max-width: 400px;
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

const EmailSidebarContainerMobile = styled.div`
  position: absolute;
  top: 64px;
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

const EmailDisplayContainer = styled.div`
  position: absolute;
  left: 400px;
  top: 64px;
  right: 0;
  bottom: 0;
  padding-bottom: 20px;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
`;

const date = new Date(2022, 4, 10);
const month = date.toLocaleString("default", { month: "long" });
const year = date.getFullYear();

const checkChallengeStarted = (scores, completed = false) => {
  if (!scores) return false;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].month === month && scores[i].year === year) {
      return (completed && !scores[i].result) ? false : true;
    }
  }
  return false;
};

let savedScores = JSON.parse(localStorage.getItem("phishme_scores"));
let savedEmailList, savedScamList, savedShowResult, savedAttempts;

console.log(checkChallengeStarted(savedScores, false));

if (savedScores && checkChallengeStarted(savedScores) ) {
  savedShowResult = JSON.parse(localStorage.getItem("phishme_showResult"));
  savedEmailList = JSON.parse(localStorage.getItem("phishme_emailList"));
  savedScamList = JSON.parse(localStorage.getItem("phishme_scamList"));
  savedAttempts = JSON.parse(localStorage.getItem("phishme_attempts"));
} else {
  if (savedScores) 
    savedScores = [...savedScores, {month, year}];
  else 
    savedScores = [{ month, year }];
}

orderListByTime(emails);

export default function Result(props) {
  
  let params = useParams();
  let navigate = useNavigate();
  let emailFound;

  const [scamList, setScamList] = useState(savedScamList ?? []);
  const [emailList, setEmailList] = useState(
    savedEmailList ?? JSON.parse(JSON.stringify(emails))
  );
  const [isScamSelected, setIsScamSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [finishedOpen, setFinishedOpen] = useState(false);
  const [showResult, setShowResult] = useState(savedShowResult ?? false);
  const [attempts, setAttempts] = useState(savedAttempts ?? []);
  const [previousScores, setPreviousScores] = useState(savedScores ?? []);
  const [result, setResult] = useState(showResult ? calculateResults : {});
  const [width, setWindowWidth] = useState(0);
  if (params.emailId) {
    emailFound = [scamList, ...emailList].find((email) => email.id === parseInt(params.emailId));
  }
  const [selectedEmail, setSelectedEmail] = useState(emailFound && emailFound);



  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  function selectEmail(index) {
    emailList[index]["read"] = true;
    setIsScamSelected(false);
    setSelectedEmail(emailList[index]);
    setEmailList([...emailList]);
    navigate(`/inbox/${emailList[index].id}`);
  }

  function selectScamEmail(index) {
    scamList[index]["read"] = true;
    setIsScamSelected(true);
    setSelectedEmail(scamList[index]);
    setScamList([...scamList]);
    navigate(`/scambox/${scamList[index].id}`);
  }

  function findEmailIndex(selectedEmail) {
    return emailList.findIndex((email) => selectedEmail.id === email.id);
  }

  function findScamEmailIndex(selectedEmail) {
    return scamList.findIndex((email) => selectedEmail.id === email.id);
  }

  function addToScamList() {
    console.log('adding to scamlist', selectedEmail);
    const index = findEmailIndex(selectedEmail);
    console.log(index);
    if (index < 0) return;
    let newScamList = [...scamList, emailList[index]];
    orderListByTime(newScamList);
    setScamList(newScamList);
    emailList.splice(index, 1);
    orderListByTime(emailList);
    setEmailList([...emailList]);
    setSelectedEmail(null);
  }

  function removeFromScamList() {
    const index = findScamEmailIndex(selectedEmail);
    if (index < 0) return;
    let newEmailList = [...emailList, scamList[index]];
    orderListByTime(newEmailList);
    setEmailList(newEmailList);
    scamList.splice(index, 1);
    orderListByTime(scamList);
    setScamList([...scamList]);
    setSelectedEmail(null);
  }

  function handleDeselect() {
    setSelectedEmail(null);
  }

  function calculateResults() {
    const scamsMissed = emailList.filter((email) => !!email.scam);
    const normalsCaught = scamList.filter((email) => !email.scam);
    const totalScamsCaught = scamList.length - normalsCaught.length;
    mixpanel.track("finished_test", {scamsMissed, normalsCaught, score: {scamsMissed: scamsMissed.length, accidental: normalsCaught.length, caught: totalScamsCaught}});
    const penalty = (normalsCaught.length > 0) ? (normalsCaught.length / 2) : 0;
    const totalScore = totalScamsCaught - penalty;
    const score = Math.round((totalScore / (totalScamsCaught + scamsMissed.length)) * 100);
    return {
      missed: scamsMissed.length,
      accidental: normalsCaught.length,
      caught: totalScamsCaught,
      score
    };
  }

  const showResults = () => {
    emailList.map((email) => {
      email.correct = !email.scam;
      return email;
    });
    setEmailList([...emailList]);
    scamList.map((email) => {
      email.correct = email.scam;
      return email;
    });
    setScamList([...scamList]);
  };

  const handleClickOpen = () => {
    if (attempts.length >= 3) setFinishedOpen(true);
    else setOpen(true);
  };

  const handleClickReset = () => {
    localStorage.removeItem("phishme_scamList");
    localStorage.removeItem("phishme_emailList");
    localStorage.removeItem("phishme_showResult");
    localStorage.removeItem("phishme_hide_welcome_dialog");
    localStorage.removeItem("phishme_attempts");
    setScamList([]);
    setEmailList(JSON.parse(JSON.stringify(emails)));
    setSelectedEmail(null);
    setShowResult(false);
    setOpen(false);
    setIsScamSelected(false);
    setResult({});
    setAttempts([]);
  };

  const handleClose = (isFinished) => {
    setOpen(false);
    if (attempts.length >= 3) return;
    if (isFinished) {
      const results = calculateResults();
      setResult(results);
      setAttempts([...attempts, results.score]);
      setShowResult(true);
    } 
  };
  
  const handleFinishedClose = () => {
    setFinishedOpen(false);
  }

  const getEmailSidebar = () => {
    return (

          <EmailSidebar
            emailList={emailList}
            scamList={scamList}
            selectEmail={selectEmail}
            selectScamEmail={selectScamEmail}
            selectedEmail={selectedEmail}
            showResult={showResult}
          />
    );
  };

  const getEmailDisplay = (isMobile = false) => {
    return (
      <EmailDisplay
        selectedEmail={selectedEmail}
        isScamEmail={isScamSelected}
        add={addToScamList}
        remove={removeFromScamList}
        isMobile={isMobile}
        handleDeselect={handleDeselect}
      ></EmailDisplay>
    );
  };

  useEffect(() => {
    localStorage.setItem("phishme_scamList", JSON.stringify(scamList));
  }, [scamList]);

  useEffect(() => {
    localStorage.setItem("phishme_emailList", JSON.stringify(emailList));
  }, [emailList]);

  useEffect(() => {
    if (attempts.length === 3 && showResult) {
      showResults();
      setFinishedOpen(true);
      if (!checkChallengeStarted(previousScores, true)) {
        const scoreList = [...previousScores];
        scoreList[scoreList.length - 1].result = result;
        console.log(scoreList);
        setPreviousScores(scoreList);
      }
    } else {
      setShowResult(false);
    }
    localStorage.setItem("phishme_showResult", showResult);
  }, [showResult]);

  useEffect(() => {
    localStorage.setItem("phishme_attempts", JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem("phishme_scores", JSON.stringify(previousScores));
  }, [previousScores]);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <NavBar
        openClick={handleClickOpen}
        resetClick={handleClickReset}
        showResult={showResult}
        result={result}
        attempts={attempts}
      />
      <ConfirmationDialog
        handleClose={handleClose}
        open={open}
      ></ConfirmationDialog>
      <FinishedDialog
        open={finishedOpen}
        handleClose={handleFinishedClose}
        result={result}
      ></FinishedDialog>
      {width > 1000 && (
        <Container>
          <EmailSidebarContainer>
            <div style={{ height: "100%" }}>{getEmailSidebar()}</div>
          </EmailSidebarContainer>
          <EmailDisplayContainer>{getEmailDisplay()}</EmailDisplayContainer>
        </Container>
      )}
      {width < 1000 && !selectedEmail && (
        <EmailSidebarContainerMobile>
          <div style={{ height: "100%" }}>{getEmailSidebar()}</div>
        </EmailSidebarContainerMobile>
      )}
      {width < 1000 && !!selectedEmail && (
        <EmailSidebarContainerMobile>
          <div style={{ height: "100%" }}>{getEmailDisplay(true)}</div>
        </EmailSidebarContainerMobile>
      )}
    </>
  );
}

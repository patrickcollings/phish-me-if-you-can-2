import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from '@reactour/tour';
import mixpanel from "mixpanel-browser";
import styled from "styled-components";

import emails from "../helpers/emails";
import { checkChallengeStarted, orderListByTime } from "../helpers/helper";
import EmailDisplay from "../components/EmailDisplay/EmailDisplay";
import EmailSidebar from "../components/EmailSidebar/EmailSidebar";
import FinishedDialog from "../components/FinishedDialog/FinishedDialog";
import NavBar from "../components/NavBar/NavBar";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import TipDialog from "../components/TipDialog/TipDialog";
import { Alert, Snackbar } from "@mui/material";
import { getItem, getPreviousResults, setItem } from "../helpers/local-storage";

mixpanel.init(process.env.REACT_APP_MIXPANEL_ID);
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
  bottom: 0;
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

let { savedScores, savedEmailList, savedScamList, savedShowResult, savedAttempts } = getPreviousResults();
orderListByTime(emails);

export default function Main() {
  let params = useParams();
  let navigate = useNavigate();
  const location = useLocation();

  const [scamList, setScamList] = useState(savedScamList ?? []);
  const [emailList, setEmailList] = useState(
    savedEmailList ?? JSON.parse(JSON.stringify(emails))
  );
  const [isScamSelected, setIsScamSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [finishedOpen, setFinishedOpen] = useState(false);
  const [showResult, setShowResult] = useState(savedShowResult ?? false);
  const [attempts, setAttempts] = useState(savedAttempts ?? []);
  const [previousScores, setPreviousScores] = useState(savedScores ?? []);
  const [result, setResult] = useState(showResult ? calculateResults : {});
  const [width, setWindowWidth] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [openScamboxFullSnackBar, setScamboxFullSnackBar] = useState(false);
  const { isOpen, currentStep, setCurrentStep } = useTour();

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  function selectEmail(index) {
    emailList[index]["read"] = true;
    setIsScamSelected(false);
    setSelectedEmail(emailList[index]);
    setEmailList([...emailList]);
  }

  function selectScamEmail(index) {
    scamList[index]["read"] = true;
    setIsScamSelected(true);
    setSelectedEmail(scamList[index]);
    setScamList([...scamList]);
  }

  function findEmailIndex(selectedEmail) {
    return emailList.findIndex((email) => selectedEmail.id === email.id);
  }

  function findScamEmailIndex(selectedEmail) {
    return scamList.findIndex((email) => selectedEmail.id === email.id);
  }

  function addToScamList() {
    const index = findEmailIndex(selectedEmail);
    if (index < 0) return;
    if (scamList.length > 4) {
      setScamboxFullSnackBar(true);
      return;
    }
    let newScamList = [...scamList, selectedEmail];
    orderListByTime(newScamList);
    setScamList(newScamList);
    emailList.splice(index, 1);
    orderListByTime(emailList);
    setEmailList([...emailList]);
    navigate('/inbox');
  }

  function removeFromScamList() {
    const index = findScamEmailIndex(selectedEmail);
    if (index < 0) return;
    delete selectedEmail.correct;
    let newEmailList = [...emailList, selectedEmail];
    orderListByTime(newEmailList);
    setEmailList(newEmailList);
    scamList.splice(index, 1);
    orderListByTime(scamList);
    setScamList([...scamList]);
    navigate("/scambox");
  }

  function handleDeselect() {
    let inboxType = location.pathname.split('/')[1];
    navigate(`/${inboxType}`, {replace: false});
  }

  function calculateResults() {
    const scamsMissed = emailList.filter((email) => !!email.scam);
    const normalsCaught = scamList.filter((email) => !email.scam);
    const totalScamsCaught = scamList.length - normalsCaught.length;
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

  const showScamListResults = () => {
    scamList.map((email) => {
      email.correct = email.scam;
      return email;
    });
    setScamList([...scamList]);
  }

  const handleClickOpen = () => {
    if (attempts.length > 2) setFinishedOpen(true);
    if (attempts.length < 2) handleClose(true);
    if (attempts.length === 2) setOpen(true);
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

      mixpanel.track("finished_test", {
        breakdown: {
          scamsMissed: results.missed,
          accidental: results.accidental,
          caught: results.caught,
        },
        score: results.score,
        attempt: attempts.length + 1
      });
      if (results.score === 100 && attempts.length < 2) {
        let newAttempts = [...attempts];
        while (newAttempts.length < 3) newAttempts.push(results.caught);
        setAttempts(newAttempts)
      } else {
        setAttempts([...attempts, results.caught]);
      }
      setShowResult(true);
    } 
  };
  
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
        showResult={showResult}
      ></EmailDisplay>
    );
  };

  useEffect(() => {
    let emailFound, scamFound;
    if (params.emailId) {
      emailFound = emailList.find(
        (email) => email.id === parseInt(params.emailId)
      );
      scamFound = scamList.find(
        (email) => email.id === parseInt(params.emailId)
      );
    }
    if (emailFound) {
      setIsScamSelected(false);
      let index = findEmailIndex(emailFound);
      emailFound.read = true;
      setEmailList(e => {
        e[index].read = true;
        return [...e]
      });
      setSelectedEmail(emailFound);
      if (currentStep === 1 && isOpen) setCurrentStep(2);
    }
    else if (scamFound) {
      setIsScamSelected(true);
      let index = findScamEmailIndex(scamFound);
      scamFound.read = true;
      scamList[index].read = true;
      setScamList([...scamList]);
      setSelectedEmail(scamFound);
    } else {
      setSelectedEmail(null);
    }
  }, [params]);

  useEffect(() => {
    setItem("phishme_scamList", JSON.stringify(scamList));
  }, [scamList]);

  useEffect(() => {
    setItem("phishme_emailList", JSON.stringify(emailList));
  }, [emailList]);

  useEffect(() => {
    if (attempts.length === 3 && showResult) {
      emailList.map((email) => {
        email.correct = !email.scam;
        return email;
      });
      setEmailList([...emailList]);
      showScamListResults();
      setFinishedOpen(true);
      if (!checkChallengeStarted(previousScores, true)) {
        const scoreList = [...previousScores];
        scoreList[scoreList.length - 1].result = result;
        setPreviousScores(scoreList);
      }
    } else {
      setShowResult(false);
    }
    setItem("phishme_showResult", showResult);
  }, [showResult]);

  useEffect(() => {
    setItem("phishme_attempts", JSON.stringify(attempts));
    if ((attempts.length === 1 || attempts.length === 2) && (attempts[0] < 100 || attempts[1] < 100)) {
      setTipOpen(true);
    }
  }, [attempts]);

  useEffect(() => {
    setItem("phishme_scores", JSON.stringify(previousScores));
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
        title="View your final score?"
      />
      <FinishedDialog
        open={finishedOpen}
        handleClose={() => setFinishedOpen(false)}
        result={result}
      />
      <TipDialog
        open={tipOpen}
        score={attempts}
        attempts={attempts.length}
        handleClose={() => setTipOpen(false)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openScamboxFullSnackBar}
        autoHideDuration={10000}
        onClose={() => setScamboxFullSnackBar(false)}
      >
        <Alert
          onClose={() => setScamboxFullSnackBar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          <b>Scambox full!</b> There is only 5 scams to find.
        </Alert>
      </Snackbar>

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

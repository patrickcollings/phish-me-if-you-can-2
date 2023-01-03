import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTour } from '@reactour/tour';
import mixpanel from "mixpanel-browser";
import styled from "styled-components";

import { checkChallengeStarted } from "../helpers/helper";
import EmailDisplay from "../components/EmailDisplay/EmailDisplay";
import EmailSidebar from "../components/EmailSidebar/EmailSidebar";
import FinishedDialog from "../components/FinishedDialog/FinishedDialog";
import NavBar from "../components/NavBar/NavBar";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import TipDialog from "../components/TipDialog/TipDialog";
import { Alert, Snackbar } from "@mui/material";
import { getPreviousResults, setItem } from "../helpers/local-storage";
import { useContext } from "react";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { useDispatch, useSelector } from "react-redux";
import { show, hide } from "../redux/showResult";
import { addSelectedEmailToScamList, deselectEmail, readEmail, removeSelectedEmailFromScamList, resetEmails, selectEmail, showResultOnEmail } from "../redux/emails";

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

let { savedScores, savedAttempts } = getPreviousResults();

export default function Main() {
  let params = useParams();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false); // TODO implement global modal service
  const [tipOpen, setTipOpen] = useState(false);
  const [finishedOpen, setFinishedOpen] = useState(false); 
  const showResult = useSelector((state) => state.showResult.value);
  const [attempts, setAttempts] = useState(savedAttempts ?? []);
  const [previousScores, setPreviousScores] = useState(savedScores ?? []);
  const [result, setResult] = useState(showResult ? calculateResults : {});
  const [openScamboxFullSnackBar, setScamboxFullSnackBar] = useState(false);
  const { isOpen, currentStep, setCurrentStep } = useTour();

  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const emailList = useSelector((state) => state.emails.emailList);
  const scamList = useSelector((state) => state.emails.scamList);
  const width = useContext(WindowWidthContext);

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

  const handleClickOpen = () => {
    if (attempts.length > 2) setFinishedOpen(true);
    if (attempts.length < 2) handleClose(true);
    if (attempts.length === 2) setOpen(true);
  };

  const handleClickReset = () => {
    localStorage.removeItem("phishme_hide_welcome_dialog");
    localStorage.removeItem("phishme_attempts");
    dispatch(resetEmails())
    dispatch(deselectEmail());
    dispatch(hide());
    setOpen(false);
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
      dispatch(show());
    } 
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
      dispatch(selectEmail(emailFound));
      dispatch(readEmail(emailFound))
      if (currentStep === 1 && isOpen) setCurrentStep(2);
    }
    else if (scamFound) {
      dispatch(selectEmail(scamFound));
    } else {
      dispatch(deselectEmail());
    }
  }, [params]);

  useEffect(() => {
    if (attempts.length === 3 && showResult) {
      dispatch(showResultOnEmail());
      setFinishedOpen(true);
      if (!checkChallengeStarted(previousScores, true)) {
        const scoreList = [...previousScores];
        scoreList[scoreList.length - 1].result = result;
        setPreviousScores(scoreList);
      }
    } else {
      dispatch(hide());
    }
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

  return (
    <>
      <NavBar
        openClick={handleClickOpen}
        resetClick={handleClickReset}
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
            <div style={{ height: "100%" }}>
              <EmailSidebar />
            </div>
          </EmailSidebarContainer>
          <EmailDisplayContainer>
            <EmailDisplay />
          </EmailDisplayContainer>
        </Container>
      )}
      {width < 1000 && !selectedEmail && (
        <EmailSidebarContainerMobile>
          <div style={{ height: "100%" }}>
            <EmailSidebar />
          </div>
        </EmailSidebarContainerMobile>
      )}
      {width < 1000 && !!selectedEmail && (
        <EmailSidebarContainerMobile>
          <div style={{ height: "100%" }}><EmailDisplay /></div>
        </EmailSidebarContainerMobile>
      )}
    </>
  );
}

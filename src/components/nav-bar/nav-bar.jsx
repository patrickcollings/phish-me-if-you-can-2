import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/white-logo.png";
import { Done } from "@mui/icons-material/";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";
import { useState } from "react";
import './nav-bar.css';

const date = new Date();
const month = date.toLocaleString("default", { month: "long" });

export default function NavBar({openClick, resetClick, attempts}) {
  const [open, setOpen] = useState(false);

  const isFinished = attempts.length === 3;

  const getScore = (score, type, index) => {
    switch (type) {
      case "previous":
        return <span style={{ color: "#A3A3A3" }} key={index}>{score}%</span>;
      case "current":
        return (
          <span style={{ WebkitTextStroke: "1px red" }} key={index}>
            ?
          </span>
        );
      case "future":
        return (
          <span style={{ color: "#A3A3A3" }} key={index}>
            ?
          </span>
        );
      case "complete":
        return (
          <span style={{ color: "white" }} key={index}>
            {score}%
          </span>
        );
    }  
  }

  const setupScores = () => {
    const attemptNumber = attempts.length; 
    const attemptCopy = [...attempts];

    while (attemptCopy.length < 3) {
      attemptCopy.push(false);
    }

    return attemptCopy.map((attempt, index) => 
    {
      if (attemptNumber === 3) return getScore(attempt, 'complete', index);
      if (index === attemptNumber) return getScore(attempt, 'current', index);
      if (typeof attempt === 'boolean') return getScore(attempt, "future", index); 
      return (getScore(attempt, 'previous'));
    })
  }

  const confirmReset = (confirm) => {
    if (confirm) resetClick();
    setOpen(false);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#2A1E5C" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                flexGrow: 1,
                flexBasis: 0,
                alignItems: "center",
              }}
            >
              <a href={process.env.REACT_APP_LANDING_URL}>
                <img src={logo} style={{ height: "30px", width: "30px" }} />
              </a>
              <p className="ChallengeTitle" style={{ margin: "0 0 0 1rem" }}>
                {month} challenge
              </p>
            </div>
            <div>
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "0",
                  fontSize: "14px",
                }}
              >
                {isFinished ? 'final scores' : `${3 - attempts.length} attempts remaining`}
              </p>
              <div className="ScoreContainer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "25px",
                }}
              >
                {setupScores()}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={openClick}
              >
                <span className="SubmitButtonText">{isFinished ? 'View Score' : 'Submit'}</span>
                {isFinished ? <AssessmentOutlinedIcon /> : <Done />}
              </Button>
              {/* <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={resetClick}
              >
                Reset
                <Done />
              </Button> */}
              {/* <IconButton
                aria-label="done"
                style={{ color: "white", cursor: "pointer" }}
                onClick={openClick}
              >
                <Done />
              </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmationDialog
        handleClose={confirmReset}
        open={open}
        title={"This wil reset the entire game"}
      ></ConfirmationDialog>
    </>
  );
}

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/white-logo.png";
import { Done, RestartAlt } from "@mui/icons-material/";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";
import { useState } from "react";
import './nav-bar.css';

const date = new Date();
const month = date.toLocaleString("default", { month: "long" });


export default function NavBar({openClick, resetClick, attempts, result}) {
  const [open, setOpen] = useState(false);
  
  const isFinished = attempts.length === 3;

  const confirmReset = (confirm) => {
    if (confirm) resetClick();
    setOpen(false);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
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
                <img src={logo} style={{ height: "30px", width: "30px" }} alt="phish me if you can logo" />
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
                  color: "#e6e0ff",
                }}
              >
                {isFinished
                  ? "final score"
                  : `${3 - attempts.length} attempt${
                      3 - attempts.length !== 1 ? "s" : ""
                    } remaining`}
              </p>
              <div
                className="ScoreContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "25px",
                }}
              >
                {isFinished ? (
                  <span>{result.score}%</span>
                ) : (
                  <span>
                    {attempts.length > 0 ? attempts[attempts.length - 1] : 0}/5
                    scams caught
                  </span>
                )}
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
              {isFinished && (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black", marginRight: '1rem' }}
                  onClick={() => setOpen(true)}
                >
                  <span className="SubmitButtonText">Restart</span>
                  <RestartAlt />
                </Button>
              )}
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={openClick}
              >
                <span className="SubmitButtonText">
                  {isFinished ? "View Score" : "Submit"}
                </span>
                {isFinished ? <AssessmentOutlinedIcon /> : <Done />}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmationDialog
        handleClose={confirmReset}
        open={open}
        title={"This will restart the entire game"}
      ></ConfirmationDialog>
    </>
  );
}

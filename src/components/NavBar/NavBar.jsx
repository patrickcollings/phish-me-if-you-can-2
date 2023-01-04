import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import Button from "@mui/material/Button";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import EmailIcon from "@mui/icons-material/Email";

import "./NavBar.css";
import SideDrawer from "../SideDrawer/SideDrawer";
import useModal from "../../hooks/useModal";
import { FinishedDialog } from '../Modals/FinishedDialog/FinishedDialog';
import ConfirmationDialog from "../Modals/ConfirmationDialog/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentAttempts, selectCurrentResult, selectIsFinished, updateScoreForCurrentMonth } from "../../redux/scores";
import TipDialog from "../Modals/TipDialog/TipDialog";
import { TOTAL_ATTEMPTS_ALLOWED } from "../../helpers/constants";

const date = new Date();
const month = date.toLocaleString("default", { month: "long" });

export default function NavBar() {
  const dispatch = useDispatch();

  const { handleModal } = useModal();

  const isFinished = useSelector((state) => selectIsFinished(state));
  const currentAttempts = useSelector((state) => selectCurrentAttempts(state));
  const currentResult = useSelector((state) => selectCurrentResult(state));
  const emailList = useSelector((state) => state.emails.emailList);
  const scamList = useSelector((state) => state.emails.scamList);

  const handleSubmit = () => {
    if (currentAttempts.length === TOTAL_ATTEMPTS_ALLOWED - 1) {
      handleModal(
        <ConfirmationDialog
          handleClose={(confirm) => confirm && dispatch(updateScoreForCurrentMonth({ emailList, scamList }))}
          description={"Finish the game?"}
        ></ConfirmationDialog>
      );
    } else {
      dispatch(updateScoreForCurrentMonth({ emailList, scamList }));
    }
  }

  useEffect(() => {
    if (currentResult && isFinished) {
      handleModal(<FinishedDialog />);
    } else {
      handleModal(<TipDialog />);
    }
  }, [currentResult])

  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
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
              <SideDrawer />
              <p className="ChallengeTitle" style={{ margin: "0 0 0 1rem" }}>
                {month} challenge
              </p>
            </div>
            <div>
              {isFinished && (
                <p
                  style={{
                    textAlign: "center",
                    width: "100%",
                    margin: "0",
                    fontSize: "13px",
                    color: "#e6e0ff",
                  }}
                >
                  Score
                </p>
              )}
              <div
                className="ScoreContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                {isFinished ? (
                  <span>{currentResult.score}%</span>
                ) : (
                  currentAttempts.length > 0 && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {[...Array(currentAttempts[currentAttempts.length - 1])].map(
                        (attempt, i) => {
                          return (
                            <MarkEmailReadIcon
                              key={i}
                              style={{ marginLeft: "0.5rem" }}
                            />
                          );
                        }
                      )}
                      {[...Array(5 - currentAttempts[currentAttempts.length - 1])].map(
                        (attempt, i) => {
                          return (
                            <EmailIcon key={i} style={{ marginLeft: "0.5rem", opacity: 0.2 }} />
                          );
                        }
                      )}
                    </span>
                  )
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
              <Button
                className="submit-button"
                data-tour="submit-attempt"
                variant={isFinished ? 'text': 'outlined'}
                style={{
                  backgroundColor: isFinished ? "" : "white",
                  color: isFinished ? "white" : "black",
                }}
                onClick={handleSubmit}
              >
                <span className="SubmitButtonText">
                  {isFinished && "View Score"}
                </span>
                {isFinished ? <AssessmentOutlinedIcon /> : <span>Submit</span>}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

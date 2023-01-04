import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import tutorialGraphic from '../../../assets/tutorialGraphic.svg';
import tutorialGraphicMobile from "../../../assets/tutorialGraphicMobile.svg";

import './WelcomeDialog.css';

export default function WelcomeDialog({ handleClose }) {
  return (
    <div>
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center", fontWeight: "bold", color: "#493698" }}
        >
          {"How to play"}
        </DialogTitle>
        <DialogContent>
          <div className="LargeTutorial Tutorial">
            <img src={tutorialGraphic} alt="tutorial infographic" />
          </div>
          <div className="SmallTutorial Tutorial">
            <img src={tutorialGraphicMobile} alt="tutorial infographic" />
          </div>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "center", flexFlow: "wrap-reverse" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
              }}
              style={{ backgroundColor: "#493698", width: "150px" }}
            >
              Play
            </Button>
          </div>
        </DialogActions>
    </div>
  );
}

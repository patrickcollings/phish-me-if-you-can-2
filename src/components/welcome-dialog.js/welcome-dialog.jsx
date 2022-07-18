import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import tutorialGraphic from '../../assets/tutorialGraphic.svg';
import tutorialGraphicMobile from "../../assets/tutorialGraphicMobile.svg";

import './WelcomeDialog.css';

export default function WelcomeDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.handleClose(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center", fontWeight: "bold", color: "#493698" }}
        >
          {"How to play"}
        </DialogTitle>
        <DialogContent>
          <div className="LargeTutorial Tutorial">
            <img src={tutorialGraphic} />
          </div>
          <div className="SmallTutorial Tutorial">
            <img src={tutorialGraphicMobile} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "3rem",
            }}
          >
            <h3 style={{ marginBottom: 0, color: "#493698" }}>A few tips</h3>
            <ul className="TipList">
              <li>Always check the email address</li>
              <li>Check the links to see where they would lead</li>
              <li>If it seems too good to be true, then it probably is!</li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {/* <Button
            variant="outlined"
            onClick={() => {
              props.handleClose(true);
            }}
          >
            Don't show again
          </Button> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                props.handleClose(false);
              }}
              style={{ backgroundColor: "#493698" }}
            >
              Play
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

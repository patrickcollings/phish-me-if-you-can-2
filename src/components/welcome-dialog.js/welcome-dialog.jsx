import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
        <DialogTitle id="alert-dialog-title">
          {"Phish Me If You Can"}
        </DialogTitle>
        <DialogContent>
          <p>
            <b>Aim of the game</b>: find and add all phishing emails to your
            scambox
          </p>
          <ul>
            <li>
              Click the tick in the top right once you've finished
            </li>
            <li>
              This is a mock mailbox using some real world examples of scam
              emails that I have received over the last few years.
            </li>
            <li>
              personally identifying links have been removed but some links will
              still direct you to a live website
            </li>
            <li>
              it's better to be safe than sorry: you will only lose half points
              for accidentally flagging a real email.
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              props.handleClose(true);
            }}
          >
            Don't show again
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.handleClose(false);
            }}
            autoFocus
          >
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
        <DialogTitle id="alert-dialog-title">{"How to play"}</DialogTitle>
        <DialogContent>
          <p style={{ margin: 0 }}>
            <b>
              Phishing is a type of scam where criminals pretend to be someone
              else in order to steal sensitive information.
            </b>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ol>
              <li>Find all the scams</li>
              <li>Add them to your scambox</li>
              <li>Submit each attempt</li>
            </ol>
          </div>
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
          >
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

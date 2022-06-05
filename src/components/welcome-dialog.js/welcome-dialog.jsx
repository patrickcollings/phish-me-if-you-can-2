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
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Welcome"}</DialogTitle>
        <DialogContent>
          Yes
        </DialogContent>
        <DialogActions>
        <Button
            onClick={() => {
              props.handleClose(true);
            }}
          >
            Don't show again
          </Button>
          <Button
            onClick={() => {
              props.handleClose();
            }}
            autoFocus
          >
            Go
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FinishedDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {props.handleClose(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your Results"}</DialogTitle>
        <DialogContent>
          {!!props.result && (
            <>
              {/* <DialogContentText id="alert-dialog-description">
                Missed {props.result.missed ?? 0}
              </DialogContentText> */}
              <DialogContentText id="alert-dialog-description">
                You've caught {props.result.caught ?? 0} phishing email(s)
              </DialogContentText>
              {/* <DialogContentText id="alert-dialog-description">
                Accidental {props.result.accidental ?? 0}
              </DialogContentText> */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose(false);
            }}
          >
            Keep trying
          </Button>
          <Button
           variant="contained"
            onClick={() => {
              props.handleClose(true);
            }}
            autoFocus
          >
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

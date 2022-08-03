import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";

export default function ConfirmationDialog(props) {
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
        <DialogTitle id="alert-dialog-title">{props.title ? props.title : "Are you sure?"}</DialogTitle>
        <DialogContent>
            {props.description && <p>{props.description}</p>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose(false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.handleClose(true);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

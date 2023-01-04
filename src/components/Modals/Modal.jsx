import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export default function Modal({ children, close, open }) {
  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    {children}
      <DialogActions>
        <Button
          variant="contained"
          onClick={close}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export default function Modal({ children, close, open }: { children: any, close: () => void, open: boolean }) {
  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
}

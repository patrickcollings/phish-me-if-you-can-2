import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogTitle } from "@mui/material";

import './TipDialog.css';

export default function TipDialog({ open, handleClose, score, attempts }) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ textAlign: "center", fontWeight: "bold", color: "#493698" }}
      >
        {"Here's some tips"}
      </DialogTitle>
      <DialogContent>
        {score.length > 0 && (
          <p style={{ textAlign: "center", marginBottom: "50px" }}>
            You've caught <b>{score[score.length - 1]}/5</b> of the scam emails.
          </p>
        )}
        {attempts && (
          <p style={{ textAlign: "center", marginBottom: "50px" }}>
            <b>{3 - attempts}</b> attempt{3 - attempts > 1 && 's'} remaining.
          </p>
        )}
        <ul className="TipList">
          <li>Always check the email address sender</li>
          <li>Check the links to see where they would lead</li>
          <li>Urgency is a very common tactic in scams</li>
          <li>If it seems too good to be true, then it probably is!</li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

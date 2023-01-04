import * as React from "react";
import { DialogContent, DialogTitle } from "@mui/material";

import './TipDialog.css';
import { useSelector } from "react-redux";
import { selectCurrentAttempts } from "../../../redux/scores";
import { TOTAL_ATTEMPTS_ALLOWED, TOTAL_SCAM_EMAILS } from "../../../helpers/constants";

export default function TipDialog() {
  const currentAttempts = useSelector((state) => selectCurrentAttempts(state));
  return (
    <>
      <DialogTitle
        id="alert-dialog-title"
        style={{ textAlign: "center", fontWeight: "bold", color: "#493698" }}
      >
        {"Here's some tips"}
      </DialogTitle>
      <DialogContent>
        {currentAttempts.length > 0 && (
          <p style={{ textAlign: "center", marginBottom: "50px" }}>
            You've caught <b>{currentAttempts[currentAttempts.length - 1]}/{TOTAL_SCAM_EMAILS}</b> of the scam emails.
          </p>
        )}
        {currentAttempts && (
          <p style={{ textAlign: "center", marginBottom: "50px" }}>
            <b>{TOTAL_ATTEMPTS_ALLOWED - currentAttempts.length}</b> attempt{TOTAL_ATTEMPTS_ALLOWED - currentAttempts.length > 1 && "s"} remaining.
          </p>
        )}
        <ul className="TipList">
          <li>Always check the email address sender</li>
          <li>Check the links to see where they would lead</li>
          <li>Urgency is a very common tactic in scams</li>
          <li>If it seems too good to be true, then it probably is!</li>
        </ul>
      </DialogContent>
    </>
  );
}

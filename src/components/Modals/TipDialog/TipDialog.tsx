import { ReactElement } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import "./TipDialog.css";
import { useSelector } from "react-redux";
import { selectCurrentAttempts } from "redux/scores";
import { TOTAL_ATTEMPTS_ALLOWED, TOTAL_SCAM_EMAILS } from "helpers/constants";
import { RootState } from "redux/store";
import useModal from "hooks/useModal";

export default function TipDialog(): ReactElement {
  const currentAttempts = useSelector((state: RootState) =>
    selectCurrentAttempts(state)
  );
  const { handleModal } = useModal();
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
            You&apos;ve caught{" "}
            <b>
              {currentAttempts[currentAttempts.length - 1]}/{TOTAL_SCAM_EMAILS}
            </b>{" "}
            of the scam emails.
          </p>
        )}
        {currentAttempts != null && (
          <p style={{ textAlign: "center", marginBottom: "50px" }}>
            <b>{TOTAL_ATTEMPTS_ALLOWED - currentAttempts.length}</b> attempt
            {TOTAL_ATTEMPTS_ALLOWED - currentAttempts.length > 1 && "s"}{" "}
            remaining.
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
            handleModal(false);
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </>
  );
}

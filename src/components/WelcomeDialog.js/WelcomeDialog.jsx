import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import tutorialGraphic from '../../assets/tutorialGraphic.svg';
import tutorialGraphicMobile from "../../assets/tutorialGraphicMobile.svg";

import './WelcomeDialog.css';
import { useState } from "react";
import { useTour } from '@reactour/tour';

export default function WelcomeDialog(props) {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const { setIsOpen } = useTour();

  const handleClose = (value) => {
    props.handleClose(true); // default set to true until checkbox needed again
    setIsOpen(true);
  } 

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          handleClose(checkboxValue);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center", fontWeight: "bold", color: "#493698" }}
        >
          {"How to play"}
        </DialogTitle>
        <DialogContent>
          <div className="LargeTutorial Tutorial">
            <img src={tutorialGraphic} alt="tutorial infographic" />
          </div>
          <div className="SmallTutorial Tutorial">
            <img src={tutorialGraphicMobile} alt="tutorial infographic" />
          </div>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "center", flexFlow: "wrap-reverse" }}
        >
          {/* <Button
            variant="outlined"
            onClick={() => {
              props.handleClose(true);
            }}
          >
            Don't show again
          </Button> */}
          {/* <FormGroup style={{ marginRight: "1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={checkboxValue}
                  onChange={(event) => setCheckboxValue(event.target.checked)}
                />
              }
              label="Don't show again"
              style={{ color: "grey" }}
            />
          </FormGroup> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                handleClose(checkboxValue);
              }}
              style={{ backgroundColor: "#493698", width: "150px" }}
            >
              Play
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

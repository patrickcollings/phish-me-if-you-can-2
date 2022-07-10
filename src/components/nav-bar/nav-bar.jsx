import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/white-logo.png";
import { Done } from "@mui/icons-material/";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";
import { useState } from "react";

export default function NavBar({openClick, resetClick, attempts}) {
  const [open, setOpen] = useState(false);




  const getScore = (score, type) => {
    switch (type) {
      case "previous":
        return <span style={{ color: "#A3A3A3" }}>{score}%</span>;
      case "current":
        return <span style={{ WebkitTextStroke: "1px red" }}>?</span>;
      case "future":
        return <span style={{ color: "#A3A3A3" }}>?</span>;
      case "complete":
        return <span style={{ color: "white" }}>{score}%</span>;
    }  
  }

  const setupScores = () => {
    const attemptNumber = attempts.length; 
    const attemptCopy = [...attempts];

    while (attemptCopy.length < 3) {
      attemptCopy.push(false);
    }

    return attemptCopy.map((attempt, index) => 
    {
      if (attemptNumber === 3) return getScore(attempt, 'complete');
      if (index === attemptNumber) return getScore(attempt, 'current');
      if (typeof attempt === 'boolean') return getScore(attempt, "future"); 
      return (getScore(attempt, 'previous'));
    })
  }

  const confirmReset = (confirm) => {
    if (confirm) resetClick();
    setOpen(false);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#2A1E5C" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <a href={process.env.REACT_APP_LANDING_URL}>
                <img src={logo} style={{ height: "30px", width: "30px" }} />
              </a>
            </div>
            <div>
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  margin: "0",
                  fontSize: "14px",
                }}
              >
                {3 - attempts.length} attempts remaining
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "200px",
                  fontSize: "25px",
                }}
              >
                {setupScores()}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
                flexBasis: 0,
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={openClick}
              >
                Submit
                <Done />
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={resetClick}
              >
                Reset
                <Done />
              </Button>
              {/* <IconButton
                aria-label="done"
                style={{ color: "white", cursor: "pointer" }}
                onClick={openClick}
              >
                <Done />
              </IconButton> */}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmationDialog
        handleClose={confirmReset}
        open={open}
        title={"This wil reset the entire game"}
      ></ConfirmationDialog>
    </>
  );
}

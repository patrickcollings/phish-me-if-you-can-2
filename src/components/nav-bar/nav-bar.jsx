import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/white-logo.png";
import { RestartAlt, Done } from "@mui/icons-material/";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";
import { useState } from "react";
import { IconButton } from "@mui/material";

export default function NavBar(props) {
  const [open, setOpen] = useState(false);

  const confirmReset = (confirm) => {
    if (confirm) props.resetClick();
    setOpen(false);
  }
  console.log(process.env.REACT_APP_LANDING_URL);
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
                2 attempts remaining
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minWidth: "100px",
                  fontSize: "25px",
                }}
              >
                <span style={{ color: "#A3A3A3" }}>15%</span>
                <span style={{ "-webkit-text-stroke": "1px red" }}>?</span>
                <span style={{ color: "#A3A3A3" }}>?</span>
              </div>
            </div>
            {/* {props.showResult && (
              <span
                style={{ fontSize: "28px", fontWeight: "bold", color: "black" }}
              >
                You scored: {props.result.score}%
              </span>
            )} */}
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
                onClick={props.openClick}
              >
                Submit
                <Done />
              </Button>
              {/* <IconButton
                aria-label="done"
                style={{ color: "white", cursor: "pointer" }}
                onClick={props.openClick}
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

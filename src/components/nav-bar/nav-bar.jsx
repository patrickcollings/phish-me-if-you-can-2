import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.png";
import { RestartAlt, Done } from "@mui/icons-material/";
import ConfirmationDialog from "../confirmation-dialog/confirmation-dialog";
import { useState } from "react";


export default function NavBar(props) {
  const [open, setOpen] = useState(false);

  const confirmReset = (confirm) => {
    if (confirm) props.resetClick();
    setOpen(false);
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <img src={logo} style={{ height: "64px", width: "64px" }} />
            {props.showResult && (
              <span
                style={{ fontSize: "28px", fontWeight: "bold", color: "black" }}
              >
                You scored: {props.result.score}%
              </span>
            )}
            <div style={{ display: "flex", color: "grey" }}>
              <RestartAlt
                onClick={() => setOpen(true)}
                style={{ marginRight: "1rem", cursor: "pointer" }}
              />
              {!props.showResult && (
                <Done onClick={props.openClick} style={{ cursor: "pointer" }} />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmationDialog handleClose={confirmReset} open={open} title={'This wil reset the entire game'}></ConfirmationDialog>
    </>
  );
}

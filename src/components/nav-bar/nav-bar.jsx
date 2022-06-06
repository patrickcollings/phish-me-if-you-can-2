import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.png";
import { RestartAlt, Done } from "@mui/icons-material/";


export default function NavBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src={logo} style={{ height: "64px", width: "64px" }} />
          <span>phishmeifyoucan.com</span>
          {props.showResult && (
            <span
              style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}
            >
              You scored: {props.result.score}%
            </span>
          )}
          <div style={{ display: "flex" }}>
            <RestartAlt
              onClick={props.resetClick}
              style={{ marginRight: "1rem", cursor: "pointer" }}
            />
            {!props.showResult && (
              <Done onClick={props.openClick} style={{ cursor: "pointer" }} />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

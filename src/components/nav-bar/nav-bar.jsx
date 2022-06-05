import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.png";

export default function NavBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <img src={logo} style={{height: '64px', width: '64px'}}/>
          <div style={{display: 'flex'}}>
            <Button color="inherit" onClick={props.openClick}>
              Finish
            </Button>
            <Button color="inherit" onClick={props.resetClick}>
              Reset
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

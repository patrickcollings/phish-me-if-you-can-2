import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

export default function NavBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: 'right'}}>
          <Button color="inherit" onClick={props.openClick}>Finish</Button>
          <Button color="inherit" onClick={props.resetClick}>Reset</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
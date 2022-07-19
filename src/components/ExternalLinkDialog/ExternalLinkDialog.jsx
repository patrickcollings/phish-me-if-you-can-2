import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent } from "@mui/material";

export default function ExternalLinkDialog(props) {
    return (
      <div>
        <Dialog
          open={props.open}
          onClose={() => {
            props.handleClose();
          }}
          maxWidth='lg'
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>This link would have taken you to</p>
            <p style={{wordBreak: 'break-all'}}>{props.url}</p>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                props.handleClose();
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

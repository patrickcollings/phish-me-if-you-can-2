import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import useModal from "../../../hooks/useModal";

export default function ConfirmationDialog({description, title, handleClose}) {
  const { handleModal } = useModal();
  return (
    <div>
        <DialogTitle id="alert-dialog-title">{title ? title : "Are you sure?"}</DialogTitle>
        <DialogContent>
            {description && <p>{description}</p>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleModal(false);
              handleClose(false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleModal(false);
              handleClose(true);
            }}
          >
            Yes
          </Button>
        </DialogActions>
    </div>
  );
}
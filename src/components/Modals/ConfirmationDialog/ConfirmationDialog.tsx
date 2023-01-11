import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import useModal from "../../../hooks/useModal";
import { ReactElement } from "react";
import { isEmptyString } from "helpers/helper";

export default function ConfirmationDialog({
  description,
  title,
  handleClose,
}: {
  description: string;
  title?: string;
  handleClose: Function;
}): ReactElement {
  const { handleModal } = useModal();
  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        {title ?? "Are you sure?"}
      </DialogTitle>
      <DialogContent>
        {!isEmptyString(description) && <p>{description}</p>}
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

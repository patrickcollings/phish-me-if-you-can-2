import { ReactElement } from "react";
import Dialog from "@mui/material/Dialog";

export default function Modal({
  children,
  close,
  open,
}: {
  children: any;
  close: () => void;
  open: boolean;
}): ReactElement {
  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
}

import { Snackbar } from "@mui/material";
import React, { createContext, useState, useEffect, ReactElement } from "react";
import Modal from "../components/Modals/Modal";

export type ModalContextType = {
  handleModal: (modal: any) => void;
  handleSnackbar: (alert: any) => void;
};

const ModalContext = createContext<ModalContextType>({
  handleModal: () => null,
  handleSnackbar: () => null,
});

const ModalContextProvider = ({ children }: { children: any }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<ReactElement | null>(null);

  const handleModal = (modal: any) => {
    if (modal) {
      setModal(modal);
      setModalOpen(true);
    } else {
      setModal(false);
      setModalOpen(false);
    }
  }

  const handleSnackbar = (alert: any) => {
    if (alert) {
      setSnackbar(alert);
      setSnackbarOpen(true);
    } else {
      setSnackbar(null);
      setSnackbarOpen(false);
    }
  }

  const getSnackbarContent = () => {
    if (!!snackbar) return snackbar;
  }

  return (
    <ModalContext.Provider value={{ handleModal, handleSnackbar }}>
      <Modal open={modalOpen} close={() => setModalOpen(false)}>
        {modal}
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={() => setSnackbarOpen(false)}
      >
        {getSnackbarContent()}
      </Snackbar>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
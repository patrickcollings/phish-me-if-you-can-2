import { Snackbar } from "@mui/material";
import React, { createContext, useState, useEffect } from "react";
import Modal from "../components/Modals/Modal";

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const handleModal = (modal) => {
    if (modal) {
      setModal(modal);
      setModalOpen(true);
    } else {
      setModal(false);
      setModalOpen(false);
    }
  }

  const handleSnackbar = (alert) => {
    if (alert) {
      setSnackbar(alert);
      setSnackbarOpen(true);
    } else {
      setSnackbar(null);
      setSnackbarOpen(false);
    }
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
        {snackbar}
      </Snackbar>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
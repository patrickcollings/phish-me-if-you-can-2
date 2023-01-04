import React, { createContext, useState, useEffect } from "react";
import Modal from "../components/Modals/Modal";

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const close = () => {
    setModalOpen(false);
  }
  
  const handleModal = (modal) => {
    if (!modal) {
      setModal(false);
      setModalOpen(false);
    } else {
      setModal(modal);
      setModalOpen(true);
    }
  }

  return (
    <ModalContext.Provider value={{ handleModal }}>
      <Modal open={modalOpen} close={close}>
         {modal}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
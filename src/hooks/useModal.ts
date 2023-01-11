import { useContext } from "react";
import { Context } from "vm";
import { ModalContext } from "../context/ModalContext";

export default (): Context => useContext(ModalContext);

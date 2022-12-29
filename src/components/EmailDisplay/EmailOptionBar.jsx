import { Icon } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { ArrowBack } from "@mui/icons-material";
import { useContext } from "react";
import { WindowWidthContext } from "../../context/WindowWidthContext";
import { useDispatch, useSelector } from "react-redux";
import { deselect } from '../../redux/selectedEmail';

export default function EmailOptionBar({
  remove,
  add,
}) {
  const dispatch = useDispatch();

  const width = useContext(WindowWidthContext);
  const showResult = useSelector((state) => state.showResult.value);
  const selectedEmail = useSelector((state) => state.selectedEmail.value);
  const scamList = useSelector((state) => state.scamList.value);
  const isMobile = width < 1000;
  const isScamBox = (scamList.findIndex(
    (email) => selectedEmail.id === email.id
  ) > -1);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : "right",
          backgroundColor: "#D9D9D9",
          padding: "0 1rem",
        }}
      >
        {isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 0",
              cursor: "pointer",
            }}
            onClick={() => dispatch(deselect())}
          >
            <Icon aria-label="done" fontSize="large" style={{ color: "black" }}>
              <ArrowBack fontSize="large" />
            </Icon>
          </div>
        )}
        {!showResult && (
          <div
            data-tour="add-to-scambox"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={isScamBox ? remove : add}
          >
            <p style={{ margin: '0px 5px' }}>
              {isScamBox ? "remove from scambox" : "add to scambox"}
            </p>
            <Icon
              aria-label="done"
              fontSize="large"
              style={{ color: "red" }}
              onClick={remove}
            >
              <ReportGmailerrorredIcon fontSize="large" />
            </Icon>
          </div>
        )}
      </div>
    </>
  );
}
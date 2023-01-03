import { Icon } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { ArrowBack } from "@mui/icons-material";
import { useContext } from "react";
import { WindowWidthContext } from "../../context/WindowWidthContext";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedEmailToScamList, deselectEmail, removeSelectedEmailFromScamList } from "../../redux/emails";
import { useNavigate } from "react-router-dom";

export default function EmailOptionBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const width = useContext(WindowWidthContext);
  const showResult = useSelector((state) => state.showResult.value);
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const scamList = useSelector((state) => state.emails.scamList);
  const isMobile = width < 1000;
  const isScamBox = (scamList.findIndex(
    (email) => selectedEmail.id === email.id
  ) > -1);

  const addOrRemoveSelectedEmail = () => {
    if (scamList.length > 4 && !isScamBox) {
      // setScamboxFullSnackBar(true); 
      // TODO implement global snackbar service
      return;
    }
    isScamBox
      ? dispatch(removeSelectedEmailFromScamList())
      : dispatch(addSelectedEmailToScamList());
    navigate(isScamBox ? "/scambox" : "/inbox");
  }

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
            onClick={() => dispatch(deselectEmail())}
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
            onClick={addOrRemoveSelectedEmail}
          >
            <p style={{ margin: '0px 5px' }}>
              {isScamBox ? "remove from scambox" : "add to scambox"}
            </p>
            <Icon
              aria-label="done"
              fontSize="large"
              style={{ color: "red" }}
              onClick={() => dispatch(removeSelectedEmailFromScamList())}
            >
              <ReportGmailerrorredIcon fontSize="large" />
            </Icon>
          </div>
        )}
      </div>
    </>
  );
}
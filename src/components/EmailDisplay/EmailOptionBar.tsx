import { Alert, Icon } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { ArrowBack } from "@mui/icons-material";
import { useContext } from "react";
import { WindowWidthContext } from "../../context/WindowWidthContext";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedEmailToScamList, deselectEmail, removeSelectedEmailFromScamList } from "../../redux/emails";
import { useNavigate } from "react-router-dom";
import { selectIsFinished } from "../../redux/scores";
import useModal from "../../hooks/useModal";
import { MAX_MOBILE_WIDTH, TOTAL_SCAM_EMAILS } from "../../helpers/constants";
import { RootState } from "redux/store";
import { Email } from "models/Email";

export default function EmailOptionBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSnackbar } = useModal();

  const width = useContext(WindowWidthContext);
  const selectedEmail = useSelector((state: RootState) => state.emails.selectedEmail);
  const scamList = useSelector((state: RootState) => state.emails.scamList);
  const isFinished = useSelector((state: RootState) => selectIsFinished(state));

  const isMobile = width < MAX_MOBILE_WIDTH;
  const isScamBox = (scamList.findIndex(
    (email: Email) => (selectedEmail != null) && selectedEmail.id === email.id
  ) > -1);

  const addOrRemoveSelectedEmail = () => {
    if (scamList.length >= TOTAL_SCAM_EMAILS && !isScamBox) {
      handleSnackbar(
        <Alert
          onClose={() => { handleSnackbar(false); }}
          severity="error"
          sx={{ width: "100%" }}
        >
          <b>Scambox full!</b> There is only {TOTAL_SCAM_EMAILS} scams to find.
        </Alert>
      );
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
        {!isFinished && (
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
            >
              <ReportGmailerrorredIcon fontSize="large" />
            </Icon>
          </div>
        )}
      </div>
    </>
  );
}
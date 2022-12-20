import { Icon } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { ArrowBack } from "@mui/icons-material";

export default function EmailOptionBar({
  isScamEmail,
  handleDeselect,
  remove,
  add,
  isMobile,
  isComplete,
}) {
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
            onClick={handleDeselect}
          >
            <Icon aria-label="done" fontSize="large" style={{ color: "black" }}>
              <ArrowBack fontSize="large" />
            </Icon>
          </div>
        )}
        {!isComplete && (
          <div
            data-tour="add-to-scambox"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={isScamEmail ? remove : add}
          >
            <p style={{ margin: '0px 5px' }}>
              {isScamEmail ? "remove from scambox" : "add to scambox"}
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
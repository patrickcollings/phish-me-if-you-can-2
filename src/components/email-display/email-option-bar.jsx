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
          justifyContent: "space-around",
          backgroundColor: "#D9D9D9",
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
            <Icon
              aria-label="done"
              fontSize="large"
              style={{ color: "black" }}
            >
              <ArrowBack fontSize="large" />
            </Icon>
            <p style={{ textDecoration: "underline", margin: 0 }}>
              go back
            </p>
          </div>
        )}
        {!isComplete && <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "5px 0",
            cursor: "pointer",
          }}
          onClick={isScamEmail ? remove : add}
        >
          <Icon
            aria-label="done"
            fontSize="large"
            style={{ color: "red" }}
            onClick={remove}
          >
            <ReportGmailerrorredIcon fontSize="large" />
          </Icon>
          <p style={{ textDecoration: "underline", margin: 0 }}>
            {isScamEmail ? "Remove from scambox" : "Add to scambox"}
          </p>
        </div>}
      </div>
    </>
  );
}
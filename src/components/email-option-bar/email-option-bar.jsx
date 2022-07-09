import { Button, Icon } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export default function EmailOptionBar({
  isScamEmail,
  handleDeselect,
  remove,
  add,
  isMobile,
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#D9D9D9",
        }}
      >
        {isMobile && (
          <Button variant="outlined" onClick={handleDeselect}>
            Go back
          </Button>
        )}
        <div style={{display: 'flex', alignItems: 'center', padding: '5px 0', cursor: 'pointer'}} onClick={isScamEmail ? remove : add}>
            <Icon
            aria-label="done"
            fontSize="large"
            style={{ color: "red" }}
            onClick={remove}
            >
                <ReportGmailerrorredIcon fontSize="large"/>
            </Icon>
            <p style={{textDecoration: 'underline', margin: 0}}>{isScamEmail ? 'Remove from scambox': 'Add to scambox'}</p>
        </div>
        {/* {isScamEmail ? (
          <Button variant="outlined" onClick={remove}>
            Remove from scambox
          </Button>
        ) : (
          <Button variant="outlined" onClick={add}>
            Add to scambox
          </Button>
        )} */}
      </div>
    </>
  );
}
import { getHoursAndMinutes } from "../../helpers/helper";
import { Cancel, CheckCircle } from "@mui/icons-material/";
import AttachFileIcon from "@mui/icons-material/AttachFile";

let styles = {
  //   borderTop: "1px solid grey",
  borderBottom: "1px solid lightgrey",
  display: "flex",
  alignItems: "center",
  padding: "0.75rem 0.5rem",
  justifyContent: "space-between",
  cursor: "pointer",
};

let textStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  textAlign: "left",
  maxWidth: '70%',
  flex: '1',
};

let circleStyle = {
  backgroundColor: '#1976d2',
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 0.5rem",
  p: {
    color: "white",
  },
  color: "white",
};

let timestampStyle = {
  display: "flex",
  alignItems: "right",
  justifyContent: "top",
};

const getResult = (props) => {
  return props.email.correct ? (
    <CheckCircle style={{ color: "green" }} />
  ) : (
    <Cancel style={{ color: "red" }} />
  );
};

function getDarkColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

export default function EmailListItem(props) {
  return (
    <>
      <div
        onClick={() => props.onClick(props.index)}
        style={Object.assign(
          {},
          styles,
          props.isSelected
            ? {
                backgroundColor: "#c9c7d3",
              }
            : {}
        )}
      >
        <div style={circleStyle}>
          <p>{props.email.name[0].toUpperCase()}</p>
        </div>
        <div style={textStyle}>
          <span
            style={{
              fontWeight: props.email.read ? "" : "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
          >
            {props.email.name}
          </span>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "13px",
              fontWeight: props.email.read ? "" : "bold",
              color: !props.email.read && "#493698",
            }}
          >
            {props.email.subject}
          </span>
          {/* <span
            style={{
              color: "grey",
            }}
          >
            {props.email.body}
          </span> */}
        </div>
        <div style={timestampStyle}>
          {!!props.showResult ? (
            getResult(props)
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              {props.email.attachment && <AttachFileIcon fontSize="1.2rem" />}
              <span
                style={{
                  position: "sticky",
                  top: "0",
                  right: "0",
                  fontSize: "9px",
                  fontWeight: props.email.read ? "" : "bold",
                }}
              >
                {getHoursAndMinutes(props.email.time)}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

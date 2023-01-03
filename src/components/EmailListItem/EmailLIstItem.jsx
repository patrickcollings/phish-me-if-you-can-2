import { getHoursAndMinutes } from "../../helpers/helper";
import { Cancel, CheckCircle } from "@mui/icons-material/";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link } from "react-router-dom";
import { getColor } from '../../helpers/helper';
import { useSelector } from "react-redux";

let styles = {
  borderBottom: "1px solid lightgrey",
  display: "flex",
  alignItems: "center",
  padding: "1.1rem 0.5rem",
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
  borderRadius: "30%",
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

export default function EmailListItem(props) {
  const names = props.email.name.split(' ');
  const initials = names.length === 1 ? names[0][0] : names[0][0] + names[names.length - 1][0];
  
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const isSelected = selectedEmail && selectedEmail.id === props.email.id; 

  return (
    <>
      <Link
        to={`${props.email.id}`}
        style={{ textDecoration: "none", color: "unset" }}
      >
        <div
          style={Object.assign(
            {},
            styles,
            props.email.read && { backgroundColor: "#f1f1f1" },
            isSelected && { backgroundColor: "#c9c7d3" },
          )}
        >
          <div
            style={{
              ...circleStyle,
              backgroundColor: getColor(props.email.id),
            }}
          >
            <p>{initials}</p>
          </div>
          <div style={textStyle}>
            <span
              style={{
                fontWeight: props.email.read ? "" : "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "16px",
              }}
            >
              {props.email.name}
            </span>
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "15px",
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
            {"correct" in props.email ? (
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
                    fontSize: "11px",
                    fontWeight: props.email.read ? "" : "bold",
                  }}
                >
                  {getHoursAndMinutes(props.email.time)}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

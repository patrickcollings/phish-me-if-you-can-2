import { getHoursAndMinutes } from "../../helpers/helper";
import { Cancel, CheckCircle } from "@mui/icons-material/";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link } from "react-router-dom";
import { getColor } from '../../helpers/helper';
import { useSelector } from "react-redux";
import { selectIsFinished } from "../../redux/scores";
import { selectIsEmailCorrect } from "../../redux/emails";

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

export default function EmailListItem({ email }) {
  const names = email.name.split(' ');
  const initials = names.length === 1 ? names[0][0] : names[0][0] + names[names.length - 1][0];
  
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);
  const isFinished = useSelector((state) => selectIsFinished(state));
  const isCorrect = useSelector((state) => selectIsEmailCorrect(state, email));

  const isSelected = selectedEmail && selectedEmail.id === email.id; 

  const getResult = () => {
    return isCorrect ? (
      <CheckCircle style={{ color: "green" }} />
    ) : (
      <Cancel style={{ color: "red" }} />
    );
  };

  return (
    <>
      <Link
        to={`${email.id}`}
        style={{ textDecoration: "none", color: "unset" }}
      >
        <div
          style={Object.assign(
            {},
            styles,
            email.read && { backgroundColor: "#f1f1f1" },
            isSelected && { backgroundColor: "#c9c7d3" },
          )}
        >
          <div
            style={{
              ...circleStyle,
              backgroundColor: getColor(email.id),
            }}
          >
            <p>{initials}</p>
          </div>
          <div style={textStyle}>
            <span
              style={{
                fontWeight: email.read ? "" : "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "16px",
              }}
            >
              {email.name}
            </span>
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "15px",
                fontWeight: email.read ? "" : "bold",
                color: !email.read && "#493698",
              }}
            >
              {email.subject}
            </span>
            {/* <span
            style={{
              color: "grey",
            }}
          >
            {email.body}
          </span> */}
          </div>
          <div style={timestampStyle}>
            {isFinished ? (
              getResult()
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {email.attachment && <AttachFileIcon fontSize="1.2rem" />}
                <span
                  style={{
                    position: "sticky",
                    top: "0",
                    right: "0",
                    fontSize: "11px",
                    fontWeight: email.read ? "" : "bold",
                  }}
                >
                  {getHoursAndMinutes(email.time)}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}

import { getHoursAndMinutes } from "../../assets/helper";

let styles = {
  //   borderTop: "1px solid grey",
  borderBottom: "1px solid lightgrey",
  display: "flex",
  alignItems: "center",
  padding: "0.2rem",
  justifyContent: "space-between",
  cursor: "pointer"
};

let textStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  textAlign: "left",
};

let circleStyle = {
  backgroundColor: "red",
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
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'top'
}

export default function EmailListItem(props) {
  let color = 'none';
  if (props.showResult) {
    color = props.email.correct ? "green" :  "red";
  }  
  return (
    <>
      <div
        onClick={() => props.onClick(props.index)}
        style={Object.assign(
          {},
          styles,
          props.isSelected
            ? {
                borderColor: "blue",
                backgroundColor: "lightgrey",
                borderTop: "1px solid blue",
              }
            : { borderColor: "lightgrey", borderTop: "none" }
        )}
      >
        <div style={circleStyle}>
          <p>{props.email.name[0].toUpperCase()}</p>
        </div>
        <div style={textStyle}>
          <span
            style={{
              fontWeight: props.email.read ? "" : "bold",
              color,
            }}
          >
            {props.email.name}
          </span>
          <span style={{ fontWeight: props.email.read ? "" : "bold" }}>
            {props.email.subject}
          </span>
          <span
            style={{
              color: "grey",
            }}
          >
            {props.email.body}
          </span>
        </div>
        <div style={timestampStyle}>
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
      </div>
    </>
  );
}

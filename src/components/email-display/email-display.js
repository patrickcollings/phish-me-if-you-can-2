import * as React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getHoursAndMinutes } from "../../assets/helper";

export default function EmailDisplay(props) {
  let Template =
    props.selectedEmail &&
    React.lazy(() => import("../../assets/email-templates/" + props.selectedEmail.template))
  if (props.selectedEmail) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "1rem",
          }}
        >
          {props.isScamEmail ? (
            <Button variant="outlined" onClick={props.remove}>
              Remove from scam
            </Button>
          ) : (
            <Button variant="outlined" onClick={props.add}>
              Add to scam
            </Button>
          )}
        </div>
        <Card sx={{ minWidth: 275, minHeight: "50vh" }}>
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography
                  sx={{ fontSize: 25, textAlign: "left", fontWeight: "400" }}
                  color="text.primary"
                  gutterBottom
                >
                  {props.selectedEmail.subject}
                </Typography>
                <Typography
                  sx={{ fontSize: 15, textAlign: "left" }}
                  color="text.primary"
                  gutterBottom
                >
                  {props.selectedEmail.name}{" "}
                  {"<" + props.selectedEmail.email + ">"}
                </Typography>
                <Typography
                  sx={{ fontSize: 15, textAlign: "left" }}
                  color="text.primary"
                  gutterBottom
                >
                  To: {props.selectedEmail.to}
                </Typography>
              </div>
              <Typography
                sx={{ fontSize: 12, textAlign: "right" }}
                color="text.secondary"
                gutterBottom
              >
                {getHoursAndMinutes(props.selectedEmail.time)}
              </Typography>
            </div>
            <Divider/>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Template />
            </React.Suspense>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <Card sx={{ minWidth: 275, minHeight: "50vh" }}>
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            No email selected
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

import * as React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getHoursAndMinutes } from "../../assets/helper";
import Template from "../../assets/email-templates/template";

export default function EmailDisplay(props) {
  if (props.selectedEmail) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: props.isMobile ? "space-between" : "flex-end",
            padding: props.isMobile ? "0.6rem" : "0 0 1rem 0",
          }}
        >
          {props.isMobile && (
            <Button variant="outlined" onClick={props.handleDeselect}>
              Go back
            </Button>
          )}
          {props.isScamEmail ? (
            <Button variant="outlined" onClick={props.remove}>
              Remove from scambox
            </Button>
          ) : (
            <Button variant="outlined" onClick={props.add}>
              Add to scambox
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
            <Divider />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Template template={props.selectedEmail.template} />
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

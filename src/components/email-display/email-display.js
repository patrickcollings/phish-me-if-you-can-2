import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function EmailDisplay(props) {
  if (props.selectedEmail) {
    return (
      <>
        {props.isScamEmail ? (
          <h1 onClick={props.remove}>Remove from scam</h1>
        ) : (
          <h1 onClick={props.add}>Add to scam</h1>
        )}
        <Card sx={{ minWidth: 275, minHeight: "50vh" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 30 }}
              color="text.secondary"
              gutterBottom
            >
              {props.selectedEmail.title}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
              {props.selectedEmail.body}
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  } else {
    return (
      <Card sx={{ minWidth: 275, minHeight: "50vh" }}>
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            Select an email to read it
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

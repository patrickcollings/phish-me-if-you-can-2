import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function EmailDisplay(props) {
    return (
        <Card sx={{ minWidth: 275, minHeight: '50vh' }}>
        <CardContent>
            <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            {props.selectedEmail.title}
            </Typography>
            <Typography sx={{ fontSize: 20 }} color="text.secondary">
            {props.selectedEmail.body}
            </Typography>
        </CardContent>
        </Card>
  );
}

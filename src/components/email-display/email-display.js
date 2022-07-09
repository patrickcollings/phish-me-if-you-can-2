import * as React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getHoursAndMinutes } from "../../assets/helper";
import Template from "../../assets/email-templates/template";
import EmailOptionBar from "../email-option-bar/email-option-bar";

export default function EmailDisplay({
  selectedEmail,
  isScamEmail,
  handleDeselect,
  remove,
  add,
  isMobile,
}) {
  if (selectedEmail) {
    return (
      <>
        <EmailOptionBar
          isScamEmail={isScamEmail}
          handleDeselect={handleDeselect}
          remove={remove}
          add={add}
          isMobile={isMobile}
        />
        {/* <Card sx={{ minWidth: 275, minHeight: "50vh" }}>
          <CardContent> */}
        <div style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 0,
          top: '46px',
          overflowY: 'auto',
        }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}
          >
            <div>
              <Typography
                sx={{ fontSize: 25, textAlign: "left", fontWeight: "400" }}
                color="text.primary"
                gutterBottom
              >
                {selectedEmail.subject}
              </Typography>
              <Typography
                sx={{ fontSize: 15, textAlign: "left" }}
                color="text.primary"
                gutterBottom
              >
                {selectedEmail.name} {"<" + selectedEmail.email + ">"}
              </Typography>
              <Typography
                sx={{ fontSize: 15, textAlign: "left" }}
                color="text.primary"
                gutterBottom
              >
                To: {selectedEmail.to}
              </Typography>
            </div>
            <Typography
              sx={{ fontSize: 12, textAlign: "right" }}
              color="text.secondary"
              gutterBottom
            >
              {getHoursAndMinutes(selectedEmail.time)}
            </Typography>
          </div>
          <Divider />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Template template={selectedEmail.template} />
          </React.Suspense>
        </div>
        {/* </CardContent>
        </Card> */}
      </>
    );
  } else {
    return (
      <Card
        sx={{
          minWidth: 275,
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            Nothing is selected
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

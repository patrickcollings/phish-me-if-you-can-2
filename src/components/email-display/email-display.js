import * as React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getHoursAndMinutes } from "../../helpers/helper";
import Template from "../EmailTemplate/EmailTemplate";
import EmailOptionBar from "./email-option-bar";
import Attachment from "./attachment";

export default function EmailDisplay({
  selectedEmail,
  isScamEmail,
  handleDeselect,
  remove,
  add,
  isMobile,
  showResult,
}) {
  if (selectedEmail) {
    return (
      <>
        <EmailOptionBar
          isScamEmail={isScamEmail}
          isComplete={showResult}
          handleDeselect={handleDeselect}
          remove={remove}
          add={add}
          isMobile={isMobile}
        />

        <div
          style={{
            position: isMobile ? 'unset' : "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            top: (isMobile || !showResult) ? "46px" : "0px",
            overflowY: "auto",
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {"correct" in selectedEmail && selectedEmail.scam && (
            <div style={{ padding: "0 3rem" }}>
              <h1>Why is this a scam?</h1>
              <p>{selectedEmail.description}</p>
            </div>
          )}

          {"correct" in selectedEmail && !selectedEmail.scam && (
            <div style={{ padding: "0 3rem" }}>
              <h1>This is not a scam email</h1>
            </div>
          )}

          <div style={{ opacity: "correct" in selectedEmail ? "0.8" : "1", flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem 1rem 0",
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
            {selectedEmail.attachment && (
              <Attachment
                name={selectedEmail.attachmentName}
                extension={selectedEmail.attachmentExtension}
              ></Attachment>
            )}
            <Divider />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Template template={selectedEmail.template} />
            </React.Suspense>
          </div>
        </div>
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

import * as React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { getHoursAndMinutes } from "../../helpers/helper";
import Template from "../EmailTemplate/EmailTemplate";
import EmailOptionBar from "./EmailOptionBar";
import Attachment from "./Attachment";
import logo from "../../assets/black-logo.png";
import { useContext } from "react";
import { WindowWidthContext } from "../../context/WindowWidthContext";
import { useSelector } from "react-redux";
import { selectIsFinished } from "../../redux/scores";

export default function EmailDisplay() {
  const width = useContext(WindowWidthContext);
  const isMobile = width < 1000;
  const isFinished = useSelector((state) => selectIsFinished(state));
  const selectedEmail = useSelector((state) => state.emails.selectedEmail);

  if (selectedEmail) {
    return (
      <>
        <EmailOptionBar />
        <div
          data-tour="email-display"
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 0,
            top: isMobile || !isFinished ? "46px" : "0px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isFinished && selectedEmail.scam && (
            <div style={{ padding: "0 3rem" }}>
              <h1>Why is this a scam?</h1>
              <p>{selectedEmail.description}</p>
            </div>
          )}

          {isFinished && !selectedEmail.scam && (
            <div style={{ padding: "0 3rem" }}>
              <h1>This is not a scam email</h1>
            </div>
          )}

          <div
            style={{
              opacity: isFinished ? "0.8" : "1",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "5rem",
          alignItems: "center",
          fontSize: '30px',
          color: 'grey',
        }}
      >
        <img src={logo} style={{ width: "70px", marginBottom: "2rem", opacity: '0.6' }}></img>
        <span>Select an email to read</span>
      </div>
    );
  }
}

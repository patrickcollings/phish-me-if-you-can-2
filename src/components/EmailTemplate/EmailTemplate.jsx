import { useEffect, useState } from "react";
import ExternalLinkDialog from "../ExternalLinkDialog/ExternalLinkDialog";

const templateUrl = process.env.REACT_APP_EMAIL_TEMPLATES_S3;

export default function Template({ template }) {
  const [externalUrl, setExternalUrl] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const handler = (event) => {
      if (
        event.data.type === "webpackWarnings" ||
        event.data.type === "webpackInvalid"
      )
        return;
        
      setExternalUrl(event.data);
      setOpen(true);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []); // empty array => run only once

  return (
    <>
      <ExternalLinkDialog
        open={open}
        url={externalUrl}
        handleClose={handleClose}
      ></ExternalLinkDialog>
      <div
        style={{ height: `200vh`, overflowX: "auto", overflowY: "hidden" }}
      >
        <iframe
          key={template}
          src={`${templateUrl}${template}/index.html`}
          frameBorder="0"
          title={templateUrl}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </>
  );
}
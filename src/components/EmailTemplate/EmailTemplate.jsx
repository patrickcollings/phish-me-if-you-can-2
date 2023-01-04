import { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import ExternalLinkDialog from "../Modals/ExternalLinkDialog/ExternalLinkDialog";

const templateUrl = process.env.REACT_APP_EMAIL_TEMPLATES_S3;

export default function Template({ template }) {
  const { handleModal } = useModal();

  useEffect(() => {
    const handler = (event) => {
      if (
        typeof event.data === "object" ||
        event.origin === 'http://localhost:3000'
      )
        return;
      console.log(event);
      handleModal(<ExternalLinkDialog url={event.data}></ExternalLinkDialog>);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []); // empty array => run only once

  return (
    <>
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